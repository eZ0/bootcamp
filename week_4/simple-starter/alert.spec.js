var expect = chai.expect;

describe.only('Alert Directive', function(){

    beforeEach(module('myApp'));
    beforeEach(module('alert.tpl.html'));

    var element, $scope, alertType, $compile, $rootScope;

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should show the alert content', function(){
        var element = createElement('<eu-alert type="danger">oopsy!</eu-alert>');
        expect(element.find('span').text()).to.equal('oopsy!');
    });

    it('type=danger should be class="alert alert-danger"', function(){
        var element = createElement('<eu-alert type="danger">oopsy!</eu-alert>');
        expect(element.hasClass('alert-danger')).to.equal(true);
    });

    it('type=success should be class="alert alert-success"', function(){
        var element = createElement('<eu-alert type="success">oopsy!+++</eu-alert>');
        expect(element.hasClass('alert-success')).to.equal(true);
    });

    it('type=success should be class="alert alert-warning"', function(){
        var element = createElement('<eu-alert type="warning">oopsy!</eu-alert>');
        expect(element).to.have.class('alert-warning');
    });

    it('type=success should be class="alert alert-info"', function(){
        var element = createElement('<eu-alert type="info">oopsy!</eu-alert>');
        expect(element).to.have.class('alert-info');
    });

    it.only('should not show close button and dont have the alert-dismissable class ' +
        'if no close callback specified', function(){

    });



    function createElement(html) {
        var $scope = $rootScope.$new();
        var element = angular.element(html);
        $compile(element)($scope);
        $rootScope.$digest();
        return element;
    }
});