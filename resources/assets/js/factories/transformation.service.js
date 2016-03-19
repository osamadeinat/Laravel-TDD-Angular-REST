'use strict';
var Factories = require('./Factories');

/**
 * @ngInject
 */
function transformationService($rootScope, AppSettings) {

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


    this.transformSkill = function(object){
        return {
            id: object.id,
            title: object.title,
            type: object.type
        }
    };


    this.transformIndustry = function(object){
        return {
            id: object.id,
            title: object.title,
        }
    };


    this.transformLocation = function(object){
        return {
            id: object.id,
            country_code: object.country_code,
            title: object.title,
            latitude: object.latitude,
            longitude: object.longitude
        }
    };

    this.transformVideo = function(object){
        return {
            id: object.id,
            owner_id: object.owner_id,
            screen_shot: object.screen_shot,
            status: object.status,
            url: object.url
        }
    };

    this.transformFlag = function (object) {
      return {
          id: object.id,
          object_id: object.object_id,
          reason: object.reason,
          type: object.type
      }
    };

    this.transformLanguage = function (object) {
        return {
            id: object.id,
            alias: object.alias,
            title: object.title
        };
    };

    this.transformCompany = function (object) {
      return{
          id: object.id,
          name:object.name,
          owner_id:object.owner_id,
          owner_name:object.owner_name,
          status:  object.status
      };
    };

    this.transformPosition = function (object) {
       return {
            id: object.id,
            title: object.title,
            type: object.type,
            status: object.status
        };
    };

    this.transformJob = function (object) {
      return {
          id:object.id,
          owner_id: object.owner_id,
          questionaire:object.questionaire,
          status:object.status,
          summary:object.summary,
          title: object.title
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