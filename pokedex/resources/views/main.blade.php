<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Pokedex</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
</head>
<div class="container">
    <!-- Added a form to search didn't have time to implement search -->
    <form method="get" action="/search">
        @csrf
        <input type="text" id="search" placeholder="Enter pokémon name..." name="search" />
        <button type="submit">Search</button>
    </form>
</div>
@if (isset($pokemons))
<div class="pokedex">
    @foreach ($pokemons as $pokemon)
    <form method="get" action="/overview">
        @csrf
        <input type="hidden" id="id" name="id" value={{ $pokemon["id"] }} />
        <input type="hidden" id="name" name="name" value={{ $pokemon["name"] }} />
        <div class="pokemon">
            <button type="submit">
                <div class="pokemonName">{{ $pokemon["name"] }}</div>
                <img src={{ $pokemon["sprite"] }} />
                <div class="stats">
                    <div class="pokemonID">ID: {{ $pokemon["id"] }}</div>
                    <div>
                        <div>Height: {{ $pokemon["height"]  }}
                        </div>
                    </div>
                    <div>
                        <div>Weight: {{ $pokemon["weight"] }}
                        </div>
                    </div>
                </div>
            </button>
        </div>
    </form>
    @endforeach
</div>
<!-- Add pagination -->
<div class="pagination">
    @if (isset($pagination["previous"]))
    <form method="get" action="/">
        @csrf
        <input type="hidden" id="pagination" name="pagination" value={{ $pagination["previous"] }} />
        <button type="submit">Previous Page</button>
    </form>
    @endif
    @if (isset($pagination["next"]))
    <form method="get" action="/">
        @csrf
        <input type="hidden" id="pagination" name="pagination" value={{ $pagination["next"] }} />
        <button type="submit">Next Page</button>
    </form>
    @endif
</div>
@else
<div> Unable to show Pokedex.</div>
@endif

</html>