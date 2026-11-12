# Sri Venkateswara Company — Design System Specification (DESIGN.md)

## 1. Brand Identity & Creative Direction: "Precision in Motion"
An uncompromising, ultra-refined industrial engineering digital experience inspired by precision-machined metal surfaces, cold-heading mechanical kinematics, aerospace fasteners, and high-end editorial aesthetics.

- **Brand Tone**: Technologically advanced, authoritative, highly precise, minimal yet tactile, trustworthy, and globally competitive.
- **Visual Distinction**: Avoids generic template cliches, purple-blue neon gradients, and cookie-cutter SaaS rounded cards. Instead, utilizes machined chamfers, hairline technical coordinate grids, dynamic metallic light sweeps, dimensional HUD annotations, and real-time interactive 3D WebGL rivet models.

---

## 2. Color Palette & Token System

### 2.1 Base & Surface Foundations (Deep Machined Metal)
- `--bg-void`: `#080b10` (Deep obsidian industrial core)
- `--bg-surface-primary`: `#0e131b` (Primary surface plane)
- `--bg-surface-secondary`: `#161e2b` (Elevated component card / HUD panel)
- `--bg-surface-elevated`: `#1e293b` (Hover states and active tooltips)
- `--border-subtle`: `rgba(255, 255, 255, 0.08)` (Hairline grid lines)
- `--border-focus`: `rgba(217, 119, 6, 0.5)` (Engineering accent highlight)

### 2.2 Metallic Material Accents
- `--metal-bronze-amber`: `#d97706` (Primary brand accent, warm copper/bronze forged hue)
- `--metal-brass-gold`: `#f59e0b` (Secondary radiant accent for highlights & CTAs)
- `--metal-stainless`: `#e2e8f0` (Precision stainless steel, high-contrast headings)
- `--metal-titanium-muted`: `#94a3b8` (Technical metadata, subheadings, caliper lines)
- `--metal-cyan-electric`: `#38bdf8` (Cold precision indicator, calibrated tolerance markings)

### 2.3 Semantic & Functional Signals
- `--status-verified`: `#10b981` (Validated certifications, quality pass)
- `--status-pending`: `#f59e0b` (Client verification pending badge)
- `--status-error`: `#ef4444` (Validation failure, out-of-tolerance)

---

## 3. Typography System

- **Display & Section Headings**: `Space Grotesk`, `Chakra Petch`, or `Syncopate` (Industrial geometric grotesque with sharp mechanical cuts).
- **Body & Editorial Copy**: `Plus Jakarta Sans` / `Inter` (Optimized for high legibility across dense technical tables and narratives).
- **Technical Specifications & Callouts**: `JetBrains Mono` / `Space Mono` (Tabular monospace for dimensions, tolerances, thread pitches, and DIN/ISO standards).

### Scale & Hierarchy
- **Hero Title**: `clamp(2.75rem, 6vw, 5.5rem)`, Line height: `1.05`, Letter spacing: `-0.03em`, Font weight: `800`
- **H1 (Page Titles)**: `clamp(2.25rem, 4.5vw, 3.75rem)`, Line height: `1.15`, Letter spacing: `-0.02em`, Font weight: `700`
- **H2 (Section Headings)**: `clamp(1.75rem, 3vw, 2.5rem)`, Line height: `1.2`, Letter spacing: `-0.01em`, Font weight: `700`
- **H3 (Component Titles)**: `1.25rem - 1.5rem`, Line height: `1.3`, Font weight: `600`
- **Body Text**: `1rem (16px)`, Line height: `1.65`, Font weight: `400`
- **Caption / Meta**: `0.75rem - 0.875rem`, Line height: `1.4`, Monospace, Uppercase, Tracking: `0.05em`

---

## 4. Layout Grid & Spacing Architecture

- **Max Container Width**: `1440px` with fluid responsive horizontal padding:
  - Desktop (>1024px): `48px`
  - Tablet (768px - 1023px): `32px`
  - Mobile (<768px): `20px`
- **Modular Column Grid**: 12-column layout with `24px` gutter on desktop, 6-column with `16px` gutter on tablet, 4-column with `12px` gutter on mobile.
- **Rhythm & Spacing Scale**:
  - `space-xs`: `4px`
  - `space-sm`: `8px`
  - `space-md`: `16px`
  - `space-lg`: `24px`
  - `space-xl`: `32px`
  - `space-2xl`: `48px`
  - `space-3xl`: `64px`
  - `space-4xl`: `96px`
  - `space-5xl`: `128px`

---

## 5. Component Design Language

### 5.1 Buttons & Interactive Controls
- **Primary Industrial CTA**:
  - Background: Linear gradient from `#d97706` to `#b45309` with subtle inner metallic highlight.
  - Border: 1px solid `rgba(255, 255, 255, 0.2)`.
  - Radius: `4px` (Sharp, precision-machined edge rather than soft pills).
  - Hover: Magnetic slight pull, brightness boost, and radiant amber glow (`box-shadow: 0 0 25px rgba(217, 119, 6, 0.35)`).
- **Secondary Technical Button**:
  - Background: `rgba(255, 255, 255, 0.03)` with `1px solid rgba(255, 255, 255, 0.15)`.
  - Hover: `border-color: #f59e0b`, text color shifts to pure white with coordinate arrow slide.
- **Ghost / Tool Button**:
  - Monospace text with bracket framing: `[ EXAMINE 3D ]`.

### 5.2 Technical Cards & Panels
- Border: `1px solid rgba(255, 255, 255, 0.07)` with 45-degree chamfered corner accents.
- Surface: Deep graphite glass with subtle 5% radial gradient reflecting industrial studio lighting.
- Top coordinate tag: Small monospace badge displaying technical metadata (e.g. `REF: SVC-RVT-01`).

### 5.3 3D WebGL Viewports
- Interactive Three.js canvas supporting Orbit Controls, material switching (Brass, Copper, Mild Steel, Stainless Steel, Aluminum), Wireframe toggle, and Longitudinal Section Cutaway mode.
- Overlay HUD: Real-time dynamic calipers displaying head diameter (`d_k`), shank diameter (`d_s`), and shank length (`L`).

### 5.4 Form Architecture (Request a Quote)
- Dark technical inputs with high-contrast borders and active amber focus rings.
- Dynamic input adaptation: selecting "Tubular Rivet" immediately reveals the Wall Thickness (`s`) field.
- Interactive live blueprint preview: typing dimensions dynamically redraws the CAD SVG blueprint.

---

## 6. Motion & Animation Standards

1. **Hover Transitions**: `cubic-bezier(0.16, 1, 0.3, 1)` (snappy 250ms industrial response).
2. **Scroll Reveals**: GSAP ScrollTrigger with staggered translateY (+30px to 0) and opacity (0 to 1).
3. **Continuous Rotations**: Subtle 0.005 rad/frame turntable rotation in Three.js scenes, smoothly dampening on pointer drag.
4. **Reduced Motion**: Complete fallback to immediate static opacity for users with `prefers-reduced-motion: reduce`.

---

## 7. Accessibility & Quality Guidelines
- WCAG 2.1 AA compliant color contrast (>4.5:1 for normal text, >3:1 for large display text).
- Visible keyboard focus rings (`outline: 2px solid #f59e0b; outline-offset: 2px`).
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Informative alt text on all engineering diagrams and rivet photographs.

