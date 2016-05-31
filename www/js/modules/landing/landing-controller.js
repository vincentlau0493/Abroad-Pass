// @deprecated, using userCtrl

function LandingCtrl($scope, $ionicModal, LoadingService, AuthenticateService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.fadeOut = function($event) {
  	$event.preventDefault();
  	var ele = $event.currentTarget;
  	LoadingService.fadeOutBeforeRedirect(ele);
  }

  var modalTemplatePath = 'js/modules/users/';

  // modal service: login
	$ionicModal.fromTemplateUrl(modalTemplatePath + 'user-form-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.userFormModal = modal;
  });

	$scope.openUserFormModal = function(type) {
		$scope.formMode = type;
    $scope.userFormModal.show();
  };
  $scope.closeUserFormModal = function() {
    $scope.userFormModal.hide();
  };
  $scope.signIn = function(user) {
  	console.log(user);
  }



}


module.exports = ['$scope', '$ionicModal', 'LoadingService', 'AuthenticateService', LandingCtrl];