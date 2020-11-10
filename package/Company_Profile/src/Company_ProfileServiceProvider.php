<?php

namespace Webcolorzpos\Company_Profile;

use Illuminate\Support\ServiceProvider;

class Company_ProfileServiceProvider extends ServiceProvider
{
    Public function boot()
    {
        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
        $this->loadViewsFrom(__DIR__. '/views','company_profile');
        $this->loadMigrationsFrom(__DIR__. '/database/migrations');



    }
    public function register()
    {

    }



}