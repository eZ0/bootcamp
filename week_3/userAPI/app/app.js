(function(angular){

    'use strict';

    angular
        .module('userApp', [
            'ui.bootstrap',
            'toaster',
            'ngAnimate',
            'ngResource',
            'ngSanitize',
            'ngMessages',
            'ui.router'
        ])
        .factory('_', function($window){
            return $window._;
        })
        .factory('UserResource', ['$resource', function($resource){

            var resource = $resource('/api/users/:id',
                                {id: '@id'},
                { update: {method:'PUT'} }
            );

            return resource;
        }])
        .constant('config', {
            "baseURL" : '/api/'
        })
        .config(['userServiceProvider',function(userServiceProvider){
            userServiceProvider.setBaseURL('/api/');
        }])
        .config(['$httpProvider',function($httpProvider){
            //$httpProvider.interceptors.push('httpLogInterceptor');
            //$httpProvider.interceptors.push('httpHeaderInterceptor');
            $httpProvider.interceptors.push('httpErrorInterceptor');
        }])
        .factory('httpLogInterceptor', function(){
            return {
                //elke http call die bij get passeert
                request: function(request){
                    console.log(request.url);
                    return request;
                }
            }
        })
        .factory('httpHeaderInterceptor', function(){
            return {
                request: function(request){
                    request.headers.Authorization = 'Ksenia';
                    return request;
                }
            }
        })
        .factory('httpErrorInterceptor',['$q', 'toaster', function($q, toaster){
            return {
                request: function(request){
                    toaster.pop('success', "Great Success!", request.url);
                    return request;
                },
                responseError: function(response){
                    toaster.pop('error', "Oopsy!", response.status);
                    return $q.reject(response);
                }
            }
        }])
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
            $stateProvider
                .state('alert',{
                    url: '/alert',
                    templateUrl: 'views/alert.html',
                    controller: 'AlertController',
                    controllerAs: 'vm'
                })
                .state('index',{
                    url: '/index',
                    templateUrl: 'views/list.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    resolve: {
                        users: function(userService){
                            return userService.getUsers();
                        }
                    }
                })
                .state('add',{
                    url: '/add',
                    templateUrl: 'views/edit.html',
                    controller: 'EditController',
                    controllerAs: 'vm'
                })
                .state('edit',{
                    url: '/edit/:userId?',
                    templateUrl: 'views/edit.html',
                    controller: 'EditController',
                    controllerAs: 'vm'
                });

            $urlRouterProvider.otherwise('index');

        }]);


})(angular);
