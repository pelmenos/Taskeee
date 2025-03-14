<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_space_users', function (Blueprint $table) {
            $table->id();
            $table->uuid('project_id');
            $table->uuid('space_user_id');

            $table->foreign('project_id', 'fk-project_space_user-project_id')
                ->on('projects')->references('id')->onDelete('cascade');

            $table->foreign('space_user_id', 'fk-project_space_user-space_user_id')
                ->on('space_users')->references('id')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_space_users');
    }
};
