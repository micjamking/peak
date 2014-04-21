'use strict';

angular.module('mintpalMarketApp')
  .controller('NavigationCtrl', function ($scope, cfpLoadingBar) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.start = function() {
      cfpLoadingBar.start();
    };
  });