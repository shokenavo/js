let todo_array = [];


function show() {
  let todoHTML = '';

  todo_array.forEach((i, j) => {
    let html = `
          <div>${i.name}</div>
          <div>${i.due_time}</div>
          <button class="delete-button js-delete-button">DELETE</button>`;
    todoHTML += html;
  })

  document.querySelector('.div-class').innerHTML = todoHTML;

  document.querySelectorAll('.js-delete-button')
    .forEach((i, j) => {
      i.addEventListener('click', () => {
        todo_array.splice(j, 1);
        show();
      })
    })
}

document.querySelector('.js-add-button').addEventListener('click', () => {
  adding();
})
function adding() {
  let name = document.querySelector('.input-todo');
  let due_time = document.querySelector('.due_time_input');
  let todo_items = { name: name.value, due_time: due_time.value };
  todo_array.push(todo_items);

  name.value = '';
  due_time.value = '';
  show();


}