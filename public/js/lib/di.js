// Simple DI implementation
var di = (function(){
  var modules = {};
  return {
    define: function(name, deps, fn) {
      for (var i = 0; i < deps.length; i++) {
        deps[i] = modules[deps[i]]
      }
      modules[name] = fn.apply(fn, deps)
    },
    get: function(name) {
      return modules[name]
    }
  }
})()
