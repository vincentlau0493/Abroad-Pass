function UsersCtrl($scope, $state) {
  
	/**
	* Change form by current mode
	* @param {Enum} mode 
	* 	[SIGN_IN, SIGN_UP, FORGOT_PASSWORD]
	*/
  $scope.changeMode = function(mode) {
  	console.log(mode)
  	$scope.formMode = mode;
  }


  /**
   * @param  {Object} user
   */
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.dash');
  };
}

module.exports = ['$scope', '$state', UsersCtrl];