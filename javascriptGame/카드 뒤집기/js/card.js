var row = 4;
var col = 3;

function cardSetting(row, col) {
  for (var i =0; i < row * col; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    document.body.appendChild(card);
  }
}

cardSetting(row, col);