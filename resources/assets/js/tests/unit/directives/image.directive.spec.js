console.info('Directives Test')
beforeEach(function() {
    angular.mock.module('Directives');
});
describe('directive: Image Directive', function() {
    var element, scope;

    beforeEach(angular.mock.inject(function($rootScope, $compile) {
        scope = $rootScope.$new();

        element = '<img ng-class="{\'user-avatar\' : {{!square}}, \'video-screenshot\': {{square}} }" src="{{url}}"></img>';

        scope.url = '/img/unit-test.jpg';
        scope.square = true;

        element = $compile(element)(scope);
        scope.$digest();
    }));

    it('should have scope to be defined', function() {
        expect(scope).toBeDefined();
    });

    it('should set url to src attr', function () {
       expect(scope.url).toEqual('/img/unit-test.jpg');
    });
});