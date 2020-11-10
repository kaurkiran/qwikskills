<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionmastersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questionmasters', function (Blueprint $table) {
            $table->BigIncrements('questionmaster_id');
            $table->bigInteger('company_id')->unsigned();
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->string('trans_date',55)->nullable();
            $table->bigInteger('category_id');
            $table->bigInteger('subcategory_id');
            $table->bigInteger('product_id');
            $table->longText('question_title')->nullable();
            $table->string('question_answer_a',500)->nullable();
            $table->string('question_answer_b',500)->nullable();
            $table->string('question_answer_c',500)->nullable();
            $table->string('question_answer_d',500)->nullable();
            $table->string('question_correct_answer',500)->nullable();
            $table->longText('question_summary')->nullable();
            $table->longText('question_tag')->nullable();
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
        Schema::dropIfExists('questionmasters');
    }
}
