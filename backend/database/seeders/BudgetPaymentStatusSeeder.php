<?php

namespace Database\Seeders;

use App\Models\BudgetPayment;
use App\Models\BudgetPaymentStatus;
use App\Models\FinanceProjectStatus;
use Illuminate\Database\Seeder;

class BudgetPaymentStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BudgetPaymentStatus::create(['name' => 'Ожидание']);
        BudgetPaymentStatus::create(['name' => 'План']);
        BudgetPaymentStatus::create(['name' => 'Заморожено']);
        BudgetPaymentStatus::create(['name' => 'Оплачено']);
    }
}
