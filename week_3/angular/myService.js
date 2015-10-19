(function(){
    angular
        .module('myApp')
        .factory('myService', myService);

    function myService($http){
        //customers = [
        //
        //];

        function getCustomers(){
            //return customers;
            return $http.get('customers.json');
        }

        return {
            getCustomers : getCustomers
        }
    }

})();