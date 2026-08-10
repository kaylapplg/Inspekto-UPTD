<?php

use App\Http\Controllers\Api\K10PenyidikanController;
use App\Http\Controllers\Api\K1PengawasController;
use App\Http\Controllers\Api\K2ObjekPengawasanController;
use App\Http\Controllers\Api\K3ObjekK3Controller;
use App\Http\Controllers\Api\K4JamsostekController;
use App\Http\Controllers\Api\K5PemeriksaanController;
use App\Http\Controllers\Api\K6KegiatanKbliController;
use App\Http\Controllers\Api\K7PerizinanController;
use App\Http\Controllers\Api\K8aKasusKecelakaanController;
use App\Http\Controllers\Api\K8bSumberBahayaController;
use App\Http\Controllers\Api\K8cAkibatSantunanController;
use App\Http\Controllers\Api\K9aPelanggaranKerjaController;
use App\Http\Controllers\Api\K9bPelanggaranK3Controller;
use App\Http\Controllers\Api\MasterKabKotaController;
use App\Http\Controllers\Api\MasterKbliController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('master-kab-kota', MasterKabKotaController::class);
Route::apiResource('master-kbli', MasterKbliController::class);

Route::apiResource('k1-pengawas', K1PengawasController::class);
Route::apiResource('k2-objek-pengawasan', K2ObjekPengawasanController::class);
Route::apiResource('k3-objek-k3', K3ObjekK3Controller::class);
Route::apiResource('k4-jamsostek', K4JamsostekController::class);
Route::apiResource('k5-pemeriksaan', K5PemeriksaanController::class);
Route::apiResource('k6-kegiatan-kbli', K6KegiatanKbliController::class);
Route::apiResource('k7-perizinan', K7PerizinanController::class);
Route::apiResource('k8a-kasus-kecelakaan', K8aKasusKecelakaanController::class);
Route::apiResource('k8b-sumber-bahaya', K8bSumberBahayaController::class);
Route::apiResource('k8c-akibat-santunan', K8cAkibatSantunanController::class);
Route::apiResource('k9a-pelanggaran-kerja', K9aPelanggaranKerjaController::class);
Route::apiResource('k9b-pelanggaran-k3', K9bPelanggaranK3Controller::class);
Route::apiResource('k10-penyidikan', K10PenyidikanController::class);
