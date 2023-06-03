<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PlaceResource\Pages;
use App\Filament\Resources\PlaceResource\RelationManagers;
use App\Models\Place;
use Filament\Forms;
use Filament\Forms\Components\Fieldset;
use Filament\Resources\Form;
use Filament\Resources\Resource;
use Filament\Resources\Table;
use Filament\Tables;
use Filament\Forms\Components\Select;
use Filament\Tables\Filters\Filter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PlaceResource extends Resource
{
    protected static ?string $model = Place::class;

    protected static ?string $navigationIcon = 'heroicon-o-collection';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required(),

                Select::make('city')
                    ->relationship('city', 'name'),

                Select::make('cuisines')
                    ->multiple()
                    ->relationship('cuisines', 'name')
                    ->preload(),

                Select::make('type')
                    ->multiple()
                    ->relationship('type', 'name')
                    ->preload(),

                Forms\Components\TextInput::make('phone_number'),
                Forms\Components\TextInput::make('address'),
                Forms\Components\TextInput::make('website'),

                Fieldset::make('Location')
                    ->schema([
                        Forms\Components\TextInput::make('lat'),
                        Forms\Components\TextInput::make('lng'),
                    ]),

                Fieldset::make('Props')
                    ->schema([
                        Forms\Components\Toggle::make('delivery'),
                        Forms\Components\Toggle::make('dine_in'),
                        Forms\Components\Toggle::make('takeout'),
                        Forms\Components\Toggle::make('operational'),
                    ]),
                Forms\Components\SpatieMediaLibraryFileUpload::make('photo')
                    ->image()
                    ->maxSize(1500)
                    ->multiple()
                    ->columnSpanFull()
                    ->collection('places')
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('ID'),
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('operational')->enum([
                    1 => 'OPEN',
                    0 => 'CLOSED',
                ]),
            ])
            ->filters([
                Filter::make('operational')
                    ->query(fn(Builder $query): Builder => $query->where('operational', true))
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPlaces::route('/'),
            'create' => Pages\CreatePlace::route('/create'),
            'edit' => Pages\EditPlace::route('/{record}/edit'),
        ];
    }
}