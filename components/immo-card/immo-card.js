Polymer('immo-card', {

  TRANSITIONEND_STRING: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',

  isEmpty: _.isEmpty,

  isFull: false,

  $ghost: undefined,

  openCard: function() {
    if (this.isFull) return;

    var i = 0;

    var self = this;
    var $self = $(self);

    this.fire('core-signal', {
      name: 'overlay',
      data: {
        show: true,
        bind: this,
        onClick: self.closeCard
      }
    });

    var cardRect = self.getBoundingClientRect();

    $self.css({
      left: cardRect.left,
      top: cardRect.top
    }).addClass('modal full transition');

    self.getBoundingClientRect();

    self.$ghost = $('<div class="immo-card--ghost">');
    self.$ghost.insertAfter($self);

    // var deltaX = (($(window).width() / 2) - cardRect.left) - cardRect.width / 2;
    // var deltaY = (($(window).height() / 2) - cardRect.top) - cardRect.height / 2;
    
    var windowWidth = $(window).width();
    //var fullWidth = windowWidth * 0.8 >= 800 ? 800 : windowWidth * 0.8;
    var fullWidth = 800;

    var deltaX = ((windowWidth / 2) - cardRect.left) - fullWidth / 2;
    var deltaY = (($(window).height() / 2) - cardRect.top) - cardRect.height / 2;
    

    $self.on(this.TRANSITIONEND_STRING, function (event) {

      i++;
      console.log(i, event.propertyName);

      $self
        .removeClass('transition')
        .addClass('open')
        .css({
          left          : '',
          top           : '',
          transform     : '',
          'margin-left' : '-' + (fullWidth / 2) + 'px'
        })
        .off(this.TRANSITIONEND_STRING);

        self.isFull = true;
    });

    $self.css({
      transform: 'translate(' + deltaX + 'px, ' + deltaY + 'px)'
    });
  },

  closeCard: function () {
    if (!this.isFull) return;

    var self = this;
    var $self = $(self);

    this.fire('core-signal', {
      name: 'overlay',
      data: {
        show: false
      }
    });

    $self.on(this.TRANSITIONEND_STRING, function (event) {

      $self
        .removeClass('modal open transition')
        .css({
          transform     : '',
          'margin-left' : ''
        })
        .off(this.TRANSITIONEND_STRING);
      self.$ghost.remove();

      self.isFull = false;
    });

    $self
      .addClass('transition')
      .removeClass('full');

    var ghostRect = self.$ghost[0].getBoundingClientRect();
    var cardRect = self.getBoundingClientRect();

    var deltaX = ghostRect.left - cardRect.left;
    var deltaY = ghostRect.top - cardRect.top;
    
    $self.css({
      transform: 'translate(' + deltaX + 'px,' + deltaY + 'px)'
    });
  },

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

  // Fires when the "<polymer-element>" has been fully prepared
  ready: function() {},

  // Fires when the element’s initial set of children and siblings are guaranteed to exist
  domReady: function() {},

  // Fires when the element was inserted into the document
  attached: function() {
    var self = this;
    //var spring = window.springSystem.createSpring(40, 6.5);
    // var imageSpring = window.springSystem.createSpring(40, 6.5);

    //var $container = self.$.container;
    //var width = $container.offsetWidth;

    // Add a listener to the spring. Every time the physics
    // solver updates the Spring's value onSpringUpdate will
    // be called.
    // spring.addListener({
    //   onSpringUpdate: function(spring) {
    //     var val = spring.getCurrentValue();
    //     val = rebound.MathUtil
    //                  .mapValueInRange(val, 0, 1, width, (width + 10) * 2);
    //     //scale($container, val);
    //     sizeWidth($container, val);
    //   }
    // });

    // imageSpring.addListener({
    //   onSpringUpdate: function(spring) {
    //     var val = imageSpring.getCurrentValue();
    //     valPercentage = rebound.MathUtil
    //                  .mapValueInRange(val, 0, 1, 38, 100);

    //     sizeHeightPercentage(self.$.image, valPercentage);

    //     console.log(valPercentage);
    //   }
    // });

    self.$.image.addEventListener('click', function() {
      if (!self.isFull) {
        self.openCard();

        //spring.setEndValue(1);
        //imageSpring.setEndValue(1);
      } else {
        self.closeCard();

        //spring.setEndValue(0);
        //imageSpring.setEndValue(0);
      }
    });

    // Helper for scaling an element with css transforms.
    // function scale(el, val) {
    //   el.style.mozTransform =
    //   el.style.msTransform =
    //   el.style.webkitTransform =
    //   el.style.transform = 'scale3d(' +
    //     val + ', ' + val + ', 1)';
    // }

    function sizeWidth(el, val) {
      el.style.width = val + 'px';
    }

    // function sizeHeightPercentage(el, val) {
    //   el.style.height = val + '%';
    // }
  },

  // Fires when the element was removed from the document
  detached: function() {},

  // Fires when an attribute was added, removed, or updated
  attributeChanged: function(attr, oldVal, newVal) {}
});