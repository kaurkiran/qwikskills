
$('.ShowCertificationForm').click(function(e){
    $('.addNewCertification').slideToggle();
});

$('#category_id').change(function(e)
{
    var certCategory    =   $('#category_id').val();

    var url = "showcertSubcategory";
    var type = "POST";
    var dataType = "";
    var data = {
        "category_id": certCategory,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        // console.log(searchdata);


        $('.certSubcategory').show();

        var htmlData    =   '';

        htmlData    =   '<label>Select Subcategory</label><select name="subcategory_id" id="subcategory_id" onchange="showProducts()" class="width90">';
        htmlData    +=   '<option value="">Select Sub Category</option>';

        $.each(searchdata['Data'],function (key,value)
        {
            // console.log(value);

            htmlData    +=  '<option value="'+value['term_taxonomy_id']+'">'+value['wp_term']['name']+'</option>';
        });

        htmlData +=     '</select>';

        $('.certSubcategory').html(htmlData);
        
    });

})

function showProducts()
{
    var subcategory_id    =   $('#subcategory_id').val();
    
    var url = "showcertProducts";
    var type = "POST";
    var dataType = "";
    var data = {
        "subcategory_id": subcategory_id,
    }

    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        console.log(searchdata);

        $('.certProducts').show();

        var htmlData    =   '';

        htmlData    =   '<label>Select Product</label><select name="product_id" id="product_id" class="width90">';
        htmlData    +=   '<option value="">Select Product</option>';

        $.each(searchdata['Data'],function (key,value)
        {
            htmlData    +=  '<option value="'+value['wp_post']['ID']+'">'+value['wp_post']['post_title']+'</option>';
        });

        htmlData +=     '</select>';

        $('.certProducts').html(htmlData);

    });
}

$("#saveCertification").click(function (event)
{

    var error = 0;

    if($("#category_id").val() == '')
    {
        error = 1;
        toastr.error("please select category");
        return false;
    }

    if($("#subcategory_id").val() == '')
    {
        error = 1;
        toastr.error("please select sub category");
        return false;
    }

    if($("#product_id").val() == '')
    {
        error = 1;
        toastr.error("please select product");
        return false;
    }

    if($("#certification_title").val() == '')
    {
        error = 1;
        toastr.error("please enter title");
        return false;
    }

    if($("#no_of_questions").val() == '')
    {
        error = 1;
        toastr.error("please enter no of questions");
        return false;
    }
    
    if(error == 1)
    {
        toastr.error('all fields are required...'); 
    }
    else
    {
    
        event.preventDefault();
        $("#saveCertification").prop('disabled',true);
        //$("#addproduct").text('Add Product');

        $.ajaxSetup({
            headers : { "X-CSRF-TOKEN" :jQuery(`meta[name="csrf-token"]`). attr("content")}
        });

        var form = $('#certificationForm')[0];
        console.log(form);


        var formdata = new FormData(form);
        console.log(formdata);

        $.ajax({
            url: "saveCertification",
            method: "POST",
            //data: new FormData(this),
            data:formdata,
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data)
            {
                    $("#saveCertification").prop('disabled',false);
                
                if(data['Success'] == "True")
                {
                    toastr.success(data['Message']); 
                    window.location= data['url'];
                    
                }
                else if(data['Success'] == "False")
                {                
                    toastr.error(data['Message']); 
                }
            }
        })
    }
    
});

function deleteCertification(certification_master_id)
{
    var url = "deleteCertification";
    var type = "POST";
    var dataType = "";
    var data = {
        "certification_master_id": certification_master_id,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);

        if(searchdata['Success'] == "True")
        {
            toastr.success(searchdata['Message']); 
            window.location= searchdata['url'];
        }
        else if(searchdata['Success'] == "False")
        {
            toastr.error(searchdata['Message']);
        }
    });
}










