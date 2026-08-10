<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k9b_pelanggaran_k3', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('pelanggaran_p2k3')->default(0);
            $table->unsignedInteger('ahli_k3')->default(0);
            $table->unsignedInteger('personil_k3_lainnya')->default(0);
            $table->unsignedInteger('pjk3')->default(0);
            $table->unsignedInteger('unit_p3k')->default(0);
            $table->unsignedInteger('sarana_makan')->default(0);
            $table->unsignedInteger('pengendalian_b3')->default(0);
            $table->unsignedInteger('dokter_perusahaan')->default(0);
            $table->unsignedInteger('paramedis_perusahaan')->default(0);
            $table->unsignedInteger('dokter_pktk')->default(0);
            $table->unsignedInteger('riksa_awal')->default(0);
            $table->unsignedInteger('riksa_berkala')->default(0);
            $table->unsignedInteger('riksa_khusus')->default(0);
            $table->unsignedInteger('lainnya')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k9b_pelanggaran_k3');
    }
};
