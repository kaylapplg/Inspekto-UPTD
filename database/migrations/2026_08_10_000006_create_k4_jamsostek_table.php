<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k4_jamsostek', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('jml_perusahaan_bpjs')->default(0);
            $table->unsignedInteger('tk_wni_bpjs')->default(0);
            $table->unsignedInteger('tk_wna_bpjs')->default(0);
            $table->unsignedInteger('prog_jkn')->default(0);
            $table->unsignedInteger('prog_jkk_jkm')->default(0);
            $table->unsignedInteger('prog_jht')->default(0);
            $table->unsignedInteger('prog_jp')->default(0);
            $table->unsignedInteger('prog_jkp')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k4_jamsostek');
    }
};
