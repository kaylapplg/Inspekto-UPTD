<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Halaman awal langsung diarahkan ke login
Route::get('/', function () {
    return redirect()->route('login');
});

// Tujuan utama setelah login sukses: menu K1 Pengawas
Route::get('/k1-pengawas', function () {
    return Inertia::render('uptd-mockup');
})->middleware('auth')->name('dashboard');

// Rute bawaan Breeze untuk profil
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
