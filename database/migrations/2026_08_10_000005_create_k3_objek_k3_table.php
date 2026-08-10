<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k3_objek_k3', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('pesawat_uap')->default(0);
            $table->unsignedInteger('bejana_tekan')->default(0);
            $table->unsignedInteger('pesawat_angkat')->default(0);
            $table->unsignedInteger('pesawat_tenaga')->default(0);
            $table->unsignedInteger('listrik')->default(0);
            $table->unsignedInteger('eskalator')->default(0);
            $table->unsignedInteger('cegah_kebakaran')->default(0);
            $table->unsignedInteger('kesehatan_kerja')->default(0);
            $table->unsignedInteger('konstruksi')->default(0);
            $table->unsignedInteger('lingkungan_kerja')->default(0);
            $table->unsignedInteger('bahan_kimia')->default(0);
            $table->unsignedInteger('ruang_terbatas')->default(0);
            $table->unsignedInteger('sarana_k3')->default(0);
            $table->unsignedInteger('personil_k3')->default(0);
            $table->unsignedInteger('p2k3')->default(0);
            $table->unsignedInteger('perancah')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k3_objek_k3');
    }
};
