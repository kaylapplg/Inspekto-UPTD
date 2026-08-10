<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class K3ObjekK3 extends Model
{
    use HasFactory;

    protected $table = 'k3_objek_k3';

    protected $guarded = [];

    public function kota()
    {
        return $this->belongsTo(MasterKabKota::class, 'id_kota', 'id');
    }
}
