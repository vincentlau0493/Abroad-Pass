function UsersCtrl($scope, $state, $ionicModal, LoadingService) {
  
  $scope.form = {
    SIGN_IN: {
      title: '登录',
      rightButton: '注册',
    },
    SIGN_UP: {
      title: '注册',
      rightButton: '登录',
    },    
  }

  $scope.fadeOut = function($event) {
    $event.preventDefault();
    var ele = $event.currentTarget;
    LoadingService.fadeOutBeforeRedirect(ele);
  }

  var modalTemplatePath = 'js/modules/users/';

  // modal service: login and register
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

	/**
	* Change form by current mode
	* @param {Enum} mode 
	* 	[SIGN_IN, SIGN_UP, FORGOT_PASSWORD]
	*/
  $scope.changeMode = function(mode) {
  	$scope.formMode = mode;
  }

  $scope.toggleMode = function() {
    var curMode = $scope.formMode;
    if (curMode == 'SIGN_IN')
      $scope.formMode = 'SIGN_UP';
    else
      $scope.formMode = 'SIGN_IN';
  }

  /**
   * @param  {Object} user
   */
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    // $state.go('tab.dash');
  }

  $scope.signUp = function(user) {
    console.log('Sign-Up', user);
    // $state.go('tab.dash');
  }

  $ionicModal.fromTemplateUrl(modalTemplatePath + 'provider-background-modal.html', {
    scope: $scope,
    animation: 'animated slideInRight',
    hideDelay:500
  }).then(function(modal) {
    $scope.backgroundModal = modal;
  });


  $scope.NextStepForProvider = function(user) {
    if (!user.isProvider)
      console.error('It is a bug.');
    // caching (maybe not ready to save to database)
    // open next step modal

    $scope.backgroundModal.show();
    // $scope.openBackgroundModal = function() {
    //   $scope.formMode = type;
    //   $scope.userFormModal.show();
    // };
    // $scope.closeUserFormModal = function() {
    //   $scope.userFormModal.hide();
    // };
  }


}

module.exports = ['$scope', '$state', '$ionicModal', 'LoadingService', UsersCtrl];