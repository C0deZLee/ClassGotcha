'use strict';

// Setting up route
angular.module('core').run(function($rootScope, $location) {
    $rootScope.location = $location;
});