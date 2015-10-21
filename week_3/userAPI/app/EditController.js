(function(){
    'use strict';

    angular
        .module('userApp')
        .controller('EditController', EditController);

    function EditController($stateParams, userService, $state){

        var vm = this;

        vm.submit = submit;
        vm.user = {};

        activate();

        /////////

        function activate() {

            var userId = $stateParams.userId;
            if (!userId)
                return;

            userService.getUser(userId)
                .then(function(user){
                    vm.user = user;
                })
                .catch(function(err){
                    return err;
                });
        }

        function submit(valid){
            if(!valid)
                return;

            userService.updateUser(vm.user)
                .then(function (user) {
                    vm.user = user;
                    $state.go('index');
                })
                .catch(function(err){
                    return err;
                });

        }





    }

})();
