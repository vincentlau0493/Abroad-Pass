var router = require('./router');


// -----------------------------------
// Execute Config
// -----------------------------------
var config = require('./config');


// -----------------------------------
// Execute Globals
// -----------------------------------
require('./globals/globals');


// -----------------------------------
// Execute Modules
// -----------------------------------

require('./modules/account/account');
require('./modules/applications/applications');
require('./modules/articles/articles'); // service
require('./modules/chats/chats');
require('./modules/home/home');
require('./modules/landing/landing');
require('./modules/providers/providers'); // service
require('./modules/users/users');

// -----------------------------------
// Execute Directives
// -----------------------------------
require('./directives/directives');


// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'ngStorage',
  'globals',
  'account',
  'applications',
  'articles',
  'chats',
  'landing',
  'home',
  'providers',
  'users', 
  'directives',
  ,])
.value('config', config)
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(router);
