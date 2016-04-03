function ProviderDetailCtrl($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, ProvidersService) {
	var pid = $stateParams.providerId;
  $scope.provider = ProvidersService.get(pid);

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

	$ionicModal.fromTemplateUrl('templates/application-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.applicationModal = modal;
  });

	$scope.openApplicationModal = function() {		
    $scope.applicationModal.show();
  };

  $scope.closeApplicationModal = function() {

  	// confirm or cleanup $scope.gradeModalType.scores
    $scope.applicationModal.hide();
    // cleanup
  };

  $scope.sendOutRequest = function() {
	  
		var removeListener = $scope.$on('modal.hidden', function(){
			popup();
	    // Remove listener
	    removeListener();
		});

		$scope.applicationModal.hide();
  }

  function popup() {
	  var myPopup = $ionicPopup.show({
	    title: '请求已发送，请等待回应',
	    scope: $scope
	  });
	  $timeout(function() {
	     myPopup.close(); //close the popup after 2 seconds for some reason
	  }, 2000);  	
  }


}


module.exports = ['$scope', '$stateParams', '$ionicModal', '$ionicPopup', '$timeout', 'ProvidersService', ProviderDetailCtrl];