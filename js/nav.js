/* ============================================================
   js/nav.js — Shared site navigation (injected on all pages)
   Update this file to change the nav across the whole site.
   ============================================================ */
(function () {

  var SVG_SHARE = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

  var html =
    '<nav class="nav-wrapper">' +
      '<a href="index.html" class="nav-logo">' +
        '<div class="nav-logo-icon">🪔</div>' +
        '<div class="nav-logo-text">' +
          '<span class="nav-logo-name">Yogi Ramsuratkumar</span>' +
          '<span class="nav-logo-subtitle">Tiruvannamalai · 1918–2001</span>' +
        '</div>' +
      '</a>' +
      '<ul class="nav-menu" id="navMenu">' +
        '<li class="nav-item"><a href="index.html" class="nav-link" data-i18n="nav_home">Home</a></li>' +
        '<li class="nav-item">' +
          '<a href="about.html" class="nav-link"><span data-i18n="nav_about">About</span> <span class="arrow">▾</span></a>' +
          '<ul class="dropdown">' +
            '<li><a href="about.html#life" data-i18n="nav_about_life">Life &amp; Journey</a></li>' +
            '<li><a href="about.html#teachings" data-i18n="nav_about_teachings">Teachings</a></li>' +
            '<li><a href="about.html#timeline" data-i18n="nav_about_timeline">Timeline</a></li>' +
          '</ul>' +
        '</li>' +
        '<li class="nav-item">' +
          '<a href="photos.html" class="nav-link"><span data-i18n="nav_gallery">Gallery</span> <span class="arrow">▾</span></a>' +
          '<ul class="dropdown">' +
            '<li class="nav-has-sub">' +
            '<a href="photos.html">📷 Photos <span class="sub-arrow">▸</span></a>' +
            '<ul class="sub-dropdown" id="photoCatDropdown">' +
              '<li><a href="photos.html">All Photos</a></li>' +
            '</ul>' +
          '</li>' +
            '<li class="nav-has-sub">' +
              '<a href="videos.html">🎬 Videos <span class="sub-arrow">▸</span></a>' +
              '<ul class="sub-dropdown" id="videoCatDropdown">' +
                '<li><a href="videos.html">All Videos</a></li>' +
              '</ul>' +
            '</li>' +
            '<li class="nav-has-sub">' +
              '<a href="audios.html">🎵 Audios <span class="sub-arrow">▸</span></a>' +
              '<ul class="sub-dropdown" id="audioCatDropdown">' +
                '<li><a href="audios.html">All Audios</a></li>' +
              '</ul>' +
            '</li>' +
            '<li class="nav-has-sub">' +
              '<a href="pdfs.html">📄 PDFs <span class="sub-arrow">▸</span></a>' +
              '<ul class="sub-dropdown" id="pdfCatDropdown">' +
                '<li><a href="pdfs.html">All PDFs</a></li>' +
              '</ul>' +
            '</li>' +
            '<li><a href="quotes.html">✨ Quotes</a></li>' +
          '</ul>' +
        '</li>' +
        '<li class="nav-item"><a href="contact.html" class="nav-link" data-i18n="nav_contact">Contact</a></li>' +
        '<li class="nav-item">' +
          '<a href="javascript:void(0)" class="nav-link">🌐 <span id="langNavLabel">EN</span> <span class="arrow">▾</span></a>' +
          '<ul class="dropdown lang-dropdown">' +
            '<li><button class="lang-btn" data-lang="en">English</button></li>' +
            '<li><button class="lang-btn" data-lang="ta">தமிழ்</button></li>' +
          '</ul>' +
        '</li>' +
        '<li class="nav-item">' +
          '<button class="nav-link nav-share-btn" id="navShareBtn" title="Share this website">' + SVG_SHARE + ' Share</button>' +
        '</li>' +
      '</ul>' +
      '<button class="hamburger" id="hamburger" aria-label="Toggle menu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>';

  function inject() {
    var header = document.querySelector('header.header');
    if (!header) return;
    header.innerHTML = html;
    /* Re-apply i18n if lang-loader already ran */
    if (typeof window.applyLang === 'function') window.applyLang();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
