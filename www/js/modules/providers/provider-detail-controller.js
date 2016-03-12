function ProviderDetailCtrl($scope, $stateParams, ionicHistory, ProvidersService) {
  $scope.provider = ProvidersService.get($stateParams.providerId);

  // $ionicConfigProvider.backButton.previousTitleText(false)
  
	/**
		* Change by current mode
		* @param {Enum} mode 
		* 	[background, articles, comments]
		*/
  $scope.changeMode = function(mode) {
  	$scope.mode = mode;
  }

  $scope.goBack = function() {
  	ionicHistory.goBack();
  }


  $scope.$on('$ionicView.afterEnter', function(e) {
		init();
  });

}

function init() {
	var scrollDiv = document.getElementsByClassName('scroll-div')[0];
	setScrollDivHeight(scrollDiv);		


}

function setScrollDivHeight(ele) {
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	var contentEles = document.getElementsByClassName('scroll-content');
	var contentEle = contentEles[contentEles.length - 1];
	var contentTop = contentEle.offsetTop;
	var eleTop = ele.offsetTop;

	console.log(height);
	console.log(eleTop);
	console.log(contentTop);
	console.log(height - eleTop- contentTop);
	ele.style.height = (height - eleTop - contentTop) + 'px';
}


module.exports = ['$scope', '$stateParams', '$ionicHistory', 'ProvidersService', ProviderDetailCtrl];