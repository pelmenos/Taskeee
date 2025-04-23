<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('space_users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('space_id');
            $table->string('email');
            $table->uuid('role_id');
            $table->timestamps();

            $table->foreign('space_id', 'fk-space_users-space_id')
                ->on('spaces')->references('id');

            $table->foreign('role_id', 'fk-space_users-role_id')
                ->on('space_roles')->references('id');

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('space_users');
    }
};
