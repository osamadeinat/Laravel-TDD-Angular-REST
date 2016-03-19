<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Services\Domain\Industry;
use Services\Domain\User;

class IndustryCreatedEvent extends Event
{
    use SerializesModels;
    /**
     * @var User
     */
    public $industry;
    public $user;

    /**
     * Create a new event instance.
     *
     * @param Industry $industry
     */
    public function __construct(Industry $industry, User $user)
    {
        //
        $this->skill = $industry;
        $this->user = $user;
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return [];
    }
}
