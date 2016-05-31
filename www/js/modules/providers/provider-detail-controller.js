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
    $scope.services = getApplicationServices();
    $scope.servicesCount = $scope.services.length;
    $scope.applicationModal.show();
  };

  $scope.closeApplicationModal = function() {

  	// confirm or cleanup $scope.gradeModalType.scores
    $scope.applicationModal.hide();
    // cleanup
  };

  $scope.servicesCheckCount = function() {
    var checked = 0;
    $scope.services.forEach(function(service) {
      if (service.checked)
        checked++;
    })
    $scope.servicesCount = checked;
  }

  $scope.sendOutRequest = function() {
    
    var req = {providerId: pid};
    $scope.services.forEach(function(service){
      if (service.checked)
        req[service.id] = 1;
    })

    // application = 'http://121.42.178.246:8008/api/v1/application/generate/'
    // 5a98a977d8dfa8f7975da94299a7a900a1dcfb34
    ProvidersService.askForApplication(req).then(function(data){
      console.log('success');
      console.log(data);

      popup();
    }, function(data){

      console.log('error');
      console.log(data);

    }).finally(function(){

      $scope.applicationModal.hide();

    });


  }

  function popup() {
	  var myPopup = $ionicPopup.show({
	    title: '请求已发送，请等待回应',
      subTitle: '可以在<b>申请管理</b>查看状态',
	    scope: $scope
	  });
	  $timeout(function() {
	     myPopup.close(); //close the popup after 2 seconds for some reason
	  }, 2000);  	
  }


}

function getApplicationServices() {

  var obj = [{
    text: '简历',
    checked: true,
    id: 'resumeapply'
  }, {
    text: '文书',
    checked: true,
    id: 'materialapply'
  }, {
    text: '签证',
    checked: true,
    id: 'visaapply'
  }, {
    text: '住房服务',
    checked: true,
    id: 'houseticketapply'
  }];

  return obj;
}




module.exports = ['$scope', '$stateParams', '$http', '$ionicModal', '$ionicPopup', '$timeout', 'ProvidersService', 'LoadingService', ProviderDetailCtrl];