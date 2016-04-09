module.exports = angular.module('users', ['ngAnimate'])
	.factory('UsersService', require('./users-service'))
	.controller('UsersCtrl', require('./users-controller'));