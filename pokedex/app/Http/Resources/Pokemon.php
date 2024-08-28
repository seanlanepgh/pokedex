<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Pokemon extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $types = array();
        foreach ($this->types as $type)
            $types[] = $type->name;

        return [
            'id' => $this->id,
            "name" => $this->name,
            "sprite" => $this->sprite,
            "types" => $types
        ];
    }
    /** Return with success = true so frontend can be sure that it is correct */
    public function with($request)
    {
        return [
            'success' => true
        ];
    }
}
