(function(){
    'use strict';

    angular
        .module('app.controllers')
        .controller('MainController', MainController)
        .controller('View1Controller', View1Controller)
        .controller('View2Controller', View2Controller);


    function MainController($state){
        var vm = this;
        vm.hello = 'Hello world';
        vm.goToView2 = goToView2;

        activate();

        //////////

        function activate(){

        }

        function goToView2(){
            $state.go('view2');
            //$location.path('view2');
        }
    }

    function View1Controller($log){
        var vm = this;
        vm.message = 'Hello people of planet Earth';

        $log.info('View1Controller');

    }

    function View2Controller($log, $stateParams){
        var vm = this;

        $log.info('state param ', $stateParams.userId);

        vm.message = 'Hello world? Srsly?';
        $log.info('View2Controller');
    }

})();
