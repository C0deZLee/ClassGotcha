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
