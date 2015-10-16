var chai = require("chai");
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var calc = require('./calc');

var repository = {
    getUser : function(id){
        //get user from db
        return [];
    }
}

describe('add', function(){
    it('calc - add', function(){
        var spy = sinon.spy(console, 'log');
        calc.add(1,2);

        expect(spy).to.have.been.calledWith(3);

        //expect(spy.args[0][0].name).to.equal('aaa');
    });

    it('stub', function(){
        //hajack the function with data
        var stub = sinon.stub(repository, 'getUser').returns({id: 12, name: 'Tom'});

        var result = repository.getUser();

        expect(result).to.deep.equal({id: 12, name: 'Tom'});

    });
});
