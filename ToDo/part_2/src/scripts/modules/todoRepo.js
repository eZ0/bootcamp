var TodoRepo = (function(){

      'use strict'

      class TodoRepo {

            // var todos = [];

            // init(){
            //       todos = util.store('todos-jquery');
            // }

            constructor(){
                  const storeString = 'todos-jquery';
                  this.todos = util.store(this.storeString);
            }

            getList(filter){
                  if (filter == 'active') {
                        return this._getActiveTodos();
                  }

                  if (filter == 'completed') {
                        return this._getCompletedTodos();
                  }

                  // return all todos
                  return this.todos;
            }

            store(){
                  util.store(this.storeString, this.todos);
            }

            add(title){
                  this.todos.push({
                        id: util.uuid(),
                        title: title,
                        completed: false
                  });
            }

            get(id){
                  // underscore
                  var i = this.todos.length;
                  while (i--) {
                        if (this.todos[i].id === id) {
                              return this.todos[i];
                        }
                  }
            }

            remove(id){
                  var i = this.todos.length;
                  while (i--) {
                        if (this.todos[i].id === id) {
                              this.todos.splice(i, 1);
                        }
                  }
            }

            count(param){
                  var todoCount = this.todos.length;
                  var activeTodoCount = this._getActiveTodos().length;

                  if (param == 'active') {
                        return activeTodoCount;
                  }
                  return todoCount;
            }

            deleteCompleted(){
                  this.todos = this._getActiveTodos();
            }

            _getActiveTodos() {
                  return this.todos.filter(function (todo) {
                        return !todo.completed;
                  });
            }
            _getCompletedTodos() {
                  return this.todos.filter(function (todo) {
                        return todo.completed;
                  });
            }


            // return {
            //       init: init,
            //       add: add,
            //       getList: getList,
            //       store: store,
            //       remove: remove,
            //       get: get,
            //       count: count,
            //       deleteCompleted: deleteCompleted
            // }
      }

      return TodoRepo;
})();
