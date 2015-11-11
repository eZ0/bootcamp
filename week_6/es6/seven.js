"use strict";

function sleep(s) {
    return new Promise(r => setTimeout(r, s));
}

async function run(){
    console.log('time for bed');
    await sleep(2000);
    console.log('zzzZZZ');
    await sleep(2000);
    console.log('zzzZZZzzz');
    await sleep(2000);
    return 'ok';
}


run()
    .then(function(data){
        console.log(data);
    });