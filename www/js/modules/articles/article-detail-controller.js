function ArticleDetailCtrl($scope, $stateParams, ArticlesService) {
	console.log('in');
	$scope.article = ArticlesService.get($stateParams.articleId);
	console.log($scope.article);
	
}

module.exports = ['$scope', '$stateParams', 'ArticlesService', ArticleDetailCtrl];