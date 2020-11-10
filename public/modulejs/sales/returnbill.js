$("#invoice_date").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom",
    autoclose: true

}).on('keypress paste', function (e) {
    e.preventDefault();
    return false;
});

$("input[name=cashcreditreturn]").click(function() { 

      var cashcreditreturn   = $("input[name='cashcreditreturn']:checked"). val();

      if(Number(cashcreditreturn)==1)
      {
          totalcalculation();
      }
      else
      {
          totalcalculation();
      }

});


$("#billreference_by_search").typeahead({
   source: function(request, process) {
       var url = "refby_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#billreference_by_search").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#billreference_by_search").val()
           objects = [];
           map = {};
           var scanned_data = data;
           if(scanned_data["Success"]=="False")
                {
                    
                    
                }
                else
                {
                     if ($("#billreference_by_search").val() != '') {
                         $.each(data, function (i, object) {
                             map[object.label] = object;
                             objects.push(object.label);
                         });

                         process(objects);


                         
                     } else {
                         $(".dropdown-menu").hide();
                     }
                }

       });

    },

   // minLength: 1,
    // typeahead-focus-first="false"
     autoselect:true,
    // autoSelect:false,
    // typeahead-select-on-exact="true"
     afterSelect: function (item) {

      //$('.loaderContainer').show();
        var value = item;


        if(map[item] == undefined)
        {
            $('.loaderContainer').hide();
            //toastr.error("Wrong Product Scanned Please Scan the same Product again !");

        }
        else
        {

             var customer_id = map[item]['customer_id'];
            $("#reference_by").val(customer_id);
        }

    }

});

$("#productsearch").typeahead({



    source: function(request, process) {

      var returntype  =   $('input[name=returntype]:checked').val();


     if(returntype  == undefined )
       {
            toastr.error("Please Select Return type First");
            $("#productsearch").val('')
            return false;
       }
       else
       {

            var  url = "returnproduct_search";
            var type = "post";
            var dataType = "json";
            var data = {
                search_val: $("#productsearch").val(),
                term: request.term
            };
           
       }
      
       
        callroute(url, type, dataType, data, function (data) {
           $("#productsearch").val()

                objects = [];

                map = {};

                if($("#productsearch").val()!='')
                  {

                     $.each(data, function(i, object)
                    {
                         if(Array.isArray(object))
                          {

                              $.each(object, function(j, oobject)
                              {
                                map[oobject.label] = oobject;
                                objects.push(oobject.label);

                              });
                          }
                         else
                         {
                              map[object.label] = object;
                              objects.push(object.label);
                         }
                    });
                    process(objects);
                    

                  }
                  else
                  {
                    $(".dropdown-menu").hide();
                  }


     });
    },
    
 //minLength: 1,
    autoselect:true,
   // typeahead-select-on-exact="true"
     afterSelect: function (item) {
     
     $('.loaderContainer').show();
        var value = item;

        if(map[item] == undefined)
        {
            $('.loaderContainer').hide();
            toastr.error("Wrong Product Scanned Please Scan the same Product again !");
            $("#productsearch").val('');

        }
        else
        {

           
            var product_id = map[item]['product_id'];
            var batch_no = map[item]['batch_no'];
            var billreturn_type   =  $('input[name=returntype]:checked').val();
            $('.loaderContainer').show();


             if(Number($('input[name=returntype]:checked').val())==1)
              {
                  returnproductdetail(product_id,batch_no,billreturn_type);
                  $("#productsearch").val('');
              }
              else
              {
                  returnconsignproductdetail(product_id,batch_no,billreturn_type);
                  $("#productsearch").val('');
              }


            
        }

    }

});

$("#manualbill_no").typeahead({
   source: function(request, process) {

   var returntype  =   $('input[name=returntype]:checked').val();


     if(returntype  == undefined )
       {
            toastr.error("Please Select Return type First");
            $("#manualbill_no").val('')
            return false;
       }
       else
       {

          if(Number(returntype) == 1)
          {
               var url = "billno_search";
               var type = "post";
               var dataType = "json";
               var data = {
                   search_val: $("#manualbill_no").val(),
                   term: request.term
               }; 
          }
          else
          {
               var url = "consignbill_search";
               var type = "post";
               var dataType = "json";
               var data = {
                   search_val: $("#manualbill_no").val(),
                   term: request.term
               }; 
          }
           
       }

      
      

       callroute(url, type, dataType, data, function (data) {
           $("#manualbill_no").val()
           objects = [];
           map = {};
           if ($("#manualbill_no").val() != '') {
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
   
     afterSelect: function (item) {


    
        var value = item;
        
        $('.manualsearcharea').show();
        $('#productsearch').attr('readonly', true); 
        $('#manualbill_no').attr('readonly', true); 
        $('#manualbill_no').css("color", "black");
        $('#bill_no').attr('readonly', true); 
        $('#searchbilldata').attr('disabled',true);
        $('#resetfilter').attr('disabled',true);

        if(Number($('input[name=returntype]:checked').val())==1)
        {
            var sales_bill_id = map[item]['sales_bill_id'];
            returncustomerdetail(sales_bill_id);
        }
        else
        {
            var sales_bill_id = map[item]['consign_bill_id'];
            returnconsigncustomerdetail(sales_bill_id);
        }

        

    }

});
function returncustomerdetail(sales_bill_id)
{

 
   var type = "POST";
   var url = 'returncustomer_detail';
   var dataType = "";
   var data = {
       "sales_bill_id" : sales_bill_id
   }
   callroute(url,type,dataType,data,function(data)
   {

        var bill_data = JSON.parse(data,true);


        if(bill_data['Success'] == "True")
        {

            $('#searchbilldata').prop('disabled', true);
            var bill_detail         = bill_data['Data'];
            var bill_productdetail  = bill_data['ProductData'];
            if(bill_detail['customer_id']!=null)
            {
                $('.customersearcharea').hide();
            }
           

            var customer_name = '';
            var customer_mobile='';
            var customer_email='';
            var cusreference ='';
            
              if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_name']!= null && bill_detail['customer']['customer_name']!= undefined)
              {
                        customer_name  =  bill_detail['customer']['customer_name'];
                        $('.customerdata').show();
              }
              
              if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_mobile']!= null && bill_detail['customer']['customer_mobile']!= undefined)
              {
                        customer_mobile  =  bill_detail['customer']['customer_mobile'];
              }
              
              if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_email']!= null && bill_detail['customer']['customer_email']!= undefined)
              {
                        customer_email  =  bill_detail['customer']['customer_email'];
              }
             if(bill_detail['reference']!= null && bill_detail['reference']!= '' && bill_detail['reference']['reference_name']!= null && bill_detail['reference']['reference_name']!= undefined)
              {
                        cusreference  =  bill_detail['reference']['reference_name'];
              }

               $('#ccustomer_id').val(bill_detail['customer_id']);
               $("#sales_bill_id").val(bill_detail['sales_bill_id']);
               //$("#invoice_date").val(bill_detail['bill_date']);
               $("#invoice_no").val(bill_detail['bill_no']);
               $("#discount_percent").val(bill_detail['discount_percent']);
               $("#discount_amount").val(bill_detail['discount_amount']);
               $("#roomwisediscount_amount").val(bill_detail['productwise_discounttotal']);
               $(".customer_points_percent").html(bill_detail['extra_discount_percent']);
               $("#customer_points").val(bill_detail['customerused_points']);
               $('.actualcustomer_points_percent').html(bill_detail['customer_discount_percent']);
               $('#referral_points_percent').val(bill_detail['ref_discount_percent']);
               $('#referral_points').val(bill_detail['referenceby_points']);
               $('#customerbalused_points').val(bill_detail['customerbalused_points']);
               $('#totaldiscount_percent').val(bill_detail['clubdiscount_percent']);

               if(Number(bill_detail['customerbalused_points'])>0)
              {
                $('#checkreferral').prop("checked", true);
                $('#checkreferral').prop("disabled", true);
                //$(":checkbox").bind("click", false);
              }


                $("#customer_name").val(customer_name);
                $("#customer_mobile").val(customer_mobile);
                $("#customer_email").val(customer_email);
                $("#refname").val(cusreference);
                
                if(bill_detail['sales_bill_payment_detail'] != 'undefined' && bill_detail['sales_bill_payment_detail'] != '')
               {
                   $.each(bill_detail['sales_bill_payment_detail'],function (paymentkey,paymentvalue)
                   {
    
                    if(paymentvalue['payment_method_id'] != '')
                       {
                                $("#showoldbill_"+paymentvalue['payment_method_id']).show();
                                $("#bill_"+paymentvalue['payment_method'][0]['html_id']).val(paymentvalue['total_bill_amount']);
                               
                       }
                      
                   });
               }

          
            if(bill_detail['customer_creditaccount'] != 'undefined' && bill_detail['customer_creditaccount'] != '' && bill_detail['customer_creditaccount'] != null)
            {
                     
                    $("#creditaccountid").val(bill_detail['customer_creditaccount']['customer_creditaccount_id']);
                    $("#totalcreditamount").val(bill_detail['customer_creditaccount']['credit_amount']);  
                    $("#totalcreditbalance").val(bill_detail['customer_creditaccount']['balance_amount']);   
            }


            var productcount  = 0;
            var chargecount  = 0;

                 //console.log(bill_productdetail);
                   
          if(bill_productdetail != 'undefined' && bill_productdetail != '')
            {

                   var product_html = '';   
                    var pcount    = 0;
                    var sellingprice  = 0;
                    var stock = 0;
                    var pricehtml = '';  
                    var chargeshtml = ''; 
                      
               $.each(bill_productdetail,function (billkey,billvalue)  
               {
                        
                  
                    if(billvalue['product_type']==2)
                       {

                              chargecount   = 1;
                              var cproduct_id              =   billvalue['product_id'];
                              var chargesamt               =   billvalue['mrp']- billvalue['totalreccharges'];
                              var maxgst                   =   billvalue['igst_percent'];
                              

                              var cprodgstamt               =    Number(chargesamt)   * Number(maxgst) / 100;
                              var ctotalamt                 =    Number(chargesamt) + Number(cprodgstamt);

                              var cshowigst_amount          =   Number(cprodgstamt).toFixed(2);
                              var ctotal_amount             =    Number(ctotalamt).toFixed(2);

                             chargeshtml +=   '<tr id="charges_'+cproduct_id+'">'+
                                '<td id="chargesname_'+cproduct_id+'" style="text-align:left !important;">'+
                                '<input value="" type="hidden" id="creturn_product_id_'+cproduct_id+'" name="creturn_product_id_[]" class="" >'+
                                '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="csales_product_id_'+cproduct_id+'" name="csales_product_id_[]" class="" >'+
                                '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                                '<input value="'+cproduct_id+'" type="hidden" id="cproductid_'+cproduct_id+'" name="cproductid[]" class="">'+billvalue['product']['product_name']+'</td>'+                                                
                                '<td class="bold"  id="chargesamtdetails_'+cproduct_id+'">'+
                                    '<input type="text" id="chargesamt_'+cproduct_id+'" onkeyup="return addcharges(this);" class="floating-input tarifform-control number" name="chargesamt[]" value="'+chargesamt+'" readonly style="background:#f3f9ec !important;" tabindex="-1">'+
                                    '<input type="hidden" id="ochargesamt_'+cproduct_id+'" name="ochargesamt[]" value="'+chargesamt+'">'+
                                    '<input type="hidden" id="cqty_'+cproduct_id+'" class="floating-input tarifform-control number" name="cqty[]" value="'+billvalue['qty']+'">'+
                                '</td>'+                                              
                                '<td id="csprodgstper_'+cproduct_id+'" style="text-align:right !important;">'+billvalue['igst_percent']+'</td>'+
                                '<td id="csprodgstamt_'+cproduct_id+'" style="text-align:right !important;">'+cshowigst_amount+'</td>'+
                                '<td id="cprodgstper_'+cproduct_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                                '<td id="cprodgstamt_'+cproduct_id+'" style="display:none;" name="prodgstamt[]">'+cprodgstamt+'</td>'+
                                '<td id="ctotalamount_'+cproduct_id+'" style="font-weight:bold;display:none;" class="ctotalamount" name="ctotalamount[]">'+ctotalamt+'</td>'+
                                '<td id="cstotalamount_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+ctotal_amount+'</td>'+
                                '<td id="cstotalamountdetails_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+'<input type="text" id="oldchargesamt_'+cproduct_id+'" value="'+ctotal_amount+'" class="floating-input tarifform-control number " style="display:none;">'+'<input type="text" id="creturntotalamount_'+cproduct_id+'" value="0" class="floating-input tarifform-control number chargesamt" onkeyup="return taddcharges(this);" style="width:50%;font-weight:bold;">'+'</td>'+
                            '</tr>';
                                                   
                        }
                              

                })
                        

                       
                       $(".odd").hide();
                       
                       $('.showtitems').show();
                       $('.loaderContainer').hide();
                       $("#charges_record").append(chargeshtml);
              }
                   //end of fillup product detail row
                 
                totalcalculation();
    

          }  
          if(bill_data["Success"]=="False")
          {
              toastr.error(bill_data['Message']);
              $('.loaderContainer').hide();
          }


   })
 }
function returnconsigncustomerdetail (sales_bill_id)
{

 
   var type = "POST";
   var url = 'returnconsigncustomer_detail';
   var dataType = "";
   var data = {
       "sales_bill_id" : sales_bill_id
   }
   callroute(url,type,dataType,data,function(data)
   {

        var bill_data = JSON.parse(data,true);


        if(bill_data['Success'] == "True")
        {

            $('#searchbilldata').prop('disabled', true);
            var bill_detail         = bill_data['Data'];
            var bill_productdetail  = bill_data['ProductData'];
            if(bill_detail['customer_id']!=null)
            {
                $('.customersearcharea').hide();
            }
           

            var customer_name = '';
            var customer_mobile='';
            var customer_email='';
            var cusreference ='';
            
              if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_name']!= null && bill_detail['customer']['customer_name']!= undefined)
              {
                        customer_name  =  bill_detail['customer']['customer_name'];
                        $('.customerdata').show();
              }
              
              if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_mobile']!= null && bill_detail['customer']['customer_mobile']!= undefined)
              {
                        customer_mobile  =  bill_detail['customer']['customer_mobile'];
              }
              
              if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_email']!= null && bill_detail['customer']['customer_email']!= undefined)
              {
                        customer_email  =  bill_detail['customer']['customer_email'];
              }
             if(bill_detail['reference']!= null && bill_detail['reference']!= '' && bill_detail['reference']['reference_name']!= null && bill_detail['reference']['reference_name']!= undefined)
              {
                        cusreference  =  bill_detail['reference']['reference_name'];
              }

               $('#ccustomer_id').val(bill_detail['customer_id']);
               $("#consign_bill_id").val(bill_detail['consign_bill_id']);
               //$("#invoice_date").val(bill_detail['bill_date']);
               $("#invoice_no").val(bill_detail['bill_no']);
               $("#discount_percent").val(bill_detail['discount_percent']);
               $("#discount_amount").val(bill_detail['discount_amount']);
               $("#roomwisediscount_amount").val(bill_detail['productwise_discounttotal']);

                $("#customer_name").val(customer_name);
                $("#customer_mobile").val(customer_mobile);
                $("#customer_email").val(customer_email);
                $("#refname").val(cusreference);

         
            var productcount  = 0;
            var chargecount  = 0;

                 //console.log(bill_productdetail);
                   
          if(bill_productdetail != 'undefined' && bill_productdetail != '')
            {

                   var product_html = '';   
                    var pcount    = 0;
                    var sellingprice  = 0;
                    var stock = 0;
                    var pricehtml = '';  
                    var chargeshtml = ''; 
                      
               $.each(bill_productdetail,function (billkey,billvalue)  
               {
                        
                  
                    if(billvalue['product_type']==2)
                       {

                              chargecount   = 1;
                              var cproduct_id              =   billvalue['product_id'];
                              var chargesamt               =   billvalue['mrp']- billvalue['totalreccharges'];
                              var maxgst                   =   billvalue['igst_percent'];
                              

                              var cprodgstamt               =    Number(chargesamt)   * Number(maxgst) / 100;
                              var ctotalamt                 =    Number(chargesamt) + Number(cprodgstamt);

                              var cshowigst_amount          =   Number(cprodgstamt).toFixed(2);
                              var ctotal_amount             =    Number(ctotalamt).toFixed(2);

                             chargeshtml +=   '<tr id="charges_'+cproduct_id+'">'+
                                '<td id="chargesname_'+cproduct_id+'" style="text-align:left !important;">'+
                                '<input value="" type="hidden" id="creturn_product_id_'+cproduct_id+'" name="creturn_product_id_[]" class="" >'+
                                '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="csales_product_id_'+cproduct_id+'" name="csales_product_id_[]" class="" >'+
                                '<input value="'+billvalue['consign_products_detail_id']+'" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                                '<input value="'+cproduct_id+'" type="hidden" id="cproductid_'+cproduct_id+'" name="cproductid[]" class="">'+billvalue['product']['product_name']+'</td>'+                                                
                                '<td class="bold"  id="chargesamtdetails_'+cproduct_id+'">'+
                                    '<input type="text" id="chargesamt_'+cproduct_id+'" onkeyup="return addcharges(this);" class="floating-input tarifform-control number" name="chargesamt[]" value="'+chargesamt+'" readonly style="background:#f3f9ec !important;" tabindex="-1">'+
                                    '<input type="hidden" id="ochargesamt_'+cproduct_id+'" name="ochargesamt[]" value="'+chargesamt+'">'+
                                    '<input type="hidden" id="cqty_'+cproduct_id+'" class="floating-input tarifform-control number" name="cqty[]" value="'+billvalue['qty']+'">'+
                                '</td>'+                                              
                                '<td id="csprodgstper_'+cproduct_id+'" style="text-align:right !important;">'+billvalue['igst_percent']+'</td>'+
                                '<td id="csprodgstamt_'+cproduct_id+'" style="text-align:right !important;">'+cshowigst_amount+'</td>'+
                                '<td id="cprodgstper_'+cproduct_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                                '<td id="cprodgstamt_'+cproduct_id+'" style="display:none;" name="prodgstamt[]">'+cprodgstamt+'</td>'+
                                '<td id="ctotalamount_'+cproduct_id+'" style="font-weight:bold;display:none;" class="ctotalamount" name="ctotalamount[]">'+ctotalamt+'</td>'+
                                '<td id="cstotalamount_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+ctotal_amount+'</td>'+
                                '<td id="cstotalamountdetails_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+'<input type="text" id="oldchargesamt_'+cproduct_id+'" value="'+ctotal_amount+'" class="floating-input tarifform-control number " style="display:none;">'+'<input type="text" id="creturntotalamount_'+cproduct_id+'" value="0" class="floating-input tarifform-control number chargesamt" onkeyup="return taddcharges(this);" style="width:50%;font-weight:bold;">'+'</td>'+
                            '</tr>';
                                                   
                        }
                              

                })
                        

                       
                       $(".odd").hide();
                       
                       $('.showtitems').show();
                       $('.loaderContainer').hide();
                       $("#charges_record").append(chargeshtml);
              }
                   //end of fillup product detail row
                 
                totalcalculation();
    

          }  

   })
 }

$("#bill_no").typeahead({
   source: function(request, process) {
       var url = "billno_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#bill_no").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#bill_no").val()
           objects = [];
           map = {};
           if ($("#bill_no").val() != '') {
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
     afterSelect: function (item) {
    
        var value = item;
        var sales_bill_id = map[item]['sales_bill_id'];
        $('.manualsearcharea').hide();
    }
   

});
$("#manualproductsearch").typeahead({
   source: function(request, process) {

    var returntype  =   $('input[name=returntype]:checked').val();


     if(returntype  == undefined )
       {
            toastr.error("Please Select Return type First");
            $("#manualbill_no").val('')
            return false;
       }
       else
       {

          if(Number(returntype) == 1)
          {
                 var url = "manualproduct_search";
                 var type = "post";
                 var dataType = "json";
                 var data = {
                     search_val: $("#manualproductsearch").val(),
                     sales_bill_id: $('#sales_bill_id').val(),
                     term: request.term
                 };
          }
          else
          {
                 var url = "manualconsignproduct_search";
                 var type = "post";
                 var dataType = "json";
                 var data = {
                     search_val: $("#manualproductsearch").val(),
                     sales_bill_id: $('#consign_bill_id').val(),
                     term: request.term
                 };
          }
           
       }



      

       callroute(url, type, dataType, data, function (data) {
           $("#manualproductsearch").val()
           objects = [];
           map = {};
           if ($("#manualproductsearch").val() != '') {
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
    
     afterSelect: function (item) {
      $('.loaderContainer').show();
        var value = item;


        if(map[item] == undefined)
        {
            $('.loaderContainer').hide();
            toastr.error("Wrong Product Scanned Please Scan the same Product again !");

        }
        else
        {
            if(Number($('input[name=returntype]:checked').val())==1)
            {
                 var product_id = map[item]['product_id'];
                 var sales_products_detail_id = map[item]['sales_products_detail_id'];
               
                 manualgetproductdetail(product_id,sales_products_detail_id);
                  $(".manualsearcharea .dropdown-menu").html('');
            }
            else
            {     
                  var product_id = map[item]['product_id'];
                  var sales_products_detail_id = map[item]['consign_products_detail_id'];
               
                 manualgetconsignproductdetail(product_id,sales_products_detail_id);
                  $(".manualsearcharea .dropdown-menu").html('');
            }
            

        }

    }

});



function manualgetproductdetail(product_id,sales_products_detail_id)
{


   //var columnid        =   columnid;
   var sales_bill_id   =   $('#sales_bill_id').val();
   var type = "POST";
   var url = 'manualproduct_detail';
   var samerow  =  0;
   var dataType = "";
   var data = {
       "product_id" : product_id,
       "sales_products_detail_id":sales_products_detail_id,
       "sales_bill_id"    : sales_bill_id
   }
   callroute(url,type,dataType,data,function(data)
   {

        var bill_data = JSON.parse(data,true);


        if(bill_data['Success'] == "True")
        {
            var product_html = '';
            var billvalue  = bill_data['Data'][0];

            var product_id                  =   billvalue['price_master_id'];

            //console.log(billvalue);


                var samerow = 0;
                $("#sproduct_detail_record tr").each(function()
                {
                    var row_product_id = $(this).attr('id').split('_')[1];
                    if(row_product_id == product_id)
                    {
                         var qty    = $("#qty_"+product_id).val();
                         var oldqty = $("#oldqty_"+product_id).val();
                         var product_qty = ((Number(qty)) + (Number(1)));
                         if(Number(product_qty) >  Number(oldqty))
                         {
                                toastr.error("Entered Qty is Greater than Bill qty.");
                                samerow = 1;
                         }
                         else
                         {
                                 $("#qty_"+product_id).val(product_qty);
                                 samerow = 1;
                                 calqty($('#qty_'+product_id));
                         }
                         
                        
                         return false;
                    }
                });
              
              if(samerow == 0)
              {


                    var rinwardids      =     (billvalue['inwardids'].slice(0,-1)).split(',');
                    var rinwardqtys     =     (billvalue['inwardqtys'].slice(0,-1)).split(',');
                    var tinwardids      =      '';
                    var tinwardqtys     =      '';
                    var totiqty         =      '';
                    var totalreturnqty  =      '';

                                //console.log(billvalue['return_product_detail']);

                 if(billvalue['return_product_detail'] != 'undefined' && billvalue['return_product_detail'] != '')
                {               

                    $.each(rinwardids,function (ridkey,ridvalue)
                    {
                        
                            var totiqty         =      '';
                              $.each(billvalue['return_product_detail'],function (rbillkey,rbillvalue)
                              {
                                 
                                    
                                    var iids             =     (rbillvalue['inwardids'].slice(0,-1)).split(',');
                                    var iqtys            =     (rbillvalue['inwardqtys'].slice(0,-1)).split(',');
                                       
                                         
                                              
                                            $.each(iids,function (iidkey,iidvalue)
                                            {
                                                if(ridvalue == iidvalue)
                                                {
                                                    totiqty  =  Number(totiqty) + Number(iqtys[iidkey]);

                                                }
                                                
                                            })
                                            
                                           

                                           
                                })


                                  if(totiqty!='')
                                  {

                                      if(Number(rinwardqtys[ridkey]) != Number(totiqty))
                                      {
                                          
                                           tinwardids     +=     ridvalue+',';
                                           tinwardqtys    +=     (Number(rinwardqtys[ridkey])-Number(totiqty))+',';
                                      }
                                  }
                                  else
                                  {
                                           tinwardids      +=     ridvalue+',';
                                           tinwardqtys    +=     (Number(rinwardqtys[ridkey]))+',';
                                  }
                            
                           
                            
                       })
                 }

                else
                {
                     tinwardids     +=     billvalue['inwardids'];
                     tinwardqtys    +=     billvalue['inwardqtys'];
                 }

      
                       if(billvalue['qty']==billvalue['totalreturnqty'])
                       {

                       }
                       else
                       {
                       
                                productcount =  1;
                                var qty                         =   billvalue['qty'] - billvalue['totalreturnqty'];

                                

                                var sellingprice                =   billvalue['sellingprice_before_discount'];
                                
                                var discount_percent            =   billvalue['discount_percent'];
                                var overalldiscount_percent     =   billvalue['overalldiscount_percent'];
                                var gst_percent                 =   billvalue['igst_percent'];
                                var totalmrpdiscount            =   (Number(billvalue['mrp']) * Number(qty)) * Number(discount_percent) / 100;

                                var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                                var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_percent) / 100).toFixed(4);

                                var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                                var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                                var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                                
                                var totalgst                     =      Number(gst_amount) * Number(qty);


                                var sellingwithgst               =      Number(discountedamt) + Number(totalgst);



                              var totalsellingwgst               =     discountedamt;
                          
                              var mrpproddiscountamt              =     ((Number(sellingwithgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
                              var proddiscountamt              =     ((Number(totalsellingwgst) * Number(overalldiscount_percent)) / 100).toFixed(4);

                              var totalproddiscountamt         =     Number(proddiscountamt)

                              var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                               
                                
                                var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                                
                               
                                var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
                                var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);




                                var showsellingprice              =   Number(billvalue['sellingprice_before_discount']).toFixed(2);
                                var showigst_amount               =   Number(billvalue['igst_amount']).toFixed(2);
                                var mrp                           =    Number(billvalue['mrp']).toFixed(2);
                                var total_amount                  =    Number(total_amount).toFixed(4);
                                var stotal_amount                  =    Number(total_amount).toFixed(2);

              // console.log(bill_data['Billtype']);
                  if(bill_data['Billtype']==3)
                  {
                    var batchhtml   =   '<td id="batchno_'+product_id+'">'+billvalue['batchprice_master']['batch_no']+'</td>';
                  } 
                  else
                  {
                    var batchhtml  = '';
                  }             
                
                    if(billvalue['product']['supplier_barcode']!='' && billvalue['product']['supplier_barcode']!=null)
                    {
                      var barcode     =     billvalue['product']['supplier_barcode'];
                    }
                    else
                    {
                      var barcode     =     billvalue['product']['product_system_barcode'];
                    }

                     var feature_show_val = "";
                            if(bill_show_dynamic_feature != '')
                            {
                                var feature = bill_show_dynamic_feature.split(',');

                                $.each(feature,function(fea_key,fea_val)
                                {
                                    var feature_name = '';                               

                                    if(typeof(billvalue['product'][fea_val]) != "undefined" && billvalue['product'][fea_val] !== null) {

                                        feature_name = billvalue['product'][fea_val];
                                        //console.log(feature_name);
                                    }

                                    feature_show_val += '<td>' + feature_name + '</td>';
                                })
                            }

                   product_html += '<tr id="product_' + product_id + '">' +
                            '<td id="barcodesel_'+product_id+'" name="barcode_sel[]">'+barcode+'</td>'+
                            '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                            '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                            '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                            '<input value="" type="hidden" id="return_product_id_'+product_id+'" name="return_product_id_[]" class="" >'+
                            '<input value="'+billvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" ></td>'+
                            '<td id="product_name_'+product_id+'" name="product_name[]">'+billvalue['product']['product_name']+'</td>';
                             product_html += feature_show_val;
                             product_html += batchhtml;
                             product_html += '<td id="sellingmrp_'+product_id+'" class="billing_calculation_case">'+'<input type="text" tabindex="-1" id="mrp_'+product_id+'" class="floating-input tarifform-control number" value="'+mrp+'" readonly>'+
                            '<input type="hidden" id="pricemasterid_'+product_id+'" tabindex="-1" name="pricemasterid[]"  value="'+billvalue['price_master_id']+'" >'+
                            '<input type="hidden" id="inwardids_'+product_id+'" name="inwardids[]"  value="'+tinwardids+'" >'+
                            '<input type="hidden" id="inwardqtys_'+product_id+'" name="inwardqtys[]"  value="'+tinwardqtys+'" >'+
                            '</td>'+
                            '<td id="sellingpricewgst_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+showsellingprice+'" readonly>'+
                            '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]" tabindex="-1"  value="'+sellingprice+'" >'+
                            '</td>'+                  
                            '<td id="sellingqty_'+product_id+'">'+
                            '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+qty+'" name="qty[]" onkeyup="return calqty(this);" >'+
                            '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="'+qty+'" name="oldqty[]">'+
                            '</td>'+       
                            '<td id="sellingdiscountper_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+billvalue['discount_percent']+'" name="proddiscper[]" onkeyup="return caldiscountper(this);" readonly>'+
                            '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overalldiscount_percent']+'" name="proddiscper[]" tabindex="-1" style="display:none;">'+'</td>'+
                            '<td id="sellingdiscountamt_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+totalmrpdiscount+'"  readonly>'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" tabindex="-1" value="'+totaldiscount+'" name="proddiscamt[]" onkeyup="return caldiscountamt(this);" readonly style="display:none;">'+
                            '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="'+proddiscountamt+'" tabindex="-1" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+mrpproddiscountamt+'" tabindex="-1" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                            '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                            '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                            '<td id="sprodgstper_'+product_id+'" style="text-align:right !important;display:none;">'+billvalue['igst_percent']+'</td>'+
                            '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important;display:none;">'+sgstamount+'</td>'+
                            '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                            '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

                            '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                            '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;" class="billing_calculation_case">'+stotal_amount+'</td>'+
                            '<td onclick="removerow(' + product_id + ');"><i class="fa fa-close"></i></td>' +
                            '</tr>';
                        }
                  }
    }


    $("#sproduct_detail_record").prepend(product_html);
    $('.loaderContainer').hide();
    $('#manualproductsearch').val('');
    if(Number(bill_calculation)==1)
     {
        $('.billing_calculation_case').show();
     }
     else
     {
        $('.billing_calculation_case').hide();
     }
    var srr = 0;
   $('.totqty').each(function(e){
        if($(this).val()!='')
        {
            srr++;
        }
   });
   $('.showtitems').show();
   $('.titems').html(srr);


    var discount_percent        =     $("#totaldiscount_percent").val(); 
             if(Number(discount_percent)==0 || discount_percent == '')
             {
                  totalcalculation();
             }
             else
             {

                var saleswithgst = 0;
                  $('.totalsellinggst').each(function (index,e){
                      if($(this).html()!="")
                      saleswithgst   +=   parseFloat($(this).html());                                                 
                     
                    });
                $("#sales_total").val(saleswithgst);
                //$("#discount_percent").val(discount_percent);
                 overalldiscountpercent();
             }   

    if(bill_data["Success"]=="False")
    {
        toastr.error(bill_data['Message']);
        $('.loaderContainer').hide();
    }


   });
}

//////////////////////////

function manualgetconsignproductdetail(product_id,sales_products_detail_id)
{


   //var columnid        =   columnid;
   var sales_bill_id   =   $('#consign_bill_id').val();
   var type = "POST";
   var url = 'manualconsignproduct_detail';
   var samerow  =  0;
   var dataType = "";
   var data = {
       "product_id" : product_id,
       "sales_products_detail_id":sales_products_detail_id,
       "sales_bill_id"    : sales_bill_id
   }
   callroute(url,type,dataType,data,function(data)
   {

        var bill_data = JSON.parse(data,true);


        if(bill_data['Success'] == "True")
        {
            var product_html = '';
            var billvalue  = bill_data['Data'][0];

            var product_id                  =   billvalue['price_master_id'];

            //console.log(billvalue);


                var samerow = 0;
                $("#sproduct_detail_record tr").each(function()
                {
                    var row_product_id = $(this).attr('id').split('_')[1];
                    if(row_product_id == product_id)
                    {
                         var qty    = $("#qty_"+product_id).val();
                         var oldqty = $("#oldqty_"+product_id).val();
                         var product_qty = ((Number(qty)) + (Number(1)));
                         if(Number(product_qty) >  Number(oldqty))
                         {
                                toastr.error("Entered Qty is Greater than Bill qty.");
                                samerow = 1;
                         }
                         else
                         {
                                 $("#qty_"+product_id).val(product_qty);
                                 samerow = 1;
                                 calqty($('#qty_'+product_id));
                         }
                         
                        
                         return false;
                    }
                });
              
              if(samerow == 0)
              {


                    var rinwardids      =     (billvalue['inwardids'].slice(0,-1)).split(',');
                    var rinwardqtys     =     (billvalue['inwardqtys'].slice(0,-1)).split(',');
                    var tinwardids      =      '';
                    var tinwardqtys     =      '';
                    var totiqty         =      '';
                    var totalreturnqty  =      '';

                                //console.log(billvalue['return_product_detail']);

                 if(billvalue['return_product_detail'] != 'undefined' && billvalue['return_product_detail'] != '')
                {               

                    $.each(rinwardids,function (ridkey,ridvalue)
                    {
                        
                            var totiqty         =      '';
                              $.each(billvalue['return_product_detail'],function (rbillkey,rbillvalue)
                              {
                                 
                                    
                                    var iids             =     (rbillvalue['inwardids'].slice(0,-1)).split(',');
                                    var iqtys            =     (rbillvalue['inwardqtys'].slice(0,-1)).split(',');
                                       
                                         
                                              
                                            $.each(iids,function (iidkey,iidvalue)
                                            {
                                                if(ridvalue == iidvalue)
                                                {
                                                    totiqty  =  Number(totiqty) + Number(iqtys[iidkey]);

                                                }
                                                
                                            })
                                            
                                           

                                           
                                })


                                  if(totiqty!='')
                                  {

                                      if(Number(rinwardqtys[ridkey]) != Number(totiqty))
                                      {
                                          
                                           tinwardids     +=     ridvalue+',';
                                           tinwardqtys    +=     (Number(rinwardqtys[ridkey])-Number(totiqty))+',';
                                      }
                                  }
                                  else
                                  {
                                           tinwardids      +=     ridvalue+',';
                                           tinwardqtys    +=     (Number(rinwardqtys[ridkey]))+',';
                                  }
                            
                           
                            
                       })
                 }

                else
                {
                     tinwardids     +=     billvalue['inwardids'];
                     tinwardqtys    +=     billvalue['inwardqtys'];
                 }

      
                       if(billvalue['qty']==(billvalue['totalreturnqty'] + billvalue['totalbillqty']))
                       {

                       }
                       else
                       {
                       
                                productcount =  1;
                                var qty                         =   billvalue['qty'] - billvalue['totalreturnqty'] - billvalue['totalbillqty'];

                                

                                var sellingprice                =   billvalue['sellingprice_before_discount'];
                                
                                var discount_percent            =   billvalue['discount_percent'];
                                var overalldiscount_percent     =   billvalue['overalldiscount_percent'];
                                var gst_percent                 =   billvalue['igst_percent'];
                                var totalmrpdiscount            =   (Number(billvalue['mrp']) * Number(qty)) * Number(discount_percent) / 100;

                                var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                                var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_percent) / 100).toFixed(4);

                                var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                                var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                                var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                                
                                var totalgst                     =      Number(gst_amount) * Number(qty);


                                var sellingwithgst               =      Number(discountedamt) + Number(totalgst);



                              var totalsellingwgst               =     discountedamt;
                          
                              var mrpproddiscountamt              =     ((Number(sellingwithgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
                              var proddiscountamt              =     ((Number(totalsellingwgst) * Number(overalldiscount_percent)) / 100).toFixed(4);

                              var totalproddiscountamt         =     Number(proddiscountamt)

                              var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                               
                                
                                var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                                
                               
                                var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
                                var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);




                                var showsellingprice              =   Number(billvalue['sellingprice_before_discount']).toFixed(2);
                                var showigst_amount               =   Number(billvalue['igst_amount']).toFixed(2);
                                var mrp                           =    Number(billvalue['mrp']).toFixed(2);
                                var total_amount                  =    Number(total_amount).toFixed(4);
                                var stotal_amount                  =    Number(total_amount).toFixed(2);

              // console.log(bill_data['Billtype']);
                  if(bill_data['Billtype']==3)
                  {
                    var batchhtml   =   '<td id="batchno_'+product_id+'">'+billvalue['batchprice_master']['batch_no']+'</td>';
                  } 
                  else
                  {
                    var batchhtml  = '';
                  }             
                
                    if(billvalue['product']['supplier_barcode']!='' && billvalue['product']['supplier_barcode']!=null)
                    {
                      var barcode     =     billvalue['product']['supplier_barcode'];
                    }
                    else
                    {
                      var barcode     =     billvalue['product']['product_system_barcode'];
                    }

                     var feature_show_val = "";
                            if(bill_show_dynamic_feature != '')
                            {
                                var feature = bill_show_dynamic_feature.split(',');

                                $.each(feature,function(fea_key,fea_val)
                                {
                                    var feature_name = '';                               

                                    if(typeof(billvalue['product'][fea_val]) != "undefined" && billvalue['product'][fea_val] !== null) {

                                        feature_name = billvalue['product'][fea_val];
                                        //console.log(feature_name);
                                    }

                                    feature_show_val += '<td>' + feature_name + '</td>';
                                })
                            }

                   product_html += '<tr id="product_' + product_id + '">' +
                            '<td id="barcodesel_'+product_id+'" name="barcode_sel[]">'+barcode+'</td>'+
                            '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                            '<input value="" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                            '<input value="'+billvalue['consign_products_detail_id']+'" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                            '<input value="" type="hidden" id="return_product_id_'+product_id+'" name="return_product_id_[]" class="" >'+
                            '<input value="'+billvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" ></td>'+
                            '<td id="product_name_'+product_id+'" name="product_name[]">'+billvalue['product']['product_name']+'</td>';
                             product_html += feature_show_val;
                             product_html += batchhtml;
                             product_html += '<td id="sellingmrp_'+product_id+'" class="billing_calculation_case">'+'<input type="text" tabindex="-1" id="mrp_'+product_id+'" class="floating-input tarifform-control number" value="'+mrp+'" readonly>'+
                            '<input type="hidden" id="pricemasterid_'+product_id+'" tabindex="-1" name="pricemasterid[]"  value="'+billvalue['price_master_id']+'" >'+
                            '<input type="hidden" id="inwardids_'+product_id+'" name="inwardids[]"  value="'+tinwardids+'" >'+
                            '<input type="hidden" id="inwardqtys_'+product_id+'" name="inwardqtys[]"  value="'+tinwardqtys+'" >'+
                            '</td>'+
                            '<td id="sellingpricewgst_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+showsellingprice+'" readonly>'+
                            '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]" tabindex="-1"  value="'+sellingprice+'" >'+
                            '</td>'+                  
                            '<td id="sellingqty_'+product_id+'">'+
                            '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+qty+'" name="qty[]" onkeyup="return calqty(this);" >'+
                            '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="'+qty+'" name="oldqty[]">'+
                            '</td>'+       
                            '<td id="sellingdiscountper_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+billvalue['discount_percent']+'" name="proddiscper[]" onkeyup="return caldiscountper(this);" readonly>'+
                            '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overalldiscount_percent']+'" name="proddiscper[]" tabindex="-1" style="display:none;">'+'</td>'+
                            '<td id="sellingdiscountamt_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+totalmrpdiscount+'"  readonly>'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" tabindex="-1" value="'+totaldiscount+'" name="proddiscamt[]" onkeyup="return caldiscountamt(this);" readonly style="display:none;">'+
                            '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="'+proddiscountamt+'" tabindex="-1" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+mrpproddiscountamt+'" tabindex="-1" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                            '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                            '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                            '<td id="sprodgstper_'+product_id+'" style="text-align:right !important;display:none;">'+billvalue['igst_percent']+'</td>'+
                            '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important;display:none;">'+sgstamount+'</td>'+
                            '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                            '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

                            '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                            '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;" class="billing_calculation_case">'+stotal_amount+'</td>'+
                            '<td onclick="removerow(' + product_id + ');"><i class="fa fa-close"></i></td>' +
                            '</tr>';
                        }
                  }
    }


    $("#sproduct_detail_record").prepend(product_html);
    $('.loaderContainer').hide();
    $('#manualproductsearch').val('');
    if(Number(bill_calculation)==1)
     {
        $('.billing_calculation_case').show();
     }
     else
     {
        $('.billing_calculation_case').hide();
     }
    var srr = 0;
   $('.totqty').each(function(e){
        if($(this).val()!='')
        {
            srr++;
        }
   });
   $('.showtitems').show();
   $('.titems').html(srr);


    var discount_percent        =     $("#totaldiscount_percent").val(); 
             if(Number(discount_percent)==0 || discount_percent == '')
             {
                  totalcalculation();
             }
             else
             {

                var saleswithgst = 0;
                  $('.totalsellinggst').each(function (index,e){
                      if($(this).html()!="")
                      saleswithgst   +=   parseFloat($(this).html());                                                 
                     
                    });
                $("#sales_total").val(saleswithgst);
                //$("#discount_percent").val(discount_percent);
                 overalldiscountpercent();
             }   

    if(bill_data["Success"]=="False")
    {
        toastr.error(bill_data['Message']);
        $('.loaderContainer').hide();
    }


   });
}

function returnproductdetail(product_id,batch_no,billreturn_type)
{

          $('#manualbill_no').attr('readonly', true);
      
               var type = "POST";
               var url = 'returnbillsecond_data';
               var dataType = "";
               var data = {
                   "product_id":product_id,
                   "batch_no":batch_no
               }
             callroute(url,type,dataType,data,function(data)
            {

                var bill_data = JSON.parse(data,true);

                $("#productdetails").html('');
                if(bill_data['Success'] == "True")
                {
                   
                    $('#searchbilldata').prop('disabled', true);
                    $("#addreturnpopup").modal('show');

                    var bill_details    =   bill_data['Data'];

                    
                    var bill_html = '';
                    var tblclass = '';

               

                    $.each(bill_details,function (billkey,billvalue)
                     {
                         if(billvalue['customer']!= null && billvalue['customer']!= '' && billvalue['customer']['customer_name']!= null && billvalue['customer']['customer_name']!= undefined)
                          {
                                    customer_name  =  billvalue['customer']['customer_name'];
                          }
                          else
                          {
                                customer_name  =  '';
                          }
                          var taxablevalue   =   billvalue['total_bill_amount'] - billvalue['total_cgst_amount'] -billvalue['total_sgst_amount'];
                          taxablevalue       =   Number(taxablevalue).toFixed(2);
                          var totalcgst      =   Number(billvalue['total_cgst_amount']).toFixed(2);
                          var totalsgst      =   Number(billvalue['total_sgst_amount']).toFixed(2);
                          var totaligst      =   Number(billvalue['total_igst_amount']).toFixed(2);
                          var billamount     =   Number(billvalue['total_bill_amount']).toFixed(0);

                         
                        var sr  =  billkey +1;
                        var taxhtml = '';

                        if(Number(tax_type)==1)
                        {
                             taxhtml = '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+totaligst+'</td>';
                            
                        }
                        else
                        {
                           taxhtml  =  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+totalcgst+'</td>'+
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+totalsgst+'</td>';
                        }
                       

                        bill_html +=  '<tr class="'+tblclass+'" style="border-top:1px solid #C0C0C0 !important;">'+
                                  '<td style="font-size:13px !important;" class="leftAlign"><button id="returnbillno_'+billvalue['sales_bill_id']+'" onclick="return popreturndata(this);" class="btn btn-primary" style="color:#fff;padding: .15rem .35rem;line-height:1.3 !important;"><i class="fa fa-check" style="margin:0 !important;"></i> Select</button>'+
                                  '<input type="hidden" value="'+billvalue['sales_bill_id']+'" id="rbillno_'+billvalue['sales_bill_id']+'">'+'</td>'+                                 
                                  '<td style="font-size:13px !important;font-weight:bold !important;" class="leftAlign"><span style="cursor:pointer;">'+billvalue['bill_no']+'</span></td>'+
                                  '<td style="font-size:13px !important;" class="leftAlign">'+billvalue['bill_date']+'</td>'+
                                  '<td style="font-size:13px !important;" class="leftAlign">'+customer_name+'</td>'+
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;">'+billvalue['total_qty']+'</td>'+
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+taxablevalue+'</td>'+taxhtml+                                  
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+billamount+'</td>'+
                                  '<td style="text-align:center !important;"><span id="down_'+billvalue['sales_bill_id']+'" onclick="return showdetails(this);" style="font-weight:bold;font-size:14px;color:#28a745 !important;">Show</span><span id="up_'+billvalue['sales_bill_id']+'" onclick="return hidedetails(this);" style="font-weight:bold;font-size:14px;color:#f00 !important;display:none;">Hide</span></td>'+
                                '</tr>';

                                var headinghtml = '';

                                if(Number(tax_type)==1)
                                {
                                     headinghtml = '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>'+tax_title+' Amt.</b></th>';
                                }
                                else
                                {
                                    headinghtml  =  '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>CGST Amt.</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>SGST Amt.</b></th>';
                                   
                                }

                          bill_html +=  '<tr id="show_'+billvalue['sales_bill_id']+'" style="display:none;">'+
                                '<td colspan="10">'+
                                    '<table class="table table-striped mb-0" style="width:100%;">'+
                                        '<thead>'+
                                            '<tr>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;"><b>Barcode</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;"><b>Product Name</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;"><b>Qty</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>Taxable Value</b></th>'+headinghtml+   
                                                '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>Bill Amount</b></th>'+
                                            '</tr>'+
                                            '</thead>'+
                                            '<tbody id="showproductdetails">'
                                            
                                            $.each(billvalue['sales_product_detail'],function (billpkey,billpvalue)
                                            {
                                                  var ptax    =    Number(billpvalue['sellingprice_afteroverall_discount']).toFixed(2);
                                                  var pcgst   =    Number(billpvalue['cgst_amount']).toFixed(2);
                                                  var psgst   =    Number(billpvalue['sgst_amount']).toFixed(2);
                                                  var pigst   =    Number(billpvalue['igst_amount']).toFixed(2);
                                                  var pamount =    Number(billpvalue['total_amount']).toFixed(2);

                                                if (billpkey % 2 == 0) {
                                                    tblclass = 'even';
                                                } else {
                                                    tblclass = 'odd';
                                                }
                                                var ptaxhtml = '';

                                                if(Number(tax_type)==1)
                                                {
                                                     ptaxhtml = '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+pigst+'</td>';
                                                }
                                                else
                                                {
                                                    ptaxhtml  =  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+pcgst+'</td>'+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+psgst+'</td>';
                                                   
                                                }

                                                bill_html +=  '<tr style="border-bottom:0px solid #C0C0C0 !important;">'+
                                                  '<td style="font-size:13px !important;" class="leftAlign">'+billpvalue['product']['product_system_barcode']+'</td>'+
                                                  '<td style="font-size:13px !important;font-weight:bold !important;" class="leftAlign">'+billpvalue['product']['product_name']+'</td>'+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;">'+billpvalue['qty']+'</td>'+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+ptax+'</td>'+ptaxhtml+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+pamount+'</td>'+
                                                '</tr>';
                                            });


                                            bill_html +=  '</tbody>'+
                                            '</table>'+
                                        '</tr>';                                        
                    });

                   

                }

                 else
                    {
                       
                        var bill_html = '';
                           $("#addreturnpopup").modal('show');
                            bill_html +=  '<tr class="'+tblclass+'" style="border-top:1px solid #C0C0C0 !important;">'+
                                  '<td style="font-size:13px !important;" class="leftAlign" colspan="10"><b style="color:#f00;">This Item is not sold within '+bill_data['ReturnDays']+' Days</b></td>'+
                                '</tr>';
                            $("#searchbilldata").prop('disabled', false);
                            $('.loaderContainer').hide();
                           

                    }
                    $("#productdetails").prepend(bill_html);
                    
                    if(Number(bill_calculation)==1)
                     {
                        $('.billing_calculation_case').show();
                     }
                     else
                     {
                        $('.billing_calculation_case').hide();
                     }
                 
           });
            $('.loaderContainer').hide();

       
   

}
function returnconsignproductdetail(product_id,batch_no,billreturn_type)
{

          $('#manualbill_no').attr('readonly', true);
      
               var type = "POST";
               var url = 'returnconsignbillsecond_data';
               var dataType = "";
               var data = {
                   "product_id":product_id,
                   "batch_no":batch_no
               }
             callroute(url,type,dataType,data,function(data)
            {

                var bill_data = JSON.parse(data,true);

                $("#productdetails").html('');
                if(bill_data['Success'] == "True")
                {
                   
                    $('#searchbilldata').prop('disabled', true);
                    $("#addreturnpopup").modal('show');

                    var bill_details    =   bill_data['Data'];

                    
                    var bill_html = '';
                    var tblclass = '';

               

                    $.each(bill_details,function (billkey,billvalue)
                     {
                         if(billvalue['customer']!= null && billvalue['customer']!= '' && billvalue['customer']['customer_name']!= null && billvalue['customer']['customer_name']!= undefined)
                          {
                                    customer_name  =  billvalue['customer']['customer_name'];
                          }
                          else
                          {
                                customer_name  =  '';
                          }
                          var taxablevalue   =   billvalue['total_bill_amount'] - billvalue['total_cgst_amount'] -billvalue['total_sgst_amount'];
                          taxablevalue       =   Number(taxablevalue).toFixed(2);
                          var totalcgst      =   Number(billvalue['total_cgst_amount']).toFixed(2);
                          var totalsgst      =   Number(billvalue['total_sgst_amount']).toFixed(2);
                          var totaligst      =   Number(billvalue['total_igst_amount']).toFixed(2);
                          var billamount     =   Number(billvalue['total_bill_amount']).toFixed(0);

                         
                        var sr  =  billkey +1;
                        var taxhtml = '';

                        if(Number(tax_type)==1)
                        {
                             taxhtml = '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+totaligst+'</td>';
                            
                        }
                        else
                        {
                           taxhtml  =  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+totalcgst+'</td>'+
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+totalsgst+'</td>';
                        }
                       

                        bill_html +=  '<tr class="'+tblclass+'" style="border-top:1px solid #C0C0C0 !important;">'+
                                  '<td style="font-size:13px !important;" class="leftAlign"><button id="returnbillno_'+billvalue['consign_bill_id']+'" onclick="return consignpopreturndata(this);" class="btn btn-primary" style="color:#fff;padding: .15rem .35rem;line-height:1.3 !important;"><i class="fa fa-check" style="margin:0 !important;"></i> Select</button>'+
                                  '<input type="hidden" value="'+billvalue['consign_bill_id']+'" id="rbillno_'+billvalue['consign_bill_id']+'">'+'</td>'+                                 
                                  '<td style="font-size:13px !important;font-weight:bold !important;" class="leftAlign"><span style="cursor:pointer;">'+billvalue['bill_no']+'</span></td>'+
                                  '<td style="font-size:13px !important;" class="leftAlign">'+billvalue['bill_date']+'</td>'+
                                  '<td style="font-size:13px !important;" class="leftAlign">'+customer_name+'</td>'+
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;">'+billvalue['total_qty']+'</td>'+
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+taxablevalue+'</td>'+taxhtml+                                  
                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+billamount+'</td>'+
                                  '<td style="text-align:center !important;"><span id="down_'+billvalue['consign_bill_id']+'" onclick="return showdetails(this);" style="font-weight:bold;font-size:14px;color:#28a745 !important;">Show</span><span id="up_'+billvalue['consign_bill_id']+'" onclick="return hidedetails(this);" style="font-weight:bold;font-size:14px;color:#f00 !important;display:none;">Hide</span></td>'+
                                '</tr>';

                                var headinghtml = '';

                                if(Number(tax_type)==1)
                                {
                                     headinghtml = '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>'+tax_title+' Amt.</b></th>';
                                }
                                else
                                {
                                    headinghtml  =  '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>CGST Amt.</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>SGST Amt.</b></th>';
                                   
                                }

                          bill_html +=  '<tr id="show_'+billvalue['consign_bill_id']+'" style="display:none;">'+
                                '<td colspan="10">'+
                                    '<table class="table table-striped mb-0" style="width:100%;">'+
                                        '<thead>'+
                                            '<tr>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;"><b>Barcode</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;"><b>Product Name</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;"><b>Qty</b></th>'+
                                                '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>Taxable Value</b></th>'+headinghtml+   
                                                '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class="billing_calculation_case"><b>Bill Amount</b></th>'+
                                            '</tr>'+
                                            '</thead>'+
                                            '<tbody id="showproductdetails">'
                                            
                                            $.each(billvalue['consign_products_detail'],function (billpkey,billpvalue)
                                            {
                                                  var ptax    =    Number(billpvalue['sellingprice_afteroverall_discount']).toFixed(2);
                                                  var pcgst   =    Number(billpvalue['cgst_amount']).toFixed(2);
                                                  var psgst   =    Number(billpvalue['sgst_amount']).toFixed(2);
                                                  var pigst   =    Number(billpvalue['igst_amount']).toFixed(2);
                                                  var pamount =    Number(billpvalue['total_amount']).toFixed(2);

                                                if (billpkey % 2 == 0) {
                                                    tblclass = 'even';
                                                } else {
                                                    tblclass = 'odd';
                                                }
                                                var ptaxhtml = '';

                                                if(Number(tax_type)==1)
                                                {
                                                     ptaxhtml = '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+pigst+'</td>';
                                                }
                                                else
                                                {
                                                    ptaxhtml  =  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+pcgst+'</td>'+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+psgst+'</td>';
                                                   
                                                }

                                                bill_html +=  '<tr style="border-bottom:0px solid #C0C0C0 !important;">'+
                                                  '<td style="font-size:13px !important;" class="leftAlign">'+billpvalue['product']['product_system_barcode']+'</td>'+
                                                  '<td style="font-size:13px !important;font-weight:bold !important;" class="leftAlign">'+billpvalue['product']['product_name']+'</td>'+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;">'+billpvalue['qty']+'</td>'+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+ptax+'</td>'+ptaxhtml+
                                                  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class="billing_calculation_case">'+pamount+'</td>'+
                                                '</tr>';
                                            });


                                            bill_html +=  '</tbody>'+
                                            '</table>'+
                                        '</tr>';                                        
                    });

                   

                }

                 else
                    {
                       
                        var bill_html = '';
                           $("#addreturnpopup").modal('show');
                            bill_html +=  '<tr class="'+tblclass+'" style="border-top:1px solid #C0C0C0 !important;">'+
                                  '<td style="font-size:13px !important;" class="leftAlign" colspan="10"><b style="color:#f00;">This Item is not sold within '+bill_data['ReturnDays']+' Days</b></td>'+
                                '</tr>';
                            $("#searchbilldata").prop('disabled', false);
                            $('.loaderContainer').hide();
                           

                    }
                    $("#productdetails").prepend(bill_html);
                    
                    if(Number(bill_calculation)==1)
                     {
                        $('.billing_calculation_case').show();
                     }
                     else
                     {
                        $('.billing_calculation_case').hide();
                     }
                 
           });
            $('.loaderContainer').hide();

       
   

}
function removerow(productid)
{
    $("#product_"+productid).remove();
    var discount_percent        =     $("#discount_percent").val(); 
             if(Number(discount_percent)==0 || discount_percent == '')
             {
                  totalcalculation();
             }
             else
             {
                totalcalculation();
                totalcharges();
                var sales_total           =           $('#sales_total').val();
                var discount_amount       =           (Number(sales_total) * Number(discount_percent)) / 100;
                $("#discount_amount").val(discount_amount);
                // var cotcharges            =           $('#charges_total').val();
                // var cgrandtotal           =           Number(cotcharges)  + Number(sales_total);

                // var saleswithgst = 0;
                // $('.totalsellinggst').each(function (index,e){
                //       if($(this).html()!="")
                //       saleswithgst   +=   parseFloat($(this).html());                                                 
                     
                // });
                // $("#sales_total").val(saleswithgst);
                // $("#discount_percent").val(discount_percent);
                //  overalldiscountpercent();
             }   

          var srr = 0;
       $('.totqty').each(function(e){
            if($(this).val()!='')
            {
                srr++;
            }
       });
       $('.showtitems').show();
       $('.titems').html(srr);   

}


function calqty(obj)
{
 
    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('qty_')[1];
    var qty                       =     $('#qty_'+product_id).val();
    var oldqty                    =     $('#oldqty_'+product_id).val();
    var stock                     =     $('#stock_'+product_id).html();

   

    if(Number(qty)>Number(oldqty))
    {
        toastr.error("Qty cannot be greater than Purchased Qty");
        $('#qty_'+product_id).val(oldqty);
        var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
        
        var gst_per                   =     $("#sprodgstper_"+product_id).html();
        var discount_percent          =     $("#proddiscper_"+product_id).val();
        var mrp                       =     $("#mrp_"+product_id).val();

          
        var totalmrpdiscount             =     (Number(mrp) * Number(oldqty)) * Number(discount_percent) / 100;

          
     
        var totalsellingwgst             =     Number(sellingprice) * Number(oldqty);
        var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
        var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

        var totaldiscount                =      Number(sellingdiscount) * Number(oldqty);

        var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);


        var mrp                          =     Number(totaldiscount) + Number(gst_amount);
        
        var totalgst                     =      Number(gst_amount) * Number(oldqty);


        var sellingwithgst                =      Number(discountedamt) + Number(totalgst);


        var total_amount                 =     Number(discountedamt) + Number(totalgst);
       
         
         $("#totalsellingwgst_"+product_id).html(discountedamt.toFixed(4));
         
         $("#totalsellinggst_"+product_id).html(sellingwithgst.toFixed(4));
         $("#mrpproddiscamt_"+product_id).val(totalmrpdiscount.toFixed(4));
         $("#proddiscamt_"+product_id).val(totaldiscount.toFixed(4));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#totalamount_"+product_id).html(total_amount.toFixed(4));

         $("#sprodgstamt_"+product_id).html(totalgst.toFixed(2));
         $("#stotalamount_"+product_id).html(total_amount.toFixed(2));

           var discount_percent        =     $("#totaldiscount_percent").val(); 
             if(Number(discount_percent)==0 || discount_percent == '')
             {
                  totalcalculation();
             }
             else
             {

                var saleswithgst = 0;
                  $('.totalsellinggst').each(function (index,e){
                      if($(this).html()!="")
                      saleswithgst   +=   parseFloat($(this).html());                                                 
                     
                    });
                $("#sales_total").val(saleswithgst);
                //$("#discount_percent").val(discount_percent);
                 overalldiscountpercent();
             }   

    }
    else
    {
        var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
        var qty                       =     $("#qty_"+product_id).val();
        var gst_per                   =     $("#sprodgstper_"+product_id).html();
        var discount_percent          =     $("#proddiscper_"+product_id).val();
        var mrp                       =     $("#mrp_"+product_id).val();

          
        var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;
         
     
        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
        var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
        var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

        var totaldiscount                =      Number(sellingdiscount) * Number(qty);

        var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

        var mrp                          =     Number(totaldiscount) + Number(gst_amount);
        
        var totalgst                     =      Number(gst_amount) * Number(qty);


        var sellingwithgst                =      Number(discountedamt) + Number(totalgst);


        var total_amount                 =     Number(discountedamt) + Number(totalgst);
        //console.log(discountedamt);

        
         $("#totalsellingwgst_"+product_id).html(discountedamt.toFixed(4));
         
         $("#totalsellinggst_"+product_id).html(sellingwithgst.toFixed(4));
         $("#mrpproddiscamt_"+product_id).val(totalmrpdiscount.toFixed(4));
         $("#proddiscamt_"+product_id).val(totaldiscount.toFixed(4));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#totalamount_"+product_id).html(total_amount.toFixed(4));

         $("#sprodgstamt_"+product_id).html(totalgst.toFixed(2));
         $("#stotalamount_"+product_id).html(total_amount.toFixed(2));

          var discount_percent        =     $("#totaldiscount_percent").val(); 
             if(Number(discount_percent)==0 || discount_percent == '')
             {
                  totalcalculation();
             }
             else
             {

                var saleswithgst = 0;
                  $('.totalsellinggst').each(function (index,e){
                      if($(this).html()!="")
                      saleswithgst   +=   parseFloat($(this).html());                                                 
                     
                    });
                $("#sales_total").val(saleswithgst);
                //$("#discount_percent").val(discount_percent);
                 overalldiscountpercent();
             }  
     }
}


//search customer details
$("#searchcustomer").keyup(function ()
{
    
    jQuery.noConflict();
    if($("#searchcustomer").val().length >= 1) {

        $("#searchcustomer").autocomplete({
            autoFocus: true,
            minLength: 1,
            source: function (request, response) {
                var url = "customer_search";
                var type = "POST";
                var dataType = "";
                var data = {
                    'search_val': $("#searchcustomer").val()
                };
                callroute(url, type,dataType, data, function (data) {


                    var searchdata = JSON.parse(data, true);
                    var html = '';
                    if (searchdata['Success'] == "True") {

                        var result = [];
                        searchdata['Data'].forEach(function (value) {
                            result.push({
                                label: value.customer_name + '_' + value.customer_last_name + '_' + value.customer_mobile,
                                value: value.customer_name + '_' + value.customer_last_name + '_' + value.customer_mobile,
                                id: value.customer_id
                            });
                        });

                        //push data into result array.and this array used for display suggetion
                        response(result);

                    }
                });
            },
            //this help to call a function when select search suggetion
            select: function (event, ui) {
                var id = ui.item.id;
                //call a getproductdetail function for getting product detail based on selected product from suggetion
                $('#customer_id').val(id);
                getcustomerdetail(id);
                $('.customerdata').show();

            }
        });
    }
    else
    {
            $("#searchcustomer").empty();
    }

});
function getcustomerdetail(customerid)
{
  
  
   var type = "POST";
   var url = 'customer_detail';
   var dataType = "";
   var data = {
       "customer_id" : customerid
       
   }

   callroute(url,type,dataType,data,function(data)
   {
        var customer_data = JSON.parse(data,true);

        
        if(customer_data['Success'] == "True")
        {
            var customer_html = '';
            var customer_data  = customer_data['Data'][0];

             $("#ccustomer_id").val(customer_data['customer_id']);
             $("#customer_name").val(customer_data['customer_name']);
             $("#customer_mobile").val(customer_data['customer_mobile']);
             $("#customer_email").val(customer_data['customer_email']);
             $("#customer_gstin").val(customer_data['customer_address_detail']['customer_gstin']);
             $("#customer_address").val(customer_data['customer_address_detail']['customer_address']);
             $("#customer_state_id").val(customer_data['customer_address_detail']['state_id']);
             
        }

        $("#searchcustomer").val('');
        $(".odd").hide();
        
   });
}
$("#customer_gstin").keyup(function ()
{
    var gst_state_code = $("#customer_gstin").val().substr(0,2);

    if(gst_state_code.length != 0)
    {
        $("#pstate_id").attr('disabled',true);
        $("#pstate_id").css('color','black');
        if(gst_state_code.startsWith('0'))
        {
            gst_state_code = gst_state_code.substring(1);
        }
        $("#pstate_id").val(gst_state_code);
    }
    else
    {
        $("#pstate_id").removeAttr('disabled',false);
        $("#pstate_id").val('0');
    }

});
$("#pcustomer_gstin").keyup(function ()
{
    var gst_state_code = $("#pcustomer_gstin").val().substr(0,2);

    if(gst_state_code.length != 0)
    {
        $("#pstate_id").attr('disabled',true);
        $("#pstate_id").css('color','black');
        if(gst_state_code.startsWith('0'))
        {
            gst_state_code = gst_state_code.substring(1);
        }
        $("#pstate_id").val(gst_state_code);
    }
    else
    {
        $("#pstate_id").removeAttr('disabled',false);
        $("#pstate_id").val('0');
    }

});

function overalldiscountpercent()
{
      var totaldiscount_percent             =   $('#totaldiscount_percent').val();
      var mrpdiscount_percent               =   $('#discount_percent').val();
      var rcolumn                           =   '';

      var sales_total                       =   $('#sales_total').val();
      var totalcustomer_points_percent      =   $('.customer_points_percent').html();
      var actualcustomer_points_percent     =   $('.actualcustomer_points_percent').html();
      var referral_points_percent           =   $('#referral_points_percent').val();
      var customerbalused_points            =   $('#customerbalused_points').val();



      var balreferralpercent                =   Number(totalcustomer_points_percent)  -  Number(actualcustomer_points_percent);
      var calculatecustomerbalused_points   =   Number(sales_total) * Number(balreferralpercent) / 100;

      $('#customerbalused_points').val(Number(calculatecustomerbalused_points).toFixed(4));




      var customerdiscount            =   Number(sales_total) * Number(totalcustomer_points_percent) /100;
      $('#customer_points').val(Number(customerdiscount).toFixed(4));
      

      var salesafterreferral          =   Number(sales_total) - Number(customerdiscount);

      var discount_percent            =    Number(totaldiscount_percent);
      var discount_amount             =    (Number(salesafterreferral) * Number(mrpdiscount_percent)) / 100;
      console.log(mrpdiscount_percent);
      
       var rowcount  = 0;
      $('#discount_amount').val(discount_amount.toFixed(4));

      $("#sproduct_detail_record").each(function (index,e)
        {
           
             $(this).find('tr').each(function ()
             {
                if($(this).attr('id') != undefined)
                {
                    rcolumn = $(this).attr('id').split('product_')[1];
                    
                 }    
                  

                  if(($("#productsearch_"+rcolumn).val())!='')
                  {
                     
                      rowcount++;
                     $("#overalldiscper_"+rcolumn).val(discount_percent);
                      var qty                         =     $("#qty_"+rcolumn).val();
                    
                      var totalsellingwgst             =     $("#totalsellingwgst_"+rcolumn).html();
                      var totalmrpgst                  =     $("#totalsellinggst_"+rcolumn).html();
                      
                      var gst_percent                  =     $("#prodgstper_"+rcolumn).html();
                      var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                      var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                      var totalproddiscountamt         =     Number(proddiscountamt)

                      var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                       
                        
                        var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                        
                        var halfgstamount                =     Number(gst_amount)/2;
                        var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
                        var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);
                       

                         $("#overallmrpdiscamt_"+rcolumn).val(prodmrpdiscountamt);
                         $("#overalldiscamt_"+rcolumn).val(totalproddiscountamt.toFixed(4));
                         $("#tsellingaftergst_"+rcolumn).html(total_amount.toFixed(4));
                         //$("#prodgstper_"+rcolumn).html(gst_percent);
                         $("#prodgstamt_"+rcolumn).html(gst_amount);
                         $("#totalamount_"+rcolumn).html(total_amount.toFixed(4));
                        //$("#sprodgstper_"+rcolumn).html(Number(gst_percent).toFixed(2));
                         $("#sprodgstamt_"+rcolumn).html(sgstamount);
                         $("#stotalamount_"+rcolumn).html(total_amount.toFixed(2));
                       
                        totalcalculation();
                              
                  

                  }



             });
               if(Number(rowcount)==0)
              {
                  totalcalculation();
              }

          


        });


                      // var sales_total           =           $('#sales_total').val();
                      
                      // var discount_amount       =           (Number(sales_total) * Number(discount_percent)) / 100;
                      // $('#discount_amount').val(discount_amount.toFixed(4));

}
function overalldiscountamount()
{
    var discount_amount        =   $('#discount_amount').val();
    var rcolumn       = '';

      $("#sproduct_detail_record").each(function (index,e)
        {
           
             $(this).find('tr').each(function ()
             {
                if($(this).attr('id') != undefined)
                {
                    rcolumn = $(this).attr('id').split('product_')[1];
                    
                }
                
                var sales_total           =           $('#sales_total').val();
                var discount_percent      =           ((Number(discount_amount) / Number(sales_total)) * 100);
                
                $('#discount_percent').val(discount_percent.toFixed(4));

                if(($("#productsearch_"+rcolumn).val())!='')
                  {
                      

                     $("#overalldiscper_"+rcolumn).val(discount_percent);
                      var qty                         =     $("#qty_"+rcolumn).val();
                    
                      var totalsellingwgst             =     $("#totalsellingwgst_"+rcolumn).html();
                      var totalmrpgst                  =     $("#totalsellinggst_"+rcolumn).html();

                      var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                      
                      var gst_percent                  =     $("#prodgstper_"+rcolumn).html();
                      var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                      var totalproddiscountamt         =     Number(proddiscountamt)

                      var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                       
                        
                        var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                        
                        var halfgstamount                =     Number(gst_amount)/2;
                        var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
                        var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);
                       

                         $("#overallmrpdiscamt_"+rcolumn).val(prodmrpdiscountamt);
                         $("#overalldiscamt_"+rcolumn).val(totalproddiscountamt.toFixed(4));
                         $("#tsellingaftergst_"+rcolumn).html(total_amount.toFixed(4));
                         //$("#prodgstper_"+rcolumn).html(gst_percent);
                         $("#prodgstamt_"+rcolumn).html(gst_amount);
                         $("#totalamount_"+rcolumn).html(total_amount.toFixed(4));
                        //$("#sprodgstper_"+rcolumn).html(Number(gst_percent).toFixed(2));
                         $("#sprodgstamt_"+rcolumn).html(sgstamount);
                         $("#stotalamount_"+rcolumn).html(total_amount.toFixed(2));
                       
                        totalcalculation();
                              
                  

                  }

             });

          


        });

}



function totalcalculation()
{
    var sales_total = 0;
    var totalgst=0;
    var saleswithoutgst = 0;
    var saleswithoutdiscount =0;
    var salesdiscount =0;
    var roomwisediscount =0;
    var saleswithgst =0;
    var prodwisediscount = 0;
    var totalqty = 0;
    var cotcharges = 0;

    var cashcreditreturn   =   $('input[name=cashcreditreturn]:checked').val();


    
    $('.totalsellinggst').each(function (index,e){
      if($(this).html()!="")
      saleswithgst   +=   parseFloat($(this).html());
     
     
    });
     $('.pproddiscamt').each(function (index,e){
      if($(this).val()!="")
      prodwisediscount   +=   parseFloat($(this).val());
     
     
    });
    

     $('.totalsellingwgst').each(function (index,e){
      if($(this).html()!="")
      saleswithoutgst   +=   parseFloat($(this).html());
     
     
    });
    $('.overallpproddiscamt').each(function (index,e){
      if($(this).val()!="")
      roomwisediscount   +=   parseFloat($(this).val());
     
     
    });


    $('.tsellingaftergst').each(function (index,e){
      if($(this).html()!="")
      sales_total   +=   parseFloat($(this).html());
     
     
    });
    $('.totalgstamt').each(function (index,e){
      if($(this).html()!="")
      totalgst   +=   parseFloat($(this).html());
      
    
    });

    $('.totqty').each(function (index,e){
      if($(this).val()!="")
      totalqty   +=   parseFloat($(this).val());
      
    
    });
    
    totalcharges();

    cotcharges     =    $('#charges_total').val();
    var cgrandtotal   =    Number(cotcharges)  + Number(sales_total);
   

   
    var partialgst          =   Number(totalgst)/2;

    $('#overallqty').val(totalqty);    
    $('#prodwise_discountamt').val(prodwisediscount.toFixed(2));
    $('#totalwithout_gst').val(saleswithoutgst.toFixed(4));
    $('#roomwisediscount_amount').val(roomwisediscount.toFixed(4));
    $('#total_cgst').val(partialgst.toFixed(4));
    $('#total_sgst').val(partialgst.toFixed(4));
    $('#total_igst').val(totalgst.toFixed(4));
    $('#sales_total').val(saleswithgst.toFixed(4));
    
    $('#grand_total').val(sales_total.toFixed(4));

    $('#showtotalwithout_gst').val(saleswithoutgst.toFixed(2));
    $('#showtotal_cgst').val(partialgst.toFixed(2));
    $('#showtotal_sgst').val(partialgst.toFixed(2));
    $('#showsales_total').val(saleswithgst.toFixed(2));
    
    $('#showgrand_total').val(sales_total.toFixed(2));
    $('#ggrand_total').val(Number(cgrandtotal).toFixed(decimal_points));
    $('#sggrand_total').val(Number(cgrandtotal).toFixed(decimal_points));

    if(Number(cashcreditreturn)==1)
    {
       $('#cash').val(Number(cgrandtotal).toFixed(decimal_points));
       $('#credit_note').val('');
    }
    else
    {
        $('#credit_note').val(Number(cgrandtotal).toFixed(decimal_points));
        $('#cash').val('');
    }
    
    sales_total   =  sales_total.toFixed(decimal_points);

    
   
}

function taddcharges(obj)
{
    var id                        =     $(obj).attr('id');
    var charges_id                =     $(obj).attr('id').split('creturntotalamount_')[1];

    var tchargesamt                =     $('#creturntotalamount_'+charges_id).val();
    var oldcharges                 =     $('#oldchargesamt_'+charges_id).val();
    var maxgst                     =      $('#csprodgstper_'+charges_id).html();

    if(Number(tchargesamt)>Number(oldcharges))
    {
        toastr.error("Return Charges Amt. Cannot be Greater than the Previous Charges Amt.");
        $('#creturntotalamount_'+charges_id).val(Number(oldcharges));
            var cprodgstamt     =   (Number(oldcharges)/(Number(maxgst)+100))   * Number(maxgst);
            var chargesamt      =    Number(oldcharges) - Number(cprodgstamt);

            $('#csprodgstamt_'+charges_id).html(Number(cprodgstamt).toFixed(2));
            $('#cprodgstamt_'+charges_id).html(Number(cprodgstamt).toFixed(4));

            $('#ctotalamount_'+charges_id).html(Number(oldcharges).toFixed(4));
            $('#cstotalamount_'+charges_id).html(Number(oldcharges).toFixed(2));
            $('#chargesamt_'+charges_id).val(Number(chargesamt).toFixed(4));
            totalcharges();
    }
    else
    {
        $('#creturntotalamount_'+charges_id).val(Number(tchargesamt));
         var cprodgstamt     =   (Number(tchargesamt)/(Number(maxgst)+100))   * Number(maxgst);
        var chargesamt      =    Number(tchargesamt) - Number(cprodgstamt);

        $('#csprodgstamt_'+charges_id).html(Number(cprodgstamt).toFixed(2));
        $('#cprodgstamt_'+charges_id).html(Number(cprodgstamt).toFixed(4));

        $('#ctotalamount_'+charges_id).html(Number(tchargesamt).toFixed(4));
        $('#cstotalamount_'+charges_id).html(Number(tchargesamt).toFixed(2));
        $('#chargesamt_'+charges_id).val(Number(chargesamt).toFixed(4));
        totalcharges();
    }
   
   

}


function totalcharges()
{
    var totcharges = 0;
   
    
    $('.chargesamt').each(function (index,e){
      if($(this).val()!="")
      totcharges   +=   parseFloat($(this).val());
     
    });

    $('#scharges_total').val(Number(totcharges).toFixed(2));
    $('#charges_total').val(Number(totcharges).toFixed(4));

     var grand_total     =   $('#grand_total').val();
     var totgrand_total  =   Number(grand_total) + Number(totcharges);
     $('#ggrand_total').val(Number(totgrand_total).toFixed(decimal_points));
    $('#sggrand_total').val(Number(totgrand_total).toFixed(decimal_points));
    

}

$('#customer_name,#customer_mobile,#customer_email').change(function(e){
    toastr.success("Kindly Save your Customer Details!");
    $("#addcustomerpopup").modal('show');   
      var cusname       =     $('#customer_name').val();
      var cusmobile     =     $('#customer_mobile').val();
      var cusemail      =     $('#customer_email').val();
      var customerid    =     $('#ccustomer_id').val();

   

      $('#pcustomer_name').val(cusname);
      $('#pcustomer_mobile').val(cusmobile);
      $('#pcustomer_email').val(cusemail);
      
      $('#pcustomer_id').val(customerid);

      $('#pcustomer_name').focus();   
});

$("#addcustomer").click(function () {
      $("#addcustomerpopup").modal('show');   
      var cusname       =     $('#customer_name').val();
      var cusmobile     =     $('#customer_mobile').val();
      var cusemail      =     $('#customer_email').val();
      
      var customerid    =     $('#ccustomer_id').val();
     
    

      $('#pcustomer_name').val(cusname);
      $('#pcustomer_mobile').val(cusmobile);
      $('#pcustomer_email').val(cusemail);
     
      $('#pcustomer_id').val(customerid);

      $('#pcustomer_name').focus();
});
   


function validate_customerform(frmid)
{
    var error = 0;


   
    if($("#pcustomer_name").val() == '')
    {
        error = 1;
        toastr.error("Enter Customer Name!");
        return false;
    }
    
   if($("#pcustomer_mobile").val() == '')
    {
        error = 1;
        toastr.error("Enter Customer mobile No.!");
        return false;
    }
    if($("#pcustomer_email").val() != '')
    {
        var emailid = $("#pcustomer_email").val();
        if(validateEmail(emailid) == 0)
        {
            error = 1;
            toastr.error("Enter proper Customer Email id!");
            return false;
        }
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

$("#savecustomer").click(function ()
{
    var customer_address_data = [];
    $("#repeat_address .row").each(function ()
           {
                var row_id = $(this).attr('id');
                   
               var customer_address = {};
               $(this).find('input,select,hidden').each(function ()
               {
                   var id = $(this).attr('id');
                   var value_customer = '';
                   if(id == 'customer_office_state_id')
                   {
                        value_customer = $('#'+row_id+' #customer_office_state_id :selected').val();
                  
                       customer_address[id] = value_customer;
                   }
                   else
                   {
                        value_customer = $("#"+row_id+" #"+id).val();

                       customer_address[id] = value_customer;
                   }
               });
               customer_address_data.push(customer_address);

           });
        
          var address_data = JSON.stringify(customer_address_data);
    $("#customer_multi_address").val(address_data);
    if(validate_customerform('customerform'))
    {
        
        $(this).prop('disabled', true);
        var dialcode = $(".selected-dial-code").html();
        $("#customer_mobile_dial_code").val(dialcode);
        
        var type = "POST";
        var url = 'customer_create';
        var dataType = "";
        var data = {
            "formdata": $("#customerform").serialize()

        };
      callroute(url,type,dataType,data,function (data)
        {
            $(this).prop('disabled', false);
            var dta = JSON.parse(data);
            if(dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
                var cus_name      =     $('#pcustomer_name').val();
                var cus_mobile    =     $('#pcustomer_mobile').val();
                var cus_email     =     $('#pcustomer_email').val();
                var cus_address   =     $('#pcustomer_address').val();
                var cus_gstin     =     $('#pcustomer_gstin').val();
                var cus_state     =     $('#pstate_id').val();

                $('.customerdata').show();
                
                $("#addcustomerpopup").modal('hide');
                $('#customer_name').val(cus_name);
                $('#customer_mobile').val(cus_mobile);
                $('#customer_email').val(cus_email);
               
                $('#ccustomer_id').val(dta['customer_id']);
                $('#savecustomer').prop('disabled', false);

            }
            else
            {
                $('#savecustomer').prop('disabled', false);
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
    else
    {
        return false;
    }

});

$("#addbilling").click(function (e) {

     $(this).prop('disabled', true);

  if(validate_billing('billingform'))
  {
      $("#addbilling").prop('disabled', true);



      var array = [];



      $('#sproduct_detail_record tr').has('td').each(function()
      {
          var arrayItem = {};
          $('td', $(this)).each(function(index, item)
          {
              var inputname = $(item).attr('id');

                if(inputname != undefined && inputname != '')
                {
                    var wihoutidname = inputname.split('_');
                    var nameforarray = wihoutidname[0];

                   

                        if(nameforarray == 'roomnoval')
                        {
                            arrayItem['consign_product_id'] =$(this).find("#consign_product_id_"+wihoutidname[1]).val();
                            arrayItem['return_product_id'] =$(this).find("#return_product_id_"+wihoutidname[1]).val();
                            arrayItem['sales_product_id'] =$(this).find("#sales_product_id_"+wihoutidname[1]).val();
                            arrayItem['productid'] =$(this).find("#productid_"+wihoutidname[1]).val();
                            
                        }
                       else if(nameforarray == 'sellingmrp')
                        {
                            arrayItem['mrp'] =$(this).find("#mrp_"+wihoutidname[1]).val();
                            arrayItem['price_master_id'] =$(this).find("#pricemasterid_"+wihoutidname[1]).val();
                            arrayItem['inwardids'] =$(this).find("#inwardids_"+wihoutidname[1]).val();
                            arrayItem['inwardqtys'] =$(this).find("#inwardqtys_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'sellingqty')
                        {
                            arrayItem['qty'] =$(this).find("#qty_"+wihoutidname[1]).val();
                            arrayItem['oldqty'] =$(this).find("#oldqty_"+wihoutidname[1]).val();
                            

                        }
                        else if(nameforarray == 'sellingpricewgst')
                        {
                            arrayItem['sellingprice_before_discount'] =$(this).find("#sellingwithoutgst_"+wihoutidname[1]).val();

                        }
                        else if(nameforarray == 'sellingdiscountper')
                        {
                            arrayItem['discount_percent'] =$(this).find("#proddiscper_"+wihoutidname[1]).val();
                            arrayItem['overalldiscount_percent'] =$(this).find("#overalldiscper_"+wihoutidname[1]).val();

                        }
                        else if(nameforarray == 'sellingdiscountamt')
                        {
                            arrayItem['discount_amount'] =$(this).find("#proddiscamt_"+wihoutidname[1]).val();
                            arrayItem['overalldiscount_amount'] =$(this).find("#overalldiscamt_"+wihoutidname[1]).val();
                            arrayItem['overallmrpdiscount_amount'] =$(this).find("#overallmrpdiscamt_"+wihoutidname[1]).val();

                        }
                        
                       
                        else
                        {
                            arrayItem[nameforarray] = $(item).html();
                        }


                }

          });
          array.push(arrayItem);
      });

      var arraydetail = [];
      arraydetail.push(array);

      var customerdetail = {};
      var paymentdetail = {};

      customerdetail['sales_bill_id'] = $("#sales_bill_id").val();
      customerdetail['consign_bill_id'] = $("#consign_bill_id").val();
      customerdetail['return_bill_id'] = $("#return_bill_id").val();
      customerdetail['customer_creditnote_id'] = $("#customer_creditnote_id").val();
      customerdetail['customer_id'] = $("#ccustomer_id").val();
      customerdetail['customer_name'] = $("#customer_name").val();
      customerdetail['customer_mobile'] = $("#customer_mobile").val();
      customerdetail['invoice_no'] = $("#invoice_no").val();
      customerdetail['invoice_date'] = $("#invoice_date").val();
      customerdetail['chequeno'] = $("#chequeno").val();
      customerdetail['bankname'] = $("#bankname").val();
      customerdetail['netbankname'] = $("#netbankname").val();
      customerdetail['creditaccountid'] = $("#creditaccountid").val();
      customerdetail['totalcreditamount'] = $("#totalcreditamount").val();
      customerdetail['totalcreditbalance'] = $("#totalcreditbalance").val();
      customerdetail['refname'] = $("#refname").val();
      customerdetail['official_note'] = $("#official_note").val();
      customerdetail['print_note'] = $("#print_note").val();
      customerdetail['return_type'] = $('input[name=returntype]:checked').val();
      customerdetail['cashcreditreturn'] = $('input[name=cashcreditreturn]:checked').val();


      
      customerdetail['extra_discount_percent'] = $('.customer_points_percent').html();
      customerdetail['customer_discount_percent'] = $('.actualcustomer_points_percent').html();


      $("#totalamtdiv").each(function(){
         $(this).find('.row').each(function ()
         {
             var fieldname = ($(this).find('input').attr('id'));
             customerdetail[fieldname] = $("#"+fieldname).val();
         });

      });
      arraydetail.push(customerdetail);

 var parr =[];
      $("#paymentmethoddiv").each(function()
      {
          var paymentarr = {};
         $(this).find('.row').each(function (index,item)
         {
             var paymentmethod = ($(this).find('input').attr('id'));

             if($("#"+paymentmethod).val() != '' && $("#"+paymentmethod).val() != 0)
             {
                var paymentid = $("#"+paymentmethod).data("id");

                 parr.push({
                     id: paymentid,
                     value: $("#"+paymentmethod).val(),
                     sales_payment_id: $("#sales_payment_detail"+paymentid).val()
                 });
             }
         });

      });

      arraydetail.push(parr);

      var carray = [];

      $('#charges_record tr').has('td').each(function()
      {
          var carrayItem = {};
          $('td', $(this)).each(function(index, item)
          {
              var inputname = $(item).attr('id');

                if(inputname != undefined && inputname != '')
                {
                    var wihoutidname = inputname.split('_');
                    var nameforarray = wihoutidname[0];

                   

                        if(nameforarray == 'chargesname')
                        {
                            carrayItem['creturn_product_id'] =$(this).find("#creturn_product_id_"+wihoutidname[1]).val();
                            carrayItem['cproductid'] =$(this).find("#cproductid_"+wihoutidname[1]).val();
                            carrayItem['csales_product_id'] =$(this).find("#csales_product_id_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'chargesamtdetails')
                        {
                            carrayItem['chargesamt'] =$(this).find("#chargesamt_"+wihoutidname[1]).val();
                            carrayItem['cqty'] =$(this).find("#cqty_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'cstotalamountdetails')
                        {
                            carrayItem['returnchargesamt'] =$(this).find("#creturntotalamount_"+wihoutidname[1]).val();                        
                            
                        }
                        else
                        {
                            carrayItem[nameforarray] = $(item).html();
                        }


                }

          });
          carray.push(carrayItem);
      });
        arraydetail.push(carray);

       console.log(arraydetail);
       //return false;
 
   
      var data = arraydetail;

      var  url = "returnbilling_create";
      var type = "POST";
      var dataType = "";
      callroute(url,type,dataType,data,function (data)
      {
          $("#addbilling").prop('disabled', true);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {

                var boldtxt = "RETURNED PRODUCT";
                boldtxt.bold();
                var barcode_printing_msg = "Returned is now added to "+boldtxt+" Section. Do you want to go "+boldtxt+" Section?";
            
               swal({
                        title: barcode_printing_msg,
                        type: "info",
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        closeOnCancel: true,
                        showConfirmButton: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {

                           window.location = 'returned_products';
                            
                        } else {

                             toastr.success(dta['Message']);
                             window.location = dta['url'];
                             $("#billingform").trigger('reset');
                             $("#sproduct_detail_record").empty('');
                             $('.viewreturned').show();
                        }
                    }); 



                   


              
          }
          else
          {
            $("#addbilling").prop('disabled', true);
               toastr.error(dta['Message']);
               

          }
      })

  }
   else
    {
        $("#addbilling").prop('disabled', false);
        return false;
    }
});

$("#addbillingprint").click(function (e) {

     $(this).prop('disabled', true);

  if(validate_billing('billingform'))
  {
      $("#addbillingprint").prop('disabled', true);



      var array = [];



      $('#sproduct_detail_record tr').has('td').each(function()
      {
          var arrayItem = {};
          $('td', $(this)).each(function(index, item)
          {
              var inputname = $(item).attr('id');

                if(inputname != undefined && inputname != '')
                {
                    var wihoutidname = inputname.split('_');
                    var nameforarray = wihoutidname[0];

                   

                        if(nameforarray == 'roomnoval')
                        {
                            arrayItem['consign_product_id'] =$(this).find("#consign_product_id_"+wihoutidname[1]).val();
                            arrayItem['return_product_id'] =$(this).find("#return_product_id_"+wihoutidname[1]).val();
                            arrayItem['sales_product_id'] =$(this).find("#sales_product_id_"+wihoutidname[1]).val();
                            arrayItem['productid'] =$(this).find("#productid_"+wihoutidname[1]).val();
                            
                        }
                       else if(nameforarray == 'sellingmrp')
                        {
                            arrayItem['mrp'] =$(this).find("#mrp_"+wihoutidname[1]).val();
                            arrayItem['price_master_id'] =$(this).find("#pricemasterid_"+wihoutidname[1]).val();
                            arrayItem['inwardids'] =$(this).find("#inwardids_"+wihoutidname[1]).val();
                            arrayItem['inwardqtys'] =$(this).find("#inwardqtys_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'sellingqty')
                        {
                            arrayItem['qty'] =$(this).find("#qty_"+wihoutidname[1]).val();
                            arrayItem['oldqty'] =$(this).find("#oldqty_"+wihoutidname[1]).val();
                            

                        }
                        else if(nameforarray == 'sellingpricewgst')
                        {
                            arrayItem['sellingprice_before_discount'] =$(this).find("#sellingwithoutgst_"+wihoutidname[1]).val();

                        }
                        else if(nameforarray == 'sellingdiscountper')
                        {
                            arrayItem['discount_percent'] =$(this).find("#proddiscper_"+wihoutidname[1]).val();
                            arrayItem['overalldiscount_percent'] =$(this).find("#overalldiscper_"+wihoutidname[1]).val();

                        }
                        else if(nameforarray == 'sellingdiscountamt')
                        {
                            arrayItem['discount_amount'] =$(this).find("#proddiscamt_"+wihoutidname[1]).val();
                            arrayItem['overalldiscount_amount'] =$(this).find("#overalldiscamt_"+wihoutidname[1]).val();
                            arrayItem['overallmrpdiscount_amount'] =$(this).find("#overallmrpdiscamt_"+wihoutidname[1]).val();

                        }
                        
                       
                        else
                        {
                            arrayItem[nameforarray] = $(item).html();
                        }


                }

          });
          array.push(arrayItem);
      });

      var arraydetail = [];
      arraydetail.push(array);

      var customerdetail = {};
      var paymentdetail = {};

      customerdetail['sales_bill_id'] = $("#sales_bill_id").val();
      customerdetail['consign_bill_id'] = $("#consign_bill_id").val();
      customerdetail['return_bill_id'] = $("#return_bill_id").val();
      customerdetail['customer_creditnote_id'] = $("#customer_creditnote_id").val();
      customerdetail['customer_id'] = $("#ccustomer_id").val();
      customerdetail['customer_name'] = $("#customer_name").val();
      customerdetail['customer_mobile'] = $("#customer_mobile").val();
      customerdetail['invoice_no'] = $("#invoice_no").val();
      customerdetail['invoice_date'] = $("#invoice_date").val();
      customerdetail['chequeno'] = $("#chequeno").val();
      customerdetail['bankname'] = $("#bankname").val();
      customerdetail['netbankname'] = $("#netbankname").val();
      customerdetail['creditaccountid'] = $("#creditaccountid").val();
      customerdetail['totalcreditamount'] = $("#totalcreditamount").val();
      customerdetail['totalcreditbalance'] = $("#totalcreditbalance").val();
      customerdetail['refname'] = $("#refname").val();
      customerdetail['official_note'] = $("#official_note").val();
      customerdetail['print_note'] = $("#print_note").val();
      customerdetail['return_type'] = $('input[name=returntype]:checked').val();
      customerdetail['cashcreditreturn'] = $('input[name=cashcreditreturn]:checked').val();


      
      customerdetail['extra_discount_percent'] = $('.customer_points_percent').html();
      customerdetail['customer_discount_percent'] = $('.actualcustomer_points_percent').html();


      $("#totalamtdiv").each(function(){
         $(this).find('.row').each(function ()
         {
             var fieldname = ($(this).find('input').attr('id'));
             customerdetail[fieldname] = $("#"+fieldname).val();
         });

      });
      arraydetail.push(customerdetail);

 var parr =[];
      $("#paymentmethoddiv").each(function()
      {
          var paymentarr = {};
         $(this).find('.row').each(function (index,item)
         {
             var paymentmethod = ($(this).find('input').attr('id'));

             if($("#"+paymentmethod).val() != '' && $("#"+paymentmethod).val() != 0)
             {
                var paymentid = $("#"+paymentmethod).data("id");

                 parr.push({
                     id: paymentid,
                     value: $("#"+paymentmethod).val(),
                     sales_payment_id: $("#sales_payment_detail"+paymentid).val()
                 });
             }
         });

      });

      arraydetail.push(parr);

      var carray = [];

      $('#charges_record tr').has('td').each(function()
      {
          var carrayItem = {};
          $('td', $(this)).each(function(index, item)
          {
              var inputname = $(item).attr('id');

                if(inputname != undefined && inputname != '')
                {
                    var wihoutidname = inputname.split('_');
                    var nameforarray = wihoutidname[0];

                   

                        if(nameforarray == 'chargesname')
                        {
                            carrayItem['creturn_product_id'] =$(this).find("#creturn_product_id_"+wihoutidname[1]).val();
                            carrayItem['cproductid'] =$(this).find("#cproductid_"+wihoutidname[1]).val();
                            carrayItem['csales_product_id'] =$(this).find("#csales_product_id_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'chargesamtdetails')
                        {
                            carrayItem['chargesamt'] =$(this).find("#chargesamt_"+wihoutidname[1]).val();
                            carrayItem['cqty'] =$(this).find("#cqty_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'cstotalamountdetails')
                        {
                            carrayItem['returnchargesamt'] =$(this).find("#creturntotalamount_"+wihoutidname[1]).val();                        
                            
                        }
                        else
                        {
                            carrayItem[nameforarray] = $(item).html();
                        }


                }

          });
          carray.push(carrayItem);
      });
        arraydetail.push(carray);

       console.log(arraydetail);
       //return false;
 
   
      var data = arraydetail;

      var  url = "returnbillingprint_create";
      var type = "POST";
      var dataType = '';
      callroute(url,type,dataType,data,function (data)
      {
          $("#addbillingprint").prop('disabled', true);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {


            var boldtxt = "RETURNED PRODUCT";
                boldtxt.bold();
                var barcode_printing_msg = "Returned is now added to "+boldtxt+" Section. Do you want to go "+boldtxt+" Section?";
            
               swal({
                        title: barcode_printing_msg,
                        type: "info",
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        closeOnCancel: true,
                        showConfirmButton: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {

                           window.location = 'returned_products';
                            
                        } else {

                             toastr.success(dta['Message']);
                             window.location.href = dta['burl'];
                            if($('input[name=cashcreditreturn]:checked').val()  == 2)
                             {
                             window.open(dta['url'],'_blank');
                             }
                            $("#billingform").trigger('reset');
                            $("#sproduct_detail_record").empty('');
                            $('.viewreturned').show();
                        }
                    });
            
               

              
          }
          else
          {
            $("#addbillingprint").prop('disabled', true);
               toastr.error(dta['Message']);
               

          }
      })

  }
   else
    {
        $("#addbillingprint").prop('disabled', false);
        return false;
    }
});
function validate_billing(frmid)
{
    var error = 0;
    var cashcreditreturn   =    $('input[name=cashcreditreturn]:checked').val();
    if(Number(bill_calculation)==1)
    {
        if(Number(cashcreditreturn)==2)
        {
          if($("#customer_name").val() =='')
          {
              error = 1;
              toastr.error("Customer details are necessary to create Credit Note");
              return false;
          }
        }
         
          if($("#grand_total").val() ==0)
          {
              error = 1;
              toastr.error("No Product to return please select products");
              return false;
          }
    }
    else
    {
        if($("#overallqty").val() ==0)
        {
            error = 1;
            toastr.error("No Product to return please select products");
            return false;
        }
    }
   
   

    if(error == 1)
    {
        return false;
    }
    else
    {
        $('#addbilling').prop('disabled', true);
        $('#addbillingprint').prop('disabled', true);
        $("#billing_error").html('');
        return true;
    }
}

$("#pcustomer_date_of_birth").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom"

});

function resetbill()
{
    $("#billingform").trigger('reset');
}

function testCharacter(event) {
    if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 13 ||event.keyCode === 9) {
        addroom(this);
        return true;
    } else {
        return false;
    }

}
function resetreturnfilterdata()
{
    $("#fromtodate").val('');
    $("#bill_no").val('');
    $("#productsearch").val('');
    $("#billingform").trigger('reset');
    $("#sproduct_detail_record").html('');
    $('#searchbilldata').prop('disabled',false);
    $("#returnbillsdetails").trigger('reset');
    $("#customerform").trigger('reset');
    $("#productdetails").html('');
    $("#charges_record").html('');
    $('.customersearcharea').show();
    $('.manualsearcharea').show();
    $('#productsearch').attr('readonly', false); 
    $('#bill_no').attr('readonly', false); 
    $('#searchbilldata').attr('disabled',false);
    $('#resetfilter').attr('disabled',false);
    
    
   
    
}
function manualresetreturnfilterdata()
{
    $("#fromtodate").val('');
    $("#bill_no").val('');
    $("#productsearch").val('');
    $("#billingform").trigger('reset');
    $("#sproduct_detail_record").html('');
    $('#searchbilldata').prop('disabled',false);
    $("#returnbillsdetails").trigger('reset');
    $("#customerform").trigger('reset');
    $("#productdetails").html('');
    $("#charges_record").html('');
    $('.customersearcharea').show();
    $('.manualsearcharea').show();
    $('#productsearch').attr('readonly', false); 
    $('#manualbill_no').attr('readonly', false); 
    $('#searchbilldata').attr('disabled',false);
    $('#resetfilter').attr('disabled',false);
    
    
   
    
}


// $('#searchbilldata').click(function(e){

//    var bill_no        =  $("#manualbill_no").val();
//    var productsearch  =  $('#productsearch').val();

// $('#manualbill_no').attr('readonly', true);

//    if(bill_no=='' && productsearch=='')
//    {
//             toastr.error("Please Enter Filter details to return Products");
//             return false;
//     }
//     else
//     {        
//            if(bill_no !='')
//            {
//                $('.loaderContainer').show();
//                $('#fromtodate').val('');
//                $('#productsearch').val('');


//                var type = "POST";
//                var url = 'returnbill_data';
//                var dataType = "";
//                var data = {
//                    "bill_no" : bill_no,
//                }
//            callroute(url,type,dataType,data,function(data)
//            {

//                 var bill_data = JSON.parse(data,true);


//                 if(bill_data['Success'] == "True")
//                 {

//                     $('#searchbilldata').prop('disabled', true);
//                     var bill_detail         = bill_data['Data'];
//                     var bill_productdetail  = bill_data['ProductData'];
//                     if(bill_detail['customer_id']!=null)
//                     {
//                         $('.customersearcharea').hide();
//                     }
                   

//                     var customer_name = '';
//                     var customer_mobile='';
//                     var customer_email='';
//                     var cusreference ='';
                    
//                       if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_name']!= null && bill_detail['customer']['customer_name']!= undefined)
//                       {
//                                 customer_name  =  bill_detail['customer']['customer_name'];
//                                 $('.customerdata').show();
//                       }
                      
//                       if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_mobile']!= null && bill_detail['customer']['customer_mobile']!= undefined)
//                       {
//                                 customer_mobile  =  bill_detail['customer']['customer_mobile'];
//                       }
                      
//                       if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_email']!= null && bill_detail['customer']['customer_email']!= undefined)
//                       {
//                                 customer_email  =  bill_detail['customer']['customer_email'];
//                       }
//                      if(bill_detail['reference']!= null && bill_detail['reference']!= '' && bill_detail['reference']['reference_name']!= null && bill_detail['reference']['reference_name']!= undefined)
//                       {
//                                 cusreference  =  bill_detail['reference']['reference_name'];
//                       }

//                        $('#ccustomer_id').val(bill_detail['customer_id']);
//                        $("#sales_bill_id").val(bill_detail['sales_bill_id']);
//                        $("#invoice_date").val(bill_detail['bill_date']);
//                        $("#invoice_no").val(bill_detail['bill_no']);
//                        $("#discount_percent").val(bill_detail['discount_percent']);
//                        $("#discount_amount").val(bill_detail['discount_amount']);
//                        $("#roomwisediscount_amount").val(bill_detail['productwise_discounttotal']);

//                         $("#customer_name").val(customer_name);
//                         $("#customer_mobile").val(customer_mobile);
//                         $("#customer_email").val(customer_email);
//                         $("#refname").val(cusreference);

                  
//                     if(bill_detail['customer_creditaccount'] != 'undefined' && bill_detail['customer_creditaccount'] != '' && bill_detail['customer_creditaccount'] != null)
//                     {
                             
//                             $("#creditaccountid").val(bill_detail['customer_creditaccount']['customer_creditaccount_id']);
//                             $("#totalcreditamount").val(bill_detail['customer_creditaccount']['credit_amount']);  
//                             $("#totalcreditbalance").val(bill_detail['customer_creditaccount']['balance_amount']);   
//                     }
                    

          
//                 var productcount  = 0;
//                 var chargecount  = 0;

//                  //console.log(bill_productdetail);
                   
//             if(bill_productdetail != 'undefined' && bill_productdetail != '')
//                {

//                    var product_html = '';   
//                     var pcount    = 0;
//                     var sellingprice  = 0;
//                     var stock = 0;
//                     var pricehtml = '';  
//                     var chargeshtml = ''; 
                      
//                $.each(bill_productdetail,function (billkey,billvalue)
//                {
                        
//                        if(billvalue['product_type']==1)
//                        {

//                                 var rinwardids      =     (billvalue['inwardids'].slice(0,-1)).split(',');
//                                 var rinwardqtys     =     (billvalue['inwardqtys'].slice(0,-1)).split(',');
//                                 var tinwardids      =      '';
//                                 var tinwardqtys     =      '';
//                                 var totiqty         =      '';
//                                 var totalreturnqty  =      '';

//                                 //console.log(billvalue['return_product_detail']);

//                  if(billvalue['return_product_detail'] != 'undefined' && billvalue['return_product_detail'] != '')
//                 {               

//                     $.each(rinwardids,function (ridkey,ridvalue)
//                     {
                        
//                             var totiqty         =      '';
//                               $.each(billvalue['return_product_detail'],function (rbillkey,rbillvalue)
//                               {
                                 
                                    
//                                     var iids             =     (rbillvalue['inwardids'].slice(0,-1)).split(',');
//                                     var iqtys            =     (rbillvalue['inwardqtys'].slice(0,-1)).split(',');
                                       
                                         
                                              
//                                             $.each(iids,function (iidkey,iidvalue)
//                                             {
//                                                 if(ridvalue == iidvalue)
//                                                 {
//                                                     totiqty  =  Number(totiqty) + Number(iqtys[iidkey]);

//                                                 }
                                                
//                                             })
                                            
                                           

                                           
//                                 })


//                                   if(totiqty!='')
//                                   {

//                                       if(Number(rinwardqtys[ridkey]) != Number(totiqty))
//                                       {
                                          
//                                            tinwardids     +=     ridvalue+',';
//                                            tinwardqtys    +=     (Number(rinwardqtys[ridkey])-Number(totiqty))+',';
//                                       }
//                                   }
//                                   else
//                                   {
//                                            tinwardids      +=     ridvalue+',';
//                                            tinwardqtys    +=     (Number(rinwardqtys[ridkey]))+',';
//                                   }
                            
                           
                            
//                        })
//                  }

//                 else
//                 {
//                      tinwardids     +=     billvalue['inwardids'];
//                      tinwardqtys    +=     billvalue['inwardqtys'];
//                  }

//                              // console.log(tinwardids);
//                              //  console.log(tinwardqtys);
//                             //console.log(totalreturnqty);
//                                if(billvalue['qty']==billvalue['totalreturnqty'])
//                                {

//                                }
//                                else
//                                {
                               
//                                         productcount =  1;
//                                         var qty                         =   billvalue['qty'] - billvalue['totalreturnqty'];

//                                         var product_id                  =   billvalue['price_master_id'];

//                                         var sellingprice                =   billvalue['sellingprice_before_discount'];
                                        
//                                         var discount_percent            =   billvalue['discount_percent'];
//                                         var overalldiscount_percent     =   billvalue['overalldiscount_percent'];
//                                         var gst_percent                 =   billvalue['igst_percent'];
//                                         var totalmrpdiscount            =   (Number(billvalue['mrp']) * Number(qty)) * Number(discount_percent) / 100;

//                                         var totalsellingwgst             =     Number(sellingprice) * Number(qty);
//                                         var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
//                                         var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_percent) / 100).toFixed(4);

//                                         var totaldiscount                =      Number(sellingdiscount) * Number(qty);

//                                         var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

//                                         var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                                        
//                                         var totalgst                     =      Number(gst_amount) * Number(qty);


//                                         var sellingwithgst               =      Number(discountedamt) + Number(totalgst);



//                                       var totalsellingwgst               =     discountedamt;
                                  
//                                       var mrpproddiscountamt              =     ((Number(sellingwithgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
//                                       var proddiscountamt              =     ((Number(totalsellingwgst) * Number(overalldiscount_percent)) / 100).toFixed(4);

//                                       var totalproddiscountamt         =     Number(proddiscountamt)

//                                       var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                                       
                                        
//                                         var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                                        
                                       
//                                         var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
//                                         var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);




//                                         var showsellingprice              =   Number(billvalue['sellingprice_before_discount']).toFixed(2);
//                                         var showigst_amount               =   Number(billvalue['igst_amount']).toFixed(2);
//                                         var mrp                           =    Number(billvalue['mrp']).toFixed(2);
//                                         var total_amount                  =    Number(total_amount).toFixed(4);
//                                         var stotal_amount                  =    Number(total_amount).toFixed(2);

//                           console.log(bill_data['Billtype']);
//                           if(bill_data['Billtype']==3)
//                           {
//                             var batchhtml   =   '<td id="batchno_'+product_id+'">'+billvalue['batchprice_master']['batch_no']+'</td>';
//                           } 
//                           else
//                           {
//                             var batchhtml  = '';
//                           }             
                        
//                             if(billvalue['product']['supplier_barcode']!='' && billvalue['product']['supplier_barcode']!=null)
//                             {
//                               var barcode     =     billvalue['product']['supplier_barcode'];
//                             }
//                             else
//                             {
//                               var barcode     =     billvalue['product']['product_system_barcode'];
//                             }


//                             var feature_show_val = "";
//                             if(bill_show_dynamic_feature != '')
//                             {
//                                 var feature = bill_show_dynamic_feature.split(',');

//                                 $.each(feature,function(fea_key,fea_val)
//                                 {
//                                     var feature_name = '';                               

//                                     if(typeof(billvalue['product'][fea_val]) != "undefined" && billvalue['product'][fea_val] !== null) {

//                                         feature_name = billvalue['product'][fea_val];
//                                         //console.log(feature_name);
//                                     }

//                                     feature_show_val += '<td>' + feature_name + '</td>';
//                                 })
//                             }

//                            product_html += '<tr id="product_' + product_id + '">' +
//                                     '<td id="barcodesel_'+product_id+'" name="barcode_sel[]">'+barcode+'</td>'+
//                                     '<td id="roomnoval_'+product_id+'" style="display:none;">'+
//                                     '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
//                                     '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
//                                     '<input value="" type="hidden" id="return_product_id_'+product_id+'" name="return_product_id_[]" class="" >'+
//                                     '<input value="'+billvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+
//                                     '</td>'+
//                                     '<td id="product_name_'+product_id+'" name="product_name[]">'+billvalue['product']['product_name']+'</td>';
//                                     product_html += feature_show_val;
//                                     product_html += batchhtml;
//                                     product_html += '<td id="sellingmrp_'+product_id+'" class="billing_calculation_case">'+'<input type="text" tabindex="-1" id="mrp_'+product_id+'" class="floating-input tarifform-control number" value="'+mrp+'" readonly>'+
//                                     '<input type="hidden" id="pricemasterid_'+product_id+'" tabindex="-1" name="pricemasterid[]"  value="'+billvalue['price_master_id']+'" >'+
//                                     '<input type="hidden" id="inwardids_'+product_id+'" name="inwardids[]"  value="'+tinwardids+'" >'+
//                                     '<input type="hidden" id="inwardqtys_'+product_id+'" name="inwardqtys[]"  value="'+tinwardqtys+'" >'+
//                                     '</td>'+
//                                     '<td id="sellingpricewgst_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+showsellingprice+'" readonly>'+
//                                     '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]" tabindex="-1"  value="'+sellingprice+'" >'+
//                                     '</td>'+                  
//                                     '<td id="sellingqty_'+product_id+'">'+
//                                     '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+qty+'" name="qty[]" onkeyup="return calqty(this);" >'+
//                                     '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="'+qty+'" name="oldqty[]">'+
//                                     '</td>'+       
//                                     '<td id="sellingdiscountper_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+billvalue['discount_percent']+'" name="proddiscper[]" onkeyup="return caldiscountper(this);" readonly>'+
//                                     '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overalldiscount_percent']+'" name="proddiscper[]" tabindex="-1" style="display:none;">'+'</td>'+
//                                     '<td id="sellingdiscountamt_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number" tabindex="-1" value="'+totalmrpdiscount+'"  readonly>'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" tabindex="-1" value="'+totaldiscount+'" name="proddiscamt[]" onkeyup="return caldiscountamt(this);" readonly style="display:none;">'+
//                                     '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="'+proddiscountamt+'" tabindex="-1" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+mrpproddiscountamt+'" tabindex="-1" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

//                                     '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
//                                     '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
//                                     '<td id="sprodgstper_'+product_id+'" style="text-align:right !important;display:none;">'+billvalue['igst_percent']+'</td>'+
//                                     '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important;display:none;" >'+sgstamount+'</td>'+
//                                     '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
//                                     '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

//                                     '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
//                                     '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;" class="billing_calculation_case">'+stotal_amount+'</td>'+
//                                     '<td onclick="removerow(' + product_id + ');"><i class="fa fa-close"></i></td>' +
//                                     '</tr>';
//                                 }
//                             }
//                              if(productcount == 1)
//                              {
//                                     if(billvalue['product_type']==2)
//                                     {

//                                             chargecount   = 1;
//                                             var cproduct_id              =   billvalue['product_id'];
//                                             var chargesamt               =   billvalue['mrp']- billvalue['totalreccharges'];
//                                             var maxgst                   =   billvalue['igst_percent'];
                                            

//                                             var cprodgstamt               =    Number(chargesamt)   * Number(maxgst) / 100;
//                                             var ctotalamt                 =    Number(chargesamt) + Number(cprodgstamt);

//                                             var cshowigst_amount          =   Number(cprodgstamt).toFixed(2);
//                                             var ctotal_amount             =    Number(ctotalamt).toFixed(2);

//                                      chargeshtml +=   '<tr id="charges_'+cproduct_id+'">'+
//                                         '<td id="chargesname_'+cproduct_id+'" style="text-align:left !important;">'+
//                                         '<input value="" type="hidden" id="creturn_product_id_'+cproduct_id+'" name="creturn_product_id_[]" class="" >'+
//                                         '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="csales_product_id_'+cproduct_id+'" name="csales_product_id_[]" class="" >'+
//                                         '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
//                                         '<input value="'+cproduct_id+'" type="hidden" id="cproductid_'+cproduct_id+'" name="cproductid[]" class="">'+billvalue['product']['product_name']+'</td>'+                                                
//                                         '<td class="bold"  id="chargesamtdetails_'+cproduct_id+'">'+
//                                             '<input type="text" id="chargesamt_'+cproduct_id+'" onkeyup="return addcharges(this);" class="floating-input tarifform-control number" name="chargesamt[]" value="'+chargesamt+'" readonly style="background:#f3f9ec !important;" tabindex="-1">'+
//                                             '<input type="hidden" id="ochargesamt_'+cproduct_id+'" name="ochargesamt[]" value="'+chargesamt+'">'+
//                                             '<input type="hidden" id="cqty_'+cproduct_id+'" class="floating-input tarifform-control number" name="cqty[]" value="'+billvalue['qty']+'">'+
//                                         '</td>'+                                              
//                                         '<td id="csprodgstper_'+cproduct_id+'" style="text-align:right !important;">'+billvalue['igst_percent']+'</td>'+
//                                         '<td id="csprodgstamt_'+cproduct_id+'" style="text-align:right !important;">'+cshowigst_amount+'</td>'+
//                                         '<td id="cprodgstper_'+cproduct_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
//                                         '<td id="cprodgstamt_'+cproduct_id+'" style="display:none;" name="prodgstamt[]">'+cprodgstamt+'</td>'+
//                                         '<td id="ctotalamount_'+cproduct_id+'" style="font-weight:bold;display:none;" class="ctotalamount" name="ctotalamount[]">'+ctotalamt+'</td>'+
//                                         '<td id="cstotalamount_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+ctotal_amount+'</td>'+
//                                         '<td id="cstotalamountdetails_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+'<input type="text" id="oldchargesamt_'+cproduct_id+'" value="'+ctotal_amount+'" class="floating-input tarifform-control number " style="display:none;">'+'<input type="text" id="creturntotalamount_'+cproduct_id+'" value="0" class="floating-input tarifform-control number chargesamt" onkeyup="return taddcharges(this);" style="width:50%;font-weight:bold;">'+'</td>'+
//                                     '</tr>';
                                                   
//                                     }
//                                 }
                                                                


//                        });
                        

//                        if(productcount == 0)
//                        {
//                            product_html += '<tr>' +
//                                     '<td colspan="11" style="text-align:left !important;"><b style="color:#000;">No Products to return</b></td>'+
//                                     '</tr>';
//                              chargeshtml += '<tr>' +
//                             '<td colspan="5" style="text-align:left !important;"><b style="color:#000;">No Charges Amount to return</b></td>'+
//                             '</tr>';
//                        }
//                        if(chargecount == 0 && productcount == 1)
//                        {
                          
//                              chargeshtml += '<tr>' +
//                             '<td colspan="5" style="text-align:left !important;"><b style="color:#000;">No Charges Amount to return</b></td>'+
//                             '</tr>';
//                        }



                       
//                        $(".odd").hide();
//                        $("#sproduct_detail_record").append(product_html);
//                         if(Number(bill_calculation)==1)
//                          {
//                             $('.billing_calculation_case').show();
//                          }
//                          else
//                          {
//                             $('.billing_calculation_case').hide();
//                          }
//                         var srr = 0;
//                        $('.totqty').each(function(e){
//                             if($(this).val()!='')
//                             {
//                                 srr++;
//                             }
//                        });
//                        $('.showtitems').show();
//                        $('.titems').html(srr);
//                        $('.loaderContainer').hide();
//                        $("#charges_record").append(chargeshtml);
//                    }
//                    //end of fillup product detail row
                 
//                               totalcalculation();
                   
                    
                
//                 }
//                 else if(bill_data['Success'] == "Null")
//                 {
//                         $("#searchbilldata").prop('disabled', false);
//                         $('.loaderContainer').hide();
//                         toastr.error(bill_data['Message']);
//                 }
//                else
//                 {
//                         $("#searchbilldata").prop('disabled', false);
//                         $('.loaderContainer').hide();
//                         toastr.error(bill_data['Message']);
//                 }

              
//            });
//          }
//          else
//          {

              
//                var type = "POST";
//                var url = 'returnbillsecond_data';
//                var dataType = "";
//                var data = {
//                    "productsearch":productsearch
//                }
//              callroute(url,type,dataType,data,function(data)
//             {

//                 var bill_data = JSON.parse(data,true);

//                 $("#productdetails").html('');
//                 if(bill_data['Success'] == "True")
//                 {
                   
//                     $('#searchbilldata').prop('disabled', true);
//                     $("#addreturnpopup").modal('show');

//                     var bill_details    =   bill_data['Data'];

                    
//                     var bill_html = '';
//                     var tblclass = '';

               

//                     $.each(bill_details,function (billkey,billvalue)
//                      {
//                          if(billvalue['customer']!= null && billvalue['customer']!= '' && billvalue['customer']['customer_name']!= null && billvalue['customer']['customer_name']!= undefined)
//                           {
//                                     customer_name  =  billvalue['customer']['customer_name'];
//                           }
//                           else
//                           {
//                                 customer_name  =  '';
//                           }
//                           var taxablevalue   =   billvalue['total_bill_amount'] - billvalue['total_cgst_amount'] -billvalue['total_sgst_amount'];
//                           taxablevalue       =   Number(taxablevalue).toFixed(2);
//                           var totalcgst      =   Number(billvalue['total_cgst_amount']).toFixed(2);
//                           var totalsgst      =   Number(billvalue['total_sgst_amount']).toFixed(2);
//                           var totaligst      =   Number(billvalue['total_igst_amount']).toFixed(2);
//                           var billamount     =   Number(billvalue['total_bill_amount']).toFixed(0);

                         
//                         var sr  =  billkey +1;
//                         var taxhtml = '';

//                         if(Number(tax_type)==1)
//                         {
//                              taxhtml = '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+totaligst+'</td>';
                            
//                         }
//                         else
//                         {
//                            taxhtml  =  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+totalcgst+'</td>'+
//                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+totalsgst+'</td>';
//                         }
                       

//                         bill_html +=  '<tr class="'+tblclass+'" style="border-top:1px solid #C0C0C0 !important;">'+
//                                   '<td style="font-size:13px !important;" class="leftAlign"><button id="returnbillno_'+billvalue['sales_bill_id']+'" onclick="return popreturndata(this);" class="btn btn-primary" style="color:#fff;padding: .15rem .35rem;line-height:1.3 !important;"><i class="fa fa-check" style="margin:0 !important;"></i> Select</button>'+
//                                   '<input type="hidden" value="'+billvalue['bill_no']+'" id="rbillno_'+billvalue['sales_bill_id']+'">'+'</td>'+                                 
//                                   '<td style="font-size:13px !important;font-weight:bold !important;" class="leftAlign"><span style="cursor:pointer;">'+billvalue['bill_no']+'</span></td>'+
//                                   '<td style="font-size:13px !important;" class="leftAlign">'+billvalue['bill_date']+'</td>'+
//                                   '<td style="font-size:13px !important;" class="leftAlign">'+customer_name+'</td>'+
//                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;">'+billvalue['total_qty']+'</td>'+
//                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+taxablevalue+'</td>'+taxhtml+                                  
//                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+billamount+'</td>'+
//                                   '<td style="text-align:center !important;"><span id="down_'+billvalue['sales_bill_id']+'" onclick="return showdetails(this);" style="font-weight:bold;font-size:14px;color:#28a745 !important;">Show</span><span id="up_'+billvalue['sales_bill_id']+'" onclick="return hidedetails(this);" style="font-weight:bold;font-size:14px;color:#f00 !important;display:none;">Hide</span></td>'+
//                                 '</tr>';

//                                 var headinghtml = '';

//                                 if(Number(tax_type)==1)
//                                 {
//                                      headinghtml = '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class=" billing_calculation_case"><b>'+tax_title+' Amt.</b></th>';
//                                 }
//                                 else
//                                 {
//                                     headinghtml  =  '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class=" billing_calculation_case"><b>CGST Amt.</b></th>'+
//                                                 '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;" class=" billing_calculation_case"><b>SGST Amt.</b></th>';
                                   
//                                 }

//                           bill_html +=  '<tr id="show_'+billvalue['sales_bill_id']+'" style="display:none;">'+
//                                 '<td colspan="10">'+
//                                     '<table class="table table-striped mb-0" style="width:100%;">'+
//                                         '<thead>'+
//                                             '<tr>'+
//                                                 '<th scope="col" style="width:12%;cursor: pointer;"><b>Barcode</b></th>'+
//                                                 '<th scope="col" style="width:12%;cursor: pointer;"><b>Product Name</b></th>'+
//                                                 '<th scope="col" style="width:12%;cursor: pointer;"><b>Qty</b></th>'+
//                                                 '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;"><b>Taxable Value</b></th>'+headinghtml+   
//                                                 '<th scope="col" style="width:12%;cursor: pointer;text-align:right !important;"><b>Bill Amount</b></th>'+
//                                             '</tr>'+
//                                             '</thead>'+
//                                             '<tbody id="showproductdetails">'
                                            
//                                             $.each(billvalue['sales_product_detail'],function (billpkey,billpvalue)
//                                             {
//                                                   var ptax    =    Number(billpvalue['sellingprice_afteroverall_discount']).toFixed(2);
//                                                   var pcgst   =    Number(billpvalue['cgst_amount']).toFixed(2);
//                                                   var psgst   =    Number(billpvalue['sgst_amount']).toFixed(2);
//                                                   var pigst   =    Number(billpvalue['igst_amount']).toFixed(2);
//                                                   var pamount =    Number(billpvalue['total_amount']).toFixed(2);

//                                                 if (billpkey % 2 == 0) {
//                                                     tblclass = 'even';
//                                                 } else {
//                                                     tblclass = 'odd';
//                                                 }
//                                                 var ptaxhtml = '';

//                                                 if(Number(tax_type)==1)
//                                                 {
//                                                      ptaxhtml = '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+pigst+'</td>';
//                                                 }
//                                                 else
//                                                 {
//                                                     ptaxhtml  =  '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+pcgst+'</td>'+
//                                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+psgst+'</td>';
                                                   
//                                                 }

//                                                 bill_html +=  '<tr style="border-bottom:0px solid #C0C0C0 !important;">'+
//                                                   '<td style="font-size:13px !important;" class="leftAlign">'+billpvalue['product']['product_system_barcode']+'</td>'+
//                                                   '<td style="font-size:13px !important;font-weight:bold !important;" class="leftAlign">'+billpvalue['product']['product_name']+'</td>'+
//                                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;">'+billpvalue['qty']+'</td>'+
//                                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+ptax+'</td>'+ptaxhtml+
//                                                   '<td style="font-size:13px !important;text-align:right !important;color:#000 !important;" class=" billing_calculation_case">'+pamount+'</td>'+
//                                                 '</tr>';
//                                             });


//                                             bill_html +=  '</tbody>'+
//                                             '</table>'+
//                                         '</tr>';                                        
//                     });

                   

//                 }

//                  else
//                     {
                       
//                         var bill_html = '';
//                            $("#addreturnpopup").modal('show');
//                             bill_html +=  '<tr class="'+tblclass+'" style="border-top:1px solid #C0C0C0 !important;">'+
//                                   '<td style="font-size:13px !important;" class="leftAlign" colspan="10"><b style="color:#f00;">This Item is not sold within '+bill_data['ReturnDays']+' Days</b></td>'+
//                                 '</tr>';
//                             $("#searchbilldata").prop('disabled', false);
//                             $('.loaderContainer').hide();
                           

//                     }
//                     $("#productdetails").prepend(bill_html);
//                      if(Number(bill_calculation)==1)
//                        {
//                           $('.billing_calculation_case').show();
//                        }
//                        else
//                        {
//                           $('.billing_calculation_case').hide();
//                        }
//                        alert(bill_calculation)
                 
//            });

//          }
//    }

// });
$('.popover').click( function(e) {

    
    e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
    $('.popoverbody').toggle();

});
function showdetails(obj)
{
    var id                       =     $(obj).attr('id');
    var salesid                  =     $(obj).attr('id').split('down_')[1];
    $('#show_'+salesid).toggle();
    $('#down_'+salesid).hide();
    $('#up_'+salesid).show();
}
function hidedetails(obj)
{
    var id                       =     $(obj).attr('id');
    var salesid                  =     $(obj).attr('id').split('up_')[1];
    $('#show_'+salesid).toggle();
    $('#down_'+salesid).show();
    $('#up_'+salesid).hide();
}
function popreturndata(obj)
{

    var id                       =     $(obj).attr('id');
    var salesid                  =     $(obj).attr('id').split('returnbillno_')[1];
    var billno                   =     $('#rbillno_'+salesid).val();

    $('#returnbillno_'+salesid).attr("disabled", "disabled");
   
            $('.loaderContainer').show();
               var type = "POST";
               var url = 'returnbill_data';
               var dataType = "";
               var data = {
                   "bill_no" : billno,
               }
           callroute(url,type,dataType,data,function(data)
           {

                var bill_data = JSON.parse(data,true);
                 $("#addreturnpopup").modal('hide');

                if(bill_data['Success'] == "True")
                {
                    $('#searchbilldata').prop('disabled', true);
                    var bill_detail         = bill_data['Data'];
                    var bill_productdetail  = bill_data['ProductData'];

                    var customer_name = '';
                    var customer_mobile ='';
                    var customer_email='';
                    var cusreference='';

                    console.log(bill_detail['customer']);
                    
                      if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_name']!= null && bill_detail['customer']['customer_name']!= undefined)
                      {
                                $('.customerdata').show();
                                customer_name  =  bill_detail['customer']['customer_name'];
                      }
                      
                      if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_mobile']!= null && bill_detail['customer']['customer_mobile']!= undefined)
                      {
                                customer_mobile  =  bill_detail['customer']['customer_mobile'];
                      }
                     
                     if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_email']!= null && bill_detail['customer']['customer_email']!= undefined)
                      {
                                customer_email  =  bill_detail['customer']['customer_email'];
                      }
                     
                      if(bill_detail['reference']!= null && bill_detail['reference']!= '' && bill_detail['reference']['reference_name']!= null && bill_detail['reference']['reference_name']!= undefined)
                      {
                                cusreference  =  bill_detail['reference']['reference_name'];
                      }


                       $('#ccustomer_id').val(bill_detail['customer_id']);
                       $("#sales_bill_id").val(bill_detail['sales_bill_id']);
                       //$("#invoice_date").val(bill_detail['bill_date']);
                       $("#invoice_no").val(bill_detail['bill_no']);
                       $("#discount_percent").val(bill_detail['discount_percent']);
                       $("#discount_amount").val(bill_detail['discount_amount']);
                       $("#roomwisediscount_amount").val(bill_detail['productwise_discounttotal']);

                        $("#customer_name").val(customer_name);
                        $("#customer_mobile").val(customer_mobile);
                        $("#customer_email").val(customer_email);
                        $("#refname").val(cusreference);


                   //console.log(bill_detail['customer_creditaccount']);
                    if(bill_detail['customer_creditaccount'] != 'undefined' && bill_detail['customer_creditaccount'] != '' && bill_detail['customer_creditaccount'] != null)
                    {
                             
                            $("#creditaccountid").val(bill_detail['customer_creditaccount']['customer_creditaccount_id']);
                            $("#totalcreditamount").val(bill_detail['customer_creditaccount']['credit_amount']);  
                            $("#totalcreditbalance").val(bill_detail['customer_creditaccount']['balance_amount']);   
                    }
                    

          
                var productcount  = 0;
                var chargecount  = 0;

                // console.log(bill_productdetail);
                   
                if(bill_productdetail != 'undefined' && bill_productdetail != '')
               {

                   var product_html = '';   
                    var pcount    = 0;
                    var sellingprice  = 0;
                    var stock = 0;
                    var pricehtml = '';  
                    var chargeshtml = ''; 
                      
                   $.each(bill_productdetail,function (billkey,billvalue)
                   {
                        
                       if(billvalue['product_type']==1)
                       {

                                var rinwardids      =     (billvalue['inwardids'].slice(0,-1)).split(',');
                                var rinwardqtys     =     (billvalue['inwardqtys'].slice(0,-1)).split(',');
                                var tinwardids      =      '';
                                var tinwardqtys     =      '';
                                var totiqty         =      '';
                                var totalreturnqty  =      '';

                               // console.log(billvalue['return_product_detail']);

                 if(billvalue['return_product_detail'] != 'undefined' && billvalue['return_product_detail'] != '')
                {               

                    $.each(rinwardids,function (ridkey,ridvalue)
                    {
                        
                            var totiqty         =      '';
                              $.each(billvalue['return_product_detail'],function (rbillkey,rbillvalue)
                              {
                                 
                                    
                                    var iids             =     (rbillvalue['inwardids'].slice(0,-1)).split(',');
                                    var iqtys            =     (rbillvalue['inwardqtys'].slice(0,-1)).split(',');
                                       
                                            //console.log(ridvalue);
                                              
                                            $.each(iids,function (iidkey,iidvalue)
                                            {
                                                if(ridvalue == iidvalue)
                                                {
                                                    totiqty  =  Number(totiqty) + Number(iqtys[iidkey]);
                                                }
                                                
                                            })
                                            //console.log(totiqty);
                                           

                                           
                                })
                                            if(totiqty!='')
                                            {
                                                if(rinwardqtys[ridkey] != totiqty)
                                                {
                                                    // console.log('aaa');
                                                     tinwardids     +=     ridvalue+',';
                                                     tinwardqtys    +=     (rinwardqtys[ridkey]-totiqty)+',';
                                                }
                                            }
                            
                           
                            
                       })
                 }

                else
                {
                     tinwardids     +=     billvalue['inwardids'];
                     tinwardqtys    +=     billvalue['inwardqtys'];
                 }

                               if(billvalue['qty']==billvalue['totalreturnqty'])
                               {

                               }
                               else
                               {
                                        productcount =  1;
                                        var qty                         =   billvalue['qty'] - billvalue['totalreturnqty'];

                                        var product_id                  =   billvalue['price_master_id'];

                                        var sellingprice                =   billvalue['sellingprice_before_discount'];
                                        
                                        var discount_percent            =   billvalue['discount_percent'];
                                        var overalldiscount_percent     =   billvalue['overalldiscount_percent'];
                                        var gst_percent                 =   billvalue['igst_percent'];

                                        var totalmrpdiscount            =   (Number(billvalue['mrp']) * Number(qty)) * Number(discount_percent) / 100;

                                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                        var sellingdiscount              =    (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                                        var gst_amount                   =    (Number(sellingprice-sellingdiscount) * Number(gst_percent) / 100).toFixed(4);

                                        var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                                        var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                                        var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                                        
                                        var totalgst                     =      Number(gst_amount) * Number(qty);


                                        var sellingwithgst                =      Number(discountedamt) + Number(totalgst);



                                      var totalsellingwgst             =     discountedamt;


                                      var mrpproddiscountamt              =     ((Number(sellingwithgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
                                  
                                      
                                      var proddiscountamt              =     ((Number(totalsellingwgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
                                      var totalproddiscountamt         =     Number(proddiscountamt)

                                      var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                                       
                                        
                                        var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                                        
                                       
                                        var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
                                        var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);




                                        var showsellingprice              =   Number(billvalue['sellingprice_before_discount']).toFixed(2);
                                        var showigst_amount               =   Number(billvalue['igst_amount']).toFixed(2);
                                        var mrp                           =    Number(billvalue['mrp']).toFixed(2);
                                        var total_amount                  =    Number(total_amount).toFixed(4);
                                        var stotal_amount                 =    Number(total_amount).toFixed(2);

                                         var feature_show_val = "";
                                        if(bill_show_dynamic_feature != '')
                                        {
                                            var feature = bill_show_dynamic_feature.split(',');

                                            $.each(feature,function(fea_key,fea_val)
                                            {
                                                var feature_name = '';                               

                                                if(typeof(billvalue['product'][fea_val]) != "undefined" && billvalue['product'][fea_val] !== null) {

                                                    feature_name = billvalue['product'][fea_val];
                                                    //console.log(feature_name);
                                                }

                                                feature_show_val += '<td>' + feature_name + '</td>';
                                            })
                                        }

                         if(bill_data['Billtype']==3)
                          {
                            var batchhtml   =   '<td id="batchno_'+product_id+'">'+billvalue['batchprice_master']['batch_no']+'</td>';
                          } 
                          else
                          {
                            var batchhtml  = '';
                          }    
                          if(billvalue['product']['supplier_barcode']!='' && billvalue['product']['supplier_barcode']!=null)
                            {
                              var barcode     =     billvalue['product']['supplier_barcode'];
                            }
                            else
                            {
                              var barcode     =     billvalue['product']['product_system_barcode'];
                            } 
                        
                           product_html += '<tr id="product_' + product_id + '">' +
                                    '<td id="barcodesel_'+product_id+'" name="barcode_sel[]">'+barcode+'</td>'+
                                    '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                                    '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                                    '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                                    '<input value="" type="hidden" id="return_product_id_'+product_id+'" name="return_product_id_[]" class="" >'+
                                    '<input value="'+billvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+

                                    '</td>'+
                                    '<td id="product_name_'+product_id+'" name="product_name[]">'+billvalue['product']['product_name']+'</td>';
                                      product_html += feature_show_val;
                                      product_html += batchhtml;
                                    product_html += '<td id="sellingmrp_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrp_'+product_id+'" class="floating-input tarifform-control number" value="'+mrp+'" readonly tabindex="-1">'+
                                    '<input type="hidden" id="pricemasterid_'+product_id+'" name="pricemasterid[]"  value="'+billvalue['price_master_id']+'" >'+
                                     '<input type="hidden" id="inwardids_'+product_id+'" name="inwardids[]"  value="'+tinwardids+'" >'+
                                    '<input type="hidden" id="inwardqtys_'+product_id+'" name="inwardqtys[]"  value="'+tinwardqtys+'" >'+
                                    '</td>'+
                                    '<td id="sellingpricewgst_'+product_id+'" class="billing_calculation_case">'+
                                    '<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" value="'+showsellingprice+'" readonly tabindex="-1">'+
                                    '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]"  value="'+sellingprice+'" >'+
                                    '</td>'+                  
                                    '<td id="sellingqty_'+product_id+'">'+
                                    '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+qty+'" name="qty[]" onkeyup="return calqty(this);">'+
                                    '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="'+qty+'" name="oldqty[]">'+
                                    '</td>'+       
                                    '<td id="sellingdiscountper_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['discount_percent']+'" name="proddiscper[]" onkeyup="return caldiscountper(this);" readonly tabindex="-1">'+
                                    '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overalldiscount_percent']+'" name="proddiscper[]" style="display:none;">'+'</td>'+
                                    '<td id="sellingdiscountamt_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+totalmrpdiscount+'" readonly tabindex="-1">'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" value="'+totaldiscount+'" name="proddiscamt[]" onkeyup="return caldiscountamt(this);" readonly tabindex="-1" style="display:none;">'+
                                    '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="'+proddiscountamt+'" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+mrpproddiscountamt+'" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                                    '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                                    '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                                    '<td id="sprodgstper_'+product_id+'" style="text-align:right !important;display:none;">'+billvalue['igst_percent']+'</td>'+
                                    '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important;display:none;">'+sgstamount+'</td>'+
                                    '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                                    '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

                                    '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                                    '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;" class="billing_calculation_case">'+stotal_amount+'</td>'+
                                    '<td onclick="removerow(' + product_id + ');"><i class="fa fa-close"></i></td>' +
                                    '</tr>';
                                }
                            }
                             if(productcount == 1)
                             {
                                    if(billvalue['product_type']==2)
                                    {

                                            chargecount   = 1;
                                            var cproduct_id              =   billvalue['product_id'];
                                            var chargesamt               =   billvalue['mrp']- billvalue['totalreccharges'];
                                            var maxgst                   =   billvalue['igst_percent'];
                                            

                                            var cprodgstamt               =    Number(chargesamt)   * Number(maxgst) / 100;
                                            var ctotalamt                 =    Number(chargesamt) + Number(cprodgstamt);

                                            var cshowigst_amount          =   Number(cprodgstamt).toFixed(2);
                                            var ctotal_amount             =    Number(ctotalamt).toFixed(2);

                                            chargeshtml +=   '<tr id="charges_'+cproduct_id+'">'+
                                        '<td id="chargesname_'+cproduct_id+'" style="text-align:left !important;">'+
                                        '<input value="" type="hidden" id="creturn_product_id_'+cproduct_id+'" name="creturn_product_id_[]" class="" >'+
                                        '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="csales_product_id_'+cproduct_id+'" name="csales_product_id_[]" class="" >'+
                                        '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                                        '<input value="'+cproduct_id+'" type="hidden" id="cproductid_'+cproduct_id+'" name="cproductid[]" class="">'+billvalue['product']['product_name']+'</td>'+                                                
                                        '<td class="bold"  id="chargesamtdetails_'+cproduct_id+'">'+
                                            '<input type="text" id="chargesamt_'+cproduct_id+'" onkeyup="return addcharges(this);" class="floating-input tarifform-control number" name="chargesamt[]" value="'+chargesamt+'" readonly style="background:#f3f9ec !important;" tabindex="-1">'+
                                            '<input type="hidden" id="ochargesamt_'+cproduct_id+'" name="ochargesamt[]" value="'+chargesamt+'">'+
                                            '<input type="hidden" id="cqty_'+cproduct_id+'" class="floating-input tarifform-control number" name="cqty[]" value="'+billvalue['qty']+'">'+
                                        '</td>'+                                              
                                        '<td id="csprodgstper_'+cproduct_id+'" style="text-align:right !important;">'+billvalue['igst_percent']+'</td>'+
                                        '<td id="csprodgstamt_'+cproduct_id+'" style="text-align:right !important;">'+cshowigst_amount+'</td>'+
                                        '<td id="cprodgstper_'+cproduct_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                                        '<td id="cprodgstamt_'+cproduct_id+'" style="display:none;" name="prodgstamt[]">'+cprodgstamt+'</td>'+
                                        '<td id="ctotalamount_'+cproduct_id+'" style="font-weight:bold;display:none;" class="ctotalamount" name="ctotalamount[]">'+ctotalamt+'</td>'+
                                        '<td id="cstotalamount_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+ctotal_amount+'</td>'+
                                        '<td id="cstotalamountdetails_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+'<input type="text" id="oldchargesamt_'+cproduct_id+'" value="'+ctotal_amount+'" class="floating-input tarifform-control number " style="display:none;">'+'<input type="text" id="creturntotalamount_'+cproduct_id+'" value="0" class="floating-input tarifform-control number chargesamt" onkeyup="return taddcharges(this);" style="width:50%;font-weight:bold;">'+'</td>'+
                                    '</tr>';

                                    
                                                   
                                    }
                                }
                                                                


                       });
                        

                       if(productcount == 0)
                       {
                           product_html += '<tr>' +
                                    '<td colspan="11" style="text-align:left !important;"><b style="color:#000;">No Products to return</b></td>'+
                                    '</tr>';
                             chargeshtml += '<tr>' +
                            '<td colspan="5" style="text-align:left !important;"><b style="color:#000;">No Charges Amount to return</b></td>'+
                            '</tr>';
                           
                            $('#productsearch').attr('readonly', true); 


                       }
                       if(chargecount == 0 && productcount == 1)
                       {
                          
                             chargeshtml += '<tr>' +
                            '<td colspan="5" style="text-align:left !important;"><b style="color:#000;">No Charges Amount to return</b></td>'+
                            '</tr>';
                            $('#productsearch').attr('readonly', true); 

                       }
                       
                       $(".odd").hide();
                       $("#sproduct_detail_record").append(product_html);
                       $('#productsearch').attr('readonly', true); 
                       if(Number(bill_calculation)==1)
                     {
                        $('.billing_calculation_case').show();
                     }
                     else
                     {
                        $('.billing_calculation_case').hide();
                     }
                       var srr = 0;
                       $('.totqty').each(function(e){
                            if($(this).val()!='')
                            {
                                srr++;
                            }
                       });
                       $('.showtitems').show();
                       $('.titems').html(srr);
                       $("#charges_record").append(chargeshtml);
                       $('.loaderContainer').hide();
                   }
                   //end of fillup product detail row
                 
                              totalcalculation();
                   
                    
                
                }
                else if(bill_data['Success'] == "Null")
                {
                        $("#searchbilldata").prop('disabled', false);
                        $('.loaderContainer').hide();
                        toastr.error(bill_data['Message']);
                }
               else
                {
                        $("#searchbilldata").prop('disabled', false);
                        $('.loaderContainer').hide();
                        toastr.error(bill_data['Message']);
                }

              
           });
    
}
function consignpopreturndata(obj)
{

    var id                       =     $(obj).attr('id');
    var salesid                  =     $(obj).attr('id').split('returnbillno_')[1];
    var billno                   =     $('#rbillno_'+salesid).val();

    $('#returnbillno_'+salesid).attr("disabled", "disabled");
   
            $('.loaderContainer').show();
               var type = "POST";
               var url = 'returnconsignbill_data';
               var dataType = "";
               var data = {
                   "bill_no" : billno,
               }
           callroute(url,type,dataType,data,function(data)
           {

                var bill_data = JSON.parse(data,true);
                 $("#addreturnpopup").modal('hide');

                if(bill_data['Success'] == "True")
                {
                    $('#searchbilldata').prop('disabled', true);
                    var bill_detail         = bill_data['Data'];
                    var bill_productdetail  = bill_data['ProductData'];

                    var customer_name = '';
                    var customer_mobile ='';
                    var customer_email='';
                    var cusreference='';

                    console.log(bill_detail['customer']);
                    
                      if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_name']!= null && bill_detail['customer']['customer_name']!= undefined)
                      {
                                $('.customerdata').show();
                                customer_name  =  bill_detail['customer']['customer_name'];
                      }
                      
                      if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_mobile']!= null && bill_detail['customer']['customer_mobile']!= undefined)
                      {
                                customer_mobile  =  bill_detail['customer']['customer_mobile'];
                      }
                     
                     if(bill_detail['customer']!= null && bill_detail['customer']!= '' && bill_detail['customer']['customer_email']!= null && bill_detail['customer']['customer_email']!= undefined)
                      {
                                customer_email  =  bill_detail['customer']['customer_email'];
                      }
                     
                      if(bill_detail['reference']!= null && bill_detail['reference']!= '' && bill_detail['reference']['reference_name']!= null && bill_detail['reference']['reference_name']!= undefined)
                      {
                                cusreference  =  bill_detail['reference']['reference_name'];
                      }


                       $('#ccustomer_id').val(bill_detail['customer_id']);
                       $("#sales_bill_id").val(bill_detail['sales_bill_id']);
                       //$("#invoice_date").val(bill_detail['bill_date']);
                       $("#invoice_no").val(bill_detail['bill_no']);
                       $("#discount_percent").val(bill_detail['discount_percent']);
                       $("#discount_amount").val(bill_detail['discount_amount']);
                       $("#roomwisediscount_amount").val(bill_detail['productwise_discounttotal']);

                        $("#customer_name").val(customer_name);
                        $("#customer_mobile").val(customer_mobile);
                        $("#customer_email").val(customer_email);
                        $("#refname").val(cusreference);


                 
                    

          
                var productcount  = 0;
                var chargecount  = 0;

                // console.log(bill_productdetail);
                   
                if(bill_productdetail != 'undefined' && bill_productdetail != '')
               {

                   var product_html = '';   
                    var pcount    = 0;
                    var sellingprice  = 0;
                    var stock = 0;
                    var pricehtml = '';  
                    var chargeshtml = ''; 
                      
                   $.each(bill_productdetail,function (billkey,billvalue)
                   {
                        
                       if(billvalue['product_type']==1)
                       {

                                var rinwardids      =     (billvalue['inwardids'].slice(0,-1)).split(',');
                                var rinwardqtys     =     (billvalue['inwardqtys'].slice(0,-1)).split(',');
                                var tinwardids      =      '';
                                var tinwardqtys     =      '';
                                var totiqty         =      '';
                                var totalreturnqty  =      '';

                               // console.log(billvalue['return_product_detail']);

                 if(billvalue['return_product_detail'] != 'undefined' && billvalue['return_product_detail'] != '')
                {               

                    $.each(rinwardids,function (ridkey,ridvalue)
                    {
                        
                            var totiqty         =      '';
                              $.each(billvalue['return_product_detail'],function (rbillkey,rbillvalue)
                              {
                                 
                                    
                                    var iids             =     (rbillvalue['inwardids'].slice(0,-1)).split(',');
                                    var iqtys            =     (rbillvalue['inwardqtys'].slice(0,-1)).split(',');
                                       
                                            //console.log(ridvalue);
                                              
                                            $.each(iids,function (iidkey,iidvalue)
                                            {
                                                if(ridvalue == iidvalue)
                                                {
                                                    totiqty  =  Number(totiqty) + Number(iqtys[iidkey]);
                                                }
                                                
                                            })
                                            //console.log(totiqty);
                                           

                                           
                                })
                                            if(totiqty!='')
                                            {
                                                if(rinwardqtys[ridkey] != totiqty)
                                                {
                                                    // console.log('aaa');
                                                     tinwardids     +=     ridvalue+',';
                                                     tinwardqtys    +=     (rinwardqtys[ridkey]-totiqty)+',';
                                                }
                                            }
                            
                           
                            
                       })
                 }

                else
                {
                     tinwardids     +=     billvalue['inwardids'];
                     tinwardqtys    +=     billvalue['inwardqtys'];
                 }


                                var totalusedqty    =   Number(billvalue['totalbillqty']) + Number(billvalue['totalreturnqty']);
                               if(Number(billvalue['qty'])==Number(totalusedqty))
                               {

                               }
                               else
                               {
                                        productcount =  1;
                                        var qty                         =   billvalue['qty'] - billvalue['totalreturnqty'] - billvalue['totalbillqty'];

                                        var product_id                  =   billvalue['price_master_id'];

                                        var sellingprice                =   billvalue['sellingprice_before_discount'];
                                        
                                        var discount_percent            =   billvalue['discount_percent'];
                                        var overalldiscount_percent     =   billvalue['overalldiscount_percent'];
                                        var gst_percent                 =   billvalue['igst_percent'];

                                        var totalmrpdiscount            =   (Number(billvalue['mrp']) * Number(qty)) * Number(discount_percent) / 100;

                                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                        var sellingdiscount              =    (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                                        var gst_amount                   =    (Number(sellingprice-sellingdiscount) * Number(gst_percent) / 100).toFixed(4);

                                        var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                                        var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                                        var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                                        
                                        var totalgst                     =      Number(gst_amount) * Number(qty);


                                        var sellingwithgst                =      Number(discountedamt) + Number(totalgst);



                                      var totalsellingwgst             =     discountedamt;


                                      var mrpproddiscountamt              =     ((Number(sellingwithgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
                                  
                                      
                                      var proddiscountamt              =     ((Number(totalsellingwgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
                                      var totalproddiscountamt         =     Number(proddiscountamt)

                                      var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                                       
                                        
                                        var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                                        
                                       
                                        var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
                                        var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);




                                        var showsellingprice              =   Number(billvalue['sellingprice_before_discount']).toFixed(2);
                                        var showigst_amount               =   Number(billvalue['igst_amount']).toFixed(2);
                                        var mrp                           =    Number(billvalue['mrp']).toFixed(2);
                                        var total_amount                  =    Number(total_amount).toFixed(4);
                                        var stotal_amount                 =    Number(total_amount).toFixed(2);

                                         var feature_show_val = "";
                                        if(bill_show_dynamic_feature != '')
                                        {
                                            var feature = bill_show_dynamic_feature.split(',');

                                            $.each(feature,function(fea_key,fea_val)
                                            {
                                                var feature_name = '';                               

                                                if(typeof(billvalue['product'][fea_val]) != "undefined" && billvalue['product'][fea_val] !== null) {

                                                    feature_name = billvalue['product'][fea_val];
                                                    //console.log(feature_name);
                                                }

                                                feature_show_val += '<td>' + feature_name + '</td>';
                                            })
                                        }

                         if(bill_data['Billtype']==3)
                          {
                            var batchhtml   =   '<td id="batchno_'+product_id+'">'+billvalue['batchprice_master']['batch_no']+'</td>';
                          } 
                          else
                          {
                            var batchhtml  = '';
                          }    
                          if(billvalue['product']['supplier_barcode']!='' && billvalue['product']['supplier_barcode']!=null)
                            {
                              var barcode     =     billvalue['product']['supplier_barcode'];
                            }
                            else
                            {
                              var barcode     =     billvalue['product']['product_system_barcode'];
                            } 
                        
                           product_html += '<tr id="product_' + product_id + '">' +
                                    '<td id="barcodesel_'+product_id+'" name="barcode_sel[]">'+barcode+'</td>'+
                                    '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                                    '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                                    '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                                    '<input value="" type="hidden" id="return_product_id_'+product_id+'" name="return_product_id_[]" class="" >'+
                                    '<input value="'+billvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+

                                    '</td>'+
                                    '<td id="product_name_'+product_id+'" name="product_name[]">'+billvalue['product']['product_name']+'</td>';
                                      product_html += feature_show_val;
                                      product_html += batchhtml;
                                    product_html += '<td id="sellingmrp_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrp_'+product_id+'" class="floating-input tarifform-control number" value="'+mrp+'" readonly tabindex="-1">'+
                                    '<input type="hidden" id="pricemasterid_'+product_id+'" name="pricemasterid[]"  value="'+billvalue['price_master_id']+'" >'+
                                     '<input type="hidden" id="inwardids_'+product_id+'" name="inwardids[]"  value="'+tinwardids+'" >'+
                                    '<input type="hidden" id="inwardqtys_'+product_id+'" name="inwardqtys[]"  value="'+tinwardqtys+'" >'+
                                    '</td>'+
                                    '<td id="sellingpricewgst_'+product_id+'" class="billing_calculation_case">'+
                                    '<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" value="'+showsellingprice+'" readonly tabindex="-1">'+
                                    '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]"  value="'+sellingprice+'" >'+
                                    '</td>'+                  
                                    '<td id="sellingqty_'+product_id+'">'+
                                    '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+qty+'" name="qty[]" onkeyup="return calqty(this);">'+
                                    '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="'+qty+'" name="oldqty[]">'+
                                    '</td>'+       
                                    '<td id="sellingdiscountper_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['discount_percent']+'" name="proddiscper[]" onkeyup="return caldiscountper(this);" readonly tabindex="-1">'+
                                    '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overalldiscount_percent']+'" name="proddiscper[]" style="display:none;">'+'</td>'+
                                    '<td id="sellingdiscountamt_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+totalmrpdiscount+'" readonly tabindex="-1">'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" value="'+totaldiscount+'" name="proddiscamt[]" onkeyup="return caldiscountamt(this);" readonly tabindex="-1" style="display:none;">'+
                                    '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="'+proddiscountamt+'" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+mrpproddiscountamt+'" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                                    '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                                    '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                                    '<td id="sprodgstper_'+product_id+'" style="text-align:right !important;display:none;">'+billvalue['igst_percent']+'</td>'+
                                    '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important;display:none;">'+sgstamount+'</td>'+
                                    '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                                    '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

                                    '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                                    '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;" class="billing_calculation_case">'+stotal_amount+'</td>'+
                                    '<td onclick="removerow(' + product_id + ');"><i class="fa fa-close"></i></td>' +
                                    '</tr>';
                                }
                            }
                             if(productcount == 1)
                             {
                                    if(billvalue['product_type']==2)
                                    {

                                            chargecount   = 1;
                                            var cproduct_id              =   billvalue['product_id'];
                                            var chargesamt               =   billvalue['mrp']- billvalue['totalreccharges'];
                                            var maxgst                   =   billvalue['igst_percent'];
                                            

                                            var cprodgstamt               =    Number(chargesamt)   * Number(maxgst) / 100;
                                            var ctotalamt                 =    Number(chargesamt) + Number(cprodgstamt);

                                            var cshowigst_amount          =   Number(cprodgstamt).toFixed(2);
                                            var ctotal_amount             =    Number(ctotalamt).toFixed(2);

                                            chargeshtml +=   '<tr id="charges_'+cproduct_id+'">'+
                                        '<td id="chargesname_'+cproduct_id+'" style="text-align:left !important;">'+
                                        '<input value="" type="hidden" id="creturn_product_id_'+cproduct_id+'" name="creturn_product_id_[]" class="" >'+
                                        '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="csales_product_id_'+cproduct_id+'" name="csales_product_id_[]" class="" >'+
                                        '<input value="" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                                        '<input value="'+cproduct_id+'" type="hidden" id="cproductid_'+cproduct_id+'" name="cproductid[]" class="">'+billvalue['product']['product_name']+'</td>'+                                                
                                        '<td class="bold"  id="chargesamtdetails_'+cproduct_id+'">'+
                                            '<input type="text" id="chargesamt_'+cproduct_id+'" onkeyup="return addcharges(this);" class="floating-input tarifform-control number" name="chargesamt[]" value="'+chargesamt+'" readonly style="background:#f3f9ec !important;" tabindex="-1">'+
                                            '<input type="hidden" id="ochargesamt_'+cproduct_id+'" name="ochargesamt[]" value="'+chargesamt+'">'+
                                            '<input type="hidden" id="cqty_'+cproduct_id+'" class="floating-input tarifform-control number" name="cqty[]" value="'+billvalue['qty']+'">'+
                                        '</td>'+                                              
                                        '<td id="csprodgstper_'+cproduct_id+'" style="text-align:right !important;">'+billvalue['igst_percent']+'</td>'+
                                        '<td id="csprodgstamt_'+cproduct_id+'" style="text-align:right !important;">'+cshowigst_amount+'</td>'+
                                        '<td id="cprodgstper_'+cproduct_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                                        '<td id="cprodgstamt_'+cproduct_id+'" style="display:none;" name="prodgstamt[]">'+cprodgstamt+'</td>'+
                                        '<td id="ctotalamount_'+cproduct_id+'" style="font-weight:bold;display:none;" class="ctotalamount" name="ctotalamount[]">'+ctotalamt+'</td>'+
                                        '<td id="cstotalamount_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+ctotal_amount+'</td>'+
                                        '<td id="cstotalamountdetails_'+cproduct_id+'" style="font-weight:bold;text-align:right !important;">'+'<input type="text" id="oldchargesamt_'+cproduct_id+'" value="'+ctotal_amount+'" class="floating-input tarifform-control number " style="display:none;">'+'<input type="text" id="creturntotalamount_'+cproduct_id+'" value="0" class="floating-input tarifform-control number chargesamt" onkeyup="return taddcharges(this);" style="width:50%;font-weight:bold;">'+'</td>'+
                                    '</tr>';

                                    
                                                   
                                    }
                                }
                                                                


                       });
                        

                       if(productcount == 0)
                       {
                           product_html += '<tr>' +
                                    '<td colspan="11" style="text-align:left !important;"><b style="color:#000;">No Products to return</b></td>'+
                                    '</tr>';
                             chargeshtml += '<tr>' +
                            '<td colspan="5" style="text-align:left !important;"><b style="color:#000;">No Charges Amount to return</b></td>'+
                            '</tr>';
                           
                            $('#productsearch').attr('readonly', true); 


                       }
                       if(chargecount == 0 && productcount == 1)
                       {
                          
                             chargeshtml += '<tr>' +
                            '<td colspan="5" style="text-align:left !important;"><b style="color:#000;">No Charges Amount to return</b></td>'+
                            '</tr>';
                            $('#productsearch').attr('readonly', true); 

                       }
                       
                       $(".odd").hide();
                       $("#sproduct_detail_record").append(product_html);
                       $('#productsearch').attr('readonly', true); 
                       if(Number(bill_calculation)==1)
                     {
                        $('.billing_calculation_case').show();
                     }
                     else
                     {
                        $('.billing_calculation_case').hide();
                     }
                       var srr = 0;
                       $('.totqty').each(function(e){
                            if($(this).val()!='')
                            {
                                srr++;
                            }
                       });
                       $('.showtitems').show();
                       $('.titems').html(srr);
                       $("#charges_record").append(chargeshtml);
                       $('.loaderContainer').hide();
                   }
                   //end of fillup product detail row
                 
                              totalcalculation();
                   
                    
                
                }
                else if(bill_data['Success'] == "Null")
                {
                        $("#searchbilldata").prop('disabled', false);
                        $('.loaderContainer').hide();
                        toastr.error(bill_data['Message']);
                }
               else
                {
                        $("#searchbilldata").prop('disabled', false);
                        $('.loaderContainer').hide();
                        toastr.error(bill_data['Message']);
                }

              
           });
    
}                         

function restockqty(obj)
{
    var id                        =     $(obj).attr('id');
    var returnid                  =     $(obj).attr('id').split('restock_')[1];
    var restock                   =     $('#restock_'+returnid).val();
    var damage                    =     $('#damage_'+returnid).val();
    var totalreturn               =     $('#returnqty_'+returnid).html();

    
    if(Number(damage)=='')
    {
      damage = 0;
    }
    else
    {
      damage   = damage;
    }
    var typereturn  =    Number(restock)  +   Number(damage);


    if(Number(typereturn) > Number(totalreturn))
    {
        var restockqty    =    Number(totalreturn) - Number(damage);
        $('#damage_'+returnid).val(damage);
        $('#restock_'+returnid).val(restockqty);
    }
    else
    {
         $('#damage_'+returnid).val(damage);
    }
    

}
function damageqty(obj)
{
    var id                        =     $(obj).attr('id');
    var returnid                  =     $(obj).attr('id').split('damage_')[1];
    var restock                   =     $('#restock_'+returnid).val();
    var damage                    =     $('#damage_'+returnid).val();
    var totalreturn               =     $('#returnqty_'+returnid).html();

    if(Number(restock)=='')
    {
      restock = 0;
    }
    else
    {
      restock   = restock;
    }
    var typereturn  =    Number(restock)  +   Number(damage);


    if(Number(typereturn) > Number(totalreturn))
    {
        var damageqty    =    Number(totalreturn) - Number(restock);
        $('#damage_'+returnid).val(damageqty);
        $('#restock_'+returnid).val(restock);
    }
    else
    {
         $('#restock_'+returnid).val(restock);
    }

   

}

function savereturn(obj)
{
 
    var id                        =     $(obj).attr('id');
    var returnid                  =     $(obj).attr('id').split('addreturnproducts_')[1];
    var arrayValue                =     [];
    var return_values             =     {};

    return_values['returnbill_product_id']    =   '';
    return_values['return_product_detail_id'] =   returnid;
    return_values['returnqty']                =   $('#returnqty_'+returnid).html();
    return_values['restockqty']               =   $('#restock_'+returnid).val();
    return_values['damageqty']                =   $('#damage_'+returnid).val();
    return_values['price_master_id']          =   $('#pricemasterid_'+returnid).val();
    return_values['product_id']               =   $('#productid_'+returnid).val();
    return_values['sales_products_detail_id'] =   $('#salesproductid_'+returnid).val();
    return_values['inwardids']                =   $('#inwardids_'+returnid).val();
    return_values['inwardqtys']               =   $('#inwardqtys_'+returnid).val();
    return_values['remarks']                  =   $('#remarks_'+returnid).val();
   

    if(return_values['restockqty']=='' && return_values['restockqty']=='')
    {
        toastr.error('Please Enter Qty to ReStock and Damage');
        $('#restock_'+returnid).focus();
        return false;
    }
    else if(return_values['damageqty']>0 && return_values['remarks']=='')
    {  
            toastr.error('Please mention Remarks for Damage Product');
            $('#remarks_'+returnid).focus();
            return false;
       
    }
    else
    {
        if(confirm("Are You Sure to Restock or add products to Damage List ?")) {

                arrayValue.push(return_values);

                var data = arrayValue;

                //console.log(data);
                //return false;

                var  url = "restock_products";
                var type = "POST";
                var dataType = "";
                callroute(url,type,dataType,data,function (data)
                {
                     var dta = JSON.parse(data);

                        if (dta['Success'] == "True")
                        {
                            toastr.success(dta['Message']);
                            //$("#viewbillform").trigger('reset');
                            var page = $('#hidden_page').val();
                            $('#hidden_page').val(page);
                            var column_name = $('#hidden_column_name').val();
                            var sort_type = $('#hidden_sort_type').val();

                            var query = {};

                            var fetch_data_url = $('#fetch_data_url').val();
                            var tbodyid = $('html').find('.table-responsive').attr('id');
                            fetch_data(fetch_data_url,page, sort_type, column_name, query,tbodyid);

                            //resettable('viewreturn_data','returnproductrecord');

                        } else {
                            toastr.error(dta['Message']);
                        }
                    
                });
            }
            else
            {
                 return false;
            }

        
    }

}

$(document).ready(function(e){

  if(localStorage.getItem('edit_returnbill_record'))
  {
      var edit_data  = localStorage.getItem('edit_returnbill_record');
      
      console.log(edit_data);

      if(edit_data != '' && edit_data != undefined && edit_data != null)
      {
            var customer_address  =  '';
      var customer_gstin  =  '';
      var customer_stateid  =  '';
      var customer_name = '';
      var customer_mobile = '';
      var customer_email='';
      var customer_ref='';
      var customer_duedays ='';

      $('#sproduct_detail_record').html('');
       var edit_billdata = JSON.parse(edit_data);
      
      if(edit_billdata['customer_address_detail']!= null && edit_billdata['customer_address_detail']!= '' && edit_billdata['customer_address_detail']['customer_address']!= null && edit_billdata['customer_address_detail']['customer_address']!= undefined)
      {
                customer_address  =  edit_billdata['customer_address_detail']['customer_address'];
      }
      if(edit_billdata['customer_address_detail']!= null && edit_billdata['customer_address_detail']!= '' && edit_billdata['customer_address_detail']['customer_gstin']!= null && edit_billdata['customer_address_detail']['customer_gstin']!= undefined)
      {
                customer_gstin  =  edit_billdata['customer_address_detail']['customer_gstin'];
      }
      if(edit_billdata['customer_address_detail']!= null && edit_billdata['customer_address_detail']!= '' && edit_billdata['customer_address_detail']['state_id']!= null && edit_billdata['customer_address_detail']['state_id']!= undefined)
      {
                customer_stateid  =  edit_billdata['customer_address_detail']['state_id'];
      }
      if(edit_billdata['customer']!= null && edit_billdata['customer']!= '' && edit_billdata['customer']['customer_name']!= null && edit_billdata['customer']['customer_name']!= undefined)
      {
                customer_name  =  edit_billdata['customer']['customer_name'];
      }
      if(edit_billdata['customer']!= null && edit_billdata['customer']!= '' && edit_billdata['customer']['customer_mobile']!= null && edit_billdata['customer']['customer_mobile']!= undefined)
      {
                customer_mobile  =  edit_billdata['customer']['customer_mobile'];
      }
     if(edit_billdata['customer']!= null && edit_billdata['customer']!= '' && edit_billdata['customer']['customer_email']!= null && edit_billdata['customer']['customer_email']!= undefined)
      {
                customer_email  =  edit_billdata['customer']['customer_email'];
      }
      if(edit_billdata['reference']!= null && edit_billdata['reference']!= '' && edit_billdata['reference']['reference_name']!= null && edit_billdata['reference']['reference_name']!= undefined)
      {
                customer_ref  =  edit_billdata['reference']['reference_name'];
      }
      if(edit_billdata['customer']!= null && edit_billdata['customer']!= '' && edit_billdata['customer']['outstanding_duedays']!= '' && edit_billdata['customer']['outstanding_duedays']!= 0)
      {
                customer_duedays  =  edit_billdata['customer']['outstanding_duedays'];
      }

       $('.customerdata').show();
       $('#ccustomer_id').val(edit_billdata['customer_id']);
       $("#sales_bill_id").val(edit_billdata['sales_bill_id']);
       //$("#invoice_date").val(edit_billdata['bill_date']);
       $("#invoice_no").val(edit_billdata['bill_no']);
       $("#invoice_ref").val(edit_billdata['bill_reference']);
       $("#discount_percent").val(edit_billdata['discount_percent']);
       $("#discount_amount").val(edit_billdata['discount_amount']);
       $("#roomwisediscount_amount").val(edit_billdata['productwise_discounttotal']);

        $("#customer_name").val(customer_name);
        $("#customer_mobile").val(customer_mobile);
        $("#customer_email").val(customer_email);
        $("#customer_address").val(customer_address);
        $("#customer_gstin").val(customer_gstin);
        $("#customer_state_id").val(customer_stateid);
        $("#refname").val(customer_ref);

        
    if(edit_billdata['creditnote_payment']!='' && edit_billdata['creditnote_payment'] != 'undefined' && edit_billdata['creditnote_payment'] != null)
     {
         $("#editcreditnotepaymentid").val(edit_billdata['creditnote_payment']['creditnote_payment_id']);
         $("#editcreditnoteid").val(edit_billdata['creditnote_payment']['customer_creditnote_id']);
         $("#creditnote_amount").val(edit_billdata['creditnote_payment']['creditnote_amount']);
         $("#issue_amount").val(edit_billdata['creditnote_payment']['used_amount']);
         $("#creditnoteno").val(edit_billdata['creditnote_payment']['customer_creditnote']['creditnote_no']);
         $("#creditnote_id").val(edit_billdata['creditnote_payment']['customer_creditnote_id']);
         $("#editcreditnoteamount").val(edit_billdata['creditnote_payment']['used_amount']);
         
     }


     if(edit_billdata['customer_creditaccount']!='' && edit_billdata['customer_creditaccount'] != 'undefined' && edit_billdata['customer_creditaccount'] != null)
     {

        $("#creditaccountid").val(edit_billdata['customer_creditaccount']['customer_creditaccount_id']);

        if(edit_billdata['customer_creditaccount']['credit_amount'] == edit_billdata['customer_creditaccount']['balance_amount'])
        {
            $("#creditbalcheck").val(0);
            $('#creditbalance').val(edit_billdata['customer_creditaccount']['credit_amount']);
            
        }
        else
        {
            $("#creditbalcheck").val(1);
            $('#creditbalance').val(edit_billdata['customer_creditaccount']['credit_amount']);
        }
     }
       

       if(edit_billdata['return_bill_payment'] != 'undefined' && edit_billdata['return_bill_payment'] != '')
       {
           $.each(edit_billdata['return_bill_payment'],function (paymentkey,paymentvalue)
           {

            if(paymentvalue['payment_method_id'] != '')
               {

                        if(paymentvalue['payment_method'][0]['payment_method_id'] == 6)
                        {
                            $('#duedays').val(customer_duedays);
                            $('#duedate').val(paymentvalue['bankname']);
                        }
                        $("#"+paymentvalue['payment_method'][0]['html_id']).val(paymentvalue['total_bill_amount']);
                        $("#sales_payment_detail"+paymentvalue['payment_method'][0]['payment_method_id']).val(paymentvalue['sales_bill_payment_detail_id']);
                       
               }
              
           });
       }


//console.log(edit_billdata['sales_product_detail']);
       //fillup product detail row
       if(edit_billdata['return_product_detail'] != 'undefined' && edit_billdata['return_product_detail'] != '')
       {

           var product_html = '';   
            var pcount    = 0;
            var sellingprice  = 0;
            var stock = 0;
                  
       $.each(edit_billdata['return_product_detail'],function (billkey,billvalue)
       {
            if(billvalue['product_type'] == 1)
            {
               
               var pricehtml = '';  
                    
                            // pricehtml += '<option value='+billvalue['price_master_id']+' selected>'+billvalue['batchprice_master']['offer_price']+'</option>';
                            // stock     =   billvalue['batchprice_master']['product_qty'];
                    
                        pcount++;
                   
                            var product_id                  =   billvalue['price_master_id'];

                            var sellingprice                =   billvalue['sellingprice_before_discount'];
                                        
                            var discount_percent            =   billvalue['discount_percent'];
                            var overalldiscount_percent     =   billvalue['overalldiscount_percent'];
                            var gst_percent                 =   billvalue['igst_percent'];

                            var totalmrpdiscount            =   (Number(billvalue['mrp']) * Number(qty)) * Number(discount_percent) / 100;

                            var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                            var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                            var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_percent) / 100).toFixed(4);

                            var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                            var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                            var mrp                          =     Number(totaldiscount) + Number(gst_amount);

                            var totalgst                     =      Number(gst_amount) * Number(qty);


                            var sellingwithgst                =      Number(discountedamt) + Number(totalgst);



                            var totalsellingwgst             =     discountedamt;


                            var mrpproddiscountamt              =     ((Number(sellingwithgst) * Number(overalldiscount_percent)) / 100).toFixed(4);


                            var proddiscountamt              =     ((Number(totalsellingwgst) * Number(overalldiscount_percent)) / 100).toFixed(4);
                            var totalproddiscountamt         =     Number(proddiscountamt)

                            var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);



                            var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);


                            var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
                            var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);




                            var showsellingprice              =   Number(billvalue['sellingprice_before_discount']).toFixed(2);
                            var showigst_amount               =   Number(billvalue['igst_amount']).toFixed(2);
                            var mrp                           =    Number(billvalue['mrp']).toFixed(2);
                            var total_amount                  =    Number(total_amount).toFixed(4);
                            var stotal_amount                 =    Number(total_amount).toFixed(2);

                             if(billvalue['product']['supplier_barcode']!='' || billvalue['product']['supplier_barcode']!=null)
                            {
                              var barcode     =     billvalue['product']['supplier_barcode'];
                            }
                            else
                            {
                              var barcode     =     billvalue['product']['product_system_barcode'];
                            }

                            if(billvalue['product']['colour_id']!=null)
                            {
                                colour_name   = billvalue['product']['colour']['colour_name'];
                            }
                            else
                            {
                                colour_name   = '';
                            }

                            if(billvalue['product']['size_id']!=null)
                            {
                                size_name   = billvalue['product']['size']['size_name'];
                            }
                            else
                            {
                                size_name   = '';
                            }

                            if(billvalue['product']['uqc']!=null)
                            {
                                uqc_name   = billvalue['product']['uqc']['uqc_name'];
                            }
                            else
                            {
                                uqc_name   = '';
                            }
            
               product_html += '<tr id="product_' + product_id + '">' +
               '<td class="pt-15 pb-15" id="product_name_'+product_id+'" name="product_name[]"><a id="popupid_'+billvalue['product_id']+'" onclick="return productdetailpopup(this);"><span class="informative">'+barcode+'</span></a></td>'+ 
                        '<td class="leftAlign"><a id="popupid_'+billvalue['product_id']+'" onclick="return productdetailpopup(this);">'+billvalue['product']['product_name']+'</a></td>'+
                        '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                        '<input value="'+billvalue['product']['product_system_barcode']+'" type="hidden" id="barcodesel_'+product_id+'" name="barcode_sel[]">'+
                        '<input value="'+billvalue['sales_products_detail_id']+'" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                        '<input value="'+billvalue['consign_products_detail_id']+'" type="hidden" id="consign_product_id_'+product_id+'" name="consign_product_id[]" class="" >'+
                        '<input value="'+billvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+

                        '</td>'+
                       '<td id="batchno_'+product_id+'"></td>'+
                        '<td id="stock_'+product_id+'" name="stock[]">'+stock+'</td>'+ 
                        
                        '<td id="sellingmrp_'+product_id+'">'+'<select name="mrp[]" id="mrp_'+product_id+'" style="border-radius:0.2rem;border-color:#ced4da;width:100%;" onchange="return filterprice_detail(this);">'+pricehtml+'</select>'+
                        '<input type="hidden" id="oldpricemasterid_'+product_id+'" name="oldpricemasterid[]"  value="'+billvalue['price_master_id']+'" >'+
                        '<input type="hidden" id="inwardids'+product_id+'" name="inwardids[]"  value="'+billvalue['inwardids']+'" >'+
                        '<input type="hidden" id="inwardqtys'+product_id+'" name="inwardqtys[]"  value="'+billvalue['inwardqtys']+'" >'+
                        '</td>'+
                        '<td id="sellingpricewgst_'+product_id+'">'+
                        '<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" value="'+showsellingprice+'" readonly>'+
                        '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]"  value="'+billvalue['sellingprice_before_discount']+'" >'+
                        '</td>'+                  
                        '<td id="sellingqty_'+product_id+'">'+
                        '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+billvalue['qty']+'" name="qty[]" onkeyup="return calqty(this);">'+
                        '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['qty']+'" name="oldqty[]">'+
                        '</td>'+       
                        '<td id="sellingdiscountper_'+product_id+'">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['discount_percent']+'" name="proddiscper[]" onkeyup="return caldiscountper(this);">'+
                        '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overalldiscount_percent']+'" name="proddiscper[]" style="display:none;">'+'</td>'+
                        '<td id="sellingdiscountamt_'+product_id+'">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number mrppproddiscamt"  value="'+billvalue['mrpdiscount_amount']+'" onchange="return mrpcaldiscountamt(this);">'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" value="'+billvalue['discount_amount']+'" name="proddiscamt[]" onkeyup="return caldiscountamt(this);" style="display:none;">'+
                        '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="'+billvalue['overalldiscount_amount']+'" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overallmrpdiscount_amount']+'" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                        '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                        '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                        '<td id="sprodgstper_'+product_id+'" style="text-align:right !important; display:none;" class="sprodgstper">'+billvalue['igst_percent']+'</td>'+
                        '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important; display:none;">'+showigst_amount+'</td>'+
                        '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                        '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+billvalue['igst_amount']+'</td>'+

                        '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+billvalue['total_amount']+'</td>'+
                        '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;">'+showtotalamount+'</td>'+
                        '<td onclick="editremoverow(' + product_id + ');"><i class="fa fa-close"></i></td>' +
                        '</tr>';
                                            
                }
                if(billvalue['product_type'] == 2)
                {
                        var cproduct_id                  =   billvalue['product_id'];
                        $('#csales_product_id_'+cproduct_id).val(billvalue['sales_products_detail_id']);
                        $('#cproductid_'+cproduct_id).val(billvalue['product_id']);
                        $('#chargesamt_'+cproduct_id).val(billvalue['mrp']);
                        $('#csprodgstper_'+cproduct_id).html(Number(billvalue['igst_percent']).toFixed(2));
                        $('#csprodgstamt_'+cproduct_id).html(Number(billvalue['igst_amount']).toFixed(2));
                        $('#cprodgstper_'+cproduct_id).html(Number(billvalue['igst_percent']).toFixed(4));
                        $('#cprodgstamt_'+cproduct_id).html(Number(billvalue['igst_amount']).toFixed(4));
                        $('#ctotalamount_'+cproduct_id).html(Number(billvalue['total_amount']).toFixed(4));
                        $('#cstotalamount_'+cproduct_id).html(Number(billvalue['total_amount']).toFixed(2));
                        

                }


        });
            

           
           $(".odd").hide();
           $("#sproduct_detail_record").append(product_html);
                var srrno  = 0;
              $('.totqty').each(function(e){
                  var ssrno  = 0;
                  if($(this).val()!='')
                  {
                      srrno++;
                  }
              });
             
              $('.titems').html(srrno); 

   }
       //end of fillup product detail row
       totalcalculation();
      }

  }

});

$(document).ready(function () {
    localStorage.removeItem('edit_returnbill_record');
})
$("#addressplus").click(function ()
{
    $("#addressplus").prop('disabled',true);

    var id = $(this).attr('data-id');
    id++;
    $(this).attr('data-id',id);

     var state_block = '';
     var country_block = '';
     $.each(JSON.parse(state),function (key,value)
    {
        state_block += '<option value="'+value['state_id']+'">'+value['state_name']+'</option>';
    });
      $.each(JSON.parse(country),function (key,value)
    {
        country_block += '<option value="'+value['country_id']+'">'+value['country_name']+'</option>';
    });

    var html_add= '';

    html_add += '<div class="row" id="new_address_'+id+'">' +
    
        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Flat no.,Building,Street etc.</label>' +
                            
                            '<input type="text" maxlength="100" name="customer_office_address" id="customer_office_address" value=""  class="form-control form-inputtext" placeholder="">' +
                        '</div>'+

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Area</label>' +
                           '<input type="text" maxlength="100" name="customer_office_area" id="customer_office_area" value=""  class="form-control form-inputtext" placeholder="">' +
                        '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">City / Town</label>' +
                            '<input type="text" maxlength="100" name="customer_office_city" id="customer_office_city" value=""  class="form-control form-inputtext" placeholder="">' +
                        '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Pin / Zip Code</label>' +
                            '<input type="text" maxlength="20" name="customer_office_pincode" id="customer_office_pincode" value=""  class="form-control form-inputtext" placeholder="">' +
                       '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">State / Region</label>' +
                            '<select name="customer_office_state_id" id="customer_office_state_id" class="form-control form-inputtext">' +
                                '<option value="0">Select State</option>'+state_block+'</select>' +
                       '</div>' +

                        '<div class="col-md-3 same_address">' +
                            '<label class="form-label">Country</label>' +
                            '<select name="customer_office_country_id" id="customer_office_country_id" class="form-control form-inputtext">' +
                                '<option value="">Select Country</option>'+country_block+'</select>' +
                        '</div>' +
                        '<input type="hidden" name="customer_office_address_detail_id" id="customer_office_address_detail_id" class="customer_address_detail_id" autocomplete="off" value="">'+
                        '<div class="col-md-1"><label></label><a id="remove_add_'+id+'" onclick="remove_add_row('+id+');" data-id='+id+'>' +
                        '<i class="fa fa-remove"></i> </a></div> ' +
                        '</div>' ;
                         

    $("#repeat_address").append(html_add);
    $("#addressplus").prop('disabled',false);
});

function remove_add_row(removeid)
{
    $("#new_address_"+removeid).remove();
}