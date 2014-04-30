/* ==========================================================================
   Controller - MintPal
   ========================================================================== */
'use strict';

angular.module('peakApp').controller('MintPalCtrl', function ($scope, $interval, api) {
	
	// Market Module
	$scope.market = (function(){
		
		// Private Variables
		var getMarket, dataProcessing, url;
		
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
			
			api.query({url:url}, function(data){ 

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
