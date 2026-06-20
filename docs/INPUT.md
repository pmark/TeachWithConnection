# Requests by AT for information or action provided by the web developer.

## Current tasks

1. Configure Cloudflare Pages values for `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL`; verify the Resend sender domain in DNS.
2. Update WithConnectionPDX.com to link contextually to TeachWithConnection.com, include TeachWithConnection.com in Katie's `Person.sameAs`, and canonicalize duplicated educator bookstore pages to their TeachWithConnection equivalents.
3. Provide or approve final legal copy for `/privacy/`, `/disclaimer/`, and `/terms/`.

## Current information requests

1. Confirm the production sender and Katie recipient email addresses for inquiry delivery.
2. Confirm whether the existing With Connection logo, photography, testimonials, third-party logos, and organization/client proof may be reused on this static site.
   - Specifically for the "Past Presentations and Partnerships" logo wall (Oregon Department of Early Learning and Care, Marion and Polk Early Learning Hub, Portland Community College, Portland State University, EveryChild California, Silver Falls School District, NAEYC, Think Small Institute, Redleaf Press, University of Michigan, Head Start, Discover, Western Oregon University): confirm each is an accurate, current, owner-approved relationship, then supply usable logo image files (SVG or PNG, transparent background preferred) for each. An automated content-safety check in this environment blocks the agent from writing these organization names into `src/content/proof/` as asserted partner facts on its own, so the content files need to be added directly by the owner/developer — see the template noted in `docs/STATUS.md`. The `PartnerLogoBar` component (`src/components/proof/PartnerLogoBar.astro`) and the `public/images/partners/` directory are already in place and will pick up entries automatically once added.
3. Provide or approve launch resource files and identify the existing With Connection articles to migrate.

## Other requests

After production configuration, send one real inquiry through the mobile form and confirm receipt and reply-to behavior in Katie's mailbox.
