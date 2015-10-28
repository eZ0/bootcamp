(function(angular){
    'use strict';
    angular
        .module('app', ['ngRoute', 'ngMessages'])
         /* @ngInject */
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/views/home.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                })
                .when('/list', {
                    templateUrl: '/views/list.html',
                    controller: 'ListController',
                    controllerAs: 'vm',
                    // resolve: {
                    //     persons: function(personService){
                    //         return personService.get();
                    //     }
                    // }
                })
                .when('/detail/:id?', {
                    templateUrl: '/views/detail.html',
                    controller: 'DetailController',
                    controllerAs: 'vm',
                    // resolve: {
                    //     person: function(personService, $route){
                    //         if($route.current.params.id){
                    //             return personService.getOne($route.current.params.id);
                    //         }
                    //         return {};
                    //     }
                    // }
                })
                .otherwise({
                    redirectTo: '/'
                });
        })
        //.filter('dateFilter', function(){
        //    return function(input){
        //        return moment(input).format("MMM DD YYYY");
        //    }
        //})
         /* @ngInject */
        .run(function($rootScope, $log, $location){
            $rootScope.$on('$routeChangeStart', function(event, next, current) {
                if(next && next.$$route){
                    $log.log(next.$$route.originalPath);
                }
            });
        });
})(angular);
