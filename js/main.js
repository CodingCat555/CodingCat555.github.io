/* ============================================================
   main.js — Yogi Ramsuratkumar Website
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Mobile Menu ------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const overlay   = document.getElementById('menuOverlay');

  function openMenu()  { hamburger.classList.add('active'); navMenu.classList.add('open'); overlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { hamburger.classList.remove('active'); navMenu.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }

  if (hamburger) hamburger.addEventListener('click', () => navMenu.classList.contains('open') ? closeMenu() : openMenu());
  if (overlay)   overlay.addEventListener('click', closeMenu);

  /* Mobile dropdown toggles */
  document.querySelectorAll('.nav-item').forEach(item => {
    const link     = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown');
    if (link && dropdown) {
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        }
      });
    }
  });

  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });

  /* ---- Header Scroll Effect --------------------------------------- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
  }

  /* ---- Active Nav Link ------------------------------------------- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentFile || (currentFile === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ---- Scroll to Top --------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 380), { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Intersection Observer (fade-in animations) ---------------- */
  function observeFade(scope) {
    const els = (scope || document).querySelectorAll('.fade-in:not(.visible)');
    if (!els.length) return;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
      els.forEach(el => io.observe(el));
    } else {
      els.forEach(el => el.classList.add('visible'));
    }
  }
  observeFade();

  /* Expose for gallery pages that render content dynamically */
  window.initFade    = function () { observeFade(); };
  window.initGallery = function () { observeFade(); buildLightboxIndex(); attachGalleryClicks(); };

  /* ---- Gallery Filter -------------------------------------------- */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
      });
      buildLightboxIndex();
    });
  });

  /* ---- PDF Category Filter --------------------------------------- */
  const pdfFilterBtns = document.querySelectorAll('.pdf-filter-btn');
  const pdfCards      = document.querySelectorAll('.pdf-card');

  pdfFilterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;
      pdfFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      pdfCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  /* ---- Video Filter ---------------------------------------------- */
  const videoFilterBtns = document.querySelectorAll('.video-filter-btn');
  const videoCards      = document.querySelectorAll('.video-card');

  videoFilterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;
      videoFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      videoCards.forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });
    });
  });

  /* ---- Video Lazy Load (play on click) --------------------------- */
  document.querySelectorAll('.video-thumb[data-src]').forEach(thumb => {
    const playBtn = thumb.querySelector('.video-play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', function () {
        const src = thumb.dataset.src;
        if (!src) return;
        const iframe = document.createElement('iframe');
        iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
        iframe.allow = 'autoplay; encrypted-media; fullscreen';
        iframe.allowFullscreen = true;
        iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:none;';
        thumb.style.position = 'relative';
        thumb.innerHTML = '';
        thumb.appendChild(iframe);
      });
    }
  });

  /* ---- Lightbox -------------------------------------------------- */
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lbImg');
  const lbCaption  = document.getElementById('lbCaption');
  const lbCounter  = document.getElementById('lbCounter');

  let lbIndex = 0;
  let lbItems = [];

  function buildLightboxIndex() {
    lbItems = Array.from(document.querySelectorAll('.gallery-item')).filter(el => el.style.display !== 'none');
  }
  buildLightboxIndex();

  function openLightbox(idx) {
    if (!lightbox || lbItems.length === 0) return;
    lbIndex = ((idx % lbItems.length) + lbItems.length) % lbItems.length;
    const item   = lbItems[lbIndex];
    const img    = item.querySelector('img');
    const src     = item.dataset.img || (img ? img.src : '');
    const caption = item.dataset.caption || (img ? img.alt : '') || 'Yogi Ramsuratkumar';

    lbImg.src = src;
    lbImg.alt = caption;
    if (lbCaption) lbCaption.textContent = caption;
    if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbItems.length}`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { if (lbImg) lbImg.src = ''; }, 350);
  }

  /* attachGalleryClicks — called after dynamic render */
  function attachGalleryClicks() {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.removeEventListener('click', item._lbHandler || function(){});
      item._lbHandler = function () {
        buildLightboxIndex();
        const visIdx = lbItems.indexOf(this);
        openLightbox(visIdx >= 0 ? visIdx : 0);
      };
      item.addEventListener('click', item._lbHandler);
    });
  }
  attachGalleryClicks();

  /* Also handle dynamically added items via event delegation */
  document.addEventListener('click', function (e) {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    buildLightboxIndex();
    const visIdx = lbItems.indexOf(item);
    openLightbox(visIdx >= 0 ? visIdx : 0);
  });

  /* Attach click to gallery items */
  document.querySelectorAll('.gallery-item').forEach((item, idx) => {
    item.addEventListener('click', function () {
      buildLightboxIndex();
      const visIdx = lbItems.indexOf(this);
      openLightbox(visIdx >= 0 ? visIdx : 0);
    });
  });

  if (lightbox) {
    document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
    document.getElementById('lbOverlay')?.addEventListener('click', closeLightbox);
    document.getElementById('lbPrev')?.addEventListener('click', () => openLightbox(lbIndex - 1));
    document.getElementById('lbNext')?.addEventListener('click', () => openLightbox(lbIndex + 1));
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  openLightbox(lbIndex - 1);
    if (e.key === 'ArrowRight') openLightbox(lbIndex + 1);
  });

  /* ---- Smooth scroll for anchor links ---------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

}); // end DOMContentLoaded
