<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MasterKbLi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MasterKbliController extends Controller
{
    public function index()
    {
        $data = MasterKbLi::with([
            'k6KegiatanKblis',
        ])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data master KBLI berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_kbli' => 'required|string|max:1|unique:master_kbli,kode_kbli',
            'keterangan' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = MasterKbLi::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data master KBLI berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = MasterKbLi::with([
            'k6KegiatanKblis',
        ])->where('kode_kbli', $id)->firstOrFail();

        return response()->json([
            'status' => 'success',
            'message' => 'Data master KBLI berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = MasterKbLi::where('kode_kbli', $id)->firstOrFail();

        $validator = Validator::make($request->all(), [
            'keterangan' => 'sometimes|required|string|max:255',
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
            'message' => 'Data master KBLI berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = MasterKbLi::where('kode_kbli', $id)->firstOrFail();
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data master KBLI berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
