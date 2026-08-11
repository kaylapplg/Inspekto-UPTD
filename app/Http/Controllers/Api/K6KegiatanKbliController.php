<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K6KegiatanKbLi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class K6KegiatanKbliController extends Controller
{
    public function index()
    {
        $data = K6KegiatanKbLi::with(['kota', 'kbli'])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K6 Kegiatan KBLI berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $jenisKegiatanRule = 'required|in:6A - Kelembagaan,6B - Personil K3,6C - Penghargaan,6D - Kasus Kecelakaan,Pembinaan,Pemeriksaan,Pengujian,Penegakan Hukum';
        $payload = $request->all();
        $isBatch = array_is_list($payload);

        $validator = Validator::make($payload, $isBatch ? [
            '*.bulan' => 'required|string|max:20',
            '*.tahun' => 'required|integer|min:1900|max:2100',
            '*.id_kota' => 'required|exists:master_kab_kota,id',
            '*.kode_kbli' => 'required|exists:master_kbli,kode_kbli',
            '*.jenis_kegiatan' => $jenisKegiatanRule,
            '*.jml_pelaksanaan' => 'sometimes|integer|min:0',
            '*.keterangan' => 'sometimes|nullable|string',
        ] : [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'kode_kbli' => 'required|exists:master_kbli,kode_kbli',
            'jenis_kegiatan' => $jenisKegiatanRule,
            'jml_pelaksanaan' => 'sometimes|integer|min:0',
            'keterangan' => 'sometimes|nullable|string',
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
            return collect($records)->map(fn ($record) => K6KegiatanKbLi::create($record))->values();
        });

        return response()->json([
            'status' => 'success',
            'message' => $isBatch ? 'Data K6 Kegiatan KBLI berhasil dibuat secara batch' : 'Data K6 Kegiatan KBLI berhasil dibuat',
            'data' => $isBatch ? $data : $data->first(),
        ], 201);
    }

    public function show($id)
    {
        $data = K6KegiatanKbLi::with(['kota', 'kbli'])->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K6 Kegiatan KBLI berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K6KegiatanKbLi::findOrFail($id);
        $jenisKegiatanRule = 'sometimes|required|in:6A - Kelembagaan,6B - Personil K3,6C - Penghargaan,6D - Kasus Kecelakaan,Pembinaan,Pemeriksaan,Pengujian,Penegakan Hukum';

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'kode_kbli' => 'sometimes|required|exists:master_kbli,kode_kbli',
            'jenis_kegiatan' => $jenisKegiatanRule,
            'jml_pelaksanaan' => 'sometimes|integer|min:0',
            'keterangan' => 'sometimes|nullable|string',
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
            'message' => 'Data K6 Kegiatan KBLI berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K6KegiatanKbLi::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K6 Kegiatan KBLI berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
