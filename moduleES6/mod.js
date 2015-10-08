// commonJS
// module.exports = 'aa'
// module.exports.foo = function(){}

class Calc {
    add(x,y){
        return x+y
    }
    mult(x,y){
        return x*y
    }
}

class Car{
    start(){
        console.log('brum brum');
    }
}

// ES6
// export default 'aaa'; //default export
export var calc = new Calc;
export var CarClass = Car;



