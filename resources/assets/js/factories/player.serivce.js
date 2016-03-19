'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function playerService($rootScope) {

    this.player = function (url) {
        return {
            sources: [
                {
                    src: url,
                    type: "video/mp4"
                }
            ],

            theme: "../../css/videogular.min.css",
        };
    }
}

Factories.service('playerService', playerService);