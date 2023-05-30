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
                'latitude' => 56.9496,
                'longitude' => 24.1052,
            ],
            [
                'name' => 'Ogre',
                'latitude' => 56.8167,
                'longitude' => 24.6019,
            ],
            [
                'name' => 'Sigulda',
                'latitude' => 57.1547,
                'longitude' => 24.8618,
            ],
            [
                'name' => 'Jelgava',
                'latitude' => 56.6483,
                'longitude' => 23.7128,
            ],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
}