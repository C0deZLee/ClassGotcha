'use strict';

angular.module('admin').controller('NoteController', ['$scope', '$http', '$q', '$timeout', 'ApiLists', 'Authentication', 'DTOptionsBuilder', 'DTColumnBuilder',
	function($scope, $http, $q, $timeout, ApiLists, Authentication, DTOptionsBuilder, DTColumnBuilder) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.apiList = ApiLists.getApiList('noteApi'); 

		var getData = function($timeout, $q) {
		  return function() {
		    // simulated async function
		    return $q(function(resolve, reject) {
		      $timeout(function() {
		        $http.get('/api/0.1/notes/all').success(function(response) {
					// If successful show success message and clear form
					$scope.success = true;
					resolve(response);
		        }).error(function(response) {
					$scope.error = response.message;
				});
		    }, 100);
		  })}
		}

		function ClickHandler(info) {
		    $scope.data = info._id + ' - ' + info.username;
		}
		function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
		    // Unbind first in order to avoid any duplicate handler (see https://github.com/l-lin/angular-datatables/issues/87)
		    $('td', nRow).unbind('click');
		    $('td', nRow).bind('click', function() {
		        $scope.$apply(function() {
		            $scope.someClickHandler(aData);
		        });
		    });
		    return nRow;
		}

		$scope.someClickHandler = ClickHandler;
		//datatable settings
	    $scope.dtOptions = DTOptionsBuilder.fromFnPromise(getData($timeout, $q))
	        .withPaginationType('full_numbers')
	        .withOption('rowCallback', rowCallback);
	    $scope.dtColumns = [
	        DTColumnBuilder.newColumn('_id').withTitle('ID'),
	        DTColumnBuilder.newColumn('title').withTitle('Title'),
	        DTColumnBuilder.newColumn('type').withTitle('Type'),
	        DTColumnBuilder.newColumn('author').withTitle('Author'),
	   		DTColumnBuilder.newColumn('created').withTitle('Created'),
	   
	    ];
	}
]);