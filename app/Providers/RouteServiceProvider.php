<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/home';
    protected $namespace = 'App\Http\Controllers';
    protected $webcolorzpos_website = 'App\Http\Controllers\API';
    protected $webcolorzpos_website_software = 'Webcolorzpos\Website_Software_Api\Http\Controllers';
    protected $mobile_app_api = 'Webcolorzpos\Mobile_App_Api\Http\Controllers';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {

        parent::boot();
        // $this->configureRateLimiting();

        // $this->routes(function () {
        //     Route::prefix('api')
        //         ->middleware('api')
        //         ->namespace($this->namespace)
        //         ->group(base_path('routes/api.php'));

        //     Route::middleware('web')
        //         ->namespace($this->namespace)
        //         ->group(base_path('routes/web.php'));
        // });
    }
     protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    // protected function configureRateLimiting()
    // {
    //     RateLimiter::for('api', function (Request $request) {
    //         return Limit::perMinute(60);
    //     });
    // }
    /* protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }*/

     protected function mapApiRoutes()
     {
       
        Route::prefix('webcolorzpos_website_api')->middleware('webcolorzpos_website_api')->namespace($this->webcolorzpos_website)->group(base_path('routes/api.php'));
        Route::prefix('website_software_api')->middleware('website_software_api')->namespace($this->webcolorzpos_website_software)->group(base_path('package/Website_Software_Api/src/routes/web.php'));
        Route::prefix('mobile_app_api')->middleware('mobile_app_api')->namespace($this->mobile_app_api)->group(base_path('package/Mobile_App_Api/src/routes/web.php'));
    }
}
