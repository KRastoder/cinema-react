<?php
namespace App\Repositories;

use App\Models\Movie;
use Illuminate\Support\Facades\Storage;

class MovieRepository
{

    public function __construct(
        private Movie $movieModel = new Movie()
    ) {}

    public function createMovie($request): void
    {
        $request->validate([
            'title'        => 'required|string|max:255',
            'duration'     => 'required|integer',
            'description'  => 'required|string',
            'release_date' => 'required|date',
            'poster'       => 'nullable|image|max:2048',
        ]);

        $posterPath = null;
        if ($request->hasFile('poster')) {
            $posterPath = $request->file('poster')->store('posters', 'public');
        }

        $this->movieModel->create([
            'title'        => $request->title,
            'duration'     => $request->duration,
            'description'  => $request->description,
            'release_date' => $request->release_date,
            'poster'       => $posterPath,
        ]);
    }

    public function allMovies(): mixed
    {
        return $this->movieModel->orderBy('created_at', 'desc')->get();
    }

    public function updateMovie($id, $data)
    {
        $movie = Movie::findOrFail($id);

        $updateData = [
            'title'        => $data['title'],
            'duration'     => $data['duration'] ?? null,
            'description'  => $data['description'] ?? null,
            'release_date' => $data['release_date'] ?? null,
        ];

        // If a new poster is uploaded, delete the old one and store the new one
        if (isset($data['poster']) && $data['poster'] instanceof \Illuminate\Http\UploadedFile) {
            if ($movie->poster) {
                Storage::disk('public')->delete($movie->poster);
            }

            $updateData['poster'] = $data['poster']->store('posters', 'public');
        }

        return $movie->update($updateData);
    }

    public function deleteMovie($id)
    {
        $movie = Movie::findOrFail($id);

        if ($movie->poster) {
            Storage::disk('public')->delete($movie->poster);
        }

        return $movie->delete();
    }
}
