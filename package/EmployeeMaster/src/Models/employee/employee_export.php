 <?php

// namespace Webcolorzpos\EmployeeMaster\Models\employee;


// use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
// use Auth;
// use Illuminate\Database\Eloquent\Model;
// use Maatwebsite\Excel\Concerns\FromQuery;
// use Maatwebsite\Excel\Concerns\FromCollection;
// use Maatwebsite\Excel\Concerns\WithHeadings;
// use Maatwebsite\Excel\Concerns\WithMapping;
// use Maatwebsite\Excel\Concerns\Exportable;
// use DB;
// use App\User;
// use App\state;
// use App\country;

// class employee_export implements FromQuery, WithHeadings, WithMapping
// {

//     use Exportable;

//     public $employeeName = '';
//     public $mobileNo = '';
//     public $empCode = '';
//     public $empDesignation='';
//     public $radioValue='';

//     public function __construct($employeeName,$mobileNo,$empCode,$empDesignation,$radioValue) {
//         $this->employeeName = $employeeName;
//         $this->mobileNo = $mobileNo;
//         $this->empCode = $empCode;
//         $this->empDesignation=$empDesignation;
//         $this->radioValue=$radioValue;
//     }

//     public function headings(): array
//     {
//         return [
//             'Employee Code',
//             'Employee Name',
//             'Mobile No.',
//             'Joining Date',
//             'Email',
//             'Alternate Mobile No.',
//             'Family Member Mobile No.',
//             'Designation',
//             'Duties',
//             'Salary Offered',
//             'Skills',
//             'Education',
//             'Past Experience',
//             'Date of Birth',
//             'Marital Status',
//             'Address',
//             'Area',
//             'City / Towm',
//             'State',
//             'Pincode / Zip Code',
//             'Country',
//             'Reference',
//             'Resigned Date',
//             'Regisned Reason',
//             'Remarks',
//         ];
//     }

//     public function map($users): array
//     {
//         $rows    = [];

//         $maritalStatus  =   $users['employee_marital_status'];

//         $marital    =   '';

//         if($maritalStatus==1)
//         {
//             $marital    =   'Single';
//         }
//         elseif($maritalStatus==2)
//         {
//             $marital    =   'Married';
//         }
//         elseif($maritalStatus==3)
//         {
//             $marital    =   'Divorced';
//         }
//         elseif($maritalStatus==4)
//         {
//             $marital    =   'Widow';
//         }

//         // print_r($marital); exit;

//         $rows[]         =   $users->employee_code;
//         $rows[]         =   $users->employee_firstname.' '.$users->employee_middlename.' '.$users->employee_lastname;
//         $rows[]         =   $users->employee_mobileno;
//         $rows[]         =   $users->employee_joiningdate!=NULL?date('d-m-Y', strtotime($users->employee_joiningdate)):'';
//         $rows[]         =   $users->email;
//         $rows[]         =   $users->employee_alternate_mobile;
//         $rows[]         =   $users->employee_family_member_mobile;
//         $rows[]         =   $users->employee_designation;
//         $rows[]         =   $users->employee_duties;
//         $rows[]         =   $users->employee_salary_offered;
//         $rows[]         =   $users->employee_skills;
//         $rows[]         =   $users->employee_education;
//         $rows[]         =   $users->employee_past_experience;
//         $rows[]         =   $users->employee_dob!=NULL?date('d-m-Y', strtotime($users->employee_dob)):'';
//         $rows[]         =   $marital;
//         $rows[]         =   $users->employee_address;
//         $rows[]         =   $users->employee_area;
//         $rows[]         =   $users->employee_city_town;
//         $rows[]         =   $users->state['state_name'];
//         $rows[]         =   $users->employee_zipcode;
//         $rows[]         =   $users->country['country_name'];
//         $rows[]         =   $users->employee_reference;
//         $rows[]         =   $users->employee_resigned_date!=NULL?date('d-m-Y', strtotime($users->employee_resigned_date)):'';
//         $rows[]         =   $users->employee_resigned_reason;
//         $rows[]         =   $users->employee_remarks;

//         return $rows;

//     }

//     public function query()
//     {
//         $query = user::where('company_id',Auth::user()->company_id)->where('deleted_at','=',NULL)->where('is_master',0);

//         /////////// Employee Name Search Start
//         if($this->employeeName!='')
//         {
//             $nameExplode        =   explode(' ',$this->employeeName);
//             if(strpos($this->employeeName, ' ') !== false)
//             {

//                 $query->whereRaw('employee_firstname LIKE "%'.$nameExplode[0].'%"');

//                 if($nameExplode[1]!='')
//                 {
//                     $query->whereRaw('employee_middlename LIKE "%'.$nameExplode[1].'%"');
//                 }

//                 if($nameExplode[2]!='')
//                 {
//                     $query->whereRaw('employee_lastname LIKE "%'.$nameExplode[2].'%"');
//                 }
//             }
//             else
//             {
//                 $query->whereRaw('employee_firstname LIKE "%'.$this->employeeName.'%"')
//                     ->orwhereRaw('employee_middlename LIKE "%'.$this->employeeName.'%"')
//                     ->orwhereRaw('employee_lastname LIKE "%'.$this->employeeName.'%"');
//             }
//         }

//         /////////// Employee Mobile Search Start
//         if($this->mobileNo!='')
//         {
//             $query->whereRaw("employee_mobileno LIKE '%$mobileNo%'");

//         }

//         /////////// Employee Employee Code Search Start
//         if($this->empCode!='')
//         {
//             $query->whereRaw("employee_code LIKE '%$empCode%'");
//         }

//         /////////// Employee Employee Designation Search Start
//         if($this->empDesignation!='')
//         {
//             $query->whereRaw("employee_designation LIKE '%$empDesignation%'");
//         }

//         /////////// Employee status Search Start
//         if($this->radioValue!='')
//         {
//             $query->where('is_active','=',$this->radioValue);
//         }

//         // $query->with('state','country');

//         $users     =   $query->orderBy('user_id', 'DESC');
//         // dd($users); exit;
//         // echo '<pre>';
//         // print_r($users); exit;
//         return $users;
//     }
// }

