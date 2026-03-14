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
    '      <div class="footer-social">',
    '        <a href="https://www.facebook.com/yogiramsuratkumarashram/" target="_blank" rel="noopener" class="soc-link soc-fb" title="Facebook">',
    '          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    '        </a>',
    '        <a href="https://www.youtube.com/@YogiRamsuratkumar" target="_blank" rel="noopener" class="soc-link soc-yt" title="YouTube">',
    '          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>',
    '        </a>',
    '        <a href="https://www.instagram.com/yogiramsuratkumarashram/" target="_blank" rel="noopener" class="soc-link soc-ig" title="Instagram">',
    '          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    '        </a>',
    '        <a href="https://wa.me/?text=Yogi%20Ramsuratkumar%20Ashram%20Website" target="_blank" rel="noopener" class="soc-link soc-wa" title="WhatsApp">',
    '          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
    '        </a>',
    '      </div>',
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
