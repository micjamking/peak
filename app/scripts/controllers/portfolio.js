/* ==========================================================================
	 Controller - Portfolio
	 ========================================================================== */
'use strict';

angular.module('peakApp').controller('PortfolioCtrl', function ($scope, $http, localStorageService, $interval) {

	// Global Module
	$scope.portfolio = (function(){
		
		// Private Variables
		var total, holdings, getMarket, addHolding, removeHolding, currencyValue;

		// Current Timestamp
		var TODAY   = new Date();
		
		// One Minute
		var ONE_MIN = 60000;
		
		// JSON Proxy
		var PROXY   = 'http://glacial-chamber-5485.herokuapp.com/?url=';
		
		// API Endpoint
		var URL     = 'https://api.mintpal.com/v1/market/summary/BTC';

		holdings = localStorageService.get('holdings') || [];

		// Get market data
		getMarket = function(){

			// Get timestamp
			var TODAY = new Date();

			// Clear localstorage for controller
			localStorageService.remove('timestamp');
			localStorageService.remove('coins');

			// Set timestamp in localstorage
			localStorageService.set('timestamp', TODAY.getTime());

			// API Call
			$http.get(PROXY + encodeURIComponent(URL)).success(function(data){

				// Process response & store in $scope property
				$scope.data = data;
				
				// Set data in localstorage
				localStorageService.set('coins', data);
			});
		};

		// Add coin holding
		addHolding = function() {
			holdings.push({coin:$scope.coin.code, amount:$scope.amount, cost:$scope.cost});
			localStorageService.set('holdings', holdings);
			$scope.amount = '';
			$scope.cost = '';
		};

		// Remove coin holding
		removeHolding = function(index) {
			holdings.splice(index, 1);
			localStorageService.set('holdings', holdings);
		};
		
		// Calculate current value
		currencyValue = function(coin){
			var i, value;

			for (i = 0; i < $scope.data.length; i++){
				if ($scope.data[i].code === coin){
					value = $scope.data[i].last_price;
				}
			}
			return value;
		};

		// Grab total from locallocalStorageService or set total to 0
		total = function(string){
			var i, amount = 0, holding, fixMath;
			
			var satoshi = function(coin){
				var fixMath = 0, value;
				
				if (string === 'cost'){
					fixMath = Math.round(coin.cost*100000000);
				} else if (string === 'gain') {
					fixMath = Math.round(currencyValue(coin.coin)*100000000);	
				}
				
				value 	= Math.round(coin.amount*fixMath);
				value 	= value/100000000;
				
				return value;	
			};

			for (i = 0; i < holdings.length; i++){
				holding = satoshi(holdings[i]);
				amount += holding;
			}


			return parseFloat(amount);
		};

		if ((TODAY.getTime() - localStorageService.get('timestamp')) >= ONE_MIN || 
			!localStorageService.get('coins')) {
			getMarket();
		} else {
			$scope.data = localStorageService.get('coins');
		}

		// Reload data every 60 seconds
		$interval(getMarket, 60000);

		return {
			totalValue: total,
			holdings: holdings,
			addHolding: addHolding,
			removeHolding: removeHolding,
			currencyValue: currencyValue
		};
	})();
});
