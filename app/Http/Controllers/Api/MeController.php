<?php


namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Services\Domain\User;
use Dingo\Api\Routing\Helpers;
use Services\Infrastructure\Transformers\AdminTransformer;

class MeController extends Controller
{
    use Helpers;

    public function show(){

        $user = app('Dingo\Api\Auth\Auth')->user();
        $permissions = [
            'data' => [
                'username' => $user->name,
                'permissions' => [
                    "users" => (int) $user->access_users,
                    "admins" => (int) $user->access_admins,
                ]
            ]
        ];
        return \Response::json($permissions);
    }
}