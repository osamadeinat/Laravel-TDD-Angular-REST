'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function resourcesFactory($rootScope, $http, AppSettings) {
    var resource = [];
    var singleResource = {};
    var endPoint = '';

    return{
        setEndPoint: function (ep) {
            endPoint = ep;
        },

        getAll: function (metaLink) {
            return $http.get(AppSettings.apiUrl + '/' + endPoint + metaLink).success(function(response){
                resource = response.data;
            }).error(function (error) {
                $rootScope.$emit('responseCodeHandler', error);
            });
        },
        
        getOne: function (id) {
            return $http.get(AppSettings.apiUrl + '/' + endPoint + '/' + id).success(function(response){
                singleResource = response.data;
            }).error(function (error) {
                $rootScope.$emit('responseCodeHandler', error);
            });
        },

        save: function(model) {
            return $http.post(AppSettings.apiUrl + '/' + endPoint, model).success(function(response){

            }).error(function (error) {
                $rootScope.$emit('responseCodeHandler', error);
            });
        },

        update: function (model) {
            return $http.put(AppSettings.apiUrl + '/' + endPoint + '/' + model.id, model).success(function(response){

            }).error(function (error) {
                $rootScope.$emit('responseCodeHandler', error);
            });
        },

        partialUpdate: function (id, obj) {

            return $http.patch(AppSettings.apiUrl + '/' + endPoint + '/' + id , obj).success(function(response){

            }).error(function (error) {
                $rootScope.$emit('responseCodeHandler', error);
            });
        },

        delete: function (id) {
            return $http.delete(AppSettings.apiUrl + '/' + endPoint + '/' + id).success(function(response){

            }).error(function (error) {
                $rootScope.$emit('responseCodeHandler', error);
            });
        },

        getCollection: function () {
            return resource;
        },

        getModel: function () {
            return singleResource;
        }
    };
}

Factories.factory('resourcesFactory', resourcesFactory);