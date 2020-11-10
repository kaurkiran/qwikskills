$("input").attr("autocomplete", "off");

function showHodTables()
{
    $('.tablesWithData').hide();
    $('.hodtablesWithData').show();
}

function showMainTables()
{
    $('.tablesWithData').show();
    $('.hodtablesWithData').hide();
}

function closeTheDay(openingDate)
{

    var errmsg = "Are You Sure want to close "+openingDate+" day?";
    swal({
        title: errmsg,
        type: "warning",
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Yes!",
        showCancelButton: true,
        closeOnConfirm: true,
        closeOnCancel: true
    },

    function (isConfirm)
    {
        if (isConfirm)
        {
            var  url = "closeTheDay";
            var type = "POST";
            var dataType = "";
            var data = {
                'openingDate' : openingDate,
            };  

            $('#closingBtn').html('<i class="fa fa-spinner fa-spin"></i> please wait...');

            callroute(url,type,dataType,data,function (data)
            {
                var dta = JSON.parse(data);
                if (dta['Success'] == "True")
                {
                    toastr.success(dta['Message']);
                    $('#toast-container').delay(3000).fadeOut();
                    var url = '';
                    if(dta['url'] != '' && dta['url'] != 'undefined')
                    {
                         url = dta['url'];
                    }
                   
                    window.location.href = url;
                }
                else
                {
                    toastr.error(dta['Message']);
                }
                
            });
        }
        else
        {
            return false;
        }
    })
}

function opentable(tableno,sales_bill_id,tablename)
{
   if(Number(sales_bill_id) !=0)
   {
            var  url = "edit_bill";
            var type = "POST";
            var dataType = "";
            var data = {
                'bill_id' : sales_bill_id,
            };

            callroute(url,type,dataType,data,function (data) {
                var dta = JSON.parse(data);
                if (dta['Success'] == "True")
                {
                    var url = '';
                    if(dta['url'] != '' && dta['url'] != 'undefined')
                    {
                         url = dta['url'];
                    }
                   localStorage.setItem('edit_bill_record',JSON.stringify(dta['Data']));

                    window.location.href = url;



                }
                else
                {
                    toastr.error(dta['Message']);
                }
                
            });
   } 
   else
   {

             var data = {
                'tableno' : tableno,
                'tablename' : tablename,
                'sales_type' : 1
            };        
            localStorage.setItem('make_bill_record',JSON.stringify(data));
            window.location.href = 'sales_bill';
   } 
        
}
    

function showGraph(val)
{  
    var fetch_data_url  =   'graph_values';

    $.ajax({
        url:fetch_data_url,
        data: {
            month:val,
        },
        success:function(data)
        {
            var response = JSON.parse(data, true);

            var days_    =  response['days'];
            var daySales_    =  response['daySales'];

            var days    =   [];

            var numbersDays = days_.split(',');
            $.each(numbersDays, function(index, value) {
                days.push(value);
            });

            var daySales    =   [];
            var numbersDaysale = daySales_.split(',');
            $.each(numbersDaysale, function(index1, value1) {
                daySales.push(value1);
            });



            var echartsConfig = function() {

            if( $('#e_chart_11').length > 0 ){
                var eChart_11 = echarts.init(document.getElementById('e_chart_11'));
                var option10 = {
                    color: ['#88c241'],
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        backgroundColor: '#fff',
                        borderRadius:6,
                        padding:0,
                        axisPointer:{
                            lineStyle:{
                                width:0,
                            }
                        },
                        textStyle: {
                            color: '#324148',
                            fontFamily: '"Nunito", sans-serif',
                            fontSize: 12
                        }
                    },

                    xAxis: [{
                        type: 'category',
                        data: days,
                        axisLine: {
                            show:false
                        },
                        axisTick: {
                            show:false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#5e7d8a'
                            }
                        }
                    }],
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show:false
                        },
                        axisTick: {
                            show:false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#5e7d8a'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'transparent',
                            }
                        }
                    },
                    grid: {
                        top: '3%',
                        left: '3%',
                        right: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    series: [{
                        data: daySales,
                        type: 'bar',
                        barMaxWidth: 30,
                        itemStyle: {
                            normal: {
                                barBorderRadius: [6, 6, 0, 0] ,
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                position: 'outside'
                            }
                        },
                    }]
                };
                eChart_11.setOption(option10);
                eChart_11.resize();
            }
        }
        /*****E-Charts function end*****/

        /*****Resize function start*****/
        var echartResize;
        $(window).on("resize", function () {
            /*E-Chart Resize*/
            clearTimeout(echartResize);
            echartResize = setTimeout(echartsConfig, 200);
        }).resize();
        /*****Resize function end*****/

        /*****Function Call start*****/
        echartsConfig();
        /*****Function Call end*****/
        }
    })
}

$('#license_key').on('submit', function(event)
{
    event.preventDefault();

    var fetch_data_url  =   'license_key_';
    var apiKey          =   $('#apiKey').val();

    $('#licenseBtn').html('<i class="fa fa-spinner fa-spin"></i> please wait');

    $.ajax({
        url:fetch_data_url,
        data: {
            apiKey:apiKey,
        },
        success:function(data)
        {
            var response = JSON.parse(data, true);
            console.log(response);

            if(response['Success']=='False')
            {
               toastr.error(response['Message']);

               $('#toast-container').delay(3000).fadeOut();
               $('#licenseBtn').html('Activate Software');
            }

            if(response['Success']=='True')
            {
               toastr.success(response['Message']);
               $('#showLicenseBox').modal('hide');
               // console.log(response['url']);
               window.location.href = response['url'];
               $('#toast-container').delay(3000).fadeOut();
            }
        }
    })

});

function validateNumber(evt) {
    var e = evt || window.event;
    var key = e.keyCode || e.which;

    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        // numbers
        key >= 48 && key <= 57 ||
        // Numeric keypad
        key >= 96 && key <= 105 ||
        // Backspace and Tab and Enter
        key == 8 || key == 9 || key == 13 ||
        // Home and End
        key == 35 || key == 36 ||
        // left and right arrows
        key == 37 || key == 39 ||
        // Del and Ins
        key == 46 || key == 45) {
        // input is VALID
    }
    else {
        // input is INVALID
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
}

$("input[class='employee_login_']").click(function(e)
{
    if($("input[class='employee_login_']").prop('checked') == true)
    {
        $('.loginYesNo').show();
        $('.loginData').show();
    }
    else
    {
        $('.loginYesNo').hide();
        $('.loginData').hide();
    }
});

function removePicture_(user_id)
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
            toastr.success(searchdata['Message']);

            if(searchdata['picture']=='empty')
            {
                $('.employeePicture').html('Add Profile Picture<br><input type="file" class="" id="employee_picture" name="employee_picture" accept=".jpeg, .jpg, .png, .gif" autocomplete="off"><small>Max Image Size: <b>2mb.</b><br>Accepted Formats: <b>.jpeg, .jpg, .png, .gif</b></small><input type="hidden" name="chkPicture" id="chkPicture" value="" />');
            }

        }
    })
}


$('#my_employee_form').on('submit', function(event)
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
        if(!validateEmail($('#email').val()))
        {
            error = 1;
            toastr.error("invalid email address");
            return false;
        }
    }

    if($('#employee_mobileno').val()=='')
    {
        error = 1;
        toastr.error("Mobile No. is required");
        $('#employee_mobileno').focus();
        return false;
    }

    if($('#employee_joiningdate').val()=='')
    {
        error = 1;
        toastr.error("joining date is required");
        $('#employee_joiningdate').focus();
        return false;
    }
    else
    {
        if(!validate_date_format($('#employee_joiningdate').val()))
        {
            error = 1;
            toastr.error("invalid date format");
            return false;
        }
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
       if($("input[name='employee_login_']").prop('checked') == true)
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
        }
    }

    if(error == 1)
    {
        return false;
    }
    else
    {
            var mobno               =   $('.mobno .selected-dial-code').html();
            var altmobno            =   $('.altmobno .selected-dial-code').html();
            var fammobno            =   $('.fammobno .selected-dial-code').html();

            var mobno_country       =   $('.mobno .selected-dial-code').siblings('div').attr('class').split('iti-flag ')[1];
            var altmobno_country    =   $('.altmobno .selected-dial-code').siblings('div').attr('class').split('iti-flag ')[1];
            var fammobno_country    =   $('.fammobno .selected-dial-code').siblings('div').attr('class').split('iti-flag ')[1];

            $("#employee_mobileno_dial_code").val(mobno +','+ mobno_country);
            $("#employee_alternate_mobile_dial_code").val(altmobno +','+ altmobno_country);
            $("#employee_family_member_mobile_dial_code").val(fammobno +','+ fammobno_country);

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
                           window.location = 'my_profile';
                        }

                     }
                     else
                     {
                        if(data['status_code'] == 409)
                        {
                           $.each(data['Message'],function (errkey,errval)
                           {
                              var errmessage = errval;
                              toastr.error(errmessage);
                           });
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

$('.eyePassword').click( function(e){

    // password field
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }

    // confirm password field
    var y = document.getElementById("encrypt_password");
    if (y.type === "password") {
        y.type = "text";
    } else {
        y.type = "password";
    }

    // admin password on change password window
    var bx = document.getElementById("adminpassword");
    if (bx.type === "password") {
        bx.type = "text";
    } else {
        bx.type = "password";
    }

    // new password on change password window
    var z = document.getElementById("new_password_");
    if (z.type === "password") {
        z.type = "text";
    } else {
        z.type = "password";
    }

    // re-enter password on change password window
    var a = document.getElementById("confirm_password_");
    if (a.type === "password") {
        a.type = "text";
    } else {
        a.type = "password";
    }

    // admin password on change password window
    var b = document.getElementById("admin_password_");
    if (b.type === "password") {
        b.type = "text";
    } else {
        b.type = "password";
    }


    $('.eyePassword').css('opacity','1');   // change opacity

});

$(".fixed-top").click(function (e) {

      //console.log($(this).closest().find('.alert_form_status').attr('id'));

     // console.log($("ul.navbar-nav").find('.active').closest('div').find('a.active').html());
      var form_input_status = $('.hk-wrapper').find('.hk-pg-wrapper').find('form').find('.alert_form_status').val();

      if(typeof form_input_status && form_input_status != undefined && form_input_status == 1)
      {
          jQuery.toast({
              heading: '<b>Unsaved Data!</b>',
              text: '<p>It looks like you have been editing something - if you leave before saving, then your changes will be lost.<br><br><b>Do you want to close?</b></p><button class="btn btn-secondary btn-sm mt-10 mr-10" onclick="ignoreSaving()" data-dismiss="modal" aria-hidden="true">Yes,close</button><button class="btn btn-secondary btn-sm mt-10 mr-10" onclick="closeAlert()" data-dismiss="modal" aria-hidden="true">No</button>',
              position: 'top-right',
              loaderBg:'#7a5449',
              class: 'jq-toast-danger highlight-data',
              hideAfter: 11155500,
              stack: 6,
              showHideTransition: 'fade'
          });
          return false;
      }
});


$('.close').click(function(e)
{
    var alertStatus     =   $('.alertStatus').val();
    if(Number(alertStatus)==1)
    {
        jQuery.toast({
            heading: '<b>Unsaved Data!</b>',
            text: '<p>It looks like you have been editing something - if you leave before saving, then your changes will be lost.<br><br><b>Do you want to close?</b></p><button class="btn btn-secondary btn-sm mt-10 mr-10" onclick="ignoreSaving()" data-dismiss="modal" aria-hidden="true">Yes,close</button><button class="btn btn-secondary btn-sm mt-10 mr-10" onclick="closeAlert()" data-dismiss="modal" aria-hidden="true">No</button>',
            position: 'top-right',
            loaderBg:'#fdff72',
            class: 'jq-toast-danger highlight-data',
            hideAfter: 11155500,
            stack: 6,
            showHideTransition: 'fade'
        });
        return false;
    }
});

function closeAlert()
{
   $('.jq-toast-wrap').remove();
}

function ignoreSaving()
{
    $('.alertStatus').val('0');
    $('.alert_form_status').val('0');
    $('.jq-toast-wrap').remove();
    $('.close').click();
}

$('form .modal-content input').keypress(function(e) {
    if (e.which >=65 || e.which <=90)
    {

         $('.alertStatus').val('1');
    }


});

$('.number').keypress(function (event)
{
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

$(".onlyinteger").keypress(function (evt)
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
});

//allow only integer and one point in td editable
function testCharacter(event) {

    if ((event.which != 46 || $(event.target).text().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }

}
//pan card validation regax

function pan_card_validate(panVal)
{
    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if(!regpan.test(panVal)){
       return 0;
    } else {
        return 1;
    }
}


//DATE FORMAT VALIDATION
function ValidateDate(dtValue) {

    var date_regex = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-\d{4}$/;


    if(!date_regex.test(dtValue))
    {
        return 0;
    }
    else {
        return 1;
    }
}


function callroute(url,type,dataType="",data,callback)
{

    var csrf_token = $('meta[name="csrf-token"]').attr('content');

    $.ajax({
        type: type,
        url: url,
        dataType: dataType,
        processData: false,

        async: false,
        data: JSON.stringify(data),
        contentType: 'application/json; charset=UTF8',
        beforeSend: function(xhr)
        {
            xhr.setRequestHeader("X-CSRF-TOKEN",csrf_token);
        },
        success: function(server_response)
        {
            callback(server_response);
        },
        error: function(server_error)
        {

            callback(server_error);
        }
    });
}


function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false)
    {
        return 0;
    }

    return 1;

}
function validate_date_format(dateval)
{

    var dateReg = /^\d{2}[./-]\d{2}[./-]\d{4}$/;


    if(dateReg.test(dateval) == false)
    {
        return 0;
    }
    return 1;
}

//CHECK SEPRATE DAY,MONTH,YEAR VALIDATION

function separtate_date_format_validation(d,m,y,datetype)
{
    //datetype = mfg and expiry for display message

    //current year
    var currentYear = (new Date).getFullYear();

    var dateerror = 0;
    if(d == null || d == "" || !$.isNumeric(d))
    {
        toastr.error(datetype +" days must be numeric! ");
        dateerror = 1;
    }
    if(m == null || m == "" || !$.isNumeric(m))
    {
        toastr.error(datetype +" month must be numeric! ");
        dateerror = 1;
    }
    if(y == null || y == "" || !$.isNumeric(y))
    {
        toastr.error(datetype +" year must be numeric! ");
        dateerror = 1;
    }

    if(d > 31)
    {
        toastr.error(datetype +" day can not be greater than 31.");
        dateerror = 1;
    }

    if(m > 12)
    {
        toastr.error(datetype +" month can not be greater than 12.");
        dateerror = 1;
    }

    if(y.length < 4 || y.length > 4)
    {
        toastr.error(datetype +" year must be in 4 digit.");
        dateerror = 1;
    }
   /* if(y > currentYear)
    {
        toastr.error(datetype +" year can not be greater than "+currentYear+".");
        dateerror = 1;
    }*/

    if ((m == 4 || m == 6 || m == 9 || m == 11) && d == 31)
    {
        toastr.error(datetype +" selected month contains only 30 days.");
        dateerror = 1;
    }
    if (m == 2 && d > 29 && (y % 4 == 0))
    {
        toastr.error(datetype +" selected month contains only 29 days.");
        dateerror = 1;
    }

    if ((m == 2) && d > 28)
    {
        toastr.error(datetype +" selected month contains only 28 days.");
        dateerror = 1;
    }

    if(dateerror == 1)
    {
        return 0;
    }else
    {
        return 1;
    }
}


$(".mobileregax").keydown(function(event) {
    k = event.which;

    if ((k >= 96 && k <= 105) || (k == 8) || (k == 9) || (k >= 48 && k <= 57))
    {
        if ($(this).val().length == 12)
            {
            if (k == 8 || k== 9)
            {
                return true;
            } else {
                event.preventDefault();
                return false;

            }
        }
    } else {
        event.preventDefault();
        return false;
    }

});


//pujita mam code

$( document ).ready(function()
{
    var $table = $('.scrollable_table'),
        $bodyCells = $table.find('tbody tr:first').children(),
        colWidth;

    // Get the tbody columns width array
    colWidth = $bodyCells.map(function() {
        return $(this).width();
    }).get();

    // Set the width of thead columns
    $table.find('thead tr').children().each(function(i, v) {
        $(v).width(colWidth[i]);
    });



});
$(window).resize(function() {
    var $table = $('.scrollable_table'),
        $bodyCells = $table.find('tbody tr:first').children(),
        colWidth;

    // Get the tbody columns width array
    colWidth = $bodyCells.map(function() {
        return $(this).width();
    }).get();

    // Set the width of thead columns
    $table.find('thead tr').children().each(function(i, v) {
        $(v).width(colWidth[i]);
    });
}).resize();
/*$('.view-bill-screen').DataTable( {
    paging: true,
    searching:false
} );*/
//end of pujita mam code


//for reset table after insert/update/delete activity
function resettable(url,id='')
{
    $.ajax({
        url:url,
        success:function(data)
        {
            //$('tbody').html('');
            $("#"+id).html(data);
        }
    })
}
//end of reset table

//code for sorting and search value in table
function clear_icon()
{
    $('#id_icon').html('');
    $('#post_title_icon').html('');
}
function fetch_data(fetch_data_url,page, sort_type, sort_by, query,id='')
{
    $.ajax({
        url:fetch_data_url,
        data: {
            page: page,
            sortby: sort_by,
            sorttype: sort_type,
            query: query
        },
        success:function(data)
        {
           // $('tbody').html('');
            $('.loaderContainer').hide();
            if(id != '') {
                $("#"+id).html(data);
                $('.loaderContainer').hide();
            }else
            {
                $('tbody').html();
            }
            if($(".PagecountResult").html() == '0')
            {
               toastr.error("Data Not Found.Please Try With Other Search Criteria .");
            }
        }
    })
}


$('.search_data').click(function(e)
{
    e.preventDefault();
    var page            =     $('#hidden_page').val();
    var column_name     =     $('#hidden_column_name').val();
    var sort_type       =     $('#hidden_sort_type').val();

    var query = {};
    $(".common-search").find('input,select,hidden').each(function ()
    {
       if($(this).attr('name-attr') != undefined)
       {
           var name_attr = $(this).attr('name-attr');
           if(name_attr == "from_to_date")
           {
               query['from_date'] = '';
               query['to_date'] = '';
               var separate_date = $(this).val().split(' - ');

               if(separate_date[0] != undefined)
               {
                   query['from_date'] = separate_date[0];
               }

               if(separate_date[1] != undefined)
               {
                   query['to_date'] = separate_date[1];
               }
           }
           else
           {

               query[name_attr] = $(this).val();
           }

         }
    });

    var fetch_data_url = $('#fetch_data_url').val();

    $('li').removeClass('active');
    // $(this).parent().addClass('active');
    var tbodyid = $('html').find('.table-responsive').attr('id');


    $('.loaderContainer').show();
    fetch_data(fetch_data_url,page, sort_type, column_name, query,tbodyid);

});
$(document).on('keyup', '#serach', function()
{
    var query = {};
    query['serach'] = $('#serach').val();
    var column_name = $('#hidden_column_name').val();
    var sort_type = $('#hidden_sort_type').val();
    var page = $('#hidden_page').val();
    var fetch_data_url = $('#fetch_data_url').val();
    var tbodyid = $(".table-responsive").attr('id');

    fetch_data(fetch_data_url,page, sort_type, column_name, query,tbodyid);
});

$(document).on('click', '.sorting', function(){
    var column_name = $(this).data('column_name');
    var order_type = $(this).data('sorting_type');
    var reverse_order = '';
    if(order_type == 'asc')
    {
        $(this).data('sorting_type', 'desc');
        reverse_order = 'desc';
       // clear_icon();
        $('#'+column_name+'_icon').html('<span class="glyphicon glyphicon-triangle-bottom"></span>');
    }
    if(order_type == 'desc')
    {
        $(this).data('sorting_type', 'asc');
        reverse_order = 'asc';
      //  clear_icon
        $('#'+column_name+'_icon').html('<span class="glyphicon glyphicon-triangle-top"></span>');
    }
    $('#hidden_column_name').val(column_name);
    $('#hidden_sort_type').val(reverse_order);
    var page = $('#hidden_page').val();
    var query = $('#serach').val();
    var fetch_data_url = $('#fetch_data_url').val();
    fetch_data(fetch_data_url,page, reverse_order, column_name, query);
});

$(document).on('click', '.pagination a', function(event)
{
    event.preventDefault();
    var page = $(this).attr('href').split('page=')[1];
    $('#hidden_page').val(page);
    var column_name = $('#hidden_column_name').val();
    var sort_type = $('#hidden_sort_type').val();

    var query = {};
    $(".common-search").find('input,select,hidden').each(function ()
    {
       if($(this).attr('name-attr') != undefined)
       {
           var name_attr = $(this).attr('name-attr');

           if(name_attr == "from_to_date")
           {
               query['from_date'] = '';
               query['to_date'] = '';
               var separate_date = $(this).val().split(' - ');

               if(separate_date[0] != undefined)
               {
                   query['from_date'] = separate_date[0];
               }

               if(separate_date[1] != undefined)
               {
                   query['to_date'] = separate_date[1];
               }
           }
           else
           {
               query[name_attr] = $(this).val();
           }
       }
    });

    var fetch_data_url = $('#fetch_data_url').val();

    $('li').removeClass('active');
    $(this).parent().addClass('active');
    var tbodyid = $(this).closest('table').parent('.table-responsive').attr('id');
    $('.loaderContainer').show();
    fetch_data(fetch_data_url,page, sort_type, column_name, query,tbodyid);
});
//end of code for sorting and search value in table




//for open product form as popup
function open_product_popup()
{
    var html = '<section id="product_block" style="display: block;"> <h5 class="hk-sec-title">Add New Product</h5> <div class="row" > <form name="productform" id="productform"> <input type="hidden" name="product_id" id="product_id" value=""> <input type="hidden" name="type" id="type" value=""> <div class="col-sm-12"> <div class="hk-row"> <div class="col-md-3"> <div class="card"> <div class="card-body greybg"> <div class="row"> <div class="col-md-12"> <label class="form-label">Product Name</label> <input class="form-control form-inputtext" value="" name="product_name" id="product_name" type="text" placeholder=" "> </div></div></div></div></div><div class="col-md-9"> @include(\'product/product_calculation\') </div></div></div><div class="col-sm-12"> <div class="hk-row"> <div class="col-md-12"> <div class="card"> <div class="card-body greybg"> <div class="card-header"> <h5>Optional</h5> </div><div class="row"> <div class="col-md-3"> <label class="form-label">SKU Code</label> <input class="form-control form-inputtext" value="" maxlength="" autocomplete="off" type="text" name="sku_code" id="sku_code" placeholder=" "> </div><div class="col-md-3"> <label class="form-label">Product Code</label> <input class="form-control form-inputtext" value="" maxlength="" autocomplete="off" type="text" name="product_code" id="product_code" placeholder=" "> </div><div class="col-md-3"> <label class="form-label">Product Description</label> <input class="form-control form-inputtext" value="" maxlength="" autocomplete="off" type="text" name="product_description" id="product_description" placeholder=" "> </div><div class="col-md-3"> <label class="form-label">HSN</label> <input class="form-control form-inputtext number" value="" maxlength="" autocomplete="off" type="text" name="hsn_sac_code" id="hsn_sac_code" placeholder=" "> </div><div class="col-md-2"> <label class="form-label">Brand</label> <select class="form-control form-inputtext" name="brand_id" id="brand_id"> </select> </div><div class="col-md-1"> <button type="button" class="btn btn-info addmoreoption" id="addbrand"><i class="fa fa-plus"></i></button> </div><div class="col-md-2"> <label class="form-label">Category</label> <select class="form-control form-inputtext" onchange="getsubcategory()" name="category_id" id="category_id"> </select> </div><div class="col-md-1"> <button type="button" class="btn btn-info addmoreoption" id="addcategory" name="addcategory"><i class="fa fa-plus"></i></button> </div><div class="col-md-2"> <label class="form-label">Sub Category</label> <select class="form-control form-inputtext" name="subcategory_id" id="subcategory_id"> </select> </div><div class="col-md-1"> <button type="button" class="btn btn-info addmoreoption" id="addsubcategory" name="addsubcategory"><i class="fa fa-plus"></i></button> </div><div class="col-md-2"> <label class="form-label">Colour</label> <select class="form-control form-inputtext" name="colour_id" id="colour_id"> </select> </div><div class="col-md-1"> <button type="button" class="btn btn-info addmoreoption" id="addcolour" name="addcolour"><i class="fa fa-plus"></i></button> </div><div class="col-md-2"> <label class="form-label">Size</label> <select class="form-control form-inputtext" name="size_id" id="size_id"> </select> </div><div class="col-md-1"> <button type="button" class="btn btn-info addmoreoption" id="addsize" name="addsize"><i class="fa fa-plus"></i></button> </div><div class="col-md-2"> <label class="form-label">UQC</label> <select class="form-control form-inputtext" name="uqc_id" id="uqc_id"> </select> </div><div class="col-md-1"> <button type="button" class="btn btn-info addmoreoption" id="adduqc" name="adduqc"><i class="fa fa-plus"></i></button> </div><div class="col-md-3"> <label class="form-label">Material</label> <input class="form-control form-inputtext" value="" maxlength="10" autocomplete="off" type="text" name="material_id" id="material_id" placeholder=" "> </div><div class="col-md-3"> <label class="form-label">Days Before Product Expiry</label> <input class="form-control form-inputtext number" value="" maxlength="10" autocomplete="off" type="text" name="days_before_product_expiry" id="days_before_product_expiry" placeholder=" "> </div><div class="col-md-3"> <label class="form-label">Product System Barcode</label> <input class="form-control form-inputtext notallowinput" value="{{$system_barcode_final}}" maxlength="10" autocomplete="off" type="text" name="product_system_barcode" id="product_system_barcode" placeholder=" "> </div><div class="col-md-3"> <label class="form-label">Supplier Barcode</label> <input class="form-control form-inputtext" value=" " autocomplete="off" type="text" name="supplier_barcode" id="supplier_barcode" placeholder=" "> </div><div class="col-md-3"> <label class="form-label">Is Ean?</label> <label class="form-label"> <input type="radio" name="is_ean" checked id="iseanyes" value="1">Yes</label> <label class="form-label"><input type="radio" name="is_ean" id="iseanno" value="0">No</label> </div><div class="col-md-3"> <label class="form-label">Product Ean Barcode</label> <input class="form-control form-inputtext" value=" " maxlength="10" autocomplete="off" type="text" name="product_ean_barcode" id="product_ean_barcode" placeholder=" "> </div><div class="col-md-12"> <div class="row" id="imageblock"> <div class="col-md-3" id="block_1"> <div class="form-group"> <input type="file" onchange="previewandvalidation(this);" data-counter="1" accept=".png, .jpg, .jpeg" name="product_image_1" id="product_image_1" class="form-control form-inputtext productimage"> <div id="preview_1" style="display: none"> <a onclick="removeimgsrc(\'1\');" class="displayright"><i class="fa fa-remove" style="font-size: 20px;"></i></a> <img src="" id="product_preview_1" width="100%" height="200px"> </div></div></div><button type="button" style="height: 38px;" class="btn btn-info" id="addmoreimg" name="addmoreimg"><i class="fa fa-plus"></i></button> </div></div></div></div></div></div></div></div></form> </div><div class="row"> <div class="col-sm-12"> <div class="hk-row"> <div class="col-md-3"> <div class="card"> <div class="card-body greybg"> <button type="button" name="addproduct" class="btn btn-info" id="addproduct" data-container="body" data-toggle="popover" data-placement="bottom" data-content="">Add Product</button> <button type="button" name="resetproduct" onclick="resetproductdata();" class="btn btn-light resetbtn" id="resetproduct" data-container="body" data-toggle="popover" data-placement="bottom" data-content="">Reset</button> </div></div></div></div></div></div></section>';
}


//this is used for display batch no suggestion
$("#batch_no_filter").keyup(function ()
{
    jQuery.noConflict();
    $("#batch_no_filter").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "batch_no_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#batch_no_filter").val()
            };
            callroute(url, type,dataType, data, function (data)
            {
                var searchbatchno = JSON.parse(data, true);

                if (searchbatchno['Success'] == "True")
                {
                    var batch_no = searchbatchno['Data'];

                    if (batch_no.length > 0)
                    {
                        var resultbatch_no = [];

                        batch_no.forEach(function (value)
                        {

                            resultbatch_no.push({
                                label: value.batch_no,
                                value: value.batch_no
                            });
                        });
                        //push data into result array.and this array used for display suggetion
                        response(resultbatch_no);
                    }
                }
            });
        }, //this help to call a function when select search suggetion
        select: function (event, ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});
//this is used for display product Code suggestion




$("#productcode").keyup(function ()
{
    jQuery.noConflict();
    $("#productcode").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "productcode_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#productcode").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var search_product_code = JSON.parse(data, true);
                if (search_product_code['Success'] == "True")
                {
                    var product_code = search_product_code['Data'];
                    if (product_code.length > 0)
                    {
                        var resultproduct_code = [];
                        product_code.forEach(function (value)
                        {
                            resultproduct_code.push({
                                label: value.product_code,
                                value: value.product_code
                            });
                        });
                        //push data into result array.and this array used for display suggetion
                        response(resultproduct_code);
                    }
                }
            });
        }, //this help to call a function when select search suggetion
        select: function (event, ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});

//this code is used to display HSN Code
$("#hsn_code").keyup(function ()
{

    jQuery.noConflict();
    $("#hsn_code").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "hsncode_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#hsn_code").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var search_product_code = JSON.parse(data, true);
                if (search_product_code['Success'] == "True")
                {
                    var product_code = search_product_code['Data'];
                    if (product_code.length > 0)
                    {
                        var resultproduct_code = [];
                        product_code.forEach(function (value)
                        {
                            resultproduct_code.push({
                                label: value.hsn_sac_code,
                                value: value.hsn_sac_code
                            });
                        });
                        //push data into result array.and this array used for display suggetion
                        response(resultproduct_code);

                    }
                }
            });
        }, //this help to call a function when select search suggetion
        select: function (event, ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});


//this is used for display product name suggestion
$("#product_name_filter").keyup(function ()
{
    jQuery.noConflict();
    $("#product_name_filter").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "product_name_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#product_name_filter").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var search_product_name = JSON.parse(data, true);
                if (search_product_name['Success'] == "True")
                {
                    var product_name = search_product_name['Data'];
                    if (product_name.length > 0)
                    {
                        var resultproduct_name = [];
                        product_name.forEach(function (value)
                        {
                            resultproduct_name.push({
                                label: value.product_name,
                                value: value.product_name
                            });
                        });
                        //push data into result array.and this array used for display suggetion
                        response(resultproduct_name);
                    }
                }
            });
        }, //this help to call a function when select search suggetion
        select: function (event, ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});

//this is used for display product code suggestion

$("#pcode_filter").keyup(function ()
{
    jQuery.noConflict();
    $("#pcode_filter").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "product_code_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#pcode_filter").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var search_product_code = JSON.parse(data, true);
                if (search_product_code['Success'] == "True")
                {
                    var product_code = search_product_code['Data'];
                    if (product_code.length > 0)
                    {
                        var resultproduct_code = [];
                        product_code.forEach(function (value)
                        {
                            resultproduct_code.push({
                                label: value.product_code,
                                value: value.product_code
                            });
                        });
                        //push data into result array.and this array used for display suggetion
                        response(resultproduct_code);
                    }
                }
            });
        }, //this help to call a function when select search suggetion
        select: function (event, ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});


//this is used for display reference By suggestion

$("#reference_by_search").keyup(function ()
{
    jQuery.noConflict();
    if($("#reference_by_search").val() != '') {
        $("#reference_by_search").autocomplete({
            autoFocus: true,
            minLength: 1,
            source: function (request, response) {
                var url = "referenceby_search";
                var type = "POST";
                var dataType = "";
                var data = {
                    'search_val': $("#reference_by_search").val(),
                    'customer_edit_id': $("#customer_id").val()
                };
                callroute(url, type, dataType, data, function (data) {
                    var search_referenceby = JSON.parse(data, true);

                    if (search_referenceby['Success'] == "True") {
                        var referenceby = search_referenceby['Data'];

                        if (referenceby.length > 0) {
                            var resultreference_by = [];
                            referenceby.forEach(function (value) {
                                resultreference_by.push({
                                    label: value.customer_name + '_' + value.customer_mobile,
                                    value: value.customer_name + '_' + value.customer_mobile,
                                    customer_id: value.customer_id
                                });
                            });
                            //push data into result array.and this array used for display suggetion
                            response(resultreference_by);
                        }
                    }
                });
            }, //this help to call a function when select search suggetion
            select: function (event, ui) {
                $(".ui-helper-hidden-accessible").css('display', 'none');
                $("#reference_by").val(ui.item.customer_id);
                //call a function to perform action on select of supplier
            }
        })
    }else
    {
        $("#reference_by").val('');
    }
});

//this is used for display sku suggestion
$("#skucode_filter").keyup(function ()
{
    jQuery.noConflict();
    $("#skucode_filter").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "sku_code_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#skucode_filter").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var search_sku = JSON.parse(data, true);
                if (search_sku['Success'] == "True")
                {
                    var sku = search_sku['Data'];
                    if (sku.length > 0)
                    {
                        var result_sku = [];
                        sku.forEach(function (value)
                        {
                            result_sku.push({
                                label: value.sku_code,
                                value: value.sku_code
                            });
                        });
                        //push data into result array.and this array used for display suggetion
                        response(result_sku);
                    }
                }
            });
        }, //this help to call a function when select search suggetion
        select: function (event, ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});



$("#filterarea").change(function () {
    if($(this).is(':checked'))
    {
       $("#filterarea_block").show();
    }
    else
    {
        $("#filterarea_block").hide();
    }
});



//This is used for display BARCODE suggestion
$("#barcode_filter").keyup(function ()
{
    jQuery.noConflict();
    $(this).autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "product_barcode_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#barcode_filter").val()
            };
            callroute(url, type,dataType, data, function (data)
            {
                var search_barcode = JSON.parse(data, true);

                if (search_barcode['Success'] == "True")
                {
                    var barcode = search_barcode['Data'];

                    if (barcode.length > 0)
                    {
                        var resultbarcode = [];

                        barcode.forEach(function (value)
                        {

                            var barcode = '';
                            if(value['supplier_barcode'] != '' && value['supplier_barcode'] != null)
                            {
                                barcode = value['supplier_barcode'];
                            }
                            else
                            {
                                barcode = value['product_system_barcode'];
                            }

                            resultbarcode.push({
                                label: barcode,
                                value: barcode
                            });
                        });
                        //push data into result array.and this array used for display suggetion
                        response(resultbarcode);
                    }
                }
            });
        }, //this help to call a function when select search suggetion
        select: function (event, ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});
// $('#from_barcode_filter').keyup(function ()
// {
//     jQuery.noConflict();
//     $(this).autocomplete({
//         autoFocus: true,
//         minLength: 1,
//         source: function (request, response)
//         {
//             var url = "product_barcode_search";
//             var type = "POST";
//             var datatype = "";
//             var data = {
//                 'search_val': $("#from_barcode_filter").val()
//             };
//             callroute(url, type,datatype, data, function (data)
//             {
//                 var search_barcode = JSON.parse(data, true);

//                 if (search_barcode['Success'] == "True")
//                 {
//                     var barcode = search_barcode['Data'];

//                     if (barcode.length > 0)
//                     {
//                         var resultbarcode = [];

//                         barcode.forEach(function (value)
//                         {

//                             var barcode = '';
//                             if(value['supplier_barcode'] != '' && value['supplier_barcode'] != null)
//                             {
//                                 barcode = value['supplier_barcode'];
//                                 resultbarcode.push({
//                                     label: barcode,
//                                     value: barcode
//                                 });
//                             }
//                             if(value['product_system_barcode'] != '' && value['product_system_barcode'] != null)
//                             {
//                                 barcode = value['product_system_barcode'];
//                                  resultbarcode.push({
//                                     label: barcode,
//                                     value: barcode
//                                 });
//                             }


//                         });
//                         //push data into result array.and this array used for display suggetion
//                         response(resultbarcode);
//                     }
//                 }
//             });
//         }, //this help to call a function when select search suggetion
//         select: function (event, ui)
//         {
//             $(".ui-helper-hidden-accessible").css('display','none');
//             //call a function to perform action on select of supplier
//         }
//     })
// });
// $('#to_barcode_filter').keyup(function ()
// {
//     jQuery.noConflict();
//     $(this).autocomplete({
//         autoFocus: true,
//         minLength: 1,
//         source: function (request, response)
//         {
//             var url = "product_barcode_search";
//             var type = "POST";
//             var dataType = "";
//             var data = {
//                 'search_val': $("#to_barcode_filter").val()
//             };
//             callroute(url, type,dataType, data, function (data)
//             {
//                 var search_barcode = JSON.parse(data, true);

//                 if (search_barcode['Success'] == "True")
//                 {
//                     var barcode = search_barcode['Data'];

//                     if (barcode.length > 0)
//                     {
//                         var resultbarcode = [];

//                         barcode.forEach(function (value)
//                         {

//                             var barcode = '';
//                             if(value['supplier_barcode'] != '' && value['supplier_barcode'] != null)
//                             {
//                                 barcode = value['supplier_barcode'];
//                                 resultbarcode.push({
//                                     label: barcode,
//                                     value: barcode
//                                 });
//                             }
//                             if(value['product_system_barcode'] != '' && value['product_system_barcode'] != null)
//                             {
//                                 barcode = value['product_system_barcode'];
//                                  resultbarcode.push({
//                                     label: barcode,
//                                     value: barcode
//                                 });
//                             }


//                         });
//                         //push data into result array.and this array used for display suggetion
//                         response(resultbarcode);
//                     }
//                 }
//             });
//         }, //this help to call a function when select search suggetion
//         select: function (event, ui)
//         {
//             $(".ui-helper-hidden-accessible").css('display','none');
//             //call a function to perform action on select of supplier
//         }
//     })
// });
//This is used for display Invoice No suggestion

$("#invoice_no_filter").keyup(function ()
{
    jQuery.noConflict();

    $(this).autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "invoice_number_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val' : $("#invoice_no_filter").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var searchdata = JSON.parse(data,true);

                if(searchdata['Success'] == "True")
                {
                    var result = [];
                    searchdata['Data'].forEach(function (value)
                    {
                        result.push({
                            label: value.invoice_no,
                            value: value.invoice_no
                        });
                    });
                    response(result);
                }
            });
        },
        //this help to call a function when select search suggetion
        select: function(event,ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
        }
    });
});


var DateHelper = {
    addDays : function(aDate, numberOfDays) {
        aDate.setDate(aDate.getDate() + numberOfDays); // Add numberOfDays
        return aDate;                                  // Return the date
    },
    format : function format(date) {
        return [
            ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
            ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
            date.getFullYear()                          // Get full year
        ].join('-');                                   // Glue the pieces together
    }
}



//FOR SOFTWARE CONFIGURATION MODEL

// $(document).keydown(function(e)
// {
//     if(e.key == "Y" && e.ctrlKey)
//     {
//
//         $(".verify_form").show();
//         $("#configuration_password").val('');
//         $("#software_configuration_form").hide();
//
//         $("#software_configuration_popup").modal('show');
//
//
//         //verify password of software configuration
//         $("#verify_password").click(function ()
//         {
//            if(verify_password_configuration("software_verification_form"))
//            {
//                $("#verify_password").prop('disabled',true);
//                var data = {
//                    "formdata": $("#software_verification_form").serialize(),
//                };
//                var url = "valid_technical_team";
//                var type = "POST";
//                callroute(url, type, data, function (data)
//                {
//                    $("#verify_password").prop('disabled',false);
//                    var dta = JSON.parse(data);
//                    if(dta['Success'] == "False")
//                    {
//                        toastr.success(dta['Message']);
//                        $("#software_configuration_popup").modal('hide');
//                    }
//                    else
//                    {
//                        $(".verify_form").hide();
//                        $("#software_configuration_form").show();
//                    }
//                })
//            }
//         });
//
//         //function for validation of password
//         function verify_password_configuration(frmid)
//         {
//             var error = 0;
//
//             if($("#configuration_password").val() == '')
//             {
//                 error = 1;
//                 toastr.error("Please Enter Password!");
//
//             }
//
//             if(error == 1)
//             {
//                 return  false;
//             }else{
//                 return true;
//             }
//         }
//
//
//         //check decimal points validation
//         $("#decimal_points").keyup(function () {
//             if($(this).val() > 4)
//             {
//                 toastr.error("Decimal points can not be greater than 4");
//                 $(this).val(0);
//                 return false;
//             }
//         })
//
//         //To manage billing js file according to Tax type selected.
//         $("input[name='tax_type']").change(function ()
//         {
//             if($(this).val()==1)
//             {
//                 $("#billtype_with_gst"). prop('disabled', true);
//                 $("#billtype_batch_no"). prop('disabled', true);
//                 $('#billtype_without_gst').prop('checked',true);
//                 $('.vatdetails').show();
//                 $('.vatdetails').show();
//             }
//             else
//             {
//                 $("#billtype_with_gst"). prop('disabled', false);
//                 $("#billtype_batch_no"). prop('disabled', false);
//                 $('#billtype_without_gst').prop('checked',true);
//                 $('.vatdetails').hide();
//                 $('.vatdetails').hide();
//             }
//         })
//
//         $("#add_software_configuration").click(function ()
//         {
//             if(validate_software_configuration('software_configuration_form'))
//             {
//                 $("#add_software_configuration").prop('disabled',true);
//                 var data = {
//                     "formdata": $("#software_configuration_form").serialize(),
//                 };
//                 var url = "software_configuration_create";
//                 var type = "POST";
//                 callroute(url, type, data, function (data)
//                 {
//                     $("#add_software_configuration").prop('disabled',false);
//                     $("#addcompanyprofile").prop('disabled', false);
//                     var dta = JSON.parse(data);
//                     if (dta['Success'] == "True")
//                     {
//                         toastr.success(dta['Message']);
//                         $("#company_profile_id").val(dta['company_profile_id']);
//                         $("#software_configuration_popup").modal('hide');
//                         $("#company_profile_form :input").prop("disabled", false);
//                         if(dta['url'] != '' && dta['url'] != 'undefined')
//                         {
//                             window.location.href = dta['url'];
//                         }
//                         location.reload();
//
//                     } else {
//                         if (dta['status_code'] == 409) {
//                             $.each(dta['Message'], function (errkey, errval) {
//                                 var errmessage = errval;
//                                 toastr.error(errmessage);
//                             });
//                         } else {
//                             toastr.error(dta['Message']);
//                         }
//                     }
//                 })
//             }else
//             {
//                 $("#add_software_configuration").prop('disabled',false);
//                 return false;
//             }
//         });
//
//
//         function validate_software_configuration(frmid)
//         {
//             var error = 0;
//
//             var tax_type = $("input[name='tax_type']:checked"). val();
//
//             if(Number(tax_type)==1)
//             {
//                 if($("#tax_title").val() == '')
//                 {
//                     error = 1;
//                     toastr.error("Enter Tax Title!");
//                     $('#tax_title').focus();
//                     return false;
//                 }
//                 else if($("#currency_title").val() == '')
//                 {
//                     error = 1;
//                     toastr.error("Enter Currency Title!");
//                     $('#currency_title').focus();
//                     return false;
//                 }
//             }
//
//             if(error == 1)
//             {
//                 return false;
//             }
//             else
//             {
//                 return true;
//             }
//         }
//     }
// }); 


//end of software configuration model

var start_software_date =  $("#software_starts_date").val();
if($('body').find('.daterange').length!=0)
{
 function updateLabel(start, end, label) {
        if (label === 'Custom Range') {
            $(".daterange").html(start.format('dd-mm-yyyy') + ' - ' + end.format('dd-mm-yyyy'));
        } else {
            $(".daterange").html(label);
        }
    }

    $(".daterange").daterangepicker({
        startDate: moment().startOf('day'),
        endDate: moment().endOf('day'),
        opens: "right",
        drops: "down",
        ranges: {
            'Today': [moment().startOf('day'), moment().endOf('day')],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'All Data': [moment(start_software_date).format("DD-MM-YYYY"),moment()],
        }
    }, updateLabel);

    //Set the default value
    var datepicker = $(".daterange").data('daterangepicker');
    //console.log(datepicker);
    var initialSel = 'Today';   // Or something else
    if (initialSel && datepicker.ranges && datepicker.ranges[initialSel]) {
        var range = datepicker.ranges[initialSel];
        datepicker.chosenLabel = initialSel;
        datepicker.setStartDate(range[0]);
        datepicker.setEndDate(range[1]);
        updateLabel(datepicker.startDate, datepicker.endDate, datepicker.chosenLabel);
    } else {
        datepicker.chosenLabel = 'Today';
        updateLabel(datepicker.startDate, datepicker.endDate, datepicker.chosenLabel);
    }

    $(".daterange").val('');
}


//FOR DISPLAY DEPENDENT RECORD
/*$(".dependent_record").click(function () {*/
function dependent_record(obj)
{
//Sr No.   //IP   //Module Name  //Detail //Created time  //Updated Time
    var id = $(obj).attr('data-id');
    var url = $(obj).attr('data-url');
    var type = "POST";
    var dataType = "";
    var data = {
        'id' : id,
    };
    callroute(url,type,dataType,data,function (data)
    {
            var dta = JSON.parse(data);

            if(dta['Success'] == "True")
            {
                $("#view_dependent_record").html('');
                var dependent_record = dta['Data'];
                var dependent_html = '';

                if(dependent_record.length > 0) {
                    $.each(dependent_record, function (key, value) {
                        var tblclass = 'odd';
                        if (key % 2 == 0) {
                            tblclass = 'even';
                        }

                        key++;

                        var value_detail = '';
                        $.each(value['detail'], function (k, v) {
                            value_detail += "" + k + "" + " :: " + v + "<br/>"
                        });

                        dependent_html += '<tr class=' + tblclass + ' style="border-bottom:1px solid #C0C0C0 !important;">' +
                            '<td style="font-size:14px !important;text-align: left">' + key + '</td>' +
                            '<td style="font-size:14px !important;text-align: left">' + value['Module_Name'] + '</td>' +
                            '<td style="font-size:14px !important;text-align: left">' + value_detail + '</td>' +
                            /*'<td style="font-size:14px !important;text-align: left">'+value['created_at']+'<br/>'+value['updated_at']+'</td>' +*/
                            '</tr>';
                    });
                }else
                {
                    dependent_html = '<tr><td colspan="3">no dependent record found...</td></tr>';
                }

                $("#view_dependent_record").append(dependent_html);

                $(".dependency_popup").modal('show');
            }
            else
            {
                return false;
            }
    });

}


//END OF DISPLAY DEPENDENT RECORD

//add by vrunda for page overlay
$(function() {
    $('.nav-item.dropdown').hover(function() {
      $('.overlay').css({"content": " ", "position": "absolute", "display": "block","top": "0","left": "0","height": "100%",
      "width": "100%", "background-color": "rgba(0,0,0,0.7)","z-index":"14"});
    }, function() {
      // on mouseout, reset the background colour
      $('.overlay').css('z-index', '0');
    });
  });
  //end


//function used for add leading 0 in date string
function leadingZero(value) {
    if (value < 10) {
        return "0" + value.toString();
    }
    return value.toString();
}

function validateGST(gst_no){
    // onfocusout="validateGST(this)"
// {{$supplier_value->country_name->country_name}}
        // "supplier_company_info_id": supplier_company_id

    //var divid = $(obj).parent().closest('div .row').attr('id');

    //var gst_no = $("#"+divid).find('#supplier_gstin').val();
    //console.log(gst_no);
    var reggst =/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    //var reggst = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([0-9]){1}?$/;
    if(!reggst.test(gst_no) && gst_no!='')
    {
        return 0;
        // error=1;
        // toastr.error('GST Identification Number is not valid. It should be in this "11AAAAA1111Z1A1" format');
        // return false;
    }
    return 1;

}

$(".upload_span_btn").click(function(e){
    $(".uploadspan_content").toggleClass("commonbreadcrumbtn_upload");

});

$(".update_span_btn").click(function(e){
    $(".updatespan_content").toggleClass("commonbreadcrumbtn_update");

});

$(document).on("click", function (e) {
if ($(e.target).is(".upload_span_btn")==false) {
            $(".uploadspan_content").removeClass("commonbreadcrumbtn_upload");
        }
if ($(e.target).is(".update_span_btn")==false) {
            $(".updatespan_content").removeClass("commonbreadcrumbtn_update");
        }

});


$("#stock_transfer_no_filter").keyup(function ()
{
    jQuery.noConflict();
    $(this).autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "stock_transfer_number_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val' : $("#stock_transfer_no_filter").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var searchdata = JSON.parse(data,true);

                if(searchdata['Success'] == "True")
                {
                    var result = [];
                    searchdata['Data'].forEach(function (value)
                    {
                        result.push({
                            label: value.stock_transfer_no,
                            value: value.stock_transfer_no
                        });
                    });
                    response(result);
                }
            });
        },
        //this help to call a function when select search suggetion
        select: function(event,ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
        }
    });
});

$("#stock_transfer_no_warehouse_filter").keyup(function ()
{
    jQuery.noConflict();
    $(this).autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "stock_transfer_no_warehouse_filter";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val' : $("#stock_transfer_no_warehouse_filter").val()
            };
            callroute(url,type,dataType,data,function (data)
            {
                var searchdata = JSON.parse(data,true);

                if(searchdata['Success'] == "True")
                {
                    var result = [];
                    searchdata['Data'].forEach(function (value)
                    {
                        result.push({
                            label: value.stock_transfer_no,
                            value: value.stock_transfer_no
                        });
                    });
                    response(result);
                }
            });
        },
        //this help to call a function when select search suggetion
        select: function(event,ui)
        {
            $(".ui-helper-hidden-accessible").css('display','none');
        }
    });
});

function todaysCollectionBtn()
{
    var todaysCollection        =   $('#todaysCollection').val();

    if(Number(todaysCollection)==0)
    {
        $('.todaysCollection').slideDown();
        $('#todaysCollection').val(1);
        $('.todaysCollectionVal').html('Hide Payment Collection Methods');
    }
    else
    {
        $('.todaysCollection').slideUp();
        $('#todaysCollection').val(0);
        $('.todaysCollectionVal').html('View Payment Collection Methods');
    }
}

function monthlyCollectionBtn()
{
    var monthlyCollection        =   $('#monthlyCollection').val();

    if(Number(monthlyCollection)==0)
    {
        $('.monthlyCollection').slideDown();
        $('#monthlyCollection').val(1);
        $('.monthlyCollectionVal').html('Hide Payment Collection Methods');
    }
    else
    {
        $('.monthlyCollection').slideUp();
        $('#monthlyCollection').val(0);
        $('.monthlyCollectionVal').html('View Payment Collection Methods');
    }
}
$(".change_mail_pass").click(function ()
{
    $("#get_pwd").modal('show');
    $("#current_pwd").val('1212');

    return false;


});
$(document).on("click", "#check_pwd", function()
{
   
     if($("#current_pwd").val() == "")
   {
       toastr.error("Current Login Password Can Not Be Empty.");
       return false;
   }

    var url = "check_password";
    var type = "POST";
    var dataType = '';
    var data = {
        "password" : $("#current_pwd").val(),   
    };
    callroute(url,type,dataType,data,function (data)
    {
        var dta = JSON.parse(data);

        if(dta['Success'] == "True")
        {
            toastr.success(dta['Message']);
            $("#current_pwd").val('');
            $("#get_pwd").modal('hide');
            allow_update_mrp();
           
            if($("#change_type").val() == 1)
            {
                allow_mail_change_pass();
            }
        }
        else
        {
            toastr.error(dta['Message']);
            return false;
        }
    });

});

function allow_update_mrp()
{
    $("#want_to_update").prop('checked',true);
    if($("#want_to_update").is(':checked','true'))
    {
        $("#update_pricein_all").show();

        var type = "POST";
        var dataType = "";
        var data = {
            'product_id' :$("#encoded_product_id").val()
        };
        var url = "get_store_list";

        callroute(url,type,dataType,data,function (data) {
            var dta = JSON.parse(data);
            if(dta['Success'] == "True")
            {

                $("#price_master_price").html('');
                var store_html = '';
                var price_master = dta['price_master_value'];
                if(typeof price_master != "undefined" && price_master != '')
                {
                    $("#price_master_price").show();
                    var price_master_html= '<option value="0">Select OfferPrice_MRP_Qty_BatchNo.</option>';

                    $.each(price_master,function (pk,pv){
                        if(pv['batch_no'] == null )
                        {
                            pv['batch_no'] = '';``
                        }
                        price_master_html += '<option value="'+pv['price_master_id']+'">'+pv['offer_price']+'_'+pv['product_mrp']+'_'+pv['product_qty']+'_'+pv['batch_no']+'</option>'
                    });

                    $("#price_master_price").append(price_master_html);


                    if (typeof dta['warehouse'] != "undefined" && dta['warehouse'] != '') {
                        store_html += '<input type="checkbox" name="store_name[]" value=' + dta['warehouse']['company_id'] + '>' + dta['warehouse']['full_name'] + '(Warehouse)';
                    }

                    if (typeof dta['Data'] != "undefined" && dta['Data'] != '') {
                        $("#store_div").html('');
                        var store = dta['Data'];

                        $.each(store, function (key, value) {
                            store_html += '<input type="checkbox" name="store_name[]" value=' + value['company_profile']['company_id'] + '>' + value['company_profile']['full_name'] + '';
                        });
                    }
                    $("#store_div").append(store_html);

                }
                else
                {
                    toastr.error("0 Qty In Stock.You Can Not Update Mrp/Offer price");
                    $("#want_to_update").prop('checked',false);
                   $("#update_pricein_all").hide();
                }

            }
        });
    }
    else {
        $("#update_pricein_all").hide();
        $("#store_div").html('');
    }
}


function allow_mail_change_pass()
{
    $(".passShow").show();
}
function supplier_summary_popup(obj)
{
  var id                        =     $(obj).attr('id');
  var supplier_id                =     $(obj).attr('id').split('popupid_')[1];


    var url = "view_supplier_popup";
    var type = "POST";
    var dataType = "";
    var data = {
         "supplier_id":supplier_id,
    };
    callroute(url, type, dataType, data, function(data) {
        $(".supplier_popup_values").html('');
        $(".supplier_popup_values").html(data);
        $("#supplier_summary_popup").modal('show');  

    }); 
}
function productdetailpopup(obj)
{

  var id                        =     $(obj).attr('id');
  var product_id                =     $(obj).attr('id').split('popupid_')[1];
   var url                       =     'product_popup_values';
        $.ajax({
            url:url,

            data: {
               
                productid:product_id,
                
            },
            success:function(data)
            {
                $('.productpopup_values').html('');
                $('.productpopup_values').html(data);
                $("#productdetailpopup").modal('show');  
            }
        })
   
}
$(document).keydown(function(event) { 
  if (event.keyCode == 27) { 
    jQuery(".modal").modal('hide');
  }
});

function customerdetailpopup(obj)
{

  var id                        =     $(obj).attr('id');
  var customer_id                =     $(obj).attr('id').split('popupid_')[1];
   var url                       =     'customer_popup';
        $.ajax({
            url:url,

            data: {
               
                customer_id:customer_id,
                
            },
            success:function(data)
            {
                $('.customer_popup_values').html('');
                $('.customer_popup_values').html(data);
                $("#customerdetailpopup").modal('show');  
            }
        })
   
}
$(document).keydown(function(event) { 
  if (event.keyCode == 27) { 
    jQuery(".modal").modal('hide');
  }
});
// var content = $(".dropdown-item").text();
// if(content.indexOf('Additional') == -1){
//     $(".dropdown-item").addClass("additional");
// }


//added here for make common view//
function viewcreditnote(obj){



    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewreceipt_')[1]; 
   
      
        var url                       =     'view_creditnote_popup';
        $.ajax({
            url:url,

            data: {
               
                billno:bill_no,
                
            },
            success:function(data)
            {
                $('.popup_values').html('');
                $('.popup_values').html(data);

                $("#creditnotepopup").modal('show');
            }
        })
    
}

//added here for make common view//
function viewBill(obj){



    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewbill_')[1]; 
    if($('#store_id').length){
        var store_name   =   $('#store_id').val();
    }else{
        var store_name   =   '';
    }
    $("#view_bill_type").val(1);
    var data = {'billno':bill_no,'store_name':store_name};
    var url = 'view_bill_popup';
    var type = "POST";
    var dataType =  "";

    callroute(url, type, dataType, data,function (data) 
    {
        $('.rpopup_values').html('');
        $('.popup_values').html('');
        $('.popup_values').html(data);
        $("#addcustomerpopup").modal('show');
    });
}
//added here for make common view//
function viewConsignment(obj){



    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewbill_')[1]; 
   
    var data = {'billno':bill_no};
    var url = 'view_consignment_popup';
    var type = "POST";
    var dataType = "";

    callroute(url, type, dataType, data,function (data) 
    {
        $('.popup_values').html('');
        $('.popup_values').html(data);
        $("#addcustomerpopup").modal('show');
    });
}
//added here for make common view//
function viewreturnBill(obj){


    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewreturnbill_')[1]; 
    if($('#store_id').length){
        var store_name   =   $('#store_id').val();
    }else{
        var store_name   =   '';
    }
    $("#view_bill_type").val(2);
    var data = {'billno':bill_no,'store_name':store_name};
    var url = 'view_returnbill_popup';
    var type = "POST";
    var dataType =  "";

    callroute(url, type, dataType, data,function (data) 
    {
        $('.popup_values').html('');
        $('.rpopup_values').html('');
        $('.rpopup_values').html(data);
        $("#addcustomerpopup").modal('show');
    });
    
}
//added here for make common view//
$(document).on("click", ".showoutstandingdetails", function(){
// $('.showoutstandingdetails').click(function(e){

  var customer_id               =     $('#ccustomer_id').val();
   var url                      =     'outstanding_popup_values';
        $.ajax({
            url:url,

            data: {
               
                customer_id:customer_id,
                
            },
            success:function(data)
            {
                $('.customerpopup_values').html('');
                $('.customerpopup_values').html(data);
                $("#outstandingdetailpopup").modal('show');  
            }
        })
   

        $("#outstandingdetailpopup").modal('show');

});
// register jQuery extension
// $('input,select').keydown( function(e) {
//   var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
//   if(key == 13) {
//    // e.preventDefault();
//     var inputs = $('.container').find('input:visible');
//     var nextinput = 0;
//     if (inputs.index(this) < (inputs.length-1)) {
//       nextinput = inputs.index(this)+1;
//     }
//     if (inputs.length==1) {
//       //$(this).blur().focus();
//     } else {
//       inputs.eq(nextinput).focus();
//     }
//     console.log(inputs.index(this));
//     console.log(inputs.length-1);

//     console.log(inputs.length);
//     console.log(nextinput);
//   }
// });


$("#searchcustomer").keyup(function (event) {
    if (event.keyCode == 13) {
        
      /*  textboxes = $(":input:not([type='hidden']):not([readonly])");*/
        textboxes = $(":input:not([readonly]:not([type='hidden'])");
        

        currentBoxNumber = textboxes.index(this);
        console.log(textboxes);
        console.log(currentBoxNumber);
        if (textboxes[currentBoxNumber + 1] != null) {
            nextBox = textboxes[currentBoxNumber + 1];
            nextBox.focus();
            nextBox.select();
        }
        event.preventDefault();
        return false;
    }
});

function viewinward(inwardid)
{
    $("#inward_popup_record").trigger('reset');
    $("#payment_div").empty();
    $("#view_inward_record").html('');
    $("#inward_payment_details").empty();
    $('#vieewpop tfoot').html('');
    $("#edit_inword_stock_in_popup").attr('onClick','');
    $("#previousrecord").attr('data-id','');
    $("#nextrecord").attr("data-id",'');

    var  url = "view_inward_detail";
    var type = "POST";
    var dataType = "";
    var data = {
        'inward_stock_id' : inwardid,
    };
    callroute(url,type,dataType,data,function (data)
    {
        var dta = JSON.parse(data);

        if(dta['Success'] == "True")
        {
            $("#view_inward_record").html('');
            $('#vieewpop tfoot').html('');
            $('#inward_payment_details').html('');
            var final_data = JSON.parse(dta['Data']);

            var dataval = final_data;

          $("#viewinwardpopup").modal('show');

            if(dta['next'] == '')
            {
               $("#nextrecord").prop('disabled',true);
               $("#nextrecord").attr("data-id", '');
            }
            else
            {
               $("#nextrecord").prop('disabled',false);
               $("#nextrecord").attr("data-id", dta['next']);
            }

            if(dta['previous']=='')
            {
              $("#previousrecord").prop('disabled',true);
              $("#previousrecord").attr("data-id",'');
            }
            else
            {
               $("#previousrecord").prop('disabled',false);
              $("#previousrecord").attr('data-id',dta['previous']);
            }

            $("#edit_inword_stock_in_popup").attr("onClick","edit_inwardstock('"+inwardid+"','"+dataval['inward_type']+"')");


            if(typeof dataval['supplier_gstdetail'] != 'undefined' && dataval['supplier_gstdetail'] != '' && dataval['supplier_gstdetail'] != null)
            {
                if (dataval['supplier_gstdetail']['supplier_gstin'] != '' && dataval['supplier_gstdetail']['supplier_gstin'] != undefined)
                {
                    $(".gstvalblock").show();
                    $(".supplier_gstin").html(dataval['supplier_gstdetail']['supplier_gstin']);
                }

                var supplier_company_info = dataval['supplier_gstdetail']['supplier_company_info'];

                if (supplier_company_info != '' && supplier_company_info != undefined)
                {
                    var supplier_first_name = supplier_company_info['supplier_first_name'];
                    var supplier_last_name = '';

                    if (supplier_company_info['supplier_last_name'] != '' && supplier_company_info['supplier_last_name'] != null)
                    {
                        supplier_last_name = supplier_company_info['supplier_last_name'];
                    }
                    $(".supplier_name").html(supplier_first_name + '  ' + supplier_last_name);
                }
            }

            if(typeof dataval['warehouse_id'] != 'undefined' && dataval['warehouse_id'] != '' && dataval['warehouse_id'] != null)
            {
                $(".supp_warehouse").text("Warehouse Name");
               $(".supplier_name").html(dataval['warehouse']['company_name']);
               $(".supplier_gstin").html(dataval['warehouse']['gstin']);

           }

            $(".invoice_no_popup").html(dataval['invoice_no']);
            $(".inward_date_popup").html(dataval['inward_date']);
            var currency_symbol = '&#x20b9';

            if(typeof dataval['supplier_payment_details'] != "undefined" && dataval['supplier_payment_details'] != '')
            {
                var payment_html = '';

                if(tax_type == 1)
                {
                    currency_symbol = currency_title;
                }
                $.each(dataval['supplier_payment_details'],function(paymentkey,paymentvalue)
                {
                    var payment_method_name = '';

                    if(typeof paymentvalue != 'undefined' && paymentvalue['payment_method '] != '')
                    {
                         payment_method_name = paymentvalue['payment_method'][0]['payment_method_name'];
                    }

                    var payment_amt = Number(paymentvalue['amount']).toFixed(decimal_points);

                    payment_html += '<tr>' +
                        '<td style="text-align:right !important;font-size:14px !important;" class="text-dark font-weight-600">'+payment_method_name+'</td>' +
                        '<td class="font-weight-600">&nbsp;:&nbsp;</td>' +
                        '<td style="text-align:right !important;font-size:14px !important;" class="text-dark font-weight-600">'+currency_symbol+' '+payment_amt+'</td>' +
                        '</tr>';
                });

                $("#inward_payment_details").append(payment_html);
            }

            if(dataval['total_qty'] != '')
            {
                $("#total_qty").html(dataval['total_qty']);
            }
            if(dataval['total_gross'] != '')
            {
                $("#total_gross").html(dataval['total_gross']);
            }
            if(dataval['total_grand_amount'] != '')
            {
                $("#total_grand_amount").html(dataval['total_grand_amount']);
            }
            if(dataval['total_grand_amount'] != '')
            {
                $("#total_grand_amount").html(dataval['total_grand_amount']);
            }
            $(".invoiceno").html(dataval['invoice_no']);

            $(".invoice_title").html('Invoice No:');
            // console.log(dataval['invoice_no'])
            // return false;

            if(typeof dataval['inward_product_detail'] != 'undefined' && dataval['inward_product_detail'] != '' )
            {
                var product_detail_record = dataval['inward_product_detail'];
                var product_html = '';
                var base_price_total = 0;
                var igst_total = 0;
                var cgst_total = 0;
                var sgst_total = 0;
                var profit_percent_total = 0;
                var profit_amt_total = 0;
                var selling_price_total = 0;
                var offer_price_total = 0;
                var mrp_price_total = 0;
                var qty_total = 0;
                var cost_total = 0;

                var total_base_discount_percent =0;
                var total_base_discount_amount =0;
                var total_scheme_discount_percent =0;
                var total_scheme_discount_amount =0;
                var total_free_discount_percent =0;
                var total_free_discount_amount =0;
                var total_cost_rate =0;
                var free_qty_total =0;
                var total_gross_cost= 0;


                var colspan = 4;
                if(dataval['inward_type'] == 2)
                {
                    colspan = 3;
                    if(dataval['inward_with_unique_barcode'] == 1)
                    {
                        colspan = 4;
                    }
                }

                $.each(product_detail_record,function (key,value)
                {
                    var product_detail = '';
                    if(value['product_detail'] != '' && value['product_detail'] != 'undefined')
                    {
                         product_detail = value['product_detail'];
                    }
                    var product_system_barcode = '';
                    var product_name = '';
                    var product_code = '';
                    if(product_detail != '' && product_detail['product_system_barcode'] != '' && product_detail['product_system_barcode'] != null)
                    {
                         product_system_barcode = product_detail['product_system_barcode'];
                    }
                    if(product_detail != '' && product_detail['product_name'] != '' && product_detail['product_name'] != null)
                    {
                        product_name = product_detail['product_name'];
                    } if(product_detail != '' && product_detail['product_code'] != '' && product_detail['product_code'] != null)
                    {
                        product_code = product_detail['product_code'];
                    }

                    var barcode = '';
                    if(product_detail != '' && product_detail['supplier_barcode'] != " " && product_detail['supplier_barcode'] != null)
                    {
                        barcode = product_detail['supplier_barcode'];
                    }
                    else {

                        barcode = product_detail['product_system_barcode'];
                    }

                    var uqc_name = '';


                    if(product_detail != '' && product_detail['uqc_id'] != '' && product_detail['uqc_id'] != null && product_detail['uqc_id'] != 0)
                    {
                        uqc_name = product_detail['uqc']['uqc_shortname'];
                    }

                    var batch_no = '';
                    var base_price = 0;
                    var base_discount_percent = 0;
                    var base_discount_amount = 0;
                    var scheme_discount_percent = 0;
                    var scheme_discount_amount = 0;
                    var free_discount_percent = 0;
                    var free_discount_amount = 0;
                    var cost_rate = 0;
                    var profit_percent = 0;
                    var profit_amount = 0;
                    var offer_price = 0;
                    var product_mrp = 0;
                    var product_qty = 0;
                    var free_qty = 0;
                    var mfg_date = '';
                    var expiry_date = '';
                    var total_gross = 0;
                    var cost_igst_amount = 0;
                    var cost_cgst_amount = 0;
                    var cost_sgst_amount = 0;
                    var sell_price =0;
                    var cost_last =0;


                  if(value['batch_no'] != '' && value['batch_no'] != null)
                  {
                      batch_no = value['batch_no'];
                  }
                  if(value['base_price'] != '')
                  {
                      base_price = value['base_price'];
                  }
                  if(value['base_discount_percent'] != '')
                  {
                      base_discount_percent = value['base_discount_percent'];
                  }
                  if(value['base_discount_amount'] != '')
                  {
                      base_discount_amount = value['base_discount_amount'];
                  }
                  if(value['scheme_discount_percent'] != '')
                  {
                      scheme_discount_percent = value['scheme_discount_percent'];
                  }
                  if(value['scheme_discount_amount'] != '')
                  {
                      scheme_discount_amount = value['scheme_discount_amount'];
                  }if(value['free_discount_percent'] != '')
                  {
                      free_discount_percent = value['free_discount_percent'];
                  }
                  if(value['free_discount_amount'] != '')
                  {
                      free_discount_amount = Number(value['free_discount_amount']);
                  }
                  if(value['cost_rate'] != '')
                  {
                      cost_rate = value['cost_rate'];
                  }
                  if(value['profit_percent'] != '')
                  {
                      profit_percent = value['profit_percent'];
                  }
                  if(value['profit_amount'] != '')
                  {
                      profit_amount = value['profit_amount'];

                  }if(value['offer_price'] != '')
                  {
                      offer_price = value['offer_price'];
                  }if(value['product_mrp'] != '')
                  {
                      product_mrp = value['product_mrp'];
                  }if(value['product_qty'] != '')
                  {
                      product_qty = value['product_qty'];
                  }if(value['free_qty'] != '')
                  {
                      free_qty = value['free_qty'];
                  }if(value['mfg_date'] != '' && value['mfg_date'] != null)
                  {
                      mfg_date = value['mfg_date'];
                  }if(value['expiry_date'] != '' && value['expiry_date'] != null)
                  {
                      expiry_date = value['expiry_date'];
                  }if(value['total_gross'] != '')
                  {
                      total_gross = value['total_gross'];
                  }if(value['cost_igst_amount'] != '')
                  {
                      cost_igst_amount = value['cost_igst_amount'];
                  }if(value['cost_cgst_amount'] != '')
                  {
                      cost_cgst_amount = value['cost_cgst_amount'];
                  }if(value['cost_sgst_amount'] != '')
                  {
                      cost_sgst_amount = value['cost_sgst_amount'];
                  }if(value['sell_price'] != '')
                  {
                      sell_price = value['sell_price'];
                  }if(value['total_cost'] != '')
                  {
                      cost_last = value['total_cost'];
                  }


                    var feature_show_val = "";
                    if(show_dynamic_feature != '')
                    {
                        var feature = show_dynamic_feature.split(',');

                        $.each(feature,function(fea_key,fea_val)
                        {
                            //feature_show_val += '<td>'+product_detail[fea_val]+'</td>';

                            var feature_name = '';
                            if(typeof(product_detail[fea_val]) != "undefined" && product_detail[fea_val] !== null) {
                                feature_name = product_detail[fea_val];
                            }
                            feature_show_val += '<td>' + feature_name + '</td>';
                        })
                    }



                    base_price_total += base_price;
                    igst_total += cost_igst_amount;
                    cgst_total += cost_cgst_amount;
                    sgst_total += cost_sgst_amount;
                    profit_percent_total += profit_percent;

                    profit_amt_total += profit_amount;
                    selling_price_total += sell_price;
                    offer_price_total += offer_price;
                    mrp_price_total += product_mrp;
                    qty_total += product_qty;
                    cost_total += cost_last;
                    total_base_discount_percent += base_discount_percent;
                    total_base_discount_amount += base_discount_amount;
                    total_scheme_discount_percent += scheme_discount_percent;
                    total_scheme_discount_amount += scheme_discount_amount;
                    total_free_discount_percent += free_discount_percent;
                    total_free_discount_amount += free_discount_amount;
                    total_cost_rate += cost_last;
                    free_qty_total += free_qty;
                    total_gross_cost +=cost_rate;

                  var total_qty = ((Number(product_qty)) + (Number(free_qty)));
                  var total_cost = ((Number(value['cost_price'])) * (Number(total_qty)));

                    product_html += '<tr id="'+value['product_id']+'"> ';
                    product_html += '<td class="leftAlign ">'+barcode+'</td>' ;
                    product_html += '<td class="leftAlign ">'+product_name+'</td>';
                    product_html += feature_show_val;
                    product_html += '<td class="leftAlign ">'+uqc_name+'</td>';
                    product_html += '<td class="leftAlign ">'+product_code+'</td>';
                    product_html += '<td class="leftAlign  garment_case_hide show_in_unique">'+batch_no+'</td>';
                    product_html += '<td class="rightAlign inward_calculation_case">'+base_price+'</td>';
                    product_html += '<td class="rightAlign inward_calculation_case">'+base_discount_percent+'</td>';
                    product_html += '<td class="rightAlign inward_calculation_case">'+base_discount_amount+'</td>';
                    product_html += '<td class="rightAlign  garment_case_hide inward_calculation_case">'+scheme_discount_percent+'</td>';
                    product_html += '<td class="rightAlign  garment_case_hide inward_calculation_case">'+scheme_discount_amount+'</td>';
                    product_html += '<td class="rightAlign  garment_case_hide inward_calculation_case">'+free_discount_percent+'</td>';
                    product_html += '<td class="rightAlign  garment_case_hide inward_calculation_case">'+free_discount_amount+'</td>';
                    product_html += '<td class="rightAlign  garment_case_hide inward_calculation_case">'+cost_rate+'</td>';

                        if(tax_type == 1)
                        {
                            product_html +=   '<td class="rightAlign inward_calculation_case">' + cost_igst_amount + '</td>';
                        }
                        else
                        {
                            product_html +=   '<td class="rightAlign inward_calculation_case">' + cost_igst_amount + '</td>';
                            product_html +=  '<td class="rightAlign inward_calculation_case ">' + cost_cgst_amount + '</td>';
                            product_html += '<td class="rightAlign inward_calculation_case ">' + cost_sgst_amount + '</td>';
                        }
                    product_html +='<td class="rightAlign inward_calculation_case">'+profit_percent+'</td>' ;
                        product_html +='<td class="rightAlign inward_calculation_case">'+profit_amount+'</td>' ;
                        product_html +='<td class="rightAlign inward_calculation_case">'+sell_price+'</td>' ;
                        product_html +='<td class="rightAlign inward_calculation_case">'+offer_price+'</td>' ;
                        product_html +='<td class="rightAlign inward_calculation_case">'+product_mrp+'</td>' ;
                        product_html +='<td class="rightAlign ">'+product_qty+'</td>' ;
                        product_html +='<td class="rightAlign  garment_case_hide ">'+free_qty+'</td>' ;
                        product_html +='<td class="leftAlign  garment_case_hide">'+mfg_date+'</td>' ;
                        product_html +='<td class="leftAlign  garment_case_hide">'+expiry_date+'</td> ';
                        product_html +='<td class="rightAlign inward_calculation_case">'+parseFloat(cost_last).toFixed(decimal_points)+'</td>' ;
                        product_html +='</tr>';
                });

                parseFloat(total_base_discount_percent).toFixed(decimal_points);
                parseFloat(total_base_discount_amount).toFixed(decimal_points);
                parseFloat(total_scheme_discount_percent).toFixed(decimal_points);
                parseFloat(total_scheme_discount_amount).toFixed(decimal_points);
                parseFloat(total_free_discount_percent).toFixed(decimal_points);
                parseFloat(total_free_discount_amount).toFixed(decimal_points);
                parseFloat(igst_total).toFixed(decimal_points);
                parseFloat(total_cost_rate).toFixed(decimal_points);
                parseFloat(igst_total).toFixed(decimal_points);
                parseFloat(cgst_total).toFixed(decimal_points);
                parseFloat(sgst_total).toFixed(decimal_points);
                parseFloat(profit_percent_total).toFixed(decimal_points);
                parseFloat(profit_amt_total).toFixed(decimal_points);
                parseFloat(selling_price_total).toFixed(decimal_points);
                parseFloat(offer_price_total).toFixed(decimal_points);
                parseFloat(mrp_price_total).toFixed(decimal_points);

                if(total_base_discount_percent == 0)
                {
                    total_base_discount_percent = '';
                }if(total_base_discount_amount == 0)
                {
                    total_base_discount_amount = '';
                }if(total_scheme_discount_percent == 0)
                {
                    total_scheme_discount_percent = '';
                }if(total_scheme_discount_amount == 0)
                {
                    total_scheme_discount_amount = '';
                }if(total_free_discount_percent == 0)
                {
                    total_free_discount_percent = '';
                }if(total_free_discount_amount == 0)
                {
                    total_free_discount_amount = '';
                }if(total_cost_rate == 0)
                {
                    total_cost_rate = '';
                }if(igst_total == 0)
                {
                    igst_total = '';
                }if(cgst_total == 0)
                {
                    cgst_total = '';
                }if(sgst_total == 0)
                {
                    sgst_total = '';
                }if(profit_percent_total == 0)
                {
                    profit_percent_total = '';
                }if(profit_amt_total == 0)
                {
                    profit_amt_total = '';
                }if(selling_price_total == 0)
                {
                    selling_price_total = '';
                }if(offer_price_total == 0)
                {
                    offer_price_total = '';
                }if(mrp_price_total == 0)
                {
                    mrp_price_total = '';
                }

                var footer_html = '<tfoot id="footer_view_inward" style="border-bottom:1px solid #C0C0C0 !important;border-top:1px solid #C0C0C0 !important;">\n';
                footer_html += '<tr>' ;
                    //footer_html +='<th colspan="'+colspan+'" class="text-dark font-14 font-weight-600"></th>' ;

                if(show_dynamic_feature != '')
                {
                    var feature = show_dynamic_feature.split(',');

                    $.each(feature,function(fea_key,fea_val)
                    {
                        colspan++;
                    })
                }
                footer_html +='<th colspan="'+colspan+'" class="text-dark font-14 font-weight-600"></th>' ;
                    footer_html +='<th class="text-left text-dark font-14 font-weight-600">Total</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+base_price_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+total_base_discount_percent+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+total_base_discount_amount+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide inward_calculation_case">'+total_scheme_discount_percent+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide inward_calculation_case">'+total_scheme_discount_amount+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide inward_calculation_case">'+total_free_discount_percent+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide inward_calculation_case">'+total_free_discount_amount+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide inward_calculation_case">'+total_gross_cost+'</th>' ;
                    if(tax_type == 1)
                    {
                        footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">' + igst_total + '</th>';
                    }
                    else {
                        footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">' + igst_total + '</th>';
                        footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">' + cgst_total + '</th>';
                        footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">' + sgst_total + '</th>';
                    }
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+profit_percent_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+profit_amt_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+selling_price_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+offer_price_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 inward_calculation_case">'+mrp_price_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600">'+qty_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide">'+free_qty_total+'</th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide"></th>' ;
                    footer_html +='<th class="text-right text-dark font-14 font-weight-600 garment_case_hide"></th>' ;
                    footer_html +='<th class="text-right text-dark font-18 font-weight-600 inward_calculation_case">'+currency_symbol+' <span id="grandtotal">'+parseFloat(total_cost_rate).toFixed(decimal_points)+'</span></th>' ;
                    footer_html +='</tr>';
                    footer_html +='</tfoot>';
                $("#view_inward_record").append(product_html);
                $("#view_inward_record").after(footer_html);

                 //COUNT TOTAL NO OF ITEMS IN POPUP
                  var totalitem = $("#view_inward_record tr").length;
                  $(".totcount").html(totalitem);
            }

            if(dataval['inward_type'] == 1)
            {
                $(".garment_case_hide").show();
            }
            else
            {
                $(".garment_case_hide").hide();
                if(dataval['inward_with_unique_barcode'] == 1)
                {
                    $(".show_in_unique").show();
                }
            }

            if(inward_calculation == 3) {
                $(".inward_calculation_case").hide();
            }
            else
            {
                $(".inward_calculation_case").show();
            }
        }
        else
        {

        }
    })
}

function edit_inwardstock(stockid,inward_type)
{
    var  url = "edit_inward_stock";
    var type = "POST";
    var dataType = "";
    var data = {
        'inward_stock_id' : stockid,
        'inward_type' : inward_type,
    };
    callroute(url,type,dataType,data,function (data) {
        var dta = JSON.parse(data);

        if (dta['Success'] == "True")
        {
            var url = '';
            if(dta['url'] != '' && dta['url'] != 'undefined')
            {
                 url = dta['url'];
            }
           localStorage.setItem('edit_inward_stock_record',JSON.stringify(dta['Data']));

            window.location.href = url;
        }
    });
}
$('#previousrecord').click(function(e){

var inward_id = $("#previousrecord").attr('data-id');
console.log(inward_id);
viewinward(inward_id);

});

//Supplier js Added by vrunda

$(document).on('click', '#gstplus', function()
{ 
    $("#gstplus").prop('disabled',true);
    var id = $(this).attr('data-id');
     id++;
    $(this).attr('data-id',id);


    var html = '';
    var state_block = '';
    var tratment_block = '';
  
    $.each(JSON.parse(state),function (key,value)
    {
        state_block += '<option value="'+value['state_id']+'">'+value['state_name']+'</option>';
    });

    $.each(JSON.parse(supplier_treatments),function(treatment_key,treatment_value)
    {
        tratment_block += '<option value="'+treatment_value['supplier_treatment_id']+'">'+treatment_value['supplier_treatment_name']+'</option>';
    });

    html += '<div class="row"  id="new_gst_'+id+'">' +
        '<div class="col-md-1">' +
        '<label class="form-label">Treatment</label>' +

        '<select id="supplier_treatment_id" name="supplier_treatment_id" class="form-control form-inputtext" onchange="showhide_gst(this);" >'+tratment_block+'</select>' +
        '</div>' +

        '<div class="col-md-2" id="supplier_gst"> <label class="form-label">GSTIN</label>' +
        '<input type="text" maxlength="15" onkeyup="getstate(this);" name="supplier_gstin" id="supplier_gstin" value="" class="form-control form-inputtext invalid" placeholder="">' +
        '</div>' +

        '<div class="col-md-1"> <label class="form-label">State</label>' +
        '<select name="state_id" id="state_id" class="form-control form-inputtext invalid"> <option value="">Select State</option>'+state_block+'</select>' +
        '</div>' +
        '<div class="col-md-2"> ' +
        '<label class="form-label">Address</label> ' +
        '<input type="text" maxlength="255" name="supplier_address" id="supplier_address" value="" class="form-control form-inputtext" placeholder=""> </div>' +
        '<div class="col-md-2"> <label class="form-label">Area</label> <input type="text" maxlength="20" name="supplier_area" id="supplier_area" value="" class="form-control form-inputtext" placeholder=""> </div>' +
        '<div class="col-md-1"> <label class="form-label">Zipcode</label>' +
        '<input type="text" maxlength="20" name="supplier_gst_zipcode" id="supplier_gst_zipcode" value="" class="form-control form-inputtext" placeholder="">' +
        '</div>' +
        '<div class="col-md-2"> <label class="form-label">City</label>' +
        '<input type="text" maxlength="20" name="supplier_gst_city" id="supplier_gst_city" value="" class="form-control form-inputtext" placeholder="">' +
        ' </div><div class="col-md-1"><label></label><a id="remove_gst_'+id+'" onclick="remove_gst_row('+id+');" data-id='+id+'>' +
        '<i class="fa fa-remove"></i> </a></div> ' +
        '</div>';

    $("#repleat_gst").append(html);
    $("#gstplus").prop('disabled',false);
});

function remove_gst_row(removeid)
{
   $("#new_gst_"+removeid).remove();
}


// $("#bankplus").click(function ()
$(document).on('click', '#bankplus', function()
{

    $("#bankplus").prop('disabled',true);
    var id = $(this).attr('data-id');
    id++;
    $(this).attr('data-id',id);

    var html_bank = '';

    html_bank += '<div class="row" id="new_bank_'+id+'">' +
        '<div class="col-md-3"><label class="form-label">Bank Name</label>' +
        '<input type="text" maxlength="100" name="supplier_bank_name" id="supplier_bank_name" value="" class="form-control form-inputtext invalid" placeholder=""> </div>' +
        '<div class="col-md-3"> ' +
        '<label class="form-label">Bank Account Name</label>' +
        ' <input type="text" maxlength="100" name="supplier_bank_account_name" id="supplier_bank_account_name" value="" class="form-control form-inputtext invalid" placeholder="">' +
        '</div>' +
        '<div class="col-md-3"> <label class="form-label">Bank Account No.</label> ' +
        '<input type="text" maxlength="20" name="supplier_bank_account_no" id="supplier_bank_account_no" value="" class="form-control form-inputtext invalid" placeholder="">' +
        '</div>' +
        '<div class="col-md-2"> <label class="form-label">Bank IFSC Code</label>' +
        '<input type="text" maxlength="100" name="supplier_bank_ifsc_code" id="supplier_bank_ifsc_code" value="" class="form-control form-inputtext" placeholder=""> </div>' +
        '<div class="col-md-1"><label></label><a id="remove_bank_'+id+'" onclick="remove_bank_row('+id+');" data-id='+id+'>' +
        '<i class="fa fa-remove"></i> </a></div> ' +
        '</div>';

    $("#repeat_bank").append(html_bank);
    $("#bankplus").prop('disabled',false);
});

function remove_bank_row(removeid)
{
    $("#new_bank_"+removeid).remove();
}


//$("#companymobileplus").click(function ()
$(document).on('click', '#companymobileplus', function()
{
    $("#companymobileplus").prop('disabled',true);
    var id = $(this).attr('data-id');
    id++;
    $(this).attr('data-id',id);

    var html_contactplus = '';

    html_contactplus += '<div class="col-md-11" id="mobile_'+id+'"> ' +
        '<label class="form-label">Phone No.</label> ' +
        '<input style="width: 100%;" type="tel" autocomplete="off" name="supplier_company_mobile_no" id="supplier_company_mobile_no" value="" maxlength="15" class="form-control form-inputtext mobileregax number" placeholder="">' +
        ' <input type="hidden" name="supplier_company_dial_code" id="supplier_company_dial_code" value=""> ' +
        '<a id="remove_bank_'+id+'" onclick="remove_companymobile_row('+id+');" data-id='+id+'>' +
        '<i class="fa fa-remove"></i> ' +
        '</div></div>';

    $("#repeat_companymobile").append(html_contactplus);

    $("#mobile_"+id).find('.mobileregax').each(function ()
    {
        var idofinput = $(this).attr('id');

        var input = document.querySelector('#mobile_'+id+' #'+idofinput);

        window.intlTelInput(input, {
            initialCountry: "in",
            separateDialCode: true,
            autoPlaceholder: false,
            utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
        });
    });



    $("#companymobileplus").prop('disabled',false);
});

function remove_companymobile_row(removeid)
{
    $("#mobile_"+removeid).remove();
}


// $("#contactplus").click(function ()
$(document).on('click', '#contactplus', function()
{
    $("#contactplus").prop('disabled',true);
    var id = $(this).attr('data-id');
    id++;
    $(this).attr('data-id',id);


    var html_contact = '';
    var saluation_block = '';


    $.each(salutation,function(saluation_key,saluation_value)
    {
        saluation_block += '<option value="'+saluation_value['salutation_id']+'">'+saluation_value['salutation_prefix']+'</option>';
    });

    html_contact += ' <div class="row" id="new_contact_'+id+'"> ' +
        '<div class="col-md-0"> <label class="form-label"></label> ' +
        '   <select id="salutation_id" name="salutation_id" class="form-control form-inputtext" >'+saluation_block+'</select> ' +
        '</div><div class="col-md-2"> <label class="form-label">First Name</label> ' +
        '<input type="text" maxlength="100" name="supplier_contact_firstname" id="supplier_contact_firstname" value="" class="form-control form-inputtext invalid" placeholder=""> </div>' +
        '<div class="col-md-1"> <label class="form-label">Last Name / Surname</label>' +
        ' <input type="text" maxlength="100" name="supplier_contact_lastname" id="supplier_contact_lastname" value="" class="form-control form-inputtext" placeholder=""> </div>' +
        '<div class="col-md-1"> <label class="form-label">Designation</label>' +
        ' <input type="text" maxlength="100" name="supplier_contact_designation" id="supplier_contact_designation" value="" class="form-control form-inputtext" placeholder=""> </div>' +
        '<div class="col-md-2"> <label class="form-label">Email Id</label> ' +
        '<input type="text" maxlength="100" name="supplier_contact_email_id" id="supplier_contact_email_id" value="" class="form-control form-inputtext invalid" placeholder=""> </div>' +
        ' <div class="col-md-1"> <label class="form-label">Date of Birth</label> <input type="text" maxlength="100" name="supplier_date_of_birth" id="supplier_date_of_birth" value="" class="form-control form-inputtext" placeholder=""> </div><div class="col-md-2"> ' +
        '<label class="form-label">Mobile No.</label>' +
        ' <input style="width:100%" type="text" maxlength="100" name="supplier_contact_mobile_no" id="supplier_contact_mobile_no" value="" class="form-control form-inputtext mobileregax invalid" placeholder=""> <input type="hidden" name="supplier_contact_dial_code" id="supplier_contact_dial_code" value=""> </div>' +
        '<div class="col-md-2"> <label class="form-label">Whatsapp No.</label> ' +
        '<input style="width:100%;" type="text" maxlength="100" name="supplier_whatsapp_no" id="supplier_whatsapp_no" value="" class="form-control form-inputtext mobileregax" placeholder="">' +
        '<input type="hidden" name="supplier_whatsapp_dial_code" id="supplier_whatsapp_dial_code" value=""></div>' +
        '<input type="hidden" name="supplier_contact_details_id" id="supplier_contact_details_id" value="">'+
        '<div class="col-md-0"><label></label>' +
        '<a id="remove_contact_'+id+'" onclick="remove_contact_row('+id+');" data-id='+id+'><i class="fa fa-remove"></i></a></div> ' +
        '</div></div>';




    $("#repeat_contact").append(html_contact);

    $("#new_contact_"+id).find('.mobileregax').each(function ()
    {
        var idofinput = $(this).attr('id');

        var input = document.querySelector('#new_contact_'+id+' #'+idofinput);

        window.intlTelInput(input, {
            initialCountry: "in",
            separateDialCode: true,
            autoPlaceholder: false,
            utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
        });
    });
    

    $("#contactplus").prop('disabled',false);
});

function remove_contact_row(removeid)
{
    $("#new_contact_"+removeid).remove();
}






//End of supplier js

//For closing popover
$('body').on('click', function (e) {
    $('[data-toggle=popover]').each(function () {
        // hide any open popovers when the anywhere else in the body is clicked
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});