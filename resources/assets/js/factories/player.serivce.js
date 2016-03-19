'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function playerService() {

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