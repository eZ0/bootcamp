(function(){

    angular
        .module('myApp')
        .directive('myDirective', myDirective)
        .directive('myButton', myButtonDirective)
        //.directive('myLink', myLinkDirective)
        .controller('MyController', MyController)
        .controller('MyLinkController', MyLinkController);

    function myDirective(){
        return {
            restrict: 'EA', // A - attribute, E - element, C -class, M - comment
            templateUrl: 'templates/myDirective.html',
            replace: false,
            transclude: true,
            link: function(scope, element, attrs, controller){
            },
            scope: {
                text: '@',
                click: '&'
            },
            controller: 'MyController',
            controllerAs: 'vm'
        }
    }

    function myLinkDirective(){
        return {
            restrict: 'EA', // A - attribute, E - element, C -class, M - comment
            templateUrl: 'templates/myLinkDirective.html',
            replace: false,
            transclude: true,
            link: function(scope, element, attrs, controller){
                element.text('hello Im link directive!');
                controller.callMe();
            },
            controller: 'MyLinkController',
            controllerAs: 'vm'
        }
    }

    function myButtonDirective() {
        return {
            restrict: 'EA',
            template: function($element, $attrs) {
                if ($attrs.href) {
                    return '<a href='+  $attrs.href + '>' + $attrs.text + '</a>';
                }
                return '<button>' + $attrs.text + '</button>';
            },
            replace: true
        }
    }

    function MyController($scope, $element, $attrs){
        var vm = this;

        vm.message = 'hello world';
        vm.doThis = doThis;

        activate();

        /////////

        function activate(){
            console.log($element);
            console.log($attrs);
        }


        function doThis(){
            $scope.click();
            console.log('Not so magic unicorns :(');
        }

    }

    function MyLinkController($scope, $element, $attrs){
        var vm = this;

        vm.text = $attrs.text;

        activate();

        /////////

        this.callMe = function() {
            console.log('call me');
        };

        function activate(){

        }
    }
})();
