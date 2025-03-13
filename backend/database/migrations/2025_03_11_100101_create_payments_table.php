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
            $table->integer('status_id');
            $table->integer('finance_project_id');
            $table->integer('subject_id');
            $table->string('type', 50);
            $table->uuid('director_id');
            $table->uuid('recipient_id');
            $table->integer('condition_id');
            $table->uuid('space_id');
            $table->string('method', 50);
            $table->string('comment', 2500)->nullable();
            $table->timestamps();

            $table->foreign('status_id')
                ->on('payment_statuses')
                ->references('id');

            $table->foreign('finance_project_id')
                ->on('finance_projects')
                ->references('id');

            $table->foreign('director_id')
                ->on('users')
                ->references('id');

            $table->foreign('recipient_id')
                ->on('users')
                ->references('id');

            $table->foreign('condition_id')
                ->on('conditions')
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
        Schema::dropIfExists('payments');
    }
};
