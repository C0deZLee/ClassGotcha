'use strict';

// Configuring the Articles module
angular.module('users').run(['Menus',
    function(Menus) {
        // Add the articles dropdown item
        Menus.addMenuItem('sidebar', {
            title: 'My Account',
            iconClass: 'fa-user',
            state: 'profile',
            type: 'dropdown'
        });
        // Add the dropdown list item
        Menus.addSubMenuItem('sidebar', 'profile', {
            title: 'Settings',
            state: 'settings'
        });
        Menus.addSubMenuItem('sidebar', 'profile', {
           title: 'Profile',
           state: 'profile'
       });
    }
]);
