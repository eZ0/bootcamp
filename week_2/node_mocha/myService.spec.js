var chai = require("chai");
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var myService = require('./myService');

xdescribe('myService', function(){

    it('test fails', function(done){

        var promise = myService.find('query');
        expect(promise)
            .to.eventually.equal('abc')
            .notify(done);


        // myService.find('query')
        // .then(function(data){
        //     expect(data).to.equal('abc');
        //     done();
        // })
        // .catch(function(err){
        //     done(err);
        // });
    });

    it('negative test', function(done){

        var promise = myService.find('');
        expect(promise)
            .to.be.rejectedWith('bad value')
            .notify(done);
    });

    xit('test fails', function(done){
        myService.find('')
        .then(function(data){
            done('no succes');
        })
        .catch(function(err){
            if(err != 'bad value jj')
                done('invalid error');
            done();
        });
    });

});
