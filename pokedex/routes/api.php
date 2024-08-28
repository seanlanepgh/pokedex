<?php

use App\Http\Controllers\Api\V1\PokemonController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['as' => 'v1.', 'prefix' => 'v1'], function () {
    Route::middleware('auth:api')->group(function () {
        //user logout
        Route::post('logout', [UserController::class, 'logout'])->name('logout');
    });

    //Users
    Route::post('register', [UserController::class, 'register'])->name('register');
    Route::post('login', [UserController::class, 'login'])->name('login');

    //Pokemon Routes
    //Can take a query string of /?name=ven  "would return venasaur"
    //Can also take a query string of /?description=the "would return all the pokemon with "the" in the description. 
    Route::get('pokemon', [PokemonController::class, 'index'])->name('pokemon');
    Route::get('pokemon/type', [PokemonController::class, 'type'])->where('type', '[a-zA-Z]+')->name('byType');
    Route::get('pokemon/ability', [PokemonController::class, 'ability'])->where('ability', '[a-zA-Z]+')->name('byAbility');
    Route::get('pokemon/{id}', [PokemonController::class, 'show'])->where('id', '[0-9]+')->name('pokemonDetail');
    Route::get('allPokemon', [PokemonController::class, 'allIndex'])->name('allPokemon');
});
//if not authorized when going to a route that need authorization, go to this route specified in the authenticate middleware.
// I have this down here because it wasn't finding the route with the prefix before it.
Route::get('notAuthorized', [Controller::class, 'notAuthorized'])->name('notAuthorized');

Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found.'
    ], 404);
});
