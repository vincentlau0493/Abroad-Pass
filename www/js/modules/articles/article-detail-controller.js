function ArticleDetailCtrl($scope, $stateParams, $state, ArticlesService, LoadingService) {
	$scope.urlPrefix = $state.current.title;

	ArticlesService.get($stateParams.articleId).then(function(article){
		$scope.article = article;
	}).finally(function(){
		LoadingService.hideSpinner(true);
	});

}

module.exports = ['$scope', '$stateParams', '$state', 'ArticlesService', 'LoadingService', ArticleDetailCtrl];