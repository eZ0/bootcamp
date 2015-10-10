var todoRepo = (function(){

      // 'use strict'

      var todos = [];

      function init(){
            todos = util.store('todos-jquery');
      }

      function getList(filter){
            if (filter == 'active') {
                  return _getActiveTodos();
            }

            if (filter == 'completed') {
                  return _getCompletedTodos();
            }

            // return all todos
            return todos;
      }

      function store(){
           util.store('todos-jquery', todos);
      }

      function add(title){
            todos.push({
                  id: util.uuid(),
                  title: title,
                  completed: false
            });
      }

      function get(id){
            // underscore
            var i = todos.length;
            while (i--) {
                  if (todos[i].id === id) {
                        console.log(i);
                        return todos[i];
                  }
            }
      }

      function remove(id){
            var i = todos.length;
            while (i--) {
                  if (todos[i].id === id) {
                        todos.splice(i, 1);
                  }
            }
      }

      function count(param){
            var todoCount = todos.length;
            var activeTodoCount = _getActiveTodos().length;

            if (param == 'active') {
                  return activeTodoCount;
            }
            return todoCount;
      }

      function deleteCompleted(){
            todos = _getActiveTodos();
      }

      function _getActiveTodos() {
            return todos.filter(function (todo) {
                  return !todo.completed;
            });
      }
      function _getCompletedTodos() {
            return todos.filter(function (todo) {
                  return todo.completed;
            });
      }


      return {
            init: init,
            add: add,
            getList: getList,
            store: store,
            remove: remove,
            get: get,
            count: count,
            deleteCompleted: deleteCompleted
      }


})();
