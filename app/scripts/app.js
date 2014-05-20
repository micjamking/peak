/* ==========================================================================
   Angular Module definition
   ========================================================================== */
'use strict';

angular.module('peakApp', [
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'ngTouch',
  'chieffancypants.loadingBar',
  'mm.foundation',
  'LocalStorageModule',
  'kendo.directives'
])
.run(function(){
    FastClick.attach(document.body);
  })
.config(function ($routeProvider, cfpLoadingBarProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/overview.html',
        controller: 'OverviewCtrl'
      })
      .when('/mintpal', {
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
      .when('/portfolio', {
        templateUrl: 'views/portfolio.html',
        controller: 'PortfolioCtrl'
      })
      .when('/watchlist', {
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    cfpLoadingBarProvider.includeSpinner = false;
    
    localStorageServiceProvider.setPrefix('peakApp');
  });
