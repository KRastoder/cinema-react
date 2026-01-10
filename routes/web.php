<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ShowController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get("/", [AdminController::class, 'main']);
        Route::resource("movies", MovieController::class);
        Route::resource("halls", HallController::class); //TODO ADD FULL CRUD
        Route::resource("shows", ShowController::class);
    });
});

require __DIR__ . '/settings.php';
