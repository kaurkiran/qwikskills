$("#savebrand").click(function ()
{
    if(validate_brandform('brandform'))
    {
        $("#savebrand").prop('disabled', true);
        var type = "POST";
        var dataType = "";
        var url = 'brand_create';
        var data = {
            "formdata": $("#brandform").serialize()
        };
        callroute(url,type,dataType,data,function (data)
        {
            $("#savebrand").prop('disabled', false);
            var dta = JSON.parse(data);
           if(dta['Success'] == "True")
           {
               toastr.success(dta['Message']);
               getbrand(dta['brand_id']);
               $("#addbrandpopup").modal('hide');
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

});

function validate_brandform(frmid)
{
    var error = 0;


    if($("#brand_type").val() == '')
    {
        error = 1;
        toastr.error('Please Enter Brand Name!');
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


$("#savecategory").click(function ()
{
    if(validate_categoryform('categoryform'))
    {
        $("#savecategory").prop('disabled', true);
        var type = "POST";
        var url = 'category_create';
        var dataType = "";
        var data = {
            "formdata": $("#categoryform").serialize()

        };
        callroute(url,type,dataType,data,function (data)
        {
            $(this).prop('disabled', false);
            var dta = JSON.parse(data);
            if(dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
                var category_id = '';
                getCategory(1,dta['category_id']);
                $("#addcategorypopup").modal('hide');
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

});


function validate_categoryform(frmid)
{
    var error = 0;

    if($("#category_name").val() == '')
    {
        error = 1;
        toastr.error('Please Enter Category Name!');
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


$("#savesubcategory").click(function ()
{
    if(validate_subcategoryform('subcategoryform'))
    {
        $("#savesubcategory").prop('disabled', true);
        var type = "POST";
        var url = 'subcategory_create';
        var dataType = "";
        var data = {
            "formdata": $("#subcategoryform").serialize()
        };
        callroute(url,type,dataType,data,function (data)
        {
            $("#savesubcategory").prop('disabled', false);
            var dta = JSON.parse(data);

            if(dta['Success'] == "True")
            {
                subcategory_id = '';
                category_id = '';
               // $("#category_id").html('');
                if(dta['subcategory_id'] != '' && dta['subcategory_id'] != undefined)
                {
                    subcategory_id = dta['subcategory_id'];
                }
                if(dta['category_id'] != '' && dta['category_id'] != undefined)
                {
                    $("#category_id").val(dta['category_id']);
                }
                toastr.success(dta['Message']);


                getsubcategory(subcategory_id);
                $("#addsubcategorypopup").modal('hide');
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

});

function validate_subcategoryform(frmid)
{
    var error = 0;


    if($("#popcategory_id").val() == '0')
    {
        error = 1;
        toastr.error('Please Select Category!');
        return false;
    }

    if($("#subcategory_name").val() == '')
    {
        error = 1;
        toastr.error('Please Enter Subcategory Name!');
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



$("#savecolour").click(function ()
{
    if(validate_colourform('colourform'))
    {
        $("#savecolour").prop('disabled', true);
        var type = "POST";
        var url = 'colour_create';
        var dataType = "";
        var data = {
            "formdata": $("#colourform").serialize()

        };
        callroute(url,type,dataType,data,function (data)
        {
            $("#savecolour").prop('disabled', false);
            var dta = JSON.parse(data);
           if(dta['Success'] == "True")
           {
               toastr.success(dta['Message']);
               getColour(dta['colour_id']);
               $("#addcolourpopup").modal('hide');
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

});

function validate_colourform(frmid)
{
    var error = 0;


    if($("#colour_name").val() == '')
    {
        error = 1;
        toastr.error('Please Enter Colour Name!');
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



$("#savesize").click(function ()
{
    if(validate_sizeform('sizeform'))
    {
        $("#savesize").prop('disabled', true);
        var type = "POST";
        var url = 'size_create';
        var dataType = "";
        var data = {
            "formdata": $("#sizeform").serialize()

        };
        callroute(url,type,dataType,data,function (data)
        {
            $(this).prop('disabled', false);
            var dta = JSON.parse(data);
            if(dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
                getSize(dta['size_id']);
                $("#addsizepopup").modal('hide');
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

});

function validate_sizeform(frmid)
{
    var error = 0;


    if($("#size_name").val() == '')
    {
        error = 1;
        toastr.error('Please Enter Size Name!');
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



$("#saveuqc").click(function ()
{
    if(validate_uqcform('uqcform'))
    {
        $(this).prop('disabled', true);
        var type = "POST";
        var url = 'uqc_create';
        var dataType = '';
        var data = {
            "formdata": $("#uqcform").serialize()
        };
        callroute(url,type,dataType,data,function (data)
        {
            $(this).prop('disabled', false);
            var dta = JSON.parse(data);
            if(dta['Success'] == "True")
            {
                alert(dta['Message']);
                getUqc();
                $("#adduqcpopup").modal('hide');
            }
            else
            {
                alert(dta['Message']);
            }
        });
    }
    else
    {
        return false;
    }

});

function validate_uqcform(frmid)
{
    var error = 0;

    if($("#uqc_name").val() == '')
    {
        error = 1;
        toastr.error('Please Enter UQC Name!');
        return false;
    }

    if($("#uqc_type").val() == '')
    {
        error = 1;
        toastr.error('Please Enter UQC Type!');
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
$(document).ready(function () {
    localStorage.removeItem('edit_productskit_record');
})



function productfeature_image_validation(input)
{
    var imageid = $(input).attr('id');

    var validExtensions = ['png','jpg','jpeg']; //array of valid extensions
    var fileName = input.files[0].name;
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ($.inArray(fileNameExt, validExtensions) == -1) {
        input.type = '';
        input.type = 'file';
        $(input).closest('div').find('img').attr('src',"");

        alert("Only these file types are accepted : "+validExtensions.join(', '));
    }
    else
    {
        if (input.files && input.files[0])
        {
            var filerdr = new FileReader();
            filerdr.onload = function (e)
            {
                $(input).closest('div').find("#image_block").show();
                $(input).closest('div').find('img').attr('src', e.target.result);


                $(input).closest('div').find('.json_val').val(e.target.result);
                $(input).closest('div').find('.img_name').val(fileName);
            };
            filerdr.readAsDataURL(input.files[0]);
        }
    }
}
