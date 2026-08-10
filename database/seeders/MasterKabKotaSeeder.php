<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterKabKotaSeeder extends Seeder
{
    /**
     * Seed the master kabupaten/kota data.
     */
    public function run(): void
    {
        $now = now();

        DB::table('master_kab_kota')->upsert([
            [
                'id' => 1,
                'nama_kota' => 'Kab. Bekasi',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 2,
                'nama_kota' => 'Kab. Karawang',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 3,
                'nama_kota' => 'Kab. Purwakarta',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 4,
                'nama_kota' => 'Kab. Subang',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'id' => 5,
                'nama_kota' => 'Kota Bekasi',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ], ['id'], ['nama_kota', 'updated_at']);
    }
}
