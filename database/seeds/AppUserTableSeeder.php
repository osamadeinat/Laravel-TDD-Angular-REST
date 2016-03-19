<?php

use Services\Domain\User;
use Illuminate\Database\Seeder;

class AppUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        $counter = 1;
        DB::table('app_users')->truncate();
        foreach(range(0, 200) as $user){
            DB::table('app_users')->insert([
                [
                    'id' => $counter,
                    'email' => $faker->email(),
                    'first_name' => $faker->firstName(),
                    'last_name' => $faker->lastName(),
                    'video_url' => 'http://static.videogular.com/assets/videos/videogular.mp4',
                    'picture_url' => $faker->imageUrl(100,100),
                    'skype' => $faker->word(),
                    'banned' => $faker->boolean(),
                    'suspended' => $faker->boolean(),
                    'status' => $faker->randomElement(['verified','not_verified']),
                    'mobile' => $faker->phoneNumber(),
                    'created_at' => $faker->unixTime(),
                    'updated_at' => $faker->unixTime()
                ]
            ]);
            $counter++;
        }
    }
}
