<?php

class MockModels {

    static public $models = [
        'user' => [
            "id" => "DFJDF-434kldfkj",
            "first_name" => "Tambi",
            "last_name"  => "Jalouqa",
            "picture_url" => "http://lorempixel.com/g/400/200/",
            "video_url" => "http://lorempixel.com/g/400/200/",
            "created_at" => "2007-03-01T13:00:00Z/2008-05-11T15:30:00Z",
            "contact_info" => [
                "email" => "tambi@simpleworld.io",
                "mobile" => "30498394839483",
                "skype" => "bumstyla"
            ]
        ],
        'admin' => [
            'id' => '34343-ff-d3434-fdfd',
            'email' => 'tambi@simpleworld.io',
            'name' => 'Tambi Jalouqa',
            'permissions' => [
                'companies' => 0,
                'flags' => 0,
                'industries' => 0,
                'jobs' => 0,
                'locations' => 0,
                'positions' => 0,
                'skills' => 0,
                'users' => 0,
                'videos' => 0,
            ],
            'type' => 'superadmin',
        ],
        'company' => [
            'id' => '324324-34-34fd-fd',
            'name' => 'Simple World for smart technology solutions',
            'owner_id' => 'dsflksdkjf-3403434-0',
            'owner_name' => 'Tambi Jalouqa'
        ],
        'skill' => [
            'id' => 's9sdf0s98d9fd',
            'status' => 'banned',
            'title' => 'PHP development',
            'type' => 'Professional'
        ]
    ];

    static public function makeModel($model){
        return self::$models[$model];
    }

    static public function makeModelCollection($model, $count = 10){
        $collection = [];
        for($i = 0; $i < $count ; $i++){
            $collection[] = self::makeModel($model);
        }
        return $collection;
    }

    static public function envelope($object){
        return [
            "data" => $object
        ];
    }
}

Route::group(['prefix' => 'api/mock/v1'],function(){

    Route::get('/', function(){
        return "OPO Admin api v1";
    });

    // Mock routes definition starts here
    Route::get('users', function() {
        return response()->json(
            MockModels::envelope( MockModels::makeModelCollection('user', 20) )
        );
    });

    Route::get('users/{id}', function(){
        return response()->json(
                MockModels::envelope( MockModels::makeModel('user'))
            );
    });

    Route::patch('users/{id}', function(){
        return response();
    });

    Route::get('admins', function() {
        return response()->json(
            MockModels::envelope( MockModels::makeModelCollection('admin', 5) )
        );
    });

    Route::get('admins/{id}', function(){
        return response()->json(
            MockModels::envelope( MockModels::makeModel('admin') )
        );
    });

    Route::post('admins', function(){
        return response();
    });

    Route::put('admins', function(){
        return response();
    });

    Route::get('companies', function() {
        return response()->json(
            MockModels::envelope( MockModels::makeModelCollection('company', 30) )
        );
    });

    Route::patch('companies/{id}', function($id){
        return response();
    });

    Route::get('skills', function() {
        return response()->json(
            MockModels::envelope( MockModels::makeModelCollection('skill', 20) )
        );
    });
});