<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class home_navigations_data extends Model
{
    //
    protected $primaryKey = 'home_navigation_data_id'; //Default: id
    protected $guarded=['home_navigation_data_id'];

    public function home_navigation()
    {
        return $this->hasOne('App\home_navigation','home_navigation_id','home_navigation_id');
    }

    public function employee_role_permission()
    {
        return $this->hasOne('Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission','home_navigation_data_id','home_navigation_data_id');
    }

    public function employee_role_permissions()
    {
        return $this->hasMany('Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission','home_navigation_id','home_navigation_id');
    }


public function home_navi()
    {
        return $this->hasOne('Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission','home_navigation_data_id','home_navigation_data_id');
    }
    
}
