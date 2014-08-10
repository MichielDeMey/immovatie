Polymer('immo-overlay', {

  TRANSITIONEND_STRING: 'webkitTransitionEnd transitionend MSTransitionEnd oTransitionEnd',

  isShown: false,

  overlaySignal: function(event, data, sender) {

    var self = this;
    var $self = $(this);

    if (data.show && !self.isShown) {
      self.isShown = true;

      $self.addClass('active');
      setTimeout(function() {
        $self.addClass('open');
      }, 0);

      // Add click eventhandler
      if (data.onClick) {
        // Clear previous click handler if any
        $self.off('click');
        $self.on('click', function() {
          if (data.bind)
            data.onClick.apply(data.bind);
          else
            data.onClick();
        });
      }
    }
    else if (!data.show && self.isShown) {
      $self.on(self.TRANSITIONEND_STRING, function () {
        $self.removeClass('active');
        // Remove ALL listeners
        $self.off();
      });

      $self.removeClass('open');

      self.isShown = false;
    }

  }

});