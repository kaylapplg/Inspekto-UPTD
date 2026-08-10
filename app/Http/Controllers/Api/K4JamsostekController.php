<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K4Jamsostek;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K4JamsostekController extends Controller
{
    public function index()
    {
        $data = K4Jamsostek::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K4 Jamsostek berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'jml_perusahaan_bpjs' => 'sometimes|integer|min:0',
            'tk_wni_bpjs' => 'sometimes|integer|min:0',
            'tk_wna_bpjs' => 'sometimes|integer|min:0',
            'prog_jkn' => 'sometimes|integer|min:0',
            'prog_jkk_jkm' => 'sometimes|integer|min:0',
            'prog_jht' => 'sometimes|integer|min:0',
            'prog_jp' => 'sometimes|integer|min:0',
            'prog_jkp' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K4Jamsostek::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K4 Jamsostek berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K4Jamsostek::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K4 Jamsostek berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K4Jamsostek::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'jml_perusahaan_bpjs' => 'sometimes|integer|min:0',
            'tk_wni_bpjs' => 'sometimes|integer|min:0',
            'tk_wna_bpjs' => 'sometimes|integer|min:0',
            'prog_jkn' => 'sometimes|integer|min:0',
            'prog_jkk_jkm' => 'sometimes|integer|min:0',
            'prog_jht' => 'sometimes|integer|min:0',
            'prog_jp' => 'sometimes|integer|min:0',
            'prog_jkp' => 'sometimes|integer|min:0',
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
            'message' => 'Data K4 Jamsostek berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K4Jamsostek::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K4 Jamsostek berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
