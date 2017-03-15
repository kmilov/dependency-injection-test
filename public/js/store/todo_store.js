// Immutable State to store the TODOs
function todoStore(state, action) {
  let st = state || []
  switch(action.type) {
    case "ADD":
      if(st.findIndex((todo) => todo.name === action.name) !== -1) {
        return st;
      }
      return st.concat({
        name: action.name,
        read: false
      })
    case "DELETE":
      return st.filter(function(todo){
        return todo.name !== action.name
      });
    case "UPDATE":
      return st.map((item) => {
        if(item.name !== action.name) {
          return item
        }
        return {
          name: item.name,
          read: !item.read
        }
      })

    default:
     return state;
 }
}
