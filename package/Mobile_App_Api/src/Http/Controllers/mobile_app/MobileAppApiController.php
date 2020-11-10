<?php

namespace Webcolorzpos\Mobile_App_Api\Http\Controllers\mobile_app;
use App\Http\Controllers\Controller;
use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
use Webcolorzpos\PO\Models\purchase_order\purchase_order_detail;
use Webcolorzpos\Products\Models\product\price_master;
use Webcolorzpos\Products\Models\product\product;
use Webcolorzpos\Products\Models\product\ProductFeatures;
use Webcolorzpos\Mobile_App_Api\Models\mobile_app\mobile_app;
use Illuminate\Http\Request;
use Webcolorzpos\Customer\Models\customer\customer;
use Webcolorzpos\Customer\Models\customer\customer_address_detail;
use Webcolorzpos\Customer\Models\customer\customer_export;
use Webcolorzpos\Customer_Source\Models\customer_source\customer_source;
use Webcolorzpos\Referral_Points\Models\referral_points\referral_point;

use Webcolorzpos\Sales\Models\sales_bill;
use Webcolorzpos\Sales\Models\sales_product_detail;
use Webcolorzpos\Sales\Models\sales_bill_payment_detail;
use Webcolorzpos\Sales\Models\payment_method;
use Webcolorzpos\Sales\Models\reference;

use Webcolorzpos\Inward_Stock\Models\inward\inward_stock;
use Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail;
use Webcolorzpos\CreditBalance\Models\customer_creditaccount;
use Webcolorzpos\CreditBalance\Models\customer_creditreceipt;
use Webcolorzpos\CreditBalance\Models\customer_creditreceipt_detail;

use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;
use App\mail_setup;

use App\company;
use App\User;
use Hash;
use App\state;
use App\country;
use Illuminate\Validation\Rule;
use Auth;
use DB;
use Log;
use File;
use PDF;

class MobileAppApiController extends Controller
{

  public function authenticate(Request $request)
  {
      $data = $request->all();

      $username   = $data['username'];
      $password   = $data['password'];

      $users  = user::select('password','user_id','company_id')->where('email',$username)->first();

      if ((Hash::check($password, $users['password'])))
      {
          return json_encode(array("Success"=>"True","user_id"=>$users['user_id'],"company_id"=>$users['company_id'],"Message"=>"Login Successful"));
      }
      else
      {
          return json_encode(array("Success"=>"False","Message"=>"Invalid Login, please try again!"));
      }
  }

  public function customer_list(Request $request)
  {
      $data = $request->all();

      $customer = customer::
      where('company_id', $data['company_id'])
      ->where('deleted_at','=',NULL)
      ->with('customer_multi_address_detail')
      ->with('customer_source')
      ->orderBy('customer_id', 'DESC')->get();

      return json_encode(array("Success"=>"True","Customers"=>$customer));
  }

  public  function product_listing(Request $request)
  {
      $data = $request->all();

      if(!isset($data) || !isset($data['company_id']) || $data['company_id'] == '')
      {
          return json_encode(array("Success"=>"False","Message"=>"Missing Body Data"));
      }

      $product = product::select('product_id','product_name','cost_rate','cost_price','selling_price','offer_price','product_mrp','wholesale_price','cost_gst_percent','cost_gst_amount','extra_charge','profit_percent','profit_amount','sell_gst_percent','sell_gst_amount','product_system_barcode','supplier_barcode','sku_code','product_code','product_description','hsn_sac_code')
          ->where('deleted_at','=',NULL)
          ->orderBy('product_id', 'DESC')
          ->whereIn('item_type',array(1,3))
          ->with(array('product_images' =>function($query){
              $query->select('product_image_id','product_id','caption','product_image');
          }))
          ->with('product_features_relationship')
          ->with(array('product_price_master'=>function($query){
              $query->select('price_master_id','product_id','product_qty','product_mrp','offer_price','b2b','wholesaler_price','sell_price','selling_gst_percent','selling_gst_amount');
          }))
          ->whereHas('product_price_master',function ($q) use($data)
          {
              $q->where('company_id',$data['company_id']);
          })
          /**/
          ->get();

      $product_features =  ProductFeatures::getproduct_feature('');

      foreach ($product AS $key=>$value)
      {
          if(isset($value['product_features_relationship']) && $value['product_features_relationship'] != '')
          {
              $dynamic = array();
              foreach ($product_features AS $kk => $vv)
              {
                  $html_id = $vv['html_id'];
                  if($value['product_features_relationship'][$html_id] != '' && $value['product_features_relationship'][$html_id] != NULL)
                  {
                      $nm =  product::feature_value($vv['product_features_id'],$value['product_features_relationship'][$html_id]);
                     //$product[$key][$html_id] =$nm;
                      $dynamic[$html_id] = $nm;
                  }
              }
              $product[$key]['product_features'] = $dynamic;

              unset($product[$key]['product_features_relationship']);
          }
      }
      return json_encode(array("Success"=>"True","Products"=>$product));
  }

  public function payment_method()
  {
      $payment_method = payment_method::select('payment_method_name','payment_method_id')
                          ->whereNull('deleted_at')->where('is_active',1)->get();

      return json_encode(array("Success"=>"True","Data"=>$payment_method));
  }

  public function search_reference(Request $request)
  {
    $data   = $request->all();
    
    $keyword  = $data['keyword'];
    $company_id   = $data['company_id'];

    $reference  = reference::select('reference_name','reference_id')->where('company_id',$company_id)->whereRaw('reference_name LIKE "%'.$keyword.'%" ')
    ->where('is_active',1)->whereNull('deleted_at')->get();

    if(sizeof($reference)==0)
    {
      return json_encode(array("Success"=>"False","Message"=>"No reference found..."));
    }
    else
    {
      return json_encode(array("Success"=>"True","Message"=>"","Data"=>$reference));
    }

  }

  public function create_customer(Request $request)
  {
      $customerdata = $request->all();

        // $customerdata =  array();

        $company_id   = $customerdata['company_id'];

        $state_id = company_profile::select('state_id')->where('company_id',$company_id)->get();


        $customerdata = preg_replace('/\s+/', ' ', $customerdata);

        $validate_error = \Validator::make($customerdata,
            [
                'customer_mobile' => [Rule::unique('customers')->ignore($customerdata['customer_id'], 'customer_id')->whereNull('deleted_at')->whereNotNull('customer_mobile')],
                'customer_email' => [Rule::unique('customers')->ignore($customerdata['customer_id'], 'customer_id')->whereNull('deleted_at')->whereNotNull('customer_email')],
                'customer_gstin' => [Rule::unique('customer_address_details')->ignore($customerdata['customer_id'], 'customer_id')->whereNull('deleted_at')->whereNotNull('customer_gstin')],
            ]);
        if($validate_error-> fails())
        {
            return json_encode(array("Success"=>"False","status_code"=>409,"Message"=>$validate_error->messages()));
            exit;
        }
        $userId = $customerdata['user_id'];
        $created_by = $userId;

        try{
            DB::beginTransaction();
        $customer = customer::updateOrCreate(
            ['customer_id' => $customerdata['customer_id'], 'company_id'=>$company_id,],
            [
                'created_by' =>$created_by,
                'company_id'=>$company_id,
                'customer_name' => (isset($customerdata['customer_name'])?$customerdata['customer_name'] : ''),
                'customer_last_name' => isset($customerdata['customer_last_name'])?$customerdata['customer_last_name'] : '',
                'customer_gender' => (isset($customerdata['gender'])?$customerdata['gender'] : NULL),
                'customer_mobile_dial_code' => (isset($customerdata['customer_mobile_dial_code'])?$customerdata['customer_mobile_dial_code'] : ''),
                'customer_mobile' => (isset($customerdata['customer_mobile']) && $customerdata['customer_mobile'] != '' ?$customerdata['customer_mobile'] : NULL),
                'customer_email' => (isset($customerdata['customer_email']) && $customerdata['customer_email'] != '' ?$customerdata['customer_email'] : NULL),
                'customer_date_of_birth' => (isset($customerdata['customer_date_of_birth'])?$customerdata['customer_date_of_birth'] : ''),
                'outstanding_duedays' => (isset($customerdata['outstanding_duedays'])?$customerdata['outstanding_duedays'] : NULL),
                'customer_source_id' => (isset($customerdata['source']) && $customerdata['source'] != '' ?$customerdata['source'] : null),
                'note' => (isset($customerdata['customer_note'])?$customerdata['customer_note'] : NULL),
                'referral_id' => (isset($customerdata['referral_id'])?$customerdata['referral_id'] : NULL),
                'reference_by' => (isset($customerdata['reference_by']) && $customerdata['reference_by'] != ''?$customerdata['reference_by'] : NULL),
                'is_active' => "1"
            ]
        );
        $customer_id = $customer->customer_id;
      // $customer_address_detail_id = $customerdata['customer_address_detail_id'];


 if($customerdata['customer_id'] != ''){
         customer_address_detail::select('*')

                           ->where('customer_id', $customer_id)
                            ->update(array(
                            'deleted_by' => Auth::User()->user_id,
                            'deleted_at' => date('Y-m-d H:i:s')
            ));
                        }

        if($customerdata['customer_gstin'] != '' || $customerdata['customer_address'] != '' || $customerdata['customer_area'] || $customerdata['customer_city'] != '' || $customerdata['customer_pincode'] != '' || $customerdata['state_id'] != ''  ||$customerdata['country_id'] != '' )
        {
             $customer_address_detail_id = isset($customerdata['main_customer_address_detail_id']) ? $customerdata['main_customer_address_detail_id'] : '';
           
             $customer_address = customer_address_detail::updateOrCreate(
                ['customer_id' => $customer_id,
                 'customer_address_detail_id' => $customer_address_detail_id,
                 'company_id'=>$company_id,],
                [
                    'created_by' =>$created_by,
                    'company_id'=>$company_id,
                    'customer_id'=>$customer_id,
                    'customer_gstin' => (isset($customerdata['customer_gstin'])?$customerdata['customer_gstin'] : ''),
                    'customer_address_type' => 1,
                    'customer_address' => (isset($customerdata['customer_address'])?$customerdata['customer_address'] : ''),
                    'customer_area' => (isset($customerdata['customer_area'])?$customerdata['customer_area'] : ''),
                    'customer_city' => (isset($customerdata['customer_city'])?$customerdata['customer_city'] : ''),
                    'customer_pincode' => (isset($customerdata['customer_pincode'])?$customerdata['customer_pincode'] : ''),
                    'state_id' => (isset($customerdata['state_id']) && $customerdata['state_id'] != 0 && $customerdata['state_id'] != ''?$customerdata['state_id'] : NULL),
                    'country_id' => (isset($customerdata['country_id']) && $customerdata['country_id'] != ''?$customerdata['country_id'] : NULL),
                    'is_active' => "1",
                    'deleted_at' => NULL,
                     'deleted_by' => NULL,
                ]
            );
        }

    if(isset($customerdata['customer_multi_address'])){


    $address_data = json_decode($customerdata['customer_multi_address'],true);

    if(isset($address_data))
    {

        foreach ($address_data AS $key => $value) {

                $customer_address_detail_id = isset($value['customer_office_address_detail_id']) ? $value['customer_office_address_detail_id'] : '';

                $customer_address_insert = customer_address_detail::updateOrCreate(
                    [
                        'customer_address_detail_id' => $customer_address_detail_id,
                        'customer_id' => $customer_id,   
                    ],
                    [
                     'company_id'=>$company_id,
                     'created_by' =>$created_by,
                     'customer_id' => $customer_id,
                     'customer_address_type' => 3, //for multi address
                     'customer_address' => (isset($value['customer_office_address'])?$value['customer_office_address'] : ''),
                     'customer_area' => (isset($value['customer_office_area'])?$value['customer_office_area'] : ''),
                     'customer_city' => (isset($value['customer_office_city'])?$value['customer_office_city'] : ''),
                     'customer_pincode' => (isset($value['customer_office_pincode'])?$value['customer_office_pincode'] : ''),
                     'state_id' => (isset($value['customer_office_state_id']) && $value['customer_office_state_id'] != 0?$value['customer_office_state_id'] : NULL),
                     'country_id' => (isset($value['customer_office_country_id']) && $value['customer_office_country_id'] != ''?$value['customer_office_country_id'] : NULL),
                     'is_active' => "1",
                     'deleted_at' => NULL,
                     'deleted_by' => NULL,
                    ]
                ); 
            }
        }

   }

         $checkref   =  0;
            $customer_percent  =   0;

             $checkrefmodule    =   referral_point::select('*')
                                 ->where('deleted_at','=',NULL)
                                 ->get();

          $ref_pointsmaster = '';

          if(sizeof($checkrefmodule)!=0)
          {

            $checkref   =  1;
 /////////////////////////////Query to Check whether there is any bills exists for this customer//////////////////////////////////////


                $cuspurchase        =   sales_bill::where('company_id',$company_id)
                                              ->where('customer_id',$customer_id)
                                              //->where('sales_bill_id','<',$billid)
                                              ->get();
///////////////////////////////Check There is any reference By customer for this customer/////////////////////////////////////////////

                $refcustomer        =   customer::select('*')
                                            ->where('company_id',$company_id)
                                            ->where('customer_id',$customer_id)
                                            ->first();

                  



//////////////////////////////Code will work only if reference Customer is available/////////////////////////////////////////////////

                 if($refcustomer['reference_by']!='' && $refcustomer['reference_by']!=NULL)
                 {
 ////////////////////If already had bills then make referral points as per subsequent purchase otherwise as per first purchase///////
                      if(sizeof($cuspurchase)!=0)
                      {
                           $ref_points = referral_point::select('*')
                          ->where('referral_point_id','=',2)
                          //->where('company_id',Auth::user()->company_id)
                          ->first();
                      }
                      else
                      {
                           $ref_points = referral_point::select('*')
                          ->where('referral_point_id','=',1)
                          //->where('company_id',Auth::user()->company_id)
                          ->first();
                      }

                      $ref_pointsmaster  =   $ref_points;
               }

          }



            DB::commit();
        }catch (\Illuminate\Database\QueryException $e)
        {
            DB::rollback();
            return json_encode(array("Success"=>"False","Message"=>$e->getMessage()));
        }


        if($customer)
        {
            if ($customerdata['customer_id'] != '')
            {
                return json_encode(array("Success"=>"True","Message"=>"Customer has been successfully updated.","customer_id"=>$customer_id,"customer_firstname"=>$customerdata['customer_name'],"customer_lastname"=>$customerdata['customer_last_name'],"customer_mobile"=>$customerdata['customer_mobile'],"CheckRef"=>$checkref,"ReferralMaster"=>$ref_pointsmaster));
            }
            else
            {
                return json_encode(array("Success"=>"True","Message"=>"Customer has been successfully added.","customer_id"=>$customer_id,"customer_firstname"=>$customerdata['customer_name'],"customer_lastname"=>$customerdata['customer_last_name'],"customer_mobile"=>$customerdata['customer_mobile'],"CheckRef"=>$checkref,"ReferralMaster"=>$ref_pointsmaster));
            }
        }
        else
        {
            return json_encode(array("Success"=>"False","Message"=>"Something Went Wrong"));
        }
  }

  public function countries(Request $request)
  {
      $data = $request->all();

      if(!isset($data) || !isset($data['company_id']) || $data['company_id'] == '')
      {
          return json_encode(array("Success"=>"False","Message"=>"Missing Body Data"));
      }
      
      $country_id  =  company_profile::select('country_id')->where('company_id',$data['company_id'])->first();
    
      $defaultcountry_id = $country_id['country_id'];
      
      
      $country = country::select('country_id','country_name','country_code')->get();
      return json_encode(array("Success"=>"True","Countries"=>$country,"default_country_id"=>$defaultcountry_id));
  }

  public function states(Request $request)
  {
      $state = state::select('state_id','state_name','state_code','state_short_code')->get();
      return json_encode(array("Success"=>"True","States"=>$state));
  }

  public function customer_sources(Request $request)
  {
      $data = $request->all();
      $company_id   = $data['company_id'];
      $customer_source = customer_source::select('customer_source_id','company_id','source_name','note')
                        ->where('deleted_at','=',NULL)->where('is_active',1)->where('company_id',$company_id)
                        ->orderBy('customer_source_id','DESC')->get();

      return json_encode(array("Customer Source"=>$customer_source));
  }
  
  public function search_customer(Request $request)
  {
      $data = $request->all();
      
      if(!isset($data) || !isset($data['company_id']) || $data['company_id'] == '')
      {
          return json_encode(array("Success"=>"False","Message"=>"Missing Body Data"));
      }
      
      $company_id   = $data['company_id'];
      $keyword   = $data['keyword'];
      
      $customer = customer::select('customer_id','company_id','customer_name','customer_last_name','customer_gender','customer_mobile_dial_code','customer_mobile','customer_email')
      ->where('company_id', $company_id)
      ->where('deleted_at','=',NULL);
      
      if(isset($keyword))
      {
          $customer->where('customer_name', 'like', '%'.$keyword.'%');
          $customer->orWhere('customer_last_name', 'like', '%'.$keyword.'%');
          $customer->orWhere('customer_mobile', 'like', '%'.$keyword.'%');
      }
      
      $customer     =   $customer->with('customer_multi_address_detail')
      ->with('customer_source')
      ->orderBy('customer_id', 'DESC')->get();
      
      return json_encode(array("Success"=>"True","Customers"=>$customer));
      
  }
  
  public function search_product(Request $request)
  {
      $data = $request->all();
      $company_id   = $data['company_id'];
      $keyword   = $data['keyword']; 
      
      if(!isset($data) || !isset($data['company_id']) || $data['company_id'] == '')
      {
          return json_encode(array("Success"=>"False","Message"=>"Missing Body Data"));
      }

      $product = product::select('product_id','product_name','cost_rate','cost_price','selling_price','offer_price','product_mrp','wholesale_price','cost_gst_percent','cost_gst_amount','extra_charge','profit_percent','profit_amount','sell_gst_percent','sell_gst_amount','product_system_barcode','supplier_barcode','sku_code','product_code','product_description','hsn_sac_code')
      ->where('deleted_at','=',NULL);
      
      if(isset($keyword))
      {
          $product->where('product_name', 'like', '%'.$keyword.'%');
          $product->orWhere('product_system_barcode', 'like', '%'.$keyword.'%');
          $product->orWhere('supplier_barcode', 'like', '%'.$keyword.'%');
          $product->orWhere('sku_code', 'like', '%'.$keyword.'%');
          $product->orWhere('product_code', 'like', '%'.$keyword.'%');
      }
      
      $product =    $product->orderBy('product_id', 'DESC')
      ->whereIn('item_type',array(1,3))
      ->with(array('product_images' =>function($query){
          $query->select('product_image_id','product_id','caption','product_image');
      }))
      ->with('product_features_relationship')
      ->with(array('product_price_master'=>function($query){
          $query->select('price_master_id','product_id','product_qty','product_mrp','offer_price','b2b','wholesaler_price','sell_price','selling_gst_percent','selling_gst_amount');
          $query->where('product_qty','>',0);
      }))
      ->whereHas('product_price_master',function ($q) use($data)
      {
          $q->where('company_id',$data['company_id']);
      })
      /**/
      ->get();

      $product_features =  ProductFeatures::getproduct_feature('');
      
      $image_path   =   'https://ainnovation.in/omni/'.PRODUCT_IMAGE_URL;

      foreach ($product AS $key=>$value)
      {
          if(isset($value['product_features_relationship']) && $value['product_features_relationship'] != '')
          {
              $dynamic = array();
              foreach ($product_features AS $kk => $vv)
              {
                  $html_id = $vv['html_id'];
                  if($value['product_features_relationship'][$html_id] != '' && $value['product_features_relationship'][$html_id] != NULL)
                  {
                      $nm =  product::feature_value($vv['product_features_id'],$value['product_features_relationship'][$html_id]);
                     //$product[$key][$html_id] =$nm;
                      $dynamic[$html_id] = $nm;
                  }
              }
              $product[$key]['product_features'] = $dynamic;

              unset($product[$key]['product_features_relationship']);
          }
      }
      return json_encode(array("Success"=>"True","Products"=>$product,"image_path"=>$image_path));
      
  }
  
  
  
  public function save_customer_bill(Request $request)
  {

            $data = $request->all();
            // echo '<pre>';print_r($data); exit;

                if(!isset($data['Order Details']) || $data['Order Details']['Order ID/PO NO'] == '')
                {
                    return json_encode(array("Success"=>"False","Message"=>"Order ID/PO NO is mandatory field"));
                }
                else
                {
                    if (sales_bill::where('order_no', $data['Order Details']['Order ID/PO NO'])->exists())
                    {

                        $error = 1;
                        return json_encode(array("Success" => "False", "Message" => "Order ID/PO NO " . $data['Order Details']['Order ID/PO NO'] . " already exists!"));
                        exit;
                    }
                }
                if(!isset($data['Order Details']['Date']) || $data['Order Details']['Date'] == '' || !is_numeric($data['Order Details']['Date']))
                {
                    return json_encode(array("Success"=>"False","Message"=>"Date is mandatory field"));
                }
                if(!isset($data['Order Details']['Month']) || $data['Order Details']['Month'] == '' || !is_numeric($data['Order Details']['Month']))
                {
                    return json_encode(array("Success"=>"False","Message"=>"Month is mandatory field"));
                }
                if(!isset($data['Order Details']['Year']) || $data['Order Details']['Year'] == '' || !is_numeric($data['Order Details']['Year']))
                {
                    return json_encode(array("Success"=>"False","Message"=>"Year is mandatory field"));
                }
                if(!isset($data['Order Details']['Company ID']) || $data['Order Details']['Company ID'] == '')
                {
                    return json_encode(array("Success"=>"False","Message"=>"Company ID is mandatory field"));
                } 
                else
                {

                    if (!company::where('company_id', $data['Order Details']['Company ID'])->exists())
                    {

                        $error = 1;
                        return json_encode(array("Success" => "False", "Message" => "Company ID " . $data['Order Details']['Company ID'] . " Not Found!"));
                        exit;
                    }
                } 

                if(!isset($data['Order Details']['Total Qty']) || $data['Order Details']['Total Qty'] == '' || !is_numeric($data['Order Details']['Total Qty']))
                {
                    return json_encode(array("Success"=>"False","Message"=>"Order Qty is mandatory field"));
                }
                if(!isset($data['Order Details']['Total Price']) || $data['Order Details']['Total Price'] == '' || !is_numeric($data['Order Details']['Total Price']))
                {
                    return json_encode(array("Success"=>"False","Message"=>"Price is mandatory field"));
                }

                // if ($data['Order Details']['State'] != '')
                // {
                //     if (!state::where('state_name', $data['Order Details']['State'])->exists())
                //     {
                //         $error = 1;
                //         return json_encode(array("Success" => "False", "Message" => "State Name " . $data['Order Details']['State'] . " Not Found!"));
                //         exit;
                //     }
                // }
                


                if(isset($data['Order Details']['Order Product Details']))
                {
                         foreach($data['Order Details']['Order Product Details'] as $orderkey=>$ordervalue)
                         {
                                if(!isset($ordervalue['Barcode']) || $ordervalue['Barcode'] == '')
                                {
                                    return json_encode(array("Success"=>"False","Message"=>"Barcode is mandatory field"));
                                }
                                else
                                {
                                    if (!product::where('product_system_barcode', $ordervalue['Barcode'])->orWhere('supplier_barcode',$ordervalue['Barcode'])->exists())
                                    {

                                        $error = 1;
                                        return json_encode(array("Success" => "False", "Message" => "Product of Barcode No." . $ordervalue['Barcode'] . " Does not exist in Software !"));
                                        exit;
                                    }
                                }
                                // if(!isset($ordervalue['MRP']) || $ordervalue['MRP'] == '' || !is_numeric($ordervalue['MRP']))
                                // {
                                //     return json_encode(array("Success"=>"False","Message"=>"MRP is mandatory field or should be numeric"));
                                // }
                                // if(!isset($ordervalue['Selling Price']) || $ordervalue['Selling Price'] == '' || !is_numeric($ordervalue['Selling Price']))
                                // {
                                //     return json_encode(array("Success"=>"False","Message"=>"Selling Price is mandatory field or should be numeric"));
                                // }
                                if(!isset($ordervalue['Order Qty']) || $ordervalue['Order Qty'] == '' || !is_numeric($ordervalue['Order Qty']))
                                {
                                    return json_encode(array("Success"=>"False","Message"=>"Order Qty is mandatory field or should be numeric"));
                                }
                                if(!isset($ordervalue['Total Price']) || $ordervalue['Total Price'] == '' || !is_numeric($ordervalue['Total Price']))
                                {
                                    return json_encode(array("Success"=>"False","Message"=>"Total Price is mandatory field or should be numeric"));
                                }
                         }

                }
                if(isset($data['Order Details']['Order Payment Details']))
                {
                         foreach($data['Order Details']['Order Payment Details'] as $ppaykey=>$ppayvalue)
                         {

                                if(!isset($ppayvalue['Payment_method_id']) || $ppayvalue['Payment_method_id'] == '' || !is_numeric($ppayvalue['Payment_method_id']))
                                {
                                    return json_encode(array("Success"=>"False","Message"=>"Payment_method_id is mandatory field"));
                                }
                                else
                                {
                                    if (!payment_method::where('payment_method_id', $ppayvalue['Payment_method_id'])->exists())
                                    {

                                        $error = 1;
                                        return json_encode(array("Success" => "False", "Message" => "Payment method id." . $ppayvalue['Payment_method_id'] . " Does not exist in Software !"));
                                        exit;
                                    }
                                }
                                
                         }
              }


                $company_data = company_profile::where('company_id',$data['Order Details']['Company ID'])
                 ->select('bill_excel_column_check','bill_calculation','bill_number_prefix')->first();
                 $company_id = $data['Order Details']['Company ID'];

                 $userdata   =  user::select('user_id')
                                    ->where('company_id',$data['Order Details']['Company ID'])
                                    ->where('is_master',1)
                                    ->where('deleted_by',NULL)
                                    ->first();

                 $userId = $userdata['user_id'];

                 $created_by = $userId;

                

                 $state_id = company_profile::select('state_id')
                  ->where('company_id',$data['Order Details']['Company ID'])->first();



                 if(strlen($data['Order Details']['Date']) == 1)
                 {
                      $day     =   '0'.$data['Order Details']['Date'];
                 }
                 else
                 {
                      $day      =    $data['Order Details']['Date']; 
                 }
                 if(strlen($data['Order Details']['Month']) == 1)
                 {
                      $month     =   '0'.$data['Order Details']['Month'];
                 }
                 else
                 {
                      $month      =    $data['Order Details']['Month']; 
                 }
     
               
                 $year  = $data['Order Details']['Year'];
         
                 $invoiceddate  =  $day.'-'.$month.'-'.$year;
              

             try {
            DB::beginTransaction();        
                    

                

                 // $stateid = state::select('state_id')
                 //           ->where('state_name',$data['Order Details']['State'])
                 //           ->first();

                 $companyprofile = company_profile::select('state_id')
                 ->where('company_id',$data['Order Details']['Company ID'])
                 ->first();
                 $state_id  =  $companyprofile['state_id'];

                 $customer_id  =  $data['Order Details']['Customer ID'];

                 if($customer_id != '')
                 {
                     $stateid = customer_address_detail::select('state_id')
                           ->where('customer_id',$data['Order Details']['Customer ID'])
                           ->first();
                           

                     if($stateid !='')
                     {
                        if($stateid['state_id'] != NULL)
                        {
                            $state_id  =  $stateid['state_id'];
                        }
                        else
                        {
                            $state_id  =  $companyprofile['state_id'];
                        }
                        
                     }   
                     else
                     {
                     
                       $state_id  =  $companyprofile['state_id'];
                     }   

                     
                 }

                 $reference   = reference::select('reference_id')
                 ->where('reference_name',$data['Order Details']['Reference'])->first();

                if($data['Order Details']['Reference']!='')
                {                
                  if($reference=='')
                  {
                      // INSERT 
                    $reference_insert = reference::updateOrCreate(
                      ['reference_id' => '', 'company_id' => $data['Order Details']['Company ID'],],
                      [
                          'created_by' => $created_by,
                          'company_id' => $company_id,
                          'reference_name' => (isset($data['Order Details']['Reference']) ? $data['Order Details']['Reference'] : ''),
                          'is_active' => "1"
                      ]
                    );

                    // $reference   = reference::select()->get();

                    $reference_id = $reference_insert->reference_id;
                    // echo '<pre>'; print_r($reference);
                    // exit;
                  }
                  else
                  {
                    $reference_id   = $reference->reference_id;
                  }
                }
                else
                {
                  $reference_id   = NULL;
                }
                
                // $customer_id  =  $data['Order Details']['Customer ID'];


                          // if($data['Order Details']['Customer Name']!='' || $data['Order Details']['CONTACT NO']!='')
                          // {
                          //         $showcustomer_id = customer::select('customer_id')
                          //                                     // ->where('customer_name',$data['Order Details']['Customer Name'])
                          //                                     ->where('customer_mobile',$data['Order Details']['CONTACT NO'])
                          //                                     ->where('company_id',$data['Order Details']['Company ID'])->first(); 

                                           
                          //         if($showcustomer_id!='')
                          //         {
                                    
                          //             $customer_id = $showcustomer_id->customer_id;
                          //         } 
                          //         else
                          //         {
                                      
                          //               $dial_code = '';
                          //                     if($data['Order Details']['CONTACT NO'] != '')
                          //                     {
                                                  
                          //                             $dial_code = company_profile::select('company_mobile_dial_code')
                          //                                 ->where('company_id',$data['Order Details']['Company ID'])->first();

                          //                             $code = explode(',',$dial_code['company_mobile_dial_code']);


                          //                             $dial_code = $code[0];
                                                 
                          //                     } 

                          //                   $customer = customer::updateOrCreate(
                          //                     ['customer_id' => '', 'company_id' => $data['Order Details']['Company ID'],],
                          //                     [
                          //                         'created_by' => $created_by,
                          //                         'company_id' => $company_id,
                          //                         'customer_name' => (isset($data['Order Details']['Customer Name']) ? $data['Order Details']['Customer Name'] : ''),
                          //                         'customer_mobile_dial_code' => (isset($dial_code) ? $dial_code : ''),
                          //                         'customer_mobile' => (isset($data['Order Details']['CONTACT NO']) && $data['Order Details']['CONTACT NO'] != '' ? $data['Order Details']['CONTACT NO'] : NULL),
                          //                         'customer_email' => NULL,
                          //                         'is_active' => "1"
                          //                     ]
                          //                  );

                          //                  $customer_id = $customer->customer_id;
                          //                  $customer_address = customer_address_detail::updateOrCreate(
                          //                 ['customer_id' => $customer_id,
                          //                  'company_id'=>$company_id,],
                          //                 [
                          //                     'created_by' =>$created_by,
                          //                     'customer_gstin' => (isset($data['Order Details']['GST NO'])?$data['Order Details']['GST NO'] : ''),
                          //                     'customer_address_type' => '1',
                          //                     'customer_address' => '',
                          //                     'customer_area' => '',
                          //                     'customer_city' => (isset($data['Order Details']['City '])?$data['Order Details']['City '] : ''),
                          //                     'customer_pincode' =>'',
                          //                     'state_id' => (isset($data['Order Details']['State']) && $data['Order Details']['State'] != ''?$stateid['state_id'] : $companyprofile['state_id']),
                          //                     'country_id' => 102,
                          //                     'is_active' => "1"
                          //                  ]
                          //                );
                          //         } 
                          //   }                          

                      
                    $invoice_no    = '';
                    // $state_id  =  $data['Order Details']['State'] != ''?$stateid['state_id'] : ;
                    
                     $sales = sales_bill::updateOrCreate(
                    ['sales_bill_id' => '', 'company_id'=>$company_id,],
                    ['customer_id'=>$customer_id,
                        'bill_no'=>$invoice_no,
                        'order_no'=>$data['Order Details']['Order ID/PO NO'],
                        'bill_date'=>$invoiceddate,
                        'state_id'=>$state_id,
                        'reference_id'=>$reference_id,
                        'total_qty'=>$data['Order Details']['Total Qty'],
                        'sellingprice_before_discount'=>0,
                        'discount_percent'=>0,
                        'discount_amount'=>0,
                        'productwise_discounttotal'=>0,
                        'sellingprice_after_discount'=>0,
                        'totalbillamount_before_discount'=>0,
                        'total_igst_amount'=>0,
                        'total_cgst_amount'=>0,
                        'total_sgst_amount'=>0,
                        'gross_total'=>0,
                        'shipping_charges'=>0,
                        'total_bill_amount'=>0,
                        'created_by' =>$created_by,
                        'is_active' => "1"
                    ]
                );

                   $sales_bill_id = $sales->sales_bill_id;

                    $f1     =    (date('m')<'04') ? date('y',strtotime('-1 year')) : date('y');
                    $f2     =    (date('m')>'03') ? date('y',strtotime('+1 year')) : date('y');


                      $newseries  =  sales_bill::select('bill_series')
                                    ->where('sales_bill_id','<',$sales_bill_id)
                                    ->where('company_id',$data['Order Details']['Company ID'])
                                    ->orderBy('sales_bill_id','DESC')
                                    ->take('1')
                                    ->first();    

                      $billseries   = $newseries['bill_series']+1;

                      $finalinvoiceno   =  $company_data['bill_number_prefix'].$billseries.'/'.$f1.'-'.$f2; 
                   
                    

                     sales_bill::where('sales_bill_id',$sales_bill_id)->update(array(
                        'bill_no' => $finalinvoiceno,
                        'bill_series' => $billseries
                     ));

                      $sellingprice_before_discount    =     0;
                      $totalbillamount_before_discount =     0;
                      $discount_percent                =     0;
                      $discount_amount                 =     0;
                      $productwise_discounttotal       =     0;
                      $sellingprice_after_discount     =     0;
                      $clubdiscount_percent            =     0;
                      $total_igst_amount               =     0;
                      $total_cgst_amount               =     0;
                      $total_sgst_amount               =     0;
                      $gross_total                     =     0;
                      $total_bill_amount               =     0;


                    foreach($data['Order Details']['Order Product Details'] as $orderkey=>$ordervalue)
                    {

                        $productid = product::select('product_id','product_system_barcode')
                                          ->whereIn('item_type',array(1,3,4));

                         $productid->where('product_system_barcode',$ordervalue['Barcode']);
                         $productid->orWhere('supplier_barcode',$ordervalue['Barcode']);
                               

                         $productid   =   $productid->with('product_price_master')
                                      ->whereHas('product_price_master',function ($q) use($company_id){
                                              $q->where('company_id',$company_id);
                                       })->first();


                     if($productid !='')
                     {  



                        $productdetail     =    array();
                        
                        if($ordervalue['price_master_id']!='')
                        {
                            $priceid  = price_master::select('price_master_id','selling_gst_percent')
                                     ->where('price_master_id',$ordervalue['price_master_id'])
                                     ->where('company_id',$data['Order Details']['Company ID'])
                                     ->orderBy('price_master_id','ASC')
                                     ->first();
                             $pricemasterid   =    $ordervalue['price_master_id']; 
                        }
                        else
                        {
                            $priceid  = price_master::select('price_master_id','selling_gst_percent')
                                     ->where('product_id',$productid['product_id'])
                                     ->where('company_id',$data['Order Details']['Company ID'])
                                     ->where('product_qty','>',0)
                                     ->orderBy('price_master_id','ASC')
                                     ->first(); 
                                     
                            $pricemasterid   =    $priceid['price_master_id']; 
                        }

                         
                                      
                            $gst_percent                    =     $ordervalue['GST_percent'];

                            $sellingwgst                    =     $ordervalue['Selling Price'] * $ordervalue['Order Qty'];
                                               
                            $mrpgstamount                   =     ($ordervalue['Selling Price'] * $ordervalue['GST_percent'] / 100) * $ordervalue['Order Qty'];
                            $mrpgst                         =     $sellingwgst  +   $mrpgstamount;

                            $discount_percent               =     $data['Order Details']['Discount Percent']!=''?$data['Order Details']['Discount Percent']:0;     
                            $proddiscount_percent           =     $ordervalue['Discount Percent']!=''?$ordervalue['Discount Percent']:0;    
                            $qty                            =     $ordervalue['Order Qty'];

                            $proddiscountselling            =     ($sellingwgst * $proddiscount_percent) / 100;
                            $proddiscountmrp                =     ($mrpgst * $proddiscount_percent) / 100;
                    
                            $totalsellingwgst               =     $sellingwgst - $proddiscountselling;
                                               
                            $totalmrpgst                    =     $mrpgst  - $proddiscountmrp;

                            // $sellingdiscount                =     ($totalsellingwgst * $discount_percent) / 100;

                                 
                            $prodmrpdiscountamt             =     (($totalmrpgst * $discount_percent) / 100);
                            $proddiscountamt                =     (($totalsellingwgst * $discount_percent) / 100);
                            $totalproddiscountamt           =     $proddiscountamt;

                            $sellingafterdiscount           =     $totalsellingwgst - $proddiscountamt;
                            $gst_amount                     =     (($sellingafterdiscount * $gst_percent) / 100);

                            $halfgstamount                  =     $gst_amount/2;
                            $halfgstper                     =     $ordervalue['GST_percent']/2;
                            $sgstamount                     =     (($sellingafterdiscount * $gst_percent) / 100);
                            $total_amount                   =     $sellingafterdiscount +$gst_amount;   
                                 

                              $productdetail['product_id']                           =    $productid['product_id'];
                              $productdetail['price_master_id']                      =    $pricemasterid;
                              $productdetail['qty']                                  =    $ordervalue['Order Qty'];
                              $productdetail['mrp']                                  =    $ordervalue['MRP'];
                              $productdetail['sellingprice_before_discount']         =    $ordervalue['Selling Price'];
                              $productdetail['discount_percent']                     =    $ordervalue['Discount Percent'];
                              $productdetail['discount_amount']                      =    $proddiscountselling;
                              $productdetail['mrpdiscount_amount']                   =    $proddiscountmrp;
                              $productdetail['sellingprice_after_discount']          =    $totalsellingwgst;
                              $productdetail['overalldiscount_percent']              =    $discount_percent;
                              $productdetail['overalldiscount_amount']               =    $proddiscountamt;
                              $productdetail['overallmrpdiscount_amount']            =    $prodmrpdiscountamt;
                              $productdetail['sellingprice_afteroverall_discount']   =    $sellingafterdiscount;
                              $productdetail['cgst_percent']                         =    $halfgstper;
                              $productdetail['cgst_amount']                          =    $halfgstamount;
                              $productdetail['sgst_percent']                         =    $halfgstper;
                              $productdetail['sgst_amount']                          =    $halfgstamount;
                              $productdetail['igst_percent']                         =    $gst_percent;
                              $productdetail['igst_amount']                          =    $gst_amount;
                              $productdetail['total_amount']                         =    $total_amount;
                              $productdetail['product_type']                         =     1;
                              $productdetail['created_by']                           =     $userId;

                                  price_master::where('price_master_id',$pricemasterid)->update(array(
                                  'modified_by' => $userId,
                                  'updated_at' => date('Y-m-d H:i:s'),
                                  'product_qty' => DB::raw('product_qty - '.$ordervalue['Order Qty'])
                                  ));   

                               ///FIFO logic

                               $ccount    =   0;  
                               $icount    =   0;
                               $pcount    =   0;
                               $done      =   0;
                               $firstout  =   0;
                               $restqty   =   $ordervalue['Order Qty']; 
                               $inwardids    =  '';
                               $inwardqtys   =  '';           

                          if($ordervalue['Order Qty']>0)
                          {
                             

                               $qquery    =         inward_product_detail::select('inward_product_detail_id','pending_return_qty')
                                                    ->where('product_id',$productid['product_id'])
                                                    ->where('company_id',$data['Order Details']['Company ID'])
                                                    ->where('pending_return_qty','!=',0);

                              $inwarddetail  =  $qquery->where('deleted_at','=',NULL)->orderBy('inward_product_detail_id','ASC')->get();

                               if(sizeof($inwarddetail)==0)
                                {
                                  
                                          
                                          // return json_encode(array("Success"=>"False","Message"=>"Bill Cannot be saved as there is no Entry Found in Inward Product Details for ".$uniquelabel." ".$uniqueno." "));
                                          // exit;
                                     
                                }

                         
                                          
                               foreach($inwarddetail as $inwarddata)
                               {
                                  //echo $inwarddata['pending_return_qty'];
                                    if($inwarddata['pending_return_qty'] >= $restqty && $firstout==0)
                                    {  
                                          if($done == 0)
                                          {

                                            //echo 'hello';

                                                  $inwardids    .=   $inwarddata['inward_product_detail_id'].',';
                                                  $inwardqtys   .=   $restqty.',';
                                              
                                                  inward_product_detail::where('company_id',$data['Order Details']['Company ID'])
                                                  ->where('inward_product_detail_id',$inwarddata['inward_product_detail_id'])
                                                  ->update(array(
                                                      'modified_by' => $userId,
                                                      'updated_at' => date('Y-m-d H:i:s'),
                                                      'pending_return_qty' => DB::raw('pending_return_qty - '.$ordervalue['Order Qty'])
                                                      ));
                                                  $pcount++;
                                                  $done++;
                                         }
                                    }
                                   else
                                   {
                                      if($pcount==0 && $done == 0 && $icount==0)
                                      {
                                          
                                         
                                          if($restqty  > $inwarddata['pending_return_qty'])
                                          {
                                            //echo 'bbb';
                                            //echo $restqty;
                                              $inwardids    .=   $inwarddata['inward_product_detail_id'].',';
                                              $inwardqtys   .=   $inwarddata['pending_return_qty'].',';
                                              $ccount       =   $restqty  - $inwarddata['pending_return_qty'];
                                              inward_product_detail::where('company_id',$data['Order Details']['Company ID'])
                                              ->where('inward_product_detail_id',$inwarddata['inward_product_detail_id'])
                                              ->update(array(
                                                  'modified_by' => $userId,
                                                  'updated_at' => date('Y-m-d H:i:s'),
                                                  'pending_return_qty' => DB::raw('pending_return_qty - '.$inwarddata['pending_return_qty'])
                                                  ));
                                          }
                                          else
                                          {
                                            //echo 'ccc';
                                            //echo $restqty;
                                              $inwardids    .=   $inwarddata['inward_product_detail_id'].',';
                                              $inwardqtys   .=   $restqty.',';
                                              $ccount   =   $restqty  - $inwarddata['pending_return_qty'];
                                              inward_product_detail::where('company_id',$data['Order Details']['Company ID'])
                                              ->where('inward_product_detail_id',$inwarddata['inward_product_detail_id'])
                                              ->update(array(
                                                  'modified_by' => $userId,
                                                  'updated_at' => date('Y-m-d H:i:s'),
                                                  'pending_return_qty' => DB::raw('pending_return_qty - '.$restqty)
                                                  ));
                                          }


                                           if($ccount > 0)
                                            {
                                               $firstout++;
                                               // echo $pcount;
                                               // echo $done;
                                               // echo $icount;
                                               $restqty   =   $restqty  - $inwarddata['pending_return_qty'];
                                              // echo $restqty;

                                               
                                            }
                                            if($ccount <= 0)
                                            {
                                              //echo 'no';
                                              $firstout++;
                                               $icount++;
                                                 
                                            }
                                           
                                      }
                                   }

                               }    
                           }        

                        
                        if($inwardids!='')
                        {
                          $productdetail['inwardids']                          =    $inwardids;
                          $productdetail['inwardqtys']                         =    $inwardqtys;
                        }   
                        else
                        {  
                          $productdetail['inwardids']                          =    NULL;
                          $productdetail['inwardqtys']                         =    NULL;
                         }


                     
                          $billproductdetail = sales_product_detail::updateOrCreate(
                           ['sales_bill_id' => $sales_bill_id,
                            'company_id'=>$company_id,'sales_products_detail_id'=>'',],
                           $productdetail); 


                          $sellingprice_before_discount    +=     $totalsellingwgst;
                          $totalbillamount_before_discount +=     $totalmrpgst;
                          $discount_percent                =      $data['Order Details']['Discount Percent'];
                          $discount_amount                 +=     $prodmrpdiscountamt;
                          $productwise_discounttotal       +=     $proddiscountamt;
                          $sellingprice_after_discount     +=     $sellingafterdiscount;
                          $clubdiscount_percent            =      $data['Order Details']['Discount Percent'];
                          $total_igst_amount               +=     $gst_amount;
                          $total_cgst_amount               +=     $halfgstamount;
                          $total_sgst_amount               +=     $halfgstamount;
                          $gross_total                     +=     $total_amount;
                        

                }
            }


               $sales =  sales_bill::where('sales_bill_id',$sales_bill_id)->update(array(
                              'modified_by' => $userId,
                              'updated_at' => date('Y-m-d H:i:s'),
                              'total_qty' => $data['Order Details']['Total Qty'],
                              'sellingprice_before_discount' => $sellingprice_before_discount,
                              'totalbillamount_before_discount'=>$totalbillamount_before_discount,
                              'discount_percent'=>$discount_percent,
                              'discount_amount'=>$discount_amount,
                              'productwise_discounttotal' => $productwise_discounttotal,
                              'sellingprice_after_discount' => $sellingprice_after_discount,
                              'total_igst_amount'=>$total_igst_amount,
                              'total_cgst_amount' => $total_cgst_amount,
                              'total_sgst_amount' => $total_sgst_amount,
                              'gross_total' => $gross_total,
                              'shipping_charges'=>0,
                              'total_bill_amount'=>$gross_total,
                              ));   


                     $paymentanswers     =    array();

                     foreach($data['Order Details']['Order Payment Details'] AS $paykey=>$payvalue)
                      {
                         
                            $paymentanswers['sales_bill_id']                 =  $sales_bill_id;
                            $paymentanswers['total_bill_amount']             =  $payvalue['Payment_method_amount'];
                            $paymentanswers['payment_method_id']             =  $payvalue['Payment_method_id'];
                            $paymentanswers['bankname']                      =  $payvalue['Bank Name'];
                            $paymentanswers['chequeno']                      =  $payvalue['Cheque No'];
                            $paymentanswers['created_by']                    =  $userId;
                            $paymentanswers['deleted_at'] =  NULL;
                            $paymentanswers['deleted_by'] =  NULL;
                   
                       $paymentdetail = sales_bill_payment_detail::updateOrCreate(
                           ['sales_bill_id' => $sales_bill_id,'sales_bill_payment_detail_id'=>'',],
                           $paymentanswers);


                        
                      }    


                DB::commit();
      } catch (\Illuminate\Database\QueryException $e)
      {
          DB::rollback();
          return json_encode(array("Success"=>"False","Message"=>$e->getMessage()));
      }

      if($sales)
        {
            
           return json_encode(array("Success"=>"True","Message"=>"Billing has been successfully Saved.","Bill No"=>$finalinvoiceno,"Sales_Bill_ID"=>$sales_bill_id));
           
        }
        else
        {
            return json_encode(array("Success"=>"False","Message"=>"Something Went Wrong"));
        }
  }
  
    public function save_bill_response(Request $request)
    {
        $data       =   $request->all();
        
        $company_id     =   $data['Company_id'];
        $Bill_No        =   $data['Bill_No'];
        $sales_bill_id  =   $data['sales_bill_id'];
        
        $billid  = $sales_bill_id;

        $state = state::all();
        $country = country::all();
        
        $state_id  =  company_profile::select('state_id','tax_type','tax_title','currency_title','bill_calculation')
        ->where('company_id',$company_id)->with('state_name')->get();
        
        $company_state   = $state_id[0]['state_id'];
        $company_statename = $state_id[0]['state_name']['state_name'];
        
    
        $tax_type        = $state_id[0]['tax_type'];
        $tax_title       = $state_id[0]['tax_title'];
        $taxname         = $tax_type==1?$tax_title:'IGST';
        $currtitle       = $state_id[0]['currency_title'];
        $bill_calculation = $state_id[0]['bill_calculation'];

        if($tax_type==1)
        {
                $currency_title  = $currtitle==''||$currtitle==NULL?'INR':$currtitle;
        }
        else
        {
                $currency_title  = 'INR';
        }



       $payment_methods = payment_method::where('is_active','=','1')->get();

        $billingdata = sales_bill::where([
            ['sales_bill_id','=',$billid]])
            ->select('*')
            ->with('reference')
            ->with('sales_bill_payment_detail','sales_bill_payment_detail.payment_method')
            ->with('customer')
            ->with('customer_address_detail')
            ->with('stock_transfer')
            ->with('company')
            ->with('user')
            ->with('state')
            ->withCount([
                    'sales_product_detail as overalldiscount' => function($fquery) {
                        $fquery->select(DB::raw('SUM(discount_amount + overalldiscount_amount )'));
                    }
                ])
            ->first();

            $customer_id  = $billingdata['customer_id'];
            $previouscreditamount  =  customer_creditaccount::where('company_id',$company_id)
                                                    ->where('customer_id',$customer_id)
                                                    ->where('balance_amount','>',0)
                                                    ->where('sales_bill_id','!=',$billingdata['sales_bill_id'])
                                                    ->sum('balance_amount');

            $currentcreditamount  =  customer_creditaccount::where('company_id',$company_id)
                                    ->where('customer_id',$customer_id)
                                    ->where('balance_amount','>',0)
                                    ->where('sales_bill_id','=',$billingdata['sales_bill_id'])
                                    ->sum('balance_amount');

          

             $billingproductdata = sales_product_detail::
             //where('company_id',$company_id)
              where('sales_bill_id','=',$billid)
            ->where('qty','!=',0)
            ->with('product.product_features_relationship')
            ->with('batchprice_master')
            ->get();

           
            $productcount = sales_product_detail::where('company_id',$company_id)
            ->where('sales_bill_id','=',$billid)
            ->count();

             $gstdata = sales_product_detail::select('cgst_percent','sgst_percent','igst_percent',DB::raw("SUM(sales_product_details.sellingprice_afteroverall_discount) as tottaxablevalue"),DB::raw("SUM(sales_product_details.cgst_amount) as totcgstamount"),DB::raw("SUM(sales_product_details.sgst_amount) as totsgstamount"),DB::raw("SUM(sales_product_details.igst_amount) as totigstamount"),DB::raw("SUM(sales_product_details.total_amount) as totgrand"))->where('sales_bill_id','=',$billid)->groupBy('igst_percent')->get();

        $product_features =  ProductFeatures::getproduct_feature('');

        foreach ($billingproductdata AS $key=>$v) {
            if (isset($v['product']['product_features_relationship']) && $v['product']['product_features_relationship'] != '')
            {
                foreach($product_features AS $kk => $vv)
                {
                    $html_id = $vv['html_id'];

                    if ($v['product']['product_features_relationship'][$html_id] != '' && $v['product']['product_features_relationship'][$html_id] != NULL)
                    {
                        $nm = product::feature_value($vv['product_features_id'], $v['product']['product_features_relationship'][$html_id]);
                        $billingproductdata[$key]['product'][$html_id] = $nm;
                    }
                }
            }
        }


        return json_encode(array("Success"=>"True","billingdata"=>$billingdata,"billingproductdata"=>$billingproductdata,"gstdata"=>$gstdata,"company_state_id"=>$company_state,"company_state_name"=>$company_statename));
        
        // return view('printingfiles::sales/print_bill',compact('payment_methods','state','country','billingdata','billingproductdata','productcount','gstdata','tax_type','taxname','currency_title','bill_calculation','customer_id','previouscreditamount','currentcreditamount'));

        
    }
    
  public function customer_outstanding(Request $request)
  {
      $data = $request->all();
      $company_id   = $data['company_id'];
      $customer_id  =  $data['customer_id'];
      
       $customer_outstanding = customer_creditaccount::select("*")
                                          ->where('balance_amount','>',0)
                                          ->with('customer_creditreceipt_detail')
                                          ->withCount([
                                                        'customer_creditreceipt_detail as receiptrecdamt' => function($q) {
                                                            $q->select(DB::raw('SUM(payment_amount)'));  
                                                        }
                                                    ])    
                                          ->with([
                                                'customer' => function($fquery) {
                                                     $fquery->select('customer_id','customer_name','customer_last_name','customer_mobile');  
                                                     }
                                            ])         
                                          ->orderBy('customer_creditaccount_id','DESC')
                                          ->where('customer_id',$customer_id)
                                          ->where('company_id',$company_id)
                                          ->where('deleted_at','=',NULL)
                                          ->get();
                                          
        $customer_totaloutstanding = customer_creditaccount::where('customer_id',$customer_id)
                                          ->where('company_id',$company_id)
                                          ->where('balance_amount','>',0)
                                          ->sum('balance_amount');                                  
          
      return json_encode(array("Success"=>"True","Outstanding_details"=>$customer_outstanding,"Total_Outstanding"=>$customer_totaloutstanding));
      
  }
    
  public function view_bills(Request $request)
  {
      $data = $request->all();
      $company_id   = $data['company_id'];
      $from_date    = $data['from_date'];
      $to_date      = $data['to_date'];
      $bill_no      = $data['bill_no'];
      
      
       $bill_query    =  sales_bill::select('sales_bill_id','bill_no','bill_date','customer_id','total_qty','total_bill_amount')
                                           ->with([
                                                'customer' => function($fquery) {
                                                     $fquery->select('customer_id','customer_name','customer_last_name','customer_mobile');  
                                                     }
                                            ])  
                                            ->with([
                                                'sales_bill_payment_detail' => function($fquery) {
                                                     $fquery->select('sales_bill_id','total_bill_amount','payment_method_id');
                                                     $fquery->with([
                                                                    'singlepayment_method' => function($fquery) {
                                                                         $fquery->select('payment_method_id','payment_method_name');  
                                                                         }
                                                                ]);
                                                     }
                                            ]) 
                                          ->where('company_id',$company_id)
                                          ->where('deleted_at','=',NULL)
                                          ->where('is_active','=',1);
                                          
        if(isset($data) && $data != '' && $data['bill_no'] != '')
        {
             $bill_query->where('bill_no', 'like', '%'.$bill_no.'%');
        }
        if(isset($data) && $data != '' && $from_date != '' && $to_date != '')
        {
            
             $start_date           =      date("Y-m-d",strtotime($from_date));
             $end_date             =      date("Y-m-d",strtotime($to_date));
             $bill_query->whereRaw("STR_TO_DATE(sales_bills.bill_date,'%d-%m-%Y') between '$start_date' and '$end_date'");
            
        }                                      
                                          
            $viewbill_details  =  $bill_query->get();                                   
          
      return json_encode(array("Success"=>"True","View Bill"=>$viewbill_details));
      
  } 
  
  public function view_bills_data(Request $request)
  {
      $data = $request->all();
      $company_id    = $data['company_id'];
      $sales_bill_id = $data['sales_bill_id'];
      
      $company_profile   =  company_profile::select('state_id')
                                             ->where('company_id',$company_id)
                                             ->first();
      $company_state_id  =   $company_profile['state_id'];                                         
                                             
                                             
      
      
      
      
       $viewbills_data    =  sales_bill::select('sales_bill_id','bill_no','bill_date','customer_id','total_qty','total_bill_amount','discount_percent','discount_amount','state_id','reference_id')
                                           ->with([
                                                'customer' => function($fquery) {
                                                     $fquery->select('customer_id','customer_name','customer_last_name','customer_mobile'); 
                                                     $fquery->with([
                                                            'customer_address_detail' => function($ffquery) {
                                                                 $ffquery->select('customer_id','customer_gstin','customer_address','customer_area','customer_city','customer_pincode');  
                                                                 }
                                                        ]); 
                                                     }
                                            ])
                                            ->with([
                                                'sales_product_detail' => function($fquery) {
                                                     $fquery->select('*'); 
                                                     $fquery->with([
                                                            'product' => function($ffquery) {
                                                                 $ffquery->select('product_id','product_name','product_system_barcode','supplier_barcode','hsn_sac_code','product_code');  
                                                                 }
                                                        ]); 
                                                     }
                                            ]) 
                                            ->with([
                                                'sales_bill_payment_detail' => function($fquery) {
                                                     $fquery->select('sales_bill_id','total_bill_amount','payment_method_id');
                                                     $fquery->with([
                                                                    'singlepayment_method' => function($fquery) {
                                                                         $fquery->select('payment_method_id','payment_method_name');  
                                                                         }
                                                                ]);
                                                     }
                                            ]) 
                                          ->with('reference')
                                          ->where('company_id',$company_id)
                                          ->where('sales_bill_id',$sales_bill_id)
                                          ->where('deleted_at','=',NULL)
                                          ->where('is_active','=',1)
                                          ->get();                                
          
      return json_encode(array("Success"=>"True","View Bills Data"=>$viewbills_data,"company_state_id"=>$company_state_id));
      
  } 
    
    
    public function forgot_password(Request $request)
    {
        $data = $request->all();
        $company_id     = $data['company_id'];
        $email_address  = $data['email_address'];
        
        // $users   =  user::select('password')
        // ->where('company_id',$company_id)->where('email',$email_address)->first();
        
        // print_r($users);
        
    }
    
    public function email_bill(Request $request)
    {
       
        $data = $request->all();
        $company_id     = $data['company_id'];
        $sales_bill_id  =   $data['sales_bill_id'];
        
        $mail_setup = mail_setup::select("*")->first();
        
        
        if($mail_setup)
        {
            if(isset($mail_setup['driver']) && $mail_setup['driver']!= '' &&
            isset($mail_setup['host']) && $mail_setup['host']!= '' &&
            isset($mail_setup['port']) && $mail_setup['port']!= '' &&
            isset($mail_setup['username']) && $mail_setup['username']!= '' &&
            isset($mail_setup['password']) && $mail_setup['password']!= '' &&
            isset($mail_setup['encryption']) && $mail_setup['encryption']!= '' )
            {
                $billid             = $sales_bill_id;
                
                $state              = state::all();
                $country            = country::all();
                $state_id           = company_profile::select('state_id','tax_type','tax_title','currency_title','bill_calculation')
                ->where('company_id',$company_id)->get();
                $company_state      = $state_id[0]['state_id'];
                $tax_type           = $state_id[0]['tax_type'];
                $tax_title          = $state_id[0]['tax_title'];
                $taxname            = $tax_type==1?$tax_title:'IGST';
                $currtitle          = $state_id[0]['currency_title'];
                $bill_calculation   = $state_id[0]['bill_calculation'];
                
                if($tax_type==1)
                {
                    $currency_title = $currtitle==''||$currtitle==NULL?'INR':$currtitle;
                }
                else
                {
                    $currency_title = 'INR';
                }
                
                $payment_methods    = payment_method::where('is_active','=','1')->get();
                
                $billingdata = sales_bill::where([
                ['sales_bill_id','=',$billid],
                //['company_id',Auth::user()->company_id]
                ])
                ->select('*')
                ->with('reference')
                ->with('sales_bill_payment_detail')
                ->with('customer')
                ->with('customer_address_detail')
                ->with('company')
                ->with('user')
                ->withCount([
                        'sales_product_detail as overalldiscount' => function($fquery) {
                            $fquery->select(DB::raw('SUM(discount_amount + overalldiscount_amount )'));
                        }
                    ])
                ->first();
                
                $customer_id    = $billingdata['customer_id'];
                $previouscreditamount  =  customer_creditaccount::
                    //where('company_id',Auth::user()->company_id)
                    where('customer_id',$customer_id)
                    ->where('balance_amount','>',0)
                    ->where('sales_bill_id','!=',$billingdata['sales_bill_id'])
                    ->sum('balance_amount');
                    
                $currentcreditamount  =  customer_creditaccount::
                    //where('company_id',Auth::user()->company_id)
                    where('customer_id',$customer_id)
                    ->where('balance_amount','>',0)
                    ->where('sales_bill_id','=',$billingdata['sales_bill_id'])
                    ->sum('balance_amount');
                    
                $billingproductdata = sales_product_detail::
                     //where('company_id',Auth::user()->company_id)
                    where('sales_bill_id','=',$billid)
                    ->where('qty','!=',0)
                    ->with('product.product_features_relationship')
                    ->with('batchprice_master')
                    ->get();
                    
                $productcount = sales_product_detail::
                    //where('company_id',Auth::user()->company_id)
                    where('sales_bill_id','=',$billid)
                    ->count();
                    
                $gstdata = sales_product_detail::select('cgst_percent','sgst_percent','igst_percent',DB::raw("SUM(sales_product_details.sellingprice_afteroverall_discount) as tottaxablevalue"),DB::raw("SUM(sales_product_details.cgst_amount) as totcgstamount"),DB::raw("SUM(sales_product_details.sgst_amount) as totsgstamount"),DB::raw("SUM(sales_product_details.igst_amount) as totigstamount"),DB::raw("SUM(sales_product_details.total_amount) as totgrand"))->where('sales_bill_id','=',$billid)->groupBy('igst_percent')->get();
            
                $product_features =  ProductFeatures::getproduct_feature('');
                
                foreach ($billingproductdata AS $key=>$v)
                {
                    if (isset($v['product']['product_features_relationship']) && $v['product']['product_features_relationship'] != '')
                    {
                        foreach($product_features AS $kk => $vv)
                        {
                            $html_id = $vv['html_id'];
        
                            /*if ($v['product']['product_features_relationship'][$html_id] != '' && $v['product']['product_features_relationship'][$html_id] != NULL)
                            {
                                $nm = product::feature_value($vv['product_features_id'], $v['product']['product_features_relationship'][$html_id]);
                                $billingproductdata[$key]['product'][$html_id] = $nm;
                            }*/
                            foreach($v['product']['product_features_relationship'] AS $p_fk=>$p_fv)
                            {
                                if ($p_fv[$html_id] != '' && $p_fv[$html_id] != NULL)
                                {
                                    $nm = product::feature_value($vv['product_features_id'], $p_fv[$html_id]);
                                    if($billingproductdata[$key]['product'][$html_id] == '')
                                    {
                                        $billingproductdata[$key]['product'][$html_id] = $nm;
                                    }else{
                                        $billingproductdata[$key]['product'][$html_id] = $billingproductdata[$key]['product'][$html_id].','.$nm;
                                    }
                                }
                            }
                        }
                    }
                }
                
                $invoicedate        =         date("d-m-Y",strtotime($billingdata['bill_date']));
                
                if($billingdata['modified_by'] == 1){
                   $subject = "Invoice No.:".$billingdata['bill_no']. ", Purchased on:" .$invoicedate. "(Edited invoice)";
                }
                else{
                  $subject = "Invoice No.:".$billingdata['bill_no']. ", Purchased on:" .$invoicedate;
                }
                
                // $customer_id = $customer_id;
                //if($customer_id != null )
                //{
                    $customer_data = customer::select('customer_email','customer_name')->where('customer_id','=',$customer_id)->first();
                //}
            
                $customer_email = $customer_data['customer_email'];
                $customer_name = $customer_data['customer_name'];
                $company_data = company_profile::select('company_name','company_mobile','website','company_email')->first();
                
                $data_email = array(
                    'email' => $customer_email,
                    'subject' => $subject,
                    'customer_name' => $customer_name,
                    'company_name' => $company_data['company_name'],  
                    'company_mobile' => (isset($company_data['company_mobile']) && $company_data['company_mobile'] != '' ? $company_data['company_mobile'] : ''),
                    'company_email' => (isset($company_data['company_email']) && $company_data['company_email'] != '' ? $company_data['company_email'] : ''),
                    'website' =>(isset($company_data['company_website']) && $company_data['company_website'] != '' ? $company_data['company_website'] : ''),
                    'bill_no' => $billingdata['bill_no'],
                    
                );
                
                
               
                $pdf = PDF::loadView('printingfiles::sales/print_bill_pdf', compact('payment_methods','state','country','billingdata','billingproductdata','productcount','gstdata','tax_type','taxname','currency_title','bill_calculation','customer_id','previouscreditamount','currentcreditamount'));
                
            
                Mail::send('Mail.mail', $data_email, function($message)use($data_email,$pdf) {
            
                $message->to($data_email["email"])
                ->from($data_email["company_email"],$data_email["company_name"])
                ->subject($data_email["subject"])
                ->attachData($pdf->output(), "invoice".$data_email['bill_no'].".pdf");
                //->with('data',$this->data_email);
                });
                
                return json_encode(array("Success"=>"True","Message"=>"Email sent successfully..."));
                
            }
        }
        
    }
    
        
}
