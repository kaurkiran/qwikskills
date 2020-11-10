
$('#addnewcollapse').click(function(e){
    $('#question_block').slideToggle();
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

$("#addquestion").click(function (event) {


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
    if($("#question_title").val() == '')
    {
        error = 1;
        toastr.error("Question title is Mandatory");
        return false;
    }
    if($("#question_answer_a").val() == '')
    {
        error = 1;
        toastr.error("Option A Field is Mandatory");
        return false;
    }
    if($("#question_answer_b").val() == '')
    {
        error = 1;
        toastr.error("Option B Field is Mandatory");
        return false;
    }
    if($("#question_answer_c").val() == '')
    {
        error = 1;
        toastr.error("Option C Field is Mandatory");
        return false;
    }
    if($("#question_answer_d").val() == '')
    {
        error = 1;
        toastr.error("Option D Field is Mandatory");
        return false;
    }
    if(!$("input:radio[name='question_correct_answer']").is(":checked")) {
     
        error = 1;
        toastr.error("Please choose Correct Answer Option");
        return false;

     }


    if(error == 1)
    {
        toastr.error('all fields are required...'); 
    }
    else
    {
        event.preventDefault();
        $("#addquestion").prop('disabled',true);

        $.ajaxSetup({
            headers : { "X-CSRF-TOKEN" :jQuery(`meta[name="csrf-token"]`). attr("content")}
        });

        var form = $('#questionform')[0];


        var formdata = new FormData(form);

        $.ajax({
            url: "question_create",
            method: "POST",
            data:formdata,
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data)
            {
                $("#addquestion").prop('disabled', false);
                if(data['Success'] == "True")
                {
                    toastr.success(data['Message']);
                   
                    $("#questionform").trigger('reset');

                    $('#question_block').slideToggle();

                    location.reload();
                }
                else
                {
                  toastr.error(data['Message']);

                   
                }
            }
        });
    //}
    event.preventDefault();
  }
});


function deletequestion(questionmaster_id)
{
    var url = "deleteQuestion";
    var type = "POST";
    var dataType = "";
    var data = {
        "questionmaster_id": questionmaster_id,
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










