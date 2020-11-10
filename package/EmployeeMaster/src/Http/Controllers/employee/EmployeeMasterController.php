<?php

namespace Webcolorzpos\EmployeeMaster\Http\Controllers\employee;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\state;
use App\country;
use DB;
use Hash;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
//use Maatwebsite\Excel\Facades\Excel;
use Webcolorzpos\EmployeeMaster\Models\employee\employee_export;
use Webcolorzpos\EmployeeMaster\Models\employee\employee_role;
//use Webcolorzpos\Store_Profile\Models\store_profile\company_relationship_tree;
use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
use Log;
class EmployeeMasterController extends Controller
{
    public function index()
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $state                  =   state::all();
        $country                =   country::all();
        $company_id             =   Auth::user()->company_id;
        $roles                  =   employee_role::all(); //where('company_id','=',$company_id)->get();

        // ->where('is_master',0)

        $userId = Auth::User()->user_id;

        $result     =   user::where('company_id','=',$company_id)->whereRaw("user_id!='$userId'")
        ->with('state')
        ->with('employee_role')
        ->where('deleted_at','=',NULL)
        ->orderBy('user_id', 'DESC')
        ->get();

        // $get_store = company_relationship_tree::where('warehouse_id', '=', Auth::user()->company_id)->whereNull('deleted_at')
        // ->with('company_profile','storeUsers')
        // ->get();
        
        $get_store = array();

        return view('employee::employee/employee_master',compact('result','state','country','roles','get_store'));
    }

    public function employeeName_search(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $result = user::select('employee_firstname','employee_middlename','employee_lastname','user_id')
        // ->where('company_id',Auth::user()->company_id)
        ->Where('employee_firstname', 'LIKE', "%$request->search_val%")
        ->orWhere('employee_middlename', 'LIKE', "%$request->search_val%")
        ->orWhere('employee_lastname', 'LIKE', "%$request->search_val%")
        ->take(10)->get();

        return json_encode(array("Success"=>"True","Data"=>$result));
    }

    public function employee_mobile_search(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $result = user::select('employee_mobileno','user_id')
        // ->where('company_id',Auth::user()->company_id)
        ->orWhere('employee_mobileno', 'LIKE', "%$request->search_val%")
        ->take(10)->get();

        return json_encode(array("Success"=>"True","Data"=>$result));
    }

    public function employee_code_search(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $result = user::select('employee_code','user_id')
        // ->where('company_id',Auth::user()->company_id)
        ->Where('employee_code', 'LIKE', "%$request->search_val%")
        ->take(10)->get();

        return json_encode(array("Success"=>"True","Data"=>$result));
    }

    public function employee_designation_search(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $result = user::select('employee_designation','user_id')
        // ->where('company_id',Auth::user()->company_id)
        ->Where('employee_designation', 'LIKE', "%$request->search_val%")
        ->take(10)->get();

        return json_encode(array("Success"=>"True","Data"=>$result));
    }

    public function searchEmployeeResult(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        if($request->ajax())
        {
            $data                   =      $request->all();

            $employeeName           =      $data['employeeName'];
            $mobileNo               =      $data['mobileNo'];
            $empCode                =      $data['empCode'];
            $empDesignation         =      $data['empDesignation'];
            $search_store_id        =      $data['search_store_id'];

            //where('company_id',Auth::user()->company_id)

            $query = user::where('deleted_at','=',NULL)->whereNull('is_master');

            /////////// Employee Name Search Start
            if($employeeName!='')
            {
                $nameExplode        =   explode(' ',$employeeName);
                if(strpos($employeeName, ' ') !== false)
                {

                    $query->whereRaw('employee_firstname LIKE "%'.$nameExplode[0].'%"');

                    if($nameExplode[1]!='')
                    {
                        $query->whereRaw('employee_middlename LIKE "%'.$nameExplode[1].'%"');
                    }

                    if($nameExplode[2]!='')
                    {
                        $query->whereRaw('employee_lastname LIKE "%'.$nameExplode[2].'%"');
                    }
                }
                else
                {
                    $query->whereRaw('employee_firstname LIKE "%'.$employeeName.'%"')
                    ->orwhereRaw('employee_middlename LIKE "%'.$employeeName.'%"')
                    ->orwhereRaw('employee_lastname LIKE "%'.$employeeName.'%"');
                }
            }

            /////////// employee with store
            if($search_store_id!='')
            {
                 $query->whereRaw("store_id='$search_store_id'");
            }

            /////////// Employee Mobile Search Start
            if($mobileNo!='')
            {
                $query->whereRaw("employee_mobileno LIKE '%$mobileNo%'");

            }

            /////////// Employee Employee Code Search Start
            if($empCode!='')
            {
                $query->whereRaw("employee_code LIKE '%$empCode%'");
            }

            /////////// Employee Employee Designation Search Start
            if($empDesignation!='')
            {
                $query->whereRaw("employee_designation LIKE '%$empDesignation%'");
            }

            /////////// Employee status Search Start
            if($data['radioValue']!='')
            {
                $query->where('is_active','=',$data['radioValue']);
            }

            $query->with('state','store_name');

            $result     =   $query->orderBy('user_id', 'DESC')->get();
            // dd($result); exit;

            return view('employee::employee/view_employee_data',compact('result'))->render();
        }
    }

    public function employee_form_create(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $employee_form_data = $request->all();

        if(isset($employee_form_data['store_id']))
        {
            $store_id               =   $employee_form_data['store_id'];
        }
        else
        {
            $store_id               =   '';
        }
        
        if(isset($employee_form_data['store_module']))
        {
            $store_module       =   $employee_form_data['store_module'];
        }
        else
        {
            $store_module       =   0;
        }

        if(isset($employee_form_data['store_user_limit']))
        {
            $store_user_limit       =   $employee_form_data['store_user_limit'];
        }
        else
        {
            $store_user_limit       =   0;
        }


        $company_id = Auth::User()->company_id;

        if(isset($employee_form_data['user_id_'])=='')
        {
            // echo $store_id; exit;
            
            if(isset($employee_form_data['employee_login']))
            {
                if($employee_form_data['employee_login']!='')
                {
                    if($store_id=='' || $store_id==1)
                    {
                        $count_standard_users  =   user::select('user_id')->where('company_id',$company_id)->whereNull('deleted_at')
                        ->whereNull('is_master')->count();
        
                        $standard_emp_limit     =   $employee_form_data['standard_emp_limit'];
                        // echo $count_standard_users; exit;
                        if($standard_emp_limit<=$count_standard_users)
                        {
                            return json_encode(array("Success"=>"False","status_code"=>410,"Message"=>"Sorry, Your Employee create limit is over. Please contact support team."));
                        }
                        // echo '<pre>'; print_r($count_standard_users);
                        // exit;
                    }
                    else
                    {
                        if($store_module==1)
                        {
                            $count_store_users  =   user::select('user_id')->where('store_id',$store_id)->whereNull('deleted_at')->count();
                            // print_r($count_store_users); exit;
                            if($count_store_users>=$store_user_limit)
                            {
                                return json_encode(array("Success"=>"False","status_code"=>410,"Message"=>"Sorry, Your Employee create limit is over. Please contact support team."));
                                exit;
                            }
                            else
                            {
                                // return json_encode(array("Success"=>"False","status_code"=>410,"Message"=>"Sorry"));
                                // exit;
                            }
                        }
                    }
                }
                else
                {

                }
            }
            
        }

        if(isset($employee_form_data['discount_on_billing']))
        {
            $discount_on_billing        =   $employee_form_data['discount_on_billing'];
            $discount_val_on_billing    =   $employee_form_data['discount_val_on_billing'];
        }
        else
        {
            $discount_on_billing        =   1;
            $discount_val_on_billing    =   '';
        }

        

        if(isset($employee_form_data['delete_kot']))
        {
            $delete_kot                 =   $employee_form_data['delete_kot'];
        }
        else
        {
            $delete_kot                 =   0;
        }
        
        if(isset($employee_form_data['transfer_kot']))
        {
            $transfer_kot               =   $employee_form_data['transfer_kot']; 
        }
        else
        {
            $transfer_kot               =   0;
        }

        if(isset($employee_form_data['reprint_bill']))
        {
            $reprint_bill               =   $employee_form_data['reprint_bill'];
        }
        else
        {
            $reprint_bill               =   0;
        }

        // echo '<pre>';print_r($employee_form_data); exit;
        
        if(isset($employee_form_data['back_date_billing']))
        {
            $back_date_billing          =   $employee_form_data['back_date_billing'];
        }
        else
        {
            $back_date_billing          =   1;
        }
        $make_credit_sales              =   1;
        if(isset($employee_form_data['make_credit_sales']))
        {
            $make_credit_sales          =   $employee_form_data['make_credit_sales'];
        }


        $validate_error = \Validator::make($employee_form_data,
        [
            'employee_firstname' => ['required'],
            'employee_mobileno' => ['required', Rule::unique('users')->ignore($employee_form_data['user_id_'], 'user_id')],
            'email' => ['required',Rule::unique('users')->ignore($employee_form_data['user_id_'], 'user_id')],
        ]);

        if($validate_error-> fails())
        {
            return json_encode(array("Success"=>"False","status_code"=>409,"Message"=>$validate_error->messages()));
            exit;
        }

        

        
        if($validate_error->passes())
        {
            
            
            //////////////////////////////////// EMPLOYEE PROOF IMAGE

            $userId = Auth::User()->user_id;

            // print_r(); exit;

            $company_id = Auth::User()->company_id;

            $created_by = $userId;

            $employee_joiningdate   =   $employee_form_data['employee_joiningdate']==''?NULL:date('Y-m-d',strtotime($employee_form_data['employee_joiningdate']));
            $employee_dob           =   $employee_form_data['employee_dob']==''?NULL:date('Y-m-d',strtotime($employee_form_data['employee_dob']));
           

            if($employee_form_data['adminpassword']=='')
            {
                $password               =   $employee_form_data['password']==''?$employee_form_data['old_password_']:bcrypt($employee_form_data['password']);
                $encrypt_password       =   $employee_form_data['encrypt_password']==''?$employee_form_data['old_encrypt_password_']:bcrypt($employee_form_data['encrypt_password']);
                $admin                  =   0;
            }
            else
            {
                $password               =   $employee_form_data['password']==''?$employee_form_data['password']:bcrypt($employee_form_data['password']);
                $encrypt_password       =   $employee_form_data['encrypt_password']==''?$employee_form_data['encrypt_password']:bcrypt($employee_form_data['encrypt_password']);

                $admin      =   user::where('user_id',Auth::User()->user_id)->get();
                if(sizeof($admin)!=0)
                {
                    if ((Hash::check($employee_form_data['adminpassword'], $admin[0]->encrypt_password)))
                    {
                        $admin  =   0;
                    }
                    else
                    {
                        $admin  =   1;
                    }
                }
                else
                {
                    $admin  =   1;
                }
            }

            if($admin==0)
            {
                $comP_id    =   Auth::user()->company_id;
                // if($employee_form_data['company_id_']=='')
                // {
                //     $comP_id    =   $company_id;
                // }
                // else
                // {
                //     $comP_id    =   $employee_form_data['company_id_'];
                // }

                if(isset($employee_form_data['employee_role_id_']) && $employee_form_data['employee_role_id_']=='')
                {
                    $emp_role_id    =   $employee_form_data['emp_role_id'];
                }
                else
                {
                    
                    $emp_role_id    =   $employee_form_data['employee_role_id_'];
                   
                }

                if($employee_form_data['is_master']=='')
                {
                    $is_master  =   null;
            
                }
                else
                {
                    $is_master  =   $employee_form_data['is_master'];
                }

                // print_r($userId); exit;

                if(isset($employee_form_data['emp_id_no']))
                {
                    $emp_id_no  =   $employee_form_data['emp_id_no'];
                }
                else
                {
                    $emp_id_no  =   '';
                }

                $users = user::updateOrCreate(
                ['user_id' => $employee_form_data['user_id_']],
                [
                    'company_id'=>$company_id,
                    'created_by' =>$userId,
                    'is_master' => $is_master,
                    'employee_code' => (isset($employee_form_data['employee_code'])?$employee_form_data['employee_code'] : ''),
                    'employee_firstname' => (isset($employee_form_data['employee_firstname'])?$employee_form_data['employee_firstname'] : ''),
                    'employee_middlename' => (isset($employee_form_data['employee_middlename'])?$employee_form_data['employee_middlename'] : ''),
                    'employee_lastname' => (isset($employee_form_data['employee_lastname'])?$employee_form_data['employee_lastname'] : ''),
                    'employee_mobileno' => (isset($employee_form_data['employee_mobileno'])?$employee_form_data['employee_mobileno'] : ''),
                    'employee_joiningdate' => ($employee_joiningdate),
                    'employee_login' => (isset($employee_form_data['employee_login'])?$employee_form_data['employee_login'] : 0),
                    'email' => (isset($employee_form_data['email'])?$employee_form_data['email'] : ''),
                    'password' => ($password),
                    'encrypt_password' => ($encrypt_password),
                    'employee_dob' => ($employee_dob),
                    'employee_address' => (isset($employee_form_data['employee_address'])?$employee_form_data['employee_address'] : ''),
                    'employee_area' => (isset($employee_form_data['employee_area'])?$employee_form_data['employee_area'] : ''),
                    'employee_city_town' => (isset($employee_form_data['employee_city_town'])?$employee_form_data['employee_city_town'] : ''),
                    'state_id' => (isset($employee_form_data['state_id']) && $employee_form_data['state_id'] != ''? $employee_form_data['state_id'] : NULL),
                    'employee_zipcode' => (isset($employee_form_data['employee_zipcode'])?$employee_form_data['employee_zipcode'] : ''),
                    'country_id' => (isset($employee_form_data['country_id']) && $employee_form_data['country_id'] != ''? $employee_form_data['country_id'] : NULL),
                    'store_id' => (isset($employee_form_data['store_id'])?$employee_form_data['store_id'] : NULL),
                    'employee_role_id' => $emp_role_id,
                    'is_active' => '1',


                ]);

                $user_id = $users->user_id;

                if($users)
                {
                    if ($employee_form_data['user_id'] != '')
                    {

                        return json_encode(array("Success"=>"True","Message"=>"Employee Account has been successfully updated.","url"=>"employee_master"));
                    }
                    else
                    {
                        return json_encode(array("Success"=>"True","Message"=>"Employee Account has been successfully added.","url"=>"employee_master"));
                    }
                }
                else
                {
                    return json_encode(array("Success"=>"False","Message"=>"Something Went Wrong"));
                }
            }
            else
            {
                return json_encode(array("Success"=>"False","Message"=>"Admin Password not matched"));
            }   // check admin
        }
    }

    public function changeStatus(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data       =   $request->all();
        $user_id    =   $data['user_id'];

        //->where('company_id','=',Auth::user()->company_id)

        $status     =   user::select('is_active','user_id')->where('user_id','=',$user_id)->get();

        if($status[0]['is_active']==1)
        {
            $status     =   0;
            $class      =   'RedBackground';
        }
        else
        {
            $status     =   1;
            $class      =   'GreenBackground';
        }

        $query  =   user::where('user_id', $user_id)
        ->update([
           'is_active' => $status
        ]);

        return json_encode(array("Success"=>"False","status"=>$status,"user_id"=>$user_id,"class"=>$class));

    }

    public function removePicture(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data           =   $request->all();
        $employee_id    =   $data['user_id'];

        $result         =   user::select('employee_picture')->where('user_id',$employee_id)->get();
        $image_path     =   public_path(EMPLOYEE_IMAGE_URL_CONTROLLER).'/'.$result[0]->employee_picture;

        @unlink($image_path);   // REMOVE IMAGE FROM FOLDER

        $query  =   user::where('user_id', $employee_id)
        ->update([
           'modified_by' => Auth::User()->user_id,
           'updated_at' => date('Y-m-d H:i:s'),
           'employee_picture' => '',
        ]);

        return json_encode(array("Message"=>"employee picture removed successfully","picture"=>'empty'));
    }

    public function removeIDPicture(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data           =   $request->all();
        $employee_id    =   $data['user_id'];

        $result         =   user::select('employee_id_image')->where('user_id',$employee_id)->get();
        $image_path     =   public_path(EMPLOYEE_IMAGE_URL_CONTROLLER).'/'.$result[0]->employee_id_image;

        @unlink($image_path);   // REMOVE IMAGE FROM FOLDER

        $query  =   user::where('user_id', $employee_id)
        ->update([
           'modified_by' => Auth::User()->user_id,
           'updated_at' => date('Y-m-d H:i:s'),
           'employee_id_image' => '',
        ]);

        return json_encode(array("Message"=>"employee id removed successfully","picture"=>'empty'));
    }

    public function deleteEmployee(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data       =   $request->all();
        $employee_id    =   $data['user_id'];

        $query  =   user::where('user_id', $employee_id)
        ->update([
           'deleted_by' => Auth::User()->user_id,
           'deleted_at' => date('Y-m-d H:i:s'),
        ]);

        return json_encode(array("Message"=>"employee deleted successfully","url"=>"employee_master"));

    }

    public function editEmployee(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data       =   $request->all();
        $employee_id    =   $data['user_id'];

        $result     =   user::where('user_id',$employee_id)->get();

        return json_encode(array("Data"=>$result));

    }

    public function showResume(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data       =   $request->all();
        $employee_id    =   $data['user_id'];

        $result     =   user::where('user_id',$employee_id)->with('state','country','employee_role')->get();

        return json_encode(array("Data"=>$result));

    }

    public function changePassword(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data               =   $request->all();
        $employee_id        =   $data['user_id'];
        $old_password       =   $data['old_password'];
        $re_old_password    =   $data['re_old_password'];
        $new_password       =   $data['new_password'];
        $admin_password     =   $data['admin_password'];

        $admin      =   user::where('user_id',Auth::User()->user_id)->get();
        if(sizeof($admin)!=0)
        {
            if ((Hash::check($admin_password, $admin[0]->encrypt_password)))
            {
                $employee   =   user::where('user_id',$employee_id)->get();
                if(sizeof($employee)!=0)
                {
                    if ((Hash::check($old_password, $employee[0]->encrypt_password)))
                    {
                        $query  =   user::where('user_id', $employee_id)
                        ->update([
                            'modified_by' => Auth::User()->user_id,
                            'updated_at' => date('Y-m-d H:i:s'),
                            'password' => bcrypt($new_password),
                            'encrypt_password' => bcrypt($new_password),
                        ]);
                        return json_encode(array("Success"=>"True","Message"=>"employee password changed successfully...","url"=>"employee_master"));
                    }
                    else
                    {
                        return json_encode(array("Success"=>"False","Message"=>"employee old password does not matched"));
                    }
                }
            }
            else
            {
                return json_encode(array("Success"=>"False","Message"=>"admin password does not matched"));
            }
        }
    }

    public function createPassword(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data               =   $request->all();
        $employee_id        =   $data['user_id'];
        $new_password       =   $data['new_password'];
        $confirm_password   =   $data['confirm_password'];
        $admin_password     =   $data['admin_password'];

        $admin      =   user::where('user_id',Auth::User()->user_id)->get();
        if(sizeof($admin)!=0)
        {
            if ((Hash::check($admin_password, $admin[0]->encrypt_password)))
            {
                $query  =   user::where('user_id', $employee_id)
                ->update([
                    'modified_by' => Auth::User()->user_id,
                    'updated_at' => date('Y-m-d H:i:s'),
                    'password' => bcrypt($new_password),
                    'encrypt_password' => bcrypt($new_password),
                    'employee_login' => 1,
                ]);
                return json_encode(array("Success"=>"True","Message"=>"employee password created successfully...","url"=>"employee_master"));
            }
            else
            {
                return json_encode(array("Success"=>"False","Message"=>"admin password does not matched"));
            }
        }
    }


    // public function exportemployee_details(Request $request)
    // {
    //     Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
    //     return Excel::download(new employee_export($request->employeeName,$request->mobileNo,$request->empCode,$request->empDesignation,$request->radioValue), 'Employee-Export.xlsx');
    // }

    public function selectStore(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data               =   $request->all();

        $store_id        =   $data['store_id'];

        $store_company_id   =   company_profile::select('company_id')->where('company_profile_id',$store_id)->first();

        return json_encode(array("Success"=>"true","Data"=>$store_company_id));

    }

    public function check_password(Request $request)
    {
        $data = $request->all();

      if(isset($data) && $data != '' && isset($data['password']) && $data['password'] != '')
      {

          $user = user::where('company_id',Auth::User()->company_id)
              ->where('user_id',Auth::User()->user_id)
              ->select('encrypt_password','employee_firstname')
              ->first();

         if(isset($user) && $user != '' && isset($user['employee_firstname']) && $user['employee_firstname'] != '')
         {
             if(Hash::check($data['password'],$user['encrypt_password']))
             {
                 return json_encode(array("Success"=>"True","Message"=>"Successfull."));
             }else{
                 return json_encode(array("Success"=>"False","Message"=>"Not Matching Data Found In Our Database."));
             }

         }
         else
         {
             return json_encode(array("Success"=>"False","Message"=>"Not Matching In Our Database."));
         }

      }
      else
      {
          return json_encode(array("Success"=>"True","Message"=>"Something went wrong"));
          exit;
      }
    }


}
