(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('UserController', UserController);


    UserController.$inject = ['userService', 'users'];
    function UserController(userService, users){

        var vm = this;

        // create an array
        vm.users = [];
        vm.sortOrder = false;
        //vm.text = '<italic>hello world</italic>';

        activate();

        /////////

        vm.sort = function(name){
            vm.sortColumn = name;
            vm.sortOrder = ! vm.sortOrder;
        };

        function activate() {

            vm.users = users;

        }
        vm.deleteUser = function(user) {

            userService.deleteUser(user)
                .then(function () {
                    return userService.getUsers();
                })
                .then(function (users) {
                    vm.users = users;
                });
        }
    }


})();
