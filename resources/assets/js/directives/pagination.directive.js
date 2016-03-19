'use strict';
/**
 * Note*******
 * This Direcitve is not used anymore ....
 * Note*******
 */


var Directives = require('./Directives');

/**
 * @ngInject
 */
function pagination() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            meta: '=',
            nextFn: '&',
            prevFn: '&',
            goFn: '&',
        },
        templateUrl: 'build/views/common/paginationTemplate.html',
        link: function ($scope, $elem, $attr) {

            $scope.pages = [];
            $scope.start = 1;
            $scope.end = 8;

            setTimeout(function () {
                $scope.pages =  $scope.meta.total;
            });

            $scope.changePage = function (index) {

                console.log($elem);
                console.log($attr);

                var isCentered = parseInt(($scope.start + $scope.end) /2);

                console.log(isCentered);
                console.log(isCentered);
                if(index + 1 >= isCentered){
                    if($scope.start + 6 < $scope.end) {
                        $scope.start += 2;
                    }
                    $scope.end += 2;

                    if($scope.end > $scope.meta.total.length){
                        $scope.end = $scope.meta.total.length;
                    }
                }

                if(index + 1 < isCentered) {
                    $scope.start -= 2;
                    $scope.end -= 2;

                    if($scope.start <= 0){
                        $scope.start = 1;
                        $scope.end = 6;
                    }
                }

                $scope.pages = [];
                for( var i = $scope.start; i <= $scope.end; i++){
                    $scope.pages.push(i);
                }
            };
        }
    };
};

Directives.directive('pagination', pagination);