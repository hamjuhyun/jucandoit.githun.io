$(function () {
  var container = $('.slideshow');
  var slideGroup = container.find('.slideshow_slides');
  var slides = slideGroup.find('a');
  var slideCount = slides.length;
  var slideNav = container.find('.slide_nav');
  var indicator = container.find('.indicator');
  var indicatorHtml = '';
  var currentIndex = 0;
  var easing = 'easeInOutExpo';
  var duration = 500;
  var interval = 3500;
  var timer;

  slides.each(function (idx) {
    var newLeft = idx * 100 + '%'
    $(this).css({ left: newLeft });

    indicatorHtml += '<a href="#">' + (idx + 1) + '</a>'
  });

  indicator.html(indicatorHtml);

  function goToSlide(index) {
    slideGroup.animate({ left: -100 * index + '%' }, duration, easing);
    currentIndex = index;
    navUpdate();
  }

  function navUpdate() {
    var navPrev = slideNav.find('.prev');
    var navNext = slideNav.find('.next');

    if (currentIndex === 0) {
      navPrev.addClass('disabled');
    } else {
      navPrev.removeClass('disabled');
    }

    if (currentIndex === slideCount - 1) {
      navNext.addClass('disabled');
    } else {
      navNext.removeClass('disabled');
    }

    // indicator.find('a').removeClass('active');
    // indicator.find('a').eq(currentIndex).addClass('active');

    indicator.find('a').eq(currentIndex).addClass('active').siblings().removeClass('active');
  }

  function startTimer() {
    timer = setInterval(function () {
      var nextIndex = (currentIndex + 1) % slideCount;
      goToSlide(nextIndex);
    },interval);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  indicator.find('a').click(function (e) {
    e.preventDefault();
    var idx = $(this).index();

    goToSlide(idx);
  });

  slideNav.find('a').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('prev')) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex + 1);
    }
  });

  container.mouseenter(function () {
    stopTimer();
  }).mouseleave(function () {
    startTimer();
  })

  navUpdate();
  startTimer();
});
