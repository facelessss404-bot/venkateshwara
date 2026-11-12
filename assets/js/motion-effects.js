/**
 * Sri Venkateswara Company (SVC) — Motion & Interaction System
 * Incorporating GSAP ScrollTrigger, Desktop Inertia Spotlight,
 * Magnetic Button physics, Animated Counters, and Lightbox Modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  initPointerSpotlight();
  initMagneticButtons();
  initScrollAnimations();
  initAnimatedCounters();
  initLightbox();
});

/* --------------------------------------------------------------------------
   1. Pointer Spotlight Follower (Desktop only)
   -------------------------------------------------------------------------- */
function initPointerSpotlight() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch

  let spotlight = document.getElementById('pointer-spotlight');
  if (!spotlight) {
    spotlight = document.createElement('div');
    spotlight.id = 'pointer-spotlight';
    document.body.appendChild(spotlight);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderSpotlight() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
    requestAnimationFrame(renderSpotlight);
  }
  requestAnimationFrame(renderSpotlight);
}

/* --------------------------------------------------------------------------
   2. Magnetic CTA Buttons
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const magneticElements = document.querySelectorAll('.magnetic-target, .btn-industrial, .btn-secondary');

  magneticElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate3d(${x * 0.18}px, ${y * 0.18}px, 0)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0, 0, 0)';
      el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* --------------------------------------------------------------------------
   3. Scroll-Driven Section & Card Entrances
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  // If prefers-reduced-motion is enabled, make everything visible immediately
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-item, .reveal-group').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveal for cards - with guaranteed fallback safety
    gsap.utils.toArray('.reveal-group').forEach((group) => {
      const items = group.querySelectorAll('.reveal-item');
      if (items.length > 0) {
        gsap.fromTo(items, 
          { y: 30, opacity: 0.1 },
          {
            scrollTrigger: {
              trigger: group,
              start: 'top 92%',
              toggleActions: 'play none none none'
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform,opacity'
          }
        );
      }
    });

    // Pinned hero parallax
    const heroContent = document.querySelector('.hero-parallax-target');
    if (heroContent) {
      gsap.to(heroContent, {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 80,
        opacity: 0.7,
        ease: 'none'
      });
    }

    // Refresh triggers once fonts and window load
    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  } else {
    // Graceful CSS-only fallback via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-item').forEach((el) => {
      el.classList.add('transition-all', 'duration-700', 'ease-out');
      observer.observe(el);
    });
  }
}

/* --------------------------------------------------------------------------
   4. Animated Stat Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-counter-target'), 10);
        const prefix = entry.target.getAttribute('data-counter-prefix') || '';
        const suffix = entry.target.getAttribute('data-counter-suffix') || '';
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out expo curve
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeProgress * target);

          entry.target.innerText = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = `${prefix}${target}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((c) => observer.observe(c));
}

/* --------------------------------------------------------------------------
   5. Interactive Lightbox Modal (For Gallery & Official Certificates)
   -------------------------------------------------------------------------- */
function initLightbox() {
  let modal = document.getElementById('svc-lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'svc-lightbox-modal';
    modal.className = 'fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md hidden flex items-center justify-center p-3 sm:p-6 transition-all duration-300';
    modal.style.display = 'none';
    modal.innerHTML = `
      <div id="lightbox-dialog-box" class="relative max-w-5xl w-full max-h-[94vh] bg-slate-900 border border-slate-700 rounded-lg p-3 sm:p-4 shadow-2xl overflow-hidden flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 mb-2 border-b border-slate-800 shrink-0">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span id="lightbox-badge" class="hud-tag green text-[10px] sm:text-xs">OFFICIAL AUDIT DOCUMENTATION</span>
          </div>
          <div class="flex items-center gap-2">
            <button id="lightbox-zoom-toggle" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700" title="Toggle Zoom Level">
              [ 100% ZOOM ]
            </button>
            <button id="lightbox-close-btn" aria-label="Close Inspection Modal" class="w-8 h-8 rounded bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center transition-colors font-bold text-sm">
              ✕
            </button>
          </div>
        </div>
        
        <!-- Document / Image Viewport Container -->
        <div id="lightbox-scroll-pane" class="flex-1 overflow-auto bg-slate-950/90 rounded p-2 sm:p-4 flex items-center justify-center min-h-[350px]">
          <img id="lightbox-img" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" alt="Enlarged document scan" class="max-w-full max-h-[75vh] object-contain rounded shadow-2xl transition-all duration-200 select-none cursor-zoom-in" />
        </div>

        <!-- Modal Footer Telemetry -->
        <div class="p-3 sm:p-4 bg-slate-950 mt-2 rounded border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shrink-0">
          <div>
            <h4 id="lightbox-title" class="text-white font-bold text-sm sm:text-base font-display"></h4>
            <p id="lightbox-desc" class="text-xs text-slate-400 font-mono mt-0.5"></p>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a id="lightbox-download-link" href="" target="_blank" class="btn-industrial text-xs px-4 py-2 chamfer-sm">
              <span>Open Original High-Res Scan ↗</span>
            </a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('lightbox-close-btn');
    const zoomBtn = document.getElementById('lightbox-zoom-toggle');
    const img = document.getElementById('lightbox-img');

    function closeModal() {
      modal.style.display = 'none';
      modal.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      if (img) {
        img.classList.add('max-h-[75vh]');
        img.classList.remove('max-h-none', 'w-auto');
        if (zoomBtn) zoomBtn.innerText = '[ 100% ZOOM ]';
      }
    }

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });

    // Zoom toggle behavior
    if (zoomBtn && img) {
      let isZoomed = false;
      function toggleZoom() {
        isZoomed = !isZoomed;
        if (isZoomed) {
          img.classList.remove('max-h-[75vh]');
          img.classList.add('max-h-none', 'w-full');
          img.style.maxWidth = '1600px';
          zoomBtn.innerText = '[ FIT SCREEN ]';
          img.classList.remove('cursor-zoom-in');
          img.classList.add('cursor-zoom-out');
        } else {
          img.classList.add('max-h-[75vh]');
          img.classList.remove('max-h-none', 'w-full');
          img.style.maxWidth = '';
          zoomBtn.innerText = '[ 100% ZOOM ]';
          img.classList.remove('cursor-zoom-out');
          img.classList.add('cursor-zoom-in');
        }
      }
      zoomBtn.addEventListener('click', toggleZoom);
      img.addEventListener('click', toggleZoom);
    }
  }

  window.openSVCLightbox = function(src, title, desc, badge = 'OFFICIAL AUDIT DOCUMENTATION') {
    const modalEl = document.getElementById('svc-lightbox-modal');
    if (!modalEl) return;

    const img = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const descEl = document.getElementById('lightbox-desc');
    const badgeEl = document.getElementById('lightbox-badge');
    const dlLink = document.getElementById('lightbox-download-link');

    if (img) img.src = src;
    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = desc;
    if (badgeEl) badgeEl.innerText = badge;
    if (dlLink) dlLink.href = src;

    modalEl.classList.remove('hidden');
    modalEl.style.display = 'flex';
    document.body.classList.add('overflow-hidden');
  };

  // Robust universal event delegation: Catch clicks on any element with or inside [data-lightbox-src]
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-lightbox-src]');
    if (!trigger) return;

    e.preventDefault();
    const src = trigger.getAttribute('data-lightbox-src');
    if (!src) return;

    const title = trigger.getAttribute('data-lightbox-title') || 'Sri Venkateswara Company Official Document';
    const desc = trigger.getAttribute('data-lightbox-desc') || 'Precision Cold Forged Fastener Accreditation';
    const badge = trigger.getAttribute('data-lightbox-badge') || 'OFFICIAL AUDIT DOCUMENTATION';

    window.openSVCLightbox(src, title, desc, badge);
  });
}

/* --------------------------------------------------------------------------
   6. Universal Industrial Toast Messenger
   -------------------------------------------------------------------------- */
window.showIndustrialToast = function(message, type = 'info') {
  let container = document.getElementById('svc-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'svc-toast-container';
    container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const accentColor = type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : '#38bdf8';
  toast.className = 'pointer-events-auto bg-slate-900/95 border border-slate-700 text-white px-4 py-3 rounded shadow-xl flex items-center gap-3 text-sm font-mono transform translate-y-4 opacity-0 transition-all duration-300';
  toast.style.borderLeft = `4px solid ${accentColor}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
};

