<?php

namespace Webcolorzpos\Products\Models\product;

use Illuminate\Database\Eloquent\Model;

class product_features_data extends Model
{
    protected $primaryKey = 'product_features_data_id';
     protected $guarded=['product_features_data_id'];

    public function product_features()
    {
        return $this->hasOne('Webcolorzpos\Products\Models\product\ProductFeatures','product_features_id','product_features_id');
    }

    public function product_features_childs()
    {
        return $this->hasOne('Webcolorzpos\Products\Models\product\product_features_data','parent','product_features_data_id');
    }


}
