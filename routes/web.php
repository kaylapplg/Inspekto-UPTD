<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// 1. Jika ada yang membuka web (http://127.0.0.1:8000/), langsung lempar ke halaman Login
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. Halaman UPTD kita taruh di /dashboard dan kita "Gembok" dengan middleware 'auth'
Route::get('/k1-pengawas', function () {
    return Inertia::render('uptd-mockup');
})->middleware(['auth', 'verified'])->name('dashboard');

// 3. Rute bawaan Breeze untuk mengatur profil (jangan dihapus)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';