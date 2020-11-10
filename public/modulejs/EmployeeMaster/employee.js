$("#employee_joiningdate").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom",
    todayHighlight: true,
    autoclose: true
});

$("#employee_dob").datepicker({
    format: 'dd-mm-yyyy',
    todayHighlight: true,
    orientation: "bottom",
    autoclose: true
});

$("#employee_resigned_date").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom",
    todayHighlight: true,
    autoclose: true
});

$('#country_id').change(function(e)
{
    var country_id      =   $('#country_id').val();
    if(Number(country_id)!='102')
    {
        $('#state_id').prop('selectedIndex',0);
    }
});

// function addnewRole()
// {
//     $("#myModaladdnewRole").modal('show');
// }

function addnewEmployee()
{
    
    //$("#addnewEmployee").modal('show');
    $('#employee_form').trigger("reset");
    $('.loginData').html('');
    $('#user_id_').val('');
    $('.adminPassBox').hide();
    $('.PasswordLabel').html('Set Password?');
    $('.loginYesNo').hide();

    $('#addnewEmployee').removeClass('fade');

    $('.modal-title').html('Add New Employee');

    $('.employeePicture').html('Add Profile Picture<br><input type="file" class="" id="employee_picture" name="employee_picture" accept=".jpeg, .jpg, .png, .gif" autocomplete="off"><small>Max Image Size: <b>2mb.</b><br>Accepted Formats: <b>.jpeg, .jpg, .png, .gif</b></small><input type="hidden" name="chkPicture" id="chkPicture" value="" />');

        setTimeout(function(){
$(".alertStatus").val(0);
},320)

        // return false;
}

// function addnewRole()
// {
//     $('#roleForm').trigger("reset");
//     $('.roleForm').html('');
// }


$("input[class='employee_login']").click(function(e)
{

    // if($('#user_id_').val()=='')
    // {

        if($('#user_id_').val()=='')
        {
            $('.adminPassBox').hide();
            $('.loginYesNo').addClass('col-md-3');

            if($("input[class='employee_login']").prop('checked') == true)
            {
                $('.loginYesNo').show();
                $('.loginData').show();
                var email   =   $('#email').val();
                if(email!='')
                {
                    $('.loginData').html('<br><small style="color:blue"><b>' +email+ '</b> will be your <b>USERNAME</b> for software login</small>');
                }
            }
            else
            {
                $('.loginYesNo').hide();
                $('.loginData').hide();
                $('#password').val('');
                $('#encrypt_password').val('');
                $('#adminpassword').val('');
                $('#employee_role_id_').prop('selectedIndex',0);
            }
        }
        else
        {

            $('.abcX').removeClass('col-md-3');
            $('.extraeye').hide();

            if($("input[class='employee_login']").prop('checked') == true)
            {
                $('.loginYesNo').show();
                $('.adminPassBox').show();
                $('.loginData').show();
                var email   =   $('#email').val();
                if(email!='')
                {
                    $('.loginData').html('<br><small style="color:blue"><b>' +email+ '</b> will be your <b>USERNAME</b> for software login</small>');
                }
            }
            else
            {
                $('.loginYesNo').hide();
                $('.loginData').hide();
                $('.adminPassBox').hide();

                $('#password').val('');
                $('#encrypt_password').val('');
                $('#adminpassword').val('');
                $('#employee_role_id_').prop('selectedIndex',0);
            }
        }
    // }
});

$("#employeeName").keyup(function ()
{

    jQuery.noConflict();
    if($("#employeeName").val().length >= 1) {

        $("#employeeName").autocomplete({
            autoFocus: true,
            minLength: 1,
            source: function (request, response) {
                var url = "employeeName_search";
                var type = "POST";
                var dataType = "";
                var data = {
                    'search_val': $("#employeeName").val()
                };
                callroute(url, type,dataType, data, function (data) {


                    var searchdata = JSON.parse(data, true);
                    var html = '';
                    if (searchdata['Success'] == "True") {

                        var result = [];
                        searchdata['Data'].forEach(function (value) {
                            var name    =   value.employee_firstname +' '+ value.employee_middlename +' '+ value.employee_lastname;
                             result.push({label:name, value:name,id:value.user_id });
                        });
                        response(result);

                    }
                });
            },
            select: function (event, ui) {
                var id = ui.item.id;
            }
        });
    }
    else
    {
            $("#employeeName").empty();
    }

});

$("#mobileNo").keyup(function ()
{

    jQuery.noConflict();
    if($("#mobileNo").val().length >= 1) {

        $("#mobileNo").autocomplete({
            autoFocus: true,
            minLength: 1,
            source: function (request, response) {
                var url = "employee_mobile_search";
                var type = "POST";
                var dataType = "";
                var data = {
                    'search_val': $("#mobileNo").val()
                };
                callroute(url, type,dataType, data, function (data) {


                    var searchdata = JSON.parse(data, true);
                    var html = '';
                    if (searchdata['Success'] == "True") {

                        var result = [];
                        searchdata['Data'].forEach(function (value) {
                            var datanew    =   value.employee_mobileno;
                            result.push({label:datanew, value:datanew,id:value.user_id });
                        });
                        response(result);

                    }
                });
            },
            select: function (event, ui) {
                var id = ui.item.id;
            }
        });
    }
    else
    {
            $("#mobileNo").empty();
    }

});


$("#empCode").keyup(function ()
{

    jQuery.noConflict();
    if($("#empCode").val().length >= 1) {

        $("#empCode").autocomplete({
            autoFocus: true,
            minLength: 1,
            source: function (request, response) {
                var url = "employee_code_search";
                var type = "POST";
                var dataType = "";
                var data = {
                    'search_val': $("#empCode").val()
                };
                callroute(url, type,dataType, data, function (data) {


                    var searchdata = JSON.parse(data, true);
                    var html = '';
                    if (searchdata['Success'] == "True") {

                        var result = [];
                        searchdata['Data'].forEach(function (value) {
                            var datanew    =   value.employee_code;
                            result.push({label:datanew, value:datanew,id:value.user_id });
                        });
                        response(result);

                    }
                });
            },
            select: function (event, ui) {
                var id = ui.item.id;
            }
        });
    }
    else
    {
            $("#empCode").empty();
    }

});

$("#empDesignation").keyup(function ()
{

    jQuery.noConflict();
    if($("#empDesignation").val().length >= 1) {

        $("#empDesignation").autocomplete({
            autoFocus: true,
            minLength: 1,
            source: function (request, response) {
                var url = "employee_designation_search";
                var type = "POST";
                var dataType = "";
                var data = {
                    'search_val': $("#empDesignation").val()
                };
                callroute(url, type,dataType, data, function (data) {


                    var searchdata = JSON.parse(data, true);
                    var html = '';
                    if (searchdata['Success'] == "True") {

                        var result = [];
                        searchdata['Data'].forEach(function (value) {
                            var datanew    =   value.employee_designation;
                            result.push({label:datanew, value:datanew,id:value.user_id });
                        });
                        response(result);

                    }
                });
            },
            select: function (event, ui) {
                var id = ui.item.id;
            }
        });
    }
    else
    {
            $("#empDesignation").empty();
    }

});


$('#SearchEmployeeData').click(function(e)
{

    var employeeName           =    $('#employeeName').val();
    var mobileNo               =    $('#mobileNo').val();
    var empCode                =    $('#empCode').val();
    var empDesignation         =    $('#empDesignation').val();
    var radioValue             =    $("input[name='statusType']:checked").val();
    var search_store_id        =    $('#search_store_id').val();

    if(search_store_id!='')
    {
        $('.searchStoreName').show();
    }
    else
    {
        $('.searchStoreName').hide();
    }

    $('.storeList').hide();

    if(radioValue==undefined)
    {
        radioValue  =   ''
    }
    else
    {
        radioValue  =   radioValue;
    }

    var fetch_data_url  =   'searchEmployeeResult';

    $('.loaderContainer').show();

    employee_data(fetch_data_url,employeeName,mobileNo,empCode,empDesignation,radioValue,search_store_id);


});

function employee_data(fetch_data_url,employeeName,mobileNo,empCode,empDesignation,radioValue,search_store_id)
{
    $.ajax({
        url:fetch_data_url,

        data: {
            employeeName:employeeName,
            mobileNo:mobileNo,
            empCode:empCode,
            empDesignation:empDesignation,
            radioValue:radioValue,
            search_store_id:search_store_id
        },
        success:function(data)
        {
            console.log(data);
            $('.loaderContainer').hide();
            // $('html, body').animate({ scrollTop: $("#barcodeTotalQty_text").offset().top }, 2000);
            $('tbody#employeesearchResult').html('');
            $('tbody#employeesearchResult').html(data);

        }
    })
}

$('#emp_id_no').change(function(e)
{
    var emp_id_no   =   $('#emp_id_no').val();

    if(emp_id_no!='')
    {
        $('#employee_id_image').css('border','1px solid #ff0000');
    }
    else if(emp_id_no=='')
    {
        $('#employee_id_image').css('border','0px solid #ff0000');
    }
})

// $("body").on("submit", "#employee_form", function (event)
$('#employee_form').on('submit', function(event)
{
    event.preventDefault();

    var error = 0;
    if($('#employee_firstname').val()=='')
    {
        error = 1;
        toastr.error("employee first name is required");
        $('#employee_firstname').focus();
        return false;
    }

    if($('#employee_lastname').val()=='')
    {
        error = 1;
        toastr.error("employee last name is required");
        $('#employee_lastname').focus();
        return false;
    }

    if($('#email').val()=='')
    {
        error = 1;
        toastr.error("email address is required");
        $('#email').focus();
        return false;
    }
    else
    {
        // if(!validateEmail($('#email').val()))
        // {
        //     error = 1;
        //     toastr.error("invalid email address");
        //     return false;
        // }
    }

    if($('#employee_mobileno').val()=='')
    {
        error = 1;
        toastr.error("Mobile No. is required");
        $('#employee_mobileno').focus();
        return false;
    }

    


    if($('#user_id_').val()=='')
    {
        if($("input[name='employee_login']").prop('checked') == true)
        {
            if($('#password').val()=='')
            {
                error = 1;
                toastr.error("password is required");
                $('#password').focus();
                return false;
            }

            if($('#encrypt_password').val()=='')
            {
                error = 1;
                toastr.error("confirm password is required");
                $('#encrypt_password').focus();
                return false;
            }

            if($('#password').val()!=$('#encrypt_password').val())
            {
                error = 1;
                toastr.error("password not matched");
                $('#password').focus();
                return false;
            }

            if($('#employee_role_id_').val()=='')
            {
                error = 1;
                toastr.error("Permission is required");
                $('#password').focus();
                return false;
            }
        }
    }
    else if($('#user_id_').val()!='')
    {
       if($("input[name='employee_login']").prop('checked') == true)
        {
            if($('#password').val()=='')
            {
                error = 1;
                toastr.error("password is required");
                $('#password').focus();
                return false;
            }

            if($('#encrypt_password').val()=='')
            {
                error = 1;
                toastr.error("confirm password is required");
                $('#encrypt_password').focus();
                return false;
            }

            if($('#password').val()!=$('#encrypt_password').val())
            {
                error = 1;
                toastr.error("password not matched");
                $('#password').focus();
                return false;
            }

            if($('#adminpassword').val()=='')
            {
                error = 1;
                toastr.error("admin password is required");
                $('#adminpassword').focus();
                return false;
            }

            if($('#employee_role_id_').val()=='')
            {
                error = 1;
                toastr.error("Permission is required");
                $('#password').focus();
                return false;
            }
        }
    }

    if(error == 1)
    {
        return false;
    }
    else
    {
      

            $.ajaxSetup({
                headers : { "X-CSRF-TOKEN" :jQuery(`meta[name="csrf-token"]`). attr("content")}
            });

            $.ajax({
                url: "employee_form_create",
                method: "POST",
                data: new FormData(this),
                dataType: 'JSON',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data)
                {

                     if(data['Success'] == "True")
                     {
                        toastr.success(data['Message']);
                        $("#company_profile_id").val(data['company_profile_id']);
                        if(data['url']!='')
                        {
                           window.location = data['url'];
                        }

                     }
                     else
                     {
                        if(data['status_code'] == 409)
                        {
                           
                           $.each(data['Message'],function (errkey,errval)
                           {
                              var errmessage = errval;
                              toastr.error(errmessage[0]);
                           });
                        }
                        else if(data['status_code'] == 410)
                        {
                            toastr.error(data['Message']);
                        }
                        else
                        {
                           toastr.error(data['Message']);
                        }
                     }
                }

            });
    }

});

function changeStatus(val,status)
{
    var fetch_data_url  =   'changeStatus';
    $('.loaderContainer').show();
    $.ajax({
        url:fetch_data_url,
        data: {
            user_id:val,
            is_active: status
        },
        success:function(data)
        {
            var searchdata = JSON.parse(data, true);
            $('.loaderContainer').hide();

            if(Number(searchdata['status'])==1)
            {
                $('#status'+Number(searchdata['user_id'])).html('Active');
                $('#status'+Number(searchdata['user_id'])).removeClass('RedBackground');
                $('#status'+Number(searchdata['user_id'])).addClass(searchdata['class']);
            }
            else
            {
                $('#status'+Number(searchdata['user_id'])).html('Inactive');
                $('#status'+Number(searchdata['user_id'])).removeClass('GreenBackground');
                $('#status'+Number(searchdata['user_id'])).addClass(searchdata['class']);
            }
        }
    })
}

$(document).on('click', '#exportEmployeedata', function(){

    var query = {
        employeeName: $('#employeeName').val(),
        mobileNo : $('#mobileNo').val(),
        empCode: $('#empCode').val(),
        empDesignation: $('#empDesignation').val(),
        radioValue : $("input[name='statusType']:checked").val()
    }


    var url = "exportemployee_details?" + $.param(query)
    window.open(url,'_blank');

});

function formatDate(date) {
     var d = new Date(date),
         month = '' + (d.getMonth() + 1),
         day = '' + d.getDate(),
         year = d.getFullYear();

     if (month.length < 2) month = '0' + month;
     if (day.length < 2) day = '0' + day;

     return [day, month, year].join('-');
 }

function editEmployee(user_id)
{
    $("#myModal").modal('show');
    $('#user_id_').val(user_id);
    var fetch_data_url  =   'editEmployee';
    $('.loaderContainer').show();
    $('.loginYesNo').hide();
    $('.adminPassBox').hide();
    $('input[name="employee_login"]').prop('checked', false);

    $('.PasswordLabel').html('Set / Change Password?');

    $.ajax({
        url:fetch_data_url,
        data: {
            user_id:user_id,
        },
        success:function(data)
        {
            var searchdata = JSON.parse(data, true);
            $('.loaderContainer').hide();
            console.log(searchdata);
            var data  =   searchdata['Data'][0];

            $('.modal-title').html('Edit Employee');

            $('#employee_firstname').val(data['employee_firstname']);
            $('#employee_middlename').val(data['employee_middlename']);
            $('#employee_lastname').val(data['employee_lastname']);
            $('#employee_code').val(data['employee_code']);
            $('#email').val(data['email']);
            $('#employee_mobileno').val(data['employee_mobileno']);
            $('#employee_joiningdate').val(formatDate(data['employee_joiningdate']));
            
            $('#employee_dob').val(data['employee_dob']!=null?formatDate(data['employee_dob']):'');
            $('#employee_address').val(data['employee_address']);
            $('#employee_area').val(data['employee_area']);
            $('#employee_city_town').val(data['employee_city_town']);
            $('#employee_zipcode').val(data['employee_zipcode']);
           
            $('#is_master').val(data['is_master']);

            $('#company_id_').val(data['company_id']);
            $('#store_id_').val(data['store_id']);

            $('#emp_role_id').val(data['employee_role_id']);

            $('#store_id option[value='+data['store_id']+']').attr('selected','selected');
            $('#store_id').val(data['store_id']);

            $('#old_password_').val(data['encrypt_password']);
            $('#old_encrypt_password_').val(data['encrypt_password']);
            //$('#state_id option:eq('+data['state_id']+')').prop('selected', true);
            $('#state_id option[value='+data['state_id']+']').prop('selected', true);

            if(data['employee_role_id']!=null)
            {
                $('#employee_role_id_ option:eq('+data['employee_role_id']+')').prop('selected', true);
            }
            else
            {
                $('#employee_role_id_').prop('selectedIndex',0);
            }

            $('#country_id option:eq('+data['country_id']+')').prop('selected', true);

            


            if(Number(data['discount_on_billing'])==1)
            {
                $('#discount_val_on_billing').show();
                $('input[name="discount_on_billing"]').prop('checked', true);
            }
            else
            {   
                $('input[name="discount_on_billing"]').prop('checked', false);
            }

            $('#discount_val_on_billing').val(data['discount_val_on_billing']);

            if(Number(data['delete_kot'])==1)
            {
                $('input[name="delete_kot"]').prop('checked', true);
            }
            else
            {   
                $('input[name="delete_kot"]').prop('checked', false);
            }

            if(Number(data['transfer_kot'])==1)
            {
                $('input[name="transfer_kot"]').prop('checked', true);
            }
            else
            {   
                $('input[name="transfer_kot"]').prop('checked', false);
            }

            if(Number(data['reprint_bill'])==1)
            {
                $('input[name="reprint_bill"]').prop('checked', true);
            }
            else
            {   
                $('input[name="reprint_bill"]').prop('checked', false);
            }

           
            
            

            

            $('.loginData').html('');

          

        }
    })
}

function removePicture(user_id)
{
    var fetch_data_url  =   'removePicture';
    $('.loaderContainer').show();
    $.ajax({
        url:fetch_data_url,
        data: {
            user_id:user_id,
        },
        success:function(data)
        {
            var searchdata = JSON.parse(data, true);
            $('.loaderContainer').hide();
            // console.log(searchdata);

            toastr.success(searchdata['Message']);

            if(searchdata['picture']=='empty')
            {
                $('.employeePicture').html('Add Profile Picture<br><input type="file" class="" id="employee_picture" name="employee_picture" accept=".jpeg, .jpg, .png, .gif" autocomplete="off"><small>Max Image Size: <b>2mb.</b><br>Accepted Formats: <b>.jpeg, .jpg, .png, .gif</b></small><input type="hidden" name="chkPicture" id="chkPicture" value="" />');
            }

        }
    })
}

function removeIDPicture(user_id)
{
    var fetch_data_url  =   'removeIDPicture';
    $('.loaderContainer').show();
    $.ajax({
        url:fetch_data_url,
        data: {
            user_id:user_id,
        },
        success:function(data)
        {
            var searchdata = JSON.parse(data, true);
            $('.loaderContainer').hide();
            // console.log(searchdata);

            toastr.success(searchdata['Message']);

            if(searchdata['picture']=='empty')
            {
                $('.employeeIDPicture').html('Select ID Picture<br><input type="file" class="" id="employee_id_image" name="employee_id_image" accept=".jpeg, .jpg, .png, .gif" autocomplete="off"><small>Max Image Size: <b>2mb.</b><br>Accepted Formats: <b>.jpeg, .jpg, .png, .gif</b></small><input type="hidden" name="chkID" id="chkID" value="" />');
            }

        }
    })
}

function deleteEmp(user_id)
{
    var r = confirm("are you sure you want to delete this employee?");

    if (r == true)
    {
        var fetch_data_url  =   'deleteEmployee';
        $('.loaderContainer').show();
        $.ajax({
            url:fetch_data_url,
            data: {
                user_id:user_id,
            },
            success:function(data)
            {
                var searchdata = JSON.parse(data, true);
                $('.loaderContainer').hide();
                console.log(searchdata);

                toastr.success(searchdata['Message']);
                if(searchdata['url']!='')
                {
                   window.location = searchdata['url'];
                }
            }
        })
    }
    else
    {
        return false;
    }
}

function showResume(user_id)
{
    $("#myModalResume").modal('show');

    var permission_edit         =   $('#permission_edit').val();
    var permission_delete       =   $('#permission_delete').val();

    var fetch_data_url  =   'showResume';
    $('.loaderContainer').show();
    $.ajax({
        url:fetch_data_url,
        data: {
            user_id:user_id,
        },
        success:function(data)
        {
            var searchdata = JSON.parse(data, true);
            $('.loaderContainer').hide();
            console.log(searchdata);

            var data  =   searchdata['Data'][0];

            $('#emp_dob').html('');
            $('#emp_code').html('');
            $('#emp_email').html('');
            $('#emp_mobile').html('');
           
            $('#emp_joining').html('');
           
            $('#emp_address').html('');
            $('#emp_area').html('');
            $('#emp_city').html('');
            $('#emp_state').html('');
            $('#emp_country').html('');
            $('#emp_postal').html('');
         


            $('#employeeFullname').html(data['employee_firstname']+' '+data['employee_middlename']+' '+data['employee_lastname']);
            $('#emp_name').html(data['employee_firstname']+' '+data['employee_middlename']+' '+data['employee_lastname']);

            if(data['employee_role_id']!=null)
            {
                $('#employeeRoleBadge').html(data['employee_role']['role_name']);
            }

            $('#emp_dob').html(data['employee_dob']!=null?formatDate(data['employee_dob']):'');
            $('#emp_code').html(data['employee_code']);
            $('#emp_email').html(data['email']);
            $('#emp_mobile').html(data['employee_mobileno']);
            
            $('#emp_joining').html(data['employee_joiningdate']!=null?formatDate(data['employee_joiningdate']):'');
            $('#emp_address').html(data['employee_address']);
            $('#emp_area').html(data['employee_area']);
            $('#emp_city').html(data['employee_city_town']);

            if(data['state_id']!=null)
            {
                $('#emp_state').html(data['state']['state_name']);
            }

            if(data['country_id']!=null)
            {
                $('#emp_country').html(data['country']['country_name']);
            }

            $('#emp_postal').html(data['employee_zipcode']);
           


            if(Number(permission_edit)!=1)
            {
                var edit    =   '';
            }
            else
            {
                var edit    =   '<button class="btn btn-icon btn-icon-only ma-0 btn-secondary btn-icon-style-4" onclick="changePassword('+data['user_id']+')" title="Change Password"><i class="fa fa-lock"></i></button><button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="editEmployee('+data['user_id']+')" title="edit employee"><i class="fa fa-pencil"></i></button>';
            }

            if(Number(permission_delete)!=1)
            {
                var del     =   '';
            }
            else
            {
                var del     =   '<button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="deleteEmp('+data['user_id']+')" title="delete employee"><i class="fa fa-trash"></i></button>';
            }

            $('.ShowActionButtons').html(action+edit+del);

        }
    })
}

function validateRole()
{
    var password    =   $('#password').val();
    if(password!='')
    {
        $('#employee_role_id_').addClass('invalid');
    }
}

function changePassword(user_id)
{
    $("#myModalnewPassword").modal('show');
    $('#password_employee_id').val(user_id);
    $('#new_password_employee_id').val(user_id);

    var url = "showEmpName";
    var type = "POST";
    var dataType = "";
    var data = {
        "user_id": user_id,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        console.log(searchdata);
        var firstname   =   searchdata['Data'][0]['employee_firstname'];
        var middlename  =   searchdata['Data'][0]['employee_middlename'];
        var lastname    =   searchdata['Data'][0]['employee_lastname'];

        $('.EmpNamePassword').html(firstname +' '+ middlename +' '+ lastname);
        //.EmpNamePassword
    })
}

$('#changePasswordBtn').click(function(e)
{
    var user_id     =   $('#password_employee_id').val();
    var old_password    =   $('#old_password').val();
    var re_old_password    =   $('#re_old_password').val();
    var new_password    =   $('#new_password').val();
    var admin_password    =   $('#admin_password').val();

    if(old_password=='')
    {
        toastr.error("old password is required");
        $('#old_password').focus();
        return false;
    }
    else if(re_old_password=='')
    {
        toastr.error("re-enter old password is required");
        $('#re_old_password').focus();
        return false;
    }
    else if(old_password!=re_old_password)
    {
        toastr.error("old passwords not matched");
        $('#re_old_password').focus();
        return false;
    }
    else if(new_password=='')
    {
        toastr.error("new password is required");
        $('#new_password').focus();
        return false;
    }
    else if(admin_password=='')
    {
        toastr.error("admin password is required");
        $('#admin_password').focus();
        return false;
    }
    else
    {
        var fetch_data_url  =   'changePassword';
        // $('.loaderContainer').show();
        $.ajax({
            url:fetch_data_url,
            data: {
                user_id:user_id,
                old_password: old_password,
                re_old_password: re_old_password,
                new_password: new_password,
                admin_password: admin_password,
            },
            success:function(data)
            {
                var searchdata = JSON.parse(data, true);
                // $('.loaderContainer').hide();
                console.log(searchdata);

                if(searchdata['Success'] == "True")
                {
                    toastr.success(searchdata['Message']);
                    if(searchdata['url']!='')
                    {
                       window.location = searchdata['url'];
                    }
                }

                if(searchdata['Success'] == "False")
                {
                    toastr.error(searchdata['Message']);
                }

            }
        })
    }
});

$('#CreatePasswordBtn').click(function(e)
{

    var user_id             =   $('#new_password_employee_id').val();
    var new_password        =   $('#new_password_').val();
    var confirm_password    =   $('#confirm_password_').val();
    var admin_password      =   $('#admin_password_').val();

    if(new_password=='')
    {
        toastr.error("new password is required");
        $('#new_password_').focus();
        return false;
    }
    else if(confirm_password=='')
    {
        toastr.error("re-enter password is required");
        $('#confirm_password_').focus();
        return false;
    }
    else if(new_password!=confirm_password)
    {
        toastr.error("passwords not matched");
        $('#confirm_password_').focus();
        return false;
    }
    else if(admin_password=='')
    {
        toastr.error("admin password is required");
        $('#admin_password_').focus();
        return false;
    }
    else
    {
        var fetch_data_url  =   'createPassword';
        // $('.loaderContainer').show();
        $.ajax({
            url:fetch_data_url,
            data: {
                user_id:user_id,
                new_password: new_password,
                confirm_password: confirm_password,
                admin_password: admin_password,
            },
            success:function(data)
            {
                var searchdata = JSON.parse(data, true);
                // $('.loaderContainer').hide();
                console.log(searchdata);

                if(searchdata['Success'] == "True")
                {
                    toastr.success(searchdata['Message']);
                    if(searchdata['url']!='')
                    {
                       window.location = searchdata['url'];
                    }
                }

                if(searchdata['Success'] == "False")
                {
                    toastr.error(searchdata['Message']);
                }

            }
        })
    }
});

function selectStore()
{
    var store_id    =   $('#store_id').val();

    var url = "selectStore";
    var type = "POST";
    var dataType = "";
    var data = {
        "store_id": store_id,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        console.log(searchdata);
        
        var company_id_     =   searchdata['Data']['company_id'];
        $('#company_id_').val(company_id_);
        $('#store_id_').val(store_id);
    })

}
