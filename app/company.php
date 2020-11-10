<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class company extends Model
{
    protected $primaryKey = 'company_id'; //Default: id
    protected $guarded=['company_id'];
}
