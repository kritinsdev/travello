<?php

namespace App\Filament\Resources\CuisineResource\Pages;

use App\Filament\Resources\CuisineResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\EditRecord;

class EditCuisine extends EditRecord
{
    protected static string $resource = CuisineResource::class;

    protected function getActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
