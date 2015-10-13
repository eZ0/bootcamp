var todoRepo = (function(){

      // 'use strict'

      //var todos = [];

      function init(){
            //todos = util.store('todos-jquery');
      }

      // function getList(filter){

      //       if (filter == 'active') {
      //             return _getActiveTodos();
      //       }

      //       if (filter == 'completed') {
      //             return _getCompletedTodos();
      //       }

      //       // return all todos
      //       return todos;
      // }
        function getList(filter, callback){
            $.get( "http://localhost:4040/api/tasks", function(data){
                if (filter === 'all') {
                        callback(data);
                }
                if (filter === 'active') {
                        var filterdata = _getActiveTodos(data);
                        callback(filterdata);
                }
                if (filter === 'completed') {
                        var filterdata = _getCompletedTodos(data);
                        callback(filterdata);
                }
            });

        }

      function store(){
           // util.store('todos-jquery', todos);
      }

      function add(title, callback){

        $.ajax({
           url: 'http://localhost:4040/api/tasks',
           type: 'POST',
           data: JSON.stringify({
               title: title,
               completed: false
           }),
           dataType: 'json',
           contentType: 'application/json',
           success: function(result) {
               callback();
           }
       });

      }

      function get(id, callback){
            // underscore
            // var i = todos.length;
            // while (i--) {
            //       if (todos[i].id === id) {
            //             console.log(i);
            //             return todos[i];
            //       }
            // }
            var url = "http://localhost:4040/api/tasks/" + id;
            $.get(url, function(data) {
                callback(data);
            });
      }

      function remove(id, callback){

            $.ajax( { url: "http://localhost:4040/api/tasks/" + id,
                        method: 'delete', success: function(){
                            callback();
                        }
                } );
      }

      function save(todo, callback){
        $.ajax({
           url: 'http://localhost:4040/api/tasks/' + todo.id,
           type: 'PUT',
           data: JSON.stringify(todo),
           dataType: 'json',
           contentType: 'application/json',
           success: function(data) {
               callback(data);
           }
       });
      };

      // function count(param){
      //       var todoCount = todos.length;
      //       var activeTodoCount = _getActiveTodos().length;

      //       if (param == 'active') {
      //             return activeTodoCount;
      //       }
      //       return todoCount;
      // }

      function deleteCompleted(){
            todos = _getActiveTodos();
      }

      function _getActiveTodos(todos) {
            return todos.filter(function (todo) {
                  return !todo.completed;
            });
      }
      function _getCompletedTodos(todos) {
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
            // count: count,
            deleteCompleted: deleteCompleted,
            save: save
      }


})();
