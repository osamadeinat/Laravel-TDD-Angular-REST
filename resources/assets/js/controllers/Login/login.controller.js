'use strict';
var controllersModule = require('./../Controllers');

/**
 * @ngInject
 */
function LoginController($scope, $state, authentication){

    $scope.user = {
    };



    $scope.methods = {
        login: function() {
            if(!_.isUndefined($scope.user.email) && !_.isUndefined($scope.user.password)){

                authentication.auth($scope.user).success(function (response) {
                        $scope.authErrMessage = '';
                        authentication.getPermissions().then(function(){
                            return $state.go('App.Dashboard');
                        });
                }).error(function (err) {
                    $scope.authErrMessage = err;
                });
            }
        },
    };
}
controllersModule.controller('LoginController',LoginController);