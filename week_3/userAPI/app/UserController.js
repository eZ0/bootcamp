(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('UserController', UserController);

    function UserController(userService){

        var vm = this;

        // create an array
        vm.users = [];
        vm.sortOrder = false;

        activate();

        /////////

        vm.sort = function(name){
            vm.sortColumn = name;
            vm.sortOrder = ! vm.sortOrder;
        };

        function activate() {
            userService.getUsers()
                .then(function (users) {
                    //vm.users = response.data;
                    vm.users = users;
                })
                .catch(function(err){
                    return err;
                });
        }
        vm.deleteUser = function(user) {

            userService.deleteUser(user)
                .then(function () {
                    activate();
                })
                .then(function (users) {
                    vm.users = users;
                });
        }
    }


})();
