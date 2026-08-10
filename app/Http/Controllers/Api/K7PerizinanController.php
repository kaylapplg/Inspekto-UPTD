<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K7Perizinan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K7PerizinanController extends Controller
{
    public function index()
    {
        $data = K7Perizinan::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K7 Perizinan berhasil diambil',
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
            'paa' => 'sometimes|integer|min:0',
            'ptp' => 'sometimes|integer|min:0',
            'listrik' => 'sometimes|integer|min:0',
            'elevator' => 'sometimes|integer|min:0',
            'petir' => 'sometimes|integer|min:0',
            'kebakaran' => 'sometimes|integer|min:0',
            'konstruksi' => 'sometimes|integer|min:0',
            'klinik' => 'sometimes|integer|min:0',
            'lingkungan' => 'sometimes|integer|min:0',
            'kimia' => 'sometimes|integer|min:0',
            'makan' => 'sometimes|integer|min:0',
            'p2k3' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K7Perizinan::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K7 Perizinan berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K7Perizinan::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K7 Perizinan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K7Perizinan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'pesawat_uap' => 'sometimes|integer|min:0',
            'bejana_tekan' => 'sometimes|integer|min:0',
            'paa' => 'sometimes|integer|min:0',
            'ptp' => 'sometimes|integer|min:0',
            'listrik' => 'sometimes|integer|min:0',
            'elevator' => 'sometimes|integer|min:0',
            'petir' => 'sometimes|integer|min:0',
            'kebakaran' => 'sometimes|integer|min:0',
            'konstruksi' => 'sometimes|integer|min:0',
            'klinik' => 'sometimes|integer|min:0',
            'lingkungan' => 'sometimes|integer|min:0',
            'kimia' => 'sometimes|integer|min:0',
            'makan' => 'sometimes|integer|min:0',
            'p2k3' => 'sometimes|integer|min:0',
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
            'message' => 'Data K7 Perizinan berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K7Perizinan::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K7 Perizinan berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
