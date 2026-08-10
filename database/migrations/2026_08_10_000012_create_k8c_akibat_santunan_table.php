<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k8c_akibat_santunan', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('akibat_sembuh')->default(0);
            $table->unsignedInteger('akibat_stmb')->default(0);
            $table->unsignedInteger('akibat_cacat')->default(0);
            $table->unsignedInteger('akibat_meninggal')->default(0);
            $table->decimal('santunan_berkala', 15, 2)->default(0);
            $table->decimal('santunan_sekaligus', 15, 2)->default(0);
            $table->decimal('santunan_pendidikan', 15, 2)->default(0);
            $table->decimal('santunan_kembali_kerja', 15, 2)->default(0);
            $table->decimal('kerugian_ekonomi', 15, 2)->default(0);
            $table->unsignedInteger('jam_kerja_hilang')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k8c_akibat_santunan');
    }
};
