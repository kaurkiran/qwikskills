<?php

namespace Webcolorzpos\Website_Software_Api;

use Illuminate\Support\ServiceProvider;

class Website_SoftwareServiceProvider extends ServiceProvider
{
    Public function boot()
    {
        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
    }
    public function register()
    {

    }



}
