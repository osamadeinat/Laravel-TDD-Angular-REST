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
use Services\Application\PaginationMeta;
use Services\Domain\User;
use Dingo\Api\Routing\Helpers;
use Services\Infrastructure\Transformers\AdminTransformer;
use Services\Infrastructure\Repositories\Contracts\UsersRepositoryInterface;
use Services\Infrastructure\Transformers\UserTransformer;

class UsersController extends Controller
{
    use Helpers;
    use PaginationMeta;

    /**
     * @var AuthorizationService
     */
    private $authorization;
    private $resourceName;
    private $usersRepo;

    public function __construct(AuthorizationService $authorization, UsersRepositoryInterface $usersRepository)
    {
        $this->authorization = $authorization;
        $this->resourceName = 'users';

        $this->usersRepo = $usersRepository;
    }

    public function index(Request $request)
    {

        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canRead($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        $skip = $request->input('skip',0);
        $limit = $request->input('limit',20);

        $search = $request->input('search',null);

        $users = $this->usersRepo->getAll($skip, $limit, $search);
        $count = $this->usersRepo->count( $search );

        $meta = $this->getPaginationMeta($request->url(), $count, $skip, $limit);

        return $this->response->collection($users, new UserTransformer, ['key' => 'data'])->setMeta($meta);
    }

    public function show($id, Request $request)
    {

        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canRead($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        $user = $this->usersRepo->getOne($id);

        return $this->response->item($user, new UserTransformer, ['key' => 'data']);
    }

    public function update($id, Request $request)
    {
        $user = app('Dingo\Api\Auth\Auth')->user();
        if (!$this->authorization->withUser($user)->canWrite($this->resourceName)) {
            throw new \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
        }

        $user = $this->usersRepo->getOne($id);

        if($request->has('suspended') && $request->input('suspended') == true){
            $user->suspend();
        }
        if($request->has('suspended') && $request->input('suspended') == false){
            $user->unsuspend();
        }
        if($request->has('banned') && $request->input('banned') == true){
            $user->ban();
        }
        if($request->has('banned') && $request->input('banned') == false){
            $user->unban();
        }

        $updatedUser = $this->usersRepo->save($user);

        return $this->response->item($updatedUser, new UserTransformer, ['key' => 'data']);
    }
}