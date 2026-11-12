# Requirements: Sri Venkateswara Company (SVC)

## 1. Functional Scope (8 Full Pages)
- [x] **REQ-P1 (Home)**: High-impact hero with interactive 3D rivet, credibility statistics with flags, product preview, cold forging narrative, quality assurance showcase, industries served, history timeline summary, factory gallery preview, RFQ CTA, industrial footer.
- [x] **REQ-P2 (About Us)**: Heritage since 1964, leadership narrative (Rm. M.V. Muthiah Chettiar to Jawahar Muthu), manufacturing philosophy, scroll-driven milestone timeline.
- [x] **REQ-P3 (Products)**: Dedicated catalog with 3D product visualizer, category filters (Solid, Semi-Tubular, Tubular), 18 verified product variants, material options, technical specs table, direct RFQ deep-link.
- [x] **REQ-P4 (Manufacturing & Services)**: Detailed breakdown of Cold Forging, Annealing, Ultrasonic Cleaning, and 80-tonne Automated Plating with process diagrams and technical parameters.
- [x] **REQ-P5 (Quality Engineering)**: IATF 16949:2016 quality framework, inspection equipment (optical profile projectors, digital micrometers, hardness testers, salt spray corrosion testing), zero-defect methodology.
- [x] **REQ-P6 (Industrial Gallery)**: High-resolution filterable gallery (Machinery, Products, Plant, Process) with full-featured interactive lightbox modal, zoom, and metadata captions.
- [x] **REQ-P7 (Contact)**: Direct contact channels, Coimbatore plant coordinates, interactive Google Maps embed, inquiry form, business hours.
- [x] **REQ-P8 (Request a Quote)**: Technical CAD-style quotation calculator with live SVG blueprint updates for shank diameter, length, head diameter, wall thickness, material grade, coating, and heat treatment, with validation, local submission storage, and quote summary generation.

## 2. Motion & Animation Requirements (All 7 Categories)
- **5.1 Hover**: Magnetic CTA buttons, metallic sheen sweeps, 3D card tilt, hotspot dimensional callouts.
- **5.2 3D Effects**: Procedural Three.js rivets with real-time rotation, lighting controls, wireframe mode, material switcher (Brass, Copper, Stainless Steel, Mild Steel, Zinc, Aluminum), and cutaway cross-section inspection.
- **5.3 Loading**: Precision mechanical caliper initialization animation with SVG linework and zero-delay caching.
- **5.4 Entrance**: Staggered typography reveals, clip-path mask transitions, coordinate grid fades.
- **5.5 Micro-interactions**: Dimension HUD toggles, active state indicators, copy-to-clipboard feedback, instant calculation toasts.
- **5.6 Background**: Subtle animated coordinate grid lines, fine metallic grain, atmospheric industrial gradients.
- **5.7 Mouse**: Desktop cursor spotlight follower and 3D parallax without interfering with native interaction.

## 3. Strict Quality & Compliance Gates
- No fabricated figures: Inconsistencies explicitly flagged with client verification badges.
- Responsive testing: Desktop (1440px), Tablet (768px), Mobile (390px) verified via Playwright.
- Accessibility: Semantic HTML5, ARIA labels, visible focus rings, prefers-reduced-motion support.
- Performance: Optimized procedural 3D models with canvas fallback, lazy-loaded visual assets, smooth 60fps animations.

