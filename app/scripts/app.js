/* ==========================================================================
   Angular Module definition
   ========================================================================== */
'use strict';

angular.module('peakApp', [
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'chieffancypants.loadingBar',
  'mm.foundation'
])
.run(function(){
    FastClick.attach(document.body);
  })
.config(function ($routeProvider, cfpLoadingBarProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mintpal.html',
        controller: 'MintPalCtrl'
      })
      .when('/cryptsy', {
        templateUrl: 'views/cryptsy.html',
        controller: 'CryptsyCtrl'
      })
      .when('/poloniex', {
        templateUrl: 'views/poloniex.html',
        controller: 'PoloniexCtrl'
      })
      .when('/bittrex', {
        templateUrl: 'views/bittrex.html',
        controller: 'BittrexCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    cfpLoadingBarProvider.includeSpinner = false;
  });
