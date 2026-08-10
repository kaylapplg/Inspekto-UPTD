<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K5Pemeriksaan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K5PemeriksaanController extends Controller
{
    public function index()
    {
        $data = K5Pemeriksaan::all();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K5 Pemeriksaan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'jabatan_pengawas' => 'required|in:Pertama,Muda,Madya',
            'jml_pengawas' => 'sometimes|integer|min:0',
            'keg_pertama' => 'sometimes|integer|min:0',
            'keg_berkala' => 'sometimes|integer|min:0',
            'keg_ulang' => 'sometimes|integer|min:0',
            'keg_khusus' => 'sometimes|integer|min:0',
            'uji_norma_kerja' => 'sometimes|integer|min:0',
            'uji_norma_k3' => 'sometimes|integer|min:0',
            'hukum_nota_1' => 'sometimes|integer|min:0',
            'hukum_nota_2' => 'sometimes|integer|min:0',
            'hukum_lk' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K5Pemeriksaan::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K5 Pemeriksaan berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K5Pemeriksaan::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K5 Pemeriksaan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K5Pemeriksaan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'jabatan_pengawas' => 'sometimes|required|in:Pertama,Muda,Madya',
            'jml_pengawas' => 'sometimes|integer|min:0',
            'keg_pertama' => 'sometimes|integer|min:0',
            'keg_berkala' => 'sometimes|integer|min:0',
            'keg_ulang' => 'sometimes|integer|min:0',
            'keg_khusus' => 'sometimes|integer|min:0',
            'uji_norma_kerja' => 'sometimes|integer|min:0',
            'uji_norma_k3' => 'sometimes|integer|min:0',
            'hukum_nota_1' => 'sometimes|integer|min:0',
            'hukum_nota_2' => 'sometimes|integer|min:0',
            'hukum_lk' => 'sometimes|integer|min:0',
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
            'message' => 'Data K5 Pemeriksaan berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K5Pemeriksaan::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K5 Pemeriksaan berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
