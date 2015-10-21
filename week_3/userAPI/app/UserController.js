(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('UserController', UserController);

    function UserController(userService, $filter, users){

        var vm = this;

        // create an array
        vm.users = [];
        vm.sortOrder = false;
        vm.text = '<italic>hello world</italic>';

        activate();

        /////////

        vm.sort = function(name){
            vm.sortColumn = name;
            vm.sortOrder = ! vm.sortOrder;
        };

        function activate() {

            vm.users = users;
            //var gmailFilter = $filter('filterGmail');

            //userService.getUsers()
            //    .then(function (users) {
            //        //vm.users = response.data;
            //        var filteredUsers =  gmailFilter(users);
            //        vm.users = filteredUsers;
            //    })
            //    .catch(function(err){
            //        return err;
            //    });
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
