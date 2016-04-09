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