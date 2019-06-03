var 후보군 = Array(45).fill().map(function(요소, 인덱스) {
  return 인덱스 + 1;
});

// console.log(후보군);

var 셔플 = [];
while(후보군.length > 0) {
  var 이동값 = 후보군.splice(Math.floor(Math.random() * 후보군.length), 1)[0];
  셔플.push(이동값);
}

// console.log(셔플);

var 보너스 = 셔플[셔플.length - 1];
var 당첨숫자들 = 셔플
                .slice(0, 6)
                .sort(function(a, b) {
                  return a - b;
                });

console.log('당첨숫자들', 당첨숫자들, '보너스', 보너스);

// for (var i = 0; i < 당첨숫자들.length; i++) {
//   setTimeout(function 비동기콜백함수() {
//     var 공 = document.createElement('div');
//     공.textContent = 당첨숫자들[i];
//     결과창.appendChild(공);
//   }, 1000);
// }   //클로저문제

var 결과창 = document.getElementById('결과창');

function 공색칠하기(숫자, 결과창, 색) {
  var 공 = document.createElement('div');
  공.textContent = 숫자;
  공.style.display = 'inline-block';
  공.style.boxShadow = '2px 5px 3px rgba(0, 0, 0, .3)';
  공.style.borderRadius = '50%';
  공.style.width = '50px';
  공.style.height = '50px';
  공.style.textAlign = 'center';
  공.style.fontSize = '30px';
  공.style.color = '#f3f3f3';
  공.style.fontWeight = 'bold';
  공.style.textShadow = '3px';
  공.className = '공아이디' + 숫자
  var 배경색;
  if(숫자 <= 10) {
    배경색 = 'red';
  } else if (숫자 <= 20) {
    배경색 = 'orange';
  } else if (숫자 <= 30) {
    배경색 = '#d2d218';
  } else if (숫자 <= 40) {
    배경색 = 'green';
  } else if (숫자 <= 50) {
    배경색 = 'blue';
  }

  공.style.background = 배경색;
  결과창.appendChild(공);
}

setTimeout(function 비동기콜백함수() {
  공색칠하기(당첨숫자들[0], 결과창);
}, 1000);

setTimeout(function 비동기콜백함수() {
  공색칠하기(당첨숫자들[1], 결과창);
}, 2000);

setTimeout(function 비동기콜백함수() {
  공색칠하기(당첨숫자들[2], 결과창);
}, 3000);

setTimeout(function 비동기콜백함수() {
  공색칠하기(당첨숫자들[3], 결과창);
}, 4000);

setTimeout(function 비동기콜백함수() {
  공색칠하기(당첨숫자들[4], 결과창);
}, 5000);

setTimeout(function 비동기콜백함수() {
  공색칠하기(당첨숫자들[5], 결과창);
}, 6000);

setTimeout(function 비동기콜백함수() {
  var 칸 = document.getElementsByClassName('보너스')[0];
  공색칠하기(보너스, 칸)
}, 7000);