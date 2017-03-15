di.define('render', ['store'], function(store){
  let tDOM = []

  function action(type){ 
    var deleteTodoEl = document.createElement("a")
    deleteTodoEl.className ="TodoListElement-"+type+" _jq-"+type+"-todo"
    deleteTodoEl.setAttribute('title', type+' this todo')
    return deleteTodoEl
  }

  function todoEl(todo){
    var li = document.createElement("LI");
    li.className = "TodoListElement " + ((todo.read) ? 'TodoListElement--through':'' )
    li.appendChild(document.createTextNode(todo.name));
    li.setAttribute('data-name', todo.name)
    li.appendChild(action('update'))
    li.appendChild(action('delete'))
    return li
  }

  return {
    printHTML: function(wrapper) {
      return function(){
        var todos = store.getState()
        todos.forEach(function(todo){
          var todoDOM = wrapper.querySelectorAll("[data-name='"+todo.name+"']");

          if(!todoDOM.length) {
            wrapper.appendChild(todoEl(todo))
            tDOM = tDOM.concat(todo.name)
          }
          else {
            if(todo.read) {
              todoDOM[0].className = "TodoListElement TodoListElement--through"
            }
            else {
              todoDOM[0].className = "TodoListElement"
            }
          }
        })

        tDOM.filter(function(tname){
          index = todos.findIndex((todo) => todo.name === tname)
          if(index === -1)
            return true
          return false
        }).forEach((todo) => {
          wrapper.querySelectorAll("[data-name='"+todo+"']")[0].remove();
          tDOM = tDOM.filter((t) => t !== todo)
        })
      }
    }
  }
})
