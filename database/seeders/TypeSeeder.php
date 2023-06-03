<?php

namespace Database\Seeders;

use App\Models\Type;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            'Restaurant',
            'Cafe',
            'Bar',
            'Fast Food',
            'Bistro',
            'Pizzeria',
            'Bakery',
            'Food Truck',
            'Gas Station'
        ];

        foreach ($types as $type) {
            Type::create(['name' => $type]);
        }
    }
}