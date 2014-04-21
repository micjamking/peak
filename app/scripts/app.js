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
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mintpal.html',
        controller: 'MintPalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
