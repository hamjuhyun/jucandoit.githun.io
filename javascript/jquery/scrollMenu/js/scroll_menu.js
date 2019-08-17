$(function () {
  var win = $(window);
  var $list = $('.list li');
  var $content = $('#contents > div');

  $list.on('click', 'a', function (e) {
    e.preventDefault();
    var $this = $(this)
    var $parent = $this.parent();
    var index = $parent.index();
    var section = $content.eq(index);
    var sectionDistance = section.offset().top;
    $('html, body').animate({ scrollTop: sectionDistance });
  });

  win.on('scroll', function () {
    $content.each(function () {
      if ($(this).offset().top <= win.scrollTop()) {
        var idx = $(this).index();
        $list.eq(idx).addClass('on').siblings().removeClass('on');
      }
    });
  })
});


