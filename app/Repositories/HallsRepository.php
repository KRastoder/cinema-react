<?php
namespace App\Repositories;

use App\Models\Halls;
use App\Models\HallSeats;
use Illuminate\Support\Facades\DB;

class HallsRepository
{
    public function __construct(
        protected Halls $hallsModel = new Halls(),
        protected HallSeats $hallSeatsModel = new HallSeats()
    ) {}

    public function createHallsAndSeats($request)
    {
        return DB::transaction(function () use ($request) {
            $hall = $this->hallsModel->create([
                'name'     => $request->name,
                'city'     => $request->city,
                'rows'     => $request->rows,
                'columns'  => $request->columns,
                'row_gaps' => $request->row_walkways ?? [],
                'col_gaps' => $request->col_walkways ?? [],
            ]);

            $totalSeats = $request->rows * $request->columns;
            $vipSeats   = (array) $request->vip_seats;

            for ($i = 1; $i <= $totalSeats; $i++) {
                $this->hallSeatsModel->create([
                    'hall_id'     => $hall->id,
                    'seat_number' => $i,
                    'type'        => in_array($i, $vipSeats) ? 'vip' : 'normal',
                ]);
            }

            return $hall;
        });
    }
    public function fetchAllHalls()
    {
        return $this->hallsModel
            ->select('id', 'name')
            ->get();
    }
}
