Polymer('immo-card', {

  descriptionClass: function(val) {
    return val === null || val === '' || typeof val === "undefined" ? 'empty' : '';
  },

  surfaceFilter: function(val) {
    return !isNaN(parseInt(val)) ? val + 'm²' : '—';
  },

  bedroomsFilter: function(val) {
    return !isNaN(parseInt(val)) ? val : '—';
  },

  currency: function(val) {

    if (!isNaN(parseInt(val)))
      return accounting.formatMoney(parseInt(val), "€", 0, ".", ",");
    else
      return '€—';
  },

  // Fires when an instance of the element is created
  created: function() {

  },

  // Fires when the "<polymer-element>" has been fully prepared
  ready: function() {},

  // Fires when the element’s initial set of children and siblings are guaranteed to exist
  domReady: function() {},

  // Fires when the element was inserted into the document
  attached: function() {},

  // Fires when the element was removed from the document
  detached: function() {},

  // Fires when an attribute was added, removed, or updated
  attributeChanged: function(attr, oldVal, newVal) {}
});