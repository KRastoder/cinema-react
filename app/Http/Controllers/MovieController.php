<?php
namespace App\Http\Controllers;

use App\Models\Movie;
use App\Repositories\MovieRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function __construct(
        private $movieRepo = new MovieRepository(),
    ) {}

    public function index()
    {
        $allMovies = $this->movieRepo->allMovies();

        return Inertia::render('admin/MovieDashboard', [
            'movies' => $allMovies,
        ]);
    }

    public function store(Request $request)
    {
        $this->movieRepo->createMovie($request);

        return redirect()->route('admin.movies.index');
    }

    public function update(Request $request, Movie $movie)
    {
        $this->movieRepo->updateMovie($movie->id, $request->all());

        return redirect()->route('admin.movies.index');
    }

    public function destroy($id)
    {
        $this->movieRepo->deleteMovie($id);

        return redirect()->route('admin.movies.index');
    }
}
