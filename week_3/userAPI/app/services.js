(function(){
    'use strict';

    angular
        .module('userApp')
        .provider('userService', userServiceProvider);


        function userServiceProvider(){
            var baseURL;
            this.setBaseURL = function(url){
                baseURL = url;
            };

            //factory
            this.$get = function userService($http, UserResource){

                //var UserResource = $resource('/api/users/:id', {id: '@id'});

                function getUsers(){

                    return UserResource.query().$promise
                        .then(function (users) {
                                    return users;
                                });

                    //return $http.get(baseURL + 'users')
                    //    .then(function (response) {
                    //        return response.data;
                    //    })
                }

                function deleteUser(user){

                    return UserResource.remove(user).$promise;

                    //return $http.delete(baseURL + 'users/'+ user.id);
                }

                return {
                    getUsers: getUsers,
                    deleteUser: deleteUser
                }
            }
        }

        //.service('userService', userService);
        //
        //function userService($http, config){
        //
        //    this.getUsers = function(){
        //        return $http.get(config.baseURL + 'users')
        //            .then(function (response) {
        //                return response.data;
        //            })
        //    };
        //
        //    this.deleteUser = function(user){
        //        return $http.delete(config.baseURL + 'users/'+user.id);
        //    };
        //
        //
        //}

        //.factory('userService', userService);
        //function userService($http){
        //
        //    function getUsers(){
        //       return $http.get(config.baseURL + 'users')
        //                   .then(function (response) {
        //                       return response.data;
        //                   })
        //    }
        //
        //    function deleteUser(id){
        //        return $http.delete('/api/users/'+id);
        //    }
        //
        //
        //    return {
        //        getUsers: getUsers,
        //        deleteUser: deleteUser
        //    }
        //}

})();
