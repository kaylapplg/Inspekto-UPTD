<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterKabKota extends Model
{
    use HasFactory;

    protected $table = 'master_kab_kota';

    protected $guarded = [];

    public function k2ObjekPengawasans()
    {
        return $this->hasMany(K2ObjekPengawasan::class, 'id_kota', 'id');
    }

    public function k3ObjekK3s()
    {
        return $this->hasMany(K3ObjekK3::class, 'id_kota', 'id');
    }

    public function k4Jamsosteks()
    {
        return $this->hasMany(K4Jamsostek::class, 'id_kota', 'id');
    }

    public function k6KegiatanKblis()
    {
        return $this->hasMany(K6KegiatanKbLi::class, 'id_kota', 'id');
    }

    public function k7Perizinans()
    {
        return $this->hasMany(K7Perizinan::class, 'id_kota', 'id');
    }

    public function k8aKasusKecelakaans()
    {
        return $this->hasMany(K8aKasusKecelakaan::class, 'id_kota', 'id');
    }

    public function k8bSumberBahayas()
    {
        return $this->hasMany(K8bSumberBahaya::class, 'id_kota', 'id');
    }

    public function k8cAkibatSantunans()
    {
        return $this->hasMany(K8cAkibatSantunan::class, 'id_kota', 'id');
    }

    public function k9aPelanggaranKerjas()
    {
        return $this->hasMany(K9aPelanggaranKerja::class, 'id_kota', 'id');
    }

    public function k9bPelanggaranK3s()
    {
        return $this->hasMany(K9bPelanggaranK3::class, 'id_kota', 'id');
    }

    public function k10Penyidikans()
    {
        return $this->hasMany(K10Penyidikan::class, 'id_kota', 'id');
    }
}
