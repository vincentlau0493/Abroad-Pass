function AccountCtrl($scope, $ionicModal, AccountService, account, gradeMap) {

	$scope.account = account;
	// var gradeMap = AccountService.getGradeMap();
	var grades = $scope.account.grades;

  $scope.settings = {
    enableFriends: true
  };


  // modal service
	$ionicModal.fromTemplateUrl('templates/grade-modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.gradeModal = modal;
  });

	$scope.openGradeModal = function(type) {
		var language = gradeMap[type];
		$scope.gradeModalType = language;

		// init parts
		$scope.gradeModalType.scores = {};
		if (grades[type]) {
			$scope.gradeModalType.parts.forEach(function(part) {
				// update scores
				$scope.gradeModalType.scores[part.en] = grades[type][part.en];
			})			
		}
		
    $scope.gradeModal.show();
  };
  $scope.closeGradeModal = function() {

  	// confirm or cleanup $scope.gradeModalType.scores
    $scope.gradeModal.hide();
    // cleanup
  };
  $scope.updateScores = function() {
  	// ajax $scope.gradeModalType.scores
  	console.log($scope.gradeModalType);
  	$scope.gradeModal.hide();
  }


}

module.exports = ['$scope', '$ionicModal', 'AccountService', 'account', 'gradeMap', AccountCtrl];