/**
 * Sri Venkateswara Company (SVC) — Main Navigation & Shared Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initQuickQuoteModal();
  initClipboardHelpers();
  initVerificationTooltips();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Dynamics
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('main-header');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-slate-800/80');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'shadow-2xl', 'border-b', 'border-slate-800/80');
      navbar.classList.add('bg-transparent');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    document.body.classList.add('overflow-hidden');
  });

  function closeDrawer() {
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    document.body.classList.remove('overflow-hidden');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Quick Quote Floating CTA & Modal
   -------------------------------------------------------------------------- */
function initQuickQuoteModal() {
  const triggerBtns = document.querySelectorAll('[data-open-quick-rfq]');
  const modal = document.getElementById('quick-rfq-modal');
  if (!modal) return;

  const closeBtn = document.getElementById('quick-rfq-close');

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

/* --------------------------------------------------------------------------
   4. Copy-to-Clipboard Utility
   -------------------------------------------------------------------------- */
function initClipboardHelpers() {
  document.querySelectorAll('[data-copy-val]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const val = btn.getAttribute('data-copy-val');
      navigator.clipboard.writeText(val).then(() => {
        if (window.showIndustrialToast) {
          window.showIndustrialToast(`Copied to clipboard: ${val}`, 'success');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Client Verification Transparency Tooltips
   -------------------------------------------------------------------------- */
function initVerificationTooltips() {
  document.querySelectorAll('.verification-flag').forEach((badge) => {
    badge.setAttribute('title', 'Pending client confirmation during website modernization review.');
  });
}

