<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class AppUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('app_users', function (Blueprint $table) {
            $table->string('id');
            $table->string('email');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('status');
            $table->boolean('suspended');
            $table->boolean('banned');
            $table->string('mobile');
            $table->string('picture_url');
            $table->string('video_url');
            $table->string('skype');
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('app_users');
    }
}
