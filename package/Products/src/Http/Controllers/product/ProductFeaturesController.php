<?php

namespace Webcolorzpos\Products\Http\Controllers\product;

use App\Http\Controllers\Controller;
use Webcolorzpos\Products\Models\product\ProductFeatures;
use Webcolorzpos\Products\Models\product\product_features_data;
use Webcolorzpos\Products\Models\product\product_features_relationship;
use Webcolorzpos\Products\Models\product\product;
use Webcolorzpos\Products\Models\product\price_master;
use Webcolorzpos\Products\Models\product\product_image;
use Illuminate\Http\Request;
use Auth;
use DB;
use Log;
use Illuminate\Validation\Rule;
use Schema;


class ProductFeaturesController extends Controller
{
    public function index()
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        return view('productfeatures::product_features_show');
    }

    public function productfeatures_create(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);

        $data = $request->all();
        $productfeaturesdata =  array();
        parse_str($data['formdata'], $productfeaturesdata);
        $productfeaturesdata = preg_replace('/\s+/', ' ', $productfeaturesdata);
        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;
        $productfeatures_id =$productfeaturesdata['product_features_id'];
        $created_by = $userId;

        $product_features = ProductFeatures::getproduct_feature($productfeaturesdata['product_features_id']);

        $validate_error = \Validator::make($productfeaturesdata,
            [
                'product_features_data_value' =>
                    [
                        Rule::unique('product_features_datas')
                            ->whereNull('deleted_at')
                            ->whereNotNull('product_features_data_value')
                            ->where('product_features_id',$productfeatures_id)
                    ],
            ]);

        if ($validate_error->fails())
        {
            return json_encode(array("Success" => "False", "status_code" => 409, "Message" => $validate_error->messages()));
            exit;
        }


       $productfeaturesdata['product_features_data_image'] = '';
        if(isset($productfeaturesdata['image_name']) && $productfeaturesdata['image_name'] != '' && $productfeaturesdata['image_name'] != 'NULL' && $productfeaturesdata['image_name'] != 'null')
        {
            if (!file_exists(DYNAMIC_PRODUCT_PROPERTIES_IMAGE))
                {
                    mkdir(DYNAMIC_PRODUCT_PROPERTIES_IMAGE, 0777, true);
                }

                $image_parts = explode(";base64,", $productfeaturesdata['image_json']);
                if(isset($image_parts) && $image_parts != '')
                {
                    $image_type_aux = explode("image/", $image_parts[0]);
                    $image_type = $image_type_aux[1];
                    $image_base64 = base64_decode($image_parts[1]);
                    $file_name = uniqid() . '.png';
                    $file = DYNAMIC_PRODUCT_PROPERTIES_IMAGE . $file_name;
                    file_put_contents($file, $image_base64);
                    chmod($file, 0664);
                    $productfeaturesdata['product_features_data_image'] = $file_name;
                }
        }

        $productfeaturesdata['product_features_banner_image'] = '';
        if(isset($productfeaturesdata['banner_image_name']) && $productfeaturesdata['banner_image_name'] != '' && $productfeaturesdata['banner_image_name'] != 'NULL' && $productfeaturesdata['banner_image_name'] != 'null')
        {
            if (!file_exists(DYNAMIC_PRODUCT_PROPERTIES_IMAGE))
            {
                mkdir(DYNAMIC_PRODUCT_PROPERTIES_IMAGE, 0777, true);
            }

            $image_parts = explode(";base64,", $productfeaturesdata['banner_image_json']);
            if(isset($image_parts) && $image_parts != '')
            {
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $file_name = uniqid() . '.png';
                $file = DYNAMIC_PRODUCT_PROPERTIES_IMAGE . $file_name;
                file_put_contents($file, $image_base64);
                chmod($file, 0664);
                $productfeaturesdata['product_features_banner_image'] = $file_name;
            }
        }

        $parent_id = (isset($productfeaturesdata['parent'])?$productfeaturesdata['parent'] : '0');

        $productfeatures_data= product_features_data::updateOrCreate(
            ['product_features_data_id' =>'', 'company_id'=>$company_id,
            ],
            [
                'product_features_id'=>$productfeatures_id,
                'created_by' =>$created_by,
                'company_id'=>$company_id,
                'product_features_data_value' => $productfeaturesdata['product_features_data_value'],
                'product_features_data_url' => isset($productfeaturesdata['product_features_data_url']) ? $productfeaturesdata['product_features_data_url'] : '' ,
                'feature_content' => isset($productfeaturesdata['feature_content']) ? $productfeaturesdata['feature_content'] : '',
                'product_features_data_image' => isset($productfeaturesdata['product_features_data_image']) ? $productfeaturesdata['product_features_data_image'] : '',
                'product_features_banner_image' => isset($productfeaturesdata['product_features_banner_image']) ? $productfeaturesdata['product_features_data_image'] : '',
                'parent' => $parent_id,
                'is_active' => '1'
            ]
        );

        $message = 'Product Features';

        if($product_features['product_features_name'] !='')
        {
            $message =$product_features['product_features_name'];
        }

       return json_encode(array("Success"=>"True","Message"=>$message ." has been successfully added.","product_features_data_id"=>$productfeatures_data->product_features_data_id));

         return back()->withInput();
    }


    public function getfeatures(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data = $request->all();
        $product_features_data=product_features_data::where('company_id',Auth::user()->company_id)
                             ->with('product_features')
                             ->where('deleted_at','=',NULL)
                             ->where('product_features_id',$data['product_features_id'])
                             ->get();


        return json_encode(array("Success"=>"True","Data"=>$product_features_data));

}

    public function get_parent_of_feature(Request $request)
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);
        $data = $request->all();

       

        $product_feature_parent     =   ProductFeatures::select('parent')->where('company_id',Auth::user()->company_id)
        ->where('deleted_at','=',NULL)->where('product_features_id',$data['product_features_id'])->where('is_active',1)
            ->first();

        $parent     =   $product_feature_parent->parent;    

        $product_features_data=product_features_data::where('company_id',Auth::user()->company_id)
            ->where('deleted_at','=',NULL)
            ->where('product_features_id',$parent)
            // ->where('parent',1)
            ->where('is_active',1)
            ->get();

            // print_r($product_features_data); exit;

        return json_encode(array("Success"=>"True","Data"=>$product_features_data));
    }

    public function check_changeover(Request $request)
    {
        $data = $request->all();

        $productfeatures_id     =   $data['product_features_id'];
        $selectedValue               =   $data['selectedValue'];

        $check_parent     =   ProductFeatures::select('*')
        ->where('deleted_at','=',NULL)
        ->where('is_active',1)
        ->where('parent',$productfeatures_id)
        ->with(['product_features_data_parent' => function($fquery) use ($selectedValue) {
                        $fquery->select('*');
                        $fquery->where('parent',$selectedValue);
                        

                    }
                ])
        ->get();

        if(sizeof($check_parent)==0)
        {
            return json_encode(array("Success"=>"False"));
        }
        else
        {
            return json_encode(array("Success"=>"True","Data"=>$check_parent));
        }
    }

    public function product_features()
    {
        $company_id             =   Auth::user()->company_id;
        $result     =   ProductFeatures::where('company_id',$company_id)->orderBy('feature_type','ASC')->whereNull('deleted_by')->with('product_features_data_1')->get();
        return view('products::productfeatures/product_features',compact('result'));
    }

    public function addEditFeature(Request $request)
    {
        $data                   =   $request->all();

        $feature_type               =   $data['feature_type'];

        if($feature_type==1)
        {
            $feature_location       =   '';
        }
        else
        {
            $feature_location       =   $data['feature_location']==''?0:$data['feature_location'];
        }

        $parentChild                =   $data['parentChild'];
        $html_name                  =   $data['html_name'];
        $html_id                    =   $data['html_id'];
        $product_features_name      =   $data['product_features_name'];
        $feature_url                =   $data['feature_url'];
        $feature_content            =   $data['feature_content'];

        $product_features_id        =   $data['product_features_id'];
        $product_features_data_id   =   $data['product_features_data_id'];

        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;
        $created_by = $userId;

        if($parentChild=='')
        {

            if($feature_type==1)
            {
                $explode    =   explode('_',$html_id);

                if($explode[0]=='dynamic')
                {
                    if(Schema::hasColumn('product_features_relationships', ''.$html_id.''))
                    {

                    }
                    else
                    {
                        DB::select(DB::raw('ALTER TABLE `product_features_relationships` ADD `'.$html_id.'` INT(10) UNSIGNED NULL DEFAULT NULL AFTER `product_id`;'));
                    }
                }
            }

            $ProductFeatures = ProductFeatures::updateOrCreate(
                ['product_features_id' => $product_features_id, 'company_id'=>$company_id,],
                [
                    'product_features_name' => (isset($product_features_name)?$product_features_name : ''),
                    'feature_url' => (isset($feature_url)?$feature_url:''),
                    'feature_content' => (isset($feature_content)?$feature_content:''),
                    'html_name' => (isset($html_name)?$html_name:''),
                    'html_id' => (isset($html_id)?$html_id:''),
                    'feature_type' => $feature_type,
                    'feature_location' => $feature_location,
                    'is_active' => 1,
                    'created_by' => $created_by
                ]
            );
        }
        else
        {
            if($request->file('product_features_data_image')=='')
            {
                $product_features_data_image    =   '';
                $image_name                     =   '';
            }
            else
            {

                $product_features_data_image         =   $request->file('product_features_data_image');

                $image_name = str_replace(' ', '_', rand().$request->file('product_features_data_image')->getClientOriginalName());

                $request->file('product_features_data_image')->move(public_path(PRODUCT_IMAGE_URL_CONTROLLER), $image_name);
            }

            if($request->file('product_features_banner_image')=='')
            {
                $product_features_banner_image     =   '';
                $image_name_banner                  =   '';
            }
            else
            {
                $product_features_banner_image         =   $request->file('product_features_banner_image');

                $image_name_banner = str_replace(' ', '_', rand().$request->file('product_features_banner_image')->getClientOriginalName());

                $request->file('product_features_banner_image')->move(public_path(PRODUCT_IMAGE_URL_CONTROLLER), $image_name_banner);
            }

            $ProductFeatures = product_features_data::updateOrCreate(
                ['product_features_data_id' => $product_features_data_id,],
                [
                    'product_features_id' => $parentChild,
                    'company_id'=>$company_id,
                    'product_features_data_value' => (isset($product_features_name)?$product_features_name : ''),
                    'product_features_data_url' => (isset($feature_url)?$feature_url:''),
                    'product_features_data_image' => (isset($image_name)?$image_name:''),
                    'product_features_banner_image' => (isset($image_name_banner)?$image_name_banner:''),
                    'feature_content' => (isset($feature_content)?$feature_content:''),
                    'is_active' => 1,
                    'created_by' => $created_by
                ]
            );
        }

        // echo '<pre>'; print_r($data); exit;

        return json_encode(array("Success"=>"True","Message"=>"Feature added Successfully...","url"=>"product_features"));

    }

    public function EditFeaturePopup(Request $request)
    {
        $data   =   $request->all();
        $result     =   ProductFeatures::where('product_features_id',$data['product_features_id'])->first();
        return json_encode(array("Success"=>"True","Data"=>$result));
    }

    public function EditSubFeaturePopup(Request $request)
    {
        $data   =   $request->all();
        $result     =   product_features_data::where('product_features_data_id',$data['product_features_data_id'])->with('product_features')->first();
        return json_encode(array("Success"=>"True","Data"=>$result));
    }

    public function deleteFeature(Request $request)
    {
        $data   =   $request->all();

        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;
        $created_by = $userId;

        $ProductFeatures = ProductFeatures::updateOrCreate(
            ['product_features_id' => $data['product_features_id'],],
            [
                'deleted_by' => $userId,
                'deleted_at'=> date('Y-m-d H:i:s')
            ]
        );

        return json_encode(array("Success"=>"True","Message"=>"Feature deleted Successfully...","URL"=>"product_features"));

    }

    public function deleteSubFeature(Request $request)
    {
        $data   =   $request->all();

        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;
        $created_by = $userId;

        $ProductFeatures = product_features_data::updateOrCreate(
            ['product_features_data_id' => $data['product_features_data_id'],],
            [
                'deleted_by' => $userId,
                'deleted_at'=> date('Y-m-d H:i:s')
            ]
        );

        return json_encode(array("Success"=>"True","Message"=>"Feature deleted Successfully...","URL"=>"product_features"));

    }

    public function FeatureActive(Request $request)
    {
        $data   =   $request->all();

        $ProductFeatures = ProductFeatures::updateOrCreate(
            ['product_features_id' => $data['product_features_id'],],
            [
                'is_active' => $data['status'],
                'updated_at'=> date('Y-m-d H:i:s')
            ]
        );

        if($data['status']!=1)
        {
            $query  =   product_features_data::where('product_features_id', $data['product_features_id'])
            ->update([
               'is_active' => $data['status']
            ]);

            // $ProductFeatures = product_features_data::updateOrCreate(
            //     ['product_features_id' => $data['product_features_id'],],
            //     [
            //         'is_active' => $data['status'],
            //         'updated_at'=> date('Y-m-d H:i:s')
            //     ]
            // );
        }

        return json_encode(array("Success"=>"True","Message"=>"Feature updated Successfully...","URL"=>"product_features"));

    }

    public function FeatureSubActive(Request $request)
    {
        $data   =   $request->all();

        $product_features_id   =    product_features_data::select('product_features_id')->where('product_features_data_id',$data['product_features_data_id'])->first();

        $ProductFeatures = product_features_data::updateOrCreate(
            ['product_features_data_id' => $data['product_features_data_id'],],
            [
                'is_active' => $data['status'],
                'updated_at'=> date('Y-m-d H:i:s')
            ]
        );

        if($data['status']==1)
        {
            $ProductFeatures = ProductFeatures::updateOrCreate(
                ['product_features_id' => $product_features_id->product_features_id,],
                [
                    'is_active' => $data['status'],
                    'updated_at'=> date('Y-m-d H:i:s')
                ]
            );
        }

        return json_encode(array("Success"=>"True","Message"=>"Feature updated Successfully...","URL"=>"product_features"));

    }

    public function UpdateOrdering(Request $request)
    {
        $data   =   $request->all();

        $ProductFeatures = ProductFeatures::updateOrCreate(
            ['product_features_id' => $data['product_features_id'],],
            [
                'ordering' => $data['enteredVal'],
                'updated_at'=> date('Y-m-d H:i:s')
            ]
        );

        return json_encode(array("Success"=>"True","Message"=>"ordering updated Successfully..."));

    }

    public function UpdateOrderingSub(Request $request)
    {
        $data   =   $request->all();

        $ProductFeatures = product_features_data::updateOrCreate(
            ['product_features_data_id' => $data['product_features_data_id'],],
            [
                'ordering' => $data['enteredVal'],
                'updated_at'=> date('Y-m-d H:i:s')
            ]
        );

        return json_encode(array("Success"=>"True","Message"=>"ordering updated Successfully..."));

    }



}
