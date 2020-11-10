<?php

namespace Webcolorzpos\Products\Models\product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;

class price_master extends Model
{
    protected $primaryKey = 'price_master_id'; //Default: id
    protected $guarded=['price_master_id'];
    use SoftDeletes;

    public function inward_stock()
    {
        return $this->hasOne('Webcolorzpos\Inward_Stock\Models\inward\inward_stock','inward_stock_id','inward_stock_id');
    }
    public function product()
    {
        return $this->hasOne('Webcolorzpos\Products\Models\product\product','product_id','product_id');
    }
    public function batch_no_expiry_date()
    {
        return $this->hasOne('Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail','inward_stock_id','inward_stock_id');
    }
    public function inward_product_details()
    {
        return $this->hasOne('Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail','inward_stock_id','inward_stock_id');
    }
    public function sales_product_detail()
    {
        return $this->hasMany('Webcolorzpos\Sales\Models\sales_product_detail','price_master_id','price_master_id')->where('deleted_at','=',NULL);
    }
    public function returnbill_product()
    {
        return $this->hasMany('Webcolorzpos\SalesReturn\Models\returnbill_product','price_master_id','price_master_id')->where('deleted_at','=',NULL);
    }
    public function damage_product_detail()
    {
        return $this->hasMany('Webcolorzpos\DamageProducts\Models\damageproducts\damage_product_detail','product_id','product_id')->where('deleted_at','=',NULL);
    }
    public function debit_product_detail()
    {
        return $this->hasMany('Webcolorzpos\Debit_Note\Models\debit_note\debit_product_detail','price_master_id','price_master_id')->where('deleted_at','=',NULL);
    }
    public function damage_product()
    {
        return $this->hasMany('Webcolorzpos\DamageProducts\Models\damageproducts\damage_product','damage_type_id','damage_type_id')->where('deleted_at','=',NULL);
    }
    public function inward_product_detail()
    {
        return $this->hasOne('Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail','product_id','product_id');
    }
    public function inward_product_detail_for_batchno()
    {
        return $this->hasMany('Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail','product_id','product_id')->where('company_id',Auth::user()->company_id);
    }
    public function discount_master()
    {
        return $this->hasOne('Webcolorzpos\DiscountMaster\Models\discount_master','product_id','product_id');
    }
    public function consign_products_detail()
    {
        return $this->hasMany('Webcolorzpos\Consignment\Models\consign_products_detail','price_master_id','price_master_id')->where('deleted_at','=',NULL);
    }
     public function audit_price_master()
    {
          return $this->hasMany('Webcolorzpos\stock_audit\Models\audit_product_detail','price_master_id','price_master_id')->where('deleted_at','=',NULL);
    }
}
