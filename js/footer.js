/* ============================================================
   js/footer.js — Shared site footer (injected on all pages)
   Update this file to change the footer across the whole site.
   ============================================================ */
(function () {

  var html = [
    '<div class="container">',
    '  <div class="footer-grid">',
    '    <div class="footer-brand">',
    '      <h3>🪔 Yogi Ramsuratkumar</h3>',
    '      <p>A tribute website dedicated to the beloved saint of Tiruvannamalai,',
    '         Sri Yogi Ramsuratkumar (1918–2001) — the God-Given Beggar who showered',
    '         divine love on all who sought His grace.</p>',
    '      <p class="footer-chant">',
    '        "Yogi Ramsuratkumar, Yogi Ramsuratkumar,<br>',
    '        Yogi Ramsuratkumar — Jaya Guru Raya"',
    '      </p>',
    '    </div>',
    '    <div class="footer-col">',
    '      <h4 data-i18n="footer_quick_links">Quick Links</h4>',
    '      <ul>',
    '        <li><a href="index.html">Home</a></li>',
    '        <li><a href="about.html">About Swamiji</a></li>',
    '        <li><a href="photos.html">Photo Gallery</a></li>',
    '        <li><a href="videos.html">Video Gallery</a></li>',
    '        <li><a href="audios.html">Audio Gallery</a></li>',
    '        <li><a href="pdfs.html">PDF Downloads</a></li>',
    '        <li><a href="quotes.html">✨ Quotes</a></li>',
    '        <li><a href="contact.html">Contact</a></li>',
    '      </ul>',
    '    </div>',
    '    <div class="footer-col">',
    '      <h4 data-i18n="footer_about">About</h4>',
    '      <ul>',
    '        <li><a href="about.html#life">Life &amp; Journey</a></li>',
    '        <li><a href="about.html#teachings">His Teachings</a></li>',
    '        <li><a href="about.html#timeline">Timeline</a></li>',
    '      </ul>',
    '    </div>',
    '    <div class="footer-col">',
    '      <h4 data-i18n="footer_ashram">Ashram</h4>',
    '      <ul>',
    '        <li><a href="contact.html">Visit Us</a></li>',
    '        <li><a href="contact.html#address">Address</a></li>',
    '        <li><a href="contact.html#timings">Timings</a></li>',
    '      </ul>',
    '    </div>',
    '  </div>',
    '  <div class="footer-bottom">',
    '    <p>',
    '      © 2025 Yogi Ramsuratkumar Ashram, Tiruvannamalai, Tamil Nadu, India &nbsp;|&nbsp;',
    '      Designed with 🪔 devotion &nbsp;|&nbsp;',
    '      <span class="site-ver" style="opacity:0.65;font-size:0.78rem;"></span>',
    '    </p>',
    '  </div>',
    '</div>'
  ].join('\n');

  function inject() {
    var footer = document.querySelector('footer.footer');
    if (!footer) return;
    footer.innerHTML = html;
    /* Set version from SITE_VERSION (loaded via data/version.js) */
    var ver = (typeof SITE_VERSION !== 'undefined' && SITE_VERSION.data) ? SITE_VERSION.data : '';
    if (ver) {
      footer.querySelectorAll('.site-ver').forEach(function (el) { el.textContent = 'v' + ver; });
    }
    /* Re-apply i18n translations if lang-loader already ran */
    if (typeof applyTranslations === 'function') applyTranslations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  /* ── Nav Share Button ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('#navShareBtn');
    if (!btn) return;
    var url  = window.location.href.split('?')[0];
    var title = 'Yogi Ramsuratkumar';
    var text  = 'Yogi Ramsuratkumar — A tribute website dedicated to the beloved saint of Tiruvannamalai';
    if (navigator.share) {
      navigator.share({ title: title, text: text, url: url }).catch(function () {});
    } else {
      /* Desktop fallback: copy URL */
      navigator.clipboard.writeText(url).then(function () {
        btn.textContent = '✓';
        setTimeout(function () { btn.textContent = '📤'; }, 1800);
      }).catch(function () {});
    }
  });

})();
