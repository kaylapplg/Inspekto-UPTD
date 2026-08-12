<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('k6_kegiatan_kbli', function (Blueprint $table) {
            $table->unsignedInteger('nilai')->default(0)->after('jenis_kegiatan');
        });
    }

    public function down(): void
    {
        Schema::table('k6_kegiatan_kbli', function (Blueprint $table) {
            $table->dropColumn('nilai');
        });
    }
};
