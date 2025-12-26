<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $fillable = [
        "publisher",
        "name",
        "description",
        "release_date",
    ];
}
