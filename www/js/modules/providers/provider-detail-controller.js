function ProviderDetailCtrl($scope, $stateParams, $http, $ionicModal, $ionicPopup, $timeout, ProvidersService, LoadingService) {
	var pid = $stateParams.providerId;

  ProvidersService.get(pid).then(function(provider){
    $scope.provider = provider;
  }).finally(function(){
    // maybe we should keep this spinner when failure
    LoadingService.hideSpinner(true);
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

    // application = 'http://121.42.178.246:8008/api/v1/application/generate/'
    // 5a98a977d8dfa8f7975da94299a7a900a1dcfb34
    var data1 = {providerId:11}

    var req = {
      method: 'post',
      url: 'http://121.42.178.246:8008/api/v1/application/generate/?api_key=5a98a977d8dfa8f7975da94299a7a900a1dcfb34&username=liujiayu',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data1 // {'username':'liujiayu1','password':'abc123'}
    }
    $http(req).then(function(data){
      console.log('success');
      console.log(data);
    }, function(data){
      console.log('error');
      console.log(data);
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


module.exports = ['$scope', '$stateParams', '$http', '$ionicModal', '$ionicPopup', '$timeout', 'ProvidersService', 'LoadingService', ProviderDetailCtrl];