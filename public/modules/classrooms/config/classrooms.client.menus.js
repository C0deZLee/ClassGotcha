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

        Menus.addSubMenuItem('sidebar', 'classroom', {
            title: 'MATH 230',
            state: 'classroom'
        });

      //   for(class in $scope.user.classroom){
      //     // Add the dropdown list item
      //     Menus.addSubMenuItem('sidebar', 'classroom', {
      //         title: 'MATH 230',
      //         state: 'classroom'
      //     });
      // }
    }
]);
