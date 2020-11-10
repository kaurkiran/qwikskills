<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->BigIncrements('product_id');
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->string('product_name',200);
            $table->bigInteger('taxmaster_id')->unsigned()->nullable();
            $table->foreign('taxmaster_id')->references('taxmaster_id')->on('taxmasters');
            $table->longText('sku_code')->nullable();
            $table->longText('product_code')->nullable();
            $table->longText('product_description')->nullable();
            $table->double('offer_price',15,4)->comment = "Original MRP";
            $table->double('sell_gst_percent',15,4)->nullable();
            $table->string('consumption_value',55)->default('0');
            $table->string('product_system_barcode',50)->unique();
            $table->string('supplier_barcode',50)->nullable()->unique();
            $table->integer('alert_product_qty')->nullable();
            $table->double('minimum_qty',8,4)->nullable();
            $table->double('default_qty',20,4)->default('0')->comment="this qty will show on as default when create po or inward";
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
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
