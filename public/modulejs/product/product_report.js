$(document).on('click', '#product_report_excel', function()
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

    var url = "product_report_export?" + $.param(querydata)
    window.open(url,'_blank');
});

function reset_topsell_filterdata(){
   $(".common-search").find('input,select,hidden').val('');
     resettable('top_selling_product_data','product_report_table');
}
