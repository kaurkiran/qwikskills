$("#searchcustomer_data").keyup(function () {
    jQuery.noConflict();
    $(this).autocomplete({
        autoFocus: true,
        minLength: 1,
        source: function (request, response) {
            var url = "customer_id_search";
            var type = "POST";
            var dataType = "";
            var data = {
                'search_val': $("#searchcustomer_data").val()
            };
//console.log(data);
            callroute(url, type,dataType, data, function (data) {
                var searchcustomer = JSON.parse(data, true);
// console.log(searchsupplier);
                            if (searchcustomer['Success'] == "True") {
                                var customer_detail = searchcustomer['Data'];
                                if (customer_detail.length > 0) {
                                    var resultcustomer = [];
// console.log(customer_detail);
                                    customer_detail.forEach(function (value) {
                                        
                                            var last_name = '';
                                            if (value.customer_last_name != '' && value.customer_last_name != null) {
                                                last_name = value.customer_last_name;
                                            } else {
                                                last_name = '';
                                            }
                                            resultcustomer.push({
                                                label: value.customer_name + ' ' + last_name + ' ' + value.customer_mobile,
                                                value: value.customer_name + ' ' + last_name + ' ' +value.customer_mobile,
                                                id: value.customer_id,
                                                customer_id: '',
                                                
                                            });
                                       

                                    });
                                    //push data into result array.and this array used for display suggetion
                                    response(resultcustomer);
                                }
                            }
                        });
                    }, //this help to call a function when select search suggetion
                    select: function (event, ui) {
                        var customer_id = ui.item.id;
                       // var customer_id = ui.item.supplier_gst_id;
                        //var store_id = store_id;
                        //$("#supplier_name").val(id);
                        $("#customer_id").val(customer_id);
                       
                    
                        $(".ui-helper-hidden-accessible").css('display', 'none');
                        //call a function to perform action on select of supplier
                    }
                })
            });

function reset_statement_filterdata(){
     $(".common-search").find('input,select,hidden').val('');
    resettable('customer_statement_data','customer_statement_table');
}