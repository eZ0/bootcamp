(function() {
'use strict';

    angular.module('myApp', [])
       .filter('upper', function(){
            return function(input){
                return input.toUpperCase();
            }
        })
        .directive('ehSimple', function(){
            return {
                link: function(scope, element, attrs){
                    element.addClass('plain');
                }
            }
        })
        .directive('ehTempl', function(){
            return {
                templateUrl: 'ehTempl.tpl.html',
                controller: function($scope){
                    $scope.message = "hello";
                }
            }
        })
        .directive('euAlert', function(){
            return {
                templateUrl: 'alert.tpl.html',
                replace: true,
                link: function(scope, element, attrs){
                    console.log(element);
                    var cl = attrs.type;
                    element.addClass('alert alert-'+cl);
                },
                transclude: true,
                controller: 'AlertController',
                controllerAs: 'vm'

            }
        });

})();
