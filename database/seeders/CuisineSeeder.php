<?php

namespace Database\Seeders;

use App\Models\Cuisine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CuisineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cuisines = [
            'Pizza',
            'Sushi',
            'Burger',
            'Barbecue',
            'Grill',
            'Seafood',
            'Steak',
            'Fast food',
            'Beer',
            'Wine',
            'Pasta',
            'Full meal',
        ];

        foreach ($cuisines as $cuisine) {
            Cuisine::create(['name' => $cuisine]);
        }
    }
}