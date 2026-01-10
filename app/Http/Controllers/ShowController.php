<?php
namespace App\Http\Controllers;

use App\Models\Shows;
use App\Repositories\HallsRepository;
use App\Repositories\MovieRepository;
use App\Repositories\ShowRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowController extends Controller
{
    public function __construct(
        protected ShowRepository $showRepo,
        protected MovieRepository $movieRepo,
        protected HallsRepository $hallsRepo,
    ) {}
    public function index()
    {
        return Inertia::render('admin/ShowsIndex', [
            "allMovies" => $this->movieRepo->fetchAllMovies(),
            "allHalls"  => $this->hallsRepo->fetchAllHalls(), 
            "allshows"
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'movie_id'  => ['required', 'exists:movies,id'],
            'hall_id'   => ['required', 'exists:halls,id'],
            'price'     => ['required', 'integer', 'min:0'],
            'vip_price' => ['required', 'integer', 'min:0'],
            'show_time' => ['required', 'integer', 'min:1', 'max:24'],
            'show_date' => ['required', 'date'],
        ]);
        $this->showRepo->create($validated);
        return redirect()->back();
    }

    public function show(Shows $shows)
    {
    }

    public function edit(Shows $shows)
    {
    }

    public function update(Request $request, Shows $shows)
    {
    }

    public function destroy(Shows $shows)
    {
    }
}