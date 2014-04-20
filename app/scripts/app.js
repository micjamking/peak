'use strict';

angular.module('mintpalMarketApp', [
  'ngResource',
  'ngRoute',
  'ngAnimate',
  'chieffancypants.loadingBar',
  'mm.foundation'
]).config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
