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
            $table->foreignid('status_id')->constrained('finance_project_statuses')->cascadeOnDelete();
            $table->foreignUuid('project_id')->constrained('projects')->cascadeOnDelete();
            $table->foreignUuid('coordinator_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('lead_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('customer_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('source_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('space_id')->constrained('spaces')->cascadeOnDelete();
            $table->timestamps();
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
