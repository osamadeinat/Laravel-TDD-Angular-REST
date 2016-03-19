<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

use Illuminate\Support\Facades\Auth;
use LucaDegasperi\OAuth2Server\Facades\Authorizer;
use Services\Domain\User;

\Config::set('session.driver', 'array');

Route::get('/', function () {
    Blade::setContentTags('[[', ']]');
    Blade::setRawTags('[!!', '!!]');
    return view('welcome');
});

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', ['prefix' => 'api/v1'], function ($api) {

    $api->post('oauth/login',function(){
        $authorization = Authorizer::issueAccessToken();
        return Response::json($authorization);
    });

    // Administrators related routes
    $api->get('me',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\MeController@show'
        ]);
    $api->get('admins',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\AdminsController@index'
        ]);
    $api->get('admins/{id}',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\AdminsController@show'
        ]);
    $api->post('admins',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\AdminsController@create'
        ]);
    $api->put('admins/{id}',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\AdminsController@update'
        ]);
    $api->delete('admins/{id}',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\AdminsController@remove'
        ]);

    // Users routes
    $api->get('users',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\UsersController@index'
        ]);
    $api->get('users/{id}',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\UsersController@show'
        ]);
    $api->patch('users/{id}',
        [
            'middleware' => 'api.auth',
            'scopes' => ['admin'],
            'uses' => 'App\Http\Controllers\Api\UsersController@update'
        ]);
});
