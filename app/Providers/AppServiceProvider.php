<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\home_navigation;
use App\home_navigations_data;
use Webcolorzpos\EmployeeMaster\Models\employee\employee_role;
use Webcolorzpos\EmployeeMaster\Models\employee\employee_role_permission;
use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
use Webcolorzpos\Products\Models\product\ProductFeatures;
use App\company;
use Auth;
use DB;
use App\Models\User;
use App\state;
use App\country;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
       Schema::defaultStringLength(191);

      //  $checkTbl1   =   Schema::hasTable('home_navigations');

        $checkTbl   =   Schema::hasTable('home_navigations');

        if($checkTbl)
        {
           

            view()->composer('*', function ($view)
            {
                if(Auth::check())
                {



                    $user   =   user::select('employee_role_id','is_master')->where('user_id','=',Auth::User()->user_id)->get();
                    

                    if($user[0]['is_master']==1)
                    {
                        //echo 'aaa';
                        $home_navigation = home_navigation::where('is_active','=','1')
                        ->orderBy('ordering', 'ASC')
                        ->with('home_navigations_data')
                        ->get();


                        foreach ($home_navigation as $key => $value)
                        {
                            foreach ($value['home_navigations_data'] as $ke=>$val)
                            {
                                
                                 
                               if($val['parent'] != 0)
                               {
                             
                                    $child_data=  home_navigations_data::
                                          where('child','=',$val['parent'])
                                          ->orderBy('nav_display_name', 'ASC')
                                          ->where('is_active','=','1')
                                          ->get();
                           
                           
                                        if(isset($child_data) && $child_data != '')
                                        {
                                            $value['home_navigations_data'][$ke]['sub_menu'] = $child_data;
                                        }
                                }
                            } 
                                                      
                           
                        }

                    }
                    else
                    {
                        //echo 'bbb';
                        $home_navigation    =   employee_role_permission::select('home_navigation_id','home_navigation_data_id')
                            ->where('employee_role_id',$user[0]['employee_role_id'])
                            ->where('permission_view',1)
                            ->where('home_navigation_data_id',NULL)
                            ->with('home_navigations')
                            ->whereNull('deleted_by')
                            ->groupBy('home_navigation_id','home_navigation_data_id')
                            ->get();
                            

                        foreach ($home_navigation as $key => $value)
                        {
                            $user_employee_roleid   =  $user[0]['employee_role_id'];
                            $home_navigation[$key]['sub'] = employee_role_permission::where('home_navigation_id',$value['home_navigation_id'])
                             ->where('home_navigation_data_id','!=',NULL)
                             ->where('employee_role_id',$user[0]['employee_role_id'])
                             ->where('permission_view',1)
                             ->with('home_navigations_data_s')
                             ->get();
                             
                             

                            foreach ($home_navigation[$key]['sub'] as $ke=>$val)
                            {
                                if($val['home_navigations_data_s']['parent'] != 0)
                              {
                             
                                    $child_data=  home_navigations_data::
                                           where('child','=',$val['home_navigations_data_s']['parent'])
                                           ->with('employee_role_permission')->whereHas('employee_role_permission',function ($q) use($user_employee_roleid){
                                                $q->where('permission_view',1);
                                                $q->where('employee_role_id',$user_employee_roleid);
                                            })
                                          ->where('is_active','=','1')
                                          ->get();
                           
                           
                                        if(isset($child_data) && $child_data != '')
                                        {
                                            $home_navigation[$key]['sub'][$ke]['home_navigations_data_s']['sub_menu'] = $child_data;
                                        }
                                }
                                
                            }  
                           
                           
                        }
                        
                      
                    }
                    $navData = array(
                        'navLinks' => $home_navigation,
                        'chk_master' => $user[0]['is_master'],
                    );

                    view()->share('navLinks',$navData);
                }
           });

            view()->composer('*', function ($view)
            {
                if(Auth::check())
                {
                   // $current_url    =   url()->current();
                    $current_url    = $_SERVER['REQUEST_URI'];
                    if($_SERVER['QUERY_STRING'] != '')
                    {
                        $current_url    = $_SERVER['HTTP_REFERER'];
                    }


                    $strArray       =   explode('/',$current_url);
                    $pageUrl        =   end($strArray);   

                    $breadcrumb     =   home_navigations_data::select('home_navigation_id','home_navigation_data_id','nav_tab_display_name','nav_url')->where('nav_url','=',$pageUrl)->where('is_active','=','1')->with('home_navigation')->get();


                    if(sizeof($breadcrumb)==0)
                    {
                        $navurl    =   '1'; //'dashboard';
                    }
                    else
                    {
                        $navurl    =   $breadcrumb[0]['home_navigation_data_id'];//$breadcrumb[0]['nav_url'];
                    }

                    $company_profile = company_profile::select('opening_date')->where('company_id',Auth::user()->company_id)->first();

                    $user   =   user::select('employee_role_id','is_master')->where('user_id','=',Auth::User()->user_id)->get();

                    $urlData = array(
                        'breadcrumb' => $breadcrumb,
                        'navurl' => $navurl,
                        'company_profile' => $company_profile,
                        'UsersData' => $user
                    );

                    view()->share('urlData',$urlData);


                    $employee_role_id     =   user::where('user_id','=',Auth::User()->user_id)->get();

                    // checking dashboard permission
                    $role_permissions_dash     =   user::where('user_id','=',Auth::User()->user_id)
                    ->with([
                    'employee_role_permission' => function($fquery) use ($navurl,$employee_role_id) {
                        $fquery->select('*');
                        $fquery->where('home_navigation_id','=',1);
                        // $fquery->where('home_navigation_data_id','=',$navurl);
                        $fquery->where('employee_role_id','=',$employee_role_id[0]['employee_role_id']);
                        $fquery->whereNull('deleted_by');
                    }
                    ])->get();

                    $role_permissions     =   user::where('user_id','=',Auth::User()->user_id)
                    ->with([
                    'employee_role_permission' => function($fquery) use ($navurl,$employee_role_id) {
                        $fquery->select('*');
                        // $fquery->where('home_navigation_id','=',$navurl);
                        $fquery->where('home_navigation_data_id','=',$navurl);
                        $fquery->where('employee_role_id','=',$employee_role_id[0]['employee_role_id']);
                        $fquery->whereNull('deleted_by');
                    }
                    ])->get();

                    // echo '<pre>'; print_r($navurl); exit;

                    if($employee_role_id[0]['is_master']==1)
                    {
                        $permission_view        =   1;
                        $permission_add         =   1;
                        $permission_edit        =   1;
                        $permission_delete      =   1;
                        $permission_export      =   1;
                        $permission_print       =   1;
                        $permission_upload      =   1;
                        $userType               =   1;
                        $company_id             =   Auth::User()->company_id;
                        $dashboard_url          =   '';
                    }
                    else
                    {
                        $urll       =   $_SERVER['REQUEST_URI'];
                        $url_val    =   substr($urll, strrpos($urll, '/') + 1);
                        
                        if($url_val=='dashboard')
                        {
                            if(sizeof($role_permissions_dash[0]['employee_role_permission'])==0)
                            {
                                $permission_view        =   0;
                                $permission_add         =   0;
                                $permission_edit        =   0;
                                $permission_delete      =   0;
                                $permission_export      =   0;
                                $permission_print       =   0;
                                $permission_upload      =   0;
                                $userType               =   0;
                                $company_id             =   Auth::User()->company_id;
                                $dashboard_url          =   'my_profile';
                            }
                            else
                            {
                                $permission_view        =   $role_permissions[0]['employee_role_permission'][0]['permission_view'];
                                $permission_add         =   $role_permissions[0]['employee_role_permission'][0]['permission_add'];
                                $permission_edit        =   $role_permissions[0]['employee_role_permission'][0]['permission_edit'];
                                $permission_delete      =   $role_permissions[0]['employee_role_permission'][0]['permission_delete'];
                                $permission_export      =   $role_permissions[0]['employee_role_permission'][0]['permission_export'];
                                $permission_print       =   $role_permissions[0]['employee_role_permission'][0]['permission_print'];
                                $permission_upload      =   $role_permissions[0]['employee_role_permission'][0]['permission_upload'];
                                $userType               =   0;
                                $company_id             =   Auth::User()->company_id;
                                $dashboard_url          =   '';
                            }
                        }
                        else
                        {
                            if(sizeof($role_permissions[0]['employee_role_permission'])==0)
                            {
                                $permission_view        =   0;
                                $permission_add         =   0;
                                $permission_edit        =   0;
                                $permission_delete      =   0;
                                $permission_export      =   0;
                                $permission_print       =   0;
                                $permission_upload      =   0;
                                $userType               =   0;
                                $company_id             =   Auth::User()->company_id;
                                $dashboard_url          =   'my_profile';
                            }
                            else
                            {
                                $permission_view        =   $role_permissions[0]['employee_role_permission'][0]['permission_view'];
                                $permission_add         =   $role_permissions[0]['employee_role_permission'][0]['permission_add'];
                                $permission_edit        =   $role_permissions[0]['employee_role_permission'][0]['permission_edit'];
                                $permission_delete      =   $role_permissions[0]['employee_role_permission'][0]['permission_delete'];
                                $permission_export      =   $role_permissions[0]['employee_role_permission'][0]['permission_export'];
                                $permission_print       =   $role_permissions[0]['employee_role_permission'][0]['permission_print'];
                                $permission_upload      =   $role_permissions[0]['employee_role_permission'][0]['permission_upload'];
                                $userType               =   0;
                                $company_id             =   Auth::User()->company_id;
                                $dashboard_url          =   '';
                            }
                        }
                    }
               
                    $role_permissions = array(
                        'permission_view' => $permission_view,
                        'permission_add' => $permission_add,
                        'permission_edit' => $permission_edit,
                        'permission_delete' => $permission_delete,
                        'permission_export' => $permission_export,
                        'permission_print' => $permission_print,
                        'permission_upload' => $permission_upload,
                        'userType' => $userType,
                        'company_id' => $company_id,
                        'dashboard_url' => $dashboard_url
                    );

                    // echo '<pre>'; print_r($role_permissions); exit;

                    view()->share('role_permissions',$role_permissions);

                   

                }
            });
            

        
            }    

            view()->composer('*', function ($view)
            {
                if(Auth::check())
                {
                    $nav_type = company_profile::select('*')->where('company_id',Auth::User()->company_id)->get();
                    $state = state::get();
                    $country = country::get();
                    
                    $view->with('currentUser', Auth::user());

                    $product_features=ProductFeatures::
                        where('deleted_at','=',NULL)
                        ->where('feature_type','=',1)
                        ->where('is_active','=',1)
                        ->orderBy('ordering','ASC')
                        ->get();
                        
                }
                else
                {
                    $nav_type = '';
                    $state = '';
                    $country = '';
                    $product_features = '';
                    $view->with('currentUser', null);
                }

                if($nav_type == '')
                {
                    $nav_type   =   [];
                    $product_features   =   [];
                    $state = [];
                    $country = [];
                    view()->share(['nav_type' =>$nav_type,'product_features' =>$product_features,'state'=>$state,'country'=>$country]);

                }
                else
                {

                    view()->share(['nav_type' => $nav_type,'product_features' =>$product_features,'state'=>$state,'country'=>$country]);
                }
            });
        
    }
}
