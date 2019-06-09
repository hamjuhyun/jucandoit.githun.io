'strict mode'

var nav = document.querySelector('.nav');
var navTop = nav.offsetTop;

var scrollFn = function() {
  if(window.pageYOffset > navTop) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
  console.log(window.pageYOffset , navTop);
}

window.addEventListener('scroll', scrollFn);

