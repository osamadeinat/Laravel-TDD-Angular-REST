<?php

namespace App\Listeners;

use App\Events\AdminCreatedEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class AdminCreatedEventListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param AdminCreatedEvent|SomeEvent $event
     * @param Log $logger
     */
    public function handle(AdminCreatedEvent $event)
    {
        Log::info('New admin added by ' . $event->user->name );
    }
}
