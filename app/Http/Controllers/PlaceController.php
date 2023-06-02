<?php

namespace App\Http\Controllers;

use App\Models\Place;
use Illuminate\Http\Request;

class PlaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
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

        return response()->json($places);
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
            'delivery' => 'nullable',
            'dine_in' => 'nullable',
            'takeout' => 'nullable',
            'place_id' => 'nullable',
            'city_id' => 'nullable',
        ]);

        $place = Place::create($validatedData);

        return response()->json($place, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Find the place by ID
        $place = Place::findOrFail($id);

        // Return the place as a JSON response
        return response()->json($place);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find the place by ID
        $place = Place::findOrFail($id);

        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required',
            'city' => 'required',
            'type' => 'required',
            // Other validation rules for your attributes
        ]);

        // Update the place with the validated data
        $place->update($validatedData);

        // Return the updated place as a JSON response
        return response()->json($place);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the place by ID
        $place = Place::findOrFail($id);

        // Delete the place
        $place->delete();

        // Return a success message as a JSON response
        return response()->json(['message' => 'Place deleted successfully']);
    }
}