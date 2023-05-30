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
            'type' => $faker->randomElement(['restaurant', 'cafe', 'bar', 'fast_food', 'pizzeria', 'bakery']),
            'phone_number' => $faker->phoneNumber(),
            'website' => $faker->url(),
            'lat' => $faker->latitude(55.0, 58.0),
            'lng' => $faker->longitude(21.0, 28.0),
            'address' => $faker->address,
            'rating' => $faker->randomFloat(1, 1, 5),
            'user_ratings_total' => $faker->numberBetween(0, 1000),
            'created_at' => now(),
        ];
    }
}