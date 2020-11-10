<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;
    protected $primaryKey = 'user_id'; //Default: id
    protected $guarded  = ['user_id'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    // protected $fillable = [
    //     'name',
    //     'email',
    //     'password',
    // ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function state()
    {
        return $this->hasOne('App\state','state_id','state_id');
    }
    public function country()
    {
        return $this->hasOne('App\country','country_id','country_id');
    }

    public function employee_role()
    {
        return $this->hasOne('Webcolorzpos\EmployeeMaster\Models\employee\employee_role','employee_role_id','employee_role_id');
    }

    public function employee_role_permission()
    {
        return $this->hasMany('Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission','employee_role_id','employee_role_id');
    }
}
