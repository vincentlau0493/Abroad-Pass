function UsersCtrl($scope, $state) {
  
  // $scope.formMode = 'Sign In'; // Default mode

  $scope.changeMode = function(mode) {
  	console.log(mode)
  	$scope.formMode = mode;
  }

  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('tab.dash');
  };
}

module.exports = ['$scope', '$state', UsersCtrl];