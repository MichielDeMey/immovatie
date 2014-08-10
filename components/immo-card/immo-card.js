Polymer('immo-card', {

  TRANSITIONEND_STRING: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',

  isEmpty: _.isEmpty,

  isFull: false,

  isInTransition: false,

  $ghost: undefined,

  openCard: function() {
    if (this.isFull || this.isInTransition) return;
    this.isInTransition = true;

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
    }).addClass('modal');

    self.$ghost = $('<div class="immo-card--ghost">');
    self.$ghost.insertAfter($self);
    
    var windowWidth = $(window).width();
    var fullWidth = 800;

    var deltaX = ((windowWidth / 2) - cardRect.left) - fullWidth / 2;
    var deltaY = (($(window).height() / 2) - cardRect.top) - cardRect.height / 2;
    
    function setFinalState() {
      $self
        .addClass('open')
        .css({
          left          : '',
          top           : '',
          transform     : '',
          'margin-left' : '-' + (fullWidth / 2) + 'px'
        });

      self.isFull = true;
      self.isInTransition = false;
    }
    
    function sizeWidth(el, val) {
      el.width(val);
    }

    function translate(el, valX, valY) {
      el.css('transform', 'translate(' + valX + 'px, ' + valY + 'px)');
    }

    var spring = window.springSystem.createSpring(40, 7.5);
    spring.setOvershootClampingEnabled(false);
    spring.addListener({
      onSpringUpdate: function(spring) {
        var curVal = spring.getCurrentValue();

        var val = rebound.MathUtil
                     .mapValueInRange(curVal, 0, 1, cardRect.width, 800);

        var valX = rebound.MathUtil
                     .mapValueInRange(curVal, 0, 1, 0, deltaX);

        var valY = rebound.MathUtil
                     .mapValueInRange(curVal, 0, 1, 0, deltaY);
        
        sizeWidth($self, val);
        translate($self, valX, valY);
      },
      onSpringAtRest: function(spring) {
        setFinalState();
      }
    });

    spring.setEndValue(1);
  },

  closeCard: function () {
    if (!this.isFull || this.isInTransition) return;
    this.isInTransition = true;

    var self = this;
    var $self = $(self);

    this.fire('core-signal', {
      name: 'overlay',
      data: {
        show: false
      }
    });

    function setFinalState() {
      $self
        .removeClass('modal open')
        .css({
          transform     : '',
          'margin-left' : ''
        });
      self.$ghost.remove();

      self.isFull = false;
      self.isInTransition = false;
    }

    var ghostRect = self.$ghost[0].getBoundingClientRect();
    var cardRect = self.getBoundingClientRect();

    var deltaX = ghostRect.left - cardRect.left;
    var deltaY = ghostRect.top - cardRect.top;

    function sizeWidth(el, val) {
      el.width(val);
    }

    function translate(el, valX, valY) {
      el.css('transform', 'translate(' + valX + 'px, ' + valY + 'px)');
    }

    var spring = window.springSystem.createSpring(40, 10);
    spring.addListener({
      onSpringUpdate: function(spring) {
        var curVal = spring.getCurrentValue();

        var val = rebound.MathUtil
                     .mapValueInRange(curVal, 0, 1, 800, 240);

        var valX = rebound.MathUtil
                     .mapValueInRange(curVal, 0, 1, 0, deltaX);

        var valY = rebound.MathUtil
                     .mapValueInRange(curVal, 0, 1, 0, deltaY);
        
        sizeWidth($self, val);
        translate($self, valX, valY);
      },
      onSpringAtRest: function(spring) {
        setFinalState();
      }
    });

    spring.setEndValue(1);
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

    $(self.$.image).on('click', function() {
      if (!self.isFull) {
        self.openCard();
      } else {
        self.closeCard();
      }
    });

    function sizeWidth(el, val) {
      el.style.width = val + 'px';
    }
  },

  // Fires when the element was removed from the document
  detached: function() {},

  // Fires when an attribute was added, removed, or updated
  attributeChanged: function(attr, oldVal, newVal) {}
});