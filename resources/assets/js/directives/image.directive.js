'use strict';
var Directives = require('./Directives');

/**
 * @ngInject
 */
function imgDirective() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            url: '=',
            square: '='
        },
        template: '<img src="{{url}}" ng-class="{\'user-avatar\' : {{!square}}, \'video-screenshot\': {{square}} }"></img>',
        controller: function ($scope) {
            $scope.square = _.isUndefined($scope.square) ? false : $scope.square;
        }
    };
};

Directives.directive('imgDirective', imgDirective);