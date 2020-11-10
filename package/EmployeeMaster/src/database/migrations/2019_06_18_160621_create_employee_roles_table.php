<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmployeeRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employee_roles', function (Blueprint $table) {
            $table->BigIncrements('employee_role_id');
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->string('role_name',255);
            $table->tinyInteger('is_active')->default('1')->comment = "1=active,0=inactive";
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->foreign('created_by')->references('company_id')->on('companies');
            $table->bigInteger('modified_by')->unsigned()->nullable();
            $table->foreign('modified_by')->references('company_id')->on('companies');
            $table->bigInteger('deleted_by')->unsigned()->nullable();
            $table->foreign('deleted_by')->references('company_id')->on('companies');
            $table->softDeletes('deleted_at');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))->nullable();
        });

        Schema::create('employee_role_permissions', function (Blueprint $table) {
            $table->BigIncrements('employee_role_permission_id');
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->bigInteger('employee_role_id')->unsigned();
            $table->foreign('employee_role_id')->references('employee_role_id')->on('employee_roles');
            $table->bigInteger('home_navigation_id')->unsigned()->nullable();
            $table->foreign('home_navigation_id')->references('home_navigation_id')->on('home_navigations');
            $table->bigInteger('home_navigation_data_id')->unsigned()->nullable();
            $table->foreign('home_navigation_data_id')->references('home_navigation_data_id')->on('home_navigations_datas');
            $table->integer('permission_view')->nullable();
            $table->integer('permission_add')->nullable();
            $table->integer('permission_edit')->nullable();
            $table->integer('permission_delete')->nullable();
            $table->integer('permission_export')->nullable();
            $table->integer('permission_print')->nullable();
            $table->integer('permission_upload')->nullable();
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

        Schema::disableForeignKeyConstraints();

        Schema::table('users', function (Blueprint $table)
        {
            $table->bigInteger('employee_role_id')->unsigned()->after('company_id')->nullable();
            $table->foreign('employee_role_id')->references('employee_role_id')->on('employee_roles');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employee_roles');
    }
}
