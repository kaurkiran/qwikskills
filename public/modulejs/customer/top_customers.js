$("#searchcustomerdata").typeahead({

    source: function(request, process) {
       $.ajax({
           url: "viewbillcustomer_search",
           dataType: "json",
           data: {
                search_val: $("#searchcustomerdata").val(),
                term: request.term
            },
           success: function (data) {$("#searchcustomerdata").val()
                    process(data);
           }
     });
    },
    hint: true,
    highlight: true,
    minLength: 1,
    autoSelect:false,
   
     
});













// $("#searchcustomerdata").typeahead({
//     source: function(request, process)
//     {
//         var  url = "viewbillcustomer_search";
//         var type = "post";
//         var dataType = "json";
//         var data = {
//             "search_val": $("#searchcustomerdata").val(),
//             "term": request.term
//         };
//         callroute(url,type,dataType,data,function (data)
//         {
//             objects = [];
//             map = {};

//             if($("#searchcustomerdata").val()!='')
//             {
//                 $.each(data, function(i, object)
//                 {
//                     map[object.label] = object;
//                     objects.push(object.label);
//                 });
//                 process(objects);

//               if(objects!='')
//               {
//                 if(objects.length === 1)
//                 {
//                       //$(".typeahead.dropdown-menu").find('.dropdown-item').html('');
//                    // $(".dropdown-menu .active").html("");
//                     //$(".dropdown-menu .active").val("");
//                   //  $(".typeahead dropdown-menu").hide();
//                    // $(".typeahead dropdown-menu").html('');

//                     //getproductdetail(data[0]['product_id']);

//                     $(".typeahead.dropdown-menu .active").trigger("click");

//                     return false;
//                     //$(".dropdown-menu .active").trigger("click");
//                 }
//               }
//           }
//           else
//           {
//             $(".typeahead.dropdown-menu").hide();
//           }
//         });
//     },
//    // minLength: 1,
//     autoselect:true,
//    // autoSelect:false,
//    // typeahead-select-on-exact="true"
//      afterSelect: function (item)
//      {
//          if(map[item] != undefined)
//          {
//              $('.loaderContainer').show();

//              var value = item;
//             // var barcode = map[item]['barcode'];
//             // var product_name = map[item]['product_name'];
//              var customer_id = map[item]['customer_id'];
//             $("customer_id").val(customer_id);
//             // getproductdetail(product_id);
//          }
//     }

// });




function reset_customer_filterdata(){
    $(".common-search").find('input,select,hidden').val('');
    resettable('top_customers_data','customer_sales_report_table');
}
$(document).on('click', '#customer_sales_report_export', function()
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

    var url = "customer_sales_report_export?" + $.param(querydata)
    window.open(url,'_blank');
});
function viewCustomerBill(obj) {
    var id = $(obj).attr('id');
    // var supplier_id = $(obj).attr('id');
    var customer_id = $(obj).attr('id').split('view_customer_bill_')[1];
    var data = {
        'customer_id': customer_id
    };
    var url = 'view_customer_bill_popup';
    var type = "POST";
    var dataType = "";
    callroute(url, type, dataType, data, function(data) {
        // var dta = JSON.parse(data,true);
        // if(dta['Success'] == "True")
        // {
        $('.popup_values').html('');
        $('.popup_values').html(data);
        $("#customer_bill_popup").modal('show');
        // }
    });
}