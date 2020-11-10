<?php

namespace Webcolorzpos\EmployeeMaster\Models\employee;

use Illuminate\Database\Eloquent\Model;

class employee_role_permission extends Model
{
    protected $primaryKey = 'employee_role_permission_id'; //Default: id
    protected $guarded=['employee_role_permission_id'];

    public function home_navigations()
    {
        return $this->hasOne('App\home_navigation','home_navigation_id','home_navigation_id');
    }

    public function home_navigations_data()
    {
        return $this->hasOne('App\home_navigations_data','home_navigation_data_id','home_navigation_data_id')->orderBy('ordering', 'ASC')->where('is_active','=','1');
    }


    public function home_navigations_data_s()
    {
        return $this->hasOne('App\home_navigations_data','home_navigation_data_id','home_navigation_data_id')->orderBy('ordering', 'ASC')->where('is_active','=','1');
    }

}
