<?php

Route::get('EmployeeMaster', function()
{
    return 'EmployeeMaster';
});
Route::group(['namespace'=>'Webcolorzpos\EmployeeMaster\Http\Controllers','middleware' => ['web','auth']],Function()
{

//EmployeeMaster
Route::get('/employee_master', 'employee\EmployeeMasterController@index')->name('employee_master');
Route::post('/employeeName_search',['as' => 'employeeName_search', 'uses'=> 'employee\EmployeeMasterController@employeeName_search']);
Route::post('/employee_mobile_search',['as' => 'employee_mobile_search', 'uses'=> 'employee\EmployeeMasterController@employee_mobile_search']);
Route::post('/employee_code_search',['as' => 'employee_code_search', 'uses'=> 'employee\EmployeeMasterController@employee_code_search']);
Route::post('/employee_designation_search',['as' => 'employee_designation_search', 'uses'=> 'employee\EmployeeMasterController@employee_designation_search']);
Route::get('/searchEmployeeResult', ['as' => 'searchEmployeeResult', 'uses' => 'employee\EmployeeMasterController@searchEmployeeResult']);
Route::post('/employee_form_create',['as' => 'employee_form_create', 'uses'=> 'employee\EmployeeMasterController@employee_form_create']);
Route::get('/changeStatus',['as' => 'changeStatus', 'uses'=> 'employee\EmployeeMasterController@changeStatus']);
Route::get('/deleteEmployee',['as' => 'deleteEmployee', 'uses'=> 'employee\EmployeeMasterController@deleteEmployee']);
Route::get('/removePicture',['as' => 'removePicture', 'uses'=> 'employee\EmployeeMasterController@removePicture']);
Route::get('/removeIDPicture',['as' => 'removeIDPicture', 'uses'=> 'employee\EmployeeMasterController@removeIDPicture']);
Route::get('/showResume',['as' => 'showResume', 'uses'=> 'employee\EmployeeMasterController@showResume']);
Route::get('/changePassword',['as' => 'changePassword', 'uses'=> 'employee\EmployeeMasterController@changePassword']);
Route::get('/createPassword',['as' => 'createPassword', 'uses'=> 'employee\EmployeeMasterController@createPassword']);
Route::get('/editEmployee',['as' => 'editEmployee', 'uses'=> 'employee\EmployeeMasterController@editEmployee']);
Route::get('/exportemployee_details',['as' => 'exportemployee_details', 'uses'=> 'employee\EmployeeMasterController@exportemployee_details']);
Route::post('/selectStore',['as' => 'selectStore', 'uses'=> 'employee\EmployeeMasterController@selectStore']);






//Employee Roles
Route::get('/getRole_Pages', 'employee\EmployeeRoleController@getRole_Pages')->name('getRole_Pages');
Route::post('/employee_role_create',['as' => 'employee_role_create', 'uses'=> 'employee\EmployeeRoleController@employee_role_create']);
Route::post('/showPermissions', 'employee\EmployeeRoleController@showPermissions')->name('showPermissions');
Route::post('/SaveRoletoEmployee', 'employee\EmployeeRoleController@SaveRoletoEmployee')->name('SaveRoletoEmployee');
Route::post('/findRole', 'employee\EmployeeRoleController@findRole')->name('findRole');
Route::post('/showEmpName', 'employee\EmployeeRoleController@showEmpName')->name('showEmpName');
Route::post('/editPermissions', 'employee\EmployeeRoleController@editPermissions')->name('editPermissions');

//check password
    Route::POST('/check_password', 'employee\EmployeeMasterController@check_password')->name('check_password');
});