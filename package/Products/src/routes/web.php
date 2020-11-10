<?php

Route::get('Products', function()
{
    return 'Products';
});
Route::group(['namespace'=>'Webcolorzpos\Products\Http\Controllers','middleware' => ['web','auth']],Function()
{
//product and service
    Route::get('/product_show', 'product\ProductController@index')->name('product');
    Route::get('/product_data', 'product\ProductController@product_data')->name('product_data');
    Route::get('/service_data', 'product\ProductController@service_data')->name('service_data');
    Route::post('/product_create', ['as' => 'product_create', 'uses' => 'product\ProductController@product_create']);
    Route::post('/product_edit', ['as' => 'product_edit', 'uses' => 'product\ProductController@product_edit']);
    Route::post('/product_delete', ['as' => 'product_delete', 'uses' => 'product\ProductController@product_delete']);
    Route::get('/room_fetch_data', ['as' => 'room_fetch_data', 'uses' => 'product\ProductController@room_fetch_data']);
    Route::get('/product_fetch_data', ['as' => 'product_fetch_data', 'uses' => 'product\ProductController@product_fetch_data']);
    Route::post('/product_check', ['as' => 'product_check', 'uses' => 'product\ProductController@product_check']);
    Route::post('/products_update_check', ['as' => 'products_update_check', 'uses' => 'product\ProductController@products_update_check']);
    Route::post('/update_product_data', ['as' => 'update_product_data', 'uses' => 'product\ProductController@update_product_data']);
    Route::post('/inward_product_detail', ['as' => 'inward_product_detail', 'uses' => 'product\ProductController@inward_product_detail']);
    Route::post('/import_inward_product_detail', ['as' => 'import_inward_product_detail', 'uses' => 'product\ProductController@import_inward_product_detail']);
    Route::post('/product_name_search', ['as' => 'product_name_search', 'uses' => 'product\ProductController@product_name_search']);
    Route::post('/product_code_search', ['as' => 'product_code_search', 'uses' => 'product\ProductController@product_code_search']);
    Route::post('/sku_code_search', ['as' => 'sku_code_search', 'uses' => 'product\ProductController@sku_code_search']);
    Route::post('/product_barcode_search', ['as' => 'product_barcode_search', 'uses' => 'product\ProductController@product_barcode_search']);
    Route::get('/ProductremovePicture', ['as' => 'ProductremovePicture', 'uses' => 'product\ProductController@ProductremovePicture']);
    Route::get('/get_productImages', ['as' => 'get_productImages', 'uses' => 'product\ProductController@get_productImages']);

   //get system barcode.this is used when create product from inward stock
    Route::post('/getbarcode', ['as' => 'getbarcode', 'uses' => 'product\ProductController@getbarcode']);



    //product export
    Route::get('/product_export', ['as' => 'product_export', 'uses' => 'product\ProductController@product_export']);
    //products which client want to update that excel file
    Route::get('/product_update_export', ['as' => 'product_update_export', 'uses' => 'product\ProductController@product_update_export']);

    //Product DOWNLOAD EXCEL TEMPLATE
    Route::get('product_template','product\ProductController@product_template')->name('product_template');
    Route::post('import_products_check','product\ProductController@import_products_check')->name('import_products_check');
    Route::post('inward_unique_product_check','product\ProductController@inward_unique_product_check')->name('inward_unique_product_check');



    //uqc
    Route::get('/uqc_show', 'product\UqcController@index')->name('uqc');
    Route::post('/uqc_create', ['as' => 'uqc_create', 'uses' => 'product\UqcController@uqc_create']);
    Route::get('/uqc_edit', ['as' => 'uqc_edit', 'uses' => 'product\UqcController@uqc_edit']);
    Route::get('/uqc_delete', ['as' => 'uqc_delete', 'uses' => 'product\UqcController@uqc_delete']);
    //get uqc list for product module
    Route::get('/get_uqc', ['as' => 'get_uqc', 'uses' => 'product\UqcController@get_uqc']);




    //FOR GETTING DEPENDENCY RECORD OF PRODUCT
    Route::post('/product_dependency',['as' => 'product_dependency','uses' => 'product\ProductController@product_dependency']);
    //END OF GETTING DEPENDENCY RECORD OF PRODUCT


    Route::get('/product_features', ['as' => 'product_features', 'uses' => 'product\ProductFeaturesController@index']);

    //FOR ADD DYNAMIC PRODUCT FEATURES
    Route::post('/productfeatures_create', ['as' => 'product_features', 'uses' => 'product\ProductFeaturesController@productfeatures_create']);

     Route::post('/getfeatures', ['as' => 'getfeatures', 'uses' => 'product\ProductFeaturesController@getfeatures']);

    Route::get('/lowstock_report', 'product\ProductController@lowstock_report')->name('lowstock_report');
    Route::get('/search_lowstock',['as' => 'search_lowstock','uses' => 'product\ProductController@search_lowstock']);
    Route::get('/lowstock_data',['as' => 'lowstock_data','uses' => 'product\ProductController@lowstock_data']);
    Route::get('/exportlowstock_details',['as' => 'exportlowstock_details', 'uses'=> 'product\ProductController@exportlowstock_details']);

    //get parent of feature
    Route::post('/get_parent_of_feature', ['as' => 'get_parent_of_feature', 'uses' => 'product\ProductFeaturesController@get_parent_of_feature']);

    //get summery of product
   // Route::post('/product_summery', ['as' => 'product_summery', 'uses' => 'product\ProductController@product_summery']);
    Route::get('/product_summary',['as' =>'product_summary','uses'=>'product\ProductController@product_summary']);
    Route::get('/product_summary_search',['as' =>'product_summary_search','uses'=>'product\ProductController@product_summary_search']);


    //EXPORT PRODUCT SUMMARY
    Route::get('/product_summary_export', ['as' => 'product_summary_export', 'uses' => 'product\ProductController@product_summary_export']);


    Route::get('/product_summary_report', ['as' => 'product_summary_report', 'uses' => 'product\ProductController@product_summary']);
  //FOR ENTRY IN PRICE MASTER
    Route::get('/insert_product_pricemaster', ['as' => 'insert_product_pricemaster', 'uses' => 'product\ProductController@insert_product_pricemaster']);


    //SYNC PRODUCT FROM ANOTHER 3RD PARTY API DATAKART API
    Route::post('/sync_product', ['as' => 'sync_product', 'uses' => 'product\ProductController@sync_product']);

    Route::post('/check_changeover', ['as' => 'check_changeover', 'uses' => 'product\ProductFeaturesController@check_changeover']);
    Route::get('/product_features', 'product\ProductFeaturesController@product_features')->name('product_features');
    Route::post('/addEditFeature',['as' => 'addEditFeature', 'uses'=> 'product\ProductFeaturesController@addEditFeature']);
    Route::post('/EditFeaturePopup',['as' => 'EditFeaturePopup', 'uses'=> 'product\ProductFeaturesController@EditFeaturePopup']);
    Route::post('/EditSubFeaturePopup',['as' => 'EditSubFeaturePopup', 'uses'=> 'product\ProductFeaturesController@EditSubFeaturePopup']);

    Route::post('/deleteFeature',['as' => 'deleteFeature', 'uses'=> 'product\ProductFeaturesController@deleteFeature']);
    Route::post('/deleteSubFeature',['as' => 'deleteSubFeature', 'uses'=> 'product\ProductFeaturesController@deleteSubFeature']);


    Route::post('/FeatureActive',['as' => 'FeatureActive', 'uses'=> 'product\ProductFeaturesController@FeatureActive']);
    Route::post('/FeatureSubActive',['as' => 'FeatureSubActive', 'uses'=> 'product\ProductFeaturesController@FeatureSubActive']);

    Route::post('/UpdateOrdering',['as' => 'UpdateOrdering', 'uses'=> 'product\ProductFeaturesController@UpdateOrdering']);
    Route::post('/UpdateOrderingSub',['as' => 'UpdateOrderingSub', 'uses'=> 'product\ProductFeaturesController@UpdateOrderingSub']);





});

