<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cities = [
            [
                'name' => 'Riga',
                'lat' => 56.9496,
                'lng' => 24.1052,
            ],
            [
                'name' => 'Ogre',
                'lat' => 56.8167,
                'lng' => 24.6019,
            ],
            [
                'name' => 'Sigulda',
                'lat' => 57.1547,
                'lng' => 24.8618,
            ],
            [
                'name' => 'Jelgava',
                'lat' => 56.6483,
                'lng' => 23.7128,
            ],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}