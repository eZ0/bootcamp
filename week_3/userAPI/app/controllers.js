(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('UserController', UserController);

    function UserController($scope, userService){

        $scope.users = [];
        $scope.sortOrder = false;
        $scope.isDeleted = false;

        $scope.sort = function(name) {
            $scope.sortColumn = name;
            $scope.sortOrder = !$scope.sortOrder;
        };

        userService.getUsers()
            .then(function(response) {
                $scope.users = response.data;
            });


        $scope.deleteUser = function(user){
            console.log(user);

            userService.deleteUser(user.id)
                .then(function(deletedUser){
                    console.log(deletedUser);
                    $scope.users = _.without($scope.users, user);
                });

            //userService.deleteUser(id)
            //    .then(function(user){
            //        console.log(user);
            //        return userService.getUsers();
            //    })
            //    .then(function(){
            //        $scope.users = response.data;
            //    });

        };

    }

})();
