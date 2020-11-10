<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductFeaturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_features', function (Blueprint $table) {
           $table->BigIncrements('product_features_id');
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->string('html_name',100);
            $table->string('html_id',100);
            $table->string('product_features_name',100);
            $table->string('feature_url',500)->nullable();
            $table->integer('parent')->nullable();
            $table->integer('feature_type')->default('1')->comment = "1=Category,2=Pages,3=Blog";
            $table->longText('show_feature_url')->nullable();
            $table->integer('ordering')->default('0');
            $table->tinyInteger('is_multiple_selection')->default('0')->comment = "0=no multi selection,1=multiple selection";
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

          DB::table('product_features')->insert(array(
            'company_id'=> '1',
            'product_features_name' => 'Product Type',
            'html_name' => 'dynamic_producttype',
            'html_id' => 'dynamic_producttype',
            'is_active' => '1',
            'show_feature_url'=>'sales_bill',
            'created_by' => '1',
            'parent'=>'0'
          ));

           DB::table('product_features')->insert(array(
            'company_id'=> '1',
            'product_features_name' => 'Category',
            'html_name' => 'dynamic_category',
            'html_id' => 'dynamic_category',
            'is_active' => '1',
            'created_by' => '1',
            'parent'=>'0'
          ));

          DB::table('product_features')->insert(array(
            'company_id'=> '1',
            'product_features_name' => 'Sub Category',
            'html_name' => 'dynamic_subcategory',
            'html_id' => 'dynamic_subcategory',
            'is_active' => '1',
            'created_by' => '1',
            'parent'=>'2'

         ));
         
           
          if (Schema::hasTable('product_features_relationships')) {
              Schema::table('product_features_relationships', function (Blueprint $table) {

                  if (!Schema::hasColumn('product_features_relationships', 'dynamic_subcategory')) {
                      $table->integer('dynamic_subcategory')->unsigned()->nullable()->after('product_id');
                    }
                 
                });
            }

         

          
          if (Schema::hasTable('product_features_relationships')) {
              Schema::table('product_features_relationships', function (Blueprint $table) {
                  if (!Schema::hasColumn('product_features_relationships', 'dynamic_category')) {
                      $table->integer('dynamic_category')->unsigned()->nullable()->after('product_id');
                    }
               });
            }


            

         if (Schema::hasTable('product_features_relationships')) {
          Schema::table('product_features_relationships', function (Blueprint $table) {

            if (!Schema::hasColumn('product_features_relationships', 'dynamic_producttype')) {
                $table->integer('dynamic_producttype')->unsigned()->nullable()->after('product_id');
              }
               });
            }
          

          
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_features');
    }
}
