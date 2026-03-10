/* ============================================================
   data/data-loader.js
   Single source of truth: reads from content-manager.xlsx
   Caches parsed data in localStorage so all gallery pages
   can use it without re-loading the file each time.
   ============================================================ */

(function () {

  var STORAGE_KEY = 'yrk_content_v1';

  /* ── Public API exposed on window.SITE_DATA ─────────────── */
  window.SITE_DATA = {
    photos : [],
    videos : [],
    pdfs   : [],
    loaded : false,
    loadedAt: null,

    /* Try to restore from localStorage */
    loadFromStorage: function () {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return false;
        var d = JSON.parse(raw);
        this.photos   = d.photos  || [];
        this.videos   = d.videos  || [];
        this.pdfs     = d.pdfs    || [];
        this.loaded   = true;
        this.loadedAt = d.loadedAt || null;
        return true;
      } catch (e) { return false; }
    },

    /* Save current data to localStorage */
    saveToStorage: function () {
      var payload = {
        photos   : this.photos,
        videos   : this.videos,
        pdfs     : this.pdfs,
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
        description : 'Description',
        category    : 'Category',
        image       : 'Image File'
      });

      this.videos = rows('Videos', {
        serial      : 'Serial No',
        name        : 'Name',
        description : 'Description',
        category    : 'Category',
        youtubeUrl  : 'YouTube URL',
        duration    : 'Duration'
      });

      this.pdfs = rows('PDFs', {
        serial      : 'Serial No',
        name        : 'Name',
        description : 'Description',
        category    : 'Category',
        file        : 'PDF File',
        pages       : 'Pages'
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
      this.photos = []; this.videos = []; this.pdfs = [];
      this.loaded = false; this.loadedAt = null;
    },

    /* Helper: sort array by serial number */
    sorted: function (arr) {
      return (arr || []).slice().sort(function (a, b) { return a.serial - b.serial; });
    }
  };

  /* Auto-restore on script load */
  window.SITE_DATA.loadFromStorage();

})();
