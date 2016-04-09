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