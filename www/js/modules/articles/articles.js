module.exports = angular.module('articles', [])
	.factory('ArticlesService', require('./articles-service'))
	.controller('ArticlesCtrl', require('./articles-controller'))
	.controller('ArticleDetailCtrl', require('./article-detail-controller'));