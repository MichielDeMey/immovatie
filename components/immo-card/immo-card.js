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
  created: function() {},

  isEmpty: function(val) {
    return _.isEmpty(val);
  },

  // Fires when the "<polymer-element>" has been fully prepared
  ready: function() {},

  // Fires when the element’s initial set of children and siblings are guaranteed to exist
  domReady: function() {},

  // Fires when the element was inserted into the document
  attached: function() {
    var self = this;
    var spring = window.springSystem.createSpring(40, 6.5);
    var imageSpring = window.springSystem.createSpring(40, 6.5);

    var $container = self.$.container;
    var width = $container.offsetWidth;

    var full = false;

    // Add a listener to the spring. Every time the physics
    // solver updates the Spring's value onSpringUpdate will
    // be called.
    spring.addListener({
      onSpringUpdate: function(spring) {
        var val = spring.getCurrentValue();
        val = rebound.MathUtil
                     .mapValueInRange(val, 0, 1, width, (width + 10) * 2);
        //scale($container, val);
        sizeWidth($container, val);
      }
    });

    imageSpring.addListener({
      onSpringUpdate: function(spring) {
        var val = imageSpring.getCurrentValue();
        valPercentage = rebound.MathUtil
                     .mapValueInRange(val, 0, 1, 38, 100);

        sizeHeightPercentage(self.$.image, valPercentage);

        console.log(valPercentage);
      }
    });

    // Listen for mouse down/up/out and toggle the
    //springs endValue from 0 to 1.
    self.addEventListener('click', function() {
      if (!full) {
        //$container.classList.add('full');
        spring.setEndValue(1);
        imageSpring.setEndValue(1);
        full = true;
      } else {
        //$container.classList.remove('full');
        spring.setEndValue(0);
        imageSpring.setEndValue(0);
        full = false;
      }
    });

    // self.addEventListener('mouseup', function() {
    //   spring.setEndValue(0);
    // });

    // Helper for scaling an element with css transforms.
    function scale(el, val) {
      el.style.mozTransform =
      el.style.msTransform =
      el.style.webkitTransform =
      el.style.transform = 'scale3d(' +
        val + ', ' + val + ', 1)';
    }

    function sizeWidth(el, val) {
      el.style.width = val + 'px';
    }

    function sizeHeightPercentage(el, val) {
      el.style.height = val + '%';
    }
  },

  // Fires when the element was removed from the document
  detached: function() {},

  // Fires when an attribute was added, removed, or updated
  attributeChanged: function(attr, oldVal, newVal) {}
});