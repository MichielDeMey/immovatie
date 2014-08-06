Polymer('immo-card', {

  descriptionClass: function(val) {
    return _.isEmpty(val) ? 'empty' : '';
  },

  surfaceFilter: function(val) {
    return _.isNumber(val) ? val + 'm²' : '—';
  },

  bedroomsFilter: function(val) {
    return _.isNumber(val) ? val : '—';
  },

  currency: function(val) {

    if (_.isNumber(val))
      return accounting.formatMoney(parseInt(val), "€", 0, ".", ",");
    else
      return '€—';
  },
  // Fires when an instance of the element is created
  created: function() {

  },

  isEmpty: function(val) {
    return _.isEmpty(val);
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