<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k9a_pelanggaran_kerja', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('jml_perusahaan_melanggar')->default(0);
            $table->unsignedInteger('jml_di_nota')->default(0);
            $table->unsignedInteger('pelanggaran_wlkp')->default(0);
            $table->unsignedInteger('pelanggaran_wkwi')->default(0);
            $table->unsignedInteger('penggunaan_tka')->default(0);
            $table->unsignedInteger('pmi')->default(0);
            $table->unsignedInteger('upah_minimum')->default(0);
            $table->unsignedInteger('upah_tidak_dibayar')->default(0);
            $table->unsignedInteger('upah_lembur')->default(0);
            $table->unsignedInteger('kompensasi_pkwt')->default(0);
            $table->unsignedInteger('pesangon')->default(0);
            $table->unsignedInteger('thr')->default(0);
            $table->unsignedInteger('pekerja_anak')->default(0);
            $table->unsignedInteger('cuti_tahunan')->default(0);
            $table->unsignedInteger('cuti_haid')->default(0);
            $table->unsignedInteger('pp_kb')->default(0);
            $table->unsignedInteger('pwbd_bpjs_kes')->default(0);
            $table->unsignedInteger('pwbd_bpjs_tk')->default(0);
            $table->unsignedInteger('pds_tk')->default(0);
            $table->unsignedInteger('pds_upah')->default(0);
            $table->unsignedInteger('pds_prog')->default(0);
            $table->unsignedInteger('prshn_mnggk')->default(0);
            $table->unsignedInteger('lain_lain')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k9a_pelanggaran_kerja');
    }
};
