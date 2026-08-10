<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k8a_kasus_kecelakaan', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('jml_kasus')->default(0);
            $table->unsignedInteger('keracunan')->default(0);
            $table->unsignedInteger('meninggal')->default(0);
            $table->unsignedInteger('dugaan_pak')->default(0);
            $table->unsignedInteger('pak')->default(0);
            $table->unsignedInteger('korban_total')->default(0);
            $table->unsignedInteger('tipe_a')->default(0);
            $table->unsignedInteger('tipe_b')->default(0);
            $table->unsignedInteger('tipe_c')->default(0);
            $table->unsignedInteger('tipe_d')->default(0);
            $table->unsignedInteger('tipe_e')->default(0);
            $table->unsignedInteger('tipe_f')->default(0);
            $table->unsignedInteger('tipe_g')->default(0);
            $table->unsignedInteger('tipe_h')->default(0);
            $table->unsignedInteger('tipe_i')->default(0);
            $table->unsignedInteger('tipe_j')->default(0);
            $table->unsignedInteger('tipe_k')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k8a_kasus_kecelakaan');
    }
};
