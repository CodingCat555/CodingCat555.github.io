/* ============================================================
   data/data-loader.js
   Single source of truth: reads from gallery-manager or static
   JS files. Version-aware cache: when SITE_VERSION.data changes,
   old localStorage cache is auto-cleared and fresh data is loaded
   from the static JS files on next page visit.
   ============================================================ */

(function () {

  var STORAGE_KEY = 'yrk_content_v2';

  /* ── Public API exposed on window.SITE_DATA ─────────────── */
  window.SITE_DATA = {
    photos : [],
    videos : [],
    pdfs   : [],
    audios : [],
    quotes : [],
    loaded : false,
    loadedAt: null,

    /* Try to restore from localStorage — version-aware */
    loadFromStorage: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        var d = JSON.parse(raw);

        /* Version check: if site version changed, discard stale cache */
        var currentVer = (typeof SITE_VERSION !== 'undefined') ? SITE_VERSION.data : null;
        if (currentVer && d.version !== currentVer) {
          /* Version mismatch → clear old cache, fall back to static JS files */
          localStorage.removeItem(STORAGE_KEY);
          console.info('[SITE_DATA] Data version changed (' + d.version + ' → ' + currentVer + '). Cache cleared, loading fresh data.');
          return false;
        }

        this.photos   = d.photos  || [];
        this.videos   = d.videos  || [];
        this.pdfs     = d.pdfs    || [];
        this.audios   = d.audios  || [];
        this.quotes   = d.quotes  || [];
        this.loaded   = true;
        this.loadedAt = d.loadedAt || null;
        return true;
      } catch (e) { return false; }
    },

    /* Save current data to localStorage (includes current version) */
    saveToStorage: function () {
      var payload = {
        version  : (typeof SITE_VERSION !== 'undefined') ? SITE_VERSION.data : '1.0',
        photos   : this.photos,
        videos   : this.videos,
        pdfs     : this.pdfs,
        audios   : this.audios,
        quotes   : this.quotes,
        loadedAt : new Date().toLocaleString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      this.loadedAt = payload.loadedAt;
    },

    /* Parse an XLSX ArrayBuffer / BinaryString using SheetJS */
    parseWorkbook: function (data, type) {
      var wb = XLSX.read(data, { type: type || 'binary' });

      function rows(sheetName, fieldMap) {
        if (!wb.Sheets[sheetName]) return [];
        return XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { defval: '' })
          .map(function (r, i) {
            var obj = {};
            Object.keys(fieldMap).forEach(function (key) {
              var col = fieldMap[key];
              obj[key] = (r[col] !== undefined && r[col] !== '') ? r[col] : '';
            });
            if (!obj.serial) obj.serial = i + 1;
            obj.serial = Number(obj.serial) || (i + 1);
            return obj;
          });
      }

      this.photos = rows('Photos', {
        serial      : 'Serial No',
        name        : 'Name',
        name_ta     : 'Name (Tamil)',
        name_en     : 'Name (English)',
        description : 'Description',
        category    : 'Category',
        image       : 'Image File',
        isActive    : 'Is Active'
      });

      this.videos = rows('Videos', {
        serial      : 'Serial No',
        name        : 'Name',
        description : 'Description',
        category    : 'Category',
        youtubeUrl  : 'YouTube URL',
        duration    : 'Duration',
        isActive    : 'Is Active'
      });

      this.pdfs = rows('PDFs', {
        serial      : 'Serial No',
        name        : 'Name',
        description : 'Description',
        category    : 'Category',
        file        : 'PDF File',
        pages       : 'Pages',
        isActive    : 'Is Active'
      });

      this.audios = rows('Audios', {
        serial      : 'Serial No',
        name        : 'Name',
        description : 'Description',
        category    : 'Category',
        audioFile   : 'Audio File',
        image       : 'Image File',
        duration    : 'Duration',
        isActive    : 'Is Active'
      });

      this.loaded = true;
      this.saveToStorage();
    },

    /* Load from a File object (FileReader) */
    loadFromFile: function (file, onSuccess, onError) {
      var self = this;
      var reader = new FileReader();
      reader.onload = function (e) {
        try {
          self.parseWorkbook(e.target.result, 'binary');
          if (onSuccess) onSuccess();
        } catch (err) {
          if (onError) onError(err);
        }
      };
      reader.onerror = function () { if (onError) onError(new Error('File read error')); };
      reader.readAsBinaryString(file);
    },

    /* Clear all cached data */
    clear: function () {
      localStorage.removeItem(STORAGE_KEY);
      this.photos = []; this.videos = []; this.pdfs = []; this.audios = []; this.quotes = [];
      this.loaded = false; this.loadedAt = null;
    },

    /* Helper: sort array by serial number */
    sorted: function (arr) {
      return (arr || []).slice().sort(function (a, b) { return a.serial - b.serial; });
    },

    /* Helper: return only active items (isActive !== 'no'), sorted by serial */
    active: function (arr) {
      return (arr || []).filter(function (item) {
        return String(item.isActive || 'yes').toLowerCase() !== 'no';
      }).sort(function (a, b) { return a.serial - b.serial; });
    }
  };

  /* Auto-restore on script load:
     1. Try localStorage first (version-checked — auto-clears if stale)
     2. Fall back to static data JS files (photos.js / videos.js / pdfs.js / audios.js) */
  if (!window.SITE_DATA.loadFromStorage()) {
    if (typeof PHOTOS_DATA !== 'undefined' && PHOTOS_DATA.length) {
      window.SITE_DATA.photos = PHOTOS_DATA;
    }
    if (typeof VIDEOS_DATA !== 'undefined' && VIDEOS_DATA.length) {
      window.SITE_DATA.videos = VIDEOS_DATA;
    }
    if (typeof PDFS_DATA !== 'undefined' && PDFS_DATA.length) {
      window.SITE_DATA.pdfs = PDFS_DATA;
    }
    if (typeof AUDIOS_DATA !== 'undefined' && AUDIOS_DATA.length) {
      window.SITE_DATA.audios = AUDIOS_DATA;
    }
    if (typeof QUOTES_DATA !== 'undefined' && QUOTES_DATA.length) {
      window.SITE_DATA.quotes = QUOTES_DATA;
    }
    if (window.SITE_DATA.photos.length || window.SITE_DATA.videos.length ||
        window.SITE_DATA.pdfs.length   || window.SITE_DATA.audios.length ||
        window.SITE_DATA.quotes.length) {
      window.SITE_DATA.loaded = true;
      /* Cache the static data in localStorage so subsequent loads are instant.
         Version is stored alongside — if version.js changes on next deploy,
         data-loader will detect the mismatch, clear this cache, and reload
         the fresh static files automatically. */
      try { window.SITE_DATA.saveToStorage(); } catch (e) { /* storage full or private mode */ }
    }
  }

})();
