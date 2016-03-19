'use strict';
var controllersModule = require('./../Controllers');

/**
 * @ngInject
 */
function DashboardController($rootScope, $scope, $http, AppSettings){
    $scope.title = "APP - Dashboard";
}
controllersModule.controller('DashboardController', DashboardController);