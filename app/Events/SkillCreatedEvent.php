<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Services\Domain\Skill;
use Services\Domain\User;

class SkillCreatedEvent extends Event
{
    use SerializesModels;
    /**
     * @var User
     */
    public $skill;
    public $user;

    /**
     * Create a new event instance.
     *
     * @param Skill $skill
     */
    public function __construct(Skill $skill, User $user)
    {
        //
        $this->skill = $skill;
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
