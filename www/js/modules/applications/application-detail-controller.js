function ApplicationDetailCtrl($scope, $stateParams, $ionicPopup) {
  // $scope.application = Chats.get($stateParams.applicationId);
  
	$scope.unactivated = function($event, type) {
		$event.preventDefault();
		console.log(type);

		var alertPopup = $ionicPopup.alert({
			title: '未付费条款',
		});
	} 


	$scope.complain = function() {
	  $scope.data = {};

	  var myPopup = $ionicPopup.show({
	    template: '<input type="text" ng-model="data.complain">',
	    title: '催一下负责人',
	    subTitle: '一天一次机会，我们会保证负责人看到消息',
	    scope: $scope,
	    buttons: [
	      { text: 'Cancel' },
	      {
	        text: '<b>Save</b>',
	        type: 'button-positive',
	        onTap: function(e) {
	          if (!$scope.data.complain) {
	            e.preventDefault();
	          } else {
	            return $scope.data.complain;
	          }
	        }
	      }
	    ]
	  })

	  myPopup.then(function(res) {
	  	if (res)
	    	console.log('Tapped!', res);
	  })
	}
  
}

module.exports = ['$scope', '$stateParams', '$ionicPopup', ApplicationDetailCtrl];