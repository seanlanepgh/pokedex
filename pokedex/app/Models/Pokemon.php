<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pokemon extends Model
{
    //remove requirement for timestamps from Pokemon Table
    public $timestamps = false;

    public $table = 'pokemon';

    protected $hidden = ['pivot'];

    //this is for eager loading the relationships, so that it is faster
    protected $with = ['abilities', 'types'];

    //mass assignable items
    protected $fillable = [
        "name",
        "height",
        "weight",
        "stats",
        "species",
        "description"
    ];

    /** Return the types of a specific pokemon */
    public function types()
    {
        return $this->belongsToMany(Type::class, 'pokemon_type', 'pokemon_id', 'type_id')->select(['type_id', 'name']);
    }

    /** Return the abilities of a specific pokemon */
    public function abilities()
    {
        return $this->belongsToMany(Ability::class, 'pokemon_abilities', 'pokemon_id', 'ability_id')->select(['ability_id', 'name']);
    }
}
