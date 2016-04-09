'use strict';

// Setting up route
angular.module('admin').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('admin', {
			url: '/admin',
			templateUrl: 'modules/admin/views/dashboard.client.view.html'

		}).
		state('users', {
			url: '/admin/users',
			templateUrl: 'modules/admin/views/users.client.view.html',
		}).
		state('notes', {
			url: '/admin/notes',
			templateUrl: 'modules/admin/views/notes.client.view.html',
		}).
		state('classrooms', {
			url: '/admin/classrooms',
			templateUrl: 'modules/admin/views/classroom.client.view.html',
		}).
		state('professors', {
			url: '/admin/professors',
			templateUrl: 'modules/admin/views/prof.client.view.html',
		});
	}
]);  