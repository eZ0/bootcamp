(function(){
    'use strict';

    angular
        .module('userApp')
        .filter('transformToUppercase', transformToUppercase)
        .filter('filterGmail', filterGmail);
    
    function transformToUppercase(){

        return function(input, arg) {
            if (arg == 'lowercase') {
                return input.toLowerCase();
            }else{
                return input.toUpperCase();
            }
        }

    }

    function filterGmail($log, _) {

        return function(input) {
            return _.filter(input, function(item) {
                return (item.email.indexOf('gmail') !== -1);
            });
        }
    }

})();