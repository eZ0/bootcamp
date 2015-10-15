var Q = require('q');

function find (query, callback) {
    setTimeout(function(){
        if (!query) {
            callback('bad value');
        }
        callback(null, 'abc');
    }, 2000);
}

function findQ (query) {
    var deferred = Q.defer();

    setTimeout(function(){
        if (!query) {
            return deferred.reject("bad value");
        }
        deferred.resolve("abc");
    }, 2000);

    return deferred.promise;
}

console.log('start');


find('query', function(err, result){
    if (err) {
        console.log('error: ' + err);
    }
        console.log('ok1 ' + result);
        find('query1', function(err, result){
            if (err) {
                console.log('error: ' + err);
            }
            console.log('ok2 ' + result);
            find('query2', function(err, result){
                if (err) {
                    console.log('error: ' + err);
                }
                console.log('ok3 ' + result);
                find('query3', function(err, result){
                    if (err) {
                        console.log('error: ' + err);
                    }
                });
            });
        });
});

findQ('query')
    .then(function(result){
        console.log('Q ok ' + result);
    })
    .catch(function(err){
        console.log('error: ' + err);
    });

findQ('query1')
    .then(function(result){
        console.log('Q1 ok ' + result);
        return findQ('query2');
    })
    .then(function(result){
        console.log('Q2 ok ' + result);
        return findQ('query3');
    })
    .then(function(result){
        console.log('Q3 ok ' + result);
    })
    .catch(function(err){
        console.log('error: ' + err);
    });

