$(function () {
  var $header = $('.page-header');
  var headerOffsetTop = $header.offset().top;
  var $window = $(window);

  $window.on('scroll', function () {
    if ($(this).scrollTop() >= headerOffsetTop) {
      $header.addClass('sticky');
    } else {
      $header.removeClass('sticky');
    }
  });
});
