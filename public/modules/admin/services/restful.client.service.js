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