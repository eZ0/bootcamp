(function(){

    angular
        .module('myApp')
        .controller('MainController', MainController);

    function MainController(){
        var vm = this;
        vm.doThat = doThat;

        function doThat(){
            console.log('Magic unicorns!');
        }
    }

})();
