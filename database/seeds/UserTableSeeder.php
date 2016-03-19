<?php

use Services\Domain\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        User::create([
            'email' => 'osama.denat@gmail.com',
            'password' => bcrypt('123123'),
            'name' => 'Osama Thenat',
            'type' => User::$SUPER,
            'access_users' => 2,
            'access_admins' => 2,
        ]);
        User::create([
            'email' => 'othenat@souq.com',
            'password' => bcrypt('123123'),
            'name' => 'Osama Thenat',
            'type' => User::$NORMAL,
            'access_users' => 2,
            'access_admins' => 2,
        ]);
    }
}
