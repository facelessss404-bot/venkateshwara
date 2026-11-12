/**
 * Sri Venkateswara Company (SVC) — Global Smart Search & Command Palette (Ctrl + K)
 * Instant indexing across all 18 products, 4 manufacturing services, 3 certifications, and RFQ
 */

(function () {
  'use strict';

  let searchModal = null;
  let searchInput = null;
  let resultsContainer = null;
  let selectedIndex = -1;

  // Search Index Data
  const SEARCH_INDEX = [
    // Products - Solid
    { title: 'Brass Round Head', category: 'Solid Rivet', badge: 'DIN 660', desc: 'Decorative luster, atmospheric corrosion resistance, non-magnetic.', url: 'products.html#solid' },
    { title: 'Copper Mushroom Head', category: 'Solid Rivet', badge: 'Electrolytic C110', desc: 'Maximum contact surface area, elite electrical & thermal conductivity.', url: 'products.html#solid' },
    { title: 'MS Dimple Head', category: 'Solid Rivet', badge: 'Automation Ready', desc: 'Punch centering cup prevents tool slippage during robotic riveting.', url: 'products.html#solid' },
    { title: 'MS Knurled Shank', category: 'Solid Rivet', badge: 'Anti-Rotation', desc: 'Helical or diamond knurl bites into die-casts to eliminate spin.', url: 'products.html#solid' },
    { title: 'MS Step Head', category: 'Solid Rivet', badge: 'Spacer Collar', desc: 'Dual-tier head acts as integral standoff collar for rotating linkages.', url: 'products.html#solid' },
    { title: 'MS Step Shank', category: 'Solid Rivet', badge: 'Pivot Axle', desc: 'Stepped dual-diameter ground shank for mechanical scissor pivots.', url: 'products.html#solid' },
    // Products - Semi-Tubular
    { title: 'Brass Mushroom Head', category: 'Semi-Tubular', badge: 'DIN 7338 B', desc: 'Low roll-clinch force prevents cracking in decorative hardware & luggage.', url: 'products.html#semi-tubular' },
    { title: 'Copper Flat Head', category: 'Semi-Tubular', badge: 'Electrical Ground', desc: 'Flush seating surface with hollow tip for rapid assembly on electrical relays.', url: 'products.html#semi-tubular' },
    { title: 'MS Double Shank', category: 'Semi-Tubular', badge: 'Multi-Tier', desc: 'Dual-diameter stepped shank for multi-tier sheet metal clamp standoff.', url: 'products.html#semi-tubular' },
    { title: 'MS Flat Head', category: 'Semi-Tubular', badge: 'DIN 7338 B', desc: 'Workhorse fastener for automotive brake shoes & clutch facings.', url: 'products.html#semi-tubular' },
    { title: 'MS Hexagonal Head', category: 'Semi-Tubular', badge: 'Torque Lock', desc: 'Hexagonal head fits into counterbores to lock against spin clinching.', url: 'products.html#semi-tubular' },
    { title: 'SS Flat Head', category: 'Semi-Tubular', badge: 'AISI 304 SS', desc: 'Corrosion proof stainless steel for culinary hygiene & marine fixtures.', url: 'products.html#semi-tubular' },
    // Products - Tubular
    { title: 'Brass Flat Head Tubular', category: 'Tubular Rivet', badge: 'DIN 7340', desc: 'Full-depth hollow shank curls into symmetrical toroidal ring on blind side.', url: 'products.html#tubular' },
    { title: 'Brass Tubular Eyelet', category: 'Tubular Rivet', badge: 'Wire Conduit', desc: 'Hollow sleeve acts as wire harness conduit and PCB eyelet.', url: 'products.html#tubular' },
    { title: 'MS Button Rivet', category: 'Tubular Rivet', badge: 'Brake Lining', desc: 'Low profile crown prevents drum scoring during vehicle brake relining.', url: 'products.html#tubular' },
    { title: 'MS Countersink Rivet', category: 'Tubular Rivet', badge: 'DIN 7340 90°', desc: 'Beveled head fits flush for aerodynamic zero-protrusion sliding tracks.', url: 'products.html#tubular' },
    { title: 'MS Head Knurled', category: 'Tubular Rivet', badge: 'Gasket Friction', desc: 'Underside serrated head knurling clamps firmly into soft gaskets.', url: 'products.html#tubular' },
    { title: 'MS Step Tubular', category: 'Tubular Rivet', badge: 'Hinge Spindle', desc: 'Combines hollow roll fastener with axle spindle for scissor linkages.', url: 'products.html#tubular' },
    // Manufacturing Services
    { title: 'Precision Cold Heading', category: 'Manufacturing', badge: 'Zero Chip Scrap', desc: 'Multi-station cold forging up to 300 PPM with continuous grain flow.', url: 'services.html#cold-forging' },
    { title: 'Thermal Annealing Normalization', category: 'Manufacturing', badge: '35% Elongation', desc: 'In-house furnace relieves cold-work stress and restores workability.', url: 'services.html#annealing' },
    { title: 'Ultra-Sonic Agitation Cleaning', category: 'Manufacturing', badge: '3-6 Min Cavitation', desc: 'High-frequency sound waves scour oils and micro-chips from blind holes.', url: 'services.html#ultrasonic' },
    { title: '80-Tonne Automated Plating Plant', category: 'Manufacturing', badge: '80 Tonnes/Mo', desc: 'In-house barrel electroplating: Zinc Clear RoHS, Yellow Zinc, Nickel, Tin.', url: 'services.html#plating' },
    // Quality & Certifications
    { title: 'IATF 16949:2016 Certification', category: 'Quality Standards', badge: 'Automotive Benchmark', desc: 'Automotive Tier-1 supplier quality management system (Jan 2018 scope).', url: 'quality.html' },
    { title: 'ISO 14001:2015 Environmental', category: 'Quality Standards', badge: 'Eco-Stewardship', desc: 'Responsible plating wastewater treatment & solvent recovery.', url: 'quality.html' },
    { title: 'ISO 45001:2018 Occupational Safety', category: 'Quality Standards', badge: 'Workforce Safety', desc: 'Occupational health & safety framework protecting 100+ personnel.', url: 'quality.html' },
    { title: 'Metrology Testing Laboratory', category: 'Quality Standards', badge: '±0.01 mm Accuracy', desc: 'Optical profile projector, Vickers micro-hardness, ASTM B117 salt spray.', url: 'quality.html#metrology' },
    // RFQ & Tools
    { title: 'Technical RFQ Workbench', category: 'Quotation', badge: 'CAD Blueprint', desc: 'Parametric live SVG CAD blueprint redrawing with millimetric tolerance input.', url: 'rfq.html' },
    { title: 'Coimbatore Plant & Contact', category: 'Contact', badge: '+91 904707-7874', desc: 'Periyanaickenpalayam manufacturing facility coordinates & direct desk.', url: 'contact.html' }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    injectSearchDOM();
    bindSearchEvents();
  });

  function injectSearchDOM() {
    if (document.getElementById('svc-smart-search-modal')) return;

    searchModal = document.createElement('div');
    searchModal.id = 'svc-smart-search-modal';
    searchModal.className = 'fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-20 px-4 opacity-0 pointer-events-none transition-all duration-200';
    searchModal.setAttribute('role', 'dialog');
    searchModal.setAttribute('aria-modal', 'true');
    searchModal.setAttribute('aria-label', 'Global Smart Search');

    searchModal.innerHTML = `
      <div class="w-full max-w-2xl bg-surface-primary border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] transform scale-95 transition-transform duration-200" id="svc-smart-search-card">
        <!-- Search Input Bar -->
        <div class="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-950/90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <input type="text" id="svc-smart-search-input" placeholder="Search 18 rivet models, cold forging, plating, IATF quality, or RFQ..." class="flex-1 bg-transparent text-white font-sans text-sm outline-none placeholder:text-slate-500">
          <kbd class="hidden sm:inline-block px-2 py-0.5 font-mono text-[10px] text-slate-400 bg-slate-800 rounded border border-slate-700">ESC to close</kbd>
        </div>

        <!-- Category Filter Pills -->
        <div class="px-4 py-2 border-b border-slate-800/80 bg-slate-900/60 flex items-center gap-2 overflow-x-auto text-[11px] font-mono">
          <span class="text-slate-500 uppercase tracking-wider text-[10px]">FILTER:</span>
          <button class="svc-search-filter-pill active px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30" data-filter="all">All</button>
          <button class="svc-search-filter-pill px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 hover:text-white" data-filter="solid">Solid Rivets</button>
          <button class="svc-search-filter-pill px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 hover:text-white" data-filter="semi">Semi-Tubular</button>
          <button class="svc-search-filter-pill px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 hover:text-white" data-filter="tubular">Tubular</button>
          <button class="svc-search-filter-pill px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 hover:text-white" data-filter="service">Manufacturing</button>
          <button class="svc-search-filter-pill px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 hover:text-white" data-filter="quality">Quality</button>
        </div>

        <!-- Search Results List -->
        <div id="svc-smart-search-results" class="flex-1 overflow-y-auto p-3 space-y-2 font-sans text-sm">
          <!-- Dynamic Results -->
        </div>

        <!-- Footer Bar -->
        <div class="p-3 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div class="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>60 Years Precision Engineering • Coimbatore</span>
        </div>
      </div>
    `;

    document.body.appendChild(searchModal);
    searchInput = document.getElementById('svc-smart-search-input');
    resultsContainer = document.getElementById('svc-smart-search-results');
  }

  function bindSearchEvents() {
    // Global Keyboard Shortcut: Ctrl + K or Cmd + K
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
      } else if (e.key === 'Escape' && searchModal && searchModal.classList.contains('opacity-100')) {
        closeSearchModal();
      }
    });

    // Close on backdrop click
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearchModal();
    });

    // Real-time search query input
    searchInput.addEventListener('input', () => {
      performSearch(searchInput.value.trim());
    });

    // Keyboard Arrow navigation in results
    searchInput.addEventListener('keydown', (e) => {
      const items = resultsContainer.querySelectorAll('.svc-search-item');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        updateSelection(items);
      } else if (e.key === 'Enter' && selectedIndex >= 0 && items[selectedIndex]) {
        e.preventDefault();
        items[selectedIndex].click();
      }
    });

    // Filter Pills Click
    searchModal.querySelectorAll('.svc-search-filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        searchModal.querySelectorAll('.svc-search-filter-pill').forEach(p => {
          p.classList.remove('active', 'bg-amber-500/10', 'text-amber-400', 'border-amber-500/30');
          p.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-700');
        });
        e.currentTarget.classList.add('active', 'bg-amber-500/10', 'text-amber-400', 'border-amber-500/30');
        e.currentTarget.classList.remove('bg-slate-800', 'text-slate-400', 'border-slate-700');
        performSearch(searchInput.value.trim(), e.currentTarget.getAttribute('data-filter'));
      });
    });

    // Bind any buttons on the page with data-trigger-search
    document.querySelectorAll('[data-trigger-search]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearchModal();
      });
    });
  }

  function openSearchModal() {
    searchModal.classList.remove('opacity-0', 'pointer-events-none');
    searchModal.classList.add('opacity-100', 'pointer-events-auto');
    const card = document.getElementById('svc-smart-search-card');
    if (card) {
      card.classList.remove('scale-95');
      card.classList.add('scale-100');
    }
    setTimeout(() => {
      searchInput.focus();
      performSearch('');
    }, 50);
  }

  function closeSearchModal() {
    searchModal.classList.remove('opacity-100', 'pointer-events-auto');
    searchModal.classList.add('opacity-0', 'pointer-events-none');
    const card = document.getElementById('svc-smart-search-card');
    if (card) {
      card.classList.remove('scale-100');
      card.classList.add('scale-95');
    }
  }

  function performSearch(query, filter = 'all') {
    selectedIndex = -1;
    const q = query.toLowerCase();

    const matches = SEARCH_INDEX.filter(item => {
      // Category filter check
      if (filter === 'solid' && !item.category.includes('Solid')) return false;
      if (filter === 'semi' && !item.category.includes('Semi')) return false;
      if (filter === 'tubular' && !item.category.includes('Tubular')) return false;
      if (filter === 'service' && !item.category.includes('Manufacturing')) return false;
      if (filter === 'quality' && !item.category.includes('Quality')) return false;

      if (!q) return true; // show all under filter if empty
      return item.title.toLowerCase().includes(q) ||
             item.desc.toLowerCase().includes(q) ||
             item.badge.toLowerCase().includes(q) ||
             item.category.toLowerCase().includes(q);
    });

    if (!matches.length) {
      resultsContainer.innerHTML = `
        <div class="p-8 text-center text-slate-500 font-mono text-xs">
          No engineering records found matching "<span class="text-white">${query}</span>".
          <p class="mt-2 text-slate-400 font-sans">Try searching for "Solid", "Annealing", "Plating", "IATF", or "Brass".</p>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = matches.map((item, idx) => `
      <a href="${item.url}" class="svc-search-item block p-3 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 hover:border-amber-500/50 transition-all cursor-pointer group" data-index="${idx}">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center gap-2">
            <span class="font-display font-bold text-white text-sm group-hover:text-amber-400 transition-colors">${item.title}</span>
            <span class="px-2 py-0.5 rounded font-mono text-[9px] bg-slate-950 text-slate-400 border border-slate-800">${item.category}</span>
          </div>
          <span class="font-mono text-[10px] text-amber-400 font-semibold">${item.badge}</span>
        </div>
        <p class="text-xs text-slate-400 line-clamp-1">${item.desc}</p>
      </a>
    `).join('');

    // Update first item selection
    if (matches.length > 0) {
      selectedIndex = 0;
      updateSelection(resultsContainer.querySelectorAll('.svc-search-item'));
    }
  }

  function updateSelection(items) {
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.classList.add('border-amber-500', 'bg-slate-800');
        item.classList.remove('border-slate-800', 'bg-slate-900/60');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('border-amber-500', 'bg-slate-800');
        item.classList.add('border-slate-800', 'bg-slate-900/60');
      }
    });
  }

  window.openSVCSearch = openSearchModal;
})();

