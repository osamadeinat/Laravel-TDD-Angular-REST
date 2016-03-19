<?php

class TestCase extends Illuminate\Foundation\Testing\TestCase
{
    /**
     * The base URL to use while testing the application.
     *
     * @var string
     */
    protected $baseUrl = 'http://localhost';
    protected $oauthAccessToken;
    protected $acceptHeader = 'application/vnd.rest.v1+json';

    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../bootstrap/app.php';

        $app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

        return $app;
    }

    protected function getValidAccessTokenAdmin($username, $password){
        $response = $this->call('post','api/v1/oauth/login',
            [
                "grant_type" => "password",
                "username" => $username,
                "password" => $password,
                "client_id" => "frontend",
                "client_secret" => "123123"
            ]);

        $this->oauthAccessToken = json_decode($response->content())->access_token;
    }
}
