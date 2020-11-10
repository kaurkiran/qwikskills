<?php

namespace Webcolorzpos\QuestionMaster;

use Illuminate\Support\ServiceProvider;

class QuestionMasterServiceProvider extends ServiceProvider
{
    Public function boot()
    {
        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
        $this->loadViewsFrom(__DIR__. '/views','questionmasters');
        $this->loadMigrationsFrom(__DIR__. '/database/migrations');

    }
}