<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Place>
 */
class PlaceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create();

        return [
            'name' => $faker->company,
            'type' => $faker->randomElement(['restaurant', 'cafe', 'bar']),
            'phone_number' => $faker->phoneNumber(),
            'website' => $faker->url(),
            'created_at' => now(),
        ];
    }
}