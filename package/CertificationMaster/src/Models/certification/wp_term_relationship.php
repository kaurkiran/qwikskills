<?php

namespace Webcolorzpos\CertificationMaster\Models\certification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class wp_term_relationship extends Model
{
    use HasFactory;
    protected $primaryKey = 'object_id'; //Default: id
    protected $guarded  = ['object_id'];

    public function wp_post()
    {
        return $this->hasOne('Webcolorzpos\CertificationMaster\Models\certification\wp_post','ID','object_id');
    }
}
