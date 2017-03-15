di.define('store', [], function() {
  var fn = todoStore,
      state,
      listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action){
    state = fn(state, action);
    listeners.forEach(function(listener){
      listener();
    });
    console.log("state => ", state)
  }

  function subscribe(fn) {
    listeners = listeners.concat(fn);
    return function() {
      listeners = listeners.filter(function(l) {
        return l !== fn
      });
    }
  }

  //dispatch({})

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  }
})
