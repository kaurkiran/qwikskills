<?php

Route::get('Company_Profile', function()
{
    return 'Company_Profile';
});
Route::group(['namespace'=>'Webcolorzpos\Company_Profile\Http\Controllers','middleware' => ['web','auth']],Function()
{
//COMPANY PROFILE
    Route::get('/company_profile', 'company_profile\CompanyProfileController@index')->name('company_profile');
    Route::post('/company_profile_create', ['as' => 'company_profile_create', 'uses' => 'company_profile\CompanyProfileController@company_profile_create']);
   // Route::post('/software_configuration_create', ['as' => 'software_configuration_create', 'uses' => 'company_profile\CompanyProfileController@software_configuration_create']);
   // Route::post('/valid_technical_team', ['as' => 'valid_technical_team', 'uses' => 'company_profile\CompanyProfileController@valid_technical_team']);
    Route::post('/get_mobilecode', ['as' => 'get_mobilecode', 'uses' => 'company_profile\CompanyProfileController@get_mobilecode']);

});

