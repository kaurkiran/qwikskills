<?php

namespace Webcolorzpos\Products\Models\product;

use Illuminate\Database\Eloquent\Model;

class product_image extends Model
{
    protected $primaryKey = 'product_image_id'; //Default: id
    protected $guarded=['product_image_id'];

    public function products()
    {
        return $this->hasOne('Webcolorzpos\Products\Models\product\product','product_id','product_id');
    }
}
