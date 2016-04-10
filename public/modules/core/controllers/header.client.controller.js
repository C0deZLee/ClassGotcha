'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$http','Authentication', 'Menus',
	function($scope, $http, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('sidebar');
		
		// get weather data
		var weather_url = 'http://apidev.accuweather.com/currentconditions/v1/335315?apikey=c3e7df4f2d6a40698cc75fac1b6a2c83';	
		$http.get(weather_url).then(function(response){
			$scope.weather_data = response.data[0];
		});

		var location_url = 'http://apidev.accuweather.com/locations/v1/cities/geoposition.json?q=40.854512,-77.855623&apikey=c3e7df4f2d6a40698cc75fac1b6a2c83';	
		$http.get(location_url).then(function(response){
			$scope.location_data = response.data;
		});

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		
			
		}
	
]);