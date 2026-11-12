/**
 * Sri Venkateswara Company (SVC) — Interactive 18-Model Product Discovery Engine
 * Manages category switching, featured spotlight display, 3D lathe canvas synchronization,
 * and robust image fallback to eliminate any risk of empty voids.
 */

(function () {
  'use strict';

  const SVC_CATALOG = {
    solid: [
      {
        id: 'solid-brass-round',
        name: 'Brass Round Head',
        category: 'Solid Rivets',
        familyBadge: 'SOLID RIVET // HIGH SHEAR',
        material: 'Brass IS 319 / C360',
        matClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        din: 'DIN 660 / ISO 1051',
        head: 'Round Dome Head',
        shank: 'Full Solid Cylindrical',
        clinch: 'High Impact Solid Shear Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'High decorative luster combined with natural atmospheric corrosion resistance. Favored across consumer electrical switchgear, architectural fittings, and high-visibility mechanical assemblies.',
        image: 'https://srivenkateswaracompany.com/images/solid/Brass%20Round%20head.jpg',
        rivetType: 'solid',
        headType: 'round',
        materialKey: 'brass'
      },
      {
        id: 'solid-copper-mushroom',
        name: 'Copper Mushroom Head',
        category: 'Solid Rivets',
        familyBadge: 'SOLID RIVET // CONDUCTIVE',
        material: 'Electrolytic Copper C110',
        matClass: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        din: 'DIN 660 Modified',
        head: 'Low Profile Mushroom Dome',
        shank: 'Full Solid Core',
        clinch: 'High Ductility Cold Swage',
        tolerance: '± 0.02 mm Standard',
        desc: 'Low-profile spread dome delivering maximum contact surface area. Delivers elite electrical and thermal conductivity for busbar connections, transformer taps, and automotive battery terminals.',
        image: 'https://srivenkateswaracompany.com/images/solid/Copper%20Mushroom%20Head.jpg',
        rivetType: 'solid',
        headType: 'mushroom',
        materialKey: 'copper'
      },
      {
        id: 'solid-ms-dimple',
        name: 'MS Dimple Head',
        category: 'Solid Rivets',
        familyBadge: 'SOLID RIVET // AUTOMATION READY',
        material: 'Mild Steel C1008 / C1010',
        matClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        din: 'Custom OEM Alignment Spec',
        head: 'Centering Concave Dimple',
        shank: 'Straight Solid Shank',
        clinch: 'Robotic High-Speed Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Precision concave head dimple acts as an optical and mechanical alignment cup for robotic riveting tooling. Prevents punch slippage and head deformation during high-speed cycle runs.',
        image: 'https://srivenkateswaracompany.com/images/solid/MS%20Dimple%20head.jpg',
        rivetType: 'solid',
        headType: 'dimple',
        materialKey: 'mild_steel'
      },
      {
        id: 'solid-ms-knurled',
        name: 'MS Knurled Shank',
        category: 'Solid Rivets',
        familyBadge: 'SOLID RIVET // ANTI-ROTATION',
        material: 'High-Carbon Mild Steel',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'Interference Press Spec',
        head: 'Flat Seating Head',
        shank: 'Diamond / Straight Knurled',
        clinch: 'Interference Press-Fit',
        tolerance: '± 0.015 mm High Precision',
        desc: 'Precision helical or diamond knurling bites into mating substrates when pressed into die-cast zinc, aluminum engine blocks, or fiber-reinforced composites, eliminating torsional rotation.',
        image: 'https://srivenkateswaracompany.com/images/solid/MS%20Knurled%20Shank.jpg',
        rivetType: 'solid',
        headType: 'flat',
        materialKey: 'mild_steel'
      },
      {
        id: 'solid-ms-step-head',
        name: 'MS Step Head',
        category: 'Solid Rivets',
        familyBadge: 'SOLID RIVET // SHOULDER COLLAR',
        material: 'Cold Forged Mild Steel',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'Stepped Collar Spec',
        head: 'Dual-Tier Shoulder Step',
        shank: 'Solid Core',
        clinch: 'Precision Axial Stop',
        tolerance: '± 0.02 mm Standard',
        desc: 'Dual-tiered stepped head acts as an integral spacer collar, setting exact axial clearance distances for rotating brackets, linkages, or sheet enclosures without separate washers.',
        image: 'https://srivenkateswaracompany.com/images/solid/MS%20Step%20Head.jpg',
        rivetType: 'solid',
        headType: 'round',
        materialKey: 'mild_steel'
      },
      {
        id: 'solid-ms-step-shank',
        name: 'MS Step Shank',
        category: 'Solid Rivets',
        familyBadge: 'SOLID RIVET // PIVOT AXLE',
        material: 'Cold Heading Forging Steel',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'Pivot Spindle Spec',
        head: 'Standard Round Head',
        shank: 'Stepped Pivot Diameter',
        clinch: 'Terminal Tip Clinch',
        tolerance: '± 0.015 mm High Precision',
        desc: 'Features two distinct ground diameters along the shank: a wider precision-machined axle body for hinge movement, and a smaller pilot tip that clinches tight without seizing the pivot.',
        image: 'https://srivenkateswaracompany.com/images/solid/MS%20Step%20Shank.jpg',
        rivetType: 'solid',
        headType: 'round',
        materialKey: 'mild_steel'
      }
    ],
    'semi-tubular': [
      {
        id: 'semi-brass-mushroom',
        name: 'Brass Mushroom Head',
        category: 'Semi-Tubular Rivets',
        familyBadge: 'SEMI-TUBULAR // 50% LOWER LOAD',
        material: 'Brass IS 319 / C360',
        matClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        din: 'DIN 7338 Form B',
        head: 'Mushroom Dome Head',
        shank: 'Partial Tubular Tip Cavity',
        clinch: 'Low Force Roll Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Hollow cavity depth does not exceed shank diameter. Requires roughly 50% less clinching force than a solid rivet, enabling silent, damage-free fastening in luggage, leather, and delicate panels.',
        image: 'https://srivenkateswaracompany.com/images/semi-tubular/Brass%20Mushroom%20Head.jpg',
        rivetType: 'semi-tubular',
        headType: 'mushroom',
        materialKey: 'brass'
      },
      {
        id: 'semi-copper-flat',
        name: 'Copper Flat Head',
        category: 'Semi-Tubular Rivets',
        familyBadge: 'SEMI-TUBULAR // ELECTRICAL GROUND',
        material: 'Electrolytic Copper C110',
        matClass: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
        din: 'DIN 7338 B Flat',
        head: 'Flush Seated Flat Head',
        shank: 'Partial Tubular Clinch Cavity',
        clinch: 'Roll-Over Tubular Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Flush-mounted flat head profile with tubular clinch tail for rapid assembly on electrical relays, breaker bars, and automotive wiring harness brackets.',
        image: 'https://srivenkateswaracompany.com/images/semi-tubular/Copper%20Flat%20Head.jpg',
        rivetType: 'semi-tubular',
        headType: 'flat',
        materialKey: 'copper'
      },
      {
        id: 'semi-ms-double-shank',
        name: 'MS Double Shank',
        category: 'Semi-Tubular Rivets',
        familyBadge: 'SEMI-TUBULAR // MULTI-TIER',
        material: 'Cold Forging Mild Steel',
        matClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        din: 'Dual Diameter Spec',
        head: 'Flat Bearing Surface',
        shank: 'Double Stepped Tubular',
        clinch: 'Shoulder Stop Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Engineered dual-diameter stepped shank designed for multi-layer sheet metal joining where precise clamp stand-off or shoulder positioning is mandatory.',
        image: 'https://srivenkateswaracompany.com/images/semi-tubular/MS%20Double%20Shank.jpg',
        rivetType: 'semi-tubular',
        headType: 'flat',
        materialKey: 'mild_steel'
      },
      {
        id: 'semi-ms-flat',
        name: 'MS Flat Head',
        category: 'Semi-Tubular Rivets',
        familyBadge: 'SEMI-TUBULAR // BRAKE & CLUTCH',
        material: 'Mild Steel C1010',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'DIN 7338 Form B',
        head: 'Flat Seated Head',
        shank: 'Semi-Tubular Cavity',
        clinch: 'Spin & Impact Riveting',
        tolerance: '± 0.02 mm Standard',
        desc: 'Standard industrial workhorse rivet. Generous bearing area under the flat head resists pull-through under tension, ideal for brake shoes, clutch facings, and metal brackets.',
        image: 'https://srivenkateswaracompany.com/images/semi-tubular/MS%20Flat%20Head.jpg',
        rivetType: 'semi-tubular',
        headType: 'flat',
        materialKey: 'mild_steel'
      },
      {
        id: 'semi-ms-hex',
        name: 'MS Hexagonal Head',
        category: 'Semi-Tubular Rivets',
        familyBadge: 'SEMI-TUBULAR // POSITIVE TORQUE LOCK',
        material: 'High-Tensile MS',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'Hex Head Lock Spec',
        head: 'Precision Hexagonal Head',
        shank: 'Semi-Tubular Tip',
        clinch: 'Anti-Spin Radial Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Six-sided head geometry fits into pre-punched hex counterbores, positively locking the fastener against rotation during spin-clinching and service vibration.',
        image: 'https://srivenkateswaracompany.com/images/semi-tubular/MS%20Hexgonal%20Head.jpg',
        rivetType: 'semi-tubular',
        headType: 'flat',
        materialKey: 'mild_steel'
      },
      {
        id: 'semi-ss-flat',
        name: 'SS Flat Head',
        category: 'Semi-Tubular Rivets',
        familyBadge: 'SEMI-TUBULAR // CORROSION PROOF',
        material: 'Stainless Steel AISI 304',
        matClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        din: 'DIN 7338 B / SS',
        head: 'Flat Polished Head',
        shank: 'Semi-Tubular Cavity',
        clinch: 'High-Corrosion Clinch',
        tolerance: '± 0.015 mm High Precision',
        desc: 'Manufactured from 304-grade stainless steel to provide outstanding resistance against atmospheric oxidation, marine salt, chemical detergents, and high culinary hygiene demands.',
        image: 'https://srivenkateswaracompany.com/images/semi-tubular/SS%20Flat%20Head.jpg',
        rivetType: 'semi-tubular',
        headType: 'flat',
        materialKey: 'stainless'
      }
    ],
    tubular: [
      {
        id: 'tubular-brass-flat',
        name: 'Brass Flat Head Tubular',
        category: 'Tubular Rivets',
        familyBadge: 'FULL TUBULAR // ROLL FORM',
        material: 'Brass IS 319 / C360',
        matClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        din: 'DIN 7340 Flat',
        head: 'Flush Seated Flat Head',
        shank: 'Deep Tubular Core',
        clinch: '360° Curl Roll Form',
        tolerance: '± 0.02 mm Standard',
        desc: 'Full-depth hollow shank curls over into a symmetrical toroidal ring on the blind side. Ideal for thin non-ferrous sheet metal, switchboards, and electrical grounding studs.',
        image: 'https://srivenkateswaracompany.com/images/tubular/Brass%20Flat%20Head.jpg',
        rivetType: 'tubular',
        headType: 'flat',
        materialKey: 'brass'
      },
      {
        id: 'tubular-brass-eyelet',
        name: 'Brass Tubular Eyelet',
        category: 'Tubular Rivets',
        familyBadge: 'FULL TUBULAR // THROUGH-HOLE CONDUIT',
        material: 'High Ductility Brass C360',
        matClass: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        din: 'DIN 7340 Hollow',
        head: 'Rolled Rim Flange',
        shank: 'Continuous Hollow Tube',
        clinch: 'Through-Hole Roll Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Deep cylindrical hollow sleeve serving as a through-hole conduit for wire harness routing, PCB eyelets, and reinforced eyelets in structural canvas and webbing.',
        image: 'https://srivenkateswaracompany.com/images/tubular/Brass%20Tubular.jpg',
        rivetType: 'tubular',
        headType: 'round',
        materialKey: 'brass'
      },
      {
        id: 'tubular-ms-button',
        name: 'MS Button Rivet',
        category: 'Tubular Rivets',
        familyBadge: 'FULL TUBULAR // BRAKE LINING',
        material: 'Low Carbon Mild Steel',
        matClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        din: 'Automotive Friction Spec',
        head: 'Low Profile Button Head',
        shank: 'Full Tubular Body',
        clinch: 'Low-Stress Flaring',
        tolerance: '± 0.02 mm Standard',
        desc: 'Button profile with gently rounded crown and deep tubular tail. Widely utilized in commercial automotive brake shoe relining to prevent drum scoring when pads wear down.',
        image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Button%20Rivet.jpg',
        rivetType: 'tubular',
        headType: 'round',
        materialKey: 'mild_steel'
      },
      {
        id: 'tubular-ms-countersink',
        name: 'MS Countersink Rivet',
        category: 'Tubular Rivets',
        familyBadge: 'FULL TUBULAR // FLUSH COUNTERSUNK',
        material: 'Cold Heading Mild Steel',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'DIN 7340 Countersunk',
        head: '90° / 120° Beveled Head',
        shank: 'Deep Hollow Cavity',
        clinch: 'Flush Seated Roll Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Beveled head fits completely flush inside pre-countersunk holes, leaving an aerodynamically smooth exterior surface with zero protrusion for industrial airflow or sliding tracks.',
        image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Counter%20Sink.jpg',
        rivetType: 'tubular',
        headType: 'flat',
        materialKey: 'mild_steel'
      },
      {
        id: 'tubular-ms-head-knurled',
        name: 'MS Head Knurled',
        category: 'Tubular Rivets',
        familyBadge: 'FULL TUBULAR // GASKET FRICTION',
        material: 'High-Strength MS',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'Gasket Clamping Spec',
        head: 'Underside Knurled Head',
        shank: 'Tubular Clinch Shank',
        clinch: 'Grip-Lock Clinch',
        tolerance: '± 0.02 mm Standard',
        desc: 'Serrated knurling pattern cold-formed directly onto the underside of the head clamps firmly into soft gaskets, clutch facings, or fibrous boards, preventing fastener rotation.',
        image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Head%20Knurled%20.jpg',
        rivetType: 'tubular',
        headType: 'flat',
        materialKey: 'mild_steel'
      },
      {
        id: 'tubular-ms-step',
        name: 'MS Step Tubular',
        category: 'Tubular Rivets',
        familyBadge: 'FULL TUBULAR // SPINDLE HINGE',
        material: 'Special Forging MS',
        matClass: 'text-slate-300 bg-slate-500/10 border-slate-500/30',
        din: 'Stepped Hinge Spec',
        head: 'Round Retaining Head',
        shank: 'Solid Step + Hollow Tip',
        clinch: 'Roll Clinch Pivot',
        tolerance: '± 0.015 mm High Precision',
        desc: 'A hybrid architectural marvel: the upper solid step acts as a rigid, frictionless bearing spindle for scissors, calipers, or hinges, while the thin tubular tip easily flares to retain the assembly.',
        image: 'https://srivenkateswaracompany.com/images/tubular/MS%20Step%20Rivet.jpg',
        rivetType: 'tubular',
        headType: 'round',
        materialKey: 'mild_steel'
      }
    ]
  };

  let currentCategory = 'solid';
  let activeModelIndex = 0;
  let previewViewer = null;
  let viewMode = 'photo'; // 'photo' | '3d'

  function init() {
    renderTabs();
    renderShowcase();
    bindEvents();
  }

  function renderTabs() {
    const tabsContainer = document.getElementById('family-tab-group');
    if (!tabsContainer) return;

    tabsContainer.querySelectorAll('button[data-family]').forEach((btn) => {
      const family = btn.getAttribute('data-family');
      if (family === currentCategory) {
        btn.className = 'px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider font-bold transition-all bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-900/40 border border-amber-400';
      } else {
        btn.className = 'px-4 py-2.5 rounded font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all border border-slate-800';
      }
    });
  }

  function renderShowcase() {
    const categoryData = SVC_CATALOG[currentCategory] || SVC_CATALOG.solid;
    const model = categoryData[activeModelIndex] || categoryData[0];

    // Update Featured Stage
    const featuredName = document.getElementById('showcase-model-name');
    const featuredBadge = document.getElementById('showcase-family-badge');
    const featuredAlloy = document.getElementById('showcase-alloy-badge');
    const featuredDin = document.getElementById('showcase-din-badge');
    const featuredDesc = document.getElementById('showcase-desc');
    const featuredHead = document.getElementById('showcase-head-spec');
    const featuredShank = document.getElementById('showcase-shank-spec');
    const featuredClinch = document.getElementById('showcase-clinch-spec');
    const featuredTol = document.getElementById('showcase-tol-spec');
    const featuredImg = document.getElementById('showcase-photo-img');
    const featuredRfqLink = document.getElementById('showcase-rfq-link');
    const featured3dLink = document.getElementById('showcase-3d-link');

    if (featuredName) featuredName.innerText = model.name;
    if (featuredBadge) featuredBadge.innerText = model.familyBadge;
    if (featuredAlloy) {
      featuredAlloy.innerText = model.material;
      featuredAlloy.className = `px-2 py-0.5 rounded font-mono text-[10px] border ${model.matClass}`;
    }
    if (featuredDin) featuredDin.innerText = model.din;
    if (featuredDesc) featuredDesc.innerText = model.desc;
    if (featuredHead) featuredHead.innerText = model.head;
    if (featuredShank) featuredShank.innerText = model.shank;
    if (featuredClinch) featuredClinch.innerText = model.clinch;
    if (featuredTol) featuredTol.innerText = model.tolerance;

    if (featuredImg) {
      featuredImg.src = model.image;
      featuredImg.alt = `${model.name} - ${model.material}`;
      featuredImg.onerror = function () {
        // Fallback to stylized SVG placeholder if image ever fails
        this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230d121b"/><circle cx="200" cy="150" r="70" fill="%231a2433" stroke="%23f59e0b" stroke-width="2"/><text x="200" y="155" fill="%23f59e0b" font-family="monospace" font-size="12" text-anchor="middle">PRECISION RIVET</text></svg>';
      };
    }

    if (featuredRfqLink) {
      featuredRfqLink.href = `rfq.html?type=${encodeURIComponent(model.category)}&head=${encodeURIComponent(model.headType)}&mat=${encodeURIComponent(model.materialKey)}`;
    }
    if (featured3dLink) {
      featured3dLink.href = `products.html#${currentCategory}`;
    }

    // Sync 3D viewer if in 3D mode
    if (viewMode === '3d' && previewViewer) {
      previewViewer.setRivetType(model.rivetType);
      previewViewer.setHeadType(model.headType);
      previewViewer.setMaterial(model.materialKey);
    }

    // Render 6-Item Selector Rail
    const railContainer = document.getElementById('showcase-selection-rail');
    if (railContainer) {
      railContainer.innerHTML = '';
      categoryData.forEach((item, index) => {
        const isActive = index === activeModelIndex;
        const card = document.createElement('div');
        card.className = `p-3 rounded-lg border cursor-pointer transition-all duration-200 flex items-center gap-3 group ${
          isActive
            ? 'bg-slate-900/90 border-amber-500/80 shadow-lg shadow-amber-900/20 translate-x-1'
            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
        }`;
        card.setAttribute('data-index', index);
        card.innerHTML = `
          <div class="w-16 h-16 rounded overflow-hidden bg-slate-950 border border-slate-800 shrink-0 relative">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'64\\' height=\\'64\\'><rect width=\\'64\\' height=\\'64\\' fill=\\'%23131b26\\'/></svg>'">
            ${isActive ? '<div class="absolute inset-0 border-2 border-amber-400 rounded pointer-events-none"></div>' : ''}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="font-display font-bold text-xs truncate ${isActive ? 'text-amber-400' : 'text-white group-hover:text-amber-300'}">${item.name}</span>
              <span class="font-mono text-[9px] px-1.5 py-0.5 rounded ${item.matClass} shrink-0">${item.material.split(' ')[0]}</span>
            </div>
            <p class="text-[11px] text-slate-400 font-sans line-clamp-1 leading-tight">${item.desc}</p>
            <div class="flex items-center justify-between mt-1 pt-1 border-t border-slate-800/60 font-mono text-[9px] text-slate-500">
              <span>${item.din.split(' ')[0]}</span>
              <span class="${isActive ? 'text-amber-400 font-bold' : 'text-slate-400 group-hover:text-amber-400'}">Inspect Spec →</span>
            </div>
          </div>
        `;
        card.addEventListener('click', () => {
          activeModelIndex = index;
          renderShowcase();
        });
        railContainer.appendChild(card);
      });
    }

    // Refresh GSAP ScrollTrigger if active to ensure coordinates are pristine
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }

  function bindEvents() {
    // Category Switcher
    const tabsContainer = document.getElementById('family-tab-group');
    if (tabsContainer) {
      tabsContainer.querySelectorAll('button[data-family]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const family = e.currentTarget.getAttribute('data-family');
          if (family && family !== currentCategory) {
            currentCategory = family;
            activeModelIndex = 0;
            renderTabs();
            renderShowcase();
          }
        });
      });
    }

    // Photometric vs 3D CAD Toggle
    const photoToggleBtn = document.getElementById('showcase-view-photo-btn');
    const cadToggleBtn = document.getElementById('showcase-view-cad-btn');
    const photoContainer = document.getElementById('showcase-photo-container');
    const canvasContainer = document.getElementById('showcase-3d-container');

    function setMode(mode) {
      viewMode = mode;
      if (mode === '3d') {
        photoToggleBtn.className = 'px-3 py-1 font-mono text-xs rounded text-slate-400 hover:text-white transition-colors';
        cadToggleBtn.className = 'px-3 py-1 font-mono text-xs rounded bg-cyan-600 text-white font-bold transition-colors';
        photoContainer.classList.add('hidden');
        canvasContainer.classList.remove('hidden');

        // Initialize 3D viewer if not already
        if (!previewViewer && typeof SVCRivetViewer !== 'undefined') {
          const categoryData = SVC_CATALOG[currentCategory] || SVC_CATALOG.solid;
          const model = categoryData[activeModelIndex] || categoryData[0];
          previewViewer = new SVCRivetViewer('showcase-rivet-canvas', {
            rivetType: model.rivetType,
            headType: model.headType,
            materialKey: model.materialKey,
            autoRotate: true,
            cameraDistance: 60
          });
        } else if (previewViewer) {
          const categoryData = SVC_CATALOG[currentCategory] || SVC_CATALOG.solid;
          const model = categoryData[activeModelIndex] || categoryData[0];
          previewViewer.setRivetType(model.rivetType);
          previewViewer.setHeadType(model.headType);
          previewViewer.setMaterial(model.materialKey);
        }
      } else {
        photoToggleBtn.className = 'px-3 py-1 font-mono text-xs rounded bg-amber-500 text-black font-bold transition-colors';
        cadToggleBtn.className = 'px-3 py-1 font-mono text-xs rounded text-slate-400 hover:text-white transition-colors';
        photoContainer.classList.remove('hidden');
        canvasContainer.classList.add('hidden');
      }
    }

    if (photoToggleBtn) {
      photoToggleBtn.addEventListener('click', () => setMode('photo'));
    }
    if (cadToggleBtn) {
      cadToggleBtn.addEventListener('click', () => setMode('3d'));
    }
  }

  // Export globally for testing & external calls
  window.SVCFastenerDiscovery = {
    init: init,
    setCategory: function (cat) {
      if (SVC_CATALOG[cat]) {
        currentCategory = cat;
        activeModelIndex = 0;
        renderTabs();
        renderShowcase();
      }
    },
    selectModel: function (idx) {
      activeModelIndex = idx;
      renderShowcase();
    },
    getCatalog: function () {
      return SVC_CATALOG;
    }
  };

  document.addEventListener('DOMContentLoaded', init);
})();

