var AppSettings;

beforeEach(function() {
    angular.mock.module('Factories', function ($provide) {
        AppSettings = {
            apiUrl: '/api'
        };
        $provide.value('AppSettings', AppSettings);
    });
});


describe('player service', function() {
    var service;

    beforeEach(function () {

        angular.mock.inject(function ($injector) {
            service = $injector.get('playerService');
        });
    });
});