<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class AdminsEndpointTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */

    public function setUp()
    {
        parent::setUp();
        Artisan::call('db:seed');
        $this->getValidAccessTokenAdmin('tambi@simpleworld.io', '123123');
    }

    public function tearDown()
    {
        $this->oauthAccessToken = null;
    }

    public function testIfNormalAdminsCantAccessEndpoint()
    {
        $this->getValidAccessTokenAdmin('bumstyla@gmail.com', '123123');

        $this->get('/api/v1/admins', [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('403');

    }

    public function testIfAbleToGetAdminsList()
    {

        $this->get('/api/v1/admins', [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfAbleToGetSingleAdmin()
    {
        $this->get('/api/v1/admins/1', [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfAbleToCreateAnAdmin()
    {
        $this->post('/api/v1/admins', [
            'email' => 'someone@somedomain.com',
            'name' => 'Someguy Somefamily',
            'permissions' => [
                'companies' => 0,
                'flags' => 1,
                'industries' => 0,
                'jobs' => 0,
                'languages' => 2,
                'locations' => 0,
                'positions' => 1,
                'skills' => 0,
                'users' => 0,
                'videos' => 0,
                'admins' => 0
            ]
        ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfAbleToCreateAnAdminWithBadEmail()
    {
        $this->post('/api/v1/admins', [
            'email' => 'someone@somedomain',
            'name' => 'Someguy Somefamily',
            'permissions' => [
                'companies' => 0,
                'flags' => 1,
                'industries' => 0,
                'jobs' => 0,
                'languages' => 2,
                'locations' => 0,
                'positions' => 1,
                'skills' => 0,
                'users' => 0,
                'videos' => 0,
                'admins' => 0
            ]
        ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('422');
    }

    public function testIfAbleToCreateAnAdminWithMissingName()
    {
        $this->post('/api/v1/admins', [
            'email' => 'someone@somedomain.com',
            'permissions' => [
                'companies' => 0,
                'flags' => 1,
                'industries' => 0,
                'jobs' => 0,
                'languages' => 2,
                'locations' => 0,
                'positions' => 1,
                'skills' => 0,
                'users' => 0,
                'videos' => 0,
                'admins' => 0
            ]
        ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('422');
    }

    public function testIfAbleToEditAnAdmin(){
        $this->put('/api/v1/admins/1', [
            'email' => 'newemail@email.com',
            'name' => 'new name',
            'permissions' => [
                'companies' => 1,
                'flags' => 1,
                'industries' => 1,
                'jobs' => 1,
                'languages' => 1,
                'locations' => 1,
                'positions' => 1,
                'skills' => 1,
                'users' => 1,
                'videos' => 1,
                'admins' => 1
            ]
        ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200')->seeInDatabase('users',['email' => 'newemail@email.com']);
    }

    public function testIfAdminCannotModifyHimself(){

        $this->getValidAccessTokenAdmin('bumstyla@gmail.com', '123123');

        $this->put('/api/v1/admins/1', [
            'email' => 'newemail@email.com',
            'name' => 'new name',
            'permissions' => [
                'companies' => 1,
                'flags' => 1,
                'industries' => 1,
                'jobs' => 1,
                'languages' => 1,
                'locations' => 1,
                'positions' => 1,
                'skills' => 1,
                'users' => 1,
                'videos' => 1,
                'admins' => 1
            ]
        ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('403');
    }

    public function testIfSuperAdminCanDeleteAnAdmin(){
        $this->delete('/api/v1/admins/1',[], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfAdminCannotDelteSuperAdmin(){

        $this->getValidAccessTokenAdmin('bumstyla@gmail.com', '123123');

        $this->delete('/api/v1/admins/2',[], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('403');
    }
}
