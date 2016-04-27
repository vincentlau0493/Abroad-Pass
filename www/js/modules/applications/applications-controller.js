function ApplicationsCtrl($scope, $ionicModal) {


	var applications = [{
		id: 0,
		provider: {
			name: 'jiaxing',
			headline: '皇家学院建筑系',
			avatar: 'img/ben.png'
		},
		create_date: '2天前',
		status: '等待接收中',
		has_new_status: false,
	}, {
		id: 1,
		provider: {
			name: 'hiqiang',
			headline: '皇家学院装逼系',
			avatar: 'img/adam.jpg'
		},
		create_date: '2天前',
		status: '正在书写简历',
		has_new_status: true,
	}, {
		id: 2,
		provider: {
			name: 'haiyan',
			headline: '皇家学院装逼系',
			avatar: 'img/max.png'
		},
		create_date: '2天前',
		status: '已完成',
		has_new_status: false,
	}];

	$scope.applications = applications;


	$scope.urlPrefix = 'applications';


	// slide
	var tabButtonBar = document.getElementsByClassName('tab-button-bar');
	var $tabButtonBar = angular.element(tabButtonBar);

	$scope.switchSlide = function($event) {
		// console.log($event.target);
		var ele = $event.target;
		var tab = ele.attributes['data-tab-btn'].value;
		
		var tar = document.getElementById(tab + '-slide-btn');
		// console.log(tar);
		angular.element(tar).addClass('active').triggerHandler('click');
		window.ele = angular.element(tar);

	}
  $scope.onSlideMove = function(data) {
		switchActiveBtn($tabButtonBar, data.index);
	}


	// Goal Modal
	$scope.fillGoal = function() {
		var goalModalTemplatePath = 'js/modules/users/';
    var promise = $ionicModal.fromTemplateUrl(goalModalTemplatePath + 'goals.html', {
	                  scope: $scope,
	                });
    fillInGoals($scope, promise);
  }

} // ApplicationCtrl

function switchActiveBtn($container, index) {
	var $btns = $container.children();
	Array.prototype.forEach.call($btns, function(btn, i){
		var $btn = angular.element(btn);
		if ($btn.hasClass('active')) {
			$btn.removeClass('active')
		}
		if (i == index) {
			$btn.addClass('active')
		}
	})
}

// goal modal
function fillInGoals($scope, promise) {
  promise.then(function(modal){
    $scope.goalModal = modal;
    $scope.hasCloseBtn = true;
    $scope.currentStep = 1; // init step
    $scope.goals = {};

    // set default
    $scope.goals.country = 'A';

    modal.show();
  })

  var totalSteps = 4;

  $scope.nextStep = function() {
    console.log($scope.goals); // save
    $scope.currentStep++;
  }

  $scope.previousStep = function() {
    if ($scope.currentStep > 1)
      $scope.currentStep--;
  }

  $scope.close = function() {
    $scope.goalModal.hide()
  }

  $scope.confirm = function() {
    // save
    $scope.goalModal.hide();
  }

}



module.exports = ['$scope', '$ionicModal', ApplicationsCtrl];