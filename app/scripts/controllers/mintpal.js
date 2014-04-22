/* ==========================================================================
   Controller - MintPal
   ========================================================================== */
'use strict';

angular.module('peakApp').controller('MintPalCtrl', function ($scope, $http, $interval) {
	
	// Market Module
	$scope.market = (function(){
		
		// Private Variables
		var getMarket, dataProcessing, url, proxy;
		
		// JSON Proxy
		proxy = 'http://glacial-chamber-5485.herokuapp.com/?url=';
		
		// API Endpoint
		url = 'https://api.mintpal.com/v1/market/summary/BTC';
		
		// Private Function
		dataProcessing = function(array){
			var i;
			
			// Loop through array
			for (i = 0; i < array.length; i++){
				
				// Convert 'change' string value to floating point decimal
				array[i].change = +(parseFloat(array[i].change).toFixed(2));
			}
			
			// Return array
			return array;
		};
		
		// Private Function
		getMarket = function(){
			
			// API Call
			$http.get(proxy + encodeURIComponent(url)).success(function(data){
				
				// Process response & store in $scope property
				$scope.data = dataProcessing(data);
			});
		};
		
		// Load data on page load
		getMarket();
		
		// Reload data every 60 seconds
		$interval($scope.getMarket, 60000);
		
		// Public API
		return {
			update: getMarket
		};
	})();

});
