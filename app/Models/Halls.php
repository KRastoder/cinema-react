<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Halls extends Model
{
    protected $table = "halls";

    protected $fillable = [
        "name",
        "city",
        "rows",
        "columns",
        "row_gaps",
        "col_gaps"
    ];
    protected $casts = [
        'row_gaps' => 'array',
        'col_gaps' => 'array',
    ];
}
