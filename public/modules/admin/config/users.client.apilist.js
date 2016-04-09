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