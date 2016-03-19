'use strict';

/**
 * @ngInject
 */
function Run($rootScope, $state, $http, AppSettings) {

    // change page title based on state

    $rootScope.$on('$stateChangeStart', function (evt, toState) {

    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        if(toState.name == "Login" && $rootScope.isLoggedIn){
            $state.go('App.Dashboard');
        }
    });

    $rootScope.$on('$stateChangeError', function (evt, toState, toParams, fromState, fromParams, rejection) {
        console.log(rejection);
        /*
         *   NOTE THAT : Maybe we need to check rejection.status_code not 'status' because the OAuth codes from server has key called 'status_code'
         *   */
        if(rejection === 'not authorized' || rejection.status_code === 401 || rejection.status === 401){
            $state.go('Login');
        }
    });

    $rootScope.$on('responseCodeHandler', function (event, response) {
        console.log(response);
        if(response.status_code === 401 || response.status === 401) {
            $rootScope.isLoggedIn = false;
            $state.go('Login');
        }
    });
}

module.exports = Run;