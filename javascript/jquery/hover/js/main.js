$(function () {
  var $duration = 300;
  var $images = $('#images p');

  //첫번째 캡션, span animate 메서드
  //선택자.animate({속성: 값, 속성: 값}, 시간, 이징, 다른할일);

  $images.filter(':nth-child(1)').mouseover(function () {
    $(this).find('span , strong').stop().animate({ opacity: 1 }, $duration);
  }).mouseout(function () {
    $(this).find('span, strong').stop().animate({ opacity: 0 });
  });

  $images.filter(':nth-child(2)').mouseover(function () {
    $(this).find('span').stop().animate({opacity: 1}, $duration);
    $(this).find('strong').stop().animate({ opacity: 1, left: 0}, $duration);
  }).mouseout(function () {
    $(this).find('span').stop().animate({opacity: 0}, $duration);
    $(this).find('strong').stop().animate({opacity: 0,  left: '-200%'}, $duration);
  });

  $images.filter(':nth-child(3)').mouseover(function () {
    $(this).find('span').stop().animate({opacity: 1}, $duration);
    $(this).find('strong').stop().animate({bottom: 0}, $duration);
    $(this).find('img').stop().animate({top: '-40px'}, $duration);
  }).mouseout(function () {
    $(this).find('span').stop().animate({opacity: 1}, $duration);
    $(this).find('strong').stop().animate({bottom: '-80px'}, $duration);
    $(this).find('img').stop().animate({top: '0px'}, $duration);
  });
});