<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k5_pemeriksaan', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->enum('jabatan_pengawas', ['Pertama', 'Muda', 'Madya']);
            $table->unsignedInteger('jml_pengawas')->default(0);
            $table->unsignedInteger('keg_pertama')->default(0);
            $table->unsignedInteger('keg_berkala')->default(0);
            $table->unsignedInteger('keg_ulang')->default(0);
            $table->unsignedInteger('keg_khusus')->default(0);
            $table->unsignedInteger('uji_norma_kerja')->default(0);
            $table->unsignedInteger('uji_norma_k3')->default(0);
            $table->unsignedInteger('hukum_nota_1')->default(0);
            $table->unsignedInteger('hukum_nota_2')->default(0);
            $table->unsignedInteger('hukum_lk')->default(0);

            $table->unique(['bulan', 'tahun', 'jabatan_pengawas']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k5_pemeriksaan');
    }
};
