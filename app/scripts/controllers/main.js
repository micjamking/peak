'use strict';

angular.module('mintpalMarketApp').controller('MainCtrl', function ($scope, $http, $interval) {

	var url = 'https://api.mintpal.com/v1/market/summary/BTC';
	
	var dataProcessing = function(array){
		var i;

		for (i = 0; i < array.length; i++){
			array[i].change = +(parseFloat(array[i].change).toFixed(2));
		}
		
		return array;
	};

	$scope.getMarket = function(){
		$http.jsonp('http://whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=JSON_CALLBACK').success(function(data){
			$scope.data = dataProcessing(angular.fromJson(data.contents));
			//console.log(dataProcessing($scope.data));
		});
	};

	$scope.getMarket();

	$interval($scope.getMarket, 60000);

});
