<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlaceResource;
use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    public function index(Request $request)
    {
        $query = Place::query();

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('place_id')) {
            $query->where('place_id', 'like', '%' . $request->input('place_id') . '%');
        }

        if ($request->has('city')) {
            $city = $request->input('city');
            $query->whereHas('city', function ($query) use ($city) {
                $query->where('name', 'like', '%' . $city . '%');
            });
        }

        if ($request->has('cuisine')) {
            $cuisine = $request->input('cuisine');
            $query->whereHas('cuisines', function ($query) use ($cuisine) {
                $query->where('name', 'like', '%' . $cuisine . '%');
            });
        }


        $places = $query->get();
        return PlaceResource::collection($places);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'phone_number' => 'nullable',
            'lat' => 'nullable',
            'lng' => 'nullable',
            'address' => 'nullable',
            'website' => 'nullable',
            'rating' => 'nullable',
            'user_ratings_total' => 'nullable',
            'delivery' => 'nullable',
            'dine_in' => 'nullable',
            'takeout' => 'nullable',
            'operational' => 'required',
            'place_id' => 'nullable',
            'city_id' => 'nullable',
        ]);

        $place = Place::create($validatedData);

        return response()->json($place, 201);
    }

    public function show(string $id)
    {
        $place = Place::findOrFail($id);

        return response()->json($place);
    }
}