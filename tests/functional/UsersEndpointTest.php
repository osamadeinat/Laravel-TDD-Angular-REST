<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class UsersEndpointTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */

    public function setUp(){
        parent::setup();
        Artisan::call('db:seed');
        $this->getValidAccessTokenAdmin('tambi@simpleworld.io', '123123');
    }

    public function tearDown(){
        $this->oauthAccessToken = null;
    }

    public function testIfAbleToGetUsersList()
    {
        $this->get('/api/v1/users', [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfAbleToSingleUser()
    {
        $this->get('/api/v1/users/1', [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfAbleToBanAUser()
    {
        $this->patch('/api/v1/users/1',[ 'banned' => true ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfAbleToSuspendAUser()
    {
        $this->patch('/api/v1/users/1',[ 'suspended' => true ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('200');
    }

    public function testIfUserWithoutAccessCantEditUser()
    {
        $this->getValidAccessTokenAdmin('bumstyla@gmail.com', '123123');

        $this->patch('/api/v1/users/1',[ 'suspended' => true ], [
            'Authorization' => 'Bearer ' . $this->oauthAccessToken,
            'Accept' => $this->acceptHeader,
        ])->seeStatusCode('403');
    }
}
