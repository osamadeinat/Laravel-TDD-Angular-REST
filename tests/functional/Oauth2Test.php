<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Artisan;

class Oauth2Test extends TestCase
{
    /**
     * A test to see if the Oauth2 login works
     *
     * @return void
     */

    public function setUp(){
        parent::setUp();
        Artisan::call('db:seed');
    }

    public function testAbleToAccessOauthEndpoint()
    {
       /* $this->post('/api/vi/oauth/login',
            [
                "grant_type" => "password",
                "username" => "bumstyla@gmail.com",
                "password" => "123123",
                "client_id" => "frontend",
                "client_secret" => "123123"
            ])
            ->seeJson([
                'token_type' => 'Bearer'
            ]);*/

    }
}
