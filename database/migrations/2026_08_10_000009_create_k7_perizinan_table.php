<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k7_perizinan', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->unsignedBigInteger('id_kota');
            $table->unsignedInteger('pesawat_uap')->default(0);
            $table->unsignedInteger('bejana_tekan')->default(0);
            $table->unsignedInteger('paa')->default(0);
            $table->unsignedInteger('ptp')->default(0);
            $table->unsignedInteger('listrik')->default(0);
            $table->unsignedInteger('elevator')->default(0);
            $table->unsignedInteger('petir')->default(0);
            $table->unsignedInteger('kebakaran')->default(0);
            $table->unsignedInteger('konstruksi')->default(0);
            $table->unsignedInteger('klinik')->default(0);
            $table->unsignedInteger('lingkungan')->default(0);
            $table->unsignedInteger('kimia')->default(0);
            $table->unsignedInteger('makan')->default(0);
            $table->unsignedInteger('p2k3')->default(0);

            $table->foreign('id_kota')->references('id')->on('master_kab_kota')->onDelete('cascade');
            $table->unique(['bulan', 'tahun', 'id_kota']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k7_perizinan');
    }
};
