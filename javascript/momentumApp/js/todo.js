const todoForm = document.querySelector('.todoForm');
const todoInput = form.querySelector('input');
const todoList = document.querySelector('.todoList');

const TODOS_LS = 'toDos';

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = todoInput.value;
}

function loadTodos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {

  }
}

function init() {
  loadTodos();
  todoForm.addEventListener('submit', handleSubmit);
}

init();
