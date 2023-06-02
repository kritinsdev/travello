<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone_number', 'lat', 'lng', 'address', 'website', 'delivery', 'dine_in', 'takeout', 'place_id', 'city_id'];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function cuisines()
    {
        return $this->belongsToMany(Cuisine::class, 'place_cuisine');
    }

    public function type()
    {
        return $this->belongsToMany(Type::class, 'place_type');
    }

}