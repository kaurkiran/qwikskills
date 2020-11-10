<?php

namespace Webcolorzpos\CertificationMaster;

use Illuminate\Support\ServiceProvider;

class CertificationMasterServiceProvider extends ServiceProvider
{
    Public function boot()
    {
        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
        $this->loadViewsFrom(__DIR__. '/views','certification');
        $this->loadMigrationsFrom(__DIR__. '/database/migrations');
    }

}