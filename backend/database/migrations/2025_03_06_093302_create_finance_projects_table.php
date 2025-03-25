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
        Schema::create('finance_projects', function (Blueprint $table) {
            $table->id();
            $table->decimal('price', 14, 2);
            $table->string('comment', 2500)->nullable();
            $table->unsignedBigInteger('status_id');
            $table->uuid('project_id');
            $table->uuid('coordinator_id');
            $table->uuid('lead_id');
            $table->uuid('customer_id');
            $table->uuid('source_id');
            $table->uuid('space_id');
            $table->timestamps();

            $table->foreign('status_id')
                ->on('finance_project_statuses')
                ->references('id');

            $table->foreign('coordinator_id')
                ->on('users')
                ->references('id');

            $table->foreign('lead_id')
                ->on('users')
                ->references('id');

            $table->foreign('customer_id')
                ->on('users')
                ->references('id');

            $table->foreign('source_id')
                ->on('users')
                ->references('id');

            $table->foreign('space_id')
                ->on('spaces')
                ->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('finance_projects');
    }
};
