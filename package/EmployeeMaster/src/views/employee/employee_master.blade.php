@include('pagetitle')
@extends('master')

@section('main-hk-pg-wrapper')

<?php
    // if(sizeof($roles)==0)
    // {
    //     $onclick    =   'AlertnewEmployee()';
    //     ?>
         <script type="text/javascript">
    //     function AlertnewEmployee()
    //     {
    //         toastr.error("please create employee permission first");
    //     }
    //     </script>
         <?php
    // }
    // else
    // {
    //     $onclick    =   'addnewEmployee()';
    // }

         $onclick    =   'addnewEmployee()';
?>

<style type="text/css">
    .table th, .table td {
    padding: 6px 8px !important;
}

.modal-body {
    max-height: auto !important;
}
    
</style>

<link rel="stylesheet" href="{{URL::to('/')}}/public/template/bootstrap-datepicker/css/bootstrap-datepicker.css">

<br clear="all" />
<br clear="all" />
<div id="content">
  <div id="content-header">
    @include('breadcrumbs')
    
    <h1>Employee Master</h1>
  </div>

<div class="container-fluid">
    <div class="row-fluid">


<!-- <span class="commonbreadcrumbtn badge exportBtn badge-pill label-success" id="exportEmployeedata"><i class="ion ion-md-download"></i>&nbsp;Download Employee Data</span> -->

<a href="#myModaladdnewRole" data-toggle="modal" class="addnewRole btn btn-success ">New Permission</a>

<a href="#myModal" data-toggle="modal" class="btn btn-success AddNewEmpBtn">Add New Employee</a>

<!-- <span class="commonbreadcrumbtn badge badge-primary badge-pill AddNewEmpBtn" onclick="{{$onclick}}"><i class="glyphicon glyphicon-plus"></i>&nbsp;Add New Employee</span> -->

<!-- <span class="commonbreadcrumbtn badge badge-danger badge-pill" id="searchCollapse"><i class="glyphicon glyphicon-search"></i>&nbsp;Search</span> -->

<input type="hidden" id="permission_edit" value="<?php echo $role_permissions['permission_edit']?>" />
    <input type="hidden" id="permission_delete" value="<?php echo $role_permissions['permission_delete']?>" />

  <div class="widget-box">
      
          <div class="widget-content nopadding">


            <table class="table tablesaw table-bordered table-hover table-striped mb-0 font14"   data-tablesaw-sortable data-tablesaw-minimap data-tablesaw-mode-switch>
                                <thead >
                                    <tr class="blue_Head">
                                        <th class="">&nbsp;&nbsp;Action</th>
                                        <th class="pa-10 leftAlign">Name</th>
                                        <th class="leftAlign">Mobile No.</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th class="leftAlign">Permission&nbsp;&nbsp;</th>
                                        <th class="center">Joining Date</th>
                                        <th class="center">Status</th>

                                    </tr>
                                </thead>
                                <tbody id="employeesearchResult">
                                    @include('employee::employee/view_employee_data')
                                </tbody>
                            </table>
          </div>
        </div>





    </div></div>


    <!-- Add New Employee -->
<!-- <div class="modal fade" id="addnewEmployee" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Add New Employee</h5>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body" style="">
            

            </div>
            <div class="modal-footer">
                <div class="span6">

                </div>
                
            </div>
             </form>
        </div>
    </div>
</div> -->
<!-- Add New Employee -->



<div id="myModal" class="modal hide width90" aria-hidden="true" style="display: none;">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Add New Employee</h3>
              </div>
              <div class="modal-body">
                <form name="employee_form" id="employee_form" method="post" enctype="multipart/form-data">
                <input type="hidden" name="user_id" id="user_id" value="">
                <meta name="csrf-token" content="{{ csrf_token() }}" />
                <div class="row">
                    <div class="span3">
                        First Name<br>
                        <input type="text" name="employee_firstname" id="employee_firstname" class="form-control form-inputtext invalid width100" autofocus/>
                    </div>
                    <div class="span3">
                        Middle Name<br>
                        <input type="text" name="employee_middlename" id="employee_middlename" class="form-control form-inputtext invalid width100"/>
                    </div>
                    <div class="span3">
                        Last Name / Surname<br>
                        <input type="text" name="employee_lastname" id="employee_lastname" class="form-control form-inputtext invalid width100"/>
                    </div>
                    <div class="span3">
                        Employee Code<br>
                        <input type="text" name="employee_code" id="employee_code" class="form-control form-inputtext width100"/>
                    </div>
                    <div class="span3">
                        Date of Birth<br>
                        <input type="text" name="employee_dob" id="employee_dob" placeholder="DD-MM-YYYY" class="form-control form-inputtext width100"/>
                    </div>
                    <div class="span3">
                        Joining Date<br>
                        <input type="text" name="employee_joiningdate" id="employee_joiningdate" placeholder="DD-MM-YYYY" class="form-control form-inputtext width100"/>
                    </div>

                </div>

                <div class="row">
                    <div class="span3">
                        Email<br>
                        <input type="text" name="email" id="email" class="form-control form-inputtext invalid width100"/>
                    </div>
                    <div class="span3 mobno">
                        Mobile No.<br>
                        <input type="tel" style="width: 100%;" name="employee_mobileno" id="employee_mobileno" maxlength="15" class="form-control form-inputtext invalid mobileregax width100">
                    </div>

                    
                </div>

               

                <div class="row">
                    
                    <div class="span3">
                        Address <small style="font-size:10px">(House No., Building, Street name etc)</small><br>
                        <textarea name="employee_address" id="employee_address" placeholder="Address" class="form-control form-inputtext width100"></textarea>
                    </div>
                    <div class="span3">
                        Area<br>
                        <input type="text" name="employee_area" id="employee_area" class="form-control form-inputtext width100"/>
                    </div>
                    <div class="span3">
                        City / Town<br>
                        <input type="text" name="employee_city_town" id="employee_city_town" class="form-control form-inputtext width100"/>
                    </div>
                    

                </div>

                <div class="row">
                    <div class="span3">
                        Postal / Zip Code<br>
                        <input type="text" name="employee_zipcode" id="employee_zipcode" class="form-control form-inputtext width100"/>
                    </div>
                    <div class="span3">
                        State<br>
                        <select class="form-control form-inputtext width100" name="state_id" id="state_id">
                        <option value=""></option>
                            @foreach($state->sortBy('state_name') AS $state_key=>$state_value)
                                <option value="{{$state_value->state_id}}">{{$state_value->state_name}}</option>
                            @endforeach
                        </select>
                    </div>
                    
                    <div class="span3">
                        Country<br>
                        <select class="form-control form-inputtext width100" name="country_id" id="country_id">
                            <option value=""></option>
                            @foreach($country->sortBy('country_name') AS $country_key=>$country_value)
                                <option
                                <?php if ($country_value['country_id'] == $nav_type[0]['country_id']) echo "selected"  ?> value="{{$country_value->country_id}}">{{$country_value->country_name}}</option>
                            @endforeach
                        </select>
                    </div>
                    

                </div>


            

                <div class="row marginTop10">
                    <div class="span3 RedBackground bold setPasswordDiv">
                        <span class="PasswordLabel">Set Password?</span> <input type="checkbox" name="employee_login" class="employee_login" value="1">
                        <span class="loginData"></span>
                    </div>


                    <div class="span2 loginYesNo abcX" style="display:none;">
                        Password<br>
                        <input type="password" name="password" id="password" onkeyup="validateRole()" class="form-control form-inputtext invalid width100"/>

                    </div>

                    <div class="span2 loginYesNo abcX" style="display:none;">
                        Re-enter Password<br>
                        <input type="password" name="encrypt_password" id="encrypt_password" class="form-control form-inputtext  invalid width100"/>
                        <i class="fa fa-eye cursor eyePassword extraeye"></i>
                    </div>

                    <div class="span2 adminPassBox" style="display:none;">
                        Admin Password<br>
                        <input type="password" name="adminpassword" id="adminpassword" class="form-control form-inputtext  invalid"/>

                        <i class="fa fa-eye cursor eyePassword"></i>
                    </div>

                    <div class="span3 setPasswordDiv loginYesNo" style="display:none;">
                        Select Permission<br>
                        <?php
                        if(sizeof($roles)!=0)
                        {
                            ?>
                            <select name="employee_role_id_" id="employee_role_id_" class="form-control form-inputtext width60">
                            <option value=""></option>
                            @foreach($roles->sortBy('role_name') AS $roleskey=>$rolesvalue)
                            <option value="{{$rolesvalue->employee_role_id}}">{{$rolesvalue->role_name}}</option>
                            @endforeach
                            </select>
                            <?php
                        }
                        ?>
                    </div>
                </div>

                <div class="span6 noMargin marginTop10">
                    <input type="hidden" class="alertStatus" value="0" />
                    <input type="hidden" name="is_master" id="is_master" value="" />
                    <input type="hidden" name="emp_role_id" id="emp_role_id" value="" />
                    <input type="hidden" name="user_id_" id="user_id_" value="" />
                    <input type="hidden" name="company_id_" id="company_id_" value="" />
                    <input type="hidden" name="store_id_" id="store_id_" value="" />

                    <input type="hidden" name="store_module" id="store_module" value="" />
                    <input type="hidden" name="store_user_limit" id="store_user_limit" value="" />
                    <input type="hidden" name="standard_emp_limit" id="standard_emp_limit" value="10" />
                    

                    <input type="hidden" name="old_password_" id="old_password_" class="form-control form-inputtext"/>
                    <input type="hidden" name="old_encrypt_password_" id="old_encrypt_password_" class="form-control form-inputtext"/>
                    <button type="submit" name="saveEmployeeData" id="saveEmployeeData" class="btn btn-primary savebtn"><i class="fa fa-save"></i> Save Employee</button>
                </div>
            </form>
              </div>
            </div>


            <!-- Show Resume -->

    <div id="myModalResume" class="modal hide width50" aria-hidden="true" style="display: none;">
      <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button">×</button>
        <h3><span id="employeeFullname" class="uppercase"></span></h3>
      </div>
            
            <div class="modal-body">

                <table width="100%" border="0" cellpadding="6" cellspacing="2">
                  <tr>
                    
                    <td width="40%" valign="top">
                        <div class="pb-5">Employee Name: <span id="emp_name" class="bold"></span></div>
                        <div class="pb-5">Employee Code: <span id="emp_code" class="bold"></span></div>
                        <div class="pb-5">Email Address: <span id="emp_email" class="bold"></span></div>
                        <div class="pb-5">Mobile No.: <span id="emp_mobile" class="bold"></span></div>                        
                        <div class="pb-5">Date of Birth: <span id="emp_dob" class="bold"></span></div>
                        <div class="pb-5">Joining Date: <span id="emp_joining" class="bold"></span></div>
                    </td>
                    <td width="40%" align="left" valign="top">
                        <div class="pb-5"><div class="pb-5">Address: <span id="emp_address" class="bold"></span></div>
                        <div class="pb-5">Area: <span id="emp_area" class="bold"></span></div>
                        <div class="pb-5">City / Town: <span id="emp_city" class="bold"></span></div>
                        <div class="pb-5">State: <span id="emp_state" class="bold"></span></div>
                        <div class="pb-5">Country: <span id="emp_country" class="bold"></span></div>
                        <div class="pb-5">Postal / ZipCode: <span id="emp_postal" class="bold"></span></div>
                    </td>
                  </tr>
                  <tr>
                    </table>
                   


            </div>

</div>
<!-- Set Role -->
<!-- New Password -->
<div id="myModalnewPassword" class="modal hide width50" aria-hidden="true" style="display: none;">
      <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button">×</button>
        <h3>Create New Password</span></h3>
       </div>
            
            <div class="modal-body">

              <div class="row">
                    <div class="span4">
                        New Password<br>
                        <input type="password" name="new_password_" id="new_password_" class="form-control form-inputtext invalid"/>
                    </div>
                    <div class="span4">
                        Re-enter Password<br>
                        <input type="password" name="confirm_password_" id="confirm_password_" class="form-control form-inputtext invalid"/>
                    </div>
                    <div class="span4">
                        Admin Password<br>
                        <input type="password" name="admin_password_" id="admin_password_" class="form-control form-inputtext invalid"/>
                        <i class="fa fa-eye cursor eyePassword"></i>
                    </div>
                </div>

            </div>
            <div class="modal-footer employeeRoleButton">
                <div class="span6">

                </div>
                <div class="span6" style="text-align:right;">
                    <input type="hidden" name="new_password_employee_id" id="new_password_employee_id" />
                    <button type="button" name="CreatePasswordBtn" id="CreatePasswordBtn" class="btn btn-primary savebtn"><i class="fa fa-save"></i>Create Password</button>
                </div>
            </div>

</div>
<!-- New Password -->
<!-- Set Role -->

    <div id="myModalsetRole" class="modal hide width90" aria-hidden="true" style="display: none;">
          <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button">×</button>
            <h3>Set Employee software permissions</span></h3>
           </div>
            
            <div class="modal-body">

                <small>Change Software Permission:</small>
                <?php
                foreach($roles as $k=>$val)
                {
                    ?>
                    <span class="badge badge-secondary mt-15 mr-0 cursor roleBadge" id="roleBadge{{$val->employee_role_id}}" onclick="showPermissions({{$val->employee_role_id}})">{{$val->role_name}}</span>
                    <?php
                }
                ?>

                <button type="button" name="ApplyRoletoEmployee" id="ApplyRoletoEmployee" class="btn btn-primary mb-20 mt-0 savebtn pull-right employeeRoleButton ApplyRoletoEmployee" style="display:none; margin-top:-8px !important;"><i class="fa fa-save"></i>Apply Permission</button>

                <hr class="pa-0 ma-0 mt-10 employeeRoleButton" style="display:none" />

                <div class="row rolePermissions">

                </div>

            </div>
            <div class="modal-footer employeeRoleButton" style="display:none">
                <div class="span6">

                </div>
                <div class="span6" style="text-align:right;">
                    <input type="hidden" name="role_id" id="role_id" />
                    <input type="hidden" name="employee_id" id="employee_id" />
                    <button type="button" name="ApplyRoletoEmployee" id="ApplyRoletoEmployee" style="display:none;" class="btn btn-primary savebtn employeeRoleButton ApplyRoletoEmployee"><i class="fa fa-save"></i>Apply Permission</button>
                </div>
            </div>

</div>
<!-- Set Role -->

<!-- Add New Role -->

   <div id="myModaladdnewRole" class="modal hide width90" aria-hidden="true" style="display: none;">
          <div class="modal-header">
            <button data-dismiss="modal" class="close" type="button">×</button>
            <h3>New Permission</span></h3>
           </div>
            <form method="post" id="roleForm" name="roleForm" class="font13">
            <div class="modal-body">
              
                <meta name="csrf-token" content="{{ csrf_token() }}" />  

                <div class="row">
                    <div class="span5 pa-0 ma-0">
                        Permission Name <input type="text" name="role_name" id="role_name" class="form-control form-inputtext invalid" style="margin-bottom:5px !important;"/>
                        <input type="hidden" name="editEnable" id="editEnable" value="" /><br>
                        <small class="pb-10 ma-0"><i>Note: type the <b><u>Permission Name</u></b> and then press tab key <img src="{{URL::to('/')}}/public/images/tab.jpg" title="tab" width="50" class="blinking" /> to enable the permission section.</i></small>
                    </div>
                    <div class="span1 pa-0 ma-0"></div>
                    <div class="span6 pa-0 ma-0">

                        <?php
                        if(sizeof($roles))
                        {
                            ?>
                            <br clear="all" /> <small>Created Permissions:</small>
                            <?php
                            foreach($roles as $k=>$val)
                            {
                                ?>
                                <span class="badge badge-secondary mt-15 mr-0 cursor roleBadge_" id="roleBadge_{{$val->employee_role_id}}" onclick="editPermission('{{$val->employee_role_id}}')" title="Edit Permissions">{{$val->role_name}} <i class="fa fa-pencil"></i></span>
                                <?php
                            }
                        }
                        ?>
                    </div>
                </div>

                <hr class="pa-0 ma-0 mt-10 enableRole" style="display:none" />

                <div class="span12 pa-0 ma-0 roleForm">

                </div>



            </div>
            <div class="modal-footer enableRole" style="display:none">
                <div class="span6">

                </div>
                <div class="span6" style="text-align:right;">
                    <input type="hidden" class="alertStatus" value="0" />
                    <input type="hidden" name="employee_role_id" id="employee_role_id" />
                    <button type="button" name="saveEmployeeRole" id="saveEmployeeRole" class="btn btn-primary savebtn"><i class="fa fa-save"></i>Create Permission</button>
                </div>
            </div>

       
        </form>
    
</div>
<!-- Add New Role -->
<script src="{{ asset('public/js/jquery-1.11.1.min.js') }}"></script> 

<script type="text/javascript">
        $(document).ready(function(e){
            $('#searchCollapse').click(function(e){
                $('#searchbox').slideToggle();
            })

            $('#discount_on_billing').click(function(e)
            {
                if($('input[name="discount_on_billing"]').is(':checked'))
                {
                    $('#discount_val_on_billing').show();
                    $('#discount_val_on_billing').focus();
                }
                else
                {
                    // $('#discount_val_on_billing').val('');
                    $('#discount_val_on_billing').hide();
                }
            });

        })

  
        
        </script>

        <script type="text/javascript">
        //     CKEDITOR.replace('edit_template_data', {
        //     height: ['150px']
        // });
        //     CKEDITOR.replace('template_data', {
        //     height: ['150px']
        // });
        //     CKEDITOR.config.allowedContent = true;
        </script>
         <script type="text/javascript" src="{{URL::to('/')}}/public/js/datepicker.js"></script>
        <script src="{{URL::to('/')}}/public/modulejs/EmployeeMaster/employee.js"></script>
        <script src="{{URL::to('/')}}/public/modulejs/EmployeeMaster/employee_role.js"></script>
         <!-- <script type="text/javascript" src="{{URL::to('/')}}/public/template/jquery-ui/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="{{URL::to('/')}}/public/template/popper.js/js/popper.min.js"></script>
        <script type="text/javascript" src="{{URL::to('/')}}/public/template/bootstrap/js/bootstrap.min.js"></script> -->
@endsection

