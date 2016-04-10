'use strict';


angular.module('classrooms').controller('ClassroomController', ['$scope', '$http','Authentication',
	function($scope, $http, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.addStudent = function(){
			$http.post('/api/0.1/class/5709cb50b3baf0cc216a6d1f/students');
		}
		$scope.addPost = function() {
			$scope.showPost = true;
		}

		$scope.showSyl = function() {
			$scope.showSylModal = true;
		}
	}
]);
