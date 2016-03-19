'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function locationsServiceProvider($rootScope, $http) {

    this.getLocations = function () {
        return $http.get('build/json/countries.json');
    };
}

Factories.service('locationsServiceProvider', locationsServiceProvider);