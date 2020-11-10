$(document).ready(function(){
  $('input[id="same_address_yesno"]').val(1);
    $('input[name="same_address_yesno"]').click(function(){
        if($(this).prop("checked") == true){
            $("#customer_deleivery_address").hide();
          $(".cus_address #customer_deleivery_address").find('input[type="text"],select,hidden').val('');
            $('input[id="same_address_yesno"]').val(1);

        }
        else if($(this).prop("checked") == false){
            $("#customer_deleivery_address").show();
            $('input[id="same_address_yesno"]').val(0);
        }
    });
});
function print_customer_card(obj)
{
      var id                        =     $(obj).attr('id');
      var customer_id               =     $(obj).attr('id').split('printcuscard_')[1];

      var  url = "customer_carddata";
      var type = "POST";
      var dataType = "";
      var data = {
          'customer_id' : customer_id,
      };

      callroute(url,type,dataType,data,function (data) {
          var dta = JSON.parse(data);
          if (dta['Success'] == "True")
          {
             url = 'customer-sticker';
             console.log(dta['Data']);
             localStorage.setItem('customer_card_record',JSON.stringify(dta['Data']));

              window.location.href = url;



          }
          else
          {
              toastr.error(dta['Message']);
          }
          
      });

}

$("#printBarcodeBtn").click(function (){
    var radioValue = $("input[name='labelType']:checked").val();

    var array = [];
    if(radioValue!='')
    {
        $('#searchResult tr').has('td').each(function()
        {
            var arrayItem = {};
            $('td', $(this)).each(function(index, item)
            {
                var inputname = $(item).attr('id');

                if(inputname != undefined && inputname != '')
                {
                    var wihoutidname = inputname.split('_');
                    var nameforarray = wihoutidname[0];

                    if(nameforarray == 'fetchval')
                    {
                        arrayItem['product_id']     =   $(this).find("#productid_"+wihoutidname[1]).val();
                        arrayItem['printqty']       =   $(this).find("#printStock_"+wihoutidname[1]).val();
                    }


                }

            });
            array.push(arrayItem);
        });

        var arraydetail = [];
        arraydetail.push(array);

        var rradiovalue   =  [];

        rradiovalue['radioValue']     =   radioValue;
        arraydetail.push(rradiovalue);

        localStorage.setItem('barcode-printing-record',JSON.stringify(arraydetail));
        var url  =   'barcode-sticker';
        window.location.href = url;

    }
});

$("#addressplus").click(function ()
{
    $("#addressplus").prop('disabled',true);

    var id = $(this).attr('data-id');
    id++;
    $(this).attr('data-id',id);

     var state_block = '';
     var country_block = '';
     $.each(JSON.parse(state),function (key,value)
    {
        state_block += '<option value="'+value['state_id']+'">'+value['state_name']+'</option>';
    });
      $.each(JSON.parse(country),function (key,value)
    {
        country_block += '<option value="'+value['country_id']+'">'+value['country_name']+'</option>';
    });

    var html_add= '';

    html_add += '<div class="row" id="new_address_'+id+'">' +

        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Flat no.,Building,Street etc.</label>' +

                            '<input type="text" maxlength="100" name="customer_office_address" id="customer_office_address" value=""  class="form-control form-inputtext" placeholder="">' +
                        '</div>'+

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Area</label>' +
                           '<input type="text" maxlength="100" name="customer_office_area" id="customer_office_area" value=""  class="form-control form-inputtext" placeholder="">' +
                        '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">City / Town</label>' +
                            '<input type="text" maxlength="100" name="customer_office_city" id="customer_office_city" value=""  class="form-control form-inputtext" placeholder="">' +
                        '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Pin / Zip Code</label>' +
                            '<input type="text" maxlength="20" name="customer_office_pincode" id="customer_office_pincode" value=""  class="form-control form-inputtext" placeholder="">' +
                       '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">State / Region</label>' +
                            '<select name="customer_office_state_id" id="customer_office_state_id" class="form-control form-inputtext">' +
                                '<option value="0">Select State</option>'+state_block+'</select>' +
                       '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Country</label>' +
                            '<select name="customer_office_country_id" id="customer_office_country_id" class="form-control form-inputtext">' +
                                '<option value="">Select Country</option>'+country_block+'</select>' +
                        '</div>' +
                        '<input type="hidden" name="customer_office_address_detail_id" id="customer_office_address_detail_id" class="customer_address_detail_id" autocomplete="off" value="">'+
                        '<div class="col-md-1"><label></label><a id="remove_add_'+id+'" onclick="remove_add_row('+id+');" data-id='+id+'>' +
                        '<i class="fa fa-remove"></i> </a></div> ' +
                        '</div>' ;
                         

    $("#repeat_address").append(html_add);
    $("#addressplus").prop('disabled',false);
});

function remove_add_row(removeid)
{
    $("#new_address_"+removeid).remove();
}
$("#addcustomer").click(function (e)
{   
     var customer_address_data = [];
     var customer_total_address_data = [];
     var customer_children_data = [];
      
      $("#repeat_child .child_data").each(function ()
       {
           var row_id = $(this).attr('id');
           var customer_children = {};
           $(this).find('input,select,hidden').each(function ()
           {
               var id = $(this).attr('id');
               var value_bank = $("#"+row_id+" #"+id).val();
               customer_children[id] = value_bank;
           });
           customer_children_data.push(customer_children);
       });


          $("#repeat_address .row").each(function ()
           {
                var row_id = $(this).attr('id');
                   
               var customer_address = {};
               $(this).find('input,select,hidden').each(function ()
               {
                   var id = $(this).attr('id');
                   var value_customer = '';
                   if(id == 'customer_office_state_id')
                   {
                        value_customer = $('#'+row_id+' #customer_office_state_id :selected').val();
                  
                       customer_address[id] = value_customer;
                   }
                   else
                   {
                        value_customer = $("#"+row_id+" #"+id).val();

                       customer_address[id] = value_customer;
                   }
               });
               customer_address_data.push(customer_address);

           });
          var address_data = JSON.stringify(customer_address_data);
    $("#customer_multi_address").val(address_data);


// if($('input[name="same_address"]').prop("checked") == false){
        $(".cus_address .taddress").each(function ()
           {

                var row_id = $(this).attr('id'); 
                var customer_total_address = {};
                $(this).find('input,select,hidden').each(function ()
                {
                      var id = $(this).attr('id');
                     var value_customer = '';
                     if(id == 'customer_office_state_id')
                     {
                          value_customer = $('#'+row_id+' #customer_office_state_id :selected').val();
                    
                         customer_total_address[id] = value_customer;
                     }
                     else
                     {
                          value_customer = $("#"+row_id+" #"+id).val();

                         customer_total_address[id] = value_customer;
                     }
                });
               
               customer_total_address_data.push(customer_total_address);
               if($('input[id="same_address_yesno"]').prop("checked") == true && $("#customer_address_detail_id").val()==''){
                       $('input[id="same_address_yesno"]').val(1);
                    //customer_total_address_data.push(customer_total_address);
                  return false;
               }
           });


      var main_address_data = JSON.stringify(customer_total_address_data);
      var customer_childrens_data = JSON.stringify(customer_children_data);

    $("#customer_main_address").val(main_address_data);
    $("#customer_child_data").val(customer_childrens_data);

    if(validate_customer('customerform'))
    {
      var dialcode = $(".selected-dial-code").html();
      $("#customer_mobile_dial_code").val(dialcode);

      var data = {
          "formdata": $("#customerform").serialize(),
      };
      var  url = "customer_create";
      var type = "POST";
      var dataType = "";

      callroute(url,type,dataType,data,function (data)
      {
          $("#addcustomer").prop('disabled', false);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {
              toastr.success(dta['Message']);

              $("#customer_id").val('');
              $('#addnewbox').slideToggle();
              var cust_nm = $("#customer_name").val();
             $("#reference_by").append('<option value="'+dta['customer_id']+'">'+cust_nm+'</option>');
              $("#customerform").trigger('reset');
                setTimeout(function () {
                    resettable('customer_data','customertablerecord');
                },200)

          }
          else
          {
              if(dta['status_code'] == 409)
              {
                  $.each(dta['Message'],function (errkey,errval)
                  {
                      var errmessage = errval;
                      toastr.error(errmessage);
                  });
              }
              else
              {
                  toastr.error(dta['Message']);
              }
          }
      })

  }
    $("#addcustomer").prop('disabled', false);
  e.preventDefault();
});

function append_referenceby()
{

}
function openreferral_detail(customer_id)
{


    var  url = "openreferral_ledger";
    var type = "POST";
    var dataType = "";
    var data = {
        'customer_id' : customer_id,
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
           localStorage.setItem('referral_ledger_data',JSON.stringify(dta['Data']));

            window.location.href = url;



        }

    });
}
function openloyalty_detail(customer_id)
{


    var  url = "openloyalty_ledger";
    var type = "POST";
    var dataType = "";
    var data = {
        'customer_id' : customer_id,
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
           localStorage.setItem('loyalty_ledger_data',JSON.stringify(dta['Data']));

            window.location.href = url;



        }

    });
}
function validate_customer(frmid)
{
    var error = 0;

    if($("#customer_name").val() == '')
    {
        error = 1;
        toastr.error("Enter Customer Name!");
        return false;
    }
    if($("#customer_last_name").val() == '')
    {
        error = 1;
        toastr.error("Enter Customer Last Name!");
        return false;
    }
    if($("#customer_mobile").val() == '')
    {
        error = 1;
        toastr.error("Enter Customer Mobile No!");
        return false;
    }
    if($("#customer_email").val() != '')
    {
        var emailid = $("#customer_email").val();
        if(validateEmail(emailid) == 0)
        {
            error = 1;
            toastr.error("Enter proper Customer Email id!");
            return false;
        }
    }

    if(error == 1)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function editcustomer(customer_id)
{
    $("#addcustomer").prop('disable',true);
    $('#addnewbox').slideToggle();
    $("html").scrollTop(0);
    var url = "customer_edit";
    var type = "POST";
    var dataType = "";
    var data = {
        "customer_id": customer_id
    }
    callroute(url, type,dataType, data, function (data)
    {
        $("#addcustomer").prop('disable', false);
        var customer_response = JSON.parse(data);
       
        if (customer_response['Success'] == "True")
        {
            var customer_data = customer_response['Data'];
            $("#reference_by option[value='"+customer_data['customer_id']+"']").remove();

            $("#customer_id").val(customer_data['customer_id']);
            $("#customer_name").val(customer_data['customer_name']);
            $("#customer_last_name").val(customer_data['customer_last_name']);
            $('input[name=gender][value='+customer_data['customer_gender']+']').prop('checked',true);
            $("#customer_mobile").val(customer_data['customer_mobile']);
            $("#customer_email").val(customer_data['customer_email']);
            $("#customer_date_of_birth").val(customer_data['customer_date_of_birth']);
            $("#outstanding_duedays").val(customer_data['outstanding_duedays']);
            $("#source").val(customer_data['customer_source_id']);
            $("#customer_note").val(customer_data['note']);
            $("#referral_id").val(customer_data['referral_id']);
            $("#reference_by").val(customer_data['reference_by']);
            $("#same_delivery_address").val(customer_data['same_delivery_address']);
            if(customer_data['same_delivery_address'] == "0"){
              $('input[id="same_address_yesno"]').prop('checked',false);
              $("#customer_deleivery_address").show();              
            }
          else{
              $('input[id="same_address_yesno"]').prop('checked',true);
              $("#customer_deleivery_address").hide();   
          }

            if(customer_data['reference_by'] != '' && customer_data['reference_by'] != null && customer_data['reference_by'] != 'NULL')
            {
                $("#reference_by_search").val(customer_data['customer_reference_by']['customer_name'] + '_' + customer_data['customer_reference_by']['customer_mobile']);
            }


            if(customer_data['customer_mobile_dial_code'] != '')
            {
               $(".selected-dial-code").html(customer_data['customer_mobile_dial_code']);
            }

            // if(customer_data['customer_children'] != '' && customer_data['customer_children'] != 'undefined')
            // {           
            //   $("#repeat_child").html('');
            //   $("#cust_child_plus").data('id',0);
            //   var j = 0;
            //   $.each(customer_data['customer_children'],function (key,value)
            //      {
            //       $('#cust_child_plus').attr('data-id' ,j);
            //       document.getElementById("cust_child_plus").click();
            //         j++;
            //        $("#child_"+j+" #child_data").attr('data-id',"child_"+j);
            //        $("#child_"+j+" #child_name").val(value['customer_child_name']);
            //        $("#child_"+j+" #child_date_of_birth").val(value['customer_date_of_birth']);
            //        $("#child_"+j+" #child_date_of_birth").datepicker("setDate",value['customer_date_of_birth']);
            //        $("#child_"+j+" #customer_child_id").val(value['customer_child_id']);
                 
            //      }); 
            // }

            if(typeof customer_data['customer_multi_address_detail'] != '' && customer_data['customer_multi_address_detail'] != 'undefined' && customer_data['customer_multi_address_detail'] != null)
            {
                var address_detail = customer_data['customer_multi_address_detail'];
                var total_add = address_detail.length;
               $("#customer_gstin").val(customer_data['customer_multi_address_detail'][0]['customer_gstin']);

                $("#repeat_address").html('');
                  $("#addressplus").data('id',0);

                var i =0;
                 $.each(address_detail,function (key,value)
                 {
               
                    $('#addressplus').attr('data-id' ,i);
                   if(value['customer_address_type'] == "1")
                   {
                    $("#customer_full_address #customer_address_detail_id").val(value['customer_address_detail_id']);
                   // $("#customer_full_address #customer_gstin").val(value['customer_gstin']);
                    $("#customer_full_address #customer_address").val(value['customer_address']);
                    $("#customer_full_address #customer_area").val(value['customer_area']);
                    $("#customer_full_address #customer_city").val(value['customer_city']);
                    $("#customer_full_address #customer_pincode").val(value['customer_pincode']);
                    $("#customer_full_address #customer_state_id").val(value['state_id']);
                    $("#customer_full_address #customer_country_id").val(value['country_id']);
                   }
                   if(value['customer_address_type'] == "2")
                   {

                    $("#customer_deleivery_address #customer_address_detail_id").val(value['customer_address_detail_id']);
                   // $("#customer_gstin").val(value['customer_gstin']);
                    $("#customer_deleivery_address #customer_address").val(value['customer_address']);
                    $("#customer_deleivery_address #customer_area").val(value['customer_area']);
                    $("#customer_deleivery_address #customer_city").val(value['customer_city']);
                    $("#customer_deleivery_address #customer_pincode").val(value['customer_pincode']);
                    $("#customer_deleivery_address #customer_state_id").val(value['state_id']);
                    $("#customer_deleivery_address #customer_country_id").val(value['country_id']);
                   }
                   else if(value['customer_address_type'] == "3" && customer_multi_address == "1")
                   {
                    //key++


                     // if (i != 0)
                     //    {

                     document.getElementById("addressplus").click(); //append multiple address
                     // }
                    i++;
                    $("#new_address_"+i+" #customer_office_address_detail_id").val(value['customer_address_detail_id']);
                   // $("#new_aaddress_"+key+" #customer_gstin").val(value['customer_gstin']);
                    $("#new_address_"+i+" #customer_office_address").val(value['customer_address']);
                    $("#new_address_"+i+" #customer_office_area").val(value['customer_area']);
                    $("#new_address_"+i+" #customer_office_city").val(value['customer_city']);
                    $("#new_address_"+i+" #customer_office_pincode").val(value['customer_pincode']);
                    $("#new_address_"+i+" #customer_office_state_id").val(value['state_id']);
                    $("#new_address_"+i+" #customer_office_country_id").val(value['country_id']);

                }
           
               
                    //$("#new_aaddress_"+key+" #customer_same_address_yesno").val(value['same_as_delievery_address']);
                });
                i = 0;

         
                // if(address_detail['same_as_delievery_address'] == 0){
                //         $('.same_address').hide();                    
                // }
                // else{
                //     $('.same_address').show();
                //     $('.customer_same_address').prop('checked',false);
                //     $("#customer_office_address").val(address_detail['customer_office_address']);
                //     $("#customer_office_area").val(address_detail['customer_office_area']);
                //     $("#customer_office_city").val(address_detail['customer_office_city']);
                //     $("#customer_office_pincode").val(address_detail['customer_office_pincode']);
                //         if(address_detail['customer_office_state_id'] == null)
                //         {
                //             $("#customer_office_state_id").val('0');
                //         }
                //         else
                //         {
                //             $("#customer_office_state_id").val(address_detail['customer_office_state_id']);
                //         }
                //          $("#customer_office_country_id").val(address_detail['customer_office_country_id']);

                // }
    
                if(address_detail['customer_gstin'] != '' && address_detail['customer_gstin'] != null)
                {
                    $('#state_id').attr("style", "pointer-events: none;");
                }
                else
                {
                    $('#state_id').attr("style", "pointer-events: all;");
                }

                if(address_detail['state_id'] == null)
                {
                    $("#state_id").val('0');
                }
                else
                {
                    $("#state_id").val(address_detail['state_id']);
                }

                $("#country_id").val(address_detail['country_id']);
            }
        }
    });
}


$('#checkallcustomer').change(function()
{
    if($(this).is(":checked"))
    {
        $("#customerrecordtable tr").each(function()
        {
            var id = $(this).attr('id');

            $(this).find('td').each(function ()
            {
                $("#delete_customer"+id).prop('checked',true);
            });
        })
    }
    else
    {
        $("#customerrecordtable tr").each(function(){
            var id = $(this).attr('id');
            $(this).find('td').each(function ()
            {
                $("#delete_customer"+id).prop('checked',false);
            });
        })
    }
});


$("#deletecustomer").click(function ()
{
    var ids = [];

    $('input[name="delete_customer[]"]:checked').each(function()
    {
        ids.push($(this).val());
    });
    if(ids.length > 0)
    {
        var errmsg = "Are You Sure want to delete this Customer?";

        swal({
                title: errmsg,
                type: "warning",
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes!",
                showCancelButton: true,
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {

                    var data = {
                        "deleted_id": ids
                    };
                    var url = "customer_delete";
                    var type = "POST";
                    var dataType = "";
                    callroute(url, type, dataType, data, function (data) {
                        var dta = JSON.parse(data);

                        if (dta['Success'] == "True") {
                            toastr.success(dta['Message']);
                            resettable('customer_data', 'customertablerecord');

                        } else {
                            toastr.error(dta['Message']);
                        }
                    })
                }
                else
                {
                    return false;
                }
            })
        }
    else
    {
        toastr.error("Please Select Any Customer To Delete");
        return false;
    }
});
function delete_separate_customer(obj,customer_id,event)
{
    $(obj).closest('td').find('[type=checkbox]').prop('checked',true);
    event.preventDefault();
    if($(obj).closest('td').find('[type=checkbox]').prop('checked') == true)
    {
        setTimeout(
            function()
            {
                 $('#deletecustomer')[0].click();
            }, 300);
    }

}

function resetcustomerdata()
{
    $("#customerform").trigger('reset');
    $("#customer_id").val('');
    $("#customer_address_detail_id").val('');
}


$("#customer_date_of_birth").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom"
}).on('keypress paste', function (e) {
    e.preventDefault();
    return false;
});


//based on gst select state
$("#customer_gstin").keyup(function ()
{
    var gst_state_code = $("#customer_gstin").val().substr(0,2);

    if(gst_state_code.length != 0)
    {
        $('#state_id').attr("style", "pointer-events: none;");

        $("#state_id").css('color','black');
        if(gst_state_code.startsWith('0'))
        {
            gst_state_code = gst_state_code.substring(1);
        }
        $("#state_id").val(gst_state_code);
    }
    else
    {
        $('#state_id').attr("style", "pointer-events: all;");

        $("#state_id").val('0');
    }


});
//end of select state based on gst

function resetcustomerfilterdata()
{
    $("#filter_customer_name").val('');
    $("#filter_mobile_no").val('');
    $("#filter_email_id").val('');
    $("#filter_gst_in").val('');
    $("#filter_date_of_birth").val('');
    $("#filter_area").val('');
    $("#filter_city").val('');
    $("#filer_pincode").val('');
    $("#filter_state_id").val(0);
    $("#filter_country_id").val(0);

    $("#hidden_page").val(1);

    resettable('customer_data','customertablerecord');
}

$(document).on('click','#download_customer_tmpate',function ()
{
    var url = "customer_template?";
    window.open(url, '_blank');
});


$("body").on("click", "#uploadcustomer", function ()
{
    $("#uploadcustomer").attr('disabled',true);

    $(".loaderContainer").show();

    //Reference the FileUpload element.
    var fileUpload = $("#customerfileUpload")[0];

    var ext = fileUpload.value.split('.').pop();

    //Validate whether File is valid Excel file.
    var validImageTypes = ['xls', 'xlsx'];

    // var regex = /^([a-zA-Z 0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    // if (regex.test(fileUpload.value.toLowerCase())) {
    if (validImageTypes.includes(ext))
    {
        if (typeof (FileReader) != "undefined")
        {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString)
            {
                reader.onload = function (e)
                {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e)
                {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            $("#uploadcustomer").attr('disabled',false);
            $(".loaderContainer").hide();
            alert("This browser does not support HTML5.");
        }
    } else {
        $("#uploadcustomer").attr('disabled',false);
        $(".loaderContainer").hide();
        alert("Please upload a valid Excel file.");
    }
});

function ProcessExcel(data)
{
    //Read the Excel File data.

    var result;

    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet],{ defval: ''});

    var final_customerarr = [];
    $.each(excelRows,function (key,value)
    {
        var final_data = {};
        $.each(value,function (arrkwy,arrval)
        {
            if (!arrkwy.match("^__EMPTY"))
            {
                final_data[arrkwy] = arrval;
            }
        });
        final_customerarr.push(final_data);
    });

    var error = 0;

   $.each(final_customerarr,function (validate_ckey,validate_cvalue)
    {
        if(validate_cvalue['Customer First Name'] == '')
        {
            error = 1;
            toastr.error("Customer first name can not be empty!");
        }
        if(validate_cvalue['Customer Last Name'] == '')
        {
            error = 1;
            toastr.error("Customer last name can not be empty!");
        }

        if(validate_cvalue['Gender'] != "" && validate_cvalue['Gender'] != "male" && validate_cvalue['Gender'] != "Male" && validate_cvalue['Gender'] != "MALE"  && validate_cvalue['Gender'] != "female" && validate_cvalue['Gender'] != "Female" && validate_cvalue['Gender'] != "FEMALE" && validate_cvalue['Gender'] != "transgender" && validate_cvalue['Gender'] != "Transgender" && validate_cvalue['Gender'] != "TRANSGENDER")
        {
            error = 1;
            toastr.error("Customer Gender must 'male','Male','MALE','female','Female','FEMALE','transgender','Transgender','TRANSGENDER'!");
        }

        if(validate_cvalue['Customer Mobile Country Code'] != "" && !$.isNumeric(validate_cvalue['Customer Mobile Country Code']))
        {
            error = 1;
            toastr.error("Customer Mobile Country Code must be numeric!");
        }

        if(validate_cvalue['Mobile No.'] == "")
        {
            error = 1;
            toastr.error("Customer Mobile No. can not be empty!");
        }

        if(validate_cvalue['Mobile No.'] != "" && !$.isNumeric(validate_cvalue['Mobile No.']))
        {
            error = 1;
            toastr.error("Customer Mobile No. must be numeric!");
        }

        if(validate_cvalue['Email'] != '')
        {
            var emailid = validate_cvalue['Email'];
            if(validateEmail(emailid) == 0)
            {
                error = 1;
                toastr.error(emailid + "Enter proper Customer Email id!");
                console.log(emailid + "Enter proper Customer Email id!");
                return false;
            }
        }

        //CHECKING MFG DATE,MONTH AND YEAR DIGIT AND PROPER DATE FORMAT VALIDATION
        if(validate_cvalue['Day of Birth(DD)'] != '' || validate_cvalue['Month of Birth(MM)'] != '' || validate_cvalue['Year of Birth(YYYY)'] != '')
        {
            if(separtate_date_format_validation(validate_cvalue['Day of Birth(DD)'],validate_cvalue['Month of Birth(MM)'],validate_cvalue['Year of Birth(YYYY)'],"Date of birth") == 0)
            {
                error  = 1;
            }
        }
        //END OF CHECKING MFG DATE FORMAT VALIDATION


        if(validate_cvalue['Credit Period(days)'] != "" && !$.isNumeric(validate_cvalue['Credit Period(days)']))
        {
            error = 1;
            toastr.error("Customer Credit Period(days) must be numeric!");
        }

        if(error == 1)
        {
            $("#uploadcustomer").attr('disabled',false);
            $(".loaderContainer").hide();
            return false;
        }
    });


    if(error == 0)
    {
        checkcustomer(final_customerarr);
    }

}


function checkcustomer(customerarr)
{
    var  url = "customer_check";
    var type = "POST";
    var dataType = "";

    callroute(url,type,dataType,customerarr,function (data)
    {
        var responce = JSON.parse(data);
        if(responce['Success'] == "True")
        {
            $(".loaderContainer").hide();
            toastr.success(responce[['Message']]);
            $("#uploadcustomer").attr('disabled',false);
            $("#upload_customer_popup").modal('hide');
            $("#customerfileUpload").val('');
            resetcustomerfilterdata();
        }
        else
        {
            toastr.error(responce[['Message']]);
            $(".loaderContainer").hide();
            $("#uploadcustomer").attr('disabled',false);
        }
    })
}


$("#upload_customer_tmpate").click(function ()
{
   jQuery.noConflict();
$("#upload_customer_popup").modal('show');
});


$(document).on('click', '#customer_export', function(){

    var query = {};
   $(".common-search").find('input,select').each(function ()
   {
       query[$(this).attr('name-attr')] = $(this).val();
   });

    var querydata = {
        'query' : query
    };
    var url = "customer_export?" + $.param(querydata)
    window.open(url,'_blank');
});

$("#customer_mobile").keyup(function ()
{
    var customer_mobile = $(this).val();

   $("#referral_id").val(customer_mobile);
});
function showdetails_address(obj){
    var customer_id = $(obj).attr('id').split('_')[1];


   $('#showaddress_'+customer_id).toggle();


    $('#down_'+customer_id).hide();
    $('#up_'+customer_id).show();

    var type = "POST";
    var url = "view_customer_address_detail";
    var dataType = '';
    var data={
        'customer_id' : customer_id,
    };


    callroute(url,type,dataType,data,function (data) {
             var response = JSON.parse(data);
             console.log(response);
    if (response['Success'] == "True")
        {

        var product_html = '';
        product_html += '<div style="hover:#ffffff !important;"><table width="100%" border="0" style="padding:0px !important"><tr>' +
                    '<td width="15%" style="vertical-align:top !important;" class="rightAlign">' +
                    '<span class="iconify" data-icon="mdi-subdirectory-arrow-right" data-inline="false" style="font-size: 80px;margin:-25px 0 0 0;color:#DDDDDD;"></span>' +
                    '</td>' +
                    '<td width="85%">' +
                    '<table class="table mb-0 detailTable" style="" cellpadding="4">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col" style="width:12%;cursor: pointer;font-size:14px;" class="leftAlign"></th>' +
                    '<th scope="col" style="width:12%;cursor: pointer;font-size:14px;" class="leftAlign">Address</th>' +
                    '<th scope="col" style="width:12%;cursor: pointer;font-size:14px;" class="leftAlign">Area</th>' +
                    '<th scope="col" style="width:12%;cursor: pointer;font-size:14px;" class="leftAlign">City / Town</th>' +
                    '<th scope="col" style="width:12%;cursor: pointer;text-align:right;font-size:14px;">Pin / Zip Code</th>' +
                    '<th scope="col" style="width:12%;cursor: pointer;font-size:14px;">State</th>' +
                    '<th scope="col" style="width:12%;cursor: pointer;font-size:14px;">Country</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody id="">' ;

                    var count = 0;
       response['Data'].forEach(function (value)
           {
            count++;
            if(value['state_id'] != null){

                var state_name = value['state_name']['state_name'];
            }
            else{
                var state_name = '';
            }
            if(value['country_id'] != null){

                var country_name = value['country_name']['country_name'];
            }
            else{
                var country_name = '';
            }

            product_html += '<tr>'+
            '<td class="leftAlign">' + count + '</td>' +
            '<td class="leftAlign">' + value['customer_address'] + '</td>' +
            '<td class="leftAlign">' + value['customer_area'] + '</td>' +
            '<td class="leftAlign">' + value['customer_city'] + '</td>'  +
            '<td class="rightAlign">' + value['customer_pincode'] + '</td>'  +
            '<td class="leftAlign">' + state_name+ '</td>'  +
            '<td class="leftAlign">' + country_name + '</td>'  +
        
            '</tr>' ;

            });
        }

        product_html += '</tbody>' +
                '</table>' +
                '</td>' +
            '</tr>' +
            '</table>' +
            '</div>';

              $("#showdetail"+customer_id).append(product_html);
    });


}
function hidedetails_address(obj){


    var customer_id = $(obj).attr('id').split('_')[1];


    $('#showaddress_'+customer_id).toggle();
      $('#down_'+customer_id).show();
    $('#up_'+customer_id).hide();
    var product_html = '';
   product_html += '';
   $("#showdetail"+customer_id).html('');
}

$(document).on('click', '#cust_child_plus', function()
{
    $("#cust_child_plus").prop('disabled',true);
    var id = $(this).attr('data-id');
    id++;
    $(this).attr('data-id',id);

    var html_bank = '';

    html_bank += '<div class="hk-row child_data" id="child_'+id+'">'+
                                        '<div class="col-md-3">'+
                                                '<label class="form-label">Children Name</label>'+
                                                '<input type="text" maxlength="50" autocomplete="off" name="child_name" id="child_name" value="" class="form-control form-inputtext" placeholder="" autofocus="">'+
                                        '</div>'+
                                        '<div class="col-md-3">'+
                                                '<label class="form-label">Children Birth Date</label>'+
                                                '<input type="text" maxlength="15" name="child_date_of_birth" id="child_date_of_birth" value="" class="form-control form-inputtext child_date_of_birth'+id+'" placeholder="" autocomplete="off">'+
                                        '</div>'+
                                         '<input type="hidden" name="customer_child_id" id="customer_child_id" class="customer_child_id" autocomplete="off" value="">'+
                                        '<div class="col-md-1"><label></label><a id="remove_child_'+id+'" onclick="remove_child_row('+id+');" data-id='+id+'>' +
                                          '<i class="fa fa-remove"></i> </a></div> ' +
                                        '</div>'
                                    '</div>';

    $("#repeat_child").append(html_bank);
    $("#cust_child_plus").prop('disabled',false);
    $(".child_date_of_birth" + id).datepicker({
          format: 'dd-mm-yyyy',
          orientation: "bottom"
          });

    if (id > 1) {
        $(".child_date_of_birth"+id).datepicker({
          format: 'dd-mm-yyyy',
          orientation: "bottom"
          });
    }
   
        
//i++;

});
$(".child_date_of_birth").datepicker({
        format: 'dd-mm-yyyy',
        orientation: "bottom"
        }).on('keypress paste', function (e) {
        e.preventDefault();
        return false;
        });
function remove_child_row(removeid)
{
    $("#child_"+removeid).remove();
}
