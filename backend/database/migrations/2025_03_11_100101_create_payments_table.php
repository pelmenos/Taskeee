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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->decimal('sum', 14, 2);
            $table->foreignId('status_id')->constrained('payment_statuses')->cascadeOnDelete();
            $table->foreignId('finance_project_id')->constrained('finance_projects')->cascadeOnDelete();
            $table->foreignId('subject_id')->constrained('subjects')->cascadeOnDelete();
            $table->string('type', 50);
            $table->foreignUuid('director_id')->constrained('users')->cascadeOnDelete();
            $table->foreignUuid('recipient_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('condition_id')->constrained('conditions')->cascadeOnDelete();
            $table->foreignUuid('space_id')->constrained('spaces')->cascadeOnDelete();
            $table->string('method', 50);
            $table->string('comment', 2500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
