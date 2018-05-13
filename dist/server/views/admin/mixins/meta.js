'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var meta = require('../router/meta.json');

exports.default = {
  watch: {
    '$route': function $route() {
      this.setMeta();
    }
  },

  created: function created() {
    if (process.env.VUE_ENV === 'client') return;

    var metaData = meta[this.$route.path] || {};

    this.$ssrContext.title = metaData.title;
    this.$ssrContext.description = metaData.description;
    this.$ssrContext.keywords = metaData.keywords;
  },
  mounted: function mounted() {
    this.setMeta();
  },


  methods: {
    setMeta: function setMeta() {
      if (typeof document === 'undefined') return;

      var metaData = meta[this.$route.path] || {};

      document.title = metaData.title;
      document.querySelector('meta[name="description"]').setAttribute('content', metaData.description);
      document.querySelector('meta[name="keywords"]').setAttribute('content', metaData.keywords);
    }
  }
};
module.exports = exports['default'];
//# sourceMappingURL=meta.js.map
