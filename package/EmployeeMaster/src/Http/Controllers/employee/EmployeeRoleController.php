<?php

namespace Webcolorzpos\EmployeeMaster\Http\Controllers\employee;

use App\Http\Controllers\Controller;
use Webcolorzpos\EmployeeMaster\Models\employee\employee_role;
use Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission;
use App\home_navigation;
use App\home_navigations_data;
use App\Models\User;
use App\state;
use App\country;
use DB;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;



class EmployeeRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    public function getRole_Pages(Request $request)
    {
        //where('company_id',Auth::user()->company_id)->
        $home_navigations   =   home_navigation::whereNull('deleted_at')->where('is_active','=',1)
        ->with('home_navigations_data')->get();

        return json_encode(array("Success"=>"True","data"=>$home_navigations));
    }

    public function employee_role_create(Request $request)
    {
        $data = $request->all();

        $userId = Auth::User()->user_id;

        $company_id = Auth::User()->company_id;
        $created_by = $userId;

        $role_name          =   $data[0]['role_name'];
        $role_id            =   $data[0]['employee_role_id'];

        $role_company_id    =   employee_role::select('company_id')->where('employee_role_id',$role_id)->first();

        if($role_id=='')
        {
            $comp_id     =   $company_id;
        }
        else
        {
            $comp_id     =   $role_company_id->company_id;
        }

        // print_r($comp_id); exit;

        $employee_role = employee_role::updateOrCreate(
            [
                'employee_role_id'  =>  $role_id,
                'company_id'        =>  $comp_id,
                // 'created_by'        =>  $created_by,
                'role_name'         =>  $role_name,
                'is_active'         =>  '1',
            ]
        );

        $employee_role_id = $employee_role->employee_role_id;

        $employee_role  =   employee_role_permission::where('employee_role_id',$employee_role_id)->delete();

        // $employee_role = employee_role_permission::where('employee_role_id',$employee_role_id)->update(array(
        //     'deleted_at' => date('Y-m-d H:i:s'),
        //     'deleted_by' => Auth::User()->user_id,
        //     'updated_at' => date('Y-m-d H:i:s'),
        //     'modified_by' => Auth::User()->user_id,
        //     'permission_view' => 0,
        //     'permission_add' => 0,
        //     'permission_edit' => 0,
        //     'permission_delete' => 0,
        //     'permission_export' => 0,
        //     'permission_print' => 0,
        //     'permission_upload' => 0

        // ));

        $roles     =    array();

        foreach($data[1] as $key=>$value)
        {
                $roles['home_navigation_id']            =   $value['module_id']==''?NULL:$value['module_id'];
                $roles['home_navigation_data_id']       =   $value['submodule_id']==''?NULL:$value['submodule_id'];
                $roles['permission_view']               =   $value['view_']==''?0:1;
                $roles['permission_add']                =   $value['add_']==''?0:1;
                $roles['permission_edit']               =   $value['edit_']==''?0:1;
                $roles['permission_delete']             =   $value['delete_']==''?0:1;
                $roles['permission_export']             =   $value['export_']==''?0:1;
                $roles['permission_print']              =   $value['print_']==''?0:1;
                $roles['permission_upload']             =   $value['upload_']==''?0:1;
                $roles['deleted_at']                    =   NULL;
                $roles['deleted_by']                    =   NULL;

                $employee_role_permission  =  employee_role_permission::updateOrCreate(
                [
                    'employee_role_permission_id' => $value['employee_role_permission_id']==''?'':$value['employee_role_permission_id'],
                    'employee_role_id' => $employee_role_id,
                    'company_id' => $comp_id,
                    'created_by'=>$created_by,
                ],
                $roles);
        }

        return json_encode(array("Success"=>"True","Message"=>"permission created successfully","url"=>'employee_master'));    
    }

    public function showPermissions(Request $request)
    {
        $data       =   $request->all();
        $role_id    =   $data['role_id'];

        //->where('company_id',Auth::user()->company_id)
        
        $permissions   =   employee_role_permission::where('employee_role_id',$role_id)
        ->with('home_navigations_data')->whereNull('deleted_at')->with('home_navigations')->get();

        return json_encode(array("Success"=>"True","data"=>$permissions));
    }

    public function editPermissions(Request $request)
    {
        $data       =   $request->all();
        $role_id    =   $data['role_id'];

        //->where('company_id',Auth::user()->company_id)

        $roleName   =   employee_role::select('role_name')
        ->where('employee_role_id',$role_id)->whereNull('deleted_at')->get();

        // where('company_id',Auth::user()->company_id)->

        $home_navigations   =   home_navigation::whereNull('deleted_at')->with('home_navigations_data')
        ->with(['employee_role_permission' => function($fquery)  use ($role_id)
            {
                $fquery->select('*');
                $fquery->where('employee_role_permissions.employee_role_id',$role_id);
            }
        ])
        ->with(['home_navigations_data.employee_role_permission' => function($fquery)  use ($role_id)
            {
                $fquery->select('*');
                $fquery->where('employee_role_permissions.employee_role_id',$role_id);
            }
        ])
        ->get();

        return json_encode(array("Success"=>"True","data"=>$home_navigations,"rolename",$roleName));
    }

    public function SaveRoletoEmployee(Request $request)
    {
        $data           =   $request->all();
        $role_id        =   $data['role_id'];
        $employee_id    =   $data['employee_id'];

        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;

        //->where('company_id',$company_id)

        user::where('user_id',$employee_id)->update(array(
            'modified_by' => $userId,
            'employee_role_id' => $role_id
        ));

        return json_encode(array("Success"=>"True","Message"=>"permission applied successfully","url"=>'employee_master'));  

    }

    public function findRole(Request $request)
    {
        $data           =   $request->all();
        $user_id        =   $data['user_id'];

        $company_id = Auth::User()->company_id;

        // ->where('company_id',$company_id)

        $result     =   user::where('user_id',$user_id)->with('employee_role')->get();

        return json_encode(array("Data"=>$result));  
    }

    public function showEmpName(Request $request)
    {
        $data           =   $request->all();
        $user_id        =   $data['user_id'];

        $company_id = Auth::User()->company_id;

        $result     =   user::where('user_id',$user_id)->where('company_id',$company_id)->with('employee_role')->get();

        return json_encode(array("Data"=>$result));  
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\employee_role  $employee_role
     * @return \Illuminate\Http\Response
     */
    public function show(employee_role $employee_role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\employee_role  $employee_role
     * @return \Illuminate\Http\Response
     */
    public function edit(employee_role $employee_role)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\employee_role  $employee_role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, employee_role $employee_role)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\employee_role  $employee_role
     * @return \Illuminate\Http\Response
     */
    public function destroy(employee_role $employee_role)
    {
        //
    }
}
