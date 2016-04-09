'use strict';

angular.module('admin').controller('UserController', ['$scope', '$http', '$q', '$timeout', 'ApiLists', 'Authentication', 'DTOptionsBuilder', 'DTColumnBuilder', 'Upload',
	function($scope, $http, $q, $timeout, ApiLists, Authentication, DTOptionsBuilder, DTColumnBuilder, Upload) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.avatarImage='';
		$scope.croppedAvatarImage='';
		$scope.apiList = ApiLists.getApiList('userApi');

		// change user data
        $scope.update = function(){
            $http.put("/api/0.1/user/" + $scope.data._id, $scope.data).success(function() {
                alert("success!");
            }).error(function(err) {
                console.log(err);
            });
        };

		$scope.delete = function(){
			$http.delete("/api/0.1/user/" + $scope.data._id).success(function() {
				alert("success!");
			}).error(function(err) {
				console.log(err);
			});
		};

		$scope.clear = function() {
			$scope.data = [];
		};

		$scope.create = function() {
			$http.post('/api/0.1/user', $scope.data).success(function() {
				alert("success!");
			}).error(function(err) {
				console.log(err);
			});
		};

        $scope.uploadAvatar = function(image) {
            console.log(image);
            $scope.uploadInProgress = true;
            $scope.uploadProgress = 0;

            if (angular.isArray(image)) {
                image = image[0];
            }

            Upload.upload({
                url: '/api/v1/user/me/avatar',
                headers: {'Content-Type': 'multipart/form-data'},
                method: 'POST',
                data: {
                    file: image
                }

            }).success(function(data, status, headers, config) {
                //AlertService.success('Photo uploaded!');
				console.log("upload success!");
                $scope.$apply();
            }).error(function(err) {
                $scope.uploadInProgress = false;
				console.log("upload failed!");
				//AlertService.error('Error uploading file: ' + err.message || err);
            });
        };

		// show upload user avatar modal
		var showAvatarModal = function(image) {
			var file = image.currentTarget.files[0];
			var reader = new FileReader();
			reader.onload = function (image) {
				$scope.$apply(function($scope){
					$scope.avatarImage = image.target.result;
				});
			};
			reader.readAsDataURL(file);
		};
		angular.element(document.querySelector('#fileInput')).on('change', showAvatarModal);

		// get user database
		var getData = function($timeout, $q) {
		    return function() {
		        // simulated async function
		        return $q(function(resolve) {
		        $timeout(function() {
		            $http.get('/api/0.1/user/all').success(function(response) {
                        // If successful show success message and clear form
				  	    $scope.success = true;
				  	    resolve(response);
		            }).error(function(response) {
					    $scope.error = response.message;
				    });
                }, 100);
        })}};

		var rowCallback = function(nRow, aData) {
		    // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
		    $('td', nRow).unbind('click');
		    $('td', nRow).bind('click', function() {
		        $scope.$apply(function() {
                    $scope.data = aData;
		        });
		    });
		    return nRow;
		};

        //datatable settings
        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(getData($timeout, $q))
            .withPaginationType('full_numbers')
            .withOption('rowCallback', rowCallback);

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('_id').withTitle('ID'),
            DTColumnBuilder.newColumn('username').withTitle('Username'),
            DTColumnBuilder.newColumn('email').withTitle('Email'),
            DTColumnBuilder.newColumn('roles').withTitle('Roles'),
            DTColumnBuilder.newColumn('created').withTitle('Created')
        ];

	}
]);