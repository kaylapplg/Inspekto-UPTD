<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class K6KegiatanKbLi extends Model
{
    use HasFactory;

    protected $table = 'k6_kegiatan_kbli';

    protected $guarded = [];

    public function kota()
    {
        return $this->belongsTo(MasterKabKota::class, 'id_kota', 'id');
    }

    public function kbli()
    {
        return $this->belongsTo(MasterKbLi::class, 'kode_kbli', 'kode_kbli');
    }
}
