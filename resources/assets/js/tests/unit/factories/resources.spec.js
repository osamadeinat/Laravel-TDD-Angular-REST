var AppSettings;
beforeEach(function() {
    angular.mock.module('Factories', function ($provide) {
        AppSettings = {
            apiUrl: '/api'
        };
        $provide.value('AppSettings', AppSettings);
    });
});

describe('Resources Factory', function() {
    var factory;
    var $httpBackend;
    var endPoint;
    var resource;
    var singleResource;

    beforeEach(function() {

        angular.mock.inject(function ($injector) {
            factory = $injector.get('resourcesFactory');
            $httpBackend = $injector.get('$httpBackend');
        });

        endPoint = 'admins';
        factory.setEndPoint('admins');
    });

    it('should return index action of resource', function () {

        $httpBackend.expectGET('/api/' + endPoint).respond([
                {
                    id: 1,
                    name: 'Test User(1)',
                    email: 'unit-test@unit.com',
                    type: 'admin',
                    permissions: {
                        "admins" : 0,
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
                },
                {
                    id: 2,
                    name: 'Test User(2)',
                    email: 'unit-test@unit.com',
                    type: 'admin',
                    permissions: {
                        "admins" : 0,
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
            ]
        );

        resource = [];

        factory.getAll('').then(function (response) {
            resource = response.data;
        });

        $httpBackend.flush();

        expect(resource).toEqual([
            {
                id: 1,
                name: 'Test User(1)',
                email: 'unit-test@unit.com',
                type: 'admin',
                permissions: {
                    "admins" : 0,
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
            },
            {
                id: 2,
                name: 'Test User(2)',
                email: 'unit-test@unit.com',
                type: 'admin',
                permissions: {
                    "admins" : 0,
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
        ]);

    });

    it('should return a single resource', function () {
        $httpBackend.expectGET('/api/' + endPoint + '/2').respond(
                {
                    id: 2,
                    name: 'Test User(2)',
                    email: 'unit-test@unit.com',
                    type: 'admin',
                    permissions: {
                        "admins" : 0,
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
        );

        singleResource = {};

        factory.getOne(2).then(function (response) {
            singleResource = response.data;
        });

        $httpBackend.flush();

        expect(singleResource).toEqual(
            {
                id: 2,
                name: 'Test User(2)',
                email: 'unit-test@unit.com',
                type: 'admin',
                permissions: {
                    "admins" : 0,
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
        );
    });

    it('should add model', function () {
        $httpBackend.expectPOST('/api/' + endPoint).respond(200, {
            id: 1,
            name: 'Test User',
            email: 'unit-test@unit.com',
            type: 'admin',
            permissions: {
                "admins" : 0,
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
        });

        var data = {};


        factory.save({
            name: 'Test User',
            email: 'unit-test@unit.com',
            type: 'admin',
            permissions: {
                "admins" : 0,
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
        }).then(function (response) {
            data = response.data;
        });

        $httpBackend.flush();

        expect(data).toEqual({
            id: 1,
            name: 'Test User',
            email: 'unit-test@unit.com',
            type: 'admin',
            permissions: {
                "admins" : 0,
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
        });
    });


    it('should update model', function () {
        $httpBackend.expectPUT('/api/' + endPoint + '/1').respond(200, {
            id: 1,
            name: 'Test User(Updated)',
            email: 'unit-test@unit.com',
            type: 'admin',
            permissions: {
                "admins" : 0,
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
        });

        var data = {};


        factory.update({
            id: 1,
            name: 'Test User(Updated)',
            email: 'unit-test@unit.com',
            type: 'admin',
            permissions: {
                "admins" : 0,
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
        }).then(function (response) {
            data = response.data;
        });

        $httpBackend.flush();

        expect(data).toEqual({
            id: 1,
            name: 'Test User(Updated)',
            email: 'unit-test@unit.com',
            type: 'admin',
            permissions: {
                "admins" : 0,
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
        });
    });

    it('should apply partial update', function () {
        $httpBackend.expectPATCH('/api/' + endPoint + '/1').respond(200);

        var success = false;

        var obj = {
            suspended: true,
            banned: false
        }


        factory.partialUpdate(1, obj).then(function (response) {
            success = response.status == 200 ? true : false;
        });

        $httpBackend.flush();

        expect(success).toEqual(true);
    });
});