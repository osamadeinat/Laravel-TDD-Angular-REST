<?php


namespace Services\Infrastructure\Repositories;


use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Services\Domain\AppUser;
use Services\Infrastructure\Repositories\Contracts\UsersRepositoryInterface;

class MockUsersRepository implements UsersRepositoryInterface
{

    /**
     * @param int $skip
     * @param int $limit
     * @return array
     */
    public function getAll( $skip = 0, $limit = 20, $search = null)
    {
        $dbQuery = DB::table('app_users');

        if(!is_null($search)) {
            $dbQuery->where('first_name', 'like', $search . '%');
            $dbQuery->orWhere('last_name', 'like', $search . '%');
        }

        $dbQuery->skip($skip)->take($limit);

        $users = $dbQuery->get();

        $usersCollection = new Collection();

        foreach($users as $user){
            $opoUser = new AppUser($user->id,$user->first_name, $user->last_name, $user->email, $user->skype, $user->status, $user->mobile, $user->picture_url, $user->video_url, $user->banned, $user->suspended, $user->created_at, $user->updated_at);
            $usersCollection->push($opoUser);
        }

        return $usersCollection;
    }

    /**
     * @param $id
     * @return \Opo\Infrastructure\Repositories\Contracts\OpoUser
     */
    public function getOne($id)
    {
        $user = DB::table('app_users')->find($id);

        $opoUser = new AppUser($user->id,$user->first_name, $user->last_name, $user->email, $user->skype, $user->status, $user->mobile, $user->picture_url, $user->video_url, $user->banned, $user->suspended, $user->created_at, $user->updated_at);

        return $opoUser;
    }

    /**
     * @param $id
     * @return \Service\Infrastructure\Repositories\Contracts\AppUser
     */
    public function save(AppUser $user)
    {
        DB::table('app_users')
            ->where('id', $user->getId())
            ->update(
                [
                    'suspended' => $user->getSuspended(),
                    'banned' => $user->getBanned(),
                ]
            );

        return $user;
    }

    public function count($search = null)
    {
        if(is_null($search)){
            return DB::table('app_users')->count();
        }
        return DB::table('app_users')->where('first_name','like', $search . '%')->orWhere('last_name', 'like', $search . '%')->count();
    }
}