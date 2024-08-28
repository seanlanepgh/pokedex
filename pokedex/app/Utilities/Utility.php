<?php

namespace App\Utilities;

class Utility
{

    public static function readableWeightMetric($value)
    {
        return strval($value / 10) . " kg";
    }
    public static function readableHeightMetric($value)
    {
        return strval($value / 10) . " m";
    }
}
