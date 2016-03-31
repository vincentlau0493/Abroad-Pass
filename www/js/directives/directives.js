var app = angular.module('directives', []);

app

.directive('hideTabs', function($rootScope) {
	  return {
	    restrict: 'A',
	    link: function($scope, $el) {
	      $rootScope.hideTabs = 'tabs-item-hide';
	      $scope.$on('$ionicView.beforeLeave', function(e) {
	        $rootScope.hideTabs = '';
	      });
	    }
	  };
	})

.directive("mouseDownHighlight", function() {

  return function(scope, element, attrs) {
    element.on('mouseup', function(event) {
      element.removeClass(attrs.mouseDownHighlight)
    })
    element.on('mousedown', function(event) {
      element.addClass(attrs.mouseDownHighlight)
    })
  }
})


module.exports = app;