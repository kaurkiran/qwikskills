<?php

namespace Webcolorzpos\Website_Software_Api\Http\Controllers\website_software;
use App\Http\Controllers\Controller;
use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
use Webcolorzpos\PO\Models\purchase_order\purchase_order_detail;
use Webcolorzpos\Products\Models\product\price_master;
use Webcolorzpos\Products\Models\product\product;
use Webcolorzpos\Products\Models\product\ProductFeatures;
use Webcolorzpos\Products\Models\product\product_features_relationship;
use Webcolorzpos\Website_Software_Api\Models\website_software\website_software;
use Illuminate\Http\Request;
use Webcolorzpos\Sales\Models\sales_bill;
use Webcolorzpos\Sales\Models\sales_product_detail;
use Webcolorzpos\Sales\Models\sales_bill_payment_detail;
use Webcolorzpos\Sales\Models\reference;
use Webcolorzpos\Sales\Models\payment_method;
use Webcolorzpos\Inward_Stock\Models\inward\inward_stock;
use Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail;
use Webcolorzpos\CreditBalance\Models\customer_creditaccount;
use App\company;
use App\Models\User;
use Webcolorzpos\Customer\Models\customer\customer;
use Webcolorzpos\Customer\Models\customer\customer_address_detail;
use Webcolorzpos\SalesReport\Models\pendingexcelbill_export;
use Webcolorzpos\Sales\Models\pendingexcel_bills;
use App\state;
use App\country;
use Illuminate\Validation\Rule;
use Auth;
use DB;
use Hash;
use Log;


class WebsiteSoftwareController extends Controller
{

    public function authenticate(Request $request)
    {
        $data   = $request->all();

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

    public function tables(Request $request)
    {
        $data   = $request->all();

        $company_id   = $data['company_id'];

        $tables   = company_profile::select('total_tables')->where('company_id',$company_id)->first();
        $totalTables  = $tables['total_tables'];
        $table_loop   = array();

        for($i=1;$i<=$totalTables;$i++)
        {
            if($i!=13)
            {
                $table_loop[]   = array('Table No.'=>$i,"printstatus"=>'0',"billstatus"=>'0',"billamount"=>'0',"covers"=>'0',"billtime"=>'0:00'); 
            }
        }

        return json_encode(array("Success"=>"True","Tables"=>$table_loop));
    }

    public function categories(Request $request)
    {
        $categories   = ProductFeatures::select('product_features_id','html_name','html_id','product_features_name','company_id')
        // ->where('company_id',Auth::user()->company_id)
        ->where('html_id','dynamic_category')
        ->with('product_features_data.product_features_childs')
        ->with([
                    'product_features_data' => function($fquery) {
                        $fquery->select('product_features_data_value','product_features_data_id','product_features_id','company_id');
                        $fquery->with(['product_features_childs' => function($q) {
                                  $q->select('product_features_data_value','product_features_id','product_features_data_id','parent');
                              }
                          ]);
                    }
                ])
        ->first();

        return json_encode(array("Success"=>"True","Categories"=>$categories));

    }

    public function category_products(Request $request)
    {
        $data   = $request->all();

        $company_id   = $data['company_id'];
        $dynamic_category   = $data['dynamic_category'];
        $dynamic_subcategory  = $data['dynamic_subcategory'];


        $product_ids   = product_features_relationship::select('product_id')
        ->where('company_id',$company_id)
        ->where('dynamic_category',$dynamic_category)
        ->where('dynamic_subcategory',$dynamic_subcategory)
        ->with('product')
        ->get();

        return json_encode(array("Success"=>"True","Products"=>$product_ids));
    }


        public  function product_listing(Request $request)
        {
            $data = $request->all();

            if(!isset($data) || !isset($data['company_id']) || $data['company_id'] == '')
            {
                return json_encode(array("Success"=>"False","Message"=>"Missing Body Data"));
            }
            

            $product = product::select('product_id','company_id','product_name','taxmaster_id','product_code','product_description','offer_price','sell_gst_percent','consumption_value','product_system_barcode')
                ->where('deleted_at','=',NULL)
                ->with('taxmaster')
                ->orderBy('product_id', 'DESC')
                ->with(array('product_images' =>function($query){
                    $query->select('product_image_id','product_id','caption','product_image');
                }))
                ->with('product_features_relationship')
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
                        ->whereNull('deleted_at')->get();

    return json_encode(array("Success"=>"True","Data"=>$payment_method));
}

public  function billing_requestdata(Request $request)
{


            $data = $request->all();


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

                if ($data['Order Details']['State'] != '')
                {
                    if (!state::where('state_name', $data['Order Details']['State'])->exists())
                    {
                        $error = 1;
                        return json_encode(array("Success" => "False", "Message" => "State Name " . $data['Order Details']['State'] . " Not Found!"));
                        exit;
                    }
                }
                


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
                                if(!isset($ordervalue['MRP']) || $ordervalue['MRP'] == '' || !is_numeric($ordervalue['MRP']))
                                {
                                    return json_encode(array("Success"=>"False","Message"=>"MRP is mandatory field or should be numeric"));
                                }
                                if(!isset($ordervalue['Selling Price']) || $ordervalue['Selling Price'] == '' || !is_numeric($ordervalue['Selling Price']))
                                {
                                    return json_encode(array("Success"=>"False","Message"=>"Selling Price is mandatory field or should be numeric"));
                                }
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
                    

                

                 $stateid = state::select('state_id')
                           ->where('state_name',$data['Order Details']['State'])
                           ->first();

                 $companyprofile = company_profile::select('state_id')
                 ->where('company_id',$data['Order Details']['Company ID'])
                 ->first();

                      $customer_id  =  NULL;
                      $searchcustomer_name     =  $data['Order Details']['Customer Name'];
                      $searchcustomer_mobile   =  $data['Order Details']['CONTACT NO'];

                          if($data['Order Details']['Customer Name']!='' || $data['Order Details']['CONTACT NO']!='')
                          {
                                  $showcustomer_id = customer::select('customer_id')
                                                      ->where(function($query) use ($searchcustomer_name,$searchcustomer_mobile)
                                                     {
                                                            if($searchcustomer_name !='' && $searchcustomer_mobile == '')
                                                            {
                                                                $query->where('customer_name',$searchcustomer_name);   
                                                            }
                                                            else if($searchcustomer_name =='' && $searchcustomer_mobile != '')
                                                            {
                                                                $query->where('customer_mobile',$searchcustomer_mobile); 
                                                            }
                                                            else
                                                            {
                                                              $query->where('customer_name',$searchcustomer_name); 
                                                              $query->orWhere('customer_mobile',$searchcustomer_mobile); 
                                                            }
                                                            
                                                     })
                                                      ->where('company_id',$data['Order Details']['Company ID'])->first(); 
                                                      //print_r($showcustomer_id);
                                // exit;                             
                                           
                                  if($showcustomer_id!='')
                                  {
                                    
                                      $customer_id = $showcustomer_id->customer_id;
                                  } 
                                  else
                                  {
                                      
                                        $dial_code = '';
                                              if($data['Order Details']['CONTACT NO'] != '')
                                              {
                                                  
                                                      $dial_code = company_profile::select('company_mobile_dial_code')
                                                          ->where('company_id',$data['Order Details']['Company ID'])->first();

                                                      $code = explode(',',$dial_code['company_mobile_dial_code']);


                                                      $dial_code = $code[0];
                                                 
                                              } 

                                            $customer = customer::updateOrCreate(
                                              ['customer_id' => '', 'company_id' => $data['Order Details']['Company ID'],],
                                              [
                                                  'created_by' => $created_by,
                                                  'company_id' => $company_id,
                                                  'customer_name' => (isset($data['Order Details']['Customer Name']) ? $data['Order Details']['Customer Name'] : ''),
                                                  'customer_mobile_dial_code' => (isset($dial_code) ? $dial_code : ''),
                                                  'customer_mobile' => (isset($data['Order Details']['CONTACT NO']) && $data['Order Details']['CONTACT NO'] != '' ? $data['Order Details']['CONTACT NO'] : NULL),
                                                  'customer_email' => NULL,
                                                  'is_active' => "1"
                                              ]
                                           );

                                           $customer_id = $customer->customer_id;
                                           $customer_address = customer_address_detail::updateOrCreate(
                                          ['customer_id' => $customer_id,
                                           'company_id'=>$company_id,],
                                          [
                                              'created_by' =>$created_by,
                                              'customer_gstin' => (isset($data['Order Details']['GST NO'])?$data['Order Details']['GST NO'] : ''),
                                              'customer_address_type' => '1',
                                              'customer_address' => '',
                                              'customer_area' => '',
                                              'customer_city' => (isset($data['Order Details']['City '])?$data['Order Details']['City '] : ''),
                                              'customer_pincode' =>'',
                                              'state_id' => (isset($data['Order Details']['State']) && $data['Order Details']['State'] != ''?$stateid['state_id'] : $companyprofile['state_id']),
                                              'country_id' => 102,
                                              'is_active' => "1"
                                           ]
                                         );
                                  } 
                            }                          

                      
                    $invoice_no    = '';
                    $state_id  =  $data['Order Details']['State'] != ''?$stateid['state_id'] : $companyprofile['state_id'];
                    
                     $sales = sales_bill::updateOrCreate(
                    ['sales_bill_id' => '', 'company_id'=>$company_id,],
                    ['customer_id'=>$customer_id,
                        'bill_no'=>$invoice_no,
                        'order_no'=>$data['Order Details']['Order ID/PO NO'],
                        'bill_date'=>$invoiceddate,
                        'state_id'=>$stateid['state_id'],
                        'reference_id'=>NULL,
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
                                          ->whereIn('item_type',array(1,3));

                         $productid->where('product_system_barcode',$ordervalue['Barcode']);
                         $productid->orWhere('supplier_barcode',$ordervalue['Barcode']);
                               

                         $productid   =   $productid->with('product_price_master')
                                      ->whereHas('product_price_master',function ($q) use($company_id){
                                              $q->where('company_id',$company_id);
                                       })->first();


                     if($productid !='')
                     {  



                        $productdetail     =    array();

                         $priceid  = price_master::select('price_master_id','selling_gst_percent')
                                     ->where('product_id',$productid['product_id'])
                                     ->where('company_id',$data['Order Details']['Company ID'])
                                     // ->where('product_qty','>=',$value['Order Qty'])
                                     ->orderBy('price_master_id','DESC')
                                     ->first(); 
                                      
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
                              $productdetail['price_master_id']                      =    $priceid['price_master_id'];
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

                                  price_master::where('price_master_id',$priceid['price_master_id'])->update(array(
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
                              'total_bill_amount'=>$data['Order Details']['Total Price'],
                              ));   


                     $paymentanswers     =    array();

                     foreach($data['Order Details']['Order Payment Details'] AS $paykey=>$payvalue)
                      {
                         
                            $paymentanswers['sales_bill_id']                 =  $sales_bill_id;
                            $paymentanswers['total_bill_amount']             =  $payvalue['Payment_method_amount'];
                            $paymentanswers['payment_method_id']             =  $payvalue['Payment_method_id'];
                            $paymentanswers['bankname']                      =  $payvalue['Remarks'];
                            $paymentanswers['chequeno']                      =  $payvalue['Remarks'];
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
            
           return json_encode(array("Success"=>"True","Message"=>"Billing has been successfully Saved."));
           
        }
        else
        {
            return json_encode(array("Success"=>"False","Message"=>"Something Went Wrong"));
        }
  }
                

  public function states()
  {
    
      $states = state::select('*')->get();

      return json_encode(array("Success"=>"True","State_data"=>$states));
  }
  public function countries()
  {
      $countries = country::select('*')->get();

      return json_encode(array("Success"=>"True","Countries_data"=>$countries));
  }
        
}
