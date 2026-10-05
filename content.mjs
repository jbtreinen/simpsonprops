// All site copy and business facts live here. Edit this file, then run `node build.mjs`.

export const biz = {
  name: "Simpson Investment Properties",
  legal: "Simpson Investment Properties LLC",
  short: "Simpson Properties",
  domain: "simpsonprops.com",
  url: "https://simpsonprops.com",
  phone: "(469) 490-6776",
  phoneE164: "+14694906776",
  email: "simpsonpropsllc@gmail.com",
  mailing: "13831 Peyton Dr, Dallas, TX 75240",
  region: "Little Rock and Central Arkansas",
  owner: "Zach Simpson",
};

// Town pages. Facts kept to geography that is easy to verify.
export const towns = [
  { slug: "little-rock", name: "Little Rock", county: "Pulaski County",
    areas: "Hillcrest, the Heights, Midtown, Southwest Little Rock, Chenal, and downtown",
    note: "Little Rock has everything from 1920s bungalows to 1990s subdivisions. Older homes often need roof, foundation, or plumbing work before they would pass a buyer's inspection. We buy them as they sit." },
  { slug: "north-little-rock", name: "North Little Rock", county: "Pulaski County",
    areas: "Park Hill, Argenta, Levy, Lakewood, and Indian Hills",
    note: "A lot of North Little Rock houses are older, owner-occupied homes that have been in a family for decades. If you inherited one or simply do not want to fix it up, we can make you an offer as-is." },
  { slug: "conway", name: "Conway", county: "Faulkner County",
    areas: "neighborhoods near UCA and Hendrix, downtown Conway, and the newer subdivisions off Dave Ward Drive",
    note: "Conway has a lot of rental houses near the colleges. If you are a landlord who is tired of turnovers and repairs, we buy rentals with or without tenants in place." },
  { slug: "benton", name: "Benton", county: "Saline County",
    areas: "neighborhoods on both sides of I-30, near downtown Benton and out toward Highway 5",
    note: "Saline County keeps growing, but plenty of older Benton homes need updates that buyers do not want to take on. We take on the repairs so you do not have to." },
  { slug: "bryant", name: "Bryant", county: "Saline County",
    areas: "neighborhoods along I-30, Reynolds Road, and Highway 5",
    note: "Bryant is mostly newer homes, but life still happens: job moves, divorce, or a mortgage that got behind. We can work to your timeline." },
  { slug: "cabot", name: "Cabot", county: "Lonoke County",
    areas: "neighborhoods along Highway 67/167 and Highway 89",
    note: "Whether your Cabot house needs work or you just need to move on fast, we can make a cash offer and close when it suits you." },
  { slug: "sherwood", name: "Sherwood", county: "Pulaski County",
    areas: "neighborhoods off Kiehl Avenue, Highway 107, and Maryland Avenue",
    note: "Sherwood homeowners call us for the usual reasons: an inherited house, a move, or repairs they do not want to pay for. We keep it simple." },
  { slug: "jacksonville", name: "Jacksonville", county: "Pulaski County",
    areas: "neighborhoods near Little Rock Air Force Base and along Highway 67/167",
    note: "Military families get orders on short notice. If you need to sell before a PCS move, we can set a closing date that fits your report date." },
  { slug: "maumelle", name: "Maumelle", county: "Pulaski County",
    areas: "neighborhoods throughout Maumelle along Maumelle Boulevard",
    note: "If you want to skip showings, open houses, and agent fees on your Maumelle home, a direct sale may be the easier path." },
  { slug: "hot-springs", name: "Hot Springs", county: "Garland County",
    areas: "Hot Springs proper, around Lake Hamilton, and nearby communities",
    note: "Hot Springs has a lot of second homes, rentals, and inherited properties owned by people who live out of town. We can handle most of the sale remotely." },
];

// Situation pages.
export const situations = [
  { slug: "inherited-house", title: "Sell an inherited house", h1: "Inherited a house in Arkansas? We can buy it as-is.",
    lead: "You do not have to clean it out, fix it up, or list it. We buy inherited houses in any condition and work with the timeline of the estate.",
    points: [
      ["Leave what you do not want", "Take the things that matter to you. Leave the rest. We handle the clean-out after closing."],
      ["Probate is okay", "If the estate is still in probate, we can sign a contract now and close when the court allows. The title company works through the paperwork."],
      ["Split it fairly", "When several heirs own the house, a single cash number makes it easier for everyone to agree."],
    ] },
  { slug: "avoid-foreclosure", title: "Sell before foreclosure", h1: "Behind on payments? Sell before the foreclosure date.",
    lead: "If you are behind on your mortgage, selling before the sale date can protect your credit and may leave you with cash. Time matters, so call early.",
    points: [
      ["Fast closings", "We can often close in a couple of weeks, depending on the title company and your lender."],
      ["We work with your lender", "The title company pays off your loan at closing. If you owe more than the house is worth, we can talk through options."],
      ["No pressure", "We will give you a straight answer on whether selling to us makes sense, even if it does not."],
    ] },
  { slug: "tired-landlord", title: "Sell a rental property", h1: "Tired of being a landlord? Sell your rental as-is.",
    lead: "Late rent, repairs, and turnovers add up. We buy rental houses with tenants in place or vacant, in any condition.",
    points: [
      ["Tenants can stay", "You do not need to empty the house first. We can buy it with the lease in place."],
      ["Skip the make-ready", "No new carpet, paint, or repairs. We buy it as it sits."],
      ["One clean exit", "One closing, one check, and you are done."],
    ] },
  { slug: "house-needs-repairs", title: "Sell a house that needs repairs", h1: "House needs work? Sell it without fixing anything.",
    lead: "Foundation, roof, plumbing, fire or water damage, or just decades of wear. We buy houses that would not pass a regular buyer's inspection.",
    points: [
      ["No repairs", "We price the repairs into our offer so you do not pay for them up front."],
      ["No cleaning", "Leave it how it is."],
      ["No inspection surprises", "We look at the house once, then make an offer. No renegotiating after a long inspection list."],
    ] },
  { slug: "divorce", title: "Sell a house during divorce", h1: "Selling a house during a divorce? Keep it simple.",
    lead: "A quick, private sale with one clear number can make a hard time a little easier. We work with both owners and their attorneys.",
    points: [
      ["One clear number", "A cash offer both sides can see and agree to."],
      ["Private", "No sign in the yard, no open houses."],
      ["Your timeline", "Close fast, or set a date that fits the court schedule."],
    ] },
  { slug: "relocating", title: "Sell fast when relocating", h1: "Moving for work or family? Sell on your schedule.",
    lead: "If you are moving and do not want to carry two houses, we can make an offer quickly and close on the date you pick.",
    points: [
      ["Pick your date", "Close in a couple of weeks or a couple of months."],
      ["Sell from anywhere", "Most of the sale can happen by phone, email, and e-signature."],
      ["No showings", "No keeping the house spotless while you pack."],
    ] },
];

// FAQ. Question headings with direct answers (good for Google and AI answer engines).
export const faqs = [
  ["How do I sell my house fast in Little Rock?",
   "Call us or fill out the form with your address. We ask a few questions about the house, look at it once, and make a cash offer, usually within 24 hours. If you accept, a local title company handles the closing on the date you choose. There is no listing, no repairs, and no agent commission."],
  ["How much will you offer for my house?",
   "We look at what similar houses nearby have sold for, then subtract the repairs the house needs and our costs. You get a written number and we walk you through how we got it. You are never obligated to accept."],
  ["Do I have to make repairs or clean?",
   "No. We buy houses as-is. Leave anything you do not want and we will deal with it after closing."],
  ["Are there any fees or commissions?",
   "No. You do not pay agent commissions or fees to us. We cover the normal closing costs, so the number we agree on is the number you can expect at closing, minus any loan payoff or liens on the property."],
  ["How fast can you close?",
   "Often in about two weeks, depending on how quickly the title company can clear title. If you need more time, you pick the date."],
  ["Are you real estate agents?",
   "No. We are a local real estate investment company. We are not your agent and do not represent you. You are welcome to have your own agent or attorney review any offer."],
  ["Will you be the one who buys my house?",
   "Sometimes we buy and hold the house ourselves, and sometimes we partner with or assign our contract to another investor. Either way, your price and closing terms in the contract stay the same, and we will tell you up front how your sale will work."],
  ["What areas do you buy in?",
   "Little Rock and Central Arkansas, including North Little Rock, Conway, Benton, Bryant, Cabot, Sherwood, Jacksonville, Maumelle, and Hot Springs."],
  ["What kinds of houses do you buy?",
   "Single-family houses in any condition: inherited homes, rentals, houses that need major repairs, and homes facing foreclosure. If you are not sure, just ask."],
];

// About story. DRAFT for Zach to revise. Kept free of specific facts we have not confirmed.
export const story = [
  "I'm Zach Simpson. I started Simpson Investment Properties for a simple reason: selling a house the normal way does not work for everyone.",
  "Some people inherit a house they never planned on owning. Some are behind on payments and running out of time. Some just do not have the money or energy to fix up a place before they sell it. For them, months of showings, repairs, and commissions is not a real option.",
  "What I offer is a straight answer. I will look at your house, tell you what I can pay and why, and if it works for you, we close on your timeline through a local title company. If it does not make sense for you to sell to me, I will tell you that too.",
  "When you call, you talk to me. Not a call center.",
];
