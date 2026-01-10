<?php
namespace App\Http\Controllers;

use App\Models\Halls;
use App\Repositories\HallsRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HallController extends Controller
{
    public function __construct(private HallsRepository $hallsRepo)
    {}

    public function index()
    {
        return Inertia::render("admin/halls/Halls");
    }

    public function store(Request $request)
    {
        $request->validate([
            "name"         => "required|string",
            "city"         => "required|string",
            "rows"         => "required|integer|min:1",
            "columns"      => "required|integer|min:1",
            "row_walkways" => "nullable|array",
            "col_walkways" => "nullable|array",
            "vip_seats"    => "nullable|array",
        ]);

        $this->hallsRepo->createHallsAndSeats($request);

        return redirect()->back();
    }

    public function show(Halls $halls)
    {
        //
    }

    public function edit(Halls $halls)
    {
        //
    }

    public function update(Request $request, Halls $halls)
    {
        //
    }

    public function destroy(Halls $halls)
    {
        //
    }
}
