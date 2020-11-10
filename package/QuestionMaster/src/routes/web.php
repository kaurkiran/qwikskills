<?php

Route::get('QuestionMaster', function()
{
    return 'QuestionMaster';
});
Route::group(['namespace'=>'Webcolorzpos\QuestionMaster\Http\Controllers','middleware' => ['web','auth']],Function()
{

    Route::get('/question_show', 'questionmaster\QuestionmasterController@index')->name('question_show');
    // Route::get('/product_data', 'product\ProductController@product_data')->name('product_data');
    // Route::get('/service_data', 'product\ProductController@service_data')->name('service_data');
    Route::post('/question_create', ['as' => 'question_create', 'uses' => 'questionmaster\QuestionmasterController@question_create']);
    // Route::post('/product_edit', ['as' => 'product_edit', 'uses' => 'product\ProductController@product_edit']);
    Route::post('/deleteQuestion', ['as' => 'deleteQuestion', 'uses' => 'questionmaster\QuestionmasterController@deleteQuestion']);

});

