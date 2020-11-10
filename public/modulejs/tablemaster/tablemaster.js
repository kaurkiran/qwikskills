$('#table_type').change(function(e){

        var table_type  =  $('#table_type').val();
        if(Number(table_type) == 1)
        {
                $('.customerdiv').show();
                $('.staffdiv').hide();
        }
        else
        {
                $('.customerdiv').hide();
                $('.staffdiv').show();
        }

});

$("#addtablemaster").click(function (e) {
    if (validate_tablemaster('tablemasterform')) {
        $("#addtablemaster").prop('disabled', true);

        var data = {
            "formdata": $("#tablemasterform").serialize(),
        };
        var url = "tablemaster_create";
        var dataType = "";
        var type = "POST";
        callroute(url, type, dataType, data, function (data) {
            var dta = JSON.parse(data);

            if (dta['Success'] == "True") {
                toastr.success(dta['Message']);
                $("#tablemasterform").trigger('reset');
                $("#tablemaster_id").val('');
                resettable('tablemaster_data', 'tabletablerecord');
            } else {
                toastr.error(dta['Message']);
            }
            $("#addtablemaster").prop('disabled', false);
        })

    }
    //$(this).prop('disabled', false);
    e.preventDefault();
});

function validate_tablemaster(frmid) {
    var error = 0;

    var table_type  =  $('#table_type').val();
    if(Number(table_type) == 1)
    {
        if ($("#table_title").val() == '') {
        error = 1;
        toastr.error("Enter table Title!");
        return false;
        }
    }
    else
    {
        if ($("#person_name").val() == '') {
        error = 1;
        toastr.error("Enter Person Name!");
        return false;
        }
    }


    
  
    

    
    if (error == 1) {
        return false;
    } else {
        return true;
    }
}


//edit product

function edittablemaster(tablemasterid) {
    $(this).prop('disable', true);
    var url = "tablemaster_edit";
    var type = "POST";
    var dataType = "";
    var data = {
        "tablemaster_id": tablemasterid
    }
    callroute(url, type, dataType, data, function (data) {
        $(this).prop('disable', false);
        var tablemaster_response = JSON.parse(data);

        if (tablemaster_response['Success'] == "True") {

            var tablemaster_data = tablemaster_response['Data'];

            $("#tablemaster_id").val(tablemaster_data['tablemaster_id']);
            $("#table_type").val(tablemaster_data['table_type']);
            $("#table_title").val(tablemaster_data['table_title']);
            $("#table_value").val(tablemaster_data['table_value']);
            $('input[name=table_value_type][value='+tablemaster_data['table_value_type']+']').prop('checked',true);
        }
    });
}


$("#deletetablemaster").click(function () {
    // if (confirm("Are You Sure want to delete this GST slabs?")) {

        var ids = [];

        $('input[name="delete_tablemaster[]"]:checked').each(function () {
            ids.push($(this).val());
        });


        if (ids.length > 0) {

            var errmsg = "Are You Sure want to delete this table Master Entry?";
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
            var url = "tablemaster_delete";
            var dataType = "";
            var type = "POST";
            callroute(url, type, dataType, data, function (data) {
                var dta = JSON.parse(data);

                if (dta['Success'] == "True") {
                    toastr.success(dta['Message']);
                    $("#tablemasterform").trigger('reset');
                    $("#tablemaster_id").val('');
                    resettable('tablemaster_data', 'tabletablerecord');
                } else {
                    toastr.error(dta['Message']);
                }
            })
        } else {
            return false;
        }
    // }
    })
        }
    else {
        return false;
    }
});
function delete_separate_tablemaster(obj,tablemaster_id,event)
{
    $(obj).closest('td').find('[type=checkbox]').prop('checked',true);
    event.preventDefault();
    if($(obj).closest('td').find('[type=checkbox]').prop('checked') == true)
    {
        setTimeout(
            function()
            {
                 $('#deletetablemaster')[0].click();
            }, 300);
    }

}

$("#canceltablemaster").click(function () {
    $("#selling_price_from").val('');
    $("#selling_price_to").val('');
    $("#percentage").val('');
    $("#tablemaster_id").val('');
});


$('#checkall').change(function () {
    if ($(this).is(":checked")) {
        $("#tablemasterrecord tr").each(function () {
            var id = $(this).attr('id');

            $(this).find('td').each(function () {
                $("#delete_tablemaster" + id).prop('checked', true);
            });

        })
    } else {
        $("#tablemasterrecord tr").each(function () {
            var id = $(this).attr('id');
            $(this).find('td').each(function () {
                $("#delete_tablemaster" + id).prop('checked', false);
            });

        })
    }
});






