<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K1Pengawas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class K1PengawasController extends Controller
{
    public function index()
    {
        $data = K1Pengawas::all();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K1 Pengawas berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $payload = $request->all();
        $isBatch = array_is_list($payload);

        $validator = Validator::make($payload, $isBatch ? [
            '*.bulan' => 'required|string|max:20',
            '*.tahun' => 'required|integer|min:1900|max:2100',
            '*.jabatan' => 'required|in:Pertama,Muda,Madya',
            '*.pengawas_umum' => 'sometimes|integer|min:0',
            '*.spesialis_1' => 'sometimes|integer|min:0',
            '*.spesialis_2' => 'sometimes|integer|min:0',
            '*.spesialis_3' => 'sometimes|integer|min:0',
            '*.spesialis_4' => 'sometimes|integer|min:0',
            '*.spesialis_5' => 'sometimes|integer|min:0',
            '*.spesialis_6' => 'sometimes|integer|min:0',
            '*.spesialis_7' => 'sometimes|integer|min:0',
            '*.spesialis_8' => 'sometimes|integer|min:0',
            '*.spesialis_9' => 'sometimes|integer|min:0',
            '*.spesialis_10' => 'sometimes|integer|min:0',
            '*.spesialis_11' => 'sometimes|integer|min:0',
            '*.ppns' => 'sometimes|integer|min:0',
        ] : [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'jabatan' => 'required|in:Pertama,Muda,Madya',
            'pengawas_umum' => 'sometimes|integer|min:0',
            'spesialis_1' => 'sometimes|integer|min:0',
            'spesialis_2' => 'sometimes|integer|min:0',
            'spesialis_3' => 'sometimes|integer|min:0',
            'spesialis_4' => 'sometimes|integer|min:0',
            'spesialis_5' => 'sometimes|integer|min:0',
            'spesialis_6' => 'sometimes|integer|min:0',
            'spesialis_7' => 'sometimes|integer|min:0',
            'spesialis_8' => 'sometimes|integer|min:0',
            'spesialis_9' => 'sometimes|integer|min:0',
            'spesialis_10' => 'sometimes|integer|min:0',
            'spesialis_11' => 'sometimes|integer|min:0',
            'ppns' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $validated = $validator->validated();
        $records = $isBatch ? $validated : [$validated];

        $data = DB::transaction(function () use ($records) {
            return collect($records)->map(fn ($record) => K1Pengawas::create($record))->values();
        });

        return response()->json([
            'status' => 'success',
            'message' => $isBatch ? 'Data K1 Pengawas berhasil dibuat secara batch' : 'Data K1 Pengawas berhasil dibuat',
            'data' => $isBatch ? $data : $data->first(),
        ], 201);
    }

    public function show($id)
    {
        $data = K1Pengawas::findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K1 Pengawas berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K1Pengawas::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'jabatan' => 'sometimes|required|in:Pertama,Muda,Madya',
            'pengawas_umum' => 'sometimes|integer|min:0',
            'spesialis_1' => 'sometimes|integer|min:0',
            'spesialis_2' => 'sometimes|integer|min:0',
            'spesialis_3' => 'sometimes|integer|min:0',
            'spesialis_4' => 'sometimes|integer|min:0',
            'spesialis_5' => 'sometimes|integer|min:0',
            'spesialis_6' => 'sometimes|integer|min:0',
            'spesialis_7' => 'sometimes|integer|min:0',
            'spesialis_8' => 'sometimes|integer|min:0',
            'spesialis_9' => 'sometimes|integer|min:0',
            'spesialis_10' => 'sometimes|integer|min:0',
            'spesialis_11' => 'sometimes|integer|min:0',
            'ppns' => 'sometimes|integer|min:0',
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
            'message' => 'Data K1 Pengawas berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K1Pengawas::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K1 Pengawas berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
