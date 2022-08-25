<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctors', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->uuid('poly');
            $table->string('name');
            $table->text('description')->nullable();
            $table->uuid('created_by')->nullable();
            $table->uuid('updated_by')->nullable();
            $table->uuid('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('poly')->on('polies')->references('id')->onDelete('cascade')->onUpdate('no action');
            $table->foreign('created_by')->on('users')->references('id')->onDelete('cascade')->onUpdate('no action');
            $table->foreign('updated_by')->on('users')->references('id')->onDelete('cascade')->onUpdate('no action');
            $table->foreign('deleted_by')->on('users')->references('id')->onDelete('cascade')->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doctors');
    }
}
