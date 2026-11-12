# Codebase Architecture & Knowledge Graph Report (Graphify)

## 1. Executive Structural Map
- **Project**: Sri Venkateswara Company (SVC) — Premium Cinematic Industrial Fastener Website
- **Architecture**: Modular Multi-Page High-Performance Web Application with WebGL 3D Procedural Acceleration, GSAP Motion Choreography, and Real Certificate Verification.

```
Sri Venkateswara Company Root
├── index.html                   [Page 1: Hero, 3D Canvas, Credibility, 18-Model Fastener Discovery, Certified Excellence, Timeline]
├── about.html                   [Page 2: 60-Year Heritage (1964), Leadership, Export Markets, Discrepancy Transparency]
├── products.html                [Page 3: 3D Interactive Configurator, 18-Model Full Catalog & Specifier]
├── services.html                [Page 4: 4-Stage Heading Sequence, Annealing, Ultrasonic, 80T Plating]
├── quality.html                 [Page 5: 3 Official Certificate Scans, Metrology Lab, 6-Stage Gates]
├── gallery.html                 [Page 6: Filterable Plant & Product Lightbox Gallery (14 Real Photos)]
├── contact.html                 [Page 7: Coimbatore Facility Coordinates, Map, Operating Shifts, Inquiries]
├── rfq.html                     [Page 8: Parametric CAD RFQ Form, Live SVG Blueprint, Volumetric Mass & Weight/1,000 Pcs Calc]
├── DESIGN.md                    [Brand Design System Specification: "Precision in Motion"]
├── assets/
│   ├── css/
│   │   └── custom-industrial.css [Industrial chamfers, metallic gradients, coordinate grid, line clamps]
│   └── js/
│       ├── three-rivet-scene.js  [Procedural Lathe 3D Rivet Engine, PBR alloys, Cutaways, Wireframes]
│       ├── product-showcase.js   [18-Model Fastener Discovery Engine: Solid, Semi-Tubular, Tubular]
│       ├── motion-effects.js     [GSAP ScrollTrigger, spotlight follower, magnetic buttons, universal lightbox]
│       ├── rfq-calculator.js     [Parametric SVG Blueprint, volumetric mass & weight per 1,000 pcs calculation]
│       └── main.js               [Navigation dynamics, mobile drawer, copy helpers, badges]
├── screenshots/                 [Playwright Real Browser Validation Captures]
│   ├── svc-fastener-discovery-desktop.png [18-Model Fastener Discovery Suite Verification]
│   ├── svc-certifications-desktop.png     [Recognized Standards 3-Certificate Showcase Verification]
│   ├── svc-tubular-interaction.png        [Tubular Tab & Model Selection Interactive State]
│   ├── svc-home-1920x1080.png             [Large Desktop 1920x1080 Viewport Verification]
│   ├── svc-home-1440x900.png              [Standard Desktop 1440x900 Viewport Verification]
│   ├── svc-home-1024x768.png              [Small Desktop 1024x768 Viewport Verification]
│   ├── svc-home-768x1024.png              [Tablet Portrait 768x1024 Viewport Verification]
│   └── svc-home-390x844.png               [Mobile 390x844 Viewport Verification]
├── .planning/                   [GSD Project Context & Verification Memory]
│   ├── PROJECT.md
│   ├── REQUIREMENTS.md
│   ├── ROADMAP.md
│   ├── STATE.md
│   └── config.json
└── skills/                      [Analyzed Design & Engineering Repositories]
    ├── awesome-design-md-main
    ├── taste-skill-main
    ├── impeccable-main
    ├── img2threejs-main
    └── playwright-cli-main
```

## 2. Community Detection & Component Clusters

### Cluster A: Presentation & Narrative Layer (God Nodes: `index.html`, `products.html`, `rfq.html`)
- High-contrast industrial editorial aesthetic inspired by `awesome-design-md` and `taste-skill`.
- Balanced dark graphite void (`#07090e`), high-density metallic surfaces, and warm forged bronze accents (`#d97706`).
- Zero generic template elements; distinct typographic scaling using `Space Grotesk`, `Plus Jakarta Sans`, and `JetBrains Mono`.
- Interactive 18-Model Fastener Discovery Suite completely eliminating whitespace voids with dynamic featured stage and interactive selector rail.

### Cluster B: Verified Certification & Quality Layer (God Nodes: `index.html#certifications-showcase`, `quality.html`)
- Major homepage showcase: "RECOGNIZED STANDARDS. ENGINEERED EXCELLENCE."
- 3 Official high-resolution 300-DPI certificate scans:
  1. IATF 16949:2016 (Automotive Tier-1 Benchmark, obtained Jan 2018)
  2. ISO 14001:2015 (Environmental Management System)
  3. ISO 45001:2018 (Occupational Health & Safety)
- Universal interactive lightbox zoom modal (`openSVCLightbox`) for document inspection.
- Transparent audit verification tags maintaining zero unauthorized claims.

### Cluster C: Procedural 3D & Parametric Simulation (God Nodes: `three-rivet-scene.js`, `product-showcase.js`, `rfq-calculator.js`)
- Three.js WebGL lathe geometry engine generating realistic solid, semi-tubular, and tubular rivets in real-time.
- Procedural brushed metal bump map, anisotropic highlights, and studio reflections.
- Toggleable CAD wireframe mode and longitudinal cutaway cross-section.
- Dynamic volumetric calculation: piece weight ($g/\text{pc}$) and procurement weight per 1,000 pcs ($\text{kg}/1,000\text{ pcs}$) across Brass, Copper, Mild Steel, Stainless Steel, and Aluminum.
