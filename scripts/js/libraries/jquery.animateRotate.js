//rotation animation jquery plugin as seen at: http://stackoverflow.com/questions/15191058/css-rotation-cross-browser-with-jquery-animate
$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };
    $({deg: 0}).animate({deg: angle}, args);
  });
};