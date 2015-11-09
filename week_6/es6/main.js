"use strict";
//--------ITERATORS---------

//**GENERATOR FUNCTION**

//let users = ['peter', 'jan', 'wim', 'stijn', 'hans'];
//
//function *filter(data, cb){
//    for (let i in data) {
//        if (cb(data[i]))
//            yield data[i];
//    }
//}
//
//function *take(data, amount){
//    for (let i in data) {
//        if(i < amount)
//            yield data[i];
//    }
//}
//
//console.log("FILTER");
//for (let user of filter(users, (user) => user.startsWith('h'))){
//    console.log(user);
//};
//
//console.log("TAKE");
//for (let user of take(users, 3)) {
//    console.log(user);
//};

//function *values() {
//    let data = [1,2,3,4,5];
//    for(let i in data){
//        yield data[i]; // gaat uit deze functioe en gaat naar while
//    }
//}
//
//var iterator = values(); //.entries .keys
//let next = iterator.next();
//
//while(!next.done){
//    console.log(next.value);
//    next = iterator.next(); //gaat terug naar yield
//}
//
////zelfde als boven
//for(let v of values()){
//    console.log(v);
//}
//
//function fibonacci(num) {
//    if (num == 0) {
//        return [];
//    }
//    if (num == 1) {
//        return [1];
//    }
//    if (num > 1) {
//        let fib = [1, 1];
//        for (let i = 2; i < num; i++) {
//            let val = fib[i - 2] + fib[i - 1];
//            fib.push(val);
//        }
//        return fib;
//    }
//}
//
//console.log(fibonacci(8));
//
//function *fibo(max){
//
//    let x = 1;
//    let y = 1;
//    let sum;
//
//    yield y;
//    yield x;
//
//    while(true){
//
//        sum = x + y;
//        if(sum > max)
//            return;
//        x = y;
//        y = sum;
//
//        yield sum;
//    }
//}
//
//var iterator = fibo();
//var next = iterator.next();
//for (let i=0; i<8; i++){
//    console.log(next.value);
//    next = iterator.next()
//}
//console.log('MAX');
//for (let value of fibo(2000)){
//    console.log(value);
//}
// map/weakmap/set/weakset/array/string

//let numbers = [1,2,3,4,5];
//var iterator = numbers.values(); //.entries .keys
//let next = iterator.next();
//
//while(!next.done){
//    console.log(next.value);
//    next = iterator.next();
//}


//numbers.forEach(x => {
//    console.log(x);
//});
//
//// ES5
//for(let index in numbers){
//    console.log(numbers[index]);
//}

//// ES6
//console.log('ES6 of syntax');
//for(let num of numbers){
//    console.log(num);
//}

//--------PROMISES---------
//$q promises ->angular

// es6 promises
// function getData(id) {
//    var promise = new Promise(function (resolve, reject) {
//        setTimeout(function(){
//            if(!id) {
//                reject('this is bad');
//                return;
//            }
//            resolve(100);
//        }, 200);
//    });
//    return promise;
//}

//getData(11)
//    .then(function(data){
//        console.log('data', data);
//    })
//    .catch(function(err){
//        console.log('err', err);
//    });

//function sleep(sec) {
//    var promise = new Promise( function(resolve, reject) {
//        setTimeout(function(){
//            if(!sec){
//               reject('no time error');
//               return;
//            }
//            resolve('all right!');
//        }, sec)
//    });
//    return promise;
//}

//function sleep(s) {
//    return new Promise(r => setTimeout(r, s));
//}
//
//sleep(1000)
//    .then(function(){
//        console.log('sleep');
//    });

// $q (1.3) promises
//function getData(id) {
//    var promise = $q(function (resolve, reject) {
//        setTimeout(function(){
//            if(!id) {
//                reject('this is bad');
//                return;
//            }
//            resolve(100);
//        }, 200);
//    });
//    return promise;
//}


//--------CLASSES---------
//class Parent {
//    //static type = 'person'; // ES7
//    constructor(name) {
//        this.name = name;
//        this._private = 12;
//        console.log('Parent');
//    }
//    foo() {
//        console.log(`boo, ${this.name}`);
//    }
//    _pivateFoo() {
//        console.log(`boo, ${this.name}`);
//    }
//}
//
//Parent.type = 'person'; // ES6
//
//var obj = new Parent('Tom');
//obj.foo();

//class Child extends Parent {
//    constructor(name) {
//        super(name);
//        console.log(`Child ${name}`);
//    }
//    boo() {
//        console.log('frfrf!');
//    }
//}
//
//var objc = new Child('Ksenia');
//objc.boo();
//objc.foo();


//--------BLOCK SCOPING---------
//const a = 1;
//if(true) {
//    let b = 2;
//    a = 3;
//}
//console.log(b,a);
//--------STRING INTERPOLATION---------

//var name = 'Ksenia';
//var surname = 'Karelskaya';
//var hobby = 'tea';
//var greeting = upper `Hi, my name is ${name} & surname is ${surname} & I like ${hobby}.`;
//
//function upper(literals, ...values){
//    // literals: ['Hi, my name is', '& surname is', '& I like tea']
//    // values[0]:  'Ksenia'
//    // values[1]:  'Karelskaya'
//
//    let uc = '';
//    for(let i = 0; i < literals.length; i++){
//        uc += literals[i];
//        if (i < values.length){
//            uc += values[i];
//        }
//    }
//
//    uc = uc.toUpperCase();
//    return uc;
//}
//
//console.log(greeting);
//var x = 1;
//var y = 2;
//
//function fn() {
//    return '& fn!';
//}
//
//var sum = `I count: ${x + y}: ${fn()}`;

//console.log(sum);


//--------set & map---------
// aantal waardes/keys in de lijst bijhouden
//var set = new Set();
//console.log(set.size);
//
//var obj = {name: 'Ksenia'};
//
//set.add('12');
//set.add('22');
//set.add('32');
//set.add(obj);
//set.add('2');
//
//
//console.log(set.size);
//console.log(set.has('2'));
//console.log(set.has(obj));
//
//set.delete('22');
//console.log(set.size);
//
//set.clear();
//
//var map = new Map();
//map.set('key', '***');
//var value = map.get('key');
//
//console.log(value);
//map.has('key');
//map.size();
//map.delete('key');
//map.clear();

//var wmap = new WeakMap(); //dom elements verdwijnen uit map automatisch als ze van dom weg zijn
//var wset = new WeakSet();

//--------DESTRUCTURING ARGUMENTS---------
//
//function calcBmi1(weight, height, max, cb) {
//    var bmi = weight / Math.pow(height, 2);
//    if (bmi > max)
//        console.log("you're overweight");
//    if (cb)
//        cb(bmi);
//}
//
//function calcBmi(options) {
//    var bmi = options.weight / Math.pow(options.height, 2);
//    if (bmi > options.max)
//        console.log("you're overweight");
//    if (options.callback) {
//        options.callback(bmi);
//        console.log("you're fine " + bmi);
//    }
//}
//
//var options = {
//    weight: 50,
//    height: 158
//};
//
//calcBmi(options);
//
//
////ES
//var weight = 50;
//var height = 158;
//function callback() {};
//calcBmi({weight, height, callback }) ;

//--------OBJECT CREATION---------
//
//var foo = 2;
//var obj = {
//    bar: 1,
//    foo
//};
//
//console.log(obj);

//var name = 'Ksenia';
//var age = 12;
//some.method({name, age});

//// ES5
//var name = 'Will';
//var obj2 = {};
//obj2['do' + name]=5;
//
//obj2.doWill == 5;
//
//// ES6
//var obj3 = {
//    ['do' + name]:5
//};

//--------DESTRUCTURING---------

//var foo = {
//    bar:1,
//    baz:2
//};
//
//function method() {
//    return foo;
//}
//
////var bar = foo.bar;
////var baz = foo.baz;
//
////var {bar, baz} = foo;
//
//var {bar: b, baz: z} = method();
//
//console.log(b);
//
//var tenses = ['me', 'you', 'he'];
//
//var [firstPerson] = tenses;
//var [firstPerson, secondPerson] = tenses;
//
//console.log(firstPerson + ' & '+ secondPerson);
//--------SPREAD OPERATOR--------

//var users = ['peter', 'jan', 'tim'];
//function foo(first, second, third) {
//    console.log(first);
//    console.log(second);
//    console.log(third);
//}
//foo(...users);
//
//var a = [4,5,6];
//var b = [1,2,3, ...a, 7,8,9];
//console.log(b);

//---------REST PARAMS---------

//function sum() {
//    let result = 0;
//    for(let i = 0; i < arguments.length; i++) {
//       result += arguments[i];
//    }
//    return result;
//}
//
//console.log(sum(1,2,3));
//
//function sumES6(first, ...numbers){
//    let result = 0;
//    for(let i = 0; i < numbers.length; i++) {
//        result += numbers[i];
//    }
//    return first + ' ' + result;
//}
//
//console.log(sumES6('Rest Params',1,2,3));


//--------DEFAULT PARAM---------
//function toUpper(name = '') {
//    // werkt alleen op undefinded - null is niet behandelt
//    return name.toUpperCase();
//}

//console.log(toUpper());

//--------ARROW FUNCTION--------

//var foo  = function(a, b){
//    return a + b;
//};

//var foo  = (a, b) => a + b;

// console.log(foo(3,2));


//var module = {
//    age: 30,
//    foo: function(){
//        setTimeout(() => {
//            console.log(this.age);
//        }, 100);
//    }
//};

// module.foo();