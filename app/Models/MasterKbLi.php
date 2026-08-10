<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterKbLi extends Model
{
    use HasFactory;

    protected $table = 'master_kbli';
    protected $primaryKey = 'kode_kbli';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $guarded = [];

    public function k6KegiatanKblis()
    {
        return $this->hasMany(K6KegiatanKbLi::class, 'kode_kbli', 'kode_kbli');
    }
}
