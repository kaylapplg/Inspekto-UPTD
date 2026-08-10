<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call(MasterKabKotaSeeder::class);

        $kbli = [
            ['kode_kbli' => 'A', 'keterangan' => 'Pertanian, Kehutanan dan Perikanan'],
            ['kode_kbli' => 'B', 'keterangan' => 'Pertambangan dan Penggalian'],
            ['kode_kbli' => 'C', 'keterangan' => 'Industri Pengolahan'],
            ['kode_kbli' => 'D', 'keterangan' => 'Pengadaan Listrik dan Gas'],
            ['kode_kbli' => 'E', 'keterangan' => 'Pengadaan Air; Pengelolaan Sampah, Limbah dan Daur Ulang'],
            ['kode_kbli' => 'F', 'keterangan' => 'Konstruksi'],
            ['kode_kbli' => 'G', 'keterangan' => 'Perdagangan Besar dan Eceran; Reparasi dan Perawatan Mobil dan Sepeda Motor'],
            ['kode_kbli' => 'H', 'keterangan' => 'Transportasi dan Pergudangan'],
            ['kode_kbli' => 'I', 'keterangan' => 'Penyediaan Akomodasi dan Penyediaan Makan Minum'],
            ['kode_kbli' => 'J', 'keterangan' => 'Informasi dan Komunikasi'],
            ['kode_kbli' => 'K', 'keterangan' => 'Aktivitas Keuangan dan Asuransi'],
            ['kode_kbli' => 'L', 'keterangan' => 'Real Estat'],
            ['kode_kbli' => 'M', 'keterangan' => 'Aktivitas Profesional, Ilmiah dan Teknis'],
            ['kode_kbli' => 'N', 'keterangan' => 'Aktivitas Penyewaan, Sewa Guna Usaha Tanpa Hak Opsi, Ketenagakerjaan, Agen Perjalanan dan Penunjang Usaha Lainnya'],
            ['kode_kbli' => 'O', 'keterangan' => 'Administrasi Pemerintahan, Pertahanan dan Jaminan Sosial Wajib'],
            ['kode_kbli' => 'P', 'keterangan' => 'Pendidikan'],
            ['kode_kbli' => 'Q', 'keterangan' => 'Aktivitas Kesehatan Manusia dan Aktivitas Sosial'],
            ['kode_kbli' => 'R', 'keterangan' => 'Kesenian, Hiburan dan Rekreasi'],
            ['kode_kbli' => 'S', 'keterangan' => 'Aktivitas Jasa Lainnya'],
            ['kode_kbli' => 'T', 'keterangan' => 'Aktivitas Rumah Tangga sebagai Pemberi Kerja; Aktivitas Yang Menghasilkan Barang dan Jasa oleh Rumah Tangga yang Digunakan untuk Memenuhi Kebutuhan Sendiri'],
            ['kode_kbli' => 'U', 'keterangan' => 'Aktivitas Badan Internasional dan Badan Ekstra Internasional Lainnya'],
        ];

        foreach ($kbli as $item) {
            DB::table('master_kbli')->insertOrIgnore([
                'kode_kbli' => $item['kode_kbli'],
                'keterangan' => $item['keterangan'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

