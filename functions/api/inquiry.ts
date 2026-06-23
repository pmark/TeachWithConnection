interface RateLimitBinding {
  limit(input: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  RESEND_API_KEY: string;
  INQUIRY_TO_EMAIL: string;
  INQUIRY_FROM_EMAIL: string;
  TURNSTILE_SECRET_KEY: string;
  ALLOWED_ORIGINS?: string;
  INQUIRY_RATE_LIMITER?: RateLimitBinding;
}

interface FunctionContext {
  request: Request;
  env: Env;
}

type FieldName =
  | "name"
  | "email"
  | "organization"
  | "role"
  | "location"
  | "inquiryType"
  | "timeline"
  | "audienceSize"
  | "howHeard"
  | "message";

const FIELD_LIMITS: Record<FieldName, number> = {
  name: 100,
  email: 254,
  organization: 150,
  role: 100,
  location: 120,
  inquiryType: 40,
  timeline: 120,
  audienceSize: 60,
  howHeard: 150,
  message: 5000,
};

const REQUIRED_FIELDS: FieldName[] = ["name", "email", "organization", "inquiryType", "message"];
const INQUIRY_TYPES = new Set(["Professional development", "Workshop", "Keynote", "Consultation", "Other"]);
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function readFields(formData: FormData): Record<FieldName, string> {
  return Object.fromEntries(
    (Object.keys(FIELD_LIMITS) as FieldName[]).map((field) => [field, String(formData.get(field) ?? "").trim()]),
  ) as Record<FieldName, string>;
}

function validate(fields: Record<FieldName, string>): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  for (const field of REQUIRED_FIELDS) {
    if (!fields[field]) errors[field] = "required";
  }
  for (const [field, limit] of Object.entries(FIELD_LIMITS) as [FieldName, number][]) {
    if (fields[field].length > limit) errors[field] = `tooLong:${limit}`;
  }
  if (fields.email && !EMAIL_PATTERN.test(fields.email)) errors.email = "email";
  if (fields.inquiryType && !INQUIRY_TYPES.has(fields.inquiryType)) errors.inquiryType = "inquiryType";

  return errors;
}

async function verifyTurnstile(token: string, secret: string, remoteIp: string | null): Promise<boolean> {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      response: token,
      remoteip: remoteIp ?? undefined,
      idempotency_key: crypto.randomUUID(),
    }),
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

function buildEmail(fields: Record<FieldName, string>): { text: string; html: string } {
  const labels: [FieldName, string][] = [
    ["name", "Name"],
    ["email", "Email"],
    ["organization", "Organization"],
    ["role", "Role/title"],
    ["location", "Location"],
    ["inquiryType", "Inquiry type"],
    ["timeline", "Timeline"],
    ["audienceSize", "Audience size"],
    ["howHeard", "How did you hear about us?"],
    ["message", "Message"],
  ];
  const populated = labels.filter(([field]) => fields[field]);
  return {
    text: populated.map(([field, label]) => `${label}:\n${fields[field]}`).join("\n\n"),
    html: populated
      .map(([field, label]) => `<p><strong>${label}</strong><br>${escapeHtml(fields[field]).replace(/\n/g, "<br>")}</p>`)
      .join(""),
  };
}

async function handlePost({ request, env }: FunctionContext): Promise<Response> {
  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    return json({ ok: false, code: "unsupported" }, 415);
  }
  if (contentLength > 16_384) return json({ ok: false, code: "too_large" }, 413);

  const origin = request.headers.get("origin");
  const allowedOrigins = new Set([
    "https://teachwithconnection.com",
    "https://www.teachwithconnection.com",
    ...(env.ALLOWED_ORIGINS?.split(",").map((value) => value.trim()).filter(Boolean) ?? []),
  ]);
  if (!origin || !allowedOrigins.has(origin)) return json({ ok: false, code: "origin" }, 403);

  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (env.INQUIRY_RATE_LIMITER) {
    const { success } = await env.INQUIRY_RATE_LIMITER.limit({ key: remoteIp ?? "unknown" });
    if (!success) return json({ ok: false, code: "rate_limited" }, 429);
  }

  const formData = await request.formData();
  if (String(formData.get("website") ?? "")) return json({ ok: false, code: "rejected" }, 403);

  const startedAt = Number(formData.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 1500) {
    return json({ ok: false, code: "rejected" }, 403);
  }

  const fields = readFields(formData);
  const fieldErrors = validate(fields);
  if (Object.keys(fieldErrors).length > 0) {
    return json({ ok: false, code: "validation", fieldErrors }, 400);
  }

  if (!env.RESEND_API_KEY || !env.INQUIRY_TO_EMAIL || !env.INQUIRY_FROM_EMAIL || !env.TURNSTILE_SECRET_KEY) {
    console.error("Inquiry service is missing required environment configuration");
    return json({ ok: false, code: "configuration" }, 503);
  }

  const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");
  if (!turnstileToken || !(await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, remoteIp))) {
    return json({ ok: false, code: "verification" }, 403);
  }

  const email = buildEmail(fields);
  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
      "User-Agent": "TeachWithConnection-Inquiry/1.0",
    },
    body: JSON.stringify({
      from: env.INQUIRY_FROM_EMAIL,
      to: [env.INQUIRY_TO_EMAIL],
      reply_to: fields.email,
      subject: `${fields.inquiryType} inquiry from ${fields.name}`,
      text: email.text,
      html: email.html,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend rejected inquiry email", resendResponse.status, await resendResponse.text());
    return json({ ok: false, code: "delivery" }, 502);
  }

  return json({ ok: true });
}

export function onRequest(context: FunctionContext): Response | Promise<Response> {
  if (context.request.method === "POST") return handlePost(context);
  return json({ ok: false, code: "method" }, 405);
}
