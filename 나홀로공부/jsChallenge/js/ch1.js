function reverseString(str) {
  // var reverse = str.split('').reverse().join('');
  // console.log(reverse);

  var newString = '';

  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }

  console.log(newString);
}

reverseString('hello');
reverseString('hamjuhyun');
reverseString('momo');