<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowSeats extends Model
{
    protected $fillable = [
        "show_id",
        "hall_seat_id",
        "status",
    ];
}
