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
