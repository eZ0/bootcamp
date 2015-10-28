(function(angular) {
    'use strict';
    angular
        .module('app')
        .filter('dateFormat', function () {

            return function (input) {

                var date = moment(input);

                if(!input) {
                    return input;
                }

                if(!angular.isDate(input) && !angular.isString(input)){
                    return input;
                }

                if(!date.isValid()){
                    return input;
                }

                return date.format("MMM DD YYYY");
            }
        });
})(angular);
