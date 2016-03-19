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
        $this->getValidAccessTokenAdmin('osama.denat@gmail.com', '123123');
    }

    public function tearDown()
    {
        $this->oauthAccessToken = null;
    }

    public function testIfNormalAdminsCantAccessEndpoint()
    {
        $this->getValidAccessTokenAdmin('othenat@souq.com', '123123');

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
                'users' => 0,
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
                'users' => 0,
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
                'users' => 0,
                'admins' => 0
            ]
        ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('422');
    }

    public function testIfAbleToEditAnAdmin(){
        $this->put('/api/v1/admins/2', [
            'email' => 'newemail@email.com',
            'name' => 'new name',
            'permissions' => [
                'users' => 1,
                'admins' => 1
            ]
        ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200')->seeInDatabase('users',['email' => 'newemail@email.com']);
    }

    public function testIfAdminCannotModifyHimself(){

        $this->getValidAccessTokenAdmin('othenat@souq.com', '123123');

        $this->put('/api/v1/admins/1', [
            'email' => 'newemail@email.com',
            'name' => 'new name',
            'permissions' => [
                'users' => 1,
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

        $this->getValidAccessTokenAdmin('othenat@souq.com', '123123');

        $this->delete('/api/v1/admins/2',[], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('403');
    }
}
