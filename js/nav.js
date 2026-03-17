/* ============================================================
   js/nav.js — Shared site navigation (injected on all pages)
   Update this file to change the nav across the whole site.
   ============================================================ */
(function () {

  var SVG_SHARE = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

  var SVG_PLAY  = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
  var SVG_PAUSE = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="3" width="4" height="18" rx="1"/><rect x="15" y="3" width="4" height="18" rx="1"/></svg>';
  var SVG_VOL   = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>';

  /* ── Mini player HTML ── */
  var NMP_HTML =
    '<div class="nmp" id="navMiniPlayer">' +
      '<button class="nmp-btn" id="nmpPlayBtn" title="Play / Pause">' + SVG_PLAY + '</button>' +
      '<button class="nmp-vol-btn" id="nmpVolBtn" title="Volume">' + SVG_VOL + '</button>' +
      '<div class="nmp-middle">' +
        '<div class="nmp-title-wrap" id="nmpTitleWrap"><span class="nmp-title" id="nmpTitle">Loading…</span></div>' +
        '<input type="range" class="nmp-vol-slider" id="nmpVolSlider" min="0" max="100" value="80" style="display:none" />' +
      '</div>' +
    '</div>';

  var html =
    '<nav class="nav-wrapper">' +
      '<div class="nav-left-group">' +
        '<a href="index.html" class="nav-logo">' +
          '<div class="nav-logo-icon">🪔</div>' +
          '<div class="nav-logo-text">' +
            '<span class="nav-logo-name">Yogi Ramsuratkumar</span>' +
            '<span class="nav-logo-subtitle">Tiruvannamalai · 1918–2001</span>' +
          '</div>' +
        '</a>' +
        '<div class="nmp-logo-wrap">' + NMP_HTML + '</div>' +
      '</div>' +
      '<ul class="nav-menu" id="navMenu">' +
        '<li class="nav-item"><a href="index.html" class="nav-link" data-i18n="nav_home">Home</a></li>' +
        '<li class="nav-item">' +
          '<a href="about.html" class="nav-link"><span data-i18n="nav_about">About</span> <span class="arrow">▾</span></a>' +
          '<ul class="dropdown">' +
            '<li><a href="about.html#life" data-i18n="nav_about_life">Life &amp; Journey</a></li>' +
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
              '<a href="freebooks.html">📖 Free Books <span class="sub-arrow">▸</span></a>' +
              '<ul class="sub-dropdown" id="pdfCatDropdown">' +
                '<li><a href="freebooks.html">All Free Books</a></li>' +
              '</ul>' +
            '</li>' +
            '<li><a href="paidbooks.html">📚 Paid Books</a></li>' +
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
    if (typeof window.applyLang === 'function') window.applyLang();
    initMiniPlayer();
  }

  /* ── Mini Player Logic ── */
  var NMP_SS_KEY = 'nmpState'; /* sessionStorage key */

  function initMiniPlayer() {
    var audio   = new Audio();
    audio.loop  = true;
    audio.preload = 'auto';
    audio.volume  = 0.8;

    var playing  = false;

    /* ── Save / restore state across page navigation ── */
    function saveState() {
      try {
        var $t = document.getElementById('nmpTitle');
        sessionStorage.setItem(NMP_SS_KEY, JSON.stringify({
          playing: playing,
          src    : audio.src,
          time   : audio.currentTime,
          volume : audio.volume,
          title  : $t ? $t.textContent : ''
        }));
      } catch(e) {}
    }

    function restoreState() {
      try {
        var s = JSON.parse(sessionStorage.getItem(NMP_SS_KEY) || 'null');
        if (!s || !s.src) return null;
        return s;
      } catch(e) { return null; }
    }

    /* Save every 500ms while playing for accurate resume position */
    setInterval(function () { if (playing) saveState(); }, 500);

    /* Save immediately before unload */
    window.addEventListener('beforeunload', saveState);

    var trackLoaded = false;

    /* ── Step 1: Restore from sessionStorage immediately (works on ALL pages) ── */
    function resumeFromSession() {
      var saved = restoreState();
      if (!saved || !saved.src) return false;
      /* restore title immediately — no SITE_DATA needed */
      var $t = document.getElementById('nmpTitle');
      if ($t && saved.title) { $t.textContent = saved.title; }
      audio.src    = saved.src;
      audio.volume = saved.volume || 0.8;
      if (saved.playing) {
        audio.addEventListener('canplay', function resumeOnce() {
          audio.removeEventListener('canplay', resumeOnce);
          if (saved.time) audio.currentTime = saved.time;
          audio.play().then(function () { setPlaying(true); }).catch(function () {});
        });
      }
      return true;
    }

    /* ── Step 2: Load from SITE_DATA (first visit only, no saved state) ── */
    function loadFirstTrack() {
      if (trackLoaded) return; /* already loaded from session or previous call */
      var list = (typeof SITE_DATA !== 'undefined' && SITE_DATA.audios && SITE_DATA.audios.length)
        ? SITE_DATA.audios : [];
      var track = null;
      for (var i = 0; i < list.length; i++) {
        if (Number(list[i].serial) === 1) { track = list[i]; break; }
      }
      if (!track) track = list[0];
      if (!track) return;
      trackLoaded = true;
      audio.src    = track.audioFile || track.file || track.url || '';
      audio.volume = 0.8;
      var $t = document.getElementById('nmpTitle');
      if ($t) { $t.textContent = track.name || track.title || 'Chant'; }
    }

    /* Try session first — if no saved state, wait for SITE_DATA */
    if (resumeFromSession()) {
      trackLoaded = true;
      /* update title from SITE_DATA when available */
      function updateTitle() {
        var list = (typeof SITE_DATA !== 'undefined' && SITE_DATA.audios && SITE_DATA.audios.length)
          ? SITE_DATA.audios : [];
        var track = null;
        for (var i = 0; i < list.length; i++) {
          if (Number(list[i].serial) === 1) { track = list[i]; break; }
        }
        if (!track) track = list[0];
        if (!track) return;
        var $t = document.getElementById('nmpTitle');
        if ($t) { $t.textContent = track.name || track.title || 'Chant'; }
      }
      if (typeof SITE_DATA !== 'undefined' && SITE_DATA.loaded) { updateTitle(); }
      else { document.addEventListener('siteDataReady', updateTitle); setTimeout(updateTitle, 2000); }
    } else {
      /* No session — poll for SITE_DATA to load first track */
      function tryLoad() {
        if (typeof SITE_DATA !== 'undefined' && SITE_DATA.loaded && SITE_DATA.audios && SITE_DATA.audios.length) {
          loadFirstTrack();
        } else {
          setTimeout(tryLoad, 500);
        }
      }
      tryLoad();
      document.addEventListener('siteDataReady', loadFirstTrack);
    }

    /* ── Play state ── */
    function setPlaying(state) {
      playing = state;
      var btn   = document.getElementById('nmpPlayBtn');
      var title = document.getElementById('nmpTitle');
      var el    = document.getElementById('navMiniPlayer');
      if (btn)   btn.innerHTML = state ? SVG_PAUSE : SVG_PLAY;
      if (el)    el.classList.toggle('nmp-playing', state);
      if (title) title.classList.toggle('nmp-marquee', state);
      if (!state) saveState(); /* save stopped state immediately */
    }

    function toggle() {
      if (!audio.src) return;
      if (playing) { audio.pause(); setPlaying(false); }
      else {
        /* notify audio screen to stop before playing */
        document.dispatchEvent(new CustomEvent('navAudioPlay'));
        audio.play().then(function () { setPlaying(true); }).catch(function () {});
      }
    }

    /* ── Stop mini player when audio page starts playing ── */
    document.addEventListener('siteAudioPlay', function () {
      if (playing) { audio.pause(); setPlaying(false); }
    });

    var volVisible = false;
    var volRevertTimer = null;

    function showTitle() {
      volVisible = false;
      var titleWrap = document.getElementById('nmpTitleWrap');
      var slider    = document.getElementById('nmpVolSlider');
      if (titleWrap) titleWrap.style.display = 'flex';
      if (slider)    slider.style.display    = 'none';
    }

    function showSlider() {
      volVisible = true;
      var titleWrap = document.getElementById('nmpTitleWrap');
      var slider    = document.getElementById('nmpVolSlider');
      if (titleWrap) titleWrap.style.display = 'none';
      if (slider)    slider.style.display    = 'block';
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest('#nmpPlayBtn')) { toggle(); return; }
      if (e.target.closest('#nmpVolBtn')) {
        if (volVisible) { clearTimeout(volRevertTimer); showTitle(); }
        else { showSlider(); }
        return;
      }
    });

    document.addEventListener('input', function (e) {
      if (e.target.id === 'nmpVolSlider') {
        audio.volume = e.target.value / 100;
        /* auto-revert to title 2.5s after last slider move */
        clearTimeout(volRevertTimer);
        volRevertTimer = setTimeout(showTitle, 2500);
      }
    });

    audio.addEventListener('ended', function () { setPlaying(false); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();
