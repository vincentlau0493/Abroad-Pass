module.exports = angular.module('providers', [])
	.factory('ProvidersService', require('./providers-service'))
	.controller('ProviderDetailCtrl', require('./provider-detail-controller'));