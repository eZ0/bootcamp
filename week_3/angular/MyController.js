(function(){
    'use strict';

    //var app = angular.module('myApp'); //referentie naar app
    //
    //app.controller('MyController', function($scope){ //$ - angular heeft een speciaal sys
    //    $scope.quantity = 100;
    //    $scope.cost = 20;
    //});

    angular
        .module('myApp')
        .controller("MyController", MyController);

    function MyController($scope, myService){
        $scope.quantity = 100;
        $scope.cost = 20;
        $scope.message = 'Hallo Angular!';
        $scope.showMessage = true;
        $scope.customers = [];
        //$scope.customers = myService.getCustomers();

        myService.getCustomers()
            .then(function(res){
                $scope.customers = res.data;
            })
            .catch(function(err){
               $scope.error = err;
            });

        $scope.computeMessage = function() {
            $scope.message = 'hello' + $scope.quantity;
        };

        $scope.addCustomer = function(){
            $scope.customers.push({
                name : $scope.name,
                city : $scope.city
            });

            console.log( $scope.customers );
        };

        $scope.toggle = function(){
            $scope.showMessage = !$scope.showMessage;
            $scope.showAlert = !$scope.showAlert;
        };

        $scope.messageStyle = {
            "background-color" : '#0495CF',
            "font-size" : '16px'
        }
    };

})();