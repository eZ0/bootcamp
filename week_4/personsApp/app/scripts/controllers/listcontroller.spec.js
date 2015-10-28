var expect = chai.expect;

describe('list controller', function(){

    beforeEach(module('app'));

    var ctrl, $httpBackend;
    var persons = [{
        id: 1,
        name: 'Foo Bar',
        email: 'foo.bar@baz.com',
        age: 26,
        birthDate: new Date(1988, 9, 13),
        married: false
    }];
    beforeEach(inject(function($controller, personService, _$httpBackend_){
        $httpBackend = _$httpBackend_;

        ctrl = $controller('ListController',{
            personService : personService
        });

        $httpBackend.whenGET('http://localhost:8080/api/persons')
            .respond(persons);

    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should place persons on controller', function(){

        $httpBackend.flush();

        expect(ctrl.persons).to.deep.equal(persons);
    });

    it('should send DELETE request', function(){
        var person = persons[0];

        $httpBackend.expectDELETE('http://localhost:8080/api/persons/1')
                    .respond(person);
        ctrl.removePerson(person);
        $httpBackend.flush();
        expect(ctrl.persons.length).to.equal(0);
    });

});
