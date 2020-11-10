<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;

use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index()
    {
        $userId             =   Auth::User()->user_id;
        $users      =   user::select('*')->where('user_id',$userId)->whereNull('deleted_at')->get();

        $company_profile = company_profile::where('company_id',Auth::user()->company_id)->first();
        
        

        
        if($company_profile['full_name'] == '')
        {
            return view('company_profile::company_profile/company_profile',compact('company_profile'));
        }
        else
        {
            return view('home',compact('users','company_profile'));
        }

        
    }


    public function logout()
    {
        auth()->logout();
        return redirect('/login');
    }

    public function eod_closing()
    {
        return view('closing');
    }

    public function closeTheDay(Request $request)
    {
        $data   =   $request->all();

        

    }

    public function getTransferTables_list(Request $request)
    {
        $data   =   $request->all();

        
    }

    public function transferTable(Request $request)
    {
        $data   =   $request->all();

        

    }


}
