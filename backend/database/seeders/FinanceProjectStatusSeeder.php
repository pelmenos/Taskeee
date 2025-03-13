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
        FinanceProjectStatus::create(['name' => 'Ожидание']);
        FinanceProjectStatus::create(['name' => 'План']);
        FinanceProjectStatus::create(['name' => 'Заморожено']);
        FinanceProjectStatus::create(['name' => 'Оплачено']);
    }
}
