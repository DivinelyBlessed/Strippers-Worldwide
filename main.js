/**
 * StrippersWorldwide.com
 * main.js
 *
 * No inline scripts were present in the original HTML.
 * This file is provided as the JavaScript entry point for the project.
 *
 * Add any interactive behaviour here, for example:
 *  - Live viewer count updates
 *  - Affiliate link tracking
 *  - Lazy-loading model images
 *  - Mobile nav toggle
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav: hide text links on small screens ── */
  const navTextLinks = document.querySelectorAll('.nav-text-link');
  function updateNavLinks() {
    navTextLinks.forEach(link => {
      link.style.display = window.innerWidth < 640 ? 'none' : 'inline';
    });
  }
  updateNavLinks();
  window.addEventListener('resize', updateNavLinks);

  /* ── Live badge viewer count (placeholder) ── */
  const viewerCountEl = document.getElementById('viewer-count');
  if (viewerCountEl) {
    // Replace with a real API call to get live viewer counts
    const base = 18000;
    function updateCount() {
      const jitter = Math.floor(Math.random() * 400) - 200;
      viewerCountEl.textContent = (base + jitter).toLocaleString();
    }
    updateCount();
    setInterval(updateCount, 8000);
  }

  /* ── Affiliate link click tracking (placeholder) ── */
  document.querySelectorAll('a[href="#AFFILIATE_LINK"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Replace '#AFFILIATE_LINK' with your real affiliate URLs
      // and add any analytics tracking here (e.g. gtag event)
      console.log('Affiliate link clicked:', e.currentTarget.textContent.trim());
    });
  });

});
