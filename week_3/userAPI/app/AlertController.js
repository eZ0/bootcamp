(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('AlertController', AlertController);


    AlertController.$inject = ['$interval'];
    function AlertController($interval){
        var vm = this;

        vm.alert = null;
        vm.count = 10;

        activate();

        //////////


        function activate() {

            $interval(function() {
                vm.count = vm.count - 1;

                if(vm.count == 0)
                    vm.showAlert();

            }, 500, 10);

        }

        vm.showAlert = function(){
            vm.alert = 'Oh snap! Change a few things up and try submitting again.';
        };

        vm.closeAlert = function() {
            vm.alert = null;
        };

    }

})();
