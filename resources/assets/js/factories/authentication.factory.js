'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function authentication($rootScope, $http, AppSettings) {
    var permissions = false;
    $rootScope.isLoggedIn = false;

    return {
        auth: function(credentails){
            return $http.post(AppSettings.apiUrl + '/oauth/login', {
                client_id: 'frontend',
                client_secret: '123123',
                grant_type:'password',
                password:credentails.password,
                username: credentails.email

            }).success(function(response){
                $rootScope.isLoggedIn = true;
                localStorage.setItem('access_token', response.access_token);

                $http.defaults.headers.common.Authorization = "Bearer " + response.access_token;
            }).error(function (error) {
            });
        },

        getPermissions: function () {

            var config = (localStorage.getItem('access_token')) ?  {headers:  {
                'Authorization': "Bearer " + localStorage.getItem('access_token'),
            }
            } : {};

            return $http.get(AppSettings.apiUrl + '/me', config).success(function(response){
                localStorage.setItem('permissions', JSON.stringify(response.data.permissions));
                $rootScope.permissions = response.data.permissions;
                $rootScope.username = response.data.username;
                $rootScope.isLoggedIn = true;
                $http.defaults.headers.common.Authorization = "Bearer " + localStorage.getItem('access_token');
            }).error(function (err) {
            });
        },

        isAuth: function () {
            return $rootScope.isLoggedIn;
        }
    }
}

Factories.factory('authentication', authentication);