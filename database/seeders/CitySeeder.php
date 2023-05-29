<?php

namespace Database\Seeders;

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
        $faker = \Faker\Factory::create('en_US');
        $faker->seed(1234);

        $cities = [];

        for ($i = 0; $i < 10; $i++) {
            $city = [
                'name' => $faker->city,
                'latitude' => $faker->latitude(55.0, 58.0),
                'longitude' => $faker->longitude(21.0, 28.0),
            ];

            $cities[] = $city;
        }

        // Insert the data into the 'cities' table
        DB::table('cities')->insert($cities);

        // Associate places with cities
        $places = [];

        for ($i = 0; $i < 20; $i++) {
            $place = [
                'name' => $faker->company,
                'type' => $faker->randomElement(['restaurant', 'cafe', 'bar']),
                'phone_number' => $faker->phoneNumber(),
                'website' => $faker->url(),
                'city_id' => $faker->randomElement(DB::table('cities')->pluck('id')),
            ];

            $places[] = $place;
        }

        // Insert the data into the 'places' table
        DB::table('places')->insert($places);
    }
}