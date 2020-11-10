<?php

namespace Webcolorzpos\CertificationMaster\Models\certification;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class wp_term_taxonomy extends Model
{
    use HasFactory;
    // protected $table = 	'singular';
    protected $table = 'wp_term_taxonomy';
    protected $primaryKey = 'term_taxonomy_id'; //Default: id
    protected $guarded  = ['term_taxonomy_id'];


    public function wp_term()
    {
        return $this->hasOne('Webcolorzpos\CertificationMaster\Models\certification\wp_term','term_id','term_id');
    }

    public function wp_term_taxonomy_child()
    {
        return $this->hasMany('Webcolorzpos\CertificationMaster\Models\certification\wp_term_taxonomy','parent','term_id');
    }
    

}