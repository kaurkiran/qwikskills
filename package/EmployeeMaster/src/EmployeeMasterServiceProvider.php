<?php

namespace Webcolorzpos\EmployeeMaster;

use Illuminate\Support\ServiceProvider;

class EmployeeMasterServiceProvider extends ServiceProvider
{
    Public function boot()
    {
        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
        $this->loadViewsFrom(__DIR__. '/views','employee');
        $this->loadMigrationsFrom(__DIR__. '/database/migrations');
    }

}