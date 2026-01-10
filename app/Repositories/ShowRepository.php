<?php

namespace App\Repositories;

use App\Models\HallSeats;
use App\Models\Shows;
use App\Models\ShowSeats;

class ShowRepository
{
    public function __construct(
        protected Shows $showsModel,
        protected ShowSeats $showSeatsModel,
    ) {}

    public function create(array $data)
    {

        $show  = $this->showsModel->create($data);
        $seats = HallSeats::where("hall_id", "$show->hall_id")->get();

        foreach ($seats as $seat) {
            $this->showSeatsModel->create([
                "show_id" => $show->id,
                "hall_seat_id" => $seat->id,
            ]);
        }
    }
}

