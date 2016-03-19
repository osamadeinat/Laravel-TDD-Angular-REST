<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Artisan;
use Services\Application\AuthorizationService;
use Services\Domain\User;
use Mockery as m;

class PaginationMetaTraitTest extends TestCase
{
    /**
     * A test to see if the Oauth2 login works
     *
     * @return void
     */

    public function setUp(){
        parent::setUp();
    }

    public function testIfPaginationResultIsOk(){
        $paginationMeta = $this->getObjectForTrait('Opo\Application\PaginationMeta');
        $result = $paginationMeta->getPaginationMeta('www.google.com',100,10,10);

        $this->assertEquals([
            'next' => 'www.google.com?skip=20&limit=10',
            'previous' => 'www.google.com?skip=0&limit=10',
            'page_count' => 11,
            'current_page' => 2
        ], $result);
    }

    public function testIfPaginationResultIsOkOnOdd(){
        $paginationMeta = $this->getObjectForTrait('Opo\Application\PaginationMeta');
        $result = $paginationMeta->getPaginationMeta('www.google.com',103,13,10);

        $this->assertEquals([
            'next' => 'www.google.com?skip=23&limit=10',
            'previous' => 'www.google.com?skip=3&limit=10',
            'page_count' => 11,
            'current_page' => 2
        ], $result);
    }

    public function testIfPaginationResultIsOkOnTwentry(){
        $paginationMeta = $this->getObjectForTrait('Opo\Application\PaginationMeta');
        $result = $paginationMeta->getPaginationMeta('www.google.com',100,19,20);

        $this->assertEquals([
            'next' => 'www.google.com?skip=39&limit=20',
            'page_count' => 6,
            'current_page' => 1
        ], $result);
    }
}
