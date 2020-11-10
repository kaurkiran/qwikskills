<?php

Route::get('Mobile_App_Api', function()
{
	
    return 'Mobile_App_Api';
});
Route::post('/authenticate', ['as' => 'authenticate', 'uses' => 'mobile_app\MobileAppApiController@authenticate']);
Route::post('/customer_list', ['as' => 'customer_list', 'uses' => 'mobile_app\MobileAppApiController@customer_list']);

Route::post('/product_listing', ['as' => 'product_listing', 'uses' => 'mobile_app\MobileAppApiController@product_listing']);
Route::get('/payment_method', ['as' => 'payment_method', 'uses' => 'mobile_app\MobileAppApiController@payment_method']);
Route::get('/countries', ['as' => 'countries', 'uses' => 'mobile_app\MobileAppApiController@countries']);
Route::get('/states', ['as' => 'states', 'uses' => 'mobile_app\MobileAppApiController@states']);
Route::get('/customer_sources', ['as' => 'customer_sources', 'uses' => 'mobile_app\MobileAppApiController@customer_sources']);

Route::post('/create_customer', ['as' => 'create_customer', 'uses' => 'mobile_app\MobileAppApiController@create_customer']);
Route::post('/search_customer', ['as' => 'search_customer', 'uses' => 'mobile_app\MobileAppApiController@search_customer']);
Route::post('/search_product', ['as' => 'search_product', 'uses' => 'mobile_app\MobileAppApiController@search_product']);
Route::post('/save_customer_bill', ['as' => 'save_customer_bill', 'uses' => 'mobile_app\MobileAppApiController@save_customer_bill']);
Route::post('/search_reference', ['as' => 'search_reference', 'uses' => 'mobile_app\MobileAppApiController@search_reference']);
Route::post('/save_bill_response', ['as' => 'save_bill_response', 'uses' => 'mobile_app\MobileAppApiController@save_bill_response']);
Route::post('/customer_outstanding', ['as' => 'customer_outstanding', 'uses' => 'mobile_app\MobileAppApiController@customer_outstanding']);
Route::post('/view_bills', ['as' => 'view_bills', 'uses' => 'mobile_app\MobileAppApiController@view_bills']);
Route::post('/view_bills_data', ['as' => 'view_bills_data', 'uses' => 'mobile_app\MobileAppApiController@view_bills_data']);

Route::post('/forgot_password', ['as' => 'forgot_password', 'uses' => 'mobile_app\MobileAppApiController@forgot_password']);
Route::post('/email_bill', ['as' => 'email_bill', 'uses' => 'mobile_app\MobileAppApiController@email_bill']);
