$(function () {
  $('#typo .inner').click(function () {
    //선택자.animate({속상: 값, 속성: 값}, 시간, 이징, 다른할일)
    //할일은 function(){} 요래 적어줌
    $(this).animate({
      opacity: 0,
      fontSize: 0
    }, 1500, 'easeInOutElastic', function () {
        $(this).animate({
          opacity: 1,
          fontSize: '110px'
        })
    });
  })
})