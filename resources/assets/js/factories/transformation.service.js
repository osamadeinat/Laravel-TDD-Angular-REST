'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function transformationService(AppSettings) {

    this.transform = function (metaObject) {

        return {
            currentPage  :  metaObject.current_page,
            total        :  metaObject.page_count * AppSettings.pageLimit
        };
    };

    this.transformUrl = function (url) {
        return '?' + url.split('?')[1];
    };

    this.transformAdmin = function(object){
        return {
            id: object.id,
            name: object.name,
            email: object.email,
            type: object.type,
            permissions: object.permissions
        }
    };

    this.transformUser = function(object){
        return {
            id:object.id,
            first_name: object.first_name,
            last_name:object.last_name,
            picture_url:object.picture_url,
            video_url:object.video_url,
            contact_info: {
                email: object.contact_info.email,
                mobile:object.contact_info.mobile,
                skype:object.contact_info.skype
            },
            status:object.status,
            suspended:object.suspended,
            banned:object.banned
        }
    };


    this.transformCollection = function (collection , callback) {
       var transformedCollection =  _.each(collection, function (model) {
           callback(model);
       });

        return transformedCollection;
    }
}

Factories.service('transformationService', transformationService);