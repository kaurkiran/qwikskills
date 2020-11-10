
$("#add_customer_source").click(function (e) {
    if(validate_customer_source('customer_source_form'))
    {
        var data = {
            "formdata": $("#customer_source_form").serialize(),
        };

        var  url = "customer_source_create";
        var type = "POST";
        var dataType="";

        callroute(url,type,dataType,data,function (data)
        {
            $("#add_customer_source").prop('disabled', false);
            var dta = JSON.parse(data);

            if(dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
                $("#customer_source_form").trigger('reset');
                $("#customer_source_id").val('');
                $("#source_name").focus();
                //$('#addnewbox').slideToggle();

                resettable('source_data','sourcetablerecord');
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
    $("#add_customer_source").prop('disabled', false);
    e.preventDefault();
});

function validate_customer_source(frmid)
{
    var error = 0;

    if($("#source_name").val() == '')
    {
        error = 1;
        toastr.error("Enter Source Name!");
        return false;
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


function editsource(source_id)
{
    $("#add_customer_source").prop('disable',true);
    $('#addnewbox').slideToggle();
    $("html").scrollTop(0);
    var url = "customer_source_edit";
    var type = "POST";
    var dataType = "";
    var data = {
        "customer_source_id": source_id
    }
    callroute(url, type,dataType, data, function (data)
    {
        $("#add_customer_source").prop('disable', false);
        var customer_source_response = JSON.parse(data);

        if (customer_source_response['Success'] == "True")
        {

            var customer_source_data = customer_source_response['Data'];
            $("#customer_source_id").val(customer_source_data['customer_source_id']);
            $("#source_name").val(customer_source_data['source_name']);
            $("#customer_source_note").val(customer_source_data['note']);

            }
    });
}


$('#checkallcustomer_source').change(function()
{
    if($(this).is(":checked")) {
        $("#sourcetablerecord tr").each(function()
        {
            var id = $(this).attr('id');

            $(this).find('td').each(function ()
            {
                $("#delete_source"+id).prop('checked',true);
            });
        })
    }
    else
    {
        $("#sourcetablerecord tr").each(function(){
            var id = $(this).attr('id');
            $(this).find('td').each(function ()
            {
                $("#delete_source"+id).prop('checked',false);
            });

        })
    }
});


$("#deletesource").click(function ()
{
    var ids = [];

    $('input[name="delete_source[]"]:checked').each(function()
    {
        ids.push($(this).val());
    });


    if(ids.length > 0) {

        var errmsg = "Are You Sure want to delete this Source?";
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
                    var url = "customer_source_delete";
                    var type = "POST";
                    var dataType = "";
                    callroute(url, type, dataType, data, function (data) {
                        var dta = JSON.parse(data);

                        if (dta['Success'] == "True") {
                            toastr.success(dta['Message']);
                            resettable('source_data', 'sourcetablerecord');

                        } else {
                            toastr.error(dta['Message']);
                        }
                    })
                }
                else
                {
                    return false;
                }
            });
    }
    else
    {
        toastr.error("Please Select Any Source To Delete");
        return false;
    }
});

function delete_separate_source(obj,customer_source_id,event)
{
    $(obj).closest('td').find('[type=checkbox]').prop('checked',true);
    event.preventDefault();
    if($(obj).closest('td').find('[type=checkbox]').prop('checked') == true)
    {
        setTimeout(
            function()
            {
                 $('#deletesource')[0].click();
            }, 300);
    }

}

function resetcustomersourcedata()
{
    $("#customer_source_form").trigger('reset');
    $("#customer_source_id").val('');

}



function resetcustomerfilterdata()
{
    $("#filter_source_name").val('');


    $("#hidden_page").val(1);

    resettable('source_data','sourcetablerecord');
}






