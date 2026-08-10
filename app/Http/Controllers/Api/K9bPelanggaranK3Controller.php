<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K9bPelanggaranK3;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K9bPelanggaranK3Controller extends Controller
{
    public function index()
    {
        $data = K9bPelanggaranK3::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9B Pelanggaran K3 berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'pelanggaran_p2k3' => 'sometimes|integer|min:0',
            'ahli_k3' => 'sometimes|integer|min:0',
            'personil_k3_lainnya' => 'sometimes|integer|min:0',
            'pjk3' => 'sometimes|integer|min:0',
            'unit_p3k' => 'sometimes|integer|min:0',
            'sarana_makan' => 'sometimes|integer|min:0',
            'pengendalian_b3' => 'sometimes|integer|min:0',
            'dokter_perusahaan' => 'sometimes|integer|min:0',
            'paramedis_perusahaan' => 'sometimes|integer|min:0',
            'dokter_pktk' => 'sometimes|integer|min:0',
            'riksa_awal' => 'sometimes|integer|min:0',
            'riksa_berkala' => 'sometimes|integer|min:0',
            'riksa_khusus' => 'sometimes|integer|min:0',
            'lainnya' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K9bPelanggaranK3::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9B Pelanggaran K3 berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K9bPelanggaranK3::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9B Pelanggaran K3 berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K9bPelanggaranK3::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'pelanggaran_p2k3' => 'sometimes|integer|min:0',
            'ahli_k3' => 'sometimes|integer|min:0',
            'personil_k3_lainnya' => 'sometimes|integer|min:0',
            'pjk3' => 'sometimes|integer|min:0',
            'unit_p3k' => 'sometimes|integer|min:0',
            'sarana_makan' => 'sometimes|integer|min:0',
            'pengendalian_b3' => 'sometimes|integer|min:0',
            'dokter_perusahaan' => 'sometimes|integer|min:0',
            'paramedis_perusahaan' => 'sometimes|integer|min:0',
            'dokter_pktk' => 'sometimes|integer|min:0',
            'riksa_awal' => 'sometimes|integer|min:0',
            'riksa_berkala' => 'sometimes|integer|min:0',
            'riksa_khusus' => 'sometimes|integer|min:0',
            'lainnya' => 'sometimes|integer|min:0',
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
            'message' => 'Data K9B Pelanggaran K3 berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K9bPelanggaranK3::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9B Pelanggaran K3 berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
