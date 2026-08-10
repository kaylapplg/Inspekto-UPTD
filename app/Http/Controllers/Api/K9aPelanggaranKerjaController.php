<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\K9aPelanggaranKerja;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class K9aPelanggaranKerjaController extends Controller
{
    public function index()
    {
        $data = K9aPelanggaranKerja::with('kota')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9A Pelanggaran Kerja berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'bulan' => 'required|string|max:20',
            'tahun' => 'required|integer|min:1900|max:2100',
            'id_kota' => 'required|exists:master_kab_kota,id',
            'jml_perusahaan_melanggar' => 'sometimes|integer|min:0',
            'jml_di_nota' => 'sometimes|integer|min:0',
            'pelanggaran_wlkp' => 'sometimes|integer|min:0',
            'pelanggaran_wkwi' => 'sometimes|integer|min:0',
            'penggunaan_tka' => 'sometimes|integer|min:0',
            'pmi' => 'sometimes|integer|min:0',
            'upah_minimum' => 'sometimes|integer|min:0',
            'upah_tidak_dibayar' => 'sometimes|integer|min:0',
            'upah_lembur' => 'sometimes|integer|min:0',
            'kompensasi_pkwt' => 'sometimes|integer|min:0',
            'pesangon' => 'sometimes|integer|min:0',
            'thr' => 'sometimes|integer|min:0',
            'pekerja_anak' => 'sometimes|integer|min:0',
            'cuti_tahunan' => 'sometimes|integer|min:0',
            'cuti_haid' => 'sometimes|integer|min:0',
            'pp_kb' => 'sometimes|integer|min:0',
            'pwbd_bpjs_kes' => 'sometimes|integer|min:0',
            'pwbd_bpjs_tk' => 'sometimes|integer|min:0',
            'pds_tk' => 'sometimes|integer|min:0',
            'pds_upah' => 'sometimes|integer|min:0',
            'pds_prog' => 'sometimes|integer|min:0',
            'prshn_mnggk' => 'sometimes|integer|min:0',
            'lain_lain' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validasi gagal',
                'data' => $validator->errors(),
            ], 422);
        }

        $data = K9aPelanggaranKerja::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9A Pelanggaran Kerja berhasil dibuat',
            'data' => $data,
        ], 201);
    }

    public function show($id)
    {
        $data = K9aPelanggaranKerja::with('kota')->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9A Pelanggaran Kerja berhasil diambil',
            'data' => $data,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = K9aPelanggaranKerja::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'bulan' => 'sometimes|required|string|max:20',
            'tahun' => 'sometimes|required|integer|min:1900|max:2100',
            'id_kota' => 'sometimes|required|exists:master_kab_kota,id',
            'jml_perusahaan_melanggar' => 'sometimes|integer|min:0',
            'jml_di_nota' => 'sometimes|integer|min:0',
            'pelanggaran_wlkp' => 'sometimes|integer|min:0',
            'pelanggaran_wkwi' => 'sometimes|integer|min:0',
            'penggunaan_tka' => 'sometimes|integer|min:0',
            'pmi' => 'sometimes|integer|min:0',
            'upah_minimum' => 'sometimes|integer|min:0',
            'upah_tidak_dibayar' => 'sometimes|integer|min:0',
            'upah_lembur' => 'sometimes|integer|min:0',
            'kompensasi_pkwt' => 'sometimes|integer|min:0',
            'pesangon' => 'sometimes|integer|min:0',
            'thr' => 'sometimes|integer|min:0',
            'pekerja_anak' => 'sometimes|integer|min:0',
            'cuti_tahunan' => 'sometimes|integer|min:0',
            'cuti_haid' => 'sometimes|integer|min:0',
            'pp_kb' => 'sometimes|integer|min:0',
            'pwbd_bpjs_kes' => 'sometimes|integer|min:0',
            'pwbd_bpjs_tk' => 'sometimes|integer|min:0',
            'pds_tk' => 'sometimes|integer|min:0',
            'pds_upah' => 'sometimes|integer|min:0',
            'pds_prog' => 'sometimes|integer|min:0',
            'prshn_mnggk' => 'sometimes|integer|min:0',
            'lain_lain' => 'sometimes|integer|min:0',
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
            'message' => 'Data K9A Pelanggaran Kerja berhasil diperbarui',
            'data' => $data,
        ], 200);
    }

    public function destroy($id)
    {
        $data = K9aPelanggaranKerja::findOrFail($id);
        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data K9A Pelanggaran Kerja berhasil dihapus',
            'data' => null,
        ], 200);
    }
}
