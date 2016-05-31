function Router($stateProvider, $urlRouterProvider, $httpProvider) {

  // $httpProvider.defaults.withCredentials = true;

  var templatePath = 'js/modules/';

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('landing', {
    url: '/landing-page',
    templateUrl: templatePath + 'landing/landing-page.html',
    controller: 'UsersCtrl'
  }) 

  .state('goal', {
    url: '/goal',
    templateUrl: templatePath + 'goal/goal.html',
    // controller: 'GoalCtrl'     
  }) 

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
    },
    // onEnter: function(LoadingService) {
    //   LoadingService.show();
    // }
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
  .state('tab.home-article', {
    url: '/home/articles/:articleId',
    views: {
      'tab-home': {
        templateUrl: templatePath + 'articles/article-detail.html',
        controller: 'ArticleDetailCtrl'
      }
    },
    title: 'home'
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
        controller: 'ApplicationsCtrl'
      },
      'view1@tab.applications': {
        template: 'view 1',
        // controller: 'ChatsCtrl'
      },
      'view2@tab.applications': {
        template: 'view 2',
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

  .state('tab.application-detail', {
    url: '/applications/:applicationId',
    views: {
      'tab-applications': {
        templateUrl: templatePath + 'applications/application-detail.html',
        controller: 'ApplicationDetailCtrl'
      }
    }
  })

  // Account
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: templatePath + 'account/tab-account.html',
        controller: 'AccountCtrl',
        resolve: {
          gradeMap: function(AccountService) {
            return AccountService.getGradeMap();
          },
          account: function(AccountService) {
            return AccountService.get();
          }
        }
      }
    }
  })
  .state('tab.background', {
    url: '/account/background',
    views: {
      'tab-account': {
        templateUrl: templatePath + 'account/background.html',
        controller: 'AccountCtrl',
        resolve: {
          gradeMap: function(AccountService) {
            return AccountService.getGradeMap();
          },
          account: function(AccountService) {
            return AccountService.get();
          }
        }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing-page');

}


module.exports = ['$stateProvider', '$urlRouterProvider', '$httpProvider', Router];