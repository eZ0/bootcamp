(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('EditController', EditController);

    function EditController($routeParams, $log){

        var vm = this;

        vm.userId = $routeParams.userId;

        $log.info('User id: ' + vm.userId);

    }

})();
