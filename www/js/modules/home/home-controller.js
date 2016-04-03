function HomeCtrl($scope, $ionicActionSheet, ProvidersService, ArticlesService, LoadingService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  LoadingService.show();
  $scope.articles = ArticlesService.all();
  

  var providers = ProvidersService.all();
  var pLen = providers.length;
  var idx = 2;
  $scope.provider = providers[idx]; // current shown provider

  $scope.nextProvider = function() {
  	idx = (idx + 1) % pLen;
  	$scope.provider = providers[idx];
  }

  $scope.showActionSheet = function($event) {

  	console.log($event.currentTarget);
  	// return hideSheet function
		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{ text: '<b>Follow</b> This Provider' },
			],
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				return true;
			}
		});
  }


  // $scope identity
  $scope.urlPrefix = 'home';
  setTimeout(function(){
    LoadingService.hide(true);    
  }, 1000)

}



module.exports = ['$scope', '$ionicActionSheet', 'ProvidersService', 'ArticlesService', 'LoadingService', HomeCtrl];