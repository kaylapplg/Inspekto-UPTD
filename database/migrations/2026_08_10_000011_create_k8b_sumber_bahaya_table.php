<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k8b_sumber_bahaya', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('sumber_a')->default(0);
            $table->unsignedInteger('sumber_b')->default(0);
            $table->unsignedInteger('sumber_c')->default(0);
            $table->unsignedInteger('sumber_d')->default(0);
            $table->unsignedInteger('sumber_e')->default(0);
            $table->unsignedInteger('sumber_f')->default(0);
            $table->unsignedInteger('sumber_g')->default(0);
            $table->unsignedInteger('sumber_h')->default(0);
            $table->unsignedInteger('sumber_i')->default(0);
            $table->unsignedInteger('sumber_j')->default(0);
            $table->unsignedInteger('sumber_k')->default(0);
            $table->unsignedInteger('sumber_l')->default(0);
            $table->unsignedInteger('sumber_m')->default(0);
            $table->unsignedInteger('sumber_n')->default(0);
            $table->unsignedInteger('sumber_o')->default(0);
            $table->unsignedInteger('sumber_p')->default(0);
            $table->unsignedInteger('sumber_q')->default(0);
            $table->unsignedInteger('sumber_r')->default(0);
            $table->unsignedInteger('sumber_s')->default(0);
            $table->unsignedInteger('sumber_t')->default(0);
            $table->unsignedInteger('sumber_u')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k8b_sumber_bahaya');
    }
};
