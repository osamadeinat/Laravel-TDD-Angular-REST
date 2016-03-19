<?php

namespace App\Listeners;

use App\Events\AdminCreatedEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SkillCreatedEventListener
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
    public function handle(SkillCreatedEvent $event)
    {
        Log::info('New skill ' . $event->skill->title . ' added by' . $event->user->name);
    }
}
