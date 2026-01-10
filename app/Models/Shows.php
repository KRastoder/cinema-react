<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Shows extends Model
{
    protected $fillable = [
        'movie_id',
        'hall_id',
        'price',
        'vip_price',
        'show_time',
        'show_date',

    ];
}
