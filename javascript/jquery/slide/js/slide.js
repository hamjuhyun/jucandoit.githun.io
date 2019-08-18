$(function () {
  var $slideWrap = $('.slideWrap');
  var $slideGroup = $slideWrap.find('.slides');
  var $slides = $slideWrap.find('.slides li');
  var $slideLength = $slides.length;
  var $slideNav = $slideWrap.find('.slideNav');
  var $indicator = $slideWrap.find('.slideIndigator');
  var $indicatorHtml = '';
  var currentIndex = 0;
  var timer;

  $slides.each(function (idx) {
    var newLeft = idx * 100 + "%";
    $(this).css({ left: newLeft });

    $indicatorHtml += '<a href="#">'+ (idx + 1) +'</a>'
  });

  $indicator.html($indicatorHtml);

  function goToSlide(index) {
    $slideGroup.animate({ left: index * -100 + "%" }, 500);
    currentIndex = index;

    updateNav();
  }

  function updateNav() {
    var prevBtn = $slideNav.find('.prev');
    var nextBtn = $slideNav.find('.next');

    if (currentIndex === 0) {
      prevBtn.addClass('disabled');
    } else {
      prevBtn.removeClass('disabled');
    }

    if (currentIndex === $slideLength - 1) {
      nextBtn.addClass('disabled');
    } else {
      nextBtn.removeClass('disabled');
    }

    $indicator.find('a').eq(currentIndex).addClass('on').siblings().removeClass('on');
  }

  function startSlide() {
    timer = setInterval(function () {
      var nextIndex = (currentIndex + 1) % $slideLength;
      goToSlide(nextIndex);
    }, 5000);
  }

  function stopSlide() {
    clearInterval(timer);
  }

  $indicator.on('click', 'a', function () {
    var idx = $(this).index();

    goToSlide(idx);
  });

  $slideNav.on('click', 'a', function () {
    if ($(this).hasClass('prev')) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex + 1);
    }
  });

  $slides.mouseenter(function() {
    stopSlide();
  }).mouseleave(function () {
    startSlide();
  })

  updateNav();
  startSlide();
});