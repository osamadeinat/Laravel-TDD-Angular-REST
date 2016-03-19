<?php


namespace Services\Infrastructure\Transformers;

use League\Fractal;
use Services\Domain\User;


class AdminTransformer extends Fractal\TransformerAbstract
{
    public function transform(User $user)
    {
        return [
            'id'     => (int) $user->id,
            'name'   => $user->name,
            'email'  => $user->email,
            'type'   => ($user->type == 0)? 'admin':'super_admin',
            'permissions' => [
                "users" => (int) $user->access_users,
                "admins" => (int) $user->access_admins
            ]
        ];
    }
}