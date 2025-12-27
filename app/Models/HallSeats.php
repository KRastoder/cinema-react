<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HallSeats extends Model
{
    protected $fillable = [
        "hall_id",
        "seat_number",
        "type"
    ];
}
