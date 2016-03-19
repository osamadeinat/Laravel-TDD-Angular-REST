var AppSettings;

beforeEach(function() {
    angular.mock.module('Factories', function ($provide) {
        AppSettings = {
            apiUrl: '/api'
        };
        $provide.value('AppSettings', AppSettings);
    });
});


describe('transformation service', function() {
    var service;

    beforeEach(function () {

        angular.mock.inject(function ($injector) {
            service = $injector.get('transformationService');
        });
    });

    it('should transform the meta object', function () {
        var metaObject = {
            current_page: 1,
            page_count: 3
        };

        expect(service.transform(metaObject)).toEqual({
            currentPage: 1,
            total: 30 * AppSettings.pageLimit
        });
    });

    it('should transform Admin object', function () {
       var Object = {
           id: 1,
           name: 'Admin',
           email :'admin@simpleworld.io',
           type : 'admin',
           permissions: {
               "admins" : 0,
               "companies":0,
               "flags":0,
               "industries":0,
               "jobs":0,
               "languages":0,
               "locations":0,
               "positions":0,
               "skills":0,
               "users":0,
               "videos":0
           }
       };

        expect(service.transformAdmin(Object)).toEqual({
            id: 1,
            name: 'Admin',
            email :'admin@simpleworld.io',
            type : 'admin',
            permissions: {
                "admins" : 0,
                "companies":0,
                "flags":0,
                "industries":0,
                "jobs":0,
                "languages":0,
                "locations":0,
                "positions":0,
                "skills":0,
                "users":0,
                "videos":0
            }
        });
    });

    it('should transform user object', function () {
        var Object = {
            id:"5ec819e3-63a8-3152-a7e3-1ad67306f7d3",
            first_name:"Hilton",
            last_name:"Gleichner",
            picture_url:"http://lorempixel.com/100/100/?87560",
            video_url:"http://static.videogular.com/assets/videos/videogular.mp4",
            contact_info:{
                email:"miller92@gmail.com",
                mobile:"(550)865-4824x538",
                skype:"eos"
            },
            status:"verified",
            suspended:true,
            banned:false,
            created_at:"1037348498",
            updated_at:"518207953"
        }

        expect(service.transformUser(Object)).toEqual({
            id:"5ec819e3-63a8-3152-a7e3-1ad67306f7d3",
            first_name:"Hilton",
            last_name:"Gleichner",
            picture_url:"http://lorempixel.com/100/100/?87560",
            video_url:"http://static.videogular.com/assets/videos/videogular.mp4",
            contact_info:{
                email:"miller92@gmail.com",
                mobile:"(550)865-4824x538",
                skype:"eos"
            },
            status:"verified",
            suspended:true,
            banned:false
        });
    });

    it('should transform Skill object', function () {
        var Object = {
            id: 1,
            title: 'TDD',
            type: 'Technology'
        };

        expect(service.transformSkill(Object)).toEqual({
            id: 1,
            title: 'TDD',
            type: 'Technology'
        });
    });

    it('should transform Industry object', function () {
        var Object = {
            id: 1,
            title: 'Software',
        };

        expect(service.transformIndustry(Object)).toEqual({
            id: 1,
            title: 'Software',
        });
    });

    it('should transform location object', function () {
        var Object = {
            id: 1,
            country_code: 'JO',
            title: 'Amman',
            latitude: 30.2123213,
            longitude: 32.2123213213
        };

        expect(service.transformLocation(Object)).toEqual({
            id: 1,
            country_code: 'JO',
            title: 'Amman',
            latitude: 30.2123213,
            longitude: 32.2123213213
        });
    });

    it('should transform video object', function () {
        var Object = {
            id: 1,
            owner_id: 33,
            screen_shot: '/img/1.png',
            status: 'banned',
            url: 'path/s3/videos/test.mp4'
        };

        expect(service.transformVideo(Object)).toEqual({
            id: 1,
            owner_id: 33,
            screen_shot: '/img/1.png',
            status: 'banned',
            url: 'path/s3/videos/test.mp4'
        });
    });

    it('should transform flag object', function () {
        var Object = {
            id: 1,
            object_id: 33,
            reason: 'reason',
            type: 'user'
        };

        expect(service.transformFlag(Object)).toEqual({
            id: 1,
            object_id: 33,
            reason: 'reason',
            type: 'user'
        });
    });

    it('should transform language object', function () {
        var Object = {
            id: 1,
            alias: 'eng',
            title: 'English'
        };

        expect(service.transformLanguage(Object)).toEqual({
            id: 1,
            alias: 'eng',
            title: 'English'
        });
    });


    it('should transform company object', function () {
        var Object = {
            id: 1,
            name:'Simple World Ltd.',
            owner_id:4,
            owner_name:'Baker Sartawi',
            status:  'active'
        };

        expect(service.transformCompany(Object)).toEqual({
            id: 1,
            name:'Simple World Ltd.',
            owner_id:4,
            owner_name:'Baker Sartawi',
            status:  'active'
        });
    });


    it('should transform position object', function () {
        var Object = {
            id: 1,
            title: 'CEO',
            type: 'Managment',
            status: 'approved'
        };

        expect(service.transformPosition(Object)).toEqual({
            id: 1,
            title: 'CEO',
            type: 'Managment',
            status: 'approved'
        });
    });

    it('should transform job object', function () {
        var Object = {
            id:1,
            owner_id: 44,
            questionaire:
                [
                    {
                        answers:
                            ['answer #1', 'answer #2'],
                        question: 'Quastion #1',
                        type: 'Yes/No'
                    }],
            status:'banned',
            summary:'Summary',
            title: 'JOB #1'
        };

        expect(service.transformJob(Object)).toEqual({
            id:1,
            owner_id: 44,
            questionaire:
                [
                    {
                        answers:
                            ['answer #1', 'answer #2'],
                        question: 'Quastion #1',
                        type: 'Yes/No'
                    }],
            status:'banned',
            summary:'Summary',
            title: 'JOB #1'
        });
    });

    it('should transform collection', function () {

        var collection = [{
                id: 1,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            },
            {
                id: 2,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            },
            {
                id: 3,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            },
            {
                id: 4,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            }];

        expect(service.transformCollection(collection, service.transformLocation)).toEqual([{
                id: 1,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            },
            {
                id: 2,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            },
            {
                id: 3,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            },
            {
                id: 4,
                country_code: 'JO',
                title: 'Amman',
                latitude: 30.2123213,
                longitude: 32.2123213213
            }]);
    });
});