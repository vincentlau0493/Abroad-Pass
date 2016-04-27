module.exports = angular.module('applications', [])
	.controller('ApplicationsCtrl', require('./applications-controller'))
	.controller('ApplicationDetailCtrl', require('./application-detail-controller'));