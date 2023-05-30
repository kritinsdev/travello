<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone_number', 'lat', 'lng', 'address', 'website', 'place_id', 'city_id'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function cuisines()
    {
        return $this->belongsToMany(Cuisine::class, 'place_cuisine');
    }

}