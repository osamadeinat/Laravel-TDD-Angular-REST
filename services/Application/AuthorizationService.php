<?php


namespace Services\Application;


use Services\Domain\User;

class AuthorizationService
{

    private $user = null;

    /**
     * AuthorizationService constructor.
     */
    public function __construct()
    {

    }

    public function withUser(User $user){
        if(is_null($user)){
            throw new \InvalidArgumentException();
        }
        $this->user = $user;

        return $this;
    }

    public function canRead($resource){
        $attribute = 'access_' . $resource;
        return $this->user->$attribute == 1 || $this->user->$attribute == 2;
    }

    public function canWrite($resource){
        $attribute = 'access_' . $resource;
        return $this->user->$attribute == 2;
    }
}