<?php

namespace Webcolorzpos\CertificationMaster\Models\certification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class wp_option extends Model
{
    use HasFactory;
    protected $primaryKey = 'option_id'; //Default: id
    protected $guarded  = ['option_id'];
}
