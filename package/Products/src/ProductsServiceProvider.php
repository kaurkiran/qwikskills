<?php

namespace Webcolorzpos\Products;

use Illuminate\Support\ServiceProvider;

class ProductsServiceProvider extends ServiceProvider
{
    Public function boot()
    {
        $this->loadRoutesFrom(__DIR__. '/routes/web.php');
        $this->loadViewsFrom(__DIR__. '/views','products');
        $this->loadViewsFrom(__DIR__. '/views/size','size');
        $this->loadMigrationsFrom(__DIR__. '/database/migrations');
        $this->loadViewsFrom(__DIR__. '/views/productfeatures','productfeatures');

    }
}