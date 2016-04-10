'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Welcome in INSPINIA MEAN.JS Boilerplate';
        $scope.descriptionText = 'It is an application skeleton for a typical MEAN web app. You can use it to quickly bootstrap your project.';
	

        $scope.onFileSelect = function(image) {
		  $scope.uploadInProgress = true;
		  $scope.uploadProgress = 0;

		  if (angular.isArray(image)) {
		    image = image[0];
		  }

		  $scope.upload = $upload.upload({
		    url: '/api/v1/upload/image',
		    method: 'POST',
		    data: {
		      type: 'profile'
		    },
		    file: image
		  }).progress(function(event) {
		    $scope.uploadProgress = Math.floor(event.loaded / event.total);
		    $scope.$apply();
		  }).success(function(data, status, headers, config) {
		    AlertService.success('Photo uploaded!');
		  }).error(function(err) {
		    $scope.uploadInProgress = false;
		    AlertService.error('Error uploading file: ' + err.message || err);
		  });
		};
	}


]);