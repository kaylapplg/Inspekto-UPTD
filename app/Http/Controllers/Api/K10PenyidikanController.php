<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K10Penyidikan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K10PenyidikanController extends Controller
{
    public function index()
    {
        $data = K10Penyidikan::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K10 Penyidikan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'no_laporan' => 'required|string|max:100|unique:k10_penyidikan,no_laporan',
            'dugaan_pelanggaran' => 'required|string',
            'no_spt' => 'sometimes|nullable|string|max:100',
            'status_selesai' => 'sometimes|nullable|in:P21,SP3,Limpah POLSRI',
            'proses' => 'sometimes|nullable|string',
            'putusan_denda' => 'sometimes|nullable|integer|min:0',
            'putusan_kurungan' => 'sometimes|nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K10Penyidikan::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K10 Penyidikan berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K10Penyidikan::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K10 Penyidikan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K10Penyidikan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'no_laporan' => 'sometimes|required|string|max:100|unique:k10_penyidikan,no_laporan,' . $id,
            'dugaan_pelanggaran' => 'sometimes|required|string',
            'no_spt' => 'sometimes|nullable|string|max:100',
            'status_selesai' => 'sometimes|nullable|in:P21,SP3,Limpah POLSRI',
            'proses' => 'sometimes|nullable|string',
            'putusan_denda' => 'sometimes|nullable|integer|min:0',
            'putusan_kurungan' => 'sometimes|nullable|string|max:100',
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
            'message' => 'Data K10 Penyidikan berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K10Penyidikan::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K10 Penyidikan berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
