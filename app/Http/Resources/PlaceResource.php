<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone_number' => $this->phone_number,
            'lat' => $this->lat,
            'lng' => $this->lng,
            'address' => $this->address,
            'website' => $this->website,
            'rating' => $this->rating,
            'user_ratings_total' => $this->user_ratings_total,
            'delivery' => $this->delivery,
            'dine_in' => $this->dine_in,
            'takeout' => $this->takeout,
            'operational' => $this->operational,
            'priority' => $this->priority,
            'city_id' => $this->city_id,
            'type' => $this->type->pluck('name'),
            'cuisines' => $this->cuisines->pluck('name'),
            'photos' => $this->media->map(fn($media) => $media->getUrl()),
        ];
    }
}