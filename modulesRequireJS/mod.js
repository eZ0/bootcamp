//soort van IIFE
define([], function(){

    function add(x,y){

        return x + y;

    }

    function mult(x,y){

        return x * y;

    }

    return {
        add    : add,
        mult   : mult
    }

});


// commonJS

// var obj = {
//     name : 'test'
// }

// module.exports = obj;
