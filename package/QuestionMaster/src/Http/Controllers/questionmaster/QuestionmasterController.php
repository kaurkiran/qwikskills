<?php

namespace Webcolorzpos\QuestionMaster\Http\Controllers\questionmaster;
use App\Http\Controllers\Controller;

use Webcolorzpos\QuestionMaster\Models\questionmaster\questionmaster;
use Webcolorzpos\CertificationMaster\Models\certification\wp_term_taxonomy;
use Webcolorzpos\CertificationMaster\Models\certification\certification_master;
use Webcolorzpos\CertificationMaster\Models\certification\wp_term;
use Webcolorzpos\CertificationMaster\Models\certification\wp_option;
use Webcolorzpos\CertificationMaster\Models\certification\wp_post;
use Webcolorzpos\CertificationMaster\Models\certification\wp_term_relationship;

use function foo\func;
use http\Client\Curl\User;
use Illuminate\Http\Request;
use Auth;
use phpDocumentor\Reflection\Types\Null_;
use Illuminate\Validation\Rule;
use Maatwebsite\Excel\Facades\Excel;

use Carbon\Carbon;
use Prophecy\Prophecy\RevealerInterface;
use DB;
use App\company;

use Log;
class QuestionmasterController extends Controller
{
    //onload show method
    public function index()
    {
        Log::info(Auth::User()->user_id . '::' . Auth::User()->employee_firstname . '::' . $_SERVER['REMOTE_ADDR'] . '===>' . __METHOD__ . ' Line No ' . __LINE__ . '' . PHP_EOL);
        $questionsdata = questionmaster::select('*')
                        ->where('deleted_at', '=', NULL)
                        ->orderBy('questionmaster_id', 'DESC')
                        ->paginate(20);

        $category   =   wp_term_taxonomy::where('taxonomy','product_cat')
        ->where('parent',0)
        ->with('wp_term')
        ->get();               


        return view('questionmasters::questionmaster/question_show', compact('questionsdata','category'));
    }
    public function question_create(Request $request)
    {
        Log::info(Auth::User()->user_id . '::' . Auth::User()->employee_firstname . '::' . $_SERVER['REMOTE_ADDR'] . '===>' . __METHOD__ . ' Line No ' . __LINE__ . '' . PHP_EOL);
        $data = $request->all();
        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;
        $created_by = $userId;
        // echo '<pre>';
        // print_r($data);
        // exit;


        $category_id   =   isset($data['category_id'])==''?NULL:$data['category_id'];
        $subcategory_id   =   isset($data['subcategory_id'])==''?NULL:$data['subcategory_id'];
        $product_id   =   isset($data['product_id'])==''?NULL:$data['product_id'];

        try {
            DB::beginTransaction();
           
                $todayDate   =  date("d-m-Y");
            

                   $questionmaster = questionmaster::updateOrCreate(
                       ['questionmaster_id' => $data['questionmaster_id'], 'company_id' => $company_id,],
                       [
                           'created_by' => $created_by,
                           'trans_date' => $todayDate,
                           'category_id' => $category_id,
                           'subcategory_id' => $subcategory_id,
                           'product_id' => $product_id,
                           'question_title' => (isset($data['question_title']) ? $data['question_title'] : NULL),
                           'question_answer_a'=> (isset($data['question_answer_a']) ? $data['question_answer_a'] : NULL),
                           'question_answer_b'=> (isset($data['question_answer_b']) ? $data['question_answer_b'] : NULL),
                           'question_answer_c'=> (isset($data['question_answer_c']) ? $data['question_answer_c'] : NULL),
                           'question_answer_c'=> (isset($data['question_answer_c']) ? $data['question_answer_c'] : NULL),
                           'question_answer_d'=> (isset($data['question_answer_d']) ? $data['question_answer_d'] : NULL),
                           'question_correct_answer'=> (isset($data['question_correct_answer']) ? $data['question_correct_answer'] : NULL),
                           'question_summary'=> (isset($data['question_summary']) ? $data['question_summary'] : NULL),
                           'question_tag'=> (isset($data['question_tag']) ? $data['question_tag'] : NULL),
                           'created_at'=>date('Y-m-d H:i:s'),
                           'is_active' => "1"
                       ]
                   );

                  
                       $questionmaster_id = $questionmaster->questionmaster_id;
                       

                   DB::commit();



           
            if ($data['questionmaster_id'] != '') {
                return json_encode(array("Success" => "True", "Message" => "Question has been successfully updated."));
            } else {
                    return json_encode(array("Success" => "True", "Message" => "Product has been successfully added."));
            }
        } catch (\Illuminate\Database\QueryException $e) {
            DB::rollback();
            return json_encode(array("Success" => "False", "Message" => $e->getMessage()));
        } catch (Exception $e) {
            return json_encode(array("Success" => "False", "Message" => $e->getMessage()));
        }
    }

    public function deleteQuestion(Request $request)
    {
        $data   =   $request->all();

        $userId = Auth::User()->user_id;
        $company_id = Auth::User()->company_id;
        $created_by = $userId;

        $questionmaster_id    =   $data['questionmaster_id'];

        $questionmaster = questionmaster::updateOrCreate(
        ['questionmaster_id' => $questionmaster_id],
        [                    
            'deleted_by' => $userId,
            'deleted_at' => date('Y-m-d H:i:s')
        ]);

        if($questionmaster)
        {
            return json_encode(array("Success"=>"True","Message"=>"Question has been deleted successfully.","url"=>"question_show"));
        }
        else
        {
            return json_encode(array("Success"=>"False","Message"=>"Something Went Wrong"));
        }

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
     * @param  \App\Models\questionmaster  $questionmaster
     * @return \Illuminate\Http\Response
     */
    public function show(questionmaster $questionmaster)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\questionmaster  $questionmaster
     * @return \Illuminate\Http\Response
     */
    public function edit(questionmaster $questionmaster)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\questionmaster  $questionmaster
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, questionmaster $questionmaster)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\questionmaster  $questionmaster
     * @return \Illuminate\Http\Response
     */
    public function destroy(questionmaster $questionmaster)
    {
        //
    }
}
