'use strict';
var controllersModule = require('./../Controllers');

/**
 * @ngInject
 */
function DashboardController($scope){
    $scope.title = "APP - Dashboard";
}
controllersModule.controller('DashboardController', DashboardController);