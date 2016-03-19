'use strict';
var controllersModule = require('./../Controllers');

/**
 * @ngInject
 */
function UsersController($rootScope, $scope, $state, AppSettings, resourcesFactory, $timeout, $mdDialog, playerService, transformationService, clearUrlService){
    $scope.title = "APP - UsersController";

    $scope.sortReverse = false;
    $scope.metaLink = AppSettings.queryParams;
    $scope.pageLimit = AppSettings.pageLimit;
    $scope.searchParam = '';
    $scope.user = {};
    $scope.users = [];
    $scope.meta = {
        currentPage: 0,
        total: 0
    };

    resourcesFactory.setEndPoint('users');


    //$scope.$on('showVideoOwner', $scope.methods.viewUser(id));



    $scope.methods = {
        getUsers: function (params) {

            return resourcesFactory.getAll(clearUrlService.clearUrl($scope.metaLink)).then(function (response) {
                $scope.users = transformationService.transformCollection(resourcesFactory.getCollection(), transformationService.transformUser);

                $scope.meta = transformationService.transform(response.data.meta);
            });
        },

        toggleStatus: function (user) {
            $timeout(function () {
                return resourcesFactory.partialUpdate(user.id, {
                    suspended: user.suspended,
                    banned: user.banned
                }).then(function (response) {

                });
            });
        },

        pagingHandler: function(text, page, pageSize, total){
            $scope.metaLink = "?skip=" + ( page *  pageSize) + "&limit=" + pageSize + $scope.searchParam ;
            this.getUsers();
        },


        search: _.debounce(function(name){
            $scope.searchParam = '&search=' + name;
            $scope.metaLink = AppSettings.queryParams + $scope.searchParam;
            this.getUsers();
        },150),

        viewUser: function (id) {
          resourcesFactory.getOne(_.isUndefined(id) ? $state.params.id : id).then(function () {
             $scope.user = resourcesFactory.getModel();
          });
        },


        //player need to set URL and remove fixed url !!
        showPlayer: function(ev, url) {
            $mdDialog.show({
                controller: function($scope, $mdDialog) {
                    $scope.player = playerService.player();

                    $scope.close = function (ev) {
                        $mdDialog.hide();
                    }
                },
                templateUrl: 'build/views/common/player.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            });
        }
    };
}

controllersModule.controller('UsersController', UsersController);