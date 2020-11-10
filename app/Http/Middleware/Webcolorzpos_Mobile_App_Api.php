<?php

namespace App\Http\Middleware;

use Closure;

class Webcolorzpos_Mobile_App_Api
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $acceptHeader = $request->header('Content-Type');
        $acceptAppId = $request->header('App-Id');
        $acceptAppSecret = $request->header('App-Secret');
        if ($acceptHeader != 'application/json' || $acceptAppId != config('constants.Webcolorzpos_mobile_app_id') || $acceptAppSecret != config('constants.Webcolorzpos_mobile_app_secret_id'))
        {
            return json_encode(array("Success"=>"False","Message"=>"Not A Valid Request"));
            exit;
        }

        return $next($request);
    }
}
