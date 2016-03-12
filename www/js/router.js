function Router($stateProvider, $urlRouterProvider) {

  var templatePath = 'js/modules/';

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('signin', {
    url: '/user-form',
    templateUrl: templatePath + 'users/user-form.html',
    controller: 'UsersCtrl'     
  })


  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: templatePath + 'tabs/tabs.html'
  })

  // Each tab has its own nav history stack:
  // Home
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: templatePath + 'home/tab-home.html',
        controller: 'HomeCtrl'
      },
    }
  })
  .state('tab.home-provider-profile', {
    url: '/home/providers/:providerId',
    views: {
      'tab-home': {
        templateUrl: templatePath + 'providers/provider-profile.html',
        controller: 'ProviderDetailCtrl'
      }
    }
  })


  // Chat
  .state('tab.chats', {
    url: '/chats',
    views: {
      'tab-chats': {
        templateUrl: templatePath + 'chats/tab-chats.html',
        controller: 'ChatsCtrl'
      }
    }
  })
  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: templatePath + 'chats/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })


  // Applications
  .state('tab.applications', {
    url: '/applications',
    views: {
      'tab-applications': {
        templateUrl: templatePath + 'applications/tab-applications.html',
        // controller: 'ChatsCtrl'
      }
    }
  })
  .state('tab.applications-provider-profile', {
    url: '/applications/providers/:providerId',
    views: {
      'tab-applications': {
        templateUrl: templatePath + 'providers/provider-profile.html',
        controller: 'ProviderDetailCtrl'
      }
    }
  })

  // Account
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: templatePath + 'account/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/user-form');

}


module.exports = ['$stateProvider', '$urlRouterProvider', Router];