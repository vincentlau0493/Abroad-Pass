function ApplicationsCtrl($scope) {

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
}


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

module.exports = ['$scope', ApplicationsCtrl];