<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Services\Infrastructure\Repositories\MockUsersRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind('Services\Infrastructure\Repositories\Contracts\UsersRepositoryInterface', MockUsersRepository::class );
    }
}
