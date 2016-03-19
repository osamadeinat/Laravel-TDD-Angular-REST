'use strict';
var controllersModule = require('./../Controllers');

/**
 * @ngInject
 */
function AppController($rootScope, $scope, $state){
    $scope.title = "APP - App";
    $scope.permissions = {};

    $scope.methods = {
        goTo: function (state) {
            $state.go("App." + state);
        },

        setPermissions: function () {
            $scope.permissions = $rootScope.permissions;
        }
    }
    $scope.username = $rootScope.username;
    $scope.methods.setPermissions();
}
controllersModule.controller('AppController', AppController);