var a = '~~ Super Unicorn Magic ~~'

console.log(a);


function test(b){
    return b;
}

// console.log(test(a));

function add(n, m){
    return n+m;
}

function mult(n, m){
    return n*m;
}

// console.log( add(3, 4) );
// console.log( mult(3, 4))

function identify(m){
    return function(){
        return m;
    }
}

idf = identify(3);

// console.log( idf() );


function addf(a){
    return function (b){
        return a+b;
    }
}

//console.log(addf(3)(4));

function applyf(fun){
    return function(a){
        return function(b){
            return fun(a,b);
        }
    }
}

//console.log( applyf(mult)(3)(4) );

function curry(fun, x){
    return function(y){
        return fun(x, y);
    }
}

// console.log(curry( mult, 3)(4));


var inc = addf(1);

//console.log( inc(1) );

function metodize(fun){
    return function(y){
        return fun(this, y);
    }
}

Number.prototype.add = metodize(add);


function demetodize(fun){
    return function(x, y){
        return fun.call(x, y);
    }

}


Number.prototype.add = metodize(add);

console.log( (3).add(4) );

console.log( demetodize(Number.prototype.add)(5, 6) );

