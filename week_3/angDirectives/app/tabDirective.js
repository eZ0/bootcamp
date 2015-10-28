(function(){
    angular
        .module('myApp')
        .directive('tab', tabDirective) //tab-pane
        .directive('tabs', tabsDirective)
        .controller('TabController', TabController) //tab-pane
        .controller('TabsController', TabsController);

    function tabDirective(){
        return {
            restrict: 'E', // A - attribute, E - element, C -class, M - comment
            templateUrl: 'templates/tabDirective.html',
            replace: false,
            transclude: true,
            require: ['^tabs', 'tab'],
            link: function(scope, element, attrs, controllers){
                var tabsCtrl = controllers[0];
                var myCtrl = controllers[1];
                //console.log(attrs.title);
                myCtrl.init(tabsCtrl);
            },
            scope: {
                title: '@'
            },
            controller: 'TabController',
            controllerAs: 'vm'
        }
    }

    function tabsDirective(){
        return {
            restrict: 'E', // A - attribute, E - element, C -class, M - comment
            templateUrl: 'templates/tabsDirective.html',
            replace: false,
            transclude: true,
            controller: 'TabsController',
            controllerAs: 'vm'
        }
    }

    function TabController($scope){
        var vm = this;
        vm.isVisible = false;
        vm.showTab = showTab;

        //console.log($scope.title);

        this.init = function(tabsController) {
            tabsController.register(vm);
        };

        this.getTitle = function(){
            return $scope.title;
        };

        function showTab(isVisible){
            vm.isVisible = true;
        }

    }

    function TabsController($scope){
        var vm = this;
        vm.tabs = [];
        vm.activateTab = activateTab;

        console.log($scope.title);

        this.register = function(tab) {
            vm.tabs.push(tab);
        };

        function activateTab(tab){
            vm.tabs.forEach(function(tabList){
               tab.showTab(false);
                console.log(tabList);
            });
            tab.showTab(true);
        }
    }


})();
