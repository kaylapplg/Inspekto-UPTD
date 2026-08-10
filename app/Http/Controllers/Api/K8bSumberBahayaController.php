<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K8bSumberBahaya;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K8bSumberBahayaController extends Controller
{
    public function index()
    {
        $data = K8bSumberBahaya::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8B Sumber Bahaya berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'sumber_a' => 'sometimes|integer|min:0',
            'sumber_b' => 'sometimes|integer|min:0',
            'sumber_c' => 'sometimes|integer|min:0',
            'sumber_d' => 'sometimes|integer|min:0',
            'sumber_e' => 'sometimes|integer|min:0',
            'sumber_f' => 'sometimes|integer|min:0',
            'sumber_g' => 'sometimes|integer|min:0',
            'sumber_h' => 'sometimes|integer|min:0',
            'sumber_i' => 'sometimes|integer|min:0',
            'sumber_j' => 'sometimes|integer|min:0',
            'sumber_k' => 'sometimes|integer|min:0',
            'sumber_l' => 'sometimes|integer|min:0',
            'sumber_m' => 'sometimes|integer|min:0',
            'sumber_n' => 'sometimes|integer|min:0',
            'sumber_o' => 'sometimes|integer|min:0',
            'sumber_p' => 'sometimes|integer|min:0',
            'sumber_q' => 'sometimes|integer|min:0',
            'sumber_r' => 'sometimes|integer|min:0',
            'sumber_s' => 'sometimes|integer|min:0',
            'sumber_t' => 'sometimes|integer|min:0',
            'sumber_u' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K8bSumberBahaya::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8B Sumber Bahaya berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K8bSumberBahaya::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8B Sumber Bahaya berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K8bSumberBahaya::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'sumber_a' => 'sometimes|integer|min:0',
            'sumber_b' => 'sometimes|integer|min:0',
            'sumber_c' => 'sometimes|integer|min:0',
            'sumber_d' => 'sometimes|integer|min:0',
            'sumber_e' => 'sometimes|integer|min:0',
            'sumber_f' => 'sometimes|integer|min:0',
            'sumber_g' => 'sometimes|integer|min:0',
            'sumber_h' => 'sometimes|integer|min:0',
            'sumber_i' => 'sometimes|integer|min:0',
            'sumber_j' => 'sometimes|integer|min:0',
            'sumber_k' => 'sometimes|integer|min:0',
            'sumber_l' => 'sometimes|integer|min:0',
            'sumber_m' => 'sometimes|integer|min:0',
            'sumber_n' => 'sometimes|integer|min:0',
            'sumber_o' => 'sometimes|integer|min:0',
            'sumber_p' => 'sometimes|integer|min:0',
            'sumber_q' => 'sometimes|integer|min:0',
            'sumber_r' => 'sometimes|integer|min:0',
            'sumber_s' => 'sometimes|integer|min:0',
            'sumber_t' => 'sometimes|integer|min:0',
            'sumber_u' => 'sometimes|integer|min:0',
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
            'message' => 'Data K8B Sumber Bahaya berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K8bSumberBahaya::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8B Sumber Bahaya berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
