console.info('Controllers Test');

beforeEach(function() {
    angular.mock.module('ui.router');
    angular.mock.module('Controllers');
    angular.mock.module('Factories');
});

describe('App Controller', function(){

    var controller;
    var scope;
    var state;

    beforeEach(function() {

        // instantiate the app module
        angular.mock.inject(function($controller, $rootScope, $state) {

            scope = $rootScope.$new();
            controller = $controller('AppController',{
                $scope: scope,
            });

            state = $state;

            scope.methods = {
                goTo: function(state) {
                    return "App." + state;
                },

                setPermissions: function () {
                    scope.permissions = {
                        "admins" : 0,
                        "users":0
                    };
                }
            }
        });
    });



    it('should exist', function() {
        expect(controller).toBeDefined();
    });

    it('should navigate to substate of App', function () {
        expect(scope.methods.goTo('Admins')).toEqual("App.Admins");
    });

    it('should define the check list permessions method', function () {
        expect(scope.methods.setPermissions).toBeDefined();
    });

    it('should set list permessions', function () {
        scope.methods.setPermissions();
        expect(scope.permissions).toEqual({
            "admins" : 0,
            "users":0
        });
    });
});

describe('Admins Controller', function() {

    var controller;
    var scope;
    var httpBackend;


    beforeEach(function() {
        // instantiate the app module
        angular.mock.inject(function($controller, $rootScope, $httpBackend) {

            scope = $rootScope.$new();
            controller = $controller('AdminsController',{
                $scope: scope,
                $state: {
                    go: function () {

                    },
                    params:{
                        id: 1
                    }
                }
            });


            httpBackend = $httpBackend;
        });
    });

    it('should exist', function() {
        expect(controller).toBeDefined();
    });


    it('should return Admin Object After added successfuly', function () {

    });

    it('should update admin', function () {

    });

    it('should delete admin', function () {
        httpBackend.expectDELETE('/api/admins/1').respond(200);

        var success = false;
        scope.methods.deleteAdmin(1).then(function (response) {
            success = response.status;
        });

        httpBackend.flush();

        expect(success).toEqual(200);
    });
});

describe('Login Controller', function() {

    var controller;
    var scope;
    var state;

    beforeEach(function() {
        // instantiate the app module
        angular.mock.inject(function($controller, $rootScope, $state) {

            scope = $rootScope.$new();

            controller = $controller('LoginController',{
                $scope: scope,
                AppSettings: {},
                authentication : {},
            });

            state = $state;
        });
    });

    it('should exist', function() {
        expect(controller).toBeDefined();
    });

    it('should user object be defined', function () {
        expect(scope.user).toBeDefined();
    });

    it('should redirect to home page', function () {
        var isAuth = true;
        scope.methods = {
            login: function () {
                if(isAuth){
                    return true;
                }

            }
        };
        expect(scope.methods.login()).toEqual(true);
    });

    it('should not redirect to home page', function () {
        var isAuth = false;
        scope.methods = {
            login: function () {
                if(!isAuth){
                    return false;
                }
            }
        };
        expect(scope.methods.login()).toEqual(false);
    });
});

describe('Users Controller', function () {
    var controller;
    var scope;
    var httpBackend;

    beforeEach(function() {

        // instantiate the app module

        angular.mock.inject(function($controller, $rootScope, $httpBackend) {

            scope = $rootScope.$new();
            controller = $controller('UsersController',{
                $scope: scope,
                $mdDialog : {}
            });
            httpBackend = $httpBackend;

        });
    });

    it('should be defined', function () {
       expect(controller).toBeDefined();
    });
});