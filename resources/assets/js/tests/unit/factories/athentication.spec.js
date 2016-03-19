console.info('Factories Test');

var AppSettings;
beforeEach(function() {
    angular.mock.module('Factories', function ($provide) {
        AppSettings = {
            apiUrl: '/api'
        };
        $provide.value('AppSettings', AppSettings);
    });
});

describe('Authentication Factory', function() {
    var factory;
    var $httpBackend;

    beforeEach(function() {

        angular.mock.inject(function ($injector) {
            factory = $injector.get('authentication');
            $httpBackend = $injector.get('$httpBackend');

        });
    });

    it("should return authentication to be defined", function () {
        expect(factory).toBeDefined();
    });

    it("should return auth object", function () {
        $httpBackend.expectPOST('/api/oauth/login').respond({
            access_token:'',
            expires_in:'',
            refresh_token: '',
            scope:'',
            token_type:''
        });

       var authObject = {};

        factory.auth({
            email: 'sa',
            password: '123456',
            client_id: 'frontend',
            client_secret: '123123',
            grant_type:'password'
        }).then(function(response){
            authObject = response.data;
        });

        $httpBackend.flush();

        expect(authObject).toEqual({
            access_token:'',
            expires_in:'',
            refresh_token: '',
            scope:'',
            token_type:''
        });
    });

    it("should return auth status (true) if success", function () {
        $httpBackend.expectGET('/api/me').respond(
            {"data":{
                "permissions":{
                    "companies":0,
                    "flags":0,
                    "industries":0,
                    "jobs":0,
                    "languages":0,
                    "locations":0,
                    "positions":0,
                    "skills":0,
                    "users":0,
                    "videos":0
                }
            }
            });

        var permissions = {};

        factory.getPermissions().then(function(response){
            permissions = response.data;
        });

        $httpBackend.flush();

        expect(permissions).toEqual(
            {"data":{
                "permissions":{
                    "companies":0,
                    "flags":0,
                    "industries":0,
                    "jobs":0,
                    "languages":0,
                    "locations":0,
                    "positions":0,
                    "skills":0,
                    "users":0,
                    "videos":0
                }
            }
        });

    });
});

