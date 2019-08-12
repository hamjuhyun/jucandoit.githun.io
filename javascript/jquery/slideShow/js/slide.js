$(function () {
  var $slideWrap = $('.slideWrap');
  var $slide = $slideWrap.find('.slideshow > li');
  var $slideCount = $slide.length;
  var currentIndex = 0;

  $slide.eq(currentIndex).fadeIn();

  var timer = setInterval(slideShow, 5000);

  function slideShow() {
    var nextIndex = (currentIndex + 1) % $slideCount;
    $slide.eq(currentIndex).fadeOut();
    $slide.eq(nextIndex).fadeIn();
    currentIndex = nextIndex;
  };

  $slide.mouseover(function () {
    clearInterval(timer);
  }).mouseout(function () {
    setInterval(slideShow, 5000);
  });
});