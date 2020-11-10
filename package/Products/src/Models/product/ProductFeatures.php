<?php

namespace Webcolorzpos\Products\Models\product;

use Illuminate\Database\Eloquent\Model;
use Auth;
class ProductFeatures  extends Model
{
    protected $primaryKey = 'product_features_id';
     protected $guarded=['product_features_id'];
    public function product_features_data()
    {
        return $this->hasMany('Webcolorzpos\Products\Models\product\product_features_data','product_features_id','product_features_id')->orderBy('product_features_data_value','ASC')->where('is_active','1');
    }

    public function product_features_data_1()
    {
        return $this->hasMany('Webcolorzpos\Products\Models\product\product_features_data','product_features_id','product_features_id')->orderBy('ordering','ASC')->whereNull('deleted_at');
    }

    public function product_features_data_parent()
    {
        return $this->hasMany('Webcolorzpos\Products\Models\product\product_features_data','product_features_id','product_features_id')->orderBy('product_features_data_value','ASC')->whereNull('deleted_at');
    }

    public static function getproduct_feature($product_features_id)
    {
        $product_feature =  ProductFeatures::
        //where('company_id',Auth::user()->company_id)
            where('deleted_at','=',NULL)
            ->where('feature_type','=',1)
            ->where('is_active','=',1)
            ->orderBy('ordering','ASC')
            ->get();

        if($product_features_id != '')
        {
            $product_feature = $product_feature->where('product_features_id',$product_features_id)->first();
        }


        return $product_feature;

    }

    public static function get_current_page_url()
    {
        $current_url    =   $_SERVER['HTTP_REFERER'];
        $strArray       =   explode('/',$current_url);
        $pageUrl        =   end($strArray);

        return $pageUrl;
    }

}
