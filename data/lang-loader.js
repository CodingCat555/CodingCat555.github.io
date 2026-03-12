/* ============================================================
   data/lang-loader.js — Language / i18n system
   ------------------------------------------------------------
   Usage:
     1. Include version + lang files BEFORE this file:
        <script src="data/version.js"></script>
        <script src="data/lang/en.js"></script>
        <script src="data/lang/ta.js"></script>
        <script src="data/lang-loader.js"></script>

     2. Mark elements with data-i18n="key":
        <a data-i18n="nav_home">Home</a>

     3. Mark placeholder inputs with data-i18n-ph="key":
        <input data-i18n-ph="search_photos_ph" />

     4. In JS, use t('key') to get translated string:
        $('#btn').text(t('btn_download'));

     5. Call window.applyLang() after dynamic content is added
        to re-apply translations.
   ============================================================ */

(function () {

  var LANGUAGES = {
    en: typeof LANG_EN !== 'undefined' ? LANG_EN : {},
    ta: typeof LANG_TA !== 'undefined' ? LANG_TA : {}
  };

  /* Try to load language data saved by Language Manager
     Version-aware: if lang version changed, clears stale cache
     and falls back to static JS lang files */
  try {
    var _saved = localStorage.getItem('yrk_lang_data');
    if (_saved) {
      var _d = JSON.parse(_saved);
      var _curVer = (typeof SITE_VERSION !== 'undefined') ? SITE_VERSION.lang : null;

      if (_curVer && _d.version !== _curVer) {
        /* Version mismatch → clear stale lang cache, use static JS files */
        localStorage.removeItem('yrk_lang_data');
        console.info('[LANG] Lang version changed (' + _d.version + ' → ' + _curVer + '). Cache cleared, loading fresh lang files.');
      } else {
        /* Version matches (or no versioning) → use cached translations */
        if (_d.en && Object.keys(_d.en).length) LANGUAGES.en = _d.en;
        if (_d.ta && Object.keys(_d.ta).length) LANGUAGES.ta = _d.ta;
      }
    }
  } catch (e) { /* ignore storage errors */ }

  var STORAGE_KEY = 'yrk_lang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  /* ── Public: translate a key ── */
  window.t = function (key) {
    var dict = LANGUAGES[currentLang] || LANGUAGES['en'];
    return dict[key] !== undefined ? dict[key] : (LANGUAGES['en'][key] || key);
  };

  /* ── Apply translations to DOM ── */
  window.applyLang = function (scope) {
    var root = scope || document;

    /* Text content */
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = window.t(key);
      /* Use innerHTML to support &amp; entities in translations */
      el.innerHTML = val;
    });

    /* Placeholder text */
    root.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      el.placeholder = window.t(el.getAttribute('data-i18n-ph'));
    });

    /* Update <html lang=""> attribute */
    document.documentElement.lang = currentLang;

    /* Update nav label */
    var lbl = document.getElementById('langNavLabel');
    if (lbl) lbl.textContent = currentLang === 'ta' ? 'தமிழ்' : 'EN';

    /* Sync switcher button active state */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
  };

  /* ── Switch language ── */
  window.setLang = function (code) {
    if (!LANGUAGES[code]) return;
    currentLang = code;
    localStorage.setItem(STORAGE_KEY, code);
    window.applyLang();
  };

  /* ── Wire up switcher buttons ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-btn');
    if (btn) window.setLang(btn.getAttribute('data-lang'));
  });

  /* ── Auto-apply on DOM ready ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.applyLang(); });
  } else {
    window.applyLang();
  }

})();
