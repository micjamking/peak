/* ==========================================================================
   Controller - Main
   ========================================================================== */
'use strict';

angular.module('peakApp').controller('MainCtrl', function ($scope) {
    
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];
  
  $scope.refresh = function(){
    var mintpal = angular.element(document.querySelector('.mintpal')).scope().market;
    mintpal.update();
  };
});
