<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//api from retailcore website for save demo inquiry
   
    Route::get('/webcolorzpos_auto_backup',['as' => 'webcolorzpos_auto_backup','uses' => 'Webcolorzpos_WebsiteController@retailcore_auto_backup']);
    Route::get('/webcolorzpos_web_api',['as' => 'webcolorzpos_web_api','uses' => 'Webcolorzpos_WebsiteController@retailcore_web_api']);

