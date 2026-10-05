// Static site generator. Run: node build.mjs  ->  writes the site to ./docs (served by GitHub Pages).
import { mkdirSync, writeFileSync, rmSync, readFileSync, readdirSync } from "node:fs";
import { biz, towns, situations, faqs, story } from "./content.mjs";

const OUT = "docs";
mkdirSync(OUT, { recursive: true });
for (const f of readdirSync(OUT)) rmSync(`${OUT}/${f}`, { recursive: true, force: true });

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${biz.email}`;
const css = readFileSync("src/style.css", "utf8");
const js = readFileSync("src/main.js", "utf8");
writeFileSync(`${OUT}/style.css`, css);
writeFileSync(`${OUT}/main.js`, js.replace("__FORM_ENDPOINT__", FORM_ENDPOINT));
for (const f of ["favicon.svg", "og.png"]) { try { writeFileSync(`${OUT}/${f}`, readFileSync(`src/${f}`)); } catch {} }

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pages = [];

const logo = `<a class="logo" href="/" aria-label="${biz.name} home">
  <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="var(--green)"/><path d="M8 16.5 16 9l8 7.5V24h-5.5v-5h-5v5H8z" fill="var(--paper)"/></svg>
  <span><b>Simpson</b> Properties</span></a>`;

const phoneIcon = `<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>`;

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${biz.url}/#business`,
  name: biz.name,
  legalName: biz.legal,
  url: biz.url,
  telephone: biz.phoneE164,
  email: biz.email,
  image: `${biz.url}/og.png`,
  logo: `${biz.url}/favicon.svg`,
  description: `${biz.name} buys houses for cash in ${biz.region}, as-is, with no repairs, commissions, or fees to the seller.`,
  priceRange: "$$",
  founder: { "@type": "Person", name: biz.owner },
  areaServed: towns.map((t) => ({ "@type": "City", name: `${t.name}, AR` })),
  knowsAbout: ["selling a house for cash", "inherited property", "avoiding foreclosure", "selling a rental property", "selling a house as-is"],
};

function layout({ path, title, desc, body, schema = [], minimal = false, noindex = false }) {
  const canonical = biz.url + path;
  const ld = [localBusiness, ...schema].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n");
  const nav = minimal ? "" : `<nav class="nav" aria-label="Main">
      <a href="/how-it-works/">How it works</a><a href="/about/">About</a><a href="/faq/">FAQ</a></nav>`;
  pages.push({ path, noindex });
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex">' : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${biz.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${biz.url}/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#1F3D2B">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="/style.css">
<!-- Google Ads / GA4 tag goes here when ads start -->
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="wrap top-in">
  ${logo}
  ${nav}
  <a class="call" href="tel:${biz.phoneE164}">${phoneIcon}<span>${biz.phone}</span></a>
</div></header>
<main id="main">
${body}
</main>
<footer class="foot"><div class="wrap">
  <div class="foot-grid">
    <div>${logo}<p>We buy houses for cash in ${biz.region}. As-is, no commissions, on your timeline.</p>
      <p><a href="tel:${biz.phoneE164}">${biz.phone}</a><br><a href="mailto:${biz.email}">${biz.email}</a></p></div>
    <div><h3>Areas we buy</h3><ul>${towns.map((t) => `<li><a href="/sell-my-house-fast-${t.slug}-ar/">${t.name}</a></li>`).join("")}</ul></div>
    <div><h3>Situations</h3><ul>${situations.map((s) => `<li><a href="/${s.slug}/">${s.title}</a></li>`).join("")}</ul></div>
    <div><h3>Company</h3><ul><li><a href="/get-offer/">Get a cash offer</a></li><li><a href="/how-it-works/">How it works</a></li><li><a href="/about/">About</a></li><li><a href="/faq/">FAQ</a></li><li><a href="/privacy/">Privacy policy</a></li><li><a href="/terms/">Terms</a></li></ul></div>
  </div>
  <p class="legal">&copy; ${new Date().getFullYear()} ${biz.legal}. Mailing address: ${biz.mailing}. We are a real estate investment company, not a licensed real estate broker or agent, and we do not represent buyers or sellers. We may buy properties directly or assign our purchase contracts to other investors.</p>
</div></footer>
<a class="sticky-call" href="tel:${biz.phoneE164}">${phoneIcon} Call ${biz.phone}</a>
<script src="/main.js" defer></script>
</body>
</html>`;
}

function write(path, html) {
  const dir = OUT + path;
  mkdirSync(dir, { recursive: true });
  writeFileSync(dir + "index.html", html);
}

// ---------- shared blocks ----------
const quickForm = (heading = "Get your cash offer") => `
<form class="card offer-card" action="/get-offer/" method="get" data-quick>
  <h2>${heading}</h2>
  <p class="muted">Usually within 24 hours. No obligation.</p>
  <label for="qa">Property address</label>
  <input id="qa" name="address" autocomplete="street-address" placeholder="123 Main St, Little Rock" required>
  <button class="btn" type="submit">Get my offer</button>
  <p class="fine">Or call <a href="tel:${biz.phoneE164}">${biz.phone}</a></p>
</form>`;

const trust = `<ul class="trust">
  <li><b>$0</b> commissions</li><li><b>0</b> repairs</li><li><b>24 hr</b> offers</li><li><b>You</b> pick the date</li></ul>`;

const steps = `<section class="sec"><div class="wrap">
  <h2 class="h2">How it works</h2>
  <ol class="steps">
    <li><span>1</span><h3>Tell us about the house</h3><p>Fill out the short form or call. Takes about two minutes.</p></li>
    <li><span>2</span><h3>Get a fair cash offer</h3><p>We look at the house once and give you a written offer, usually within 24 hours.</p></li>
    <li><span>3</span><h3>Close when you want</h3><p>A local title company handles the paperwork. You get paid at closing.</p></li>
  </ol>
</div></section>`;

const compare = `<section class="sec alt"><div class="wrap">
  <h2 class="h2">Selling to us vs. listing with an agent</h2>
  <div class="table-wrap"><table class="compare">
    <thead><tr><th></th><th>Selling to ${biz.short}</th><th>Listing with an agent</th></tr></thead>
    <tbody>
      <tr><th>Commissions</th><td>None</td><td>Often 5 to 6%</td></tr>
      <tr><th>Repairs and cleaning</th><td>None, sell as-is</td><td>Usually expected</td></tr>
      <tr><th>Showings</th><td>One visit</td><td>Many, plus open houses</td></tr>
      <tr><th>Closing costs</th><td>We pay normal closing costs</td><td>Seller often pays part</td></tr>
      <tr><th>Time to close</th><td>About 2 weeks, or your date</td><td>Often 2 to 4 months</td></tr>
      <tr><th>Risk of falling through</th><td>Low, no loan approval needed</td><td>Buyer financing can fail</td></tr>
    </tbody></table></div>
  <p class="fine">Listing can get a higher price for a house in great shape. A cash sale trades some price for speed, certainty, and no repairs. We will help you figure out which fits you.</p>
</div></section>`;

const situationGrid = `<section class="sec"><div class="wrap">
  <h2 class="h2">We buy houses in any situation</h2>
  <div class="grid3">${situations.map((s) => `<a class="tile" href="/${s.slug}/"><h3>${s.title}</h3><p>${s.lead.split(". ")[0].replace(/\.$/, "")}.</p><span class="arrow">Learn more</span></a>`).join("")}</div>
</div></section>`;

const aboutBlock = `<section class="sec alt"><div class="wrap about">
  <div class="avatar" aria-hidden="true">ZS</div>
  <div><h2 class="h2">A local buyer, not a call center</h2>
  <p class="lede">${story[0]}</p><p>${story[3]}</p>
  <a class="link" href="/about/">Read Zach's story</a></div>
</div></section>`;

const faqBlock = (list) => `<div class="faq">${list.map(([q, a]) => `<details><summary><h3>${q}</h3></summary><p>${a}</p></details>`).join("")}</div>`;
const faqSchema = (list) => ({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: list.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });

const finalCta = (place = "Central Arkansas") => `<section class="sec cta"><div class="wrap cta-in">
  <div><h2 class="h2">Ready to see what your ${place} house is worth in cash?</h2><p>Get a no-obligation offer. If it does not work for you, no hard feelings.</p></div>
  <div class="cta-btns"><a class="btn" href="/get-offer/">Get my cash offer</a><a class="btn ghost" href="tel:${biz.phoneE164}">Call ${biz.phone}</a></div>
</div></section>`;

const crumbs = (items) => ({ "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: biz.url + path })) });

// ---------- home ----------
write("/", layout({
  path: "/",
  title: `Sell Your House Fast for Cash in Little Rock, AR | ${biz.short}`,
  desc: `We buy houses for cash in Little Rock and Central Arkansas. Any condition, no repairs, no commissions. Get a fair offer in 24 hours and close on your date.`,
  schema: [faqSchema(faqs.slice(0, 6)), { "@context": "https://schema.org", "@type": "HowTo", name: "How to sell your house for cash in Little Rock",
    step: [["Tell us about the house", "Fill out the form or call."], ["Get a cash offer", "We visit once and make a written offer, usually within 24 hours."], ["Close on your date", "A local title company handles closing and you get paid."]]
      .map(([name, text], i) => ({ "@type": "HowToStep", position: i + 1, name, text })) }],
  body: `
<section class="hero"><div class="wrap hero-in">
  <div>
    <p class="eyebrow">Little Rock &middot; Central Arkansas</p>
    <h1>Sell your house for cash. <em>As-is, on your timeline.</em></h1>
    <p class="lede">We buy houses in any condition across Little Rock and Central Arkansas. No repairs, no cleaning, no commissions. A fair written offer, usually within 24 hours.</p>
    ${trust}
  </div>
  ${quickForm()}
</div></section>
${steps}
${compare}
${situationGrid}
${aboutBlock}
<section class="sec"><div class="wrap narrow">
  <h2 class="h2">Common questions</h2>
  ${faqBlock(faqs.slice(0, 6))}
  <a class="link" href="/faq/">See all questions</a>
</div></section>
<section class="sec alt"><div class="wrap">
  <h2 class="h2">Areas we buy houses</h2>
  <ul class="chips">${towns.map((t) => `<li><a href="/sell-my-house-fast-${t.slug}-ar/">${t.name}</a></li>`).join("")}</ul>
</div></section>
${finalCta()}`,
}));

// ---------- get offer ----------
write("/get-offer/", layout({
  path: "/get-offer/", minimal: true,
  title: `Get a Cash Offer for Your House | ${biz.short}`,
  desc: "Tell us about your property and get a fair, no-obligation cash offer, usually within 24 hours.",
  body: `<section class="sec"><div class="wrap narrow">
  <h1 class="h1-sm">Get your cash offer</h1>
  <p class="lede">Two quick steps. No obligation, and we never sell your information.</p>
  <form id="offer" class="card form" novalidate>
    <div class="progress" aria-hidden="true"><span></span></div>
    <fieldset data-step="1">
      <legend>Step 1 of 2: The property</legend>
      <label for="address">Property address</label>
      <input id="address" name="address" autocomplete="street-address" required>
      <label for="condition">What shape is it in?</label>
      <select id="condition" name="condition" required><option value="">Choose one</option><option>Move-in ready</option><option>Needs a little work</option><option>Needs a lot of work</option><option>Not livable</option></select>
      <label for="timeline">When do you want to sell?</label>
      <select id="timeline" name="timeline" required><option value="">Choose one</option><option>As soon as possible</option><option>Within 30 days</option><option>1 to 3 months</option><option>Just exploring</option></select>
      <button class="btn" type="button" data-next>Continue</button>
    </fieldset>
    <fieldset data-step="2" hidden>
      <legend>Step 2 of 2: Where should we send your offer?</legend>
      <label for="name">Your name</label>
      <input id="name" name="name" autocomplete="name" required>
      <label for="phone">Phone</label>
      <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
      <label for="email">Email <span class="muted">(optional)</span></label>
      <input id="email" name="email" type="email" autocomplete="email">
      <label class="check"><input type="checkbox" name="sms_consent_service" value="yes"> <span>I agree to receive text messages from ${biz.legal} about my property inquiry and offer. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of any purchase.</span></label>
      <label class="check"><input type="checkbox" name="sms_consent_marketing" value="yes"> <span>I agree to receive occasional marketing text messages from ${biz.legal}. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Consent is not a condition of any purchase.</span></label>
      <p class="fine">By submitting, you agree to our <a href="/terms/">Terms</a> and <a href="/privacy/">Privacy Policy</a>. We will contact you about your property by phone or email.</p>
      <input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="row"><button class="btn ghost" type="button" data-back>Back</button><button class="btn" type="submit">Get my offer</button></div>
      <p class="form-error" role="alert" hidden>Something went wrong. Please call us at <a href="tel:${biz.phoneE164}">${biz.phone}</a>.</p>
    </fieldset>
  </form>
</div></section>`,
}));

write("/thank-you/", layout({
  path: "/thank-you/", minimal: true, noindex: true,
  title: `Thank you | ${biz.short}`, desc: "We got your information.",
  body: `<section class="sec"><div class="wrap narrow center">
  <h1 class="h1-sm">Got it. Thank you.</h1>
  <p class="lede">Zach will reach out shortly, usually the same day, to ask a few questions about the house.</p>
  <p>Want to talk now? Call <a href="tel:${biz.phoneE164}">${biz.phone}</a>.</p>
  <!-- Google Ads conversion event fires here when ads start -->
</div></section>`,
}));

// ---------- town pages ----------
for (const t of towns) {
  const path = `/sell-my-house-fast-${t.slug}-ar/`;
  const tfaq = [
    [`How fast can I sell my house in ${t.name}?`, `We can usually make a written cash offer within 24 hours of seeing the house and close in about two weeks, depending on the title company. You can also pick a later date.`],
    [`Do you buy houses in ${t.name} that need repairs?`, `Yes. We buy ${t.name} houses as-is, including ones with foundation, roof, plumbing, or other major problems. You do not need to fix or clean anything.`],
    [`Does it cost anything to sell my ${t.name} house to you?`, `No. There are no commissions or fees to us, and we pay the normal closing costs. Any mortgage or liens are paid off at closing.`],
  ];
  write(path, layout({
    path,
    title: `Sell My House Fast ${t.name}, AR | Cash Home Buyers | ${biz.short}`,
    desc: `Need to sell your house fast in ${t.name}, Arkansas? We buy houses for cash in any condition. No repairs, no commissions. Offer in 24 hours.`,
    schema: [faqSchema(tfaq), crumbs([["Home", "/"], [`Sell my house fast ${t.name}`, path]])],
    body: `
<section class="hero"><div class="wrap hero-in">
  <div>
    <p class="eyebrow">${t.name} &middot; ${t.county}</p>
    <h1>Sell your ${t.name} house fast. <em>For cash, as-is.</em></h1>
    <p class="lede">We buy houses in ${t.name}, including ${t.areas}. Any condition, no repairs, no commissions, and you choose the closing date.</p>
    ${trust}
  </div>
  ${quickForm(`Get your ${t.name} offer`)}
</div></section>
<section class="sec"><div class="wrap narrow">
  <h2 class="h2">Selling a house in ${t.name}</h2>
  <p>${t.note}</p>
  <p>Here is how it works: you tell us about the house, we visit once, and we give you a written cash offer, usually within 24 hours. If you accept, a local title company handles the closing. If you do not, there is no cost and no pressure.</p>
</div></section>
${steps}
${compare}
<section class="sec"><div class="wrap narrow"><h2 class="h2">${t.name} questions</h2>${faqBlock(tfaq)}</div></section>
${finalCta(t.name)}`,
  }));
}

// ---------- situation pages ----------
for (const s of situations) {
  const path = `/${s.slug}/`;
  write(path, layout({
    path,
    title: `${s.title} in Little Rock, AR | ${biz.short}`,
    desc: `${s.lead.split(". ")[0]}. Cash offers in Little Rock and Central Arkansas.`,
    schema: [crumbs([["Home", "/"], [s.title, path]])],
    body: `
<section class="hero"><div class="wrap hero-in">
  <div><p class="eyebrow">Little Rock &middot; Central Arkansas</p><h1>${s.h1}</h1><p class="lede">${s.lead}</p>${trust}</div>
  ${quickForm()}
</div></section>
<section class="sec"><div class="wrap"><div class="grid3">${s.points.map(([h, p]) => `<div class="tile plain"><h3>${h}</h3><p>${p}</p></div>`).join("")}</div></div></section>
${steps}
${finalCta()}`,
  }));
}

// ---------- simple pages ----------
write("/how-it-works/", layout({
  path: "/how-it-works/", title: `How Selling Your House for Cash Works | ${biz.short}`,
  desc: "Three steps to sell your house for cash in Little Rock: tell us about it, get a written offer, close on your date.",
  body: `<section class="sec"><div class="wrap narrow"><h1 class="h1-sm">How selling to us works</h1>
  <p class="lede">Selling your house for cash takes three steps and usually about two weeks. You never pay commissions, and you do not fix anything.</p></div></section>
  ${steps}${compare}${finalCta()}`,
}));

write("/about/", layout({
  path: "/about/", title: `About Zach Simpson | ${biz.name}`,
  desc: `Meet Zach Simpson, owner of ${biz.name}. We buy houses for cash in Little Rock and Central Arkansas.`,
  schema: [{ "@context": "https://schema.org", "@type": "AboutPage", about: { "@id": `${biz.url}/#business` } }],
  body: `<section class="sec"><div class="wrap narrow"><div class="avatar big" aria-hidden="true">ZS</div>
  <h1 class="h1-sm">Hi, I'm Zach.</h1>${story.map((p, i) => `<p${i === 0 ? ' class="lede"' : ""}>${p}</p>`).join("")}
  <p><a class="btn" href="/get-offer/">Get a cash offer</a></p></div></section>`,
}));

write("/faq/", layout({
  path: "/faq/", title: `Selling Your House for Cash: FAQ | ${biz.short}`,
  desc: "Answers to common questions about selling your house for cash in Little Rock and Central Arkansas.",
  schema: [faqSchema(faqs)],
  body: `<section class="sec"><div class="wrap narrow"><h1 class="h1-sm">Frequently asked questions</h1>${faqBlock(faqs)}</div></section>${finalCta()}`,
}));

const updated = "October 5, 2026";
write("/privacy/", layout({
  path: "/privacy/", title: `Privacy Policy | ${biz.short}`, desc: `Privacy policy for ${biz.legal}.`,
  body: `<section class="sec"><div class="wrap narrow prose"><h1 class="h1-sm">Privacy Policy</h1><p class="muted">Last updated ${updated}</p>
<p>This policy explains how ${biz.legal} ("we", "us") collects and uses information on ${biz.domain}.</p>
<h2>Information we collect</h2><p>When you fill out a form or contact us, we collect what you give us: your name, phone number, email, property address, and details about the property. We also collect basic website analytics such as pages visited and device type.</p>
<h2>How we use it</h2><p>We use your information to respond to your inquiry, evaluate your property, make you an offer, and communicate with you about it. If you opt in, we may send you text messages as described below.</p>
<h2>Text messaging</h2><p>If you check a text-message consent box, you agree to receive text messages from ${biz.legal} at the number you provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time, or HELP for help. Consent is not a condition of any purchase.</p>
<p><b>No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.</b></p>
<h2>Sharing</h2><p>We do not sell your personal information. We may share it with service providers who help us run our business (such as our form, email, and CRM tools), with a title company or attorney to complete a transaction you agree to, with a buyer or investor partner if we assign our contract (only the information needed to complete your sale), or when required by law.</p>
<h2>Your choices</h2><p>You can ask us to update or delete your information or stop contacting you by emailing <a href="mailto:${biz.email}">${biz.email}</a> or calling ${biz.phone}.</p>
<h2>Contact</h2><p>${biz.legal}<br>${biz.mailing}<br>${biz.phone}<br>${biz.email}</p></div></section>`,
}));

write("/terms/", layout({
  path: "/terms/", title: `Terms and Conditions | ${biz.short}`, desc: `Terms and conditions for ${biz.legal}.`,
  body: `<section class="sec"><div class="wrap narrow prose"><h1 class="h1-sm">Terms and Conditions</h1><p class="muted">Last updated ${updated}</p>
<p>By using ${biz.domain} you agree to these terms.</p>
<h2>Who we are</h2><p>${biz.legal} is a real estate investment company. We are not a licensed real estate broker or agent and do not represent buyers or sellers. Submitting a form does not create a contract. Any purchase happens only under a signed written purchase agreement. We may purchase properties directly or assign our purchase contracts to other investors. You are encouraged to consult your own attorney or agent.</p>
<h2>SMS program</h2><p>Program name: ${biz.name} Seller Updates. If you opt in, you will receive text messages about your property inquiry and offer, and, if you separately opt in, occasional marketing messages. Message frequency varies. Message and data rates may apply. Reply STOP to cancel at any time; you will receive one confirmation message. Reply HELP for help, or contact ${biz.phone} or ${biz.email}. Carriers are not liable for delayed or undelivered messages. See our <a href="/privacy/">Privacy Policy</a>.</p>
<h2>No guarantees</h2><p>Offers depend on a property's condition, title, and market. Time frames on this site are typical, not promised.</p>
<h2>Website content</h2><p>Information on this site is general and not legal, tax, or financial advice.</p>
<h2>Contact</h2><p>${biz.legal}<br>${biz.mailing}<br>${biz.phone}<br>${biz.email}</p></div></section>`,
}));

// ---------- 404, sitemap, robots, llms.txt, CNAME ----------
writeFileSync(`${OUT}/404.html`, layout({ path: "/404", noindex: true, title: `Page not found | ${biz.short}`, desc: "Page not found.",
  body: `<section class="sec"><div class="wrap narrow center"><h1 class="h1-sm">That page is not here.</h1><p><a class="btn" href="/">Go home</a></p></div></section>` }));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${biz.url}${p.path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>`);
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /thank-you/\n\nSitemap: ${biz.url}/sitemap.xml\n`);
writeFileSync(`${OUT}/llms.txt`, `# ${biz.name}

> ${biz.name} is a real estate investment company owned by ${biz.owner}. It buys houses for cash in ${biz.region}, as-is, with no repairs, commissions, or fees to the seller. Phone ${biz.phone}. Email ${biz.email}.

## Key pages
- [Get a cash offer](${biz.url}/get-offer/)
- [How it works](${biz.url}/how-it-works/)
- [FAQ](${biz.url}/faq/)
- [About](${biz.url}/about/)

## Areas served
${towns.map((t) => `- [${t.name}, AR](${biz.url}/sell-my-house-fast-${t.slug}-ar/)`).join("\n")}

## Situations
${situations.map((s) => `- [${s.title}](${biz.url}/${s.slug}/)`).join("\n")}
`);
writeFileSync(`${OUT}/CNAME`, biz.domain + "\n");
writeFileSync(`${OUT}/.nojekyll`, "");
console.log(`Built ${pages.length} pages into ./${OUT}`);
