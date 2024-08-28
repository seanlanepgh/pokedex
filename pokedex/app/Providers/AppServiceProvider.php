<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //

        $this->app->bind(
            'App\Repositories\Interfaces\AuthRepositoryInterface',
            'App\Repositories\AuthRepository'
        );

        $this->app->bind(
            'App\Repositories\Interfaces\PokemonRepositoryInterface',
            'App\Repositories\PokemonRepository'
        );

        $this->app->bind(
            'App\Services\Interfaces\PokemonServiceInterface',
            'App\Services\PokemonService'
        );

        $this->app->bind(
            'App\Services\Interfaces\AuthServiceInterface',
            'App\Services\AuthService'
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
