<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CitySeeder::class, // creates places also
        ]);

        \App\Models\Cuisine::factory(10)->create();

        $places = \App\Models\Place::all();
        $cuisines = \App\Models\Cuisine::all();

        foreach ($places as $place) {
            $randomCuisineIds = $cuisines->random(3)->pluck('id')->toArray();

            foreach ($randomCuisineIds as $cuisineId) {
                DB::table('place_cuisine')->insert([
                    'place_id' => $place->id,
                    'cuisine_id' => $cuisineId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}