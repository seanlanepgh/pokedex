<div class="pokemon">
    <div class="pokemonName">{{ $pokemon["name"]}}</div>
    <div class="pokemonID">ID: {{ $pokemon["id"] }}</div>
    <img src={{ $pokemon["sprite"] }} />
    <div class="stats">
        <div>
            <div>Height</div>
            <div>
                {{ $pokemon["height"] }}
            </div>
        </div>
        <div>
            <div>Weight</div>
            <div>
                {{ $pokemon["weight"] }}
            </div>
        </div>
        <div>Abilities</div>
        @if (isset($pokemon["abilities"]))
        @foreach ($pokemon["abilities"] as $ability)
        <div>
            <div>
                {{$ability["name"]}}
            </div>
            <div>
                {{$ability["effect"]}}
            </div>
        </div>
        @endforeach
        @else
        <div> No Abilities.</div>
        @endif
        <form method="get" action="/">
            @csrf
            <button type="submit">Back to Main Page</button>
        </form>
    </div>