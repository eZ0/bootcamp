var expect = chai.expect;

describe('detail controller', function(){

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

    beforeEach(inject(function(_$httpBackend_){
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should add a new empty person', inject(function($controller){

        ctrl = $controller('DetailController', {
            $routeParams: {
            }
        });
        expect(ctrl.person).to.deep.equal({});
    }));

    it('should update an existing new person', inject(function($controller){

        var person = persons[0];
        $httpBackend.expectGET('http://localhost:8080/api/persons/1')
                    .respond(person);

        ctrl = $controller('DetailController', {
            $routeParams: {
                id: 1
            }
        });

        $httpBackend.flush();

        expect(ctrl.person).to.deep.equal(person);

    }));

    it.only('should submit form if user new', function($controller, $location){
        var person = {
            id: 2,
            name: 'Foo Foo',
            email: 'foo.bar@baz.com',
            age: 27,
            birthDate: new Date(1988, 2, 17),
            married: false
        };
        $httpBackend.expectPOST('http://localhost:8080/api/persons')
                    .respond(person);

        ctrl = $controller('DetailController', {

        });


    })

});
