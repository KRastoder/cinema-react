<?php

namespace App\Http\Controllers;

use App\Repositories\ShowRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationsController extends Controller
{
    public function __construct(
        ShowRepository $showsRepo
    ) {}
    public function reservationPage()
    {

        return Inertia::render("ShowsPage");
    }
}
