var AppSettings;
beforeEach(function() {
    angular.mock.module('Factories', function ($provide) {
        AppSettings = {
            apiUrl: '/api'
        };
        $provide.value('AppSettings', AppSettings);
    });
});

describe('collectionOpreations Factory', function() {
    var factory;

    beforeEach(function() {

        angular.mock.inject(function ($injector) {
            factory = $injector.get('collectionOpreations');
        });
    });

    it('should add model into origin array', function () {
        var collection = [
            {
                id: 1
            }
        ];

        var model = {
            id: 2
        };

        expect(factory.appendToCollection(collection, model)).toEqual([
            {
                id: 1
            },
            {
                id: 2
            }
        ]);
    });

    it('should update collection and exiting model', function () {
        var collection = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        var model = {
            id: 2,
            newAttr : 'Updated'
        };

        expect(factory.updateModel(collection, model)).toEqual([
            {
                id: 1
            },
            {
                id: 2,
                newAttr : 'Updated'
            }
        ]);
    });

    it('should delete model from collection', function () {
        var collection = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        var model = {
            id: 2
        };

        expect(factory.removeModel(collection, model.id)).toEqual([
            {
                id: 1
            }
        ]);
    });

    it('should sort a collection', function () {
       var collection = [
           {
               id: 2
           },
           {
               id:3
           },
           {
               id: 4
           },
           {
               id :1
           }
       ];

        expect(factory.sortCollection(collection)).toEqual([
            {
                id: 1
            },
            {
                id:2
            },
            {
                id: 3
            },
            {
                id :4
            }
        ]);
    });

    it('should search using key / value', function () {
        var collection = [
            {
                id: 2,
                name: 'Test2'
            },
            {
                id:3,
                name: 'Test3'
            },
            {
                id: 4,
                name: 'Test4'
            },
            {
                id :1,
                name: 'Test1'
            }
        ];

        expect(factory.findBy(collection, 'name', 'Test4')).toEqual({
            id: 4,
            name: 'Test4'
        });
    });
});