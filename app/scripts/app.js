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
      .otherwise({
        redirectTo: '/'
      });

    cfpLoadingBarProvider.includeSpinner = false;
  });
