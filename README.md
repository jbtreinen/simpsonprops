# simpsonprops.com

Seller website for Simpson Investment Properties LLC. Static site for GitHub Pages.

- Edit copy and business info in `content.mjs`. Styles in `src/style.css`, form logic in `src/main.js`.
- Build: `node build.mjs` (writes `docs/`). GitHub Pages serves `docs/` on `main`.
- Leads: the offer form posts to FormSubmit, which emails simpsonpropsllc@gmail.com.
- Ads later: paste the Google tag at the `Google Ads / GA4 tag` comment in `build.mjs`, and the conversion event on the thank-you page.
