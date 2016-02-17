module.exports = angular.module('chats', [])
	.factory('Chats', require('./chats-service'))
	.controller('ChatsCtrl', require('./chats-controller'))
	.controller('ChatDetailCtrl', require('./chat-detail-controller'));	