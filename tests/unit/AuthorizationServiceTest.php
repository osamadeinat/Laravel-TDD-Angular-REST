<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Artisan;
use Services\Application\AuthorizationService;
use Services\Domain\User;
use Mockery as m;

class AuthorizationServiceTest extends TestCase
{
    /**
     * A test to see if the Oauth2 login works
     *
     * @return void
     */

    public function setUp(){
        parent::setUp();
    }

    public function testsIfAbleToCheckReadAccess()
    {
        $authorizationService = new AuthorizationService();

        $userMock = m::mock('Services\Domain\User');
        $userMock->shouldReceive('getAttribute')
        ->with('access_users')
        ->andReturn(1);

        $result = $authorizationService->withUser($userMock)->canRead('users');

        $this->assertTrue($result);
    }

    public function testsIfAbleToCheckWriteAccess()
    {
        $authorizationService = new AuthorizationService();

        $userMock = m::mock('Services\Domain\User');
        $userMock->shouldReceive('getAttribute')
            ->with('access_users')
            ->andReturn(2);

        $result = $authorizationService->withUser($userMock)->canWrite('users');

        $this->assertTrue($result);
    }

    public function testsIfNotAbleToWriteAccess()
    {
        $authorizationService = new AuthorizationService();

        $userMock = m::mock('Services\Domain\User');
        $userMock->shouldReceive('getAttribute')
            ->with('access_users')
            ->andReturn(1);

        $result = $authorizationService->withUser($userMock)->canWrite('users');

        $this->assertFalse($result);
    }
}
