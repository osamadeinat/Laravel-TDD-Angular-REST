var AppSettings;

beforeEach(function() {
    angular.mock.module('Factories', function ($provide) {
        AppSettings = {
            apiUrl: '/api'
        };
        $provide.value('AppSettings', AppSettings);
    });
});


describe('clear url service', function() {
    var service;

    beforeEach(function () {

        angular.mock.inject(function ($injector) {
            service = $injector.get('clearUrlService');
        });
    });

    it('should clear url params', function () {
       var params = '?skip=0&limit=10&search=&filter=aa';

        expect(service.clearUrl(params)).toEqual('?skip=0&limit=10&filter=aa');
    });
});