$(function() {
  var $menu = $('.page-main aside');
  var $button = $menu.find('button');
  var $duration = 300;
  var $buttonSrc = $button.find('img').attr('src');
  var $closeBtn = 'img/btn_close.png';

  $button.on('click', function () {
    $menu.toggleClass('open');
    if ($menu.hasClass('open')) {
      $(this).find('img').attr('src', $closeBtn);
    } else {
      $(this).find('img').attr('src', $buttonSrc);
    }
  })
});