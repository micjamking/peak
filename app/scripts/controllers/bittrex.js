/* ==========================================================================
	 Controller - Bittrex
	 ========================================================================== */
'use strict';

angular.module('peakApp').controller('BittrexCtrl', function ($scope, $interval, api) {

	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	// Market Module
	$scope.market = (function(){

		// Private Variables
		var getMarket, dataProcessing, url;

		// API Endpoint
		url = 'https://bittrex.com/api/v1/public/getmarketsummaries';

		// Private Function
		dataProcessing = function(array){
			var i, newArray = [];

			for (i = 0; i < array.length; i++) {

				if (array[i].MarketName.substr(0,3) === 'BTC') {
					array[i].MarketName = array[i].MarketName.substr(4, (array[i].MarketName.length - 1));
					array[i].High = array[i].High ? array[i].High.toFixed(8) : 0;
					array[i].Last = array[i].Last ? array[i].Last.toFixed(8) : 0;
					array[i].Low = array[i].Low ? array[i].Low.toFixed(8) : 0;
					array[i].BaseVolume = array[i].BaseVolume ? array[i].BaseVolume.toFixed(3) : 0;
					newArray.push(array[i]);
				}
			}

			// Return array
			return newArray;
		};

		// Private Function
		getMarket = function(){

			// API Call
			api.query({url:url}, {query: { method:'GET'}}, function(data){ 

				// Process response & store in $scope property
				$scope.data = dataProcessing(data.result);
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
