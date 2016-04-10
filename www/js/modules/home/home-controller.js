function HomeCtrl($scope, $ionicActionSheet, ProvidersService, ArticlesService, LoadingService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // $scope identity
  $scope.urlPrefix = 'home';

  LoadingService.show();
  // $scope.articles = ArticlesService.all();
  
  ArticlesService.all().then(function(articles) {
    $scope.articles = articles;
    LoadingService.hide(true);
  })

  ProvidersService.getRecommendedProviders()
    .then(function(providers){
      var pLen = providers.length;
      var idx = 2;
      $scope.provider = providers[idx]; // current shown provider

      $scope.nextProvider = function() {
        idx = (idx + 1) % pLen;
        $scope.provider = providers[idx];
      }

    })


  $scope.doRefresh = function() {

    ArticlesService.all()
      .then(function(articles) {
         $scope.articles = articles;
      })
      .finally(function() {
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });

  }

  $scope.showActionSheet = function($event) {

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
}



module.exports = ['$scope','$ionicActionSheet', 'ProvidersService', 'ArticlesService', 'LoadingService', HomeCtrl];