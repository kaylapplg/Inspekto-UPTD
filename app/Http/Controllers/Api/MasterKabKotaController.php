<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MasterKabKota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MasterKabKotaController extends Controller
{
    public function index()
    {
        $data = MasterKabKota::with([
            'k2ObjekPengawasans',
            'k3ObjekK3s',
            'k4Jamsosteks',
            'k6KegiatanKblis',
            'k7Perizinans',
            'k8aKasusKecelakaans',
            'k8bSumberBahayas',
            'k8cAkibatSantunans',
            'k9aPelanggaranKerjas',
            'k9bPelanggaranK3s',
            'k10Penyidikans',
        ])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data master kabupaten/kota berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_kota' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = MasterKabKota::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data master kabupaten/kota berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = MasterKabKota::with([
            'k2ObjekPengawasans',
            'k3ObjekK3s',
            'k4Jamsosteks',
            'k6KegiatanKblis',
            'k7Perizinans',
            'k8aKasusKecelakaans',
            'k8bSumberBahayas',
            'k8cAkibatSantunans',
            'k9aPelanggaranKerjas',
            'k9bPelanggaranK3s',
            'k10Penyidikans',
        ])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data master kabupaten/kota berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = MasterKabKota::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nama_kota' => 'sometimes|required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data master kabupaten/kota berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = MasterKabKota::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data master kabupaten/kota berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
