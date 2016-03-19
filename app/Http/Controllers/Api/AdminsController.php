<?php


namespace App\Http\Controllers\Api;

use App\Events\AdminCreatedEvent;
use App\Http\Controllers\Controller;
use Dingo\Api\Exception\StoreResourceFailedException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Services\Application\AuthorizationService;
use Services\Domain\User;
use Dingo\Api\Routing\Helpers;
use Services\Infrastructure\Transformers\AdminTransformer;

class AdminsController extends Controller
{
    use Helpers;

    /**
     * @var AuthorizationService
     */
    private $authorization;
    private $resourceName;

    public function __construct(AuthorizationService $authorization)
    {
        $this->authorization = $authorization;
        $this->resourceName = 'admins';
    }

    public function index()
    {

        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canRead($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }
        $users = User::where('type',User::$NORMAL)->get();

        return $this->response->collection($users, new AdminTransformer, ['key' => 'data']);
    }

    public function show($id)
    {

        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canRead($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }
        $admin = User::find($id);

        if($user->type != User::$SUPER && $admin->type == User::$SUPER){
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        return $this->response->item($admin, new AdminTransformer, ['key' => 'data']);
    }

    public function create(Request $request)
    {
        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canWrite($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        $rules = [
            'email' => ['required', 'email'],
            'name' => ['required'],
            'permissions' => ['required']
        ];

        $payload = app('request')->all();

        $validator = app('validator')->make($payload, $rules);

        if ($validator->fails()) {
            throw new StoreResourceFailedException('Could not create new user.', $validator->errors());
        }

        $permissions = $request->input('permissions');

        $user = User::create([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'type' => User::$NORMAL,

            // TODO: generate a password and send it
            'password' => bcrypt('123123'),

            // Permissions
            'access_users' => (int)$permissions['users'],
            'access_admins' => (int)$permissions['admins']
        ]);

        event(new AdminCreatedEvent($user));

        return $this->response->item($user, new AdminTransformer, ['key' => 'data']);
    }

    public function update($id, Request $request)
    {
        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canWrite($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        if ($user->id == $id) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        $rules = [
            'email' => ['required', 'email'],
            'name' => ['required'],
            'permissions' => ['required']
        ];

        $payload = app('request')->all();

        $validator = app('validator')->make($payload, $rules);

        if ($validator->fails()) {
            throw new StoreResourceFailedException('Could not create new user.', $validator->errors());
        }

        $permissions = $request->input('permissions');

        $user = User::find($id);
        $user->update([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
            'type' => User::$NORMAL,

            // TODO: generate a password and send it
            'password' => bcrypt('123123'),

            // Permissions
            'access_users' => (int)$permissions['users'],
            'access_admins' => (int)$permissions['admins']
        ]);

        // Todo: create an event for admin update
        // event(new AdminCreatedEvent($user));

        return $this->response->item($user, new AdminTransformer, ['key' => 'data']);
    }

    public function remove($id)
    {

        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canWrite($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        $admin = User::find($id);

        if($user->type == User::$NORMAL){
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        $admin->delete();

        return response('',200);
    }
}