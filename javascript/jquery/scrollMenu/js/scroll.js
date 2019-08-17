$(function () {
  var $window = $(window);
  var $list = $('.list li');
  var $contents = $('#contents > div');

  $list.on('click', 'a', function (e) {
    e.preventDefault();
    var pa = $(this).parent();
    var idx = pa.index();
    var $section = $contents.eq(idx);
    var $sectionDistance = $section.offset().top;
    $('html, body').animate({scrollTop: $sectionDistance });
  });

  $window.on('scroll', function () {
    $contents.each(function () {
      if ($window.scrollTop() >= $(this).offset().top) {
        var idx = $(this).index();
        $list.eq(idx).addClass('on').siblings().removeClass('on');
      }
    });
  });
});


