/* ==========================================================================
   Controller - Portfolio
   ========================================================================== */
'use strict';

angular.module('peakApp').controller('PortfolioCtrl', function ($scope, $http, localStorageService) {
  
  // Portfolio Module
  $scope.portfolio = (function(){
    
    // Private Variables
    var TODAY     = new Date();
    var ONE_WEEK  = (60 * 60 * 24 * 7) * 1000;
    var URL       = 'https://api.mintpal.com/v1/market/summary/BTC';
    var PROXY     = 'http://glacial-chamber-5485.herokuapp.com/?url=';
    var total, holdings;
    
    var storage = {
      set: localStorageService.add,
      get: localStorageService.get,
      remove: localStorageService.remove,
      clear: localStorageService.clearAll
    };
    
    holdings = storage.get('holdings') || [];

    // Private Function
    var getMarket = function(){

        // API Call
        $http.get(PROXY + encodeURIComponent(URL)).success(function(data){

            // Process response & store in $scope property
            $scope.data = data;
            storage.set('coins', data);
            storage.set('timestamp', TODAY.getTime());
          });
      };
    
    // Private Function
    var addHolding = function() {
      holdings.push({coin:$scope.coin.code, amount:$scope.amount, cost:$scope.cost});
      storage.set('holdings', holdings);
      $scope.amount = '';
      $scope.cost = '';
    };
    
    // Private Function
    var removeHolding = function(index) {
      holdings.splice(index, 1);
      storage.set('holdings', holdings);
    };
    
    // Grab total from localStorage or set total to 0
    total = function(){
      var i, amount = 0;
      
      for (i = 0; i < holdings.length; i++){
        amount += holdings[i].amount*holdings[i].cost;
      }
      
      return amount;
    };
    
    if ((TODAY.getTime() - storage.get('timestamp')) >= ONE_WEEK) {
      getMarket();
    } else {
      $scope.data = storage.get('coins');
    }
    
    return {
      totalValue: total,
      holdings: holdings,
      addHolding: addHolding,
      removeHolding: removeHolding
    };
  })();
});