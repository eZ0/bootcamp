var myCalc = (function(){

    'use strict';

    function add(x,y){

        return x + y;

    }

    function mult(x,y){

        return x * y;

    }

    return {
        add: add,
        mult: mult
    };


})();
