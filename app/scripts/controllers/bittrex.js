/* ==========================================================================
	 Controller - Bittrex
	 ========================================================================== */
'use strict';

angular.module('peakApp').controller('BittrexCtrl', function ($scope, $http, $interval) {

	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];

	// Market Module
	$scope.market = (function(){

		// Private Variables
		var getMarket, dataProcessing, url, proxy;

		// JSON Proxy
		proxy = 'http://glacial-chamber-5485.herokuapp.com/?url=';

		// API Endpoint
		url = 'https://bittrex.com/api/v1/public/getmarketsummaries';

		// Private Function
		dataProcessing = function(array){
			var i, newArray = [];
			
			var calculateChange = function(oldVal, newVal){
				var change;
				
				oldVal = Math.round(oldVal*100000000);
				newVal = Math.round(newVal*100000000);
				
				change = ((newVal - oldVal) / oldVal) * 100;
				change = +(change.toFixed(2));
				
				return (isNaN(change) || change === Infinity ) ? 0 : change;
			};

			for (i = 0; i < array.length; i++) {

				if (array[i].MarketName.substr(0,3) === 'BTC') {
					array[i].MarketName = array[i].MarketName.substr(4, (array[i].MarketName.length - 1));
					array[i].Ask = array[i].Ask ? array[i].Ask.toFixed(8) : 0;
					array[i].Bid = array[i].Bid ? array[i].Bid.toFixed(8) : 0;
					array[i].BaseVolume = array[i].BaseVolume ? array[i].BaseVolume.toFixed(3) : 0;
					array[i].High = array[i].High ? array[i].High.toFixed(8) : 0;
					array[i].Last = array[i].Last ? array[i].Last.toFixed(8) : 0;
					array[i].Low = array[i].Low ? array[i].Low.toFixed(8) : 0;
					array[i].PrevDay = array[i].PrevDay ? array[i].PrevDay.toFixed(8) : 0;
					array[i].change = calculateChange(array[i].PrevDay, array[i].Last);
					newArray.push(array[i]);
				}
			}
			
			console.log(newArray);

			// Return array
			return newArray;
		};

		// Private Function
		getMarket = function(){

			// API Call
			$http.get(proxy + encodeURIComponent(url)).success(function(data){
				// Process response & store in $scope property
				$scope.data = dataProcessing(data.result);
				//console.log($scope.data);
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
