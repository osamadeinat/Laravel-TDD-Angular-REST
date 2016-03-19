'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function collectionOpreations() {

    return{
        appendToCollection: function (collection, model) {
            collection.push(model);
            return collection;
        },

        //This method need to refactor in the best way possible
        updateModel: function (collection, model) {
            var existModel = _.find(collection, function(item) {
                return item.id === model.id
            });

            if(existModel){
                existModel = model;
                this.removeModel(collection, model.id);
                return this.appendToCollection(collection, model);
            }
        },

        removeModel: function (collection, id) {
            _.remove(collection, function(model) {
                return model.id === id;
            });

            return collection;
        },

        sortCollection: function (collection) {
          var sortedCollection =   _.sortBy(collection, function(model) {
                return [model.id];
          });

            return sortedCollection;
        },

        findBy: function (collection, key, value) {
          var object =  _.find(collection, function(model) {
                return model[key] == value;
            });

            return object;
        }
    };
}

Factories.factory('collectionOpreations', collectionOpreations);