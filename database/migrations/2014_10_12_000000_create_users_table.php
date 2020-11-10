<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('users', function (Blueprint $table) {
            $table->BigIncrements('user_id');
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->string('employee_code',100)->nullable();
            $table->string('employee_firstname',100)->nullable();
            $table->string('employee_middlename',100)->nullable();
            $table->string('employee_lastname',100)->nullable();
            $table->string('employee_mobileno_dial_code',10)->nullable();
            $table->string('employee_mobileno',15)->nullable();
            $table->date('employee_joiningdate')->nullable();
            $table->tinyInteger('employee_login')->default('1')->comment = "0=cant login; 1=can login";
            $table->string('email',200)->nullable();
            $table->string('password',255)->nullable();
            $table->string('encrypt_password',255)->nullable();
            $table->string('employee_alternate_mobile_dial_code',10)->nullable();
            $table->string('employee_alternate_mobile',15)->nullable();
            $table->string('employee_family_member_mobile_dial_code',10)->nullable();
            $table->string('employee_family_member_mobile',15)->nullable();
            $table->string('employee_designation',255)->nullable();
            $table->longText('employee_duties')->nullable();
            $table->string('employee_salary_offered',10)->nullable();
            $table->longText('employee_skills')->nullable();
            $table->longText('employee_education')->nullable();
            $table->longText('employee_past_experience')->nullable();
            $table->date('employee_dob')->nullable();
            $table->tinyInteger('employee_marital_status')->nullable()->comment = "1=single; 2=married; 3:divorced; 3:widow";
            $table->tinyInteger('employee_address_type')->nullable()->comment = "1=house; 2=building; 3=street";
            $table->longText('employee_address')->nullable();
            $table->string('employee_area',255)->nullable();
            $table->string('employee_city_town',255)->nullable();
            $table->bigInteger('state_id')->unsigned()->nullable();
            $table->foreign('state_id')->references('state_id')->on('states');
            $table->string('employee_zipcode',10)->nullable();
            $table->bigInteger('country_id')->unsigned()->nullable();
            $table->foreign('country_id')->references('country_id')->on('countries');
            $table->string('employee_picture',255)->nullable();
            $table->longText('employee_reference')->nullable();
            $table->date('employee_resigned_date')->nullable();
            $table->longText('employee_resigned_reason')->nullable();
            $table->longText('employee_remarks')->nullable();
            $table->tinyInteger('is_master')->nullable()->comment = "0=normal; 1=master";
            $table->string('api_token',255)->nullable();
            $table->string('app_id',255)->nullable();
            $table->string('app_secret',255)->nullable();
            $table->tinyInteger('discount_on_billing')->default('1')->comment = "1=Can Give Discount; 0=Cannot Give Discount";
            $table->string('discount_val_on_billing',10)->nullable();
            $table->tinyInteger('delete_kot')->default('1')->comment = "1=Can Delete Kot; 0=Cannot Delete Kot";
            $table->tinyInteger('transfer_kot')->default('1')->comment = "1=Can Transfer Kot; 0=Cannot Transfer Kot";
            $table->tinyInteger('reprint_bill')->default('1')->comment = "1=Can Reprint Bill; 0=Cannot Reprint Bill";
            $table->tinyInteger('back_date_billing')->default('1')->comment = "1=Can Create Back Date Bills; 0=Cannot ";
            $table->tinyInteger('is_active')->default('1')->comment = "1=active,0=inactive";
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->bigInteger('modified_by')->unsigned()->nullable();
            $table->foreign('modified_by')->references('user_id')->on('users');
            $table->bigInteger('deleted_by')->unsigned()->nullable();
            $table->foreign('deleted_by')->references('user_id')->on('users');
            $table->softDeletes('deleted_at');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))->nullable();
        });

        DB::table('users')->insert(array(

          'company_id' => '1',
          'employee_firstname' => 'admin',
          'employee_lastname' => '',
          'email' => 'test@test.com',
          'password' => bcrypt('123456'),
          'encrypt_password' => bcrypt('123456'),
          'is_master' => '1',
          'delete_kot' => '1',
          'transfer_kot' => '1',
          'reprint_bill' => '1',
          'app_id' => md5(microtime().'admin'),
          'app_secret' => md5(microtime().'test@test.com'),
          'employee_joiningdate' => date('Y-m-d')

        ));
        Schema::disableForeignKeyConstraints();

        Schema::table('home_navigations', function (Blueprint $table) {
            $table->bigInteger('company_id')->unsigned()->after('home_navigation_id');
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->bigInteger('created_by')->unsigned()->nullable()->after('is_active');
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->bigInteger('modified_by')->unsigned()->nullable();
            $table->foreign('modified_by')->references('user_id')->on('users');
            $table->bigInteger('deleted_by')->unsigned()->nullable();
            $table->foreign('deleted_by')->references('user_id')->on('users');
        });

        Schema::table('home_navigations_datas', function (Blueprint $table) {
            $table->bigInteger('company_id')->unsigned()->after('home_navigation_id');
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->bigInteger('created_by')->unsigned()->nullable()->after('is_active');
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->bigInteger('modified_by')->unsigned()->nullable();
            $table->foreign('modified_by')->references('user_id')->on('users');
            $table->bigInteger('deleted_by')->unsigned()->nullable();
            $table->foreign('deleted_by')->references('user_id')->on('users');
        });

        //////////////////////////////////////////
        //////////// HOME NAVIGATIONS ////////////
        //////////////////////////////////////////


        DB::table('home_navigations')->insert(array(

          'company_id' => '1',
          'nav_display_name' => 'Dashboard',
          'nav_tab_display_name' => 'Dashboard',
          'nav_url' => 'home',
          'nav_label' => '',
          'nav_icon_class' => 'icon dripicons-home',
          'parent' => '0',
          'is_active' => '1',
          'ordering' => '1'

        ));

        DB::table('home_navigations')->insert(array(

          'company_id' => '1',
          'nav_display_name' => 'Masters',
          'nav_tab_display_name' => 'Masters',
          'nav_url' => '',
          'nav_label' => '',
          'nav_icon_class' => 'icon dripicons-home',
          'parent' => '0',
          'is_active' => '1',
          'ordering' => '2'

        ));     
        DB::table('home_navigations_datas')->insert(array(

          'home_navigation_id' => '2',
          'company_id' => '1',
          'nav_display_name' => 'Certifications',
          'nav_tab_display_name' => 'Certifications',
          'nav_url' => 'certification_master',
          'nav_icon_class' => 'icon dripicons-card',
          'nav_keywords'  =>  '',
          'option_view' => '1',
          'option_add' => '1',
          'option_edit' => '0',
          'option_delete' => '0',
          'option_export' => '0',
          'option_print' => '1',
          'option_upload' => '0',
          'is_active' => '1',
          'ordering' => '1',
          'module_status' => '1',

        ));  

         DB::table('home_navigations_datas')->insert(array(

          'home_navigation_id' => '2',
          'company_id' => '1',
          'nav_display_name' => 'Employees',
          'nav_tab_display_name' => 'Employees',
          'nav_url' => 'employee_master',
          'nav_icon_class' => 'icon dripicons-user-group',
          'nav_keywords'  =>  'EMPLOYEES, ADD EMPLOYEE, VIEW EMPLOYEE LIST, VIEW EMPLOYEES',
          'option_view' => '1',
          'option_add' => '1',
          'option_edit' => '1',
          'option_delete' => '1',
          'option_export' => '1',
          'option_print' => '1',
          'option_upload' => '0',
          'is_active' => '1',
          'ordering' => '2',
          'module_status' => '1'

        )); 

        DB::table('home_navigations_datas')->insert(array(

          'home_navigation_id' => '2',
          'company_id' => '1',
          'nav_display_name' => 'Product Features',
          'nav_tab_display_name' => 'Product Features',
          'nav_url' => 'product_features',
          'nav_icon_class' => 'icon dripicons-checklist',
          'nav_keywords'  =>  'PRODUCT FEATURES MANAGER',
          'option_view' => '1',
          'option_add' => '1',
          'option_edit' => '1',
          'option_delete' => '1',
          'option_export' => '0',
          'option_print' => '0',
          'option_upload' => '0',
          'is_active' => '1',
          'ordering' => '3',
          'module_status' => '1',

        ));
        DB::table('home_navigations_datas')->insert(array(

          'home_navigation_id' => '2',
          'company_id' => '1',
          'nav_display_name' => 'Question Answers',
          'nav_tab_display_name' => 'Question Answers',
          'nav_url' => 'question_show',
          'nav_icon_class' => 'icon dripicons-card',
          'nav_keywords'  =>  '',
          'option_view' => '1',
          'option_add' => '1',
          'option_edit' => '0',
          'option_delete' => '0',
          'option_export' => '0',
          'option_print' => '1',
          'option_upload' => '0',
          'is_active' => '1',
          'ordering' => '4',
          'module_status' => '1',

        ));  
       
        DB::table('home_navigations')->insert(array(

          'company_id' => '1',
          'nav_display_name' => 'Reports',
          'nav_tab_display_name' => 'Reports',
          'nav_url' => '',
          'nav_label' => '',
          'nav_icon_class' => 'icon dripicons-home',
          'parent' => '0',
          'is_active' => '1',
          'ordering' => '3'

        ));

        DB::table('home_navigations_datas')->insert(array(

          'home_navigation_id' => '3',
          'company_id' => '1',
          'nav_display_name' => 'Users Report',
          'nav_tab_display_name' => 'Users Report',
          'nav_url' => 'user_report',
          'nav_icon_class' => 'icon dripicons-card',
          'nav_keywords'  =>  '',
          'option_view' => '1',
          'option_add' => '1',
          'option_edit' => '0',
          'option_delete' => '0',
          'option_export' => '0',
          'option_print' => '1',
          'option_upload' => '0',
          'is_active' => '1',
          'ordering' => '1',
          'module_status' => '1',

        ));

        DB::table('home_navigations')->insert(array(

          'company_id' => '1',
          'nav_display_name' => 'Profile',
          'nav_tab_display_name' => 'Profile',
          'nav_url' => 'company_profile',
          'nav_label' => '',
          'nav_icon_class' => 'icon dripicons-home',
          'parent' => '0',
          'is_active' => '1',
          'ordering' => '4'

        ));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
