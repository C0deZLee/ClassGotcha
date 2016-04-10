'use strict';


angular.module('classrooms').controller('NoteController', ['$scope', 'Authentication', 'Upload',
	function($scope, Authentication, Upload) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.onFileSelect = function(image) {
			console.log("here");
		  $scope.uploadInProgress = true;
		  $scope.uploadProgress = 0;

		  if (angular.isArray(image)) {
		    image = image[0];
		  }

		  Upload.upload({
		    url: '/api/0.1/upload/image',
		    method: 'POST',
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
		}
		  // upload later on form submit or something similar
 $scope.uploadPic = function(file) {
    file.upload =  Upload.upload({
		    url: '/api/0.1/upload/image',
		    method: 'POST',
		    file: file
		  });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
	}
]);
