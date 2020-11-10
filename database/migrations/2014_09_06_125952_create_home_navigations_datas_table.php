<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHomeNavigationsDatasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_navigations_datas', function (Blueprint $table) {
            $table->BigIncrements('home_navigation_data_id');
            $table->bigInteger('home_navigation_id')->unsigned();
            $table->foreign('home_navigation_id')->references('home_navigation_id')->on('home_navigations');
            $table->string('nav_display_name',255)->nullable();
            $table->string('nav_tab_display_name',255)->nullable();
            $table->string('nav_url',255)->nullable();
            $table->string('nav_icon_class',255)->nullable();
            $table->longText('nav_keywords');
            $table->tinyInteger('parent')->default(0);
            $table->tinyInteger('child')->default(0);
            $table->integer('option_view')->nullable();
            $table->integer('option_add')->nullable();
            $table->integer('option_edit')->nullable();
            $table->integer('option_delete')->nullable();
            $table->integer('option_export')->nullable();
            $table->integer('option_print')->nullable();
            $table->integer('option_upload')->nullable();
            $table->tinyInteger('ordering')->default(0);
            $table->tinyInteger('module_status')->default(0)->comment = "1=done,0=inprocess";
            $table->tinyInteger('is_active')->comment = "1=active,0=inactive";
            $table->softDeletes('deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('home_navigations_datas');
    }
}
