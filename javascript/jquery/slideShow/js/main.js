$(function () {
  var slides = $('.slideshow img');
  var slideCount = slides.length;
  var currentIndex = 0; // 시작값을 알아야함! 0 , 1 , 2, 3, .... 다시 0 요런식

  slides.eq(currentIndex).fadeIn();

  var timer = setInterval(showSlide, 3500);

  function showSlide() {
    var nextIndex = (currentIndex + 1) % slideCount;
    slides.eq(currentIndex).fadeOut();
    slides.eq(nextIndex).fadeIn();
    currentIndex = nextIndex;
  }

  function timerOn() {
    setInterval(showSlide, 3500);
  }

  function timerOff() {
    clearInterval(timer);
  }

  slides.mouseover(function () {
    timerOff();
  })
    .mouseout(function () {
      timerOn();
    })
});
