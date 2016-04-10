'use strict';

angular.module('admin').controller('ClassroomController', ['$scope', '$http', '$q', '$timeout', 'ApiLists', 'Authentication', 'DTOptionsBuilder', 'DTColumnBuilder',
	function($scope, $http, $q, $timeout, ApiLists, Authentication, DTOptionsBuilder, DTColumnBuilder) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.apiList = ApiLists.getApiList('classroomApi');

		// change classroom data

			$scope.create = function() {
				$http.post('/api/0.1/class', $scope.data).success(function() {
						console.log("success!");
				}).error(function(err) {
					console.log(err);
				});
			};

    $scope.update = function(){
            $http.put("/api/0.1/class/" + $scope.data._id, $scope.data).success(function() {
                	console.log("success!");
            }).error(function(err) {
                console.log(err);
            });
        };

		$scope.delete = function(){
			$http.delete("/api/0.1/class/" + $scope.data._id).success(function() {
					console.log("success!");
			}).error(function(err) {
				console.log(err);
			});
		};

		$scope.clear = function() {
			$scope.data = [];
		};

		var getData = function($timeout, $q) {
		  return function() {
		    // simulated async function
		    return $q(function(resolve, reject) {
		      $timeout(function() {
		        $http.get('/api/0.1/class/all').success(function(response) {
					// If successful show success message and clear form
					$scope.success = true;
					resolve(response);
		        }).error(function(response) {
					$scope.error = response.message;
				});
		    }, 100);
		  })}
		}


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
	        DTColumnBuilder.newColumn('classCode').withTitle('Class Code'),
	        DTColumnBuilder.newColumn('category').withTitle('Category'),
	        DTColumnBuilder.newColumn('number').withTitle('Number'),
	   		DTColumnBuilder.newColumn('created').withTitle('Created'),

	    ];
	}
]);
