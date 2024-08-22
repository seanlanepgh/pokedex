<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokedexController;
use Illuminate\Support\Facades\Log;

Route::get('/', [PokedexController::class, 'index']);

Route::get('/overview', [PokedexController::class, 'overview']);

// // Didn't have time to implement search 
// Route::get('/search',  [PokedexController::class, 'search']);
