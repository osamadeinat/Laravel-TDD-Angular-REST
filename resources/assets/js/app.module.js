'use strict';
var angular = require('angular');
window._ = require('lodash');


//Depndancies
require('angular-animate');
require('angular-aria');
require('angular-material');
require('angular-ui-router');
require('angular-messages');
require('angular-paging');
require('angular-sanitize');
require('angular-simple-logger');
require('angular-google-maps');
require('videogular');

//APP - Modules
require('./controllers/Controllers');
require('./directives/Directives');
require('./factories/Factories');

function boot() {

    // mount on window for testing
    window.app = angular.module('app',  [
        'ngMaterial',
        'ui.router',
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        'bw.paging',
        'nemLogging',
        'uiGmapgoogle-maps',
        'Controllers',
        'Directives',
        'Factories',
    ]);

    angular.module('app').constant('AppSettings', require('./constants'));

    angular.module('app').config(require('./config'));

    angular.module('app').run(require('./run'));

    angular.bootstrap(document.body, ['app']);
}

angular.element(document).ready(boot);