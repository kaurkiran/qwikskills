var featurerow_count = 1;
//Disable cut copy paste
$('body').bind('cut copy paste', function (e)
{
    e.preventDefault();
});

//Disable mouse right click
$("body").on("contextmenu",function(e){
    return false;
});
$('input[name="checktax"]').click(function(){
    if($(this).prop("checked") == true){
        $('.tax_section').show();

    }
    else if($(this).prop("checked") == false){
        $("input:radio").prop("checked", false);
        $('#taxmaster_id').val('');
        $('#sell_gst_percent').val(0);
        $('.tax_section').hide();
       
    }
});
$('input[name="select_tax_id"]').click(function(){
    var radiovalue  =  $('input[name="select_tax_id"]:checked').val();

    radiovalue  =  radiovalue.split('|');
    var tax_master_id  =  radiovalue[0];
    var tax_value  =  radiovalue[1];
    $('#taxmaster_id').val(tax_master_id);
    $('#sell_gst_percent').val(tax_value);

});
$('input[name="checkconsumption"]').click(function(){
    if($(this).prop("checked") == true){
        $('.consumption_section').show();

    }
    else if($(this).prop("checked") == false){
        $('#consumption_value').val('');
        $('.consumption_section').hide();
       
    }
});

$(document).ready(function ()
{
    // getbrand();
    // getCategory('1','');
    // getColour();
    // getSize();
    //getUqc();

    // ChangeParentChild_SelectMenu();

});

// function ChangeParentChild_SelectMenu()
// {
//     var url = "check_changeover";
//     var type = "GET";
//     var dataType = "";
//     var data = {};

//     callroute(url,type,dataType,data,function (data)
//     {
//         var dta = JSON.parse(data);

//         console.log(dta['Data']);
        
//         var parent      =   dta['Data'][0]['parent'];
//         var child       =   dta['Data'][0]['product_features_id'];
//         var html_id     =   dta['Data'][0]['html_id'];

//         console.log('.'+html_id+'_p_'+parent); return false;

//         $('.'+html_id+'_p_'+parent).change(function(e){
//             var parentid    =   $('.'+html_id+'_p_'+parent).val();
//             alert(parentid);
//         })

//     });
// }

function changeover(product_features_id,classVal,seriesVal)
{
    // console.log(classVal);
    var selectedValue   =   $('#'+classVal).val();
    var attr_id         =   $('#'+classVal).attr('id');

    var sub_cat_series  =   attr_id.split('_');
    // alert(classVal);
    var url = "check_changeover";
    var type = "POST";
    var dataType = "";
    var data = {
        product_features_id:product_features_id,
        selectedValue:selectedValue
    };

    callroute(url,type,dataType,data,function (data)
    {
        var dta = JSON.parse(data);

        // alert();

        //console.log(dta['Data'][0]['product_features_data']);

    
        var classname      =   dta['Data'][0]['html_id']+'_p_'+seriesVal;
        // console.log(classname);
        var subHTML     =   '';
        subHTML = '<option value="">Select</option>';
       $.each(dta['Data'][0]['product_features_data_parent'],function (pkey,pvalue)
       {

            subHTML += '<option value='+pvalue['product_features_data_id']+'>'+pvalue['product_features_data_value']+'</option>';

       });

       // console.log(subHTML);

       $('#'+classname).html(subHTML);

    });
}

function productImages(product_id)
{
    $.ajax({
        url:'get_productImages',

        data: {
            product_id:product_id
        },
        success:function(data)
        {
            var dta = JSON.parse(data);

            if(dta['Data']!='')
            {
                var product_name                =   dta['Data'][0]['products']['product_name'];
                var product_system_barcode      =   dta['Data'][0]['products']['product_system_barcode'];
                $('#ModalCarousel34 .modal-title').html(product_name+' ('+product_system_barcode+')');

                $(".carousel-indicators").html('');
                $(".carousel-inner").html('');

                var img_div = '';
                var slide_div = '';

                $.each(dta['Data'],function (key,value)
                {
                    var clas    =   '';
                    if(Number(key)==0)
                    {
                         clas    =   'active';
                    }

                    slide_div += '<li data-target="#demo" data-slide-to="'+key+'" class="'+clas+'"></li>';

                    if(value['caption'] == '' || value['caption'] == null)
                    {
                        value['caption'] = '';
                    }

                    img_div += '<div class="carousel-item '+clas+' center"> ' +
                        '<img src="'+product_image_url+value['product_image']+'" width="100%" alt="'+value['caption']+'">'+value['caption']+'</div>';
                });

                $(".carousel-indicators").append(slide_div);
                $(".carousel-inner").append(img_div);
                $("#ModalCarousel34").modal('show');
            }
        }
    })
}

$('#addnewcollapse').click(function(e)
{
    $('.stock_qty_box').hide();
    open_type_popup(1);
});
function open_type_popup(type_of_click)
{

    //type_of_click :: 1= add new product form ...2 = upload excel form
    var product_item_type = 1;
    // $('input[name=product_type]').prop('checked',false);

    // if(product_item_type.indexOf(',') != -1)
    // {
    //     $("#product_type_popup").modal('show');

    //     $("input[name=product_type]").click(function()
    //     {
    //         $("#product_type_popup").modal('hide');
    //         setup_product_type(type_of_click,$(this).val());
    //     });
    //     return false;
    // }
    // else
    // {
        setup_product_type(type_of_click,product_item_type);
    //}
    //return false;

}

function setup_product_type(type_of_click,item_type)
{

    if(type_of_click == 1) {
        $("#type").val(item_type);

        $("#product_name_filter").val('');
        $("#barcode_filter").val('');

        $("#productform").trigger('reset');

        $("#hidden_page").val(1);


        $('#product_block').slideToggle();


        $('#EditImagesBlock').html('');
    }

    if(type_of_click == 2)
    {
        $("#uploadproducts").attr('disabled',false);
        $("#productsfileUpload").val('');
        $("#excel_file_type").val(item_type);

        $("#upload_products_popup").modal('show');
    }
}



$('#addnewkitcollapse').click(function(e)
{
    $('#product_block').slideToggle();
});

$('#searchCollapse').click(function(e){
    $('#filterarea_block').slideToggle();
});


function validate_productform(frmid)
{
    var error = 0;
    if($("#product_name").val() == '')
    {
        error = 1;
        toastr.error("Please Enter Product Name!");
        return false;
    }

    var offer_price = $("#offer_price").val();
    var product_mrp = $("#product_mrp").val();

    if(Number(product_mrp) < Number(offer_price))
    {
        error =  1;
        toastr.error("MRP Should Not Less Than Offer Price!");
        return false;
    }

    if(error == 1)
    {
        $("#formerr").show();
        return false;
    }
    else
    {
        $("#formerr").hide();
        return true;
    }
}


/*function getbrand(brandid)
{
    var url = "get_brand";
    var type = "GET";
    var dataType = "";
    var data = {};

    callroute(url,type,dataType,data,function (data)
    {
        if(data['Success'] == "True")
            {
                var brandhtml = '';
                $("#brand_id").html('');
                $("#brand_id_filter").html('');
                if(data['Data'].length > 0)
                {
                    brandhtml = "<option value='0'>Select</option>";
                    $.each(data['Data'],function (key,value)
                    {
                        brandhtml += '<option value='+value['brand_id']+'>'+value['brand_type']+'</option>';
                    });
                    $("#brand_id,#brand_id_filter").append(brandhtml);
                }
                else
                {
                    brandhtml = "<option value='0'>Select</option>";

                    $('#brand_id,#brand_id_filter').append(brandhtml);

                }

            }
        if(brandid != '' && brandid != null && brandid != 0)
        {
            $("#brand_id").val(brandid);
        }
     });
}

function getCategory(fillcattype,category_id)
{

    var url = "get_category";
    var type = "GET";
    var dataType = "";
    var data = {};

    callroute(url,type,dataType,data,function (data)
    {
        if (data['Success'] == "True")
        {
            var categoryhtml = '';
            var catid = $("#category_id").val();


            if (data['Data'].length > 0)
            {
                $("#category_id").html('');
                categoryhtml = "<option value='0'>Select</option>";

                $.each(data['Data'], function (key, value)
                {
                    categoryhtml += '<option value=' + value['category_id'] + '>' + value['category_name'] + '</option>';
                });
                $("#category_id,#category_id_filter").append(categoryhtml);
                $("#subcategory_id,#subcategory_id_filter").append(categoryhtml);
            } else
                {
                    categoryhtml = "<option value='0'>Select</option>";
                    $("#category_id,#category_id_filter").append(categoryhtml);
                    $("#subcategory_id,#subcategory_id_filter").append(categoryhtml);
                }

            if(category_id != '' && category_id != null && category_id != 0)
            {
                $("#category_id").val(category_id);
            }

          }

        if(fillcattype == '2')
        {
            $("#popcategory_id").append(categoryhtml);

            if(catid != '' && catid != null && catid != 0)
            {
                $("#popcategory_id").val(catid);
            }
        }

        //$("#subcategory_id").html('');
       // $("#popcategory_id").val();
        //$("#subcategory_id").append('<option value=0>Sub Category</option>');
        $("#subcategory_id_filter").append('<option value=0>Select</option>');




    });
}

function getsubcategory(subcatid)
{
    var category_ID = $('#category_id :selected').val();
    var url = "get_subcategory";
    var type = "POST";
    var dataType = "";
    var data = {
        "category_ID":category_ID
    };

    callroute(url,type,dataType,data,function (data)
    {
        if(data['Success'] == "True")
        {

            var subcategoryhtml = '';
            $("#subcategory_id").html('');
            if(data['Data'].length > 0)
            {
                subcategoryhtml += "<option value='0'>Select</option>";

                $.each(data['Data'],function (key,value)
                {
                    subcategoryhtml += '<option value='+value['subcategory_id']+'>'+value['subcategory_name']+'</option>';
                });
                $("#subcategory_id").append(subcategoryhtml);
            }
            else {
                     //subcategoryhtml += "";
                    $("#subcategory_id").append("<option value='0'>Select</option>");
                }
            }


            if(subcatid != '')
            {
                $("#subcategory_id").val(subcatid);
            }
           // $("#subcategory_id").val();
        });
}

function editgetsubcategory(catid,subcatid)
{
    var category_ID = catid;
    var url = "get_subcategory";
    var type = "POST";
    var dataType = "";
    var data = {
        "category_ID":category_ID
    };

    callroute(url,type,dataType,data,function (data)
    {
        if(data['Success'] == "True")
        {

            var subcategoryhtml = '';
            $("#subcategory_id").html('');
            if(data['Data'].length > 0)
            {
                subcategoryhtml += "<option value='0'>Select</option>";

                $.each(data['Data'],function (key,value)
                {
                    subcategoryhtml += '<option value='+value['subcategory_id']+'>'+value['subcategory_name']+'</option>';
                });
                $("#subcategory_id").append(subcategoryhtml);
            }
            else {
                     //subcategoryhtml += "";
                    $("#subcategory_id").append("<option value='0'>Select</option>");
                }
            }

            if(subcatid != '')
            {
                $("#subcategory_id").val(subcatid);
            }
           // $("#subcategory_id").val();
        });
}

function getsubcategory_filter(subcatid)
{

    var category_ID = $('#category_id_filter :selected').val();

    var url = "get_subcategory";
    var type = "POST";
    var dataType = "";
    var data = {
        "category_ID":category_ID
    };

    callroute(url,type,dataType,data,function (data)
    {
        if(data['Success'] == "True")
        {

            var subcategoryhtml = '';
            $("#subcategory_id_filter").html('');
            if(data['Data'].length > 0)
            {
                subcategoryhtml += "<option value='0'>Select</option>";

                $.each(data['Data'],function (key,value)
                {
                    subcategoryhtml += '<option value='+value['subcategory_id']+'>'+value['subcategory_name']+'</option>';
                });
                $("#subcategory_id_filter").append(subcategoryhtml);
            }
            else {
                     //subcategoryhtml += "";
                    $("#subcategory_id_filter").append("<option value='0'>Select</option>");
                }
            }

        });
}

function getColour(colour_id) {

    var url = "get_colour";
    var type = "GET";
    var dataType = "";
    var data = {};

    callroute(url,type,dataType,data,function (data)
    {
        if (data['Success'] == "True") {
            var colourhtml = '';
            $("#colour_id").html('');
            if (data['Data'].length > 0)
            {
                colourhtml = "<option value='0'>Select</option>";
                $.each(data['Data'], function (key, value) {
                    colourhtml += '<option value=' + value['colour_id'] + '>' + value['colour_name'] + '</option>';
                });
                $("#colour_id,#colour_id_filter").append(colourhtml);
                    }
            else
                {
                    colourhtml = "<option value='0'>Select</option>";
                    $("#colour_id,#colour_id_filter").append(colourhtml);
                }
            }

        if(colour_id != '' && colour_id != null && colour_id != 0)
        {
            $("#colour_id").val(colour_id);
        }
        });
}

function getSize(size_id)
{
    var url = "get_size";
    var type = "GET";
    var dataType = "";
    var data = {};

    callroute(url,type,dataType,data,function (data)
    {
        if (data['Success'] == "True")
        {
            var sizehtml = '';
            $("#size_id").html('');
            if (data['Data'].length > 0)
            {
                sizehtml = "<option value='0'>Select</option>";
                $.each(data['Data'], function (key, value) {
                    sizehtml += '<option value=' + value['size_id'] + '>' + value['size_name'] + '</option>';
                });
                $("#size_id,#size_id_filter").append(sizehtml);
            } else {
                 sizehtml = "<option value='0'>Select</option>";
                 $("#size_id,#size_id_filter").append(sizehtml);
                    }
        }
        if(size_id != '' && size_id != null && size_id != 0)
        {
            $("#size_id").val(size_id);
        }
        });
}*/

function getProductfeatures(feature_id,add_product_features_data_id,dynamic_html,rowid)
{

    // alert(feature_id);
    var url = "getfeatures";
    var type  = "POST";
     var dataType = "";
    var data = {
       "product_features_id" :feature_id
    };


    callroute(url,type,dataType,data,function (data)
    {
        var product_response = JSON.parse(data);

        if (product_response['Success'] == "True")
        {

            var product_data = product_response['Data'];

            var feature_html = '<option>Select '+product_data[0]['product_features']['product_features_name']+'</option>';
            //$(".appendfeature").find("#featurerow_"+rowid).children().find("#"+dynamic_html).html('');


            $.each(product_data,function(kk,vv)
            {
                feature_html += '<option value='+vv['product_features_data_id']+'>'+vv['product_features_data_value']+'</option>';
            });

            //$("#"+dynamic_html).append(feature_html);
            $('select[name^="'+dynamic_html+'"]').each(function()
            {
                var vl = $(this).val();
                $(this).html('');

               $(this).append(feature_html);
               console.log(vl);
                if(vl != '' && vl != 'null')
                {
                    $(this).val(vl);
                }
            });
            //$(".appendfeature").find("#featurerow_"+rowid).children().find("#"+dynamic_html).append(feature_html);

          if(add_product_features_data_id != '')
            {
                //$("#"+dynamic_html).val(add_product_features_data_id);
                $(".appendfeature").find("#featurerow_"+rowid).children().find("#"+dynamic_html+'_p_'+rowid).val(add_product_features_data_id);
            }

            }
        });
}

function getUqc(uqc_id) {

    var url = "get_uqc";
    var type = "GET";
    var dataType = "";
    var data = {};

    callroute(url,type,dataType,data,function (data)
    {
        if (data['Success'] == "True")
        {
            var uqchtml = '';
            $("#uqc_id").html('');
            if (data['Data'].length > 0)
            {
                uqchtml = "<option value='0'>Select UQC</option>";
                $.each(data['Data'], function (key, value)
                {
                    uqchtml += '<option value=' + value['uqc_id'] + '>' + value['uqc_shortname'] + '</option>';
                });
                $("#uqc_id,#uqc_id_filter").append(uqchtml);
            } else
                {
                    uqchtml = "<option value='0'>Select</option>";
                    $("#uqc_id,#uqc_id_filter").append(uqchtml);
                }
                if(uqc_id != '' && uqc_id != null && uqc_id != 0)
                {
                    $("#uqc_id").val(uqc_id);
                }
         }
        });
}

var count = 1;
$("#addmoreimg").click(function()
{
//
    $(this).prop('disabled', true);
    count++;
   // $("#image1").clone().attr('id', 'product_image_'+count).insertAfter("#product_image_1");
    $('#addmoreimg').before('<br clear="all" /><div class="span2 block_'+count+'" style="background:none; border:0; margin:0 0 10px 0;" class="previews"><label class="form-label">Product Image Caption</label><input typeter="text" name="imageCaption[]" id="imageCaption_'+count+'" placeholder="" /><button type="button" class="btn btn-danger mt-10" onclick="removefun('+count+')"><i class="fa fa-minus"></i></button></div><div class="span2 block_'+count+'" style="background:none; border:0;">'+
        '<div class="form-group">' +
        '<label class="form-label">Product Image</label><input onchange="previewandvalidation(this);" accept=".png, .jpg, .jpeg" type="file" name="product_image[]" id="product_image_'+count+'" data-counter="'+count+'" class="form-control form-inputtext productimage">' +
        '<div style="display: none" id="preview_'+count+'" class="previews">' +
        '<a  onclick="removeimgsrc('+count+');" class="displayright"><i class="fa fa-remove" style="font-size: 20px;"></i></a>' +
        '<img src="" id="product_preview_'+count+'" width="" height="150px"></div></div></div>');

    $(this).prop('disabled', false);

});

function removefun(cnt)
{
    $(".block_"+cnt).remove();
}

function removeimgsrc(cntid)
{
    $('#product_preview_'+cntid).attr('src', '');
    $('#product_image_'+cntid).val('');
    $("#preview_"+cntid).hide();
}

$("#addservice").click(function (e)
{
    if(validate_serviceform('serviceform'))
    {
        $("#type").val('2');
        $("#addservice").prop('disabled', true);

        var data = {
            "formdata": $("#serviceform").serialize(),
            "type" : '2'
        };

        var  url = "product_create";
        var type = "POST";
        var dataType = '';
        callroute(url,type,dataType,data,function (data)
        {
            $("#addservice").prop('disabled', false);
            var dta = JSON.parse(data);

            if(dta['Success'] == "True")
            {
                var message = dta['Message'].replace("Product","Room");
                toastr.success(message);

                $("#serviceform").trigger('reset');
                $("#product_id").val('');
                resettable('service_data');
            }
            else
            {
                if(dta['status_code'] == 409)
                {
                    $.each(dta['Message'],function (errkey,errval)
                    {
                        var errmessage = errval[0].replace("supplier barcode","Room No");
                        toastr.error(errmessage);
                      //  alert(errmessage);
                    });
                }
                else
                {
                    toastr.error(dta['Message']);
                }
            }
        })
    }
    e.preventDefault();
});


function validate_serviceform(frmid)
{
    var error = 0;

    if($("#supplier_barcode").val() == '')
    {
        error = 1;
        toastr.error("Please Enter Room No!");
        return false;
    }

    if($("#selling_price").val() == '')
    {
        error = 1;
        toastr.error("Please Enter Tarrif!");
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


/*$('#productform').on('submit', function(event){*/
$("#addproduct").click(function (event) {

    if(validate_productform('productform'))
    {
        event.preventDefault();
        $("#addproduct").prop('disabled',true);
        //$("#addproduct").text('Add Product');

        $.ajaxSetup({
            headers : { "X-CSRF-TOKEN" :jQuery(`meta[name="csrf-token"]`). attr("content")}
        });

        var form = $('#productform')[0];


        var formdata = new FormData(form);

        $.ajax({
            url: "product_create",
            method: "POST",
            //data: new FormData(this),
            data:formdata,
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data)
            {
                $("#addproduct").prop('disabled', false);
                if(data['Success'] == "True")
                {
                    toastr.success(data['Message']);
                    // alert();
                    $('.addproductonInward').slideToggle();

                    if(typeof data['is_inward'] != "undefined")
                    {
                        $("#inwardproductpopup").modal('hide');
                        getproductdetail(data['product_id']);
                        return false;
                    }

                    $("#productform").trigger('reset');
                    $('.previews').html('');
                    $("#product_id").val('');
                    $('input[name=product_type][value=1]').prop('checked',true);
                    resettable('product_data','productrecord');

                    $('#product_block').slideToggle();

                    location.reload();
                }
                else
                {
                    if(data['status_code'] == 409)
                    {
                        $.each(data['Message'],function (errkey,errval)
                        {
                            var errmessage = errval[0];

                            if(errmessage == "The supplier barcode has already been taken.")
                            {
                                var supplier_barcode = $("#supplier_barcode").val();
                                //toastr.error('Product with this Supplier Barcode : '+supplier_barcode+' already exist.<a style="display: inline-block;">Click here</a> to view the existing product.');
                                toastr.error("<br /><button>View this product</button>",'Product with this Supplier Barcode : '+supplier_barcode+' already exist.',
                                    {
                                        allowHtml: true,
                                        showCloseButton: true,
                                        onclick: function ()
                                        {
                                            view_existing_product(supplier_barcode);
                                            toastr.clear()
                                        }
                                    })
                            }
                            else
                            {
                                toastr.error(errmessage);
                                return false;
                              //  resettable('product_data','productrecord');
                            }
                        });
                    }
                    else
                    {

                        if(typeof data['arr'] != "undefined" && data['arr'] != '')
                        {
                            $.each(data['arr'],function (key,value)
                            {
                               $.each(value,function(k,v){
                                   if(v != '' && v != null)
                                   {
                                       $("#" +k+ " option[value='" + v + "']").parent().addClass('invalid');
                                   }
                               });
                            })

                        }
                            toastr.error(data['Message']);

                    }
                }
            }
        });
    }
    event.preventDefault();
});


//by vrunda for save and new btn from inward 29-5-2020
$("#add_and_new_product").click(function (event) {

    if(validate_productform('productform'))
    {
        event.preventDefault();
        $("#add_and_new_product").prop('disabled',true);
        //$("#addproduct").text('Add Product');
        //alert('test');
        // $('html,body').animate({ scrollTop: 0 }, 'slow');
        //$("html, body").animate({ scrollTop: 0 }, "slow");

        $.ajaxSetup({
            headers : { "X-CSRF-TOKEN" :jQuery(`meta[name="csrf-token"]`). attr("content")}
        });

        var form = $('#productform')[0];


        var formdata = new FormData(form);

        $.ajax({
            url: "product_create",
            method: "POST",
            //data: new FormData(this),
            data:formdata,
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data)
            {
                $("#add_and_new_product").prop('disabled', false);
                // 
                if(data['Success'] == "True")
                {
                    toastr.success(data['Message']);
                    $('#product_name').focus();

                    if(typeof data['is_inward'] != "undefined")
                    {
                        //$("#inwardproductpopup").modal('hide');
                        
                        getproductdetail(data['product_id']);
                         $("#productform").trigger('reset');
                        var type = "POST";
                        var dataType = '';
                        var url = 'getbarcode';
                        var data = '';


                        callroute(url,type,dataType,data,function(response){
                            var res = JSON.parse(response,true);
                            if(res['Success'] == "True")
                            {
                                if(res['system_barcode'] != '')
                                {
                                    $("#productform").trigger('reset');
                                    $("#inwardproductpopup").modal('show');
                                    $(".multifeacls").css('display','none');
                                    $("#type").val(1);
                                    $(".stock_qty").show();
                                    $("#product_system_barcode").val(res['system_barcode']);
                                }
                            }
                        });
                     //   $("#createproductpop").trigger('click');
                       // $("#inwardproductpopup").modal('show');
                        return false;
                    }

                    $("#productform").trigger('reset');
                    $('.previews').html('');
                    $("#product_id").val('');
                    $('input[name=product_type][value=1]').prop('checked',true);
                    resettable('product_data','productrecord');

                    $('#product_block').slideToggle();
                    location.reload();
                }
                else
                {
                    if(data['status_code'] == 409)
                    {
                        $.each(data['Message'],function (errkey,errval)
                        {
                            var errmessage = errval[0];

                            if(errmessage == "The supplier barcode has already been taken.")
                            {
                                var supplier_barcode = $("#supplier_barcode").val();
                                //toastr.error('Product with this Supplier Barcode : '+supplier_barcode+' already exist.<a style="display: inline-block;">Click here</a> to view the existing product.');
                                toastr.error("<br /><button>View this product</button>",'Product with this Supplier Barcode : '+supplier_barcode+' already exist.',
                                    {
                                        allowHtml: true,
                                        showCloseButton: true,
                                        onclick: function ()
                                        {
                                            view_existing_product(supplier_barcode);
                                            toastr.clear()
                                        }
                                    })
                            }
                            else
                            {
                                toastr.error(errmessage);
                                return false;
                              //  resettable('product_data','productrecord');
                            }
                        });
                    }
                    else
                    {

                        if(typeof data['arr'] != "undefined" && data['arr'] != '')
                        {
                            $.each(data['arr'],function (key,value)
                            {
                               $.each(value,function(k,v){
                                   if(v != '' && v != null)
                                   {
                                       $("#" +k+ " option[value='" + v + "']").parent().addClass('invalid');
                                   }
                               });
                            })

                        }
                            toastr.error(data['Message']);

                    }
                }
            }
        });
    }
    
    event.preventDefault();
});
//End save and new btn from inward 29-5-2020


$("#deleteproduct").click(function ()
{
    /*if(confirm("Are You Sure want to delete this product?")) {*/
        var ids = [];

        $('input[name="delete_product[]"]:checked').each(function()
        {
            ids.push($(this).val());
        });

        if(ids.length > 0)
        {

        var errmsg = "Are You Sure want to delete this Product?";
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
                var url = "product_delete";
                var type = "POST";
                var dataType = "";
                callroute(url, type,dataType, data, function (data) {

            var dta = JSON.parse(data);

            if (dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
                $("#productform").trigger('reset');
                $("#product_id").val('');

                resettable('product_data','productrecord');

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
        return false;
    }
});


function delete_separate_product(obj,product_id,event)
{
     $(obj).closest('td').find('input[name="delete_product[]"]').prop("checked",true);
    event.preventDefault();
    if($(obj).closest('td').find('input[name="delete_product[]"]').prop('checked') == true)
    {
       $('#deleteproduct')[0].click();
    }

}

$("#delete_service").click(function ()
{
    if(confirm("Are You Sure want to delete this room?")) {

        var ids = [];

        $('input[name="delete_room[]"]:checked').each(function()
        {
            ids.push($(this).val());
        });

        if(ids.length > 0)
        {
        var data = {
            "deleted_id": ids
        };
        var url = "product_delete";
        var type = "POST";
        var dataType = '';
        callroute(url, type,dataType, data, function (data) {

            var dta = JSON.parse(data);

            if (dta['Success'] == "True")
            {
                toastr.success(dta['Message'].replace('Product','Room'));

                $("#serviceform").trigger('reset');
                $("#product_id").val('');
                resettable('service_data');
            } else {
                toastr.error(dta['Message']);
            }
        })
            }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
});

function previewandvalidation(input)
{
    var imageid = $(input).attr('id');
    var counterval = $(input).data('counter');
    var validExtensions = ['png','jpg','jpeg']; //array of valid extensions
    var fileName = input.files[0].name;
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ($.inArray(fileNameExt, validExtensions) == -1) {
        input.type = '';
        input.type = 'file';
        $('#product_preview_'+counterval).attr('src',"");
        alert("Only these file types are accepted : "+validExtensions.join(', '));
    }
    else
    {
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.onload = function (e)
            {
                $("#preview_"+counterval).show();
                $('#product_preview_'+counterval).attr('src', e.target.result);
            };
            filerdr.readAsDataURL(input.files[0]);
        }
    }
}


//for add category,size,sub category colour size uqc id in popup

// $("#addbrand").click(function () {
//    $("#addbrandpopup").modal('show');
// });

// $("#addcategory").click(function () {
//     $("#addcategorypopup").modal('show');
// });

// $("#addsubcategory").click(function ()
// {
//     getCategory('2','');
//     $("#subcategory_name").val('');
//     $("#addsubcategorypopup").modal('show');
// });

// $("#addcolour").click(function () {
//    $("#addcolourpopup").modal('show');
// });

// $("#addsize").click(function ()
// {
//    $("#addsizepopup").modal('show');


// });

$("#adduqc").click(function ()
{
   $("#adduqcpopup").modal('show');
});

//end of display popup of category,sub category,colur,uqc

//edit service
function editservice(productid)
{

    $(this).prop('disable',true);
    var url = "product_edit";
    var type = "POST";
    var dataType = '';
    var data = {
        "product_id": productid
    }
    callroute(url, type,dataType, data, function (data)
    {
        $(this).prop('disable', false);
        var product_response = JSON.parse(data);

        if (product_response['Success'] == "True")
        {
            var product_data = product_response['Data'];

            $("#serviceform #product_id").val(product_data['product_id']);

            $("#selling_price").val(product_data['selling_price']);
            $("#sell_gst_percent").val(product_data['sell_gst_percent']);
            $("#sell_gst_amount").val(product_data['sell_gst_amount']);
            $("#product_mrp").val(product_data['product_mrp']);
            $("#product_description").val(product_data['product_description']);
            $("#hsn_sac_code").val(product_data['hsn_sac_code']);

            $("#supplier_barcode").val(product_data['supplier_barcode']);
        }
    });
}

//edn of edit service

//edit product

function editproduct(productid)
{
    $(this).prop('disable',true);
    $("html,body").scrollTop(0);
   // $("html, body").animate({ scrollTop: 0 }, "fast");
    $("#product_block").slideToggle();
    $("#encoded_product_id").val(productid);

    //DISALLOW TO ADD MULTIPLE PRODUCT FEATURES AT EDIT TIME.
    $(".multifeacls").hide();

    /*$("#addproduct").text('Update Product');*/
    var url = "product_edit";
    var type = "POST";
    var dataType = "";
    var data = {
        "product_id": productid
    };
    callroute(url, type,dataType, data, function (data) {
        $(this).prop('disable', false);
        var product_response = JSON.parse(data);

        if (product_response['Success'] == "True")
        {
            var uqcval = '';
            var product_data = product_response['Data'];

            var product_features_data=product_response['Product'];
            var feature_rel = product_data['product_features_relationship'];

            $('.stock_qty_box').hide();
            $("#productform #product_id").val(product_data['product_id']);
            $("#productform #type").val(product_data['item_type']);
            $("#productform #product_name").val(product_data['product_name']);
            $("#productform #product_note").val(product_data['note']);
            $("#productform #cost_rate").val(product_data['cost_rate']);
            $("#productform #cost_gst_percent").val(product_data['cost_gst_percent']);
            $("#productform #cost_gst_amount").val(product_data['cost_gst_amount']);
            $("#productform #extra_charge").val(product_data['extra_charge']);
            $("#productform #cost_price").val(product_data['cost_price']);
            $("#productform #profit_percent").val(product_data['profit_percent']);
            $("#productform #profit_amount").val(product_data['profit_amount']);
            $("#productform #selling_price").val(product_data['selling_price']);
            $("#productform #sell_gst_percent").val(product_data['sell_gst_percent']);
            $("#productform #sell_gst_amount").val(product_data['sell_gst_amount']);
            $("#productform #product_mrp").val(product_data['product_mrp']);
            $("#productform #offer_price").val(product_data['offer_price']);
            $("#productform #wholesale_price").val(product_data['wholesale_price']);
            $("#productform #sku_code").val(product_data['sku_code']);
            $("#productform #product_code").val(product_data['product_code']);
            $("#productform #product_description").val(product_data['product_description']);
            $("#productform #hsn_sac_code").val(product_data['hsn_sac_code']);


            if (product_data['uqc_id'] == null) {
                uqcval = '0';
            } else {
                uqcval = product_data['uqc_id'];
            }
            $("#productform #uqc_id").val(uqcval);

            if(product_data['profit_percent'] == '' || product_data['profit_percent'] == null || product_data['profit_percent'] <= 0)
            {
                $("#profit_percent").css('color','red');
            }

            if(product_data['profit_amount'] == '' || product_data['profit_amount'] == null || product_data['profit_amount'] <= 0)
            {
                $("#profit_amount").css('color','red');
            }
            if(product_data['taxmaster_id'] != '' || product_data['taxmaster_id'] != null)
            {
                $('input[name="checktax"]').prop("checked",true);
                $('.tax_section').show();
                $('#select_tax_id_'+product_data['taxmaster_id']).prop("checked",true);
                $('#taxmaster_id').val(product_data['taxmaster_id']);
            }
            if(product_data['consumption_value'] != '' || product_data['consumption_value'] != null || product_data['consumption_value']!= 0)
            {
                $('input[name="checkconsumption"]').prop("checked",true);
                $('.consumption_section').show();
                $('#consumption_value').val(product_data['consumption_value']);
            }


            $("#productform #product_system_barcode").val(product_data['product_system_barcode']);
            $("#productform #supplier_barcode").val(product_data['supplier_barcode']);
            $("#productform #product_ean_barcode").val(product_data['product_ean_barcode']);
            $("#productform #alert_product_qty").val(product_data['alert_product_qty']);
            $("#productform #days_before_product_expiry").val(product_data['days_before_product_expiry']);
            $("#productform #default_qty").val(product_data['default_qty']);

            var langth = feature_rel.length;

            for(var i = 1;i<=langth;i++)
            {
                if(i != 1) {
                    $("#add_multi_feature").trigger('click');
                }
            }



                $.each(product_features_data,function (x,y)
                {
                       var htmlid = y['html_id'];
                       var key = 1;
                       console.log('#'+htmlid+'_p_'+key);

                       $("#product_features_relationship_id_1").val(feature_rel['product_features_relationship_id']);
                       $("#featurerow_1").find('#'+htmlid+'_p_'+key).val(feature_rel[htmlid]);
                });



            $('#EditImagesBlock').html('');
            $('#EditImagesBlock').show();
            $.each(product_data['product_images'],function (key,value)
            {
                if(value['caption'] == null || value['caption'] == '')
                {
                    var caption = '';
                }
                else
                {
                     var caption = value['caption'];
                }
                $('#EditImagesBlock').prepend('<div class="span3 center" id="picture_'+value['product_image_id']+'"><img src="'+product_image_url+value['product_image']+'" id="product_preview_1" name="product_preview_1" class="pb-10" width="" height="150px"><br>'+
                    '<b>'+caption+'</b>'+
                    '<br>'+
                    '<a class="displayright pt-10" onclick="removePicture('+value['product_image_id']+')"><i class="fa fa-remove cursor" style="font-size: 20px;"></i></a>'+
                    '</div>');
            });
            $(".block_update_price").css('display','block');
        }
    });
}

function removePicture(product_image_id)
{
    var fetch_data_url  =   'ProductremovePicture';
    $('.loaderContainer').show();
    $.ajax({
        url:fetch_data_url,
        data: {
            product_image_id:product_image_id,
        },
        success:function(data)
        {
            var searchdata = JSON.parse(data, true);
            $('.loaderContainer').hide();

            $('#picture_'+product_image_id).remove();

            toastr.success(searchdata['Message']);
        }
    })
}


//12 march 2019...added by hemaxi.....for type(service and product)

$("input[name='formtype']").on("click",function ()
{
   var id = $(this).attr('value');

   if(id == 1)
   {
       $("#productform").trigger('reset');
       $("#product_block").css('display','block');
       $("#productmaintable").css('display','block');
       $("#service_block").css('display','none');
       $("#servicemaintable").css('display','none');

   }
   else
   {
       $("#serviceform").trigger('reset');
       $("#product_block").css('display','none');
       $("#productmaintable").css('display','none');
       $("#service_block").css('display','block');
       $("#servicemaintable").css('display','block');
   }
});


$(".servicesellingprice").keyup(function () {

    var service_selling_price = $(this).val();

    if(service_selling_price == '')
    {
        $("#serviceform #sell_gst_percent").val('');
        $("#serviceform #sell_gst_amount").val('');
        $("#serviceform #product_mrp").val('');
        return false;
    }

    var type = "POST";
    var url = 'gstrange_detail';
    var dataType = '';
    var data = {
        "sellingprice" : service_selling_price
    };

    callroute(url,type,dataType,data,function(data)
    {
        var gst_data = JSON.parse(data,true);

        if(gst_data['Success'] == "True")
        {
            var gst_detail  = gst_data['Data'][0];

            var percentage = gst_detail['percentage'];

            $("#serviceform #sell_gst_percent").val(Number(percentage).toFixed(4));

            var sellgstamount = ((Number(gst_detail['percentage'])) * (Number(service_selling_price)) / (Number(100)));
            $("#serviceform #sell_gst_amount").val(sellgstamount.toFixed(4));
            var tarrifwithgst = ((Number(sellgstamount)) + (Number(service_selling_price)));
            $("#serviceform #product_mrp").val(tarrifwithgst.toFixed(4));
        }
    });
});


$('#checkallproduct').change(function()
{
    if($(this).is(":checked"))
    {
        $("#productsalldata tr").each(function()
        {
            var id = $(this).attr('id');

            $(this).find('td').each(function ()
            {
                $("#delete_product_"+id).prop('checked',true);
            });

        })
    }
    else
    {
        $("#productsalldata tr").each(function()
        {
            var id = $(this).attr('id');
            $(this).find('td').each(function ()
            {
                $("#delete_product_"+id).prop('checked',false);
            });
        })
    }
});

$('#checlallservice').change(function()
{
    if($(this).is(":checked")) {
        $("#servicerecord tr").each(function()
        {
            var id = $(this).attr('id');

            $(this).find('td').each(function ()
            {
                $("#delete_room_"+id).prop('checked',true);
            });

        })
    }
    else
    {
        $("#servicerecord tr").each(function(){
            var id = $(this).attr('id');
            $(this).find('td').each(function ()
            {
                $("#delete_room_"+id).prop('checked',false);
            });

        })
    }
});
function resetservicedata()
{
    $("#serviceform").trigger('reset');
    $("#product_id").val('');
}

function resetproductfilterdata()
{
    $("#product_name_filter").val('');
    $("#barcode_filter").val('');
    //$("#brand_id_filter").val(0);
    //$("#category_id_filter").val(0);
    //$("#subcategory_id_filter").val(0);
    //$("#colour_id_filter").val(0);
    //$("#size_id_filter").val(0);


    $(".common-search").find('input,select,hidden').val('');
    $("#uqc_id_filter").val(0);
    $("#hidden_page").val(1);

    resettable('product_data','productrecord');
}
function resetproductdata()
{
    $("#productform").trigger('reset');
    $("#product_id").val('');

    //$("#addproduct").text('Add Product');
    resettable('product_data','productrecord');
}
function view_existing_product(barcode)
{
    $("#barcode_filter").val(barcode);
        product_filter();

}
$(document).on('click', '#product_export', function()
{
    var query = {};
    var dynamic_query = {};
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
                if(name_attr.indexOf('dynamic_') >  -1)
                {
                    dynamic_query[name_attr] = $(this).val();
                }
                else {
                    query[name_attr] = $(this).val();
                }
            }

        }
    });

    var querydata = {
        'query' : query,
        'dynamic_query' : dynamic_query
    };

    var url = "product_export?" + $.param(querydata)
    window.open(url,'_blank');
});

/*$(document).on('click', '#search_lowstock', function()
{

    var product_name = $('#product_name_filter').val();
    var barcode = $('#barcode_filter').val();
  /!*  var brand_id = $('#brand_id_filter').val();
    var category_id = $('#category_id_filter').val();
    var subcategory_id = $('#subcategory_id_filter').val();
    var colour_id = $('#colour_id_filter').val();
    var size_id = $('#size_id_filter').val();*!/
    var uqc_id = $('#uqc_id_filter').val();

    $.ajax({
        url:'search_lowstock',
        data: {
            product_name:product_name,
            barcode:barcode,
            brand_id:brand_id,
            category_id:category_id,
            subcategory_id:subcategory_id,
            colour_id:colour_id,
            size_id:size_id,
            uqc_id:uqc_id
        },
        success:function(data)
        {
            // console.log(data);
            $('.loaderContainer').hide();
            $('tbody#searchResult').html('');
            $('tbody#searchResult').html(data);
        }
    });

});*/


function resetLowStock()
{
   /* $("#product_name_filter").val('');
    $("#barcode_filter").val('');
    $("#brand_id_filter").val(0);
    $("#category_id_filter").val(0);
    $("#subcategory_id_filter").val(0);
    $("#colour_id_filter").val(0);
    $("#size_id_filter").val(0);
    $("#uqc_id_filter").val(0);

    $("#hidden_page").val(1);

    $('#searchResult').html('');*/


    $(".common-search").find('input,select,hidden').val('');
    $("#uqc_id_filter").val(0);
    $("#hidden_page").val(1);


    fetch_data('lowstock_data',1, '', '', '','view_lowstock_record');

    //resettable('search_lowstock','view_lowstock_record');
}

$(document).on('click', '#exportLowStockdata', function(){

            var query = {};
            var dynamic_query = {};
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

                        if(name_attr.indexOf('dynamic_') >  -1)
                        {
                             dynamic_query[name_attr] = $(this).val();
                        }
                        else {
                            query[name_attr] = $(this).val();
                        }
                    }

                }
            });
            var querydata = {
                'query' : query,
                'dynamic_query' : dynamic_query
            };

            var url = "exportlowstock_details?" + $.param(querydata)
            window.open(url,'_blank');


});

//ADDED BY HANI FOR ADD MORE PRODUCT FEATURES
function opendynamicpopup(feature_id,feature_title,rowid)
{
    
    $('#product_features_id').val(feature_id);
    $("#productfeaturesform").trigger("reset");

    $("#product_features_data_value").val('');
    $("#product_features_data_url").val('');
    $("#feature_content").val('');
    $(".src_feature").attr('src',"");
    $(".json_val").val('');
    $(".img_name").val('');
    $(".imgblock").hide();
    $("#rowid").val(rowid);
    var type = "POST";
    var dataType = "";
    var url = "get_parent_of_feature";
    var data = {
        'product_features_id' :feature_id
    };
    callroute(url,type,dataType,data,function(data){
        var dta = JSON.parse(data);

        if(dta['Success'] == "True")
        {
            var parent_data = dta['Data'];
            var html = '';
            if(typeof parent_data != "undefined" && parent_data.length >0)
            {
                // html    =   '';
                html += '<option value="">Select</option>'
                $.each(parent_data,function(kk,vv){
                    html += '<option value="'+vv['product_features_data_id']+'">'+vv['product_features_data_value']+'</option>'
                });
            }

            console.log(html);

            if(html != '')
            {
                $(".parentshow").css('display','');
                $("#parent").html(html);
            }
            else
            {
                $("#parent").html('');
                $(".parentshow").css('display','none');
            }
        }
    });


  $("#addproducts_features").modal('show');


  var dynamic_html  = $("#test_dynamic_name_"+feature_id).val();

     $('.dnamic_feature_title').html("Add " + feature_title);
     $('.dnamic_feature_name').html(feature_title +" Name");
     $('#dynamic_product_features').val(dynamic_html);
}

$("#productfeaturessave").click(function ()
{
    if(validate_dynamic_feature('productfeaturesform'))
    {
        $("#productfeaturessave").prop('disabled',true);
        var type = "POST";
        var url = 'productfeatures_create';
        var dataType = "";
        var product_features_id = $("#product_features_id").val();

        var data = {
            "formdata": $("#productfeaturesform").serialize()
        };
        callroute(url,type,dataType,data,function (data)
        {
            $("#productfeaturessave").prop('disabled', false);
            var dta = JSON.parse(data);

            if(dta['Success'] == "True")
            {
                toastr.success(dta['Message']);

              var dynamic_name= $("#dynamic_product_features").val();

              var rowid = $("#rowid").val();
              // console.log(rowid);
              // console.log(dynamic_name);

              $(".appendfeature").find("#featurerow_"+rowid).children().find("#"+dynamic_name+'_p_'+rowid).val(dta['product_features_data_id']);
              //$(".appendfeature").find("#featurerow_"+rowid).find("#"+dynamic_name).val(dta['product_features_data_id']);

              getProductfeatures(product_features_id,dta['product_features_data_id'],dynamic_name,rowid);

                $("#addproducts_features").modal('hide');
                $('#inwardproductpopup').css('position','relative');
                $('#inwardproductpopup').css('top','-200px');
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
        });
    }
});

function validate_dynamic_feature(frmid)
{
    var error  = 0;

    if($("#product_features_data_value").val() == "")
    {
        error = 1;
        toastr.error("Please add product feature name!");
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



$(document).on('click', '#download_product_template', function ()
{

    // var bulk_upload_message = "Product profile can also be created in bulk when you bulk inward stock. Do you want to create products profile with bulk inward stock?\n then select Yes! or to create product profile here, select Cancel.";

    // swal({
    //         title: bulk_upload_message,
    //         type: "info",
    //         confirmButtonClass: "btn-danger",
    //         confirmButtonText: "Yes!",
    //         showCancelButton: true,
    //         closeOnConfirm: false,
    //         closeOnCancel: true,
    //         showConfirmButton: true
    //     },
    //     function (isConfirm) {
    //         if (isConfirm) {
    //            var url_redirect = '';
    //            if(inward_type == 1)
    //            {
    //                url_redirect = 'inward_stock';
    //            }
    //            if(inward_type == 2)
    //            {
    //                url_redirect = "inward_stock_show";
    //            }
    //             window.open(url_redirect,'_self',);
    //            // location.reload();
    //         }
    //         else
    //         {
                var url = "product_template?"
                window.open(url, '_blank');
        //     }
        // });
});


$("#upload_product_tempate").click(function ()
{
    //var bulk_upload_message = "If you want to bulk inward this product it is better to upload from inward stock";
    // var bulk_upload_message = "Product profile can also be created in bulk when you bulk inward stock. Do you want to create products profile with bulk inward stock? \n then select Yes! or to create product profile here, select Cancel.";

    // swal({
    //         title: bulk_upload_message,
    //         type: "info",
    //         confirmButtonClass: "btn-danger",
    //         confirmButtonText: "Yes!",
    //         showCancelButton: true,
    //         closeOnConfirm: false,
    //         closeOnCancel: true,
    //         showConfirmButton: true
    //     },
    //     function (isConfirm) {
    //         if (isConfirm) {
    //             var url_redirect = '';
    //             if(inward_type == 1)
    //             {
    //                 url_redirect = 'inward_stock';
    //             }
    //             if(inward_type == 2)
    //             {
    //                 url_redirect = "inward_stock_show";
    //             }
    //             window.open(url_redirect,'_self',);
    //           //  location.reload();
    //         }
    //         else
    //         {
                jQuery.noConflict();
                open_type_popup(2);
        //     }
        // });

});



$("body").on("click", "#uploadproducts", function ()
{
    $("#uploadproducts").attr('disabled',true);

    $(".loaderContainer").show();

    //Reference the FileUpload element.
    var fileUpload = $("#productsfileUpload")[0];

    var ext = fileUpload.value.split('.').pop();

    //Validate whether File is valid Excel file.
    var validImageTypes = ['xls', 'xlsx'];

    // var regex = /^([a-zA-Z 0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    // if (regex.test(fileUpload.value.toLowerCase())) {
    if (validImageTypes.includes(ext))
    {
        var file_name = $('#productsfileUpload')[0].files[0]['name'];
        var name_of_file = 'product_template';
        var file_length = 16;

        if (name_of_file != '' && file_name.substr(0, file_length) == name_of_file) {
            if (typeof (FileReader) != "undefined") {
                var reader = new FileReader();

                //For Browsers other than IE.
                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessProductsExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    //For IE Browser.
                    reader.onload = function (e) {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessProductsExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                $("#uploadproducts").attr('disabled', false);
                $(".loaderContainer").hide();
                alert("This browser does not support HTML5.");
            }
        }else
        {
            $("#uploadproducts").attr('disabled', false);
            $(".loaderContainer").hide();
            alert("Please upload " + name_of_file + " excel file");
            $("#productsfileUpload").val('');
        }
    } else {
        $("#uploadproducts").attr('disabled',false);
        $(".loaderContainer").hide();
        alert("Please upload a valid Excel file.");
    }
});


function ProcessProductsExcel(data)
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

    var final_productsarr = [];
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
        final_productsarr.push(final_data);
    });

    var error = 0;

   if(final_productsarr == '')
   {
       toastr.error("No Row Found!");
       $("#uploadproducts").attr('disabled',false);
       $(".loaderContainer").hide();
       return false;
   }
   else
   {

    $.each(final_productsarr,function (validate_pkey,validate_pvalue)
    {
        if(validate_pvalue['Product Name'] == '')
        {
            error = 1;
            toastr.error("Product Name can not be empty!");
        }
       

            if (validate_pvalue['Product Price'] != '' && !$.isNumeric(validate_pvalue['Product Price'])) {
                error = 1;
                toastr.error("Product Price must be numeric!")
            }

       

       

        if(error == 1)
        {
            $("#uploadproducts").attr('disabled',false);
            $(".loaderContainer").hide();
            return false;
        }
    });

   }


   if(error == 0)
    {
        checkproducts(final_productsarr);
    }

}
function checkproducts(productsarr)
{
    var  url = "import_products_check";
    var type = "POST";
    var dataType = "";

    var data = {
        'productsarr'  : productsarr,
        'type' : $("#excel_file_type").val()
    };

    callroute(url,type,dataType,data,function (data)
    {
        var responce = JSON.parse(data);
        if(responce['Success'] == "True")
        {
            $(".loaderContainer").hide();
            toastr.success(responce[['Message']]);
            $("#uploadproducts").attr('disabled',false);
            $("#upload_products_popup").modal('hide');
            $("#productsfileUpload").val('');

            resettable('product_data','productrecord');
        }
        else
        {
            toastr.error(responce[['Message']]);
            $(".loaderContainer").hide();
            $("#uploadproducts").attr('disabled',false);
        }
    })
}

//whose value client want to update .that product upload using this
$("#upload_product_update").click(function(){
    jQuery.noConflict();
    $("#uploadproducts").attr('disabled',true);
    $("#productsupdatefileUpload").val('');
    $("#upload_products_update_popup").modal('show');
});

$("body").on("click","#uploadproductsupdate",function ()
{
    $("#uploadproductsupdate").attr('disabled',true);

    $(".loaderContainer").show();

    var fileUpload = $("#productsupdatefileUpload")[0];

    var ext = fileUpload.value.split('.').pop();

    var validImageTypes = ['xls','xlsx'];

    if (validImageTypes.includes(ext))
    {
        var file_name = $('#productsupdatefileUpload')[0].files[0]['name'];

        var name_of_file = '';
        var file_length = '';

        name_of_file = 'Products_update_data';
        file_length = 20;

        if (name_of_file != '' && file_name.substr(0, file_length) == name_of_file)
        {
            if (typeof (FileReader) != "undefined")
            {
                var reader = new FileReader();

                if (reader.readAsBinaryString) {
                    reader.onload = function (e) {
                        ProcessProductsUpdateExcel(e.target.result);
                    };
                    reader.readAsBinaryString(fileUpload.files[0]);
                } else {
                    reader.onload = function (e)
                    {
                        var data = "";
                        var bytes = new Uint8Array(e.target.result);
                        for (var i = 0; i < bytes.byteLength; i++) {
                            data += String.fromCharCode(bytes[i]);
                        }
                        ProcessProductsUpdateExcel(data);
                    };
                    reader.readAsArrayBuffer(fileUpload.files[0]);
                }
            } else {
                $("#uploadproductsupdate").attr('disabled', false);
                $(".loaderContainer").hide();
                alert("This browser does not support HTML5.");
            }
        }
        else {
            $("#uploadproductsupdate").attr('disabled', false);
            $(".loaderContainer").hide();
            alert("Please upload " + name_of_file + " excel file");
            $("#productsupdatefileUpload").val('');
        }

    }
        else {
        $("#uploadproductsupdate").attr('disabled',false);
        $(".loaderContainer").hide();
        alert("Please upload a valid Excel file.");
    }
});
function ProcessProductsUpdateExcel(data)
{
        var result;
        var workbook = XLSX.read(data, {
            type: 'binary'
        });

        var firstSheet = workbook.SheetNames[0];
        var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet],{ defval: ''});

        var final_productsarr = [];
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
            final_productsarr.push(final_data);
        });

        var error = 0;

        if(final_productsarr == '')
        {
            toastr.error("No Row Found!");
            $("#uploadproductsupdate").attr('disabled',false);
            $(".loaderContainer").hide();
            return false;
        }
        else
        {
            $.each(final_productsarr,function (validate_pkey,validate_pvalue)
            {
                if(validate_pvalue['Product Name'] == '')
                {
                    error = 1;
                    toastr.error("Product Name can not be empty!");
                }
                if(validate_pvalue['System Barcode'] == '')
                {
                    error = 1;
                    toastr.error("System Barcode can not be empty!");
                }

                if(validate_pvalue['HSN'] != '' && !$.isNumeric(validate_pvalue['HSN']))
                {
                    error = 1;
                    toastr.error("HSN Code must be numeric!")
                }

                if(inward_type == 1)
                {
                    if (validate_pvalue['Alert Before Product Expiry(Days)'] != '' && !$.isNumeric(validate_pvalue['Alert Before Product Expiry(Days)'])) {
                        error = 1;
                        toastr.error("Alert Before Product Expiry(Days) must be numeric!")
                    }
                }

                if(validate_pvalue['Low Stock Alert'] != '' && !$.isNumeric(validate_pvalue['Low Stock Alert']))
                {
                    error = 1;
                    toastr.error("Low Stock Alert must be numeric!")
                }
                if(validate_pvalue['MOQ'] != '' && !$.isNumeric(validate_pvalue['MOQ']))
                {
                    error = 1;
                    toastr.error("MOQ must be numeric!")
                }

                if(error == 1)
                {
                    $("#uploadproductsupdate").attr('disabled',false);
                    $(".loaderContainer").hide();
                    return false;
                }
            });
        }

        if(error == 0)
        {
            products_check_update(final_productsarr);
        }
}

function products_check_update(productsarr)
{
    var  url = "products_update_check";
    var type = "POST";
    var dataType = "";

    var data = {
        'productsarr'  : productsarr
    };
    callroute(url,type,dataType,data,function (data)
    {
        var responce = JSON.parse(data);
        if(responce['Success'] == "True")
        {
            update_product_data(productsarr);
        }
        else
        {
            toastr.error(responce[['Message']]);
            $(".loaderContainer").hide();
            $("#uploadproductsupdate").attr('disabled',false);
        }
    })
}

$(document).on('click', '#product_update_export', function()
{
    var query = {};
    var dynamic_query = {};
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
                if(name_attr.indexOf('dynamic_') >  -1)
                {
                    dynamic_query[name_attr] = $(this).val();
                }
                else {
                    query[name_attr] = $(this).val();
                }
            }

        }
    });
    var querydata = {
        'query' : query,
        'dynamic_query' : dynamic_query
    };

    var url = "product_update_export?" + $.param(querydata)
    window.open(url,'_blank');
});


function update_product_data(productsarr)
{
    var  url = "update_product_data";
    var type = "POST";
    var dataType = "";

    var data = {
        'productsarr'  : productsarr
    };
    callroute(url,type,dataType,data,function (data)
    {
        var responce = JSON.parse(data);
        if(responce['Success'] == "True")
        {
                toastr.success(responce['Message']);
            $(".loaderContainer").hide();
            $("#uploadproductsupdate").attr('disabled',false);
            $("#productsupdatefileUpload").val('');
            $("#upload_products_update_popup").modal('hide');
            resettable('product_data','productrecord');
        }
        else
        {
            toastr.error(responce['Message']);
            $(".loaderContainer").hide();
            $("#uploadproductsupdate").attr('disabled',false);
        }
    })
}


//update offer price and mrp in inward product detail and price master

$("#want_to_update").click(function ()
{
    $("#get_pwd").modal('show');
    $("#current_pwd").val('');
    return false;


});

$("#update_pricein_all").click(function()
{
    var update_in = $("input[name='store_name[]']:checked").length;

   if(update_in == 0)
   {
       toastr.error("Please check any checkbox");
       return false;
   }


   if($("#price_master_price").val() == "0" || $("#price_master_price").val() == '')
   {
       toastr.error("Please Select Price which you want to update");
       return false;
   }


    var company_id = [];
    $.each($("input[name='store_name[]']:checked"), function(){
        company_id.push($(this).val());
    });


   var product_id = $("#product_id").val();
   var cost_rate = $("#cost_rate").val();
   var cost_gst_percent = $("#cost_gst_percent").val();
   var cost_gst_amount = $("#cost_gst_amount").val();
   var cost_price = $("#cost_price").val();
   var extra_charge = $("#extra_charge").val();
   var profit_percent = $("#profit_percent").val();
   var profit_amount = $("#profit_amount").val();
   var selling_price = $("#selling_price").val();
   var selling_gst_percent = $("#sell_gst_percent").val();
   var sell_gst_amount = $("#sell_gst_amount").val();
   var mrp =  $("#product_mrp").val();
   var offer_price = $("#offer_price").val();
   var wholesaler_price = $("#wholesale_price").val();

   if(product_id != '' && product_id != 0)
   {
        var type = "POST";
        var dataType = '';
        var url = 'update_price_in_all';
        var data = {
            company_id : company_id,
            product_id : product_id,
            cost_rate : cost_rate,
            cost_gst_percent : cost_gst_percent,
            cost_gst_amount : cost_gst_amount,
            cost_price : cost_price,
            extra_charge : extra_charge,
            profit_percent : profit_percent,
            profit_amount : profit_amount,
            selling_rate : selling_price,
            selling_gst_percent : selling_gst_percent,
            sell_gst_amount : sell_gst_amount,
            offer_price : offer_price,
            mrp : mrp,
            wholesaler_price : wholesaler_price,
            update_offer_price_on : $("#price_master_price option:selected").text().split('_')[0],
            update_mrp_on : $("#price_master_price option:selected").text().split('_')[1],
            update_batch_no : $("#price_master_price option:selected").text().split('_')[3]
        }
        callroute(url,type,dataType,data,function(data){
                var dta = JSON.parse(data);
                if(dta['Success'] == "True")
                {
                    toastr.success(dta['Message']);
                    $("#update_pricein_all").prop('disabled',true);
                    $("#price_master_price").html('');
                    $("#store_div").html('');
                    $(".block_update_price").hide();
                }
                else {
                    toastr.error(dta['Message']);
                }
        });
   }
   else {
       toastr.error("Something Is Wrong!Please Contact Technical Team.");
   }
});

/*$("#check_pwd").click(function(){
   if($("#current_pwd").val() == "")
   {
       toastr.error("Current Login Password Can Not Be Empty.");
       return false;
   }

    var url = "check_password";
    var type = "POST";
    var dataType = '';
    var data = {
        "password" : $("#current_pwd").val()
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
}*/

$("#addin_pricemaster").click(function () {
    var url = 'insert_product_pricemaster';
    var type = 'GET';
    var dataType = "";
    var data = {};

    callroute(url,type,dataType,data,function (data)
    {
        var dta = JSON.parse(data);

        if(dta['Success'] == "True")
        {
            toastr.success(dta['Message']);
            location.reload();
        }
        })
});

$("#sync_product").click(function (e)
{
    $("#sync_product").text("Syncing.Please Wait!");
    $("#sync_product").css("opacity",0.33);

   setTimeout(function () {
       sync_product();
   },10)

});

//THIS IS FOR SYNC PRODUCT FROM 3RD PARTY
function sync_product()
{
    $("#sync_product").attr('disabled',true);
    var url = "sync_product";
    var type = "POST";
    var dataType = '';
    var data = {};

    callroute(url,type,dataType,data,function(res){
        var dta = JSON.parse(res);

        $("#sync_product").attr('disabled',false);
        $("#sync_product").text('Sync');
        $("#sync_product").css("opacity",'');
        if(dta['Success'] == "True")
        {
            toastr.success(dta['Message']);

            resettable('product_data','productrecord');
        }
        else
        {
            if(dta['status_code'] == 409)
            {
                $.each(dta['Message'],function (errkey,errval)
                {
                    toastr.error(errval);

                });
            }
            else
            {
                toastr.error(dta['Message']);
            }
        }
    })
}

//ONCLICK REPEAT PRODUCT FEATURE BLOCK
$("#add_multi_feature").click(function ()
{
 var dta  = product_feature_arr;
    featurerow_count++;
    var cls = '';
    if(featurerow_count % 2 != 0)
    {
        cls = 'style=background-color:lightgray;margin:0';
    }

 var feature_html = '<div class="row" '+cls+' id="featurerow_'+featurerow_count+'">' +
     '<input type="hidden" name="product_features_relationship_id_'+featurerow_count+'" id="product_features_relationship_id_'+featurerow_count+'" value="">';

 $.each(dta,function(key,value)
 {

        var leftquote = "'";
        var rightquote = "'";

        var productfeatureid = leftquote+value['product_features_id']+rightquote;
        var serialVal = leftquote+featurerow_count+rightquote;
        var html_id = leftquote+value['html_id']+'_p_'+featurerow_count+rightquote;
        // console.log(productfeatureid);


        feature_html +=
            '<div class="span2">' +
            '<label class="form-label">'+value['product_features_name']+'</label>' +
            '<select class="form-control form-inputtext '+value['html_id']+'_p_'+value['product_features_id']+'" id="'+value['html_id']+'_p_'+featurerow_count+'" name="'+value['html_name']+'[]" value="" placeholder="" onchange="changeover('+productfeatureid+','+html_id+','+serialVal+')">' +
            '<option value="">Select '+value['product_features_name']+'</option>' ;

        var html_value = '';
        var sel_vl = $("#"+value['html_id']).val();

         $.each(value['product_features_data'],function (kk,vv)
         {
             var sel = '';
             if(sel_vl != '') {
                 if (vv['product_features_data_id'] == sel_vl) {
                     sel = 'selected=selected';
                 }
             }
            html_value += '<option '+sel+' value="'+vv['product_features_data_id']+'">'+vv['product_features_data_value']+'</option>' ;
        });
            feature_html += ''+html_value+''+
            '</select>' +
             '</div>' +
            '<div class="span1 mt-25">' +
            '<a id="addproductfeatures" onclick="opendynamicpopup(\''+value['product_features_id']+'\',\''+value['product_features_name']+'\',\''+featurerow_count+'\')" class="addmoreoption">' +
            '<i class="fa fa-plus plusaddmore"></i>' +
             '</a>' +
            '<input type="hidden" name="test_dynamic_name_'+value['product_features_id']+'" id="test_dynamic_name_'+value['product_features_id']+'" value="'+value['html_id']+'"> ' +
            '</div>';


 });
  feature_html += ' <div class="span2">' +
      '<label class="form-label"><span class="kitbarcodelabel">Supplier</span> Barcode</label>' +
      '<input class="form-control form-inputtext" value=" " autocomplete="off" ' +
      'type="text" name="supplier_barcode[]" id="supplier_barcode" ' +
      'placeholder=" "></div> ' +
      '<div class="span1 mt-25">' +
                 '<a onclick="removefeature(\''+featurerow_count+'\')"  >' +
                 '<i class="fa fa-remove"></i>' +
                 '</a>'+
                 '</div>';
  $(".appendfeature").append(feature_html);



});

//REMOVE APPEND PRODUCT FEATURE BLOCK
 function removefeature(row_ids)
{
    $(".appendfeature").find("#featurerow_"+row_ids).remove();
}



