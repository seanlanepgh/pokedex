<?php

namespace App\Http\Controllers;

use App\Utilities\Utility;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PokedexController extends Controller
{
    public function index(Request $request)
    {
        //Reuse function for pagination
        //Checks for pagination
        if (empty($request->pagination)) {
            /* 
                Get all pokemon currently there is 1302, 
                to improve the app I use pagination and this improves the sites response time
                user can see the full list of pokemon over various pages
            */
            $url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
        } else {
            $url = $request->pagination;
        }

        $responseJSON = Http::get($url)->json();
        $allPokemonResults = $responseJSON["results"];
        $allPokemonArray = [];
        $index = 0;
        //Loop through get pokemon name and url for pokemon list
        foreach ($allPokemonResults as $pokemon) {
            //Call the specific pokemon to get all data
            $PokemonData = Http::get($pokemon['url'])->json();
            $PokemonData["sprite"] = $PokemonData['sprites']["front_default"];
            $PokemonData['name'] =  ucfirst($pokemon['name']);
            $PokemonData["url"] = $pokemon['url'];
            $PokemonData["weight"] = Utility::readableWeightMetric($PokemonData["weight"]);
            $PokemonData["height"] = Utility::readableWeightMetric($PokemonData["height"]);
            $allPokemonArray[$index] = $PokemonData;
            $index++;
        }

        return view("home", ['pokemons' => $allPokemonArray, 'pagination' => $responseJSON]);
    }

    public function overview(Request $request)
    {

        $id = $request->query();
        $id = $request->input('id');
        $name = $request->input('name');
        $pokemonData = Http::get("https://pokeapi.co/api/v2/pokemon/" . $id)->json();

        /* 
            Because the older gen pokemon didn't have species 
            I assumed name and species are the same but there are 
            later pokemon that have different species so need to pass name from main page
            to hit AC for overview page
        */
        $pokemonData['name'] =  ucfirst($name);
        $pokemonData["sprite"] = $pokemonData['sprites']["front_default"];
        $pokemonData["weight"] = Utility::readableWeightMetric($pokemonData["weight"]);
        $pokemonData["height"] = Utility::readableWeightMetric($pokemonData["height"]);
        /* 
            Due to time having the name of ability would be enough for overview page AC on abilities. 
            If I had more time I would of add a call to https://pokeapi.co/api/v2/ability/ with id to get more info
        */
        $abilityArray = [];
        $index = 0;
        foreach ($pokemonData['abilities'] as $ability) {

            $abilityArray[$index]["name"] = ucfirst($ability["ability"]["name"]);
            $abilityResult = Http::get($ability["ability"]["url"])->json();
            $abilityArray[$index]["effect"] = $abilityResult["effect_entries"][0]["effect"];

            //dd($abilityResult);
            $index++;
        }
        $pokemonData["abilities"] =  $abilityArray;

        return view("overview", ['pokemon' => $pokemonData]);
    }


    /* 
        Needed to add search function
        didn't have time because it was risk if the user didn't type the exact name or id match. 
        Also AC wasn't specific on what the list would be filtered by 
        e.g. name. pokemon type , height or weight.
    */
}
