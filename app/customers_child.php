<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class customers_child extends Model
{
   protected $primaryKey = 'customer_child_id'; //Default: id
    protected $guarded=['customer_child_id'];

    

}
