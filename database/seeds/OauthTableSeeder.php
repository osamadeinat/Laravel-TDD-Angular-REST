<?php

use App\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class OauthTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->truncate();
        DB::table('oauth_clients')->insert([
            'id' => 'frontend',
            'name' => 'frontend',
            'secret' => '123123',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('oauth_scopes')->truncate();
        DB::table('oauth_scopes')->insert([
                [
                    'id' => 'admin',
                    'description' => 'admin',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ],
                [
                    'id' => 'superadmin',
                    'description' => 'superadmin',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]
        ]
        );
    }
}
