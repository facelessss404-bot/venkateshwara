/**
 * Sri Venkateswara Company (SVC) — Product Comparison Studio Modal
 * Side-by-side engineering comparison across Solid, Semi-Tubular, and Tubular rivets
 */

(function () {
  'use strict';

  let studioModal = null;

  const COMPARISON_MATRIX = {
    categories: [
      {
        id: 'solid',
        name: 'Solid Rivets',
        din: 'DIN 660 / ISO 1051',
        core: '100% Solid Metal Core',
        shearRating: 'Maximum (Structural Class 1)',
        upsetForce: '100% (High Impact Hammer / Heavy Squeezer)',
        substrateRisk: 'Risk of crushing delicate or brittle plastics/leather',
        bestMaterials: 'Mild Steel, Brass, Copper, Aluminum',
        speed: 'Medium (requires high impact upset cycle)',
        typicalApplications: 'Heavy structural joints, automotive brackets, electrical busbars, chassis assemblies',
        rfqUrl: 'rfq.html?type=Solid%20Rivet',
        productUrl: 'products.html#solid'
      },
      {
        id: 'semi-tubular',
        name: 'Semi-Tubular Rivets',
        din: 'DIN 7338 Form B',
        core: 'Partial Tubular Tip Cavity (Depth ≤ Shank Dia)',
        shearRating: 'High (Equivalent to Solid Rivet in Shear Plane)',
        upsetForce: 'Approx. 50% Lower than Solid Rivets',
        substrateRisk: 'Safe for plastics, composites, luggage, leather, ceramics',
        bestMaterials: 'Mild Steel C1010, Brass IS 319, Stainless Steel 304, Copper',
        speed: 'Fast (automated spin clinching & continuous feed)',
        typicalApplications: 'Automotive brake linings, clutch facings, electrical relays, luggage hardware',
        rfqUrl: 'rfq.html?type=Semi-Tubular',
        productUrl: 'products.html#semi-tubular'
      },
      {
        id: 'tubular',
        name: 'Tubular Rivets',
        din: 'DIN 7340',
        core: 'Deep Continuous Hollow Core',
        shearRating: 'Moderate / Fastener Joint Clamp',
        upsetForce: 'Lowest (Gentle 360° Toroidal Curl Roll-Form)',
        substrateRisk: 'Zero crush risk; ideal for fragile laminates and paperboard',
        bestMaterials: 'Low Carbon Mild Steel, Brass C360',
        speed: 'Ultra-Fast (continuous orbital roll-forming)',
        typicalApplications: 'Through-hole wire conduits, PCB eyelets, scissors & folding pivot axles, brake pads',
        rfqUrl: 'rfq.html?type=Tubular',
        productUrl: 'products.html#tubular'
      }
    ]
  };

  document.addEventListener('DOMContentLoaded', () => {
    injectStudioDOM();
    bindStudioEvents();
  });

  function injectStudioDOM() {
    if (document.getElementById('svc-comparison-modal')) return;

    studioModal = document.createElement('div');
    studioModal.id = 'svc-comparison-modal';
    studioModal.className = 'fixed inset-0 z-[9998] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-200';
    studioModal.setAttribute('role', 'dialog');
    studioModal.setAttribute('aria-modal', 'true');
    studioModal.setAttribute('aria-label', 'Product Comparison Studio');

    studioModal.innerHTML = `
      <div class="w-full max-w-5xl bg-surface-primary border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        <!-- Header -->
        <div class="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div>
            <span class="hud-tag text-amber-400 mb-1">ENGINEERING MATRIX</span>
            <h2 class="font-display font-extrabold text-2xl text-white">Product Comparison Studio</h2>
            <p class="text-xs text-slate-400 mt-0.5">Evaluate mechanical kinematics, shear capacities, and upset forces across SVC fastener families.</p>
          </div>
          <button id="svc-close-comparison" class="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800" aria-label="Close Comparison Studio">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>

        <!-- Comparison Table Area -->
        <div class="flex-1 overflow-y-auto p-6 space-y-6">
          <div class="overflow-x-auto">
            <table class="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr class="border-b border-slate-800 bg-slate-950">
                  <th class="p-4 font-mono uppercase text-slate-400 text-[11px] w-1/4">Engineering Metric</th>
                  <th class="p-4 font-display font-bold text-amber-400 text-sm w-1/4 border-l border-slate-800/80">Solid Rivets (DIN 660)</th>
                  <th class="p-4 font-display font-bold text-cyan-400 text-sm w-1/4 border-l border-slate-800/80">Semi-Tubular (DIN 7338)</th>
                  <th class="p-4 font-display font-bold text-emerald-400 text-sm w-1/4 border-l border-slate-800/80">Tubular Rivets (DIN 7340)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 font-sans">
                <tr>
                  <td class="p-4 font-mono text-slate-300 font-semibold bg-slate-900/40">Core Geometry</td>
                  <td class="p-4 text-white border-l border-slate-800/80 font-mono text-[11px]">100% Solid Cylindrical Core</td>
                  <td class="p-4 text-white border-l border-slate-800/80 font-mono text-[11px]">Tip Cavity (Depth ≤ Shank Dia)</td>
                  <td class="p-4 text-white border-l border-slate-800/80 font-mono text-[11px]">Deep Continuous Hollow Core</td>
                </tr>
                <tr>
                  <td class="p-4 font-mono text-slate-300 font-semibold bg-slate-900/40">Shear Resistance</td>
                  <td class="p-4 text-amber-400 font-bold border-l border-slate-800/80">MAXIMUM (Heavy Structural)</td>
                  <td class="p-4 text-cyan-400 font-bold border-l border-slate-800/80">HIGH (Equivalent in Shear Plane)</td>
                  <td class="p-4 text-slate-300 border-l border-slate-800/80">MODERATE (Clamp & Lock)</td>
                </tr>
                <tr>
                  <td class="p-4 font-mono text-slate-300 font-semibold bg-slate-900/40">Required Clinch Force</td>
                  <td class="p-4 text-slate-300 border-l border-slate-800/80">100% (High Impact Hammer)</td>
                  <td class="p-4 text-cyan-400 font-bold border-l border-slate-800/80">~50% Lower than Solid</td>
                  <td class="p-4 text-emerald-400 font-bold border-l border-slate-800/80">Lowest (Low-Pressure Roll)</td>
                </tr>
                <tr>
                  <td class="p-4 font-mono text-slate-300 font-semibold bg-slate-900/40">Substrate Safety</td>
                  <td class="p-4 text-slate-400 border-l border-slate-800/80">Can crush delicate plastics/leather</td>
                  <td class="p-4 text-emerald-400 border-l border-slate-800/80">Safe for plastics, composites, leather</td>
                  <td class="p-4 text-emerald-400 border-l border-slate-800/80">Zero crush risk on delicate sheets</td>
                </tr>
                <tr>
                  <td class="p-4 font-mono text-slate-300 font-semibold bg-slate-900/40">Primary Materials</td>
                  <td class="p-4 text-white border-l border-slate-800/80">MS C1008, Brass IS 319, Copper C110</td>
                  <td class="p-4 text-white border-l border-slate-800/80">Mild Steel, Brass, AISI 304 SS, Copper</td>
                  <td class="p-4 text-white border-l border-slate-800/80">Low-Carbon MS, Brass C360</td>
                </tr>
                <tr>
                  <td class="p-4 font-mono text-slate-300 font-semibold bg-slate-900/40">Key Application Sectors</td>
                  <td class="p-4 text-slate-300 border-l border-slate-800/80">Structural chassis, electrical busbars, machinery</td>
                  <td class="p-4 text-slate-300 border-l border-slate-800/80">Automotive brake shoes, clutches, relays</td>
                  <td class="p-4 text-slate-300 border-l border-slate-800/80">Through-wire conduits, pivot hinges, eyelets</td>
                </tr>
                <tr>
                  <td class="p-4 font-mono text-slate-300 font-semibold bg-slate-900/40">Actions</td>
                  <td class="p-4 border-l border-slate-800/80">
                    <a href="rfq.html?type=Solid%20Rivet" class="btn-industrial text-xs chamfer-sm py-2 px-3 block text-center mb-2">Quote Solid</a>
                    <a href="products.html#solid" class="text-amber-400 hover:underline font-mono text-[10px] block text-center">3D Viewers →</a>
                  </td>
                  <td class="p-4 border-l border-slate-800/80">
                    <a href="rfq.html?type=Semi-Tubular" class="btn-industrial text-xs chamfer-sm py-2 px-3 block text-center mb-2">Quote Semi-Tubular</a>
                    <a href="products.html#semi-tubular" class="text-cyan-400 hover:underline font-mono text-[10px] block text-center">3D Viewers →</a>
                  </td>
                  <td class="p-4 border-l border-slate-800/80">
                    <a href="rfq.html?type=Tubular" class="btn-industrial text-xs chamfer-sm py-2 px-3 block text-center mb-2">Quote Tubular</a>
                    <a href="products.html#tubular" class="text-emerald-400 hover:underline font-mono text-[10px] block text-center">3D Viewers →</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <span>Need custom dimensional tolerances or non-standard alloys?</span>
          <a href="tel:+919047077874" class="text-amber-400 hover:underline font-bold">Call Senior Engineers: +91 (904) 707-7874</a>
        </div>
      </div>
    `;

    document.body.appendChild(studioModal);
  }

  function bindStudioEvents() {
    const closeBtn = document.getElementById('svc-close-comparison');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeStudioModal);
    }

    studioModal.addEventListener('click', (e) => {
      if (e.target === studioModal) closeStudioModal();
    });

    document.querySelectorAll('[data-open-comparison]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openStudioModal();
      });
    });
  }

  function openStudioModal() {
    studioModal.classList.remove('opacity-0', 'pointer-events-none');
    studioModal.classList.add('opacity-100', 'pointer-events-auto');
  }

  function closeStudioModal() {
    studioModal.classList.remove('opacity-100', 'pointer-events-auto');
    studioModal.classList.add('opacity-0', 'pointer-events-none');
  }

  window.openComparisonStudio = openStudioModal;
})();

