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
        Schema::create('invite_tokens', function (Blueprint $table) {
            $table->id();
            $table->string('token');
            $table->timestamp('expires_at')->nullable();
            $table->uuid('space_id');
            $table->uuid('sender_id');
            $table->uuid('role_id');
            $table->timestamps();

            $table->foreign('space_id', 'fk-invite-token-space_id')
                ->on('spaces')->references('id');

            $table->foreign('sender_id', 'fk-invite-token-sender_id')
                ->on('users')->references('id');

            $table->foreign('role_id', 'fk-invite-token-role_id')
                ->on('space_roles')->references('id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invite_tokens');
    }
};
