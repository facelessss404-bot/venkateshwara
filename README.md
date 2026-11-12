# venkateshwara
# Sri Venkateswara Company (SVC) — Official Website

> **Precision Cold-Forged Rivets & Fasteners — Coimbatore, India (Est. 1964)**
> 
> *An extraordinary, cinematic industrial engineering digital experience combining WebGL 3D procedural product reconstruction, GSAP motion choreography, and an interactive CAD quotation specifier.*

---

## 🌐 Production Deployment (GitHub & Netlify)

### 1. Push to GitHub
To push this entire production website to your GitHub repository ([`facelessss404-bot/venkateshwara`](https://github.com/facelessss404-bot/venkateshwara.git)):

- **Windows One-Click:** Double-click [`push_to_github.bat`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/push_to_github.bat)
- **Terminal / PowerShell:**
```bash
git init
git remote remove origin
git remote add origin https://github.com/facelessss404-bot/venkateshwara.git
git branch -M main
git add .
git commit -m "feat: Sri Venkateswara Company (SVC) official website - production release"
git push -u origin main
```

### 2. Deploy on Netlify (Continuous Deployment)
1. Go to [Netlify Dashboard](https://app.netlify.com/).
2. Click **"Add new site"** → **"Import an existing project"**.
3. Choose **GitHub** and authorize access to `facelessss404-bot/venkateshwara`.
4. Netlify will automatically detect [`netlify.toml`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/netlify.toml):
   - **Publish directory:** `.`
   - **Build command:** *(leave blank — static web app)*
5. Click **"Deploy site"**. Every future `git push` to `main` will automatically build and publish!

*Instant Zero-Setup Option: You can also drag the project folder directly into [Netlify Drop](https://app.netlify.com/drop) to launch immediately without connecting Git.*

---

## 🚀 Quick Start / How to Run

You can run the project in any of the following simple ways:

### Option 1: One-Click Launch (Windows)
Double-click [**`start_website.bat`**](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/start_website.bat) in the project root directory. It will immediately open `index.html` in your default web browser.

### Option 2: Direct File Opening
Open [**`index.html`**](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/index.html) directly in any modern browser (Chrome, Edge, Firefox, Brave, Safari):
```
d:\Ideaseternal_Projects\Client_9_srivenkateswara\index.html
```

### Option 3: Local Node.js Server
If you have Node.js installed, in your terminal or Command Prompt run:
```bash
node server.js
# OR
npm start
# OR
npx serve . -l 3000
```
This serves the project at `http://localhost:3000` and automatically opens your browser.

### Option 4: Local Python Server
If you have Python installed:
```bash
python server.py
# OR
python -m http.server 3000
```

---

## 📂 Website Structure & Pages

| Page | File | Description |
| :--- | :--- | :--- |
| **Home** | [`index.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/index.html) | Hero with 3D WebGL rivet viewer, credibility stats, product family previews, cold forging technology, and timeline. |
| **About Us** | [`about.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/about.html) | 60-year corporate history (1964 to present), leadership, and export footprint. |
| **Products & 3D** | [`products.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/products.html) | Interactive 3D Product Configurator & full 18-model catalog (Solid, Semi-Tubular, Tubular). |
| **Manufacturing** | [`services.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/services.html) | Cold heading, annealing, ultrasonic bath, and 80T automated electroplating plant. |
| **Quality** | [`quality.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/quality.html) | IATF 16949:2016 quality standards, metrology lab, and 6-stage inspection gates. |
| **Gallery** | [`gallery.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/gallery.html) | Filterable industrial photo gallery with interactive zoom lightbox. |
| **Contact** | [`contact.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/contact.html) | Coimbatore facility address, direct phone/email, business hours, and GPS map. |
| **Request Quote** | [`rfq.html`](file:///d:/Ideaseternal_Projects/Client_9_srivenkateswara/rfq.html) | CAD-style technical RFQ builder with live parametric SVG blueprint redrawing. |

---

## 🛠️ Technology Stack
- **Architecture**: Zero-build modern web architecture (pure ESM, Tailwind CSS, semantic HTML5).
- **3D Engine**: Three.js WebGL procedural lathe geometry with PBR metallic shaders, wireframe mode, and longitudinal cross-section cutaways.
- **Motion & Interactions**: GSAP 3 + ScrollTrigger, desktop inertia spotlight pointer follower, magnetic buttons.
- **Parametric Blueprinting**: Real-time vector SVG redrawing engine tied dynamically to millimetric input fields.

