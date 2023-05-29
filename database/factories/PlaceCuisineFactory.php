<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

class PlaceCuisineFactory extends Factory
{
    /**
     * The name of the factory's corresponding table.
     *
     * @var string
     */
    protected $table = 'place_cuisine';

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'place_id' => function () {
                return \App\Models\Place::factory()->create()->id;
            },
            'cuisine_id' => function () {
                return \App\Models\Cuisine::factory()->create()->id;
            },
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}