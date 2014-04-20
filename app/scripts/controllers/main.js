'use strict';

angular.module('mintpalMarketApp').controller('MainCtrl', function ($scope, $http, $interval) {
    
    var url = 'https://api.mintpal.com/v1/market/summary/BTC';
    
    $scope.getMarket = function(){
      $http.jsonp('http://whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=JSON_CALLBACK').success(function(data){
        $scope.data = angular.fromJson(data.contents);
        console.log($scope.data);
      });
    };
    
    $scope.getMarket();
    
    $interval($scope.getMarket, 60000);

});