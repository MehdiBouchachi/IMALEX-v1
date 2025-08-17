// Add these near the top of app/_data/fakePosts.js

export const longBodyA = [
  {
    t: "p",
    x: "In 2025, natural formulation is no longer optional—it’s **table stakes**. This deep dive focuses on lab realities, not hype, so your team can ship safer products without losing velocity.",
  },

  { t: "h2", x: "Executive summary" },
  {
    t: "ul",
    x: [
      "Bio-based emulsifiers now have stable lead times from two regions.",
      "Microbiome-safe preservatives are viable at mass-market price points.",
      "QC gets its biggest ROI from small automation (labels, `audit logs`, sample tracking).",
      "Sustainability claims must be backed by documents: LCA, CoA, traceability.",
    ],
  },

  { t: "h2", x: "Market drivers (why now)" },
  {
    t: "p",
    x: "Three forces converge: tighter regulation, more informed consumers, and volatile petro-derived costs. Brands that ship with **data-backed** claims win trust; vague narratives get hammered by retailers.",
  },
  { t: "h3", x: "Regulatory pressure" },
  {
    t: "p",
    x: "Expect faster updates on allowable actives and declaration formats. Plan for documentation-first pipelines where each batch carries digital paperwork from supplier → shelf.",
  },
  { t: "h3", x: "Consumer literacy" },
  {
    t: "p",
    x: "Ingredient lists are scrutinized; certifications and transparent sourcing stories are _shareable assets_. This fuels demand for plant-derived inputs and low-impact profiles.",
  },

  { t: "h2", x: "R&D: what works in the lab" },
  {
    t: "p",
    x: "Teams that win start with constraints. Pick a small set of compatible building blocks and tune for **stability** before chasing micro-optimizations.",
  },
  { t: "h3", x: "Emulsifiers" },
  {
    t: "ul",
    x: [
      "Sunflower- and sugar-derived blends show better cold-flow vs last year.",
      "For sensitive actives, pair with antioxidants; watch pH drift after 4 weeks.",
      "Document shear profiles; replicate the same rpm/temperature window bench→pilot.",
    ],
  },
  { t: "h3", x: "Preservation" },
  {
    t: "p",
    x: "Microbiome-friendly systems are now cost-viable. Most failures we saw came from under-dosing at high water activity. Start at the recommended midpoint and validate a 14-day challenge.",
  },
  { t: "h3", x: "Texture & sensorial" },
  {
    t: "p",
    x: "Run consumer panels _after_ functional stability is locked. Early paneling on unstable formulae is noise and burns budget.",
  },

  { t: "h2", x: "Stability workflow (10-point checklist)" },
  {
    t: "ol",
    x: [
      "Lock target pH and specify meter model + calibration schedule.",
      "Define acceptance windows for viscosity, color, odor, separation.",
      "Record exact cooling profile after hot-mix.",
      "Photostability: test under your packaging’s real UV transmission.",
      "Freeze–thaw at −5/25 °C (≥3 cycles).",
      "Micro: run a reduced challenge for each **major** tweak.",
      "Document every deviation with person / time / lot.",
      "Keep a genealogy: which micro-batch fed which test.",
      "Archive instrument settings (firmware matters).",
      "When in doubt, run a small pilot with full packaging.",
    ],
  },

  { t: "h2", x: "Supply chain: de-risking naturals" },
  {
    t: "p",
    x: "Seasonality and regional shocks are normal. The playbook is dual-region coverage, qualified alternates, and supplier scorecards.",
  },
  {
    t: "ul",
    x: [
      "Carry at least one alternate per critical input (qualified in advance).",
      "Score suppliers on on-time delivery, CoA quality, complaint response time.",
      "Add buffer stock for single-harvest ingredients.",
    ],
  },

  {
    t: "blockquote",
    x: "If a sustainability claim isn’t backed by a document, it’s a **marketing liability** waiting to happen.",
  },

  { t: "h2", x: "Documentation that actually helps" },
  {
    t: "p",
    x: "Keep: latest CoA, TDS, allergen & vegan statements, and one-pager with region, harvest month, and transport mode. Store them next to the SKU in your repo.",
  },
  {
    t: "img",
    src: "/demo/blog-3.jpg",
    alt: "Supply chain snapshot",
    cap: "Dual-region sourcing reduced lead-time variance by ~22% in pilots.",
  },

  { t: "h2", x: "QC: small automation, big wins" },
  {
    t: "ul",
    x: [
      "Barcode labels generated at batch creation.",
      "One shared logbook or LIMS that **enforces** required fields.",
      "Weekly 30-minute review: outliers, re-tests, trends.",
    ],
  },

  { t: "h2", x: "Sustainability: claims that stand up" },
  {
    t: "p",
    x: "If you say biodegradable or carbon-neutral, keep the proof with the product. Retailers increasingly ask for the paperwork. See [our checklist](/blogs/stability-testing-checklist).",
  },
  {
    t: "blockquote",
    x: "Document every deviation with person, time, and lot — it halves investigation time.",
    cite: "QA Handbook",
    role: "Internal SOP",
  },
  { t: "h2", x: "Launch playbook (4 weeks)" },
  {
    t: "ol",
    x: [
      "Week 1: lock formula + packaging constraints; freeze BoM.",
      "Week 2: pilot batch + reduced micro + start accelerated stability.",
      "Week 3: panel on pilot; marketing drafts claims with references.",
      "Week 4: review data, fix last-mile issues, green-light manufacture.",
    ],
  },

  { t: "h2", x: "Common failure modes" },
  {
    t: "ul",
    x: [
      "Hot-fill below target rpm → separation at 3 weeks.",
      "No light test on clear bottles → color drift complaints.",
      "Supplier changed antioxidant blend silently → rancidity in month 2.",
    ],
  },

  { t: "h2", x: "Key takeaways" },
  {
    t: "ul",
    x: [
      "Constrain building blocks early.",
      "Automate just enough for better logs and traceability.",
      "Back every sustainability claim with a document.",
    ],
  },

  {
    t: "p",
    x: "Want the full SOPs? We’ll publish them in a follow-up with `templates/acceptance-windows.xlsx` and **pilot batch** forms.",
  },
];

export const longBodyB = [
  {
    t: "p",
    x: "This field guide packages our stability testing approach for SMEs. It’s opinionated, **evidence-driven**, and designed to avoid false starts that cost weeks.",
  },

  { t: "h2", x: "Scope & philosophy" },
  {
    t: "p",
    x: "Stability is a _system_: raw materials, process, packaging, and storage history. We optimize for fast feedback while keeping regulatory guardrails.",
  },

  { t: "h2", x: "Pre-flight checks" },
  {
    t: "ul",
    x: [
      "Define endpoints: pH, viscosity, color (ΔE), odor, separation, micro.",
      "Select storage conditions: 5 °C, 25 °C, 40 °C, and light exposure.",
      "Lock packaging type and headspace; record torque/cap type.",
      "Create batch labels with `lot`, `mix rpm`, `cooling profile`, and operator.",
    ],
  },

  { t: "h2", x: "Designing accelerated studies" },
  {
    t: "p",
    x: "Use elevated temperature to **surface risks**, not to certify exact shelf life. We like 6–8 weeks at 40 °C with week-by-week sampling.",
  },
  {
    t: "ol",
    x: [
      "Start with triplicates to catch process noise.",
      "Measure at consistent time of day; instruments drift with room temp.",
      "Photostability under your _actual_ packaging; not a generic chamber.",
    ],
  },

  { t: "h2", x: "Analytical methods that matter" },
  { t: "h3", x: "pH & buffers" },
  {
    t: "p",
    x: "Calibrate meters daily. Document buffer lots; `two-point` calibration is minimum. Acceptable drift ≤0.05 pH units over 24 h.",
  },
  { t: "h3", x: "Viscosity" },
  {
    t: "p",
    x: "Report **rpm**, spindle, temperature, and time under shear. A single value without context is unusable.",
  },
  { t: "h3", x: "Color" },
  {
    t: "p",
    x: "Use ΔE*ab with D65 illumination. Anything above 2.0 becomes consumer noticeable for most shades.",
  },

  {
    t: "blockquote",
    x: "Bad data is worse than no data. If a number lacks context (instrument, temp, method), don’t trust it.",
  },

  { t: "h2", x: "Micro challenge (lean version)" },
  {
    t: "ol",
    x: [
      "Pick a panel that reflects your preservation system.",
      "Inoculate only after measuring baseline pH/viscosity.",
      "Record contact times precisely; re-measure pH after neutralization.",
    ],
  },

  { t: "h2", x: "Packaging stress" },
  {
    t: "p",
    x: "Match **closure torque** and headspace to production. For flexible tubes, log recovery time after compression; for glass, log thermal shock results.",
  },
  {
    t: "img",
    src: "/demo/blog-2.jpg",
    alt: "Packaging under test",
    cap: "Torque + headspace are as important as formula when talking leak rates.",
  },

  { t: "h2", x: "Decision gates" },
  {
    t: "ul",
    x: [
      "If ΔpH > 0.15 OR visible separation → iterate formula (don’t upscale).",
      "If ΔE > 2.0 in clear packs → add UV blocker or change package.",
      "If micro fails twice at mid-dose → revisit system, not just dose.",
    ],
  },

  { t: "h2", x: "Working with suppliers" },
  {
    t: "p",
    x: "Ask for **method sheets** and shelf-life data for inputs. If they won’t share, treat as a risk item and qualify a second source.",
  },

  { t: "h2", x: "Templates & artifacts" },
  {
    t: "ul",
    x: [
      "Acceptance windows sheet: `templates/acceptance-windows.xlsx`",
      "Label generator (CLI): `scripts/labels.ts`",
      "Batch logbook: [download](/blogs/stability-testing-checklist)",
    ],
  },

  { t: "h2", x: "Common gotchas" },
  {
    t: "ul",
    x: [
      "Cooling curve not recorded → viscosity scatter.",
      "Meter not stabilized → pH drift blamed on formula.",
      "Light test skipped on tinted packs → surprise complaints.",
    ],
  },

  { t: "h2", x: "Appendix: glossary" },
  {
    t: "ul",
    x: [
      "**ΔE** — perceptual color distance; 2.0 is ~noticeable.",
      "**Triplicate** — three subsamples from the same batch to detect process noise.",
      "**Challenge test** — inoculation study to validate preservation system.",
    ],
  },

  {
    t: "p",
    x: "Use this guide as a baseline; adapt for your products’ risk profile. If you publish your own SOPs, link them in your release notes for future you.",
  },
];
export const longBodyC = [
  {
    t: "p",
    x: "Supply-chain resilience in 2025 is about **optionality**: dual regions, qualified alternates, and contracts with real teeth. This guide compresses what we’ve learned piloting botanicals, enzymes, and packaging across volatile lanes.",
  },

  { t: "h2", x: "Why resilience matters now" },
  {
    t: "p",
    x: "Lead times didn’t normalize—they bifurcated. Some lanes are back to 2019 levels while others snap under **weather + geopolitics + regulation**. Plan for variability, not a single ETA.",
  },
  { t: "h3", x: "Pressure sources" },
  {
    t: "ul",
    x: [
      "El Niño/La Niña oscillations shifting harvest windows by 2–4 weeks.",
      "Port labor actions reappearing cyclically.",
      "Tighter **deforestation-free** and traceability rules in EU/UK.",
    ],
  },

  { t: "h2", x: "Sourcing strategy (dual-region + qualified alternates)" },
  {
    t: "p",
    x: "Treat critical inputs like components in a **redundant system**. One source is convenience; two is strategy.",
  },
  {
    t: "ol",
    x: [
      "Pick a **primary** and **secondary** region with uncorrelated climate risks.",
      "Qualify at least one alternate grade per critical input; store CoA + method sheets.",
      "Lock volume bands in contracts (min/target/max) with service levels and remedies.",
      "Run quarterly supplier scorecards: on-time %, CoA quality, CAPA response time.",
    ],
  },

  {
    t: "blockquote",
    x: "If an input has only one qualified source, assume **eventual failure**. Your best-case scenario is a price hike; worst case is a stockout during launch.",
  },

  { t: "h2", x: "Inventory policy (where to hold the buffer)" },
  {
    t: "p",
    x: "Buffers are expensive—but stockouts are pricier. Right-size by variability, not vibes.",
  },
  {
    t: "ul",
    x: [
      "Use a **target coverage** approach: median lead time + 1.5× its standard deviation.",
      "For botanicals with seasonal harvests, carry a **campaign buffer** at the supplier’s warehouse (cheaper) with a draw-down schedule.",
      "For cold chain, hold the buffer **closest to use** to reduce loss from lane delays.",
    ],
  },

  {
    t: "img",
    src: "/demo/blog-4.jpg",
    alt: "Procurement dashboard",
    cap: "A simple dashboard tracking on-time %, CoA issues, and lanes with >P75 lead-time spread surfaces risk early.",
  },

  { t: "h2", x: "Documentation & compliance that travel with the SKU" },
  {
    t: "p",
    x: "Retailers and regulators now ask for proof, not promises. Keep documents **next to the product** in your repo.",
  },
  {
    t: "ul",
    x: [
      "Latest CoA + TDS + allergen/vegan statements.",
      "Origin + harvest month + transport mode in a one-pager.",
      "Sustainability artifacts: LCA summary, certification IDs, expiry dates.",
      "Link methods inside your stability notes: see [our checklist](/blogs/stability-testing-checklist).",
    ],
  },

  { t: "h2", x: "Logistics: lane design & cold chain" },
  {
    t: "p",
    x: "Design for **graceful degradation**. If the fastest lane breaks, a slower lane should keep you in stock.",
  },
  {
    t: "ul",
    x: [
      "Keep at least two routings per region (e.g., sea–air fallback for launches).",
      "For enzymes/probiotics, validate **thermal loggers** and define max excursion time.",
      "Document re-icing SOPs and who owns the call when temps breach.",
    ],
  },

  {
    t: "img",
    src: "/demo/blog-3.jpg",
    alt: "Cold chain handling",
    cap: "Cold-chain stability hinges on tight handoffs. The lane is only as strong as the warmest transfer.",
  },

  { t: "h2", x: "Cost & risk modeling (quick and dirty)" },
  {
    t: "p",
    x: "Not a PhD model. Just enough to avoid surprises and justify buffers.",
  },
  {
    t: "ul",
    x: [
      "Compute `SKU-VA` (value at risk) = demand/week × gross margin × expected delay weeks.",
      "If `SKU-VA` > buffer cost × 1.3 → increase safety stock.",
      "Track **price-break ladders** vs carrying cost to decide campaign buys.",
    ],
  },

  { t: "h2", x: "30/60/90-day playbook" },
  {
    t: "ol",
    x: [
      "30: map critical inputs → assign risk tiers → request alternates + documents.",
      "60: run lab validation on alternates; sign volume-band contracts with SLAs.",
      "90: implement dashboards + supplier QBRs; simulate a lane outage and rehearse.",
    ],
  },

  {
    t: "blockquote",
    x: "Rehearsal beats incident response. Run a paper drill quarterly: assume the primary lane is down for 21 days—what ships, what pauses, who decides?",
  },

  { t: "h2", x: "Red flags & mitigations" },
  {
    t: "ul",
    x: [
      "Supplier “can’t share method details” → treat as risk, qualify a backup.",
      "CoA typos repeat → enforce a **CAPA** with deadlines.",
      "Single-harvest input with no alternates → pre-buy campaign volume and store.",
    ],
  },

  { t: "h2", x: "KPIs that actually move behavior" },
  {
    t: "ul",
    x: [
      "**On-time, in-full (OTIF)** — goal ≥ 95% on critical inputs.",
      "**Lead-time variance** — track P75–P25; use it to size buffers.",
      "**CoA defect rate** — each defect triggers a supplier action item.",
      "**Alternate readiness** — % of critical inputs with a lab-validated alternate.",
    ],
  },

  {
    t: "p",
    x: "Resilience compounds. Each quarter you qualify one more region, one more alternate, and one more fallback lane. After a year, delays spike less and launches survive rough seas.",
  },
];

export const fakePosts = [
  {
    id: "1",
    slug: "natural-formulation-trends-2025",
    title: "Natural Formulation Trends to Watch in 2025",
    excerpt:
      "From plant-based emulsifiers to biodegradable actives—what matters for R&D this year.",
    image: "/demo/blog-1.jpg",
    tags: ["R&D", "Formulation"],
    readTime: 6,
    author: { name: "IMALEX Lab", avatar: "/demo/avatar-1.jpg" },
    date: "2025-08-01",
    content: longBodyA, // ⬅️ big body #1
  },
  {
    id: "2",
    slug: "stability-testing-checklist",
    title: "Stability Testing: a 10-Point Checklist for SMEs",
    excerpt:
      "Reduce waste and accelerate launches with a lean, dependable stability workflow.",
    image: "/demo/blog-2.jpg",
    tags: ["QA", "Process"],
    readTime: 5,
    author: { name: "Dr. Lina Saada", avatar: "/demo/avatar-2.jpg" },
    date: "2025-07-18",
    content: longBodyB,
  },
  {
    id: "3",
    slug: "nutraceutical-supply-chains",
    title: "Navigating Nutraceutical Supply Chains in 2025",
    excerpt:
      "Sourcing rare botanicals while keeping costs, quality, and compliance under control.",
    image: "/demo/blog-3.jpg",
    tags: ["Nutraceuticals"],
    readTime: 7,
    author: { name: "Supply Team" },
    date: "2025-07-05",
    content: longBodyC, // ⬅️ big body #1
  },
  {
    id: "4",
    slug: "biopesticide-field-pilots",
    title: "Biopesticide Field Pilots: Lessons from Semi-Arid Climates",
    excerpt:
      "Key agronomic and regulatory learnings from the 2024–2025 pilot season.",
    image: "/demo/blog-4.jpg",
    tags: ["Biopesticides", "Agriculture"],
    readTime: 8,
    author: { name: "Field Ops" },
    date: "2025-06-12",
    content: longBodyA,
  },
  {
    id: "5",
    slug: "cosmetic-active-sourcing",
    title: "Sourcing Cosmetic Actives Responsibly",
    excerpt:
      "Balance innovation, sustainability, and cost when selecting actives for new lines.",
    image: "/demo/blog-5.jpg",
    tags: ["Cosmetics", "Sourcing"],
    readTime: 5,
    author: { name: "Product Dev", avatar: "/demo/avatar-3.jpg" },
    date: "2025-06-01",
    content: longBodyB, // ⬅️ big body #1
  },
  {
    id: "6",
    slug: "lab-automation-benefits",
    title: "Lab Automation: Small Changes with Big Impact",
    excerpt:
      "Incremental automation in QC labs improves throughput and data reliability.",
    image: "/demo/blog-6.jpg",
    tags: ["Lab", "Automation"],
    readTime: 4,
    author: { name: "QA Team" },
    date: "2025-05-20",
    content: longBodyC,
  },

  {
    id: "7",
    slug: "biopesticide-field-pilots-v1",
    title: "Biopesticide Field Pilots: Lessons from Semi-Arid Climates",
    excerpt:
      "Key agronomic and regulatory learnings from the 2024–2025 pilot season.",
    image: "/demo/blog-4.jpg",
    tags: ["Biopesticides", "Agriculture"],
    readTime: 8,
    author: { name: "Field Ops" },
    date: "2025-06-12",
    content: longBodyA,
  },
  {
    id: "8",
    slug: "cosmetic-active-sourcing-v1",
    title: "Sourcing Cosmetic Actives Responsibly",
    excerpt:
      "Balance innovation, sustainability, and cost when selecting actives for new lines.",
    image: "/demo/blog-5.jpg",
    tags: ["Cosmetics", "Sourcing"],
    readTime: 5,
    author: { name: "Product Dev", avatar: "/demo/avatar-3.jpg" },
    date: "2025-06-01",
    content: longBodyB, // ⬅️ big body #1
  },
  {
    id: "9",
    slug: "lab-automation-benefits-v1",
    title: "Lab Automation: Small Changes with Big Impact",
    excerpt:
      "Incremental automation in QC labs improves throughput and data reliability.",
    image: "/demo/blog-6.jpg",
    tags: ["Lab", "Automation"],
    readTime: 4,
    author: { name: "QA Team" },
    date: "2025-05-20",
    content: longBodyC,
  },
];
