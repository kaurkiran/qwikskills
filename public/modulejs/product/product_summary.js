function resetproductsummary()
{
    $("#filer_from_to").val('');

    if($("#summary_product_name_filter").val() != '')
    {
        location.reload();
        return false;
    }
    $("#summary_product_name_filter").val('');
    $("#summary_batch_no_filter").val('');
    $("#batch_no").val('');

    //$(".common-search").find('input,select,hidden').val('');

    $("#hidden_page").val(1);

    var query = {
        'product_id' : $("#product_id").val()
    };
    fetch_data('product_summary_search',1, '', '', query,'summary_record');
}

$(document).on('click', '#product_summary_export', function()
{
    var filter_date = $('#filer_from_to').val();

    var from_date = '';
    var to_date = '';

    var separate_date = filter_date.split(' - ');
    if(separate_date[0] != undefined)
    {
        from_date = separate_date[0];
    }
    if(separate_date[1] != undefined)
    {
        to_date = separate_date[1];
    }

    if($("#batch_no").val() == '')
    {
        var url_string =  window.location.href;
        var url = new URL(url_string);
        if(url.searchParams.get("batch_no"))
        {
            var btch_no = url.searchParams.get("batch_no");
            $("#batch_no").val(btch_no);
        }
    }

    var query = {
        from_date: from_date,
        to_date : to_date,
        product_id : $("#product_id").val(),
        batch_no: $("#batch_no").val()
    };

    var url = "product_summary_export?" + $.param(query)
    window.open(url,'_blank');
});



//this is used for display product name suggestion
$("#summary_product_name_filter").keyup(function ()
{

    jQuery.noConflict();
    $("#summary_product_name_filter").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "product_name_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#summary_product_name_filter").val()
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
                                value: value.product_name,
                                encrypt_product_id : value.encrypt_product_id
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
            $("#product_id").val('');
            $("#product_id").val(ui['item']['encrypt_product_id']);
            var url_string =  window.location.href;
            var url = new URL(url_string);
                if(url.searchParams.get("batch_no"))
                {
                    var btch_no = url.searchParams.get("batch_no");
                    $("#batch_no").val(btch_no);
                }





           /// $("#product_id").val(item['value']);
            $(".ui-helper-hidden-accessible").css('display','none');
            //call a function to perform action on select of supplier
        }
    })
});


//this is used for display batch no suggestion
$("#summary_batch_no_filter").keyup(function ()
{
    if($("#summary_batch_no_filter").val() == '')
    {
        $("#batch_no").val('');
    }
    jQuery.noConflict();
    $("#summary_batch_no_filter").autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response)
        {
            var url = "batch_no_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#summary_batch_no_filter").val()
            };
            callroute(url, type,dataType, data, function (data)
            {
                var searchbatchno = JSON.parse(data, true);
                console.log(searchbatchno);
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
                                value: value.batch_no,
                                encrypt_batch_no : value.encrypt_batch_no
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

            $("#batch_no").val(ui['item']['encrypt_batch_no']);
            //call a function to perform action on select of supplier
        }
    })
});
//this is used for display product Code suggestion
