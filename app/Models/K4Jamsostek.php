<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class K4Jamsostek extends Model
{
    use HasFactory;

    protected $table = 'k4_jamsostek';

    protected $guarded = [];

    public function kota()
    {
        return $this->belongsTo(MasterKabKota::class, 'id_kota', 'id');
    }
}
