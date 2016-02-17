function AccountCtrl($scope) {
  $scope.settings = {
    enableFriends: true
  };
}

module.exports = ['$scope', AccountCtrl];