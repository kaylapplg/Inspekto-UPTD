<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K3ObjekK3;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K3ObjekK3Controller extends Controller
{
    public function index()
    {
        $data = K3ObjekK3::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K3 Objek K3 berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'pesawat_uap' => 'sometimes|integer|min:0',
            'bejana_tekan' => 'sometimes|integer|min:0',
            'pesawat_angkat' => 'sometimes|integer|min:0',
            'pesawat_tenaga' => 'sometimes|integer|min:0',
            'listrik' => 'sometimes|integer|min:0',
            'eskalator' => 'sometimes|integer|min:0',
            'cegah_kebakaran' => 'sometimes|integer|min:0',
            'kesehatan_kerja' => 'sometimes|integer|min:0',
            'konstruksi' => 'sometimes|integer|min:0',
            'lingkungan_kerja' => 'sometimes|integer|min:0',
            'bahan_kimia' => 'sometimes|integer|min:0',
            'ruang_terbatas' => 'sometimes|integer|min:0',
            'sarana_k3' => 'sometimes|integer|min:0',
            'personil_k3' => 'sometimes|integer|min:0',
            'p2k3' => 'sometimes|integer|min:0',
            'perancah' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K3ObjekK3::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K3 Objek K3 berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K3ObjekK3::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K3 Objek K3 berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K3ObjekK3::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'pesawat_uap' => 'sometimes|integer|min:0',
            'bejana_tekan' => 'sometimes|integer|min:0',
            'pesawat_angkat' => 'sometimes|integer|min:0',
            'pesawat_tenaga' => 'sometimes|integer|min:0',
            'listrik' => 'sometimes|integer|min:0',
            'eskalator' => 'sometimes|integer|min:0',
            'cegah_kebakaran' => 'sometimes|integer|min:0',
            'kesehatan_kerja' => 'sometimes|integer|min:0',
            'konstruksi' => 'sometimes|integer|min:0',
            'lingkungan_kerja' => 'sometimes|integer|min:0',
            'bahan_kimia' => 'sometimes|integer|min:0',
            'ruang_terbatas' => 'sometimes|integer|min:0',
            'sarana_k3' => 'sometimes|integer|min:0',
            'personil_k3' => 'sometimes|integer|min:0',
            'p2k3' => 'sometimes|integer|min:0',
            'perancah' => 'sometimes|integer|min:0',
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
            'message' => 'Data K3 Objek K3 berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K3ObjekK3::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K3 Objek K3 berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
