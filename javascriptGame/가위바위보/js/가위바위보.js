var 컴퓨터의선택 = '0';

//자료구조 , 딕셔너리(맵, 해쉬) - 일반 객체랑은 똑같음요~~~
var 가위바위보 = {
  가위: '-248px',
  보: '-538px',
  바위: '0'
}

setInterval(function() {
  if (컴퓨터의선택 === 가위바위보.바위) {
    컴퓨터의선택 = 가위바위보.가위;
  } else if (컴퓨터의선택 === 가위바위보.가위) {
    컴퓨터의선택 = 가위바위보.보;
  } else {
    컴퓨터의선택 = 가위바위보.바위;
  }

  document.querySelector('#computer').style.background = 'url(game.jpeg)' + 컴퓨터의선택 + ' 0';
},1000)

// for (var i =0; i < document.querySelectorAll('.btn'); i+= 1) {
//   document.querySelectorAll('.btn')[i].addEventListener('click', function() {
//     console.log(this.textContent);
//   });
// };

document.querySelectorAll('.btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var 나의선택 = this.textContent
    console.log(나의선택, 컴퓨터의선택);
  })
})