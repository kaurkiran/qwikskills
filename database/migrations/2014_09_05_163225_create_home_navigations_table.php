<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHomeNavigationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('home_navigations', function (Blueprint $table) {
            $table->BigIncrements('home_navigation_id');
            $table->string('nav_display_name',255)->nullable();
            $table->string('nav_tab_display_name',255)->nullable();
            $table->string('nav_url',255)->nullable();
            $table->string('nav_label',255)->nullable();
            $table->string('nav_icon_class',255)->nullable();
            $table->tinyInteger('parent')->default(0);
            $table->tinyInteger('ordering')->default(0);
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
        Schema::dropIfExists('home_navigations');
    }
}
