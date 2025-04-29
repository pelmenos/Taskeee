<?php

namespace Database\Seeders;

use App\Models\PaymentStatus;
use Illuminate\Database\Seeder;

class PaymentStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PaymentStatus::create(['name' => 'Ожидание']);
        PaymentStatus::create(['name' => 'План']);
        PaymentStatus::create(['name' => 'Заморожено']);
        PaymentStatus::create(['name' => 'Оплачено']);
    }
}
