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