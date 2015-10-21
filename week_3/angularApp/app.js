(function(angular){

    'use strict';

    angular.module('myApp', [

        //angular
        'ngRoute',

        //3rd party

        //app
        'app.controllers'
    ])
    .config(function($routeProvider){
        $routeProvider
            .when('/view1', {
                templateUrl: './view1.html',
                controller: 'View1Controller',
                controllerAs: 'vm'
            })
            .when('/view2/:userId?', {
                templateUrl: './view2.html',
                controller: 'View2Controller',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/view1'
            });

    })
    .run(function($rootScope, $log){
        $rootScope.$on('$routeChangeSuccess', function(current, previous){
            $log.info('route changed ', previous, current);
        });
        $rootScope.$on('$routeChangeStart', function(next, current){
            $log.info('route start ', next, current);
        });
        $rootScope.$on('$routeChangeError', function(current, previous){
            $log.info('route error ', current, previous);
        });
    });

})(angular);
