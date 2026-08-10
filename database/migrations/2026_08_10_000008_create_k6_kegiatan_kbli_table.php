<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k6_kegiatan_kbli', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->char('kode_kbli', 1);
            $table->enum('jenis_kegiatan', ['Pembinaan', 'Pemeriksaan', 'Pengujian', 'Penegakan Hukum']);
            $table->unsignedInteger('jml_pelaksanaan')->default(0);
            $table->text('keterangan')->nullable();

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->foreign('kode_kbli')->references('kode_kbli')->on('master_kbli')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota', 'kode_kbli', 'jenis_kegiatan'], 'k6_kbli_unique');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k6_kegiatan_kbli');
    }
};
