'use strict';

angular.module('peakApp', [
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'chieffancypants.loadingBar',
  'mm.foundation'
]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/mintpal.html',
        controller: 'MintPalCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
