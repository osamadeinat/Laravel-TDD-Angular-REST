<?php


namespace Services\Infrastructure;


use Illuminate\Support\Facades\Auth;

class UserVerifier
{
    public function verify($username, $password)
    {
        $credentials = [
            'email'    => $username,
            'password' => $password,
        ];

        if (Auth::once($credentials)) {

            return Auth::user()->id;
        }

        return false;
    }
}