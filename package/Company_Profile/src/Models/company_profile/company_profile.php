<?php

namespace Webcolorzpos\Company_Profile\Models\company_profile;

use Illuminate\Database\Eloquent\Model;

class company_profile extends Model
{
    protected $primaryKey = 'company_profile_id'; //Default: id
    protected $guarded=['company_profile_id'];
    
     public function state_name()
    {
        return $this->hasOne('App\state','state_id','state_id');
    }
    
 	public function country_name()
    {
        return $this->hasOne('App\country','country_id','country_id');
    }
}
