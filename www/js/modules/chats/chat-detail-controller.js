function ChatDetailCtrl($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
}

module.exports = ['$scope', '$stateParams', 'Chats', ChatDetailCtrl];