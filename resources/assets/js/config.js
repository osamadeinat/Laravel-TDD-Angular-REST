'use strict';

/**
 * @ngInject
 */
function Config($stateProvider, $urlRouterProvider, $mdThemingProvider, uiGmapGoogleMapApiProvider, AppSettings) {

    $mdThemingProvider.theme('default')
        .primaryPalette('deep-purple')
        .accentPalette('purple');


    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
    });

        $stateProvider.state('Login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: AppSettings.viewsPath + 'login/LoginTemplate.html',
            }).state('Logout', {
                url: '/login',
                controller: function ($rootScope) {
                    $rootScope.isLoggedIn = false;
                    localStorage.removeItem('permissions');
                    localStorage.removeItem('access_token');
                },
                templateUrl: AppSettings.viewsPath + 'login/LoginTemplate.html',
            }).state('App', {
                url: '/',
                controller: 'AppController',
                templateUrl: AppSettings.viewsPath + 'MainTemplate.html',
                resolve: {
                    // Since it's not a promise, it resolves immediately.
                    authenticated: function (authentication, $q) {
                        if(!authentication.isAuth()){
                            return authentication.getPermissions().then(function(){
                                if(authentication.isAuth()){
                                    return true;
                                }
                                return $q.reject('not authorized');
                            });
                        }
                        return true;
                    }
                }
            }).state('App.Dashboard', {
                url: 'dashboard',
                controller: 'DashboardController',
                templateUrl: AppSettings.viewsPath + 'dashboard/DashboardTemplate.html',
                resolve:{

                }

            }).state('App.Admins', {
                url: 'admins',
                controller: 'AdminsController',
                templateUrl: AppSettings.viewsPath + 'admins/AdminListTemplate.html',
                resolve:{
                    checkAccess: function ($rootScope, $q) {
                        return checkPermission($rootScope.permissions, 'admins', 'can-read') ? true : $q.reject('do not have permission');
                    }
                }
            }).state('App.Admin', {
                url: 'admins/{id}',
                controller: 'AdminsController',
                templateUrl: AppSettings.viewsPath + 'admins/AdminView.html',
                resolve:{
                    checkAccess: function ($rootScope, $q) {
                        return checkPermission($rootScope.permissions, 'admins', 'can-write') ? true : $q.reject('do not have permission');
                    }
                }
            }).state('App.Users', {
                url: 'users',
                controller: 'UsersController',
                templateUrl: AppSettings.viewsPath + 'users/UsersListTemplate.html',
                resolve:{
                    checkAccess: function ($rootScope, $q) {
                        return checkPermission($rootScope.permissions, 'users', 'can-read') ? true : $q.reject('do not have permission');
                    }
                }
            }).state('App.User', {
            url: 'users/{id}',
            controller: 'UsersController',
            templateUrl: AppSettings.viewsPath + 'users/UserTemplate.html',
            resolve:{
                checkAccess: function ($rootScope, $q) {
                    return checkPermission($rootScope.permissions, 'users', 'can-write') ? true : $q.reject('do not have permission');
                }
            }
        });

        $urlRouterProvider.otherwise('/');
}

function checkPermission(permissionObj, checkParam, type) {
    if(_.isUndefined(permissionObj)){
        return (JSON.parse(localStorage.getItem('permissions'))[checkParam]) ? true : false;
    }

    if(type == 'can-read'){
        return (permissionObj[checkParam] == 1 || permissionObj[checkParam] == 2 )? true : false;
    }else if(type == 'can-write'){
        return (permissionObj[checkParam] == 2 )? true : false;
    }
}

module.exports = Config;