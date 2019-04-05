const form = document.querySelector('form');
const input = form.querySelector('input');
const greeting = document.querySelector('.greetings');

const USER_LS = "currentUser";
const CLASS_SHOW = "showing"

function savedName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  printGreeting(currentValue);
  savedName(currentValue);
}

function askForName() {
  form.classList.add(CLASS_SHOW);
  form.addEventListener('submit', handleSubmit);
}

function printGreeting(text) {
  form.classList.remove(CLASS_SHOW);
  greeting.classList.add(CLASS_SHOW);
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    printGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();