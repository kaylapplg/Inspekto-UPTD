<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K8aKasusKecelakaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K8aKasusKecelakaanController extends Controller
{
    public function index()
    {
        $data = K8aKasusKecelakaan::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8A Kasus Kecelakaan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'jml_kasus' => 'sometimes|integer|min:0',
            'keracunan' => 'sometimes|integer|min:0',
            'meninggal' => 'sometimes|integer|min:0',
            'dugaan_pak' => 'sometimes|integer|min:0',
            'pak' => 'sometimes|integer|min:0',
            'korban_total' => 'sometimes|integer|min:0',
            'tipe_a' => 'sometimes|integer|min:0',
            'tipe_b' => 'sometimes|integer|min:0',
            'tipe_c' => 'sometimes|integer|min:0',
            'tipe_d' => 'sometimes|integer|min:0',
            'tipe_e' => 'sometimes|integer|min:0',
            'tipe_f' => 'sometimes|integer|min:0',
            'tipe_g' => 'sometimes|integer|min:0',
            'tipe_h' => 'sometimes|integer|min:0',
            'tipe_i' => 'sometimes|integer|min:0',
            'tipe_j' => 'sometimes|integer|min:0',
            'tipe_k' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K8aKasusKecelakaan::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8A Kasus Kecelakaan berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K8aKasusKecelakaan::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8A Kasus Kecelakaan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K8aKasusKecelakaan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'jml_kasus' => 'sometimes|integer|min:0',
            'keracunan' => 'sometimes|integer|min:0',
            'meninggal' => 'sometimes|integer|min:0',
            'dugaan_pak' => 'sometimes|integer|min:0',
            'pak' => 'sometimes|integer|min:0',
            'korban_total' => 'sometimes|integer|min:0',
            'tipe_a' => 'sometimes|integer|min:0',
            'tipe_b' => 'sometimes|integer|min:0',
            'tipe_c' => 'sometimes|integer|min:0',
            'tipe_d' => 'sometimes|integer|min:0',
            'tipe_e' => 'sometimes|integer|min:0',
            'tipe_f' => 'sometimes|integer|min:0',
            'tipe_g' => 'sometimes|integer|min:0',
            'tipe_h' => 'sometimes|integer|min:0',
            'tipe_i' => 'sometimes|integer|min:0',
            'tipe_j' => 'sometimes|integer|min:0',
            'tipe_k' => 'sometimes|integer|min:0',
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
            'message' => 'Data K8A Kasus Kecelakaan berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K8aKasusKecelakaan::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8A Kasus Kecelakaan berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
