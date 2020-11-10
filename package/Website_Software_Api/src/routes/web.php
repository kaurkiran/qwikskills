<?php

Route::get('Website_Software_Api', function()
{
    return 'Website_Software_Api';
});
Route::post('/product_listing', ['as' => 'product_listing', 'uses' => 'website_software\WebsiteSoftwareController@product_listing']);
Route::get('/payment_method', ['as' => 'payment_method', 'uses' => 'website_software\WebsiteSoftwareController@payment_method']);
Route::post('/billing_requestdata', ['as' => 'billing_requestdata', 'uses' => 'website_software\WebsiteSoftwareController@billing_requestdata']);
Route::get('/states', ['as' => 'states', 'uses' => 'website_software\WebsiteSoftwareController@states']);
Route::get('/countries', ['as' => 'countries', 'uses' => 'website_software\WebsiteSoftwareController@countries']);


Route::post('/authenticate', ['as' => 'authenticate', 'uses' => 'website_software\WebsiteSoftwareController@authenticate']);
Route::post('/tables', ['as' => 'tables', 'uses' => 'website_software\WebsiteSoftwareController@tables']);
Route::get('/categories', ['as' => 'categories', 'uses' => 'website_software\WebsiteSoftwareController@categories']);


Route::post('/category_products', ['as' => 'category_products', 'uses' => 'website_software\WebsiteSoftwareController@category_products']);



