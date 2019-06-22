var tbody = document.querySelector('#table tbody');
var dataset = [];

document.querySelector('#exec').addEventListener('click',function() {
  tbody.innerHTML = ''; //내부 초기화
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);

  //지뢰 위치 뽑기
  var box = Array(hor *ver)
            .fill()
            .map(function(요소, 인덱스) {
              return 인덱스;
            })

  var landMine = [];

  while( box.length > 80) {
    var selected = box.splice(Math.floor(Math.random() * box.length), 1)[0];
    landMine.push(selected);
  }

  console.log(landMine);

  //지뢰 테이블 만들기
  for (var i =0; i < ver; i++) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j =0; j < hor; j++) {
      arr.push('-');
      var td = document.createElement('td');
      td.addEventListener('contextmenu',function(e) {
        e.preventDefault();
        var parent = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var cannes = Array.prototype.indexOf.call(parent.children , e.currentTarget);
        var line = Array.prototype.indexOf.call(parentTbody.children , parent);
        if (e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X') {
          e.currentTarget.textContent = '♣';
        } else if (e.currentTarget.textContent === '♣') {
          e.currentTarget.textContent = '?';
        } else if (e.currentTarget.textContent === '?') {
          e.currentTarget.textContent = '';
          if (dataset[line][cannes] === 1) {
            e.currentTarget.textContent = '';
          } else if (dataset[line][cannes] === 'X') {
            e.currentTarget.textContent = 'X';
          }
        }
      });
      td.addEventListener('click', function(e) {
        //클릭했을 때 주변 지뢰 개수
        var parent = e.currentTarget.parentNode;
        var parentTbody = e.currentTarget.parentNode.parentNode;
        var cannes = Array.prototype.indexOf.call(parent.children , e.currentTarget);
        var line = Array.prototype.indexOf.call(parentTbody.children , parent);
        if (dataset[line][cannes] === 'X') {
          e.currentTarget.textContent = '펑';
        } else {
          //여기 어려벙.... ㅠㅠ 이해안감
          var side = [
            dataset[line ][cannes -1], dataset[line][cannes + 1]
          ];
          if (dataset[line -1]) {
            side = side.concat(dataset[line - 1][cannes -1], dataset[line - 1][cannes], dataset[line - 1][cannes + 1]);
          }
          if (dataset[line + 1]) {
            side = side.concat(dataset[line + 1][cannes -1], dataset[line + 1][cannes], dataset[line + 1][cannes + 1])
          }
          e.currentTarget.textContent = side.filter(function(v) {
            return v === 'X'
          }).length;
        }
      })
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  console.log(dataset);

  //지뢰 심기
  for (var k = 0; k < landMine.length; k++) {
    var ver = Math.floor(landMine[k] / 10);
    var hor = landMine[k] % 10;
    console.log(ver, hor);
    tbody.children[ver].children[hor].textContent = 'X';
    dataset[ver][hor] = 'X'
  }
});
























