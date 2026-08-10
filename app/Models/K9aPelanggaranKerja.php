<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class K9aPelanggaranKerja extends Model
{
    use HasFactory;

    protected $table = 'k9a_pelanggaran_kerja';

    protected $guarded = [];

    public function kota()
    {
        return $this->belongsTo(MasterKabKota::class, 'id_kota', 'id');
    }
}
