(function(angular){

    'use strict';

    angular
        .module('userApp', [
            'ui.bootstrap',
            //
            'ngResource'
        ])
        .factory('_', function($window){
            return $window;
        })
        .factory('UserResource', function($resource){
            return $resource('/api/users/:id', {id: '@id'});
        })
        .constant('config', {
            "baseURL" : '/api/'
        })
        .config(function(userServiceProvider){
            userServiceProvider.setBaseURL('/api/');
        });

    // wrapper for underscore

})(angular);
