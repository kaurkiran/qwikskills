$(document).on('click', '#download_bill_template', function () {

    var salestemplate   =   $('input[name=downloadtemplate]:checked').val();
    var query = {
                'salesdownload_template' : salestemplate
            };

   

    var url = "bill_template?" + $.param(query)
    window.open(url, '_blank');

});

function resetfilterdata()
{
   
    $(".common-search").find('input,select,hidden').val('');
    resettable('bill_fetch_data','viewbillrecord');
}



$(document).on('click', '#billingexport', function(){

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

                        
                            query[name_attr] = $(this).val();
                     
                    }
                   
                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exportbill_details?" + $.param(querydata)
            window.open(url,'_blank');



});
$(document).on('click', '#searchagingproductsdata', function(){

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

            var url = "exportagereport_details?" + $.param(querydata)
            window.open(url,'_blank');


      // var inoutdate         =     $("#from_to_date").val();
      // var totalnights       =     inoutdate.split(' - ');
      // var from_date         =     totalnights[0];
      // var to_date           =     totalnights[1];

      //   var query = {
      //       from_date: from_date,
      //       to_date : to_date,
      //       bill_no: $('#billno').val(),
      //       customerid : $('#searchcustomerdata').val(),
      //       barcode:$('#productsearch').val(),
      //       reference_name : $('#reference_name').val()
      //   }

      //    var url = "exportproductwise_details?" + $.param(query)
      //    window.open(url,'_blank');
              
     

});

 $(document).on('click', '#searchroomwisedata', function(){

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

            var url = "exportproductwise_details?" + $.param(querydata)
            window.open(url,'_blank');


});

$(document).on('click', '#gstwiseBillingexport', function(){

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

                            query[name_attr] = $(this).val();
                    }

                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exportgstwise_details?" + $.param(querydata)
            window.open(url,'_blank');


});
$(document).on('click', '#searchprofitwisedata', function(){

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

            var url = "exportprofitloss_details?" + $.param(querydata)
            window.open(url,'_blank');


});
$(document).on('click', '#searchprofitbillwisedata', function(){

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
                        query[name_attr] = $(this).val();
                       
                    }

                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exportprofitlossbill_details?" + $.param(querydata)
            window.open(url,'_blank');


});
$(document).on('click', '#gstr1reportexcel', function(){

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

                            query[name_attr] = $(this).val();
                    }

                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exportgstr1_report_details?" + $.param(querydata)
            window.open(url,'_blank');


});
$(document).on('click', '#gstr3reportexcel', function(){

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

                            query[name_attr] = $(this).val();
                    }

                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exportgstr3_report_details?" + $.param(querydata)
            window.open(url,'_blank');


});
$(document).on('click', '#hsnwisereportexcel', function(){

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

                            query[name_attr] = $(this).val();
                    }

                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exporthsnwise_report_details?" + $.param(querydata)
            window.open(url,'_blank');


});
$(document).on('click', '#searchsupplierwisedata', function(){

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

            var url = "exportsuppliersale_details?" + $.param(querydata)
            window.open(url,'_blank');


});
$(document).on('click', '#exportcreditdata', function(){   

           var query = {};
          
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

                            query[name_attr] = $(this).val();
                        
                    }

                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exportcreditpayment_details?" + $.param(querydata)
            window.open(url,'_blank');

              
     

});
$(document).on('click', '#creditreceiptsexport', function(){

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

                        
                            query[name_attr] = $(this).val();
                     
                    }
                   
                }
            });
            var querydata = {
                'query' : query
            };

            var url = "exportcuscreditreceipts_details?" + $.param(querydata)
            window.open(url,'_blank');



});
$("#billno").typeahead({

  source: function(request, process) {
       var url = "billno_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#billno").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#billno").val()
           objects = [];
           map = {};
           if ($("#billno").val() != '') {
               $.each(data, function (i, object) {
                   map[object.label] = object;
                   objects.push(object.label);
               });
               
               process(objects);              

           } else {
               $(".dropdown-menu").hide();
           }
     });
    },
    
    minLength: 1,
    autoselect:false,
    typeaheadIsFirstItemActive:false,
 
     
});

$("#employee_name").typeahead({

    source: function(request, process) {
       $.ajax({
           url: "employee_search",
           dataType: "json",
           data: {
                search_val: $("#employee_name").val(),
                term: request.term
            },
           success: function (data) {$("#employee_name").val()
                    process(data);

                
           }
     });
    },
    
    minLength: 1,
    autoselect:false,
 
     
});
$("#reference_name").typeahead({

    source: function(request, process) {
       $.ajax({
           url: "reference_search",
           dataType: "json",
           data: {
                search_val: $("#reference_name").val(),
                term: request.term
            },
           success: function (data) {$("#reference_name").val()
                    process(data);

                
           }
     });
    },
    
    minLength: 1,
    autoselect:false,
 
     
});
function resetfilterdata(){
    $("#fromtodate").val('');
    $("#searchcustomerdata").val('');
    $("#billno").val('');
    var data = {};
    var page = 1;
    var sort_type = $("#hidden_sort_type").val();
    var sort_by = $("#hidden_column_name").val();

    fetch_data('datewise_billdetail',page,sort_type,sort_by,data,'viewbillrecord');
}

function resetproductfilterdata(){
    $("#fromtodate").val('');
    $("#searchcustomerdata").val('');
    $("#billno").val('');
    $('#productsearch').val('');
    var data = {};
    var page = 1;
    var sort_type = $("#hidden_sort_type").val();
    var sort_by = $("#hidden_column_name").val();
    fetch_data('datewise_product_billdetail',page,sort_type,sort_by,data,'viewbillproductsrecord');
}

function resetbillgstfilterdata(){
    $("#fromtodate").val('');
    $("#searchcustomerdata").val('');
    $("#billno").val('');
    var data = {};
    var page = 1;
    var sort_type = $("#hidden_sort_type").val();
    var sort_by = $("#hidden_column_name").val();
    fetch_data('gstwise_billdetail',page,sort_type,sort_by,data,'view_billgst_record');
}
function resetprofitfilterdata(){
    $("#fromtodate").val('');
    $("#searchcustomerdata").val('');
    $("#billno").val('');
    var data = {};
    var page = 1;
    var sort_type = $("#hidden_sort_type").val();
    var sort_by = $("#hidden_column_name").val();
    fetch_data('datewise_profitloss_detail',page,sort_type,sort_by,data,'viewbillproductsrecord');
}
function editbill(billid)
{
    $(this).prop('disable',true);
    var url = "bill_edit";
    var type = "POST";
    var data = {
        "bill_id": billid
    }
    var dataType = "";
    callroute(url, type,dataType, data, function (data)
    {
       console.log(data);


    });
}



$("#searchcustomerdata").typeahead({
   source: function(request, process) {
       var url = "viewbillcustomer_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#searchcustomerdata").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#searchcustomerdata").val()
           objects = [];
           map = {};
           var scanned_data = data;
           
                     if ($("#searchcustomerdata").val() != '') {
                         $.each(data, function (i, object) {
                             map[object.label] = object;
                             objects.push(object.label);
                         });
                         process(objects);

                         
                     } else {
                         $(".dropdown-menu").hide();
                     }
                

       });

    },

     autoselect:true,
     afterSelect: function (item) {

     
        var value = item;


             var customer_id = map[item]['customer_id'];
             $('#customer_id').val(customer_id);
    }

});


$("#searchagentdata").typeahead({
   source: function(request, process) {
       var url = "viewbillagent_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#searchagentdata").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#searchagentdata").val()
           objects = [];
           map = {};
          
             
                     if ($("#searchagentdata").val() != '') {
                         $.each(data, function (i, object) {
                             map[object.label] = object;
                             objects.push(object.label);
                         });

                         process(objects);

                         

                         
                     } else {
                         $(".dropdown-menu").hide();
                     }
               
       });

    },


     autoselect:true,
     afterSelect: function (item) {

     
        var value = item;
             var customer_id = map[item]['customer_id'];
             $("#affiliate_id").val(customer_id);

        
    }

});

$("#order_no").typeahead({

  source: function(request, process) {
       var url = "orderno_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#order_no").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#order_no").val()
           objects = [];
           map = {};
           if ($("#order_no").val() != '') {
               $.each(data, function (i, object) {
                   map[object.label] = object;
                   objects.push(object.label);
               });
               
               process(objects);              

           } else {
               $(".dropdown-menu").hide();
           }
     });
    },
    
    minLength: 1,
    autoselect:false,
    typeaheadIsFirstItemActive:false,
 
     
});
$('#fromtodate').change(function(e){


   
    var inoutdate         =     $("#fromtodate").val();
    


    var totalnights       =     inoutdate.split(' - ');

    $("#from_date").val(totalnights[0]);
    $("#to_date").val(totalnights[1]); 

});

function edit_hotelbill(billid)
{


    var  url = "edit_bill";
    var type = "POST";
    var dataType = "";
    var data = {
        'bill_id' : billid,
    };

    callroute(url,type,dataType,data,function (data) {
        var dta = JSON.parse(data);
        if (dta['Success'] == "True")
        {
            var url = '';
            if(dta['url'] != '' && dta['url'] != 'undefined')
            {
                 url = dta['url'];
            }
           localStorage.setItem('edit_bill_record',JSON.stringify(dta['Data']));

            window.location.href = url;



        }
        else
        {
            toastr.error(dta['Message']);
        }
        
    });
}
function edit_returnbill(billid)
{


    var  url = "edit_returnbill";
    var type = "POST";

    var data = {
        'bill_id' : billid,
    };
    var dataType = "";
    callroute(url,type,dataType,data,function (data) {
        var dta = JSON.parse(data);

        if (dta['Success'] == "True")
        {
            var url = '';
            if(dta['url'] != '' && dta['url'] != 'undefined')
            {
                 url = dta['url'];
            }
           localStorage.setItem('edit_returnbill_record',JSON.stringify(dta['Data']));

            window.location.href = url;



        }
        
    });
}

function notedit_hotelbill(billid)
{
    
     toastr.error("Bill has been returned So Cannot Modify this bill");
   
}


$("#productsearch").typeahead({

    source: function(request, process) {
     
        var  url = "sproduct_search";
        var type = "post";
        var dataType = "json";
        var data = {
            search_val: $("#productsearch").val(),
            term: request.term
        };
        callroute(url,type,dataType,data,function (data)
        {
            $("#productsearch").val()
                   
                 objects = [];
                 map = {};

                if($("#productsearch").val()!='')
                  {
                    
                     $.each(data, function(i, object)
                    {
                        map[object.label] = object;
                        objects.push(object.label);
                    });
                    process(objects);

                  
                    
                    
                  }
                  else
                  {
                    $(".dropdown-menu").hide(); 
                  }

     });
    },
    
    minLength: 1,
    autoSelect:false,
 
     
});



function deletebill(obj)
{
    // if(confirm("Are You Sure want to delete this Bill?")) {

         var id                        =     $(obj).attr('id');
         var billid                    =     $(obj).attr('id').split('deletebill_')[1];
        

        if(billid.length > 0)
        {

            var errmsg = "Are You Sure want to delete this Bill?";
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
                        "deleted_id": billid
                    };
                    var url = "bill_delete";
                    var type = "POST";
                    var dataType = "";
                    callroute(url, type,dataType, data, function (data) {

            var dta = JSON.parse(data);

            if (dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
              
                $('.search_data').trigger("click");
                
            } else {
                toastr.error(dta['Message']);
            }
        })
            }
        else
        {
            return false;
        }
    // }
     })
        }
    else
    {
        return false;
    }
}

function deletereturnbill(obj)
{
    if(confirm("Are You Sure want to delete this Bill?")) {

         var id                        =     $(obj).attr('id');
         var billid                    =     $(obj).attr('id').split('deletereturnbill_')[1];
        

        if(billid.length > 0)
        {
        var data = {
            "deleted_id": billid
        };
        var url = "returnbill_delete";
        var type = "POST";
        var dataType = "";
        callroute(url, type,dataType,data, function (data) {

            var dta = JSON.parse(data);

            if (dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
              
                $('.search_data').trigger("click");
                
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
}

function restoredeletedbill(obj)
{
    if(confirm("Are You Sure want to Restore the deleted Bill?")) {

         var id                        =     $(obj).attr('id');
         var billid                    =     $(obj).attr('id').split('restoredeletedbill_')[1];
        

        if(billid.length > 0)
        {
        var data = {
            "deleted_id": billid
        };
        var url = "restore_bill_delete";
        var type = "POST";
            var dataType = "";
        callroute(url, type,dataType, data, function (data) {

            var dta = JSON.parse(data);

            if (dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
              
                resettable('view_deletedbill_popup','viewdeletedbillrecord');                
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
}

$(document).ready(function () {
    localStorage.removeItem('edit_bill_record');
})
// Remove from here and added in common js
// function viewBill(obj){



//     var id                        =     $(obj).attr('id');
//     var bill_no                   =     $(obj).attr('id').split('viewbill_')[1]; 
//     if($('#store_id').length){
//         var store_name   =   $('#store_id').val();
//     }else{
//         var store_name   =   '';
//     }
//     $("#view_bill_type").val(1);
//     var data = {'billno':bill_no,'store_name':store_name};
//     var url = 'view_bill_popup';
//     var type = "POST";
//     var dataType =  "";

//     callroute(url, type, dataType, data,function (data) 
//     {
//         $('.rpopup_values').html('');
//         $('.popup_values').html('');
//         $('.popup_values').html(data);
//         $("#addcustomerpopup").modal('show');
//     });
// }
// Remove from here and added in common js
// function viewConsignment(obj){



//     var id                        =     $(obj).attr('id');
//     var bill_no                   =     $(obj).attr('id').split('viewbill_')[1]; 
   
//     var data = {'billno':bill_no};
//     var url = 'view_consignment_popup';
//     var type = "POST";
//     var dataType = "";

//     callroute(url, type, dataType, data,function (data) 
//     {
//         $('.popup_values').html('');
//         $('.popup_values').html(data);
//         $("#addcustomerpopup").modal('show');
//     });
// }
function viewDeletedBill(obj)
{

    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewDeletedBill_')[1]; 
   
      
        var url                       =     'view_deletedbill_popup';
        $.ajax({
            url:url,

            data: {
               
                billno:bill_no,
                
            },
            success:function(data)
            {
                $('.popup_values').html('');
                $('.popup_values').html(data);

                $("#addcustomerpopup").modal('show');
            }
        })
    
}
function viewCreditreceipt(obj){



    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewcreditreceipt_')[1]; 
   
      
        var url                       =     'view_creditreceipt_popup';
        $.ajax({
            url:url,

            data: {
               
                billno:bill_no,
                
            },
            success:function(data)
            {
                $('.creditpopup_values').html('');
                $('.creditpopup_values').html(data);

                $("#addcreditreceiptpopup").modal('show');
            }
        })
    
}
// Remove from here and added in common js
// function viewreturnBill(obj){


//     var id                        =     $(obj).attr('id');
//     var bill_no                   =     $(obj).attr('id').split('viewreturnbill_')[1]; 
//     if($('#store_id').length){
//         var store_name   =   $('#store_id').val();
//     }else{
//         var store_name   =   '';
//     }
//     $("#view_bill_type").val(2);
//     var data = {'billno':bill_no,'store_name':store_name};
//     var url = 'view_returnbill_popup';
//     var type = "POST";
//     var dataType =  "";

//     callroute(url, type, dataType, data,function (data) 
//     {
//         $('.popup_values').html('');
//         $('.rpopup_values').html('');
//         $('.rpopup_values').html(data);
//         $("#addcustomerpopup").modal('show');
//     });
    
// }



//END


//FOR VIEW BILL POPUP
$('#previousrecord').click(function(e){

   
   
    var view_bill_type           =     $('#view_bill_type').val();
    if($('#store_id').length){
        var store_name   =   $('#store_id').val();
    }else{
        var store_name   =   '';
    }
    
    if(Number(view_bill_type)==1)
    {

         var billno                   =     $('#fetchedbillno').val();   
         var maxid                    =     $('#maxid').val();   
         var minid                    =     $('#minid').val();
            if(Number(billno) == Number(minid))
            {
                    $('#previousrecord').prop('disabled', true);
                    return false;
            }
            else
            {
                $('#nextrecord').prop('disabled', false);
                $('#previousrecord').prop('disabled', false);
                // $('.editdeleteIcons').html('');


             
                var data = {'billno':billno,'store_name':store_name};
                var url = 'previous_invoice';
                var type = "POST";
                var dataType = "";

                callroute(url, type, dataType, data,function (data) 
                {
                    $('.popup_values').html('');
                    $('.popup_values').html(data);
                });

               
            }
    }
    else
    {       
            var billno                   =     $('#rfetchedbillno').val();   
            var maxid                    =     $('#rmaxid').val();   
            var minid                    =     $('#rminid').val();   
            if(Number(billno) == Number(minid))
            {
                    $('#previousrecord').prop('disabled', true);
                    return false;
            }
            else
            {
                $('#nextrecord').prop('disabled', false);
                $('#previousrecord').prop('disabled', false);
                // $('.editdeleteIcons').html('');


             
                var data = {'billno':billno,'store_name':store_name};
                var url = 'rprevious_invoice';
                var type = "POST";
                var dataType = "";

                callroute(url, type, dataType, data,function (data) 
                {

                    $('.rpopup_values').html('');
                    $('.rpopup_values').html(data);
                });

               
            }

    }
    

});

$('#nextrecord').click(function(e){


    var view_bill_type           =     $('#view_bill_type').val();
    if($('#store_id').length){
        var store_name   =   $('#store_id').val();
    }else{
        var store_name   =   '';
    }
    
    if(Number(view_bill_type)==1)
    {
            var billno                   =     $('#fetchedbillno').val();   
            var maxid                    =     $('#maxid').val();   
            var minid                    =     $('#minid').val();   

            if(Number(billno) == Number(maxid))
            {
                     $('#nextrecord').prop('disabled', true);
                    return false;
            }
            else
            {
                $('#nextrecord').prop('disabled', false);
                 $('#previousrecord').prop('disabled', false);
                 // $('.editdeleteIcons').html('');


                var data = {'billno':billno,'store_name':store_name};
                var url = 'next_invoice';
                var type = "POST";
                var dataType = "";

                callroute(url, type, dataType, data,function (data) 
                {
                    $('.popup_values').html('');
                    $('.popup_values').html(data);
                });
            }
    }
    else
    {
        var billno                   =     $('#rfetchedbillno').val();   
        var maxid                    =     $('#rmaxid').val();   
        var minid                    =     $('#rminid').val();
        if(Number(billno) == Number(maxid))
            {
                     $('#nextrecord').prop('disabled', true);
                    return false;
            }
            else
            {
                $('#nextrecord').prop('disabled', false);
                 $('#previousrecord').prop('disabled', false);
                 // $('.editdeleteIcons').html('');


                var data = {'billno':billno,'store_name':store_name};
                var url = 'rnext_invoice';
                var type = "POST";
                var dataType = "";

                callroute(url, type, dataType, data,function (data) 
                {
                    $('.popup_values').html('');
                    $('.rpopup_values').html('');
                    $('.rpopup_values').html(data);
                });
            }
    }

});

$("body").on("click", "#uploadsales", function ()
{
    $("#uploadsales").attr('disabled',true);
    var salestemplate   =   $('input[name=uploadtemplate]:checked').val();

    $(".loaderContainer").show();

    //Reference the FileUpload element.
    var fileUpload = $("#salesfileUpload")[0];

    var ext = fileUpload.value.split('.').pop();

    //Validate whether File is valid Excel file.
    var validImageTypes = ['xls', 'xlsx'];

    // var regex = /^([a-zA-Z 0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    // if (regex.test(fileUpload.value.toLowerCase())) {
    if (validImageTypes.includes(ext))
    {
        if (typeof (FileReader) != "undefined")
        {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString)
            {
                reader.onload = function (e)
                {
                    if(Number(salestemplate)==1)
                    {
                       ProcessExcel(e.target.result);
                    }
                    else
                    {
                       ProcessreturnExcel(e.target.result);
                    }
                    
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e)
                {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    if(Number(salestemplate)==1)
                    {
                       ProcessExcel(data);
                    }
                    else
                    {
                       ProcessreturnExcel(data);
                    }
                    
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            $("#uploadsales").attr('disabled',false);
            $(".loaderContainer").hide();
            alert("This browser does not support HTML5.");
        }
    } else {
        $("#uploadsales").attr('disabled',false);
        $(".loaderContainer").hide();
        alert("Please upload a valid Excel file.");
    }
});

function ProcessExcel(data) {
    //Read the Excel File data.

    var result;

    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet],{ defval: ''});

    var final_salesarr = [];
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
        final_salesarr.push(final_data);
    });

    var error = 0;

   $.each(final_salesarr,function (validate_ckey,validate_cvalue)
    {
        if(validate_cvalue['Order ID/PO NO'] == '')
        {
            error = 1;
            toastr.error("Order No field cannot be Empty");

        }
        if(validate_cvalue['Order Qty'] == '')
        {
            error = 1;
            toastr.error("Order Qty Cannot be Empty");

        }
        if(Number(bill_calculation)==1)
        {
            if(validate_cvalue['Price'] == '' || validate_cvalue['Price'] == 0)
            {
                error = 1;
                toastr.error("Price Cannot be Empty or Zero");

            }
            // else if(validate_cvalue['Price'] != '' && !$.isNumeric(validate_cvalue['Price']))
            // {
            //     error = 1;
            //     toastr.error("Price must be numeric!")
            // }
            
        }
              
        if(Number(bill_excel_column_check)==1)
        {
            if(validate_cvalue['Product Code'] == '')
            {
                error = 1;
                toastr.error("Product Code Cannot be Empty");

            }
        }
        else
        {
            if(validate_cvalue['Barcode'] == '')
            {
                error = 1;
                toastr.error("Barcode Cannot be Empty");

            }
        }

        if(error == 1)
        {
            $("#uploadsales").attr('disabled',false);
            return false;
        }



    });

    if(error == 0)
    {
        checksales(final_salesarr);
    }
    else
    {
        $(".loaderContainer").hide();
    }
}

function checksales(salesarr)
{
    var  url = "sales_check";
    var type = "POST";
    var dataType = "";

    callroute(url,type,dataType,salesarr,function (data)
    {
        var responce = JSON.parse(data);
        if(responce['Success'] == "True")
        {
            $(".loaderContainer").hide();
            toastr.success(responce[['Message']]);
            $("#uploadsales").attr('disabled',false);
            $("#salesfileUpload").val('');
            // resettable('bill_fetch_data','viewbillrecord');

            var excelfileno     =    responce[['excelfileno']];

             if(responce[['pendingbillscheck']] == 1)
             {

                toastr.success("Please download the excel file of products having stock less than bill Qty. You can take inward for these products and can upload the file again.");
                    var querydata = {
                        'excelfileno' : excelfileno
                    };


                    var url = "exportpendingbills_details?" + $.param(querydata)
                    window.open(url,'_blank');

             }


           

        }
        else
        {
            toastr.error(responce[['Message']]).delay(30000).fadeOut(5000);;
            $(".loaderContainer").hide();
            $("#uploadsales").attr('disabled',false);

             var excelfileno     =    responce[['excelfileno']];

             if(responce[['pendingbillscheck']] == 1)
             {

                toastr.success("Please download the excel file of products having stock less than bill Qty. You can take inward for these products and can upload the file again.");
                    var querydata = {
                        'excelfileno' : excelfileno
                    };


                    var url = "exportpendingbills_details?" + $.param(querydata)
                    window.open(url,'_blank');

             }
           
            
        }
    })
}

function ProcessreturnExcel(data) {
    //Read the Excel File data.

    var result;

    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];
    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet],{ defval: ''});

    var final_salesarr = [];
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
        final_salesarr.push(final_data);
    });

    var error = 0;

   $.each(final_salesarr,function (validate_ckey,validate_cvalue)
    {
        if(validate_cvalue['Order ID/PO NO'] == '')
        {
            error = 1;
            toastr.error("Order No field cannot be Empty");

        }
        if(validate_cvalue['RTO Qty'] == '')
        {
            error = 1;
            toastr.error("Return Qty Cannot be Empty");

        }
        if(Number(bill_calculation)==1)
        {
            if(validate_cvalue['Price'] == '' || validate_cvalue['Price'] == 0)
            {
                error = 1;
                toastr.error("Price Cannot be Empty or Zero");

            }
            // else if(validate_cvalue['Price'] != '' && !$.isNumeric(validate_cvalue['Price']))
            // {
            //     error = 1;
            //     toastr.error("Price must be numeric!")
            // }
            
        }
              
        if(Number(bill_excel_column_check)==1)
        {
            if(validate_cvalue['Product Code'] == '')
            {
                error = 1;
                toastr.error("Product Code Cannot be Empty");

            }
        }
        else
        {
            if(validate_cvalue['Barcode'] == '')
            {
                error = 1;
                toastr.error("Barcode Cannot be Empty");

            }
        }

        if(error == 1)
        {
            $("#uploadsales").attr('disabled',false);
            return false;
        }



    });

    if(error == 0)
    {
        checkreturnsales(final_salesarr);
    }
    else
    {
        $(".loaderContainer").hide();
    }
}
function checkreturnsales(salesarr)
{
    var  url = "returnsales_check";
    var type = "POST";
    var dataType = "";

    callroute(url,type,dataType,salesarr,function (data)
    {
        var responce = JSON.parse(data);
        if(responce['Success'] == "True")
        {
            $(".loaderContainer").hide();
            toastr.success(responce[['Message']]);
            $("#uploadsales").attr('disabled',false);
            $("#salesfileUpload").val('');
            // resettable('bill_fetch_data','viewbillrecord');

            var excelfileno     =    responce[['excelfileno']];

             if(responce[['pendingbillscheck']] == 1)
             {

                toastr.success("Please download the excel file of products having stock less than bill Qty. You can take inward for these products and can upload the file again.");
                    var querydata = {
                        'excelfileno' : excelfileno
                    };


                    var url = "exportpendingbills_details?" + $.param(querydata)
                    window.open(url,'_blank');

             }


           

        }
        else
        {
            toastr.error(responce[['Message']]).delay(30000).fadeOut(5000);;
            $(".loaderContainer").hide();
            $("#uploadsales").attr('disabled',false);

             var excelfileno     =    responce[['excelfileno']];

             if(responce[['pendingbillscheck']] == 1)
             {

                toastr.success("Please download the excel file of products having stock less than bill Qty. You can take inward for these products and can upload the file again.");
                    var querydata = {
                        'excelfileno' : excelfileno
                    };


                    var url = "exportpendingbills_details?" + $.param(querydata)
                    window.open(url,'_blank');

             }
           
            
        }
    })
}