module.exports = angular.module('providers', [])
	.factory('ProvidersService', require('./providers-service'))
	.controller('ProviderDetailCtrl', require('./provider-detail-controller'))
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
	});