'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'ClassGotcha';
	var applicationModuleVendorDependencies = [
		'ngResource', 
		'ngCookies',  
		'ngAnimate',  
		'ngTouch',
		'ngSanitize',
		'ui.router', 
		'ui.bootstrap', 
		'ui.utils'
		];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') 
		window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('admin', ['datatables', 'ngFileUpload', 'ngImgCrop']);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('classrooms', []);
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('moments');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

// Configuring the Articles module
angular.module('admin').run(['Menus',
    function(Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('sidebar', {
            title: 'Dashboard',
            iconClass: 'fa-check',
            state: 'admin',
            type: 'dropdown'
        });
         Menus.addSubMenuItem('sidebar', 'admin', {
            title: 'Dashboard',
            state: 'admin'
        });
        // Add the dropdown list item
        Menus.addSubMenuItem('sidebar', 'admin', {
            title: 'Users',
            state: 'users'
        });
        // Add the dropdown list item
        Menus.addSubMenuItem('sidebar', 'admin', {
            title: 'Notes',
            state: 'notes'
        });
        // Add the dropdown list item
        Menus.addSubMenuItem('sidebar', 'admin', {
            title: 'Classrooms',
            state: 'classrooms'
        });
        // Add the dropdown list item
        Menus.addSubMenuItem('sidebar', 'admin', {
            title: 'Professors',
            state: 'professors'
        });
    }
]);

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
angular.module('admin').run(['ApiLists',
    function(ApiLists) {
    	// init the api list
    	ApiLists.addApiList('classroomApi');
		
		// add api items
		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/all',
			method: 'get',
			description: 'Get all classrooms',
			state: 'unstable',
			version: '0.1'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id',
			role: 'everyone',
			method: 'get',
			description: 'Get classroom by ID',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id/info',
			role: 'everyone',
			method: 'get',
			description: 'Get the basic info of the classroom',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id',
			method: 'put',
			description: 'Update classroom by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class',
			method: 'post',
			description: 'Create a new classroom',
			state: 'stable',
			version: '0.1'
		});
		
		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id',
			method: 'delete',
			description: 'Delete classroom by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id/students',
			role: 'user',
			method: 'get',
			description: 'Get all students of the current classroom',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id/students',
			role: 'user',
			method: 'post',
			description: 'Push a new student into the classroom',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id/notes',
			role: 'user',
			method: 'get',
			description: 'Get all notes of the current classroom',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id/notes',
			role: 'user',
			method: 'post',
			description: 'Push a new note into the classroom',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id/dues',
			role: 'user',
			method: 'get',
			description: 'Get all dues of the current classroom',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('classroomApi', {
			url: '/api/0.1/class/:id/dues',
			role: 'user',
			method: 'post',
			description: 'Push a new due into the classroom',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});
	}
]);
angular.module('admin').run(['ApiLists',
    function(ApiLists) {
    	// init the api list
    	ApiLists.addApiList('noteApi');
		
		// add api items
		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note/all',
			method: 'get',
			description: 'Get all notes',
			state: 'unstable',
			version: '0.1'
		});

		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note',
			role: 'user',
			method: 'post',
			description: 'Create a new note',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note/:id',
			role: 'everyone',
			method: 'get',
			description: 'Get note by ID',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note/:id',
			role: 'user',
			method: 'put',
			description: 'Update note by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note/:id',
			role: 'user',
			method: 'delete',
			description: 'Delete note by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note/:id/rate',
			role: 'user',
			method: 'post',
			description: 'Post a new rate',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note/:id/rate',
			role: 'everyone',
			method: 'get',
			description: 'Get note\'s rate',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('noteApi', {
			url: '/api/0.1/note/:id',
			role: 'user',
			method: 'put',
			description: 'Update note by id',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});
	}
]);
angular.module('admin').run(['ApiLists',
    function(ApiLists) {
    	// init the api list
    	ApiLists.addApiList('profApi');
		
		// add api items
		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/all',
			method: 'get',
			description: 'Get all professor',
			state: 'unstable',
			version: '0.1'
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/:id',
			role: 'everyone',
			method: 'get',
			description: 'Get prof by ID',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof',
			role: 'admin',
			method: 'post',
			description: 'Create a new professor',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/:id',
			role: 'admin',
			method: 'put',
			description: 'Update professor by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/:id',
			role: 'admin',
			method: 'delete',
			description: 'Delete a professor by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/:id/class',
			role: 'admin',
			method: 'post',
			description: 'Push a new class into prof',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/:id/class',
			role: 'admin',
			method: 'delete',
			description: 'Remove a class from professor instance',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/:id/rate',
			role: 'user',
			method: 'post',
			description: 'Push a new rate into prof',
			state: 'unstable',
			version: '0.1',
		});

		ApiLists.addApiItem('profApi', {
			url: '/api/0.1/prof/:id/rate',
			role: 'user',
			method: 'put',
			description: 'Update a rate from professor instance',
			state: 'unstable',
			version: '0.1',
		});
	}
]);
angular.module('admin').run(['ApiLists',
    function(ApiLists) {
    	// init the api list
    	ApiLists.addApiList('userApi');
		
		// add api items
		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/me',
			method: 'get',
			role: 'user',
			description: 'Get the current user\'s data',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/me/moments',
			method: 'get',
			role: 'user',
			description: 'Get the current user\'s all moments',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/me/moments/:id',
			method: 'get',
			role: 'user',
			description: 'Get the current user\'s moment by ID',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/me/notes',
			method: 'get',
			role: 'user',
			description: 'Get the current user\'s all notes',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/me/notes/:id',
			method: 'get',
			role: 'user',
			description: 'Get the current user\'s notes by ID',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/all',
			method: 'get',
			description: 'Get all user\'s data',
			state: 'deprecated',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id',
			method: 'get',
			description: 'Get the user\'s data by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id',
			method: 'put',
			description: 'Update the user\'s data by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id',
			method: 'delete',
			description: 'Delete the user\'s data by id',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user',
			method: 'post',
			description: 'Create an account on server side',
			state: 'stable',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/auth/signup',
			method: 'post',
			role: 'everyone',
			description: 'Sign up an account',
			state: 'unstable',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/auth/signin',
			method: 'post',
			role: 'everyone',
			description: 'Sign in an account',
			state: 'unstable',
			version: '0.1'
		});

		ApiLists.addApiItem('userApi', {
			url: '/auth/signout',
			method: 'get',
			role: 'user',
			description: 'Sign out',
			state: 'unstable',
			version: '0.1',
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id/moments',
			method: 'get',
			description: 'Get all moments of this account',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id/moments/:id2',
			method: 'get',
			description: 'Get a specific moment of this account by ID',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id/dues',
			method: 'get',
			description: 'Get all dues of an account',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id/dues/:id2',
			method: 'get',
			description: 'Get a specific due of this account by ID',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id/notes',
			method: 'get',
			description: 'Get all notes of an account',
			state: 'unstable',
			version: '0.1',
			implemented: 'false'
		});

		ApiLists.addApiItem('userApi', {
			url: '/api/0.1/user/:id/notes/:id2',
			method: 'get',
			description: 'Get a specific note of this account by ID',
			state: 'stable',
			version: '0.1',
			implemented: 'false'
		});
	}
]);
'use strict';

angular.module('admin').controller('ClassroomController', ['$scope', '$http', '$q', '$timeout', 'ApiLists', 'Authentication', 'DTOptionsBuilder', 'DTColumnBuilder',
	function($scope, $http, $q, $timeout, ApiLists, Authentication, DTOptionsBuilder, DTColumnBuilder) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.apiList = ApiLists.getApiList('classroomApi'); 

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

		function ClickHandler(info) {
		    $scope.data = info._id + ' - ' + info.classCode;
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
	        DTColumnBuilder.newColumn('classCode').withTitle('Class Code'),
	        DTColumnBuilder.newColumn('category').withTitle('Category'),
	        DTColumnBuilder.newColumn('number').withTitle('Number'),
	   		DTColumnBuilder.newColumn('created').withTitle('Created'),
	   
	    ];
	}
]);
'use strict';


angular.module('admin').controller('DashboardController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Welcome in INSPINIA MEAN.JS Boilerplate';
        $scope.descriptionText = 'It is an application skeleton for a typical MEAN web app. You can use it to quickly bootstrap your project.';
	}
]);
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
'use strict';

angular.module('admin').controller('ProfController', ['$scope', '$http', '$q', '$timeout', 'ApiLists', 'Authentication', 'DTOptionsBuilder', 'DTColumnBuilder',
	function($scope, $http, $q, $timeout, ApiLists, Authentication, DTOptionsBuilder, DTColumnBuilder) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.apiList = ApiLists.getApiList('profApi'); 

		var getData = function($timeout, $q) {
		  return function() {
		    // simulated async function
		    return $q(function(resolve, reject) {
		      $timeout(function() {
		        $http.get('/api/0.1/prof/all').success(function(response) {
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
		    $scope.data = info._id + ' - ' + info.Name;
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
	        DTColumnBuilder.newColumn('name').withTitle('Name'),
	        DTColumnBuilder.newColumn('department').withTitle('Department'),
	   		DTColumnBuilder.newColumn('created').withTitle('Created'),
	   
	    ];
	}
]);
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
'use strict';

angular.module('admin').service('ApiLists', [
	function () {
		//init the api list
		this.apiLists = {};
		// Validate api list existance
		this.validateApiExistance = function (apiListId) {
			if (apiListId && apiListId.length) {
				if (this.apiLists[apiListId]) {
					return true;
				} else {
					throw new Error('Api List does not exist');
				}	
			} else {
				throw new Error('Api List was not provided');
			}

			return false;
		};

		// Get the api list object by api list id
		this.getApiList = function (apiListId) {
			// Validate that the api list exists
			this.validateApiExistance(apiListId);

			// Return the api list object
			return this.apiLists[apiListId];
		};

		// Add new api list object by api list id
		this.addApiList = function (apiListId, options) {
			options = options || {};

			// Create the new api list
			this.apiLists[apiListId] = {
				items: options.items || [],
			};

			// Return the api list object
			return this.apiLists[apiListId];
		};

		// Remove existing api list object by api list id
		this.removeApiList = function (apiListId) {
			// Validate that the api list exists
			this.validateApiExistance(apiListId);

			// Return the api list object
			delete this.apiLists[apiListId];
		};

		// Add api to api list object
		this.addApiItem = function (apiListId, options) {
			options = options || {};

			// Validate that the api list exists
			this.validateApiExistance(apiListId);

			// Push new api list item
			this.apiLists[apiListId].items.push({
				url: options.url || 'None',
				// get post put delete
				method: options.method || 'None',
				description: options.description || 'None',
				// active inactive
				state: options.state || 'Inactive',
				role: options.role || 'admin',
				version: options.version || '',
				implemented :options.implemented || 'true'
			});

			// Return the api list object
			return this.apiLists[apiListId];
		};

		// Remove existing api list object by api list id
		this.removeApiItem = function (apiListId, apiItemUrl) {
			// Validate that the api list exists
			this.validateApiExistance(apiListId);

			// Search for api list item to remove
			for (var itemIndex in this.apiLists[apiListId].items) {
				if (this.apiLists[apiListId].items[itemIndex].url === apiItemUrl) {
					this.apiLists[apiListId].items.splice(itemIndex, 1);
				}
			}
			// Return the api list object
			return this.apiLists[apiListId];
		};

	}
]);
'use strict';

// Configuring the Articles module
angular.module('classrooms').run(['Menus',
    function(Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('sidebar', {
            title: 'My Classrooms',
            iconClass: 'fa-edit',
            state: 'classroom',
            type: 'dropdown'
        });
        // Add the dropdown list item
        Menus.addSubMenuItem('sidebar', 'classroom', {
            title: 'Class1',
            state: 'classroom'
        });
    }
]);

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

		});
	}
]);  
'use strict';


angular.module('classrooms').controller('DashboardController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		// Some example string
		$scope.helloText = 'Welcome in INSPINIA MEAN.JS Boilerplate';
		$scope.descriptionText = 'It is an application skeleton for a typical MEAN web app. You can use it to quickly bootstrap your project.';
	}
]);
'use strict';

// Setting up route
angular.module('core').run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.location = $location;
}]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('sidebar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Welcome in INSPINIA MEAN.JS Boilerplate';
        $scope.descriptionText = 'It is an application skeleton for a typical MEAN web app. You can use it to quickly bootstrap your project.';
	}
]);
'use strict';

//Directive used to set metisMenu and minimalize button
angular.module('core')
    .directive('sideNavigation', ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function() {
                    $timeout(function() {
                        element.metisMenu();
                    });
                });

            }
        };
    }])
    .directive('minimalizaSidebar', ["$timeout", function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: ["$scope", "$element", function ($scope, $element) {
                $scope.minimalize = function () {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            angular.element('#side-menu').fadeIn(500);
                        }, 100);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }]
        };
    }]);


'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
  function () {
    // Define a set of default roles
    this.defaultRoles = ['user', 'admin'];
    // Define the menus object
    this.menus = {};

    // A private function for rendering decision
    var shouldRender = function (user) {
      if (!!~this.roles.indexOf('*')) {
        return true;
      } else {
        if(!user) {
          return false;
        }
        for (var userRoleIndex in user.roles) {
          for (var roleIndex in this.roles) {
            if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
              return true;
            }
          }
        }
      }

      return false;
    };

    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exist');
        }
      } else {
        throw new Error('MenuId was not provided');
      }

      return false;
    };

    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      return this.menus[menuId];
    };

    // Add new menu object by menu id
    this.addMenu = function (menuId, options) {
      options = options || {};

      // Create the new menu
      this.menus[menuId] = {
        roles: options.roles || this.defaultRoles,
        items: options.items || [],
        shouldRender: shouldRender
      };

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Return the menu object
      delete this.menus[menuId];
    };

    // Add menu item object
    this.addMenuItem = function (menuId, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Push new menu item
      this.menus[menuId].items.push({
        title: options.title || '',
        state: options.state || '',
        iconClass: options.iconClass || 'fa-laptop',
        type: options.type || 'item',
        class: options.class,
        isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? true : options.isPublic),
        roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.defaultRoles : options.roles),
        position: options.position || 0,
        items: [],
        shouldRender: shouldRender
      });

      // Add submenu items
      if (options.items) {
        for (var i in options.items) {
          this.addSubMenuItem(menuId, options.state, options.items[i]);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Add submenu item object
    this.addSubMenuItem = function (menuId, parentItemState, options) {
      options = options || {};

      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === parentItemState) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: options.title || '',
            state: options.state || '',
            isPublic: ((options.isPublic === null || typeof options.isPublic === 'undefined') ? true : options.isPublic),
            roles: ((options.roles === null || typeof options.roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : options.roles),
            position: options.position || 0,
            shouldRender: shouldRender
          });
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].state === menuItemState) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemState) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);

      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].state === submenuItemState) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }

      // Return the menu object
      return this.menus[menuId];
    };

    //Adding the topbar menu
    this.addMenu('sidebar', {
      roles: ['*']
    });
  }
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) 
			$location.path('/');

		$scope.signup = function() {
			console.log($scope.credentials);
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);