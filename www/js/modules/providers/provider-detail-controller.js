function ProviderDetailCtrl($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, ProvidersService) {
	var pid = $stateParams.providerId;

  ProvidersService.get(pid).then(function(provider){
    $scope.provider = provider;
  });

  // $ionicConfigProvider.backButton.previousTitleText(false)

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