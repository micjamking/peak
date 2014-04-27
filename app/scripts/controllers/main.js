/* ==========================================================================
   Controller - Main
   ========================================================================== */
'use strict';

angular.module('peakApp').controller('MainCtrl', function ($scope, $rootScope, $location) {
  
  // Main Module
  $scope.main = (function(){
    
    // Setting menuItem based on location path
    if ($location.path() === '/' || $location.path() === '') {
      $rootScope.menuItem = 'overview';
    } else {
      $rootScope.menuItem = $location.path().substring(1);
    }
  
    return {};
  })();
});
