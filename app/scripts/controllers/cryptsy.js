/* ==========================================================================
	 Controller - Cryptsy
	 ========================================================================== */
'use strict';

angular.module('peakApp').controller('CryptsyCtrl', function ($scope, $http, $interval) {

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
		url = 'http://pubapi.cryptsy.com/api.php?method=marketdatav2';

		// Private Function
		dataProcessing = function(object){
			var i, array = [];

			// Loop through object
			for (var key in object) {

				// Only Add BTC market
				if (object.hasOwnProperty(key)) {
					if (object[key].secondarycode === 'BTC') {
						array.push(object[key]);
					}
				}
			}

			for (i = 0; i < array.length; i++) {
				array[i].volume = parseFloat(array[i].volume*array[i].lasttradeprice).toFixed(3);
			}

			// Return array
			return array;
		};

		// Private Function
		getMarket = function(){

			// API Call
			$http.get(proxy + encodeURIComponent(url)).success(function(data){

				// Process response & store in $scope property
				$scope.data = dataProcessing(data.return.markets);
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
