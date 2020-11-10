<?php

namespace Webcolorzpos\CertificationMaster\Models\certification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class wp_post extends Model
{
    use HasFactory;
    protected $primaryKey = 'ID'; //Default: id
    protected $guarded  = ['ID'];
}
