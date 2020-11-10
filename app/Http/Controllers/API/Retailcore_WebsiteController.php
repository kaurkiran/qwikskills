<?php

namespace App\Http\Controllers\API;

use App\company;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\CompanyController;
use DB;
use Retailcore\Company_Profile\Models\company_profile\company_profile;
use Retailcore\Products\Models\product\price_master;

class Retailcore_WebsiteController extends Controller
{
    public function save_demo_inquiry(Request $request)
    {
       $data = $request->data;
       try {
           DB::beginTransaction();

           if (!isset($data['name']) || $data['name'] == '')
           {
               return json_encode(array("Success" => "False", "Message" => "Name Can Not Be Empty"));
               exit;
           }
           if (!isset($data['email']) || $data['email'] == '') {
               return json_encode(array("Success" => "False", "Message" => "Email Can Not Be Empty"));
               exit;
           }
           if (!isset($data['phone']) || $data['phone'] == '') {
               return json_encode(array("Success" => "False", "Message" => "Phone No. Can Not Be Empty"));
               exit;
           }
           
        //   print_r($data['softwarereq']);
        //   exit;
          if (!isset($data['softwarereq']) || $data['softwarereq'] == '') {
              return json_encode(array("Success" => "False", "Message" => "Software Required For Can Not be Empty"));
              exit;
          }
           

           $check_email_exist = user::where('email',$data['email'])
               ->whereNull('deleted_at')->where('is_active',1)->count('user_id');

           $check_mobile_exist = user::where('employee_mobileno',$data['phone'])
               ->whereNull('deleted_at')->where('is_active',1)->count('user_id');

           if(isset($check_email_exist) && $check_email_exist > 0)
           {
                return json_encode(array("Success"=>"False","Message"=>"Trial access with this email id is already active. Please use other email id or contact us."));
                exit;
           }

           if(isset($check_mobile_exist) && $check_mobile_exist > 0)
           {
                return json_encode(array("Success"=>"False","Message"=>"Trial access with this mobile no. is already active. Please use other mobile no. or contact us."));
                exit;
           }

           $cmp = company::updateOrCreate(
               ['company_id' => ''],
               [
               'company_name' => 'Retailcore_Trial_'.isset($data['name']) ? $data['name'] : '',
               'company_contact_person' => isset($data['name']) ? $data['name'] : '',
               'company_address' => isset($data['city']) ? $data['city'] : '',
               'company_contact_no' => (isset($data['phone']) ? $data['phone'] : ''),
               'company_mobile_no' => (isset($data['phone']) ? $data['phone'] : ''),
               'company_email' => (isset($data['email']) ? $data['email'] : ''),
               'is_active' => '1'
               ]);
               
           $cmpid = $cmp->company_id;
           
           $inward_type     =   '';
           
           if($data['softwarereq']=='Garments/Apparels')
           {
               $inward_type  =   2;
           }
           elseif($data['softwarereq']=='Grocery/Supermarket')
           {
               $inward_type  =   1;
           }
           elseif($data['softwarereq']=='Other')
           {
               $inward_type  =   1;
           }
           
           $cmp_profile = company_profile::updateOrCreate(
               ['company_profile_id' => '',
                   'company_id' => $cmpid],
               [
                   'full_name' => isset($data['name']) ? $data['name'] : '',
                   'personal_mobile_dial_code' => '',
                   'personal_mobile_no' => (isset($data['phone']) ? $data['phone'] : ''),
                   'personal_email' => (isset($data['email']) ? $data['email'] : ''),
                   'company_name' => 'Retailcore_Trial_'.isset($data['name']) ? $data['name'] : '',
                   'company_mobile_dial_code' =>  '+91,in',
                   'company_mobile' => (isset($data['phone']) ? $data['phone'] : ''),
                   'company_email' => (isset($data['email']) ? $data['email'] : ''),
                   'website' => '',
                   'gstin' => '',
                   'state_id' =>  24,
                   'whatsapp_mobile_dial_code' => '',
                   'whatsapp_mobile_number' => '',
                   'facebook' => '',
                   'instagram' => '',
                   'pinterest' => '',
                   'company_address' => '',
                   'company_area' => '',
                   'company_city' => '',
                   'company_pincode' => '',
                   'country_id' => 102,
                   'tax_title'=>'GST',
                   'authorized_signatory_for' => '',
                   'terms_and_condition' => '',
                   'additional_message' => '',
                   'return_days' => '',
                   'minimumbilledit_days' =>'',
                   'bill_number_prefix' => '',
                   'b2b_number_prefix' => '',
                   'credit_receipt_prefix' => '',
                   'debit_receipt_prefix' => '',
                   'po_number_prefix' => '',
                   'account_holder_name' => '',
                   'bank_name' => '',
                   'account_number' => NULL,
                   'ifsc_code' => '',
                   'branch' => '',
                   'po_terms_and_condition' => '',
                   'ean_code' => '',
                   'ean_series' => '',
                   'inward_type' => $inward_type
               ]);

          $created_by =  user::select('user_id')->whereNull('deleted_at')->first();



                $users = user::updateOrCreate(
                    [
                        'company_id' => $cmpid,
                        'created_by' => $created_by->user_id,
                        'is_master' => 1,
                        'employee_code' => '',
                        'employee_firstname' => (isset($data['name']) ? $data['name'] : ''),
                        'employee_middlename' => '',
                        'employee_lastname' => '',
                        'employee_mobileno_dial_code' => '+91,in',
                        'employee_mobileno' => (isset($data['phone']) ? $data['phone'] : ''),
                        'employee_joiningdate' => '',
                        'employee_login' => 1,
                        'email' => (isset($data['email']) ? $data['email'] : ''),
                        'password' => bcrypt($data['phone']),
                        'encrypt_password' =>bcrypt($data['phone']),
                        'employee_address_type' => 1,
                        'employee_address' => 'Demo Test',
                        'employee_area' => 'Demo Test',
                        'employee_city_town' => 'Demo Test',
                        'employee_zipcode' => '12345',
                        'employee_remarks' => (isset($data['message']) ? $data['message'] : ''),
                        'is_active' => '1',
                        'app_id' => md5(microtime() . $data['name']),
                        'app_secret' => md5(microtime() . $data['email'])

                    ]);
                DB::commit();

                if ($users->user_id != '')
                {
                    return json_encode(array("Success"=>"True","Message"=>"Thank you for requesting RetailCore Software Trial Access. Check your email inbox for an email from us. If you don't find our email in the inbox, then do check your spam folder or call us or email to us at sales@retailcore.in","user_name"=>$data['email'],"password"=>$data['phone']));
                }
                else{
                    return json_encode(array("Success"=>"False","Message"=>"Getting Technical Problem Please Directly Call Us"));
            }

       }
       catch(\Illuminate\Database\QueryException $e)
       {
           DB::rollback();
           return json_encode(array("Success" => "False", "Message" => $e->getMessage()));
           exit;
       }

    }
}
