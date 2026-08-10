<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K2ObjekPengawasan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K2ObjekPengawasanController extends Controller
{
    public function index()
    {
        $data = K2ObjekPengawasan::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K2 Objek Pengawasan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'jml_perusahaan' => 'sometimes|integer|min:0',
            'tk_wni_l' => 'sometimes|integer|min:0',
            'tk_wni_p' => 'sometimes|integer|min:0',
            'tk_wna_l' => 'sometimes|integer|min:0',
            'tk_wna_p' => 'sometimes|integer|min:0',
            'kat_mikro' => 'sometimes|integer|min:0',
            'kat_kecil' => 'sometimes|integer|min:0',
            'kat_menengah' => 'sometimes|integer|min:0',
            'kat_besar' => 'sometimes|integer|min:0',
            'stat_swasta' => 'sometimes|integer|min:0',
            'stat_persero' => 'sometimes|integer|min:0',
            'stat_perum' => 'sometimes|integer|min:0',
            'stat_bumd' => 'sometimes|integer|min:0',
            'stat_yayasan' => 'sometimes|integer|min:0',
            'stat_koperasi' => 'sometimes|integer|min:0',
            'stat_perseorangan' => 'sometimes|integer|min:0',
            'stat_joint' => 'sometimes|integer|min:0',
            'hi_pp' => 'sometimes|integer|min:0',
            'hi_pkb' => 'sometimes|integer|min:0',
            'hi_sp_sb' => 'sometimes|integer|min:0',
            'hi_tripartit' => 'sometimes|integer|min:0',
            'penghargaan_k3' => 'sometimes|nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K2ObjekPengawasan::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K2 Objek Pengawasan berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K2ObjekPengawasan::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K2 Objek Pengawasan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K2ObjekPengawasan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'jml_perusahaan' => 'sometimes|integer|min:0',
            'tk_wni_l' => 'sometimes|integer|min:0',
            'tk_wni_p' => 'sometimes|integer|min:0',
            'tk_wna_l' => 'sometimes|integer|min:0',
            'tk_wna_p' => 'sometimes|integer|min:0',
            'kat_mikro' => 'sometimes|integer|min:0',
            'kat_kecil' => 'sometimes|integer|min:0',
            'kat_menengah' => 'sometimes|integer|min:0',
            'kat_besar' => 'sometimes|integer|min:0',
            'stat_swasta' => 'sometimes|integer|min:0',
            'stat_persero' => 'sometimes|integer|min:0',
            'stat_perum' => 'sometimes|integer|min:0',
            'stat_bumd' => 'sometimes|integer|min:0',
            'stat_yayasan' => 'sometimes|integer|min:0',
            'stat_koperasi' => 'sometimes|integer|min:0',
            'stat_perseorangan' => 'sometimes|integer|min:0',
            'stat_joint' => 'sometimes|integer|min:0',
            'hi_pp' => 'sometimes|integer|min:0',
            'hi_pkb' => 'sometimes|integer|min:0',
            'hi_sp_sb' => 'sometimes|integer|min:0',
            'hi_tripartit' => 'sometimes|integer|min:0',
            'penghargaan_k3' => 'sometimes|nullable|string',
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
            'message' => 'Data K2 Objek Pengawasan berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K2ObjekPengawasan::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K2 Objek Pengawasan berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
