<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('k1_pengawas', function (Blueprint $table) {
            $table->id();
            $table->string('bulan', 20);
            $table->year('tahun');
            $table->enum('jabatan', ['Pertama', 'Muda', 'Madya']);
            $table->unsignedInteger('pengawas_umum')->default(0);
            $table->unsignedInteger('spesialis_1')->default(0);
            $table->unsignedInteger('spesialis_2')->default(0);
            $table->unsignedInteger('spesialis_3')->default(0);
            $table->unsignedInteger('spesialis_4')->default(0);
            $table->unsignedInteger('spesialis_5')->default(0);
            $table->unsignedInteger('spesialis_6')->default(0);
            $table->unsignedInteger('spesialis_7')->default(0);
            $table->unsignedInteger('spesialis_8')->default(0);
            $table->unsignedInteger('spesialis_9')->default(0);
            $table->unsignedInteger('spesialis_10')->default(0);
            $table->unsignedInteger('spesialis_11')->default(0);
            $table->unsignedInteger('ppns')->default(0);
            $table->unique(['bulan', 'tahun', 'jabatan']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('k1_pengawas');
    }
};
