<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('k6_kegiatan_kbli', function (Blueprint $table) {
            $table->string('jenis_kegiatan', 100)->change();
        });
    }

    public function down(): void
    {
        Schema::table('k6_kegiatan_kbli', function (Blueprint $table) {
            $table->enum('jenis_kegiatan', ['Pembinaan', 'Pemeriksaan', 'Pengujian', 'Penegakan Hukum'])->change();
        });
    }
};
