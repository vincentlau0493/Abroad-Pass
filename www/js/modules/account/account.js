module.exports = angular.module('account', [])
	.factory('Account', require('./account-service'))
	.controller('AccountCtrl', require('./account-controller'));