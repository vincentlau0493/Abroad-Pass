function LoadingService($rootScope, $ionicLoading, $location) {
  // Setup the loader
  var obj = {};

  var loadingClassName = 'post-loading';

  obj.show = function() {
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });  	
  }
  obj.hide = function(hasPostLoad) {
	  $ionicLoading.hide();
	  if (hasPostLoad) {
	  	var eles = document.getElementsByClassName(loadingClassName);
	  	// console.log(eles);
	  	// Array.prototype.forEach.call(eles, function(ele){
	  	// 	ele.style.opacity = 1;
	  	// })
	  	angular.element(eles).css('opacity', 1);
	  }
  }


  obj.fadeOutBeforeRedirect = function(ele) {
  	var href = ele.getAttribute('href');
  	var view = document.getElementsByTagName('ion-view');
  	angular.element(view).addClass('tmp-fade-out');
  	console.log(href);
  	setTimeout(function(){
  		window.location = href;
  	}, 250);
  }


  return obj;

}



module.exports = LoadingService;