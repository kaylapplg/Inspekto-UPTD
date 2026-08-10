<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class K10Penyidikan extends Model
{
    use HasFactory;

    protected $table = 'k10_penyidikan';

    protected $guarded = [];

    public function kota()
    {
        return $this->belongsTo(MasterKabKota::class, 'id_kota', 'id');
    }
}
