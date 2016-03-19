<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Services\Domain\User;

class AddSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:createadmin {email} {password} {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new superadmin';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        User::create([
            'email' => $this->argument('email'),
            'password' => bcrypt($this->argument('password')),
            'name' => $this->argument('name'),
            'type' => User::$SUPER,

            'access_users' => 2,
            'access_admins' => 2
        ]);
        $this->info(sprintf("Admin created with email %s and password %s and name '%s'", $this->argument('email'), $this->argument('password'), $this->argument('name')));
    }
}
