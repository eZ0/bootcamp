// (function(){
      'use strict'
      var util = require("./util.js");

      class TodoRepo {

            constructor(){
                  const storeString = 'todos-jquery';
                  this.todos = util.store(storeString);
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

      }

    module.exports = new TodoRepo();

//})();
