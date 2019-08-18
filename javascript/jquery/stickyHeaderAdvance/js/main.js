$(function () {
  var $window = $(window);
  var $header = $('.page-header');
  var $headerClone = $header.contents().clone();
  var $headerCloneContainer = $('<div class="page-header-clone"></div>');
  var $threshold = $header.offset().top + $header.outerHeight();

  $headerClone.appendTo($headerCloneContainer);
  $headerCloneContainer.appendTo('body');

  $window.scroll(function () {
    if ($(this).scrollTop() >= $threshold) {
      $headerCloneContainer.addClass('visible');
    } else {
      $headerCloneContainer.removeClass('visible');
    }
  });
});
