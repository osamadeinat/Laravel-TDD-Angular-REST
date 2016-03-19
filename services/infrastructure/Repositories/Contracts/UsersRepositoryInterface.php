<?php


namespace Services\Infrastructure\Repositories\Contracts;


use Services\Domain\AppUser;

interface UsersRepositoryInterface
{
    /**
     * @param int $skip
     * @param int $limit
     * @return array(OpoUser)
     */
    public function getAll( $skip = 0, $limit = 20, $search = null);

    /**
     * @param $id
     * @return OpoUser
     */
    public function getOne( $id );

    /**
     * @param OpoUser $user
     * @return mixed
     */
    public function save( AppUser $user );

    public function count( $search = null);
}