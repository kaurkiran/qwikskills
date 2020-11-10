<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompanyProfilesTable extends Migration
{

    public function up()
    {
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->BigIncrements('company_profile_id');
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->string('opening_date',255)->nullable();
            $table->string('full_name',255)->nullable();
            $table->string('personal_mobile_dial_code',10)->nullable();
            $table->string('personal_mobile_no',15)->nullable();
            $table->string('personal_email',50)->nullable();
            $table->string('company_name',200)->nullable();
            $table->string('company_mobile_dial_code',10)->nullable();
            $table->string('company_mobile',15)->nullable();
            $table->string('company_email',50)->nullable();
            $table->string('website',255)->nullable();
            $table->string('gstin',50)->nullable();
            $table->bigInteger('state_id')->unsigned()->nullable();
            $table->foreign('state_id')->references('state_id')->on('states');
            $table->string('whatsapp_mobile_dial_code',10)->nullable();
            $table->string('whatsapp_mobile_number',15)->nullable();
            $table->string('facebook',255)->nullable();
            $table->string('instagram',255)->nullable();
            $table->string('pinterest',255)->nullable();
            $table->longText('company_address')->nullable();
            $table->string('company_area',255)->nullable();
            $table->string('company_city',100)->nullable();
            $table->integer('company_pincode')->nullable();
            $table->bigInteger('country_id')->unsigned();
            $table->foreign('country_id')->references('country_id')->on('countries');
            $table->integer('total_tables')->nullable();
            $table->string('authorized_signatory_for',200)->nullable();
            $table->longText('terms_and_condition')->nullable();
            $table->string('additional_message',200)->nullable();
            $table->tinyInteger('tax_type')->default('2')->comment = "1=International Vat,2=Indian GST";
            $table->string('tax_title',55)->nullable();
            $table->string('currency_title',55)->nullable();
            $table->Integer('decimalpoints_forview')->default('2');
            $table->Integer('decimal_points')->default('0');
            $table->tinyInteger('bill_calculation')->default('1')->comment = "1=with calculation,2=without_calculation";
            $table->tinyInteger('series_type')->default('1')->comment = "1=regular,2=monthwise";
            $table->tinyInteger('billprint_type')->default('1')->comment = "1=A4/A5 Print,2=Thermal Print";
            $table->integer('minimumbilledit_days')->default('0');
            $table->string('bill_number_prefix',30)->nullable();
            $table->bigInteger('created_by')->unsigned()->nullable();
            $table->foreign('created_by')->references('user_id')->on('users');
            $table->bigInteger('modified_by')->unsigned()->nullable();
            $table->foreign('modified_by')->references('user_id')->on('users');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))->nullable();
            $table->bigInteger('deleted_by')->unsigned()->nullable();
            $table->foreign('deleted_by')->references('user_id')->on('users');
            $table->softDeletes('deleted_at');
        });

        DB::table('company_profiles')->insert(array(
        
          'company_id' => 1,
          'opening_date' => date('d-m-Y'),
          'company_name' => 'Restro POS',
          'company_address' => 'Punjab',
          'company_mobile' => '8360692055',
          'company_email' => 'test@restropos.in',
          'state_id' => 3,
          'country_id' => 102

        ));

        // Schema::table('users', function (Blueprint $table)
        // {
        //     $table->integer('store_id')->unsigned()->after('employee_remarks')->nullable();
        //     $table->foreign('store_id')->references('company_profile_id')->on('company_profiles');
        // });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_profiles');
    }
}
