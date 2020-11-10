<?php

namespace Webcolorzpos\CertificationMaster\Models\certification;

use Illuminate\Database\Eloquent\Model;

class certification_master extends Model
{
    // use HasFactory;
    protected $table = 'certification_master';
    protected $primaryKey = 'certification_master_id'; //Default: id
    protected $guarded  = ['certification_master_id'];

    public function wp_term()
    {
        return $this->hasOne('Webcolorzpos\CertificationMaster\Models\certification\wp_term','term_id','category_id');
    }

    public function wp_term_child()
    {
    	return $this->hasOne('Webcolorzpos\CertificationMaster\Models\certification\wp_term','term_id','subcategory_id');
    }

    public function wp_post()
    {
    	return $this->hasOne('Webcolorzpos\CertificationMaster\Models\certification\wp_post','ID','product_id');
    }
}
