module.exports = angular.module('globals', [])
	.factory('LoadingService', require('./loading-service'))
	.factory('AuthenticateService', require('./authenticate-service'))
	.factory('UrlService', require('./url-service'))
	.factory('StorageService', require('./storage-service'));