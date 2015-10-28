var expect = chai.expect;


describe('module to test', function(){

    //beforeEach(function(){
    //    angular.mock.module('app');
    //});

    beforeEach(module('myApp'));
    var ctrl, $scope;
    beforeEach(inject(function($controller, $rootScope, $location, customerService, $q){
        $scope = $rootScope.$new();

        var customers = [
            { "name": "Tim Jones", "city": "Phoenix"},
            { "name": "Jamie Riley", "city": "Atlanta"},
        ];

        var stub = sinon.stub(customerService, 'getCustomers')
                        .returns($q.resolve(customers));

        ctrl = $controller('MainController', {
            $scope: $scope,
            $location: $location,
            customerService: customerService
        });
    }));

    it('Should place message on a scope ', function(){
        expect($scope.message).to.equal('hello world');
    });

    it('should place customers on a scope', function(){

        // met promises - altijd digest
        $scope.$digest(); // automatish getriggerd als events binnen komen, wij hebben er geen - dus zelf triggeren

        expect($scope.customers).to.be.a('array');
        expect($scope.customers.length).to.equal(2);
    });

    it('Should place new customer on customerlist', function(){
        // arrange
        $scope.newCustomer = {
            name: 'Bank Delen',
            city: 'Antwerp'
        };
        // act
        $scope.addCustomer();

        // assert
        expect($scope.customers).to.be.a('array');
        expect($scope.customers.length).to.equal(1);
    });


    //var upperFilter;
    //beforeEach( inject(function(_upperFilter_){
    //    upperFilter = _upperFilter_;
    //}));
    //
    //it('Should make input uppercase ', function(){
    //    expect(upperFilter('hello')).to.equal('HELLO');
    //});

});

describe('service', function(){

    beforeEach(module('myApp'));


    var customerService, $httpBackend;
    beforeEach(inject(function(_customerService_, _$httpBackend_){
        customerService = _customerService_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should return customers', function(){
        // arrange
        var customers = [
            { "name": "Ann Jones", "city": "Phoenix"},
            { "name": "Jamie Riley", "city": "Atlanta"},
        ];
        $httpBackend.whenGET('data.json').respond(customers);

        // act
        customerService.getCustomers()
            .then(function(customers){
                expect(customers).to.be.a('array');
                expect(customers.length).to.equal(2);
            });

        // asset
        $httpBackend.flush();

    });
});


describe('directive', function(){
    beforeEach(module('myApp'));

    var element, $scope;

    beforeEach(inject(function($compile, $rootScope){
        $scope = $rootScope.$new();
        $scope.message = 'hello';
        element = angular.element('<div eh-simple>{{message}}</div>');
        $compile(element)($scope);

        $rootScope.$digest();
    }));

    it('should equal message "hello"', function(){
        console.log(element.prop('outerHTML'));
       expect(element.html()).to.equal('hello');
    });

    it('should add class "plain"', function(){
        expect(element.hasClass('plain')).to.equal(true);
    });
});


describe('directive tmpl', function(){
    beforeEach(module('myApp'));
    beforeEach(module('ehTempl.tpl.html'));

    var element, $scope;

    beforeEach(inject(function($compile, $rootScope){
        $scope = $rootScope.$new();
        element = angular.element('<eh-templ></eh-templ>');
        $compile(element)($scope);
        $rootScope.$digest();
    }));

    it('should equal message "hello"', function(){
        console.log(element.prop('outerHTML'));
        expect(element.find('div').text()).to.equal('---hello---');
        expect(element.find('div')).to.have.class('plain');
    });

});
