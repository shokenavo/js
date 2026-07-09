let todo_array = [];
    
    
    function show() {
      let todoHTML = ''
      for (let i = 0; i < todo_array.length; i++) {
        let html = `
          <div>${todo_array[i].name}</div>
          <div>${todo_array[i].due_time}</div>
          <button onclick ="
          todo_array.splice(${i} , 1);
          show();
          ">DELETE</button></div>`;
        todoHTML += html;
      }
      document.querySelector('.div-class').innerHTML = todoHTML;
    }
    function adding() {
      let name = document.querySelector('.input-todo');
      let due_time = document.querySelector('.due_time_input');
      let todo_items = {name : name.value ,due_time : due_time.value};
      todo_array.push(todo_items);

      name.value = '';
      due_time.value='';

      
    }