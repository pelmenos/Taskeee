<?php

namespace Database\Seeders;

use App\Models\FinanceProjectStatus;
use Illuminate\Database\Seeder;

class FinanceProjectStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FinanceProjectStatus::create(['name' => 'В работе']);
        FinanceProjectStatus::create(['name' => 'Завершён']);
    }
}
