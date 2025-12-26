<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function main()
    {

        return Inertia::render('admin/adminMain');
    }
}
