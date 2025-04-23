<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create('spaces', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();

            $table->foreignUuid('owner_id')->constrained('users')->cascadeOnDelete();

            $table->string('name', 100);
            $table->string('description', 500)->nullable();

            // TODO: что за поле, за что отвечает?
            $table->string('tariff');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('spaces');
    }
};
