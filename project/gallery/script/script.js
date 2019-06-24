//변수지정
var slideWrapper = document.getElementsByClassName('container');
var slideContainter = document.getElementsByClassName('slider-container');
var slides = document.getElementsByClassName('slide');;
var slideCount = slides.length;
var currentIndex = 0;
var topHeight = 0;
var navPrev = document.getElementById('prev');
var navNext = document.getElementById('next');

//슬라이드 높이 확인하여 부모의 높이로 지정하기
function calculateTallestSlide() {
  for (var i = 0; i < slideCount; i++) {
    if (topHeight < slides[i].offsetHeight) {
      topHeight = slides[i].offsetHeight;
    }
  }

  slideWrapper[0].style.height = topHeight + 'px';
  slideContainter[0].style.height = topHeight + 'px';
}

calculateTallestSlide();

//슬라이드가 있으면 가로로 배열하기
for (var i =0; i <slideCount; i++) {
  slides[i].style.left = ( i * 100) + '%';
}

//슬라이드 이동 함수
function goToSlide(idx) {
  slideContainter[0].style.left = (idx * -100) + '%';
  slideContainter[0].classList.add('animated');
  currentIndex = idx;

  // updateNav();
}

//버튼기능 업데이트 함수
function updateNav() {
  //처음일때
  if (currentIndex == 0) {
    navPrev.classList.add('disabled');
  } else {
    navPrev.classList.remove('disabled');
  }

  //마지막일때
  if (currentIndex === slideCount - 1) {
    navNext.classList.add('disabled');
  } else {
    navNext.classList.remove('disabled');
  }
}

//버튼을 클릭하면 슬라이드 이동시키기
navPrev.addEventListener('click', function(event) {
  event.preventDefault();
  //처음이 아니라면
  if (currentIndex !== 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(slideCount - 1);
  }
});

navNext.addEventListener('click', function(event) {
  event.preventDefault();
  // goToSlide(currentIndex + 1); 마지막이 아니라면
  if (currentIndex !== slideCount - 1 ) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(0);
  }

});

//첫번째 슬라이드 먼저 보이기
goToSlide(0);