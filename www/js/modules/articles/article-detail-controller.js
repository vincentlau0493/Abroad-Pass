function ArticleDetailCtrl($scope, $stateParams, $state, ArticlesService) {
	$scope.urlPrefix = $state.current.title;

	$scope.article = ArticlesService.get($stateParams.articleId);
	console.log($scope.article);

}

module.exports = ['$scope', '$stateParams', '$state', 'ArticlesService', ArticleDetailCtrl];