<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class home_navigation extends Model
{
    protected $primaryKey = 'home_navigation_id'; //Default: id
    protected $guarded=['home_navigation_id'];

    public function home_navigations_data()
    {
        return $this->hasMany('App\home_navigations_data','home_navigation_id','home_navigation_id')->orderBy('ordering', 'ASC')->where('is_active','=','1')->whereNull('deleted_at');
    }

    public function employee_role_permission()
    {
        return $this->hasOne('Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission','home_navigation_id','home_navigation_id');
    }

    public function employee_role_permissions()
    {
        return $this->hasMany('Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission','home_navigation_id','home_navigation_id');
    }
}
