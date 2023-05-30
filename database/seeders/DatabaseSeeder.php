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

        $this->call([
            TypeSeeder::class, // creates places also
        ]);

        $this->call([
            CuisineSeeder::class, // creates places also
        ]);
    }
}