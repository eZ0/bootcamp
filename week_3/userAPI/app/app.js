(function(angular){

    'use strict';

    angular
        .module('userApp', [
            'ui.bootstrap',
            'toaster',
            'ngAnimate',
            'ngResource',
            'ngSanitize',
            'ngRoute'
        ])
        .factory('_', function($window){
            return $window._;
        })
        .factory('UserResource', function($resource){
            return $resource('/api/users/:id', {id: '@id'});
        })
        .constant('config', {
            "baseURL" : '/api/'
        })
        .config(function(userServiceProvider){
            userServiceProvider.setBaseURL('/api/');
        })
        .config(function($httpProvider){
            //$httpProvider.interceptors.push('httpLogInterceptor');
            //$httpProvider.interceptors.push('httpHeaderInterceptor');
            $httpProvider.interceptors.push('httpErrorInterceptor');
        })
        .factory('httpLogInterceptor', function($q){
            return {
                //elke http call die bij get passeert
                request: function(request){
                    console.log(request.url);
                    return request;
                }
            }
        })
        .factory('httpHeaderInterceptor', function($q){
            return {
                request: function(request){
                    request.headers.Authorization = 'Ksenia';
                    return request;
                }
            }
        })
        .factory('httpErrorInterceptor', function($q, toaster){
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
        })
        .config(function($routeProvider){
            $routeProvider
                .when('/alert', {
                    templateUrl: 'views/alert.html',
                    controller: 'AlertController',
                    controllerAs: 'vm'
                })
                .when('/index', {
                    templateUrl: 'views/list.html',
                    controller: 'UserController',
                    controllerAs: 'vm'
                })
                .when('/add', {
                    templateUrl: 'views/edit.html',
                    controller: 'EditController',
                    controllerAs: 'vm'
                })
                .when('/edit/:userId?', {
                    templateUrl: 'views/edit.html',
                    controller: 'EditController',
                    controllerAs: 'vm'
                })
                //.otherwise({ redirectTo: '/index' });

        });


})(angular);
