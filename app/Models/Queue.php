<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;
    public $incrementing = false;
    protected $keyType = 'string';
    public function polyObj(){
        return $this->belongsTo(Poly::class,'poly','id');
    }
}
