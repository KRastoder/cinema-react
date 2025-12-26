<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function main()
    {
        $user = Auth::user();

        return Inertia::render('admin/adminMain', [
            "user" => $user
        ]);
    }
}
