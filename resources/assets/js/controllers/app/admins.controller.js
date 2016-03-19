'use strict';
var controllersModule = require('./../Controllers');

/**
 * @ngInject
 */
function AdminsController($rootScope, $scope, $http, $state, resourcesFactory, transformationService, AppSettings){

    $scope.title = "APP - Admins";

    $scope.admins = [];
    $scope.sortReverse = false;
    $scope.permissions = $rootScope.permissions;

    $scope.adminId = $state.params.id;


    $scope.admin ={
        name: '',
        email: '',
        type: '',
        permissions: {
            "admins" : 0,
            "users":0,
        }
    };

    resourcesFactory.setEndPoint('admins');

    $scope.methods = {
        getAdmins: function () {
            return resourcesFactory.getAll('').then(function(response){
                $scope.admins = transformationService.transformCollection(resourcesFactory.getCollection(), transformationService.transformAdmin);
            });
        },

        navigateToAdmin: function (id) {
            if(_.isUndefined(id)){
                return $state.go('App.Admin');
            }
            return $state.go('App.Admin',{
                'id': id
            });
        },
        getAdmin: function () {
            if($scope.adminId != ''){
                return resourcesFactory.getOne($scope.adminId).then(function(response){
                    $scope.admin = resourcesFactory.getModel();
                });
            }
            return false;
        },

        saveAdmin: function (id) {
            if(_.isUndefined(id)){
                return resourcesFactory.save($scope.admin);
            }
            else{
                return resourcesFactory.update($scope.admin);
            }
        },


        deleteAdmin: function (id) {
            return resourcesFactory.delete(id);
        }
    };
}
controllersModule.controller('AdminsController', AdminsController);