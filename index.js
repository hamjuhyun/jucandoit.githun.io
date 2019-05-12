const _ = require('ladash');

const numbers = [33, 46, 76, 44, 32, 3];

_.each(numbers, function(number, i) {
  console.log(number);
});