<?php

namespace Webcolorzpos\CertificationMaster\Http\Controllers\employee;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\state;
use App\country;
use DB;
use Hash;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Webcolorzpos\CertificationMaster\Models\certification\wp_term_taxonomy;
use Webcolorzpos\CertificationMaster\Models\certification\certification_master;
use Webcolorzpos\CertificationMaster\Models\certification\wp_term;
use Webcolorzpos\CertificationMaster\Models\certification\wp_option;
use Webcolorzpos\CertificationMaster\Models\certification\wp_post;
use Webcolorzpos\CertificationMaster\Models\certification\wp_term_relationship;
use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
use Log;


class CertificationMasterController extends Controller
{
    public function index()
    {
        Log::info(Auth::User()->user_id.'::'.Auth::User()->employee_firstname.'::'.$_SERVER['REMOTE_ADDR'].'===>'.__METHOD__. ' Line No '.__LINE__.''.PHP_EOL);

        $company_id             =   Auth::user()->company_id;

        $userId = Auth::User()->user_id;

        $category   =   wp_term_taxonomy::where('taxonomy','product_cat')
        ->where('parent',0)
        ->with('wp_term')
        // ->with('wp_term_taxonomy_child.wp_term')
        ->get();

        $certifications     =   certification_master::whereNull('deleted_by')
        ->with('wp_term')
        ->with('wp_term_child')
        ->with('wp_post')
        ->orderBy('certification_master_id','DESC')
        ->get();

        return view('certification::certification/certification_master',compact('category','certifications'));
    }

    public function showcertSubcategory(Request $request)
    {
        $data   =   $request->all();

        $category_id    =   $data['category_id'];

        $subcategory   =   wp_term_taxonomy::where('taxonomy','product_cat')
        ->where('parent',$category_id)
        ->with('wp_term')
        ->get();

        return json_encode(array("Success" => "True", "Data" => $subcategory));

    }

    public function showcertProducts(Request $request)
    {
        $data   =   $request->all();

        $subcategory_id    =   $data['subcategory_id'];

        $products   =   wp_term_relationship::select('object_id')
        ->where('term_taxonomy_id',$subcategory_id)
        ->with('wp_post')
        ->with('wp_post', function ($q) {
            $q->select('ID', 'post_title');
        })->whereHas('wp_post', function ($q) {
            $q->where('post_status', 'publish');
        })
        ->get();

        return json_encode(array("Success" => "True", "Data" => $products));
    }

    public function saveCertification(Request $request)
    {
        $data   =   $request->all();

        $userId = Auth::User()->user_id;

        $company_id = Auth::User()->company_id;

        $created_by = $userId;

        $category_id   =   isset($data['category_id'])==''?NULL:$data['category_id'];
        $subcategory_id   =   isset($data['subcategory_id'])==''?NULL:$data['subcategory_id'];
        $product_id   =   isset($data['product_id'])==''?NULL:$data['product_id'];
        $certification_title   =   isset($data['certification_title'])==''?NULL:$data['certification_title'];
        $no_of_questions   =   isset($data['no_of_questions'])==''?NULL:$data['no_of_questions'];


        $certification = certification_master::updateOrCreate(
            ['certification_master_id' => ''],
            [
                'company_id'=>$company_id,
                'created_by' =>$userId,
                'category_id' => $category_id,
                'subcategory_id' => $subcategory_id,
                'product_id' => $product_id,
                'certification_title' => $certification_title,
                'no_of_questions' => $no_of_questions
            ]);

        if($certification)
        {
            return json_encode(array("Success"=>"True","Message"=>"Certification has been successfully added.","url"=>"certification_master"));
        }
        else
        {
            return json_encode(array("Success"=>"False","Message"=>"Something Went Wrong"));
        }
    }

    public function deleteCertification(Request $request)
    {
        $data   =   $request->all();

        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;
        $created_by = $userId;

        $certification_master_id    =   $data['certification_master_id'];

        $certification = certification_master::updateOrCreate(
        ['certification_master_id' => $certification_master_id],
        [                    
            'deleted_by' => $userId,
            'deleted_at' => date('Y-m-d H:i:s')
        ]);

        if($certification)
        {
            return json_encode(array("Success"=>"True","Message"=>"Certification has been deleted successfully.","url"=>"certification_master"));
        }
        else
        {
            return json_encode(array("Success"=>"False","Message"=>"Something Went Wrong"));
        }

    }
    

}
