<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K8cAkibatSantunan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K8cAkibatSantunanController extends Controller
{
    public function index()
    {
        $data = K8cAkibatSantunan::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8C Akibat Santunan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'akibat_sembuh' => 'sometimes|integer|min:0',
            'akibat_stmb' => 'sometimes|integer|min:0',
            'akibat_cacat' => 'sometimes|integer|min:0',
            'akibat_meninggal' => 'sometimes|integer|min:0',
            'santunan_berkala' => 'sometimes|numeric|min:0',
            'santunan_sekaligus' => 'sometimes|numeric|min:0',
            'santunan_pendidikan' => 'sometimes|numeric|min:0',
            'santunan_kembali_kerja' => 'sometimes|numeric|min:0',
            'kerugian_ekonomi' => 'sometimes|numeric|min:0',
            'jam_kerja_hilang' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K8cAkibatSantunan::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8C Akibat Santunan berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K8cAkibatSantunan::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8C Akibat Santunan berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K8cAkibatSantunan::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'akibat_sembuh' => 'sometimes|integer|min:0',
            'akibat_stmb' => 'sometimes|integer|min:0',
            'akibat_cacat' => 'sometimes|integer|min:0',
            'akibat_meninggal' => 'sometimes|integer|min:0',
            'santunan_berkala' => 'sometimes|numeric|min:0',
            'santunan_sekaligus' => 'sometimes|numeric|min:0',
            'santunan_pendidikan' => 'sometimes|numeric|min:0',
            'santunan_kembali_kerja' => 'sometimes|numeric|min:0',
            'kerugian_ekonomi' => 'sometimes|numeric|min:0',
            'jam_kerja_hilang' => 'sometimes|integer|min:0',
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
            'message' => 'Data K8C Akibat Santunan berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K8cAkibatSantunan::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K8C Akibat Santunan berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
