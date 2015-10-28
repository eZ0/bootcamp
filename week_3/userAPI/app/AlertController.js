(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('AlertController', AlertController);


    AlertController.$inject = ['$interval', '$scope'];
    function AlertController($interval, $scope){
        var vm = this;

        vm.alert = null;
        vm.count = 10;

        activate();

        //////////


        function activate() {

            //$interval(function() {
            //    //vm.count = vm.count - 1;
            //    //
            //    //if(vm.count == 0)
            //    //    vm.showAlert();
            //
            //}, 500, 10);


            $scope.$watch('vm.text', function(value){
                console.log('hey! my value has changed! ' + value);
            });



            setTimeout(startTimer, 500);


        }

        function startTimer(){
            console.log('count: ' + vm.count);
            $scope.$apply(function() {
                vm.count = vm.count - 1;
                if (vm.count > 0) {
                    setTimeout(startTimer, 500);
                    vm.showAlert();
                }
            });
        };

        vm.showAlert = function(){
            vm.alert = 'Oh snap! Change a few things up and try submitting again.';
        };

        vm.closeAlert = function() {
            vm.alert = null;
        };

    }

})();
