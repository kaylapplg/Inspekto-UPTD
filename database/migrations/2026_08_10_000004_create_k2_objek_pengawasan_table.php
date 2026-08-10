<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k2_objek_pengawasan', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('jml_perusahaan')->default(0);
            $table->unsignedInteger('tk_wni_l')->default(0);
            $table->unsignedInteger('tk_wni_p')->default(0);
            $table->unsignedInteger('tk_wna_l')->default(0);
            $table->unsignedInteger('tk_wna_p')->default(0);
            $table->unsignedInteger('kat_mikro')->default(0);
            $table->unsignedInteger('kat_kecil')->default(0);
            $table->unsignedInteger('kat_menengah')->default(0);
            $table->unsignedInteger('kat_besar')->default(0);
            $table->unsignedInteger('stat_swasta')->default(0);
            $table->unsignedInteger('stat_persero')->default(0);
            $table->unsignedInteger('stat_perum')->default(0);
            $table->unsignedInteger('stat_bumd')->default(0);
            $table->unsignedInteger('stat_yayasan')->default(0);
            $table->unsignedInteger('stat_koperasi')->default(0);
            $table->unsignedInteger('stat_perseorangan')->default(0);
            $table->unsignedInteger('stat_joint')->default(0);
            $table->unsignedInteger('hi_pp')->default(0);
            $table->unsignedInteger('hi_pkb')->default(0);
            $table->unsignedInteger('hi_sp_sb')->default(0);
            $table->unsignedInteger('hi_tripartit')->default(0);
            $table->text('penghargaan_k3')->nullable();

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k2_objek_pengawasan');
    }
};
