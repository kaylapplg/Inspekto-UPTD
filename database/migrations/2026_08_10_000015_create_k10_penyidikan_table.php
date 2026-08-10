<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k10_penyidikan', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->string('no_laporan', 100)->unique();
            $table->text('dugaan_pelanggaran');
            $table->string('no_spt', 100)->nullable();
            $table->enum('status_selesai', ['P21', 'SP3', 'Limpah POLSRI'])->nullable();
            $table->text('proses')->nullable();
            $table->unsignedBigInteger('putusan_denda')->nullable();
            $table->string('putusan_kurungan', 100)->nullable();

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k10_penyidikan');
    }
};
