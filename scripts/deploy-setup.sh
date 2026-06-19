#!/usr/bin/env bash
# Idempotent Cloudflare Pages bootstrap via Wrangler CLI.
#
# This script only does what the CLI can do reliably:
#   - confirm you're authenticated
#   - create the Pages project if it doesn't exist yet (direct-upload shell;
#     you still connect it to Git in the dashboard afterward)
#   - set secrets that are the SAME value in both Production and Preview
#
# It deliberately does NOT set anything that must differ between Production
# and Preview (Turnstile keys, ALLOWED_ORIGINS, INQUIRY_TO_EMAIL, etc.) —
# the Wrangler CLI has no per-environment flag for Pages secrets/vars, so
# those are dashboard-only. See docs/DEPLOY.md for the full checklist.
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT_NAME="$(node -e "
const fs = require('node:fs');
const raw = fs.readFileSync('wrangler.jsonc', 'utf8').replace(/\/\/.*\$/gm, '');
console.log(JSON.parse(raw).name);
")"
PRODUCTION_BRANCH="main"

# Secrets whose value is intentionally identical across Production and
# Preview. Add names here only if that's true for the secret.
SHARED_SECRETS=("RESEND_API_KEY")

echo "==> Checking Wrangler auth..."
if ! pnpm exec wrangler whoami >/dev/null 2>&1; then
  echo "Not authenticated. Run 'pnpm exec wrangler login' interactively," \
       "or set CLOUDFLARE_API_TOKEN in your shell for non-interactive use."
  exit 1
fi
pnpm exec wrangler whoami

echo "==> Checking for Pages project '${PROJECT_NAME}'..."
if pnpm exec wrangler pages project list 2>/dev/null | grep -qw "${PROJECT_NAME}"; then
  echo "Project '${PROJECT_NAME}' already exists. Skipping creation."
else
  echo "Creating Pages project '${PROJECT_NAME}' (production branch: ${PRODUCTION_BRANCH})..."
  pnpm exec wrangler pages project create "${PROJECT_NAME}" --production-branch="${PRODUCTION_BRANCH}"
fi

echo "==> Checking shared secrets..."
EXISTING_SECRETS="$(pnpm exec wrangler pages secret list --project-name="${PROJECT_NAME}" 2>/dev/null || true)"
for secret in "${SHARED_SECRETS[@]}"; do
  if echo "${EXISTING_SECRETS}" | grep -qw "${secret}"; then
    echo "  ${secret} already set. Skipping."
  else
    echo "  ${secret} is not set. You'll be prompted to paste its value (hidden input, never written to disk)."
    pnpm exec wrangler pages secret put "${secret}" --project-name="${PROJECT_NAME}"
  fi
done

cat <<EOF

==> Wrangler-side setup done for '${PROJECT_NAME}'.

Remaining steps require the Cloudflare dashboard (see docs/DEPLOY.md):
  1. Connect this Pages project to its GitHub repo (Settings > Builds & deployments).
  2. Set build command "pnpm build", output directory "dist".
  3. Add Production + Preview environment variables and per-environment secrets
     (PUBLIC_TURNSTILE_SITE_KEY, TURNSTILE_SECRET_KEY, ALLOWED_ORIGINS,
     INQUIRY_TO_EMAIL, INQUIRY_FROM_EMAIL).
  4. Add the production custom domain, and a Preview custom domain scoped to
     the "staging" branch for a stable staging URL.
EOF
