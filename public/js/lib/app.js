di.define('app', ['store', 'render'], function(store, render){
  var todoInput = '_js-todo-name',
      addTodoBtn = '_js-add-todo'

  function addTodo() {
    let todoEl = document.getElementById(todoInput),
        todoName = todoEl.value
    if(!!todoName) {
      store.dispatch({type: 'ADD', name: todoName})
      todoEl.value = ""
      todoEl.focus()
    }
  }
  return {
    init: function() {
      store.subscribe(render.printHTML(document.getElementById('_js-todo-list')))

      document.getElementById(todoInput).focus();
      
      document.getElementById(addTodoBtn).addEventListener('click', addTodo);
      document.getElementById(todoInput).addEventListener('keydown', function(e){
        if(e.keyCode == 13){
          e.preventDefault();
          addTodo()
        }
      });

      document.getElementById('_js-todo-list').addEventListener('click', function(e) {
        if(e.target && e.target.matches("a._jq-delete-todo")) {
          var todo = e.target.parentNode.dataset.name
          store.dispatch({type: 'DELETE', name: todo})
        }

        if(e.target && e.target.matches("a._jq-update-todo")) {
          var todo = e.target.parentNode.dataset.name
          store.dispatch({type: 'UPDATE', name: todo})
        }
      });
    }
  }
});
