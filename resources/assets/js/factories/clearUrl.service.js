'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function clearUrlService() {

    this.clearUrl = function (params) {
        var url = '';
        var splitParams = params.split('&');
        //var lastItem = splitParams.length;

        _.each(splitParams, function (value, key) {

            var param = value.split('=')[1];


            if(param != ''){
                url +=  (key != 0) ? '&' + value : value;
            }
        });

        return url;
    };
}

Factories.service('clearUrlService', clearUrlService);