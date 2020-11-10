<?php

namespace Webcolorzpos\Mobile_App_Api;

use Illuminate\Support\ServiceProvider;

class MobileAppApiServiceProvider extends ServiceProvider
{
    Public function boot()
    {
        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
    }
    public function register()
    {

    }



}
