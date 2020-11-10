$(document).ready(function(){
  $('input[id="same_address_yesno"]').val(1);
    $('input[name="same_address_yesno"]').click(function(){
        if($(this).prop("checked") == true){
            $("#steward_deleivery_address").hide();
          $(".cus_address #steward_deleivery_address").find('input[type="text"],select,hidden').val('');
            $('input[id="same_address_yesno"]').val(1);

        }
        else if($(this).prop("checked") == false){
            $("#steward_deleivery_address").show();
            $('input[id="same_address_yesno"]').val(0);
        }
    });
});


function remove_add_row(removeid)
{
    $("#new_address_"+removeid).remove();
}
$("#addsteward").click(function (e)
{   
   
    if(validate_steward('stewardform'))
    {
      

      var data = {
          "formdata": $("#stewardform").serialize(),
      };
      var  url = "steward_create";
      var type = "POST";
      var dataType = "";

      callroute(url,type,dataType,data,function (data)
      {
          $("#addsteward").prop('disabled', false);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {
              toastr.success(dta['Message']);

              $("#steward_id").val('');
              $('#addnewbox').slideToggle();
              var cust_nm = $("#steward_name").val();
            
              $("#stewardform").trigger('reset');
                setTimeout(function () {
                    resettable('steward_data','stewardtablerecord');
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
    $("#addsteward").prop('disabled', false);
  e.preventDefault();
});


function validate_steward(frmid)
{
    var error = 0;

    if($("#steward_name").val() == '')
    {
        error = 1;
        toastr.error("Enter steward Name!");
        return false;
    }
    if($("#steward_last_name").val() == '')
    {
        error = 1;
        toastr.error("Enter steward Last Name!");
        return false;
    }
    if($("#steward_mobile").val() == '')
    {
        error = 1;
        toastr.error("Enter steward Mobile No!");
        return false;
    }
    if($("#steward_email").val() != '')
    {
        var emailid = $("#steward_email").val();
        if(validateEmail(emailid) == 0)
        {
            error = 1;
            toastr.error("Enter proper steward Email id!");
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

function editsteward(steward_id)
{
    $("#addsteward").prop('disable',true);
    $('#addnewbox').slideToggle();
    $("html").scrollTop(0);
    var url = "steward_edit";
    var type = "POST";
    var dataType = "";
    var data = {
        "steward_id": steward_id
    }
    callroute(url, type,dataType, data, function (data)
    {
        $("#addsteward").prop('disable', false);
        var steward_response = JSON.parse(data);
       
        if (steward_response['Success'] == "True")
        {
            var steward_data = steward_response['Data'];
            $("#reference_by option[value='"+steward_data['steward_id']+"']").remove();

            $("#steward_id").val(steward_data['steward_id']);
            $("#steward_name").val(steward_data['steward_name']);
            $("#steward_last_name").val(steward_data['steward_last_name']);
            $('input[name=gender][value='+steward_data['steward_gender']+']').prop('checked',true);
            $("#steward_mobile").val(steward_data['steward_mobile']);
            $("#steward_email").val(steward_data['steward_email']);
            
           
        }
    });
}


$('#checkallsteward').change(function()
{
    if($(this).is(":checked"))
    {
        $("#stewardrecordtable tr").each(function()
        {
            var id = $(this).attr('id');

            $(this).find('td').each(function ()
            {
                $("#delete_steward"+id).prop('checked',true);
            });
        })
    }
    else
    {
        $("#stewardrecordtable tr").each(function(){
            var id = $(this).attr('id');
            $(this).find('td').each(function ()
            {
                $("#delete_steward"+id).prop('checked',false);
            });
        })
    }
});


$("#deletesteward").click(function ()
{
    var ids = [];

    $('input[name="delete_steward[]"]:checked').each(function()
    {
        ids.push($(this).val());
    });
    if(ids.length > 0)
    {
        var errmsg = "Are You Sure want to delete this steward?";

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
                    var url = "steward_delete";
                    var type = "POST";
                    var dataType = "";
                    callroute(url, type, dataType, data, function (data) {
                        var dta = JSON.parse(data);

                        if (dta['Success'] == "True") {
                            toastr.success(dta['Message']);
                            resettable('steward_data', 'stewardtablerecord');

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
        toastr.error("Please Select Any steward To Delete");
        return false;
    }
});
function delete_separate_steward(obj,steward_id,event)
{
    $(obj).closest('td').find('[type=checkbox]').prop('checked',true);
    event.preventDefault();
    if($(obj).closest('td').find('[type=checkbox]').prop('checked') == true)
    {
        setTimeout(
            function()
            {
                 $('#deletesteward')[0].click();
            }, 300);
    }

}

function resetstewarddata()
{
    $("#stewardform").trigger('reset');
    $("#steward_id").val('');
    $("#steward_address_detail_id").val('');
}





//end of select state based on gst

function resetstewardfilterdata()
{
    $("#filter_steward_name").val('');
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

    resettable('steward_data','stewardtablerecord');
}

