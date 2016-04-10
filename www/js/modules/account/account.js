module.exports = angular.module('account', [])
	.factory('AccountService', require('./account-service'))
	.controller('AccountCtrl', require('./account-controller'));