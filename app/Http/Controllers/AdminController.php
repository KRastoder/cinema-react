<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function main()
    {
        $user = Auth::user();

        return Inertia::render('admin/AdminMain', [
            "user" => $user,
        ]);
    }

}
