<?php

Route::get('CertificationMaster', function()
{
    return 'CertificationMaster';
});
Route::group(['namespace'=>'Webcolorzpos\CertificationMaster\Http\Controllers','middleware' => ['web','auth']],Function()
{

//CertificationMaster
Route::get('/certification_master', 'employee\CertificationMasterController@index')->name('certification_master');
Route::post('/showcertSubcategory', 'employee\CertificationMasterController@showcertSubcategory')->name('showcertSubcategory');
Route::post('/showcertProducts', 'employee\CertificationMasterController@showcertProducts')->name('showcertProducts');
Route::post('/saveCertification', 'employee\CertificationMasterController@saveCertification')->name('saveCertification');
Route::post('/deleteCertification', 'employee\CertificationMasterController@deleteCertification')->name('deleteCertification');



});