<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class K2ObjekPengawasan extends Model
{
    use HasFactory;

    protected $table = 'k2_objek_pengawasan';

    protected $guarded = [];

    public function kota()
    {
        return $this->belongsTo(MasterKabKota::class, 'id_kota', 'id');
    }
}
