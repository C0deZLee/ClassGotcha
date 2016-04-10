'use strict';

// Setting up route
angular.module('classrooms').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('classroom', {
			url: '/classroom',
			templateUrl: 'modules/classrooms/views/classrooms.client.view.html'

		}).
		state('c_notes',{
			url:'/classroom/notes',
			templateUrl:'modules/classrooms/views/notes.client.view.html'
		});
	}
]);  