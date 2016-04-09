function ArticleDetailCtrl($scope, $stateParams, $state, ArticlesService) {
	$scope.urlPrefix = $state.current.title;



	ArticlesService.get($stateParams.articleId).then(function(article){
		$scope.article = article;
	});

}

module.exports = ['$scope', '$stateParams', '$state', 'ArticlesService', ArticleDetailCtrl];