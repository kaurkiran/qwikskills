function edit_consignbill(billid)
{
    var  url = "edit_consignbill";
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
           localStorage.setItem('edit_consignbill_record',JSON.stringify(dta['Data']));

            window.location.href = url;
        }
        
    });
}
function notedit_consignbill(billid)
{
    
     toastr.error("Consignment challan is not editable now. Either its been billed or Cancelled/Returned.");
   
}
$("#billno").typeahead({

    source: function(request, process) {
       $.ajax({
           url: "consignno_search",
           dataType: "json",
           data: {
                search_val: $("#billno").val(),
                term: request.term
            },
           success: function (data) {$("#billno").val()
                    process(data);

                
           }
     });
    },
    
    minLength: 1,
    autoselect:false,
    typeaheadIsFirstItemActive:false,
 
     
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


function viewConsignment(obj){



    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewbill_')[1]; 
    $("#view_bill_type").val(1);
    var data = {'billno':bill_no};
    var url = 'view_consignment_popup';
    var type = "POST";
    var dataType = "";

    callroute(url, type, dataType, data,function (data) 
    {
        $('.rpopup_values').html('');
        $('.popup_values').html('');
        $('.popup_values').html(data);
        $("#addcustomerpopup").modal('show');
    });
}

function viewreturnBill(obj){


    var id                        =     $(obj).attr('id');
    var bill_no                   =     $(obj).attr('id').split('viewreturnbill_')[1]; 
    $("#view_bill_type").val(2);
    var data = {'billno':bill_no};
    var url = 'view_returnconsignment_popup';
    var type = "POST";
    var dataType =  "";

    callroute(url, type, dataType, data,function (data) 
    {
        $('.popup_values').html('');
        $('.rpopup_values').html('');
        $('.rpopup_values').html(data);
        $("#addcustomerpopup").modal('show');
    });
    
}

function deleteconsignbill(obj)
{
    if(confirm("Are You Sure want to delete this Consignment Challan?")) {

         var id                        =     $(obj).attr('id');
         var billid                    =     $(obj).attr('id').split('deletebill_')[1];
        

        if(billid.length > 0)
        {
        var data = {
            "deleted_id": billid
        };
        var url = "consignbill_delete";
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
    }
    else
    {
        return false;
    }
}

//FOR VIEW BILL POPUP
$('#previousrecord').click(function(e){

   
   
    var view_bill_type           =     $('#view_bill_type').val();
    
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


             
                var data = {'billno':billno};
                var url = 'previous_consignment';
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


             
                var data = {'billno':billno};
                var url = 'rprevious_consignment';
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


                var data = {'billno':billno};
                var url = 'next_consignment';
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


                var data = {'billno':billno};
                var url = 'rnext_consignment';
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

function makebill(consignid)
{


    var  url = "makeconsignment_bill";
    var type = "POST";
    var dataType = "";
    var data = {
        'consign_id' : consignid,
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
           localStorage.setItem('make_consignmentbill',JSON.stringify(dta['Data']));

            window.location.href = url;



        }
    });
}
// $('#productsearch').keyup(function(e){

//  if(($('#ccustomer_id').val())=='')
//     {
//          toastr.error("Please Enter Customer Details First !"); 
//          $('#productsearch').val('');
//          return false;
//     }
//     else
//     {
        $('#productsearch').typeahead({

               source: function(request, process) {
               var url = "consignproduct_search";
               var type = "post";
               var dataType = "json";

               if($("#ccustomer_id").val()=='')
               {
                    toastr.error("Please Select Customer First");
                    $("#productsearch").val('')
                    return false;
               }
               else
               {
                  var data = {
                   search_val: $("#productsearch").val(),
                   customer_id: $("#ccustomer_id").val(),
                   term: request.term
                  };
               }
               

               callroute(url, type, dataType, data, function (data) {
                   $("#productsearch").val()

                        objects = [];

                        map = {};
                        var scanned_data = data;
                  if(scanned_data["Success"]=="False")
                  {
                      toastr.error(scanned_data['Message']);
                      $(".productsearcharea .dropdown-menu").html('');
                      $('#productsearch').val('');
                       $(".dropdown-menu").hide();
                      
                  }
                  else
                  {

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

                    
                    var consign_products_detail_id = map[item]['consign_products_detail_id'];

                    consignproductdetail(consign_products_detail_id);
                    $(".productsearcharea .dropdown-menu").html('');
                    $("#productsearch").val('');
                }

            }
      

        });
//   }
// });

function consignproductdetail(consign_products_detail_id)
{

  jQuery.noConflict();
   var columnid   =   columnid;
   var type = "POST";
   var dataType = "";
   var url = 'consignproduct_detail';
   var data = {
       
       "consign_products_detail_id":consign_products_detail_id
   }
   callroute(url,type,dataType,data,function(data)
   {

        var product_data = JSON.parse(data,true);


        if(product_data['Success'] == "True")
        {

            var product_html = '';
            var billvalue  = product_data['Data'][0];

            var skucode = '';
            var pricehtml = '';
            var pcount    = 0;
            var sellingprice  = 0;
            var stock = 0;
            var gst_per = 0;
            var sr  = 1;
            var costprice = 0;
            var modifiedofferprice = 0;

            //console.log(product_detail);
         
                $('.loaderContainer').hide();
                var product_id      = billvalue['consign_products_detail_id'];
                var sales_type      =   $('#sales_type').val();

           

          

            var samerow = 0;
            $("#sproduct_detail_record tr").each(function()
            {
               var row_product_id = $(this).attr('id').split('_')[1];
               if(row_product_id == product_id)
               {
                   var qty = $("#qty_"+product_id).val();
                   var product_qty = ((Number(qty)) + (Number(1)));
                   $("#qty_"+product_id).val(product_qty);
                   samerow = 1;
                    calqty($('#qty_'+product_id));
                   return false;
               }
            });

            if(samerow == 0)
            {
                var srrno  = 0;
                $('.totqty').each(function(e){
                    var ssrno  = 0;
                    if($(this).val()!='')
                    {
                        srrno++;
                    }
                });
                sr  =  sr + srrno;

                if(Number(sr)==1)
                {
                  $('.plural').html('Item');
                }
                else if(Number(sr)>1)
                {
                  $('.plural').html('Items');
                }

                $('.titems').html(sr);
                $('#consign_bill_id').val(billvalue['consign_bill_id']); 
                     
                 var product_html = '';   
                var pcount    = 0;
                var sellingprice  = 0;
                var stock = 0;
                var costprice = 0;
                      

                    //console.log(billvalue);

                    var pricehtml = '';  
                    var consignqty = '';
                        
                                pricehtml += '<option value='+billvalue['price_master_id']+' selected>'+billvalue['mrp']+'</option>';
                                var qty       =   1;

                                stock         =   billvalue['qty'] - billvalue['totalsoldqty'] - billvalue['totalreturnqty'];
                                costprice     =   billvalue['costprice'];
                        
                                

                                var sellingprice                =   billvalue['sellingprice_before_discount'];
                                var qty                         =   billvalue['qty'] - consignqty;
                                        
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
                                        var showtotalamount               =    Number(total_amount).toFixed(2);


                                

                                if(billvalue['product']['supplier_barcode']!='' && billvalue['product']['supplier_barcode']!=null)
                                {
                                  var barcode     =     billvalue['product']['supplier_barcode'];
                                }
                                else
                                {
                                  var barcode     =     billvalue['product']['product_system_barcode'];
                                }

                                
                                if(billvalue['product']['uqc']!=null)
                                {
                                    uqc_name   = billvalue['product']['uqc']['uqc_name'];
                                }
                                else
                                {
                                    uqc_name   = '';
                                }

                                var batch_html = '';
                                if(Number(bill_type)==3)
                                {
                                    batch_html = '<td id="batchno_'+product_id+'">'+billvalue['batchprice_master']['batch_no']+'</td>';
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
                   '<td class="pt-15 pb-15" id="product_name_'+product_id+'" name="product_name[]"><a id="popupid_'+billvalue['product_id']+'" onclick="return productdetailpopup(this);"><span class="informative">'+billvalue['product']['product_name']+'</span></a></td>'+ 
                            '<td class="leftAlign"><a id="popupid_'+billvalue['product_id']+'" onclick="return productdetailpopup(this);">'+barcode+'<br><small><b>('+billvalue['consign_bill']['bill_no']+')</b></small></a></td>';
                            product_html += feature_show_val;
                            product_html += '<td class="leftAlign"><a id="popupid_'+billvalue['product_id']+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+

                            '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                            '<input value="'+billvalue['product']['product_system_barcode']+'" type="hidden" id="barcodesel_'+product_id+'" name="barcode_sel[]">'+
                            '<input value="" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                            '<input value="'+billvalue['consign_products_detail_id']+'" type="hidden" id="consign_products_id_'+product_id+'" name="consign_products_id[]" class="" >'+
                            '<input value="'+billvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+
                            '</td>'+
                            batch_html+
                            '<td id="stock_'+product_id+'" name="stock[]" style="font-weight:bold;">'+qty+'</td>'+
                            '<td id="sellingmrp_'+product_id+'" class="billing_calculation_case">'+
                                '<select style="width:100%;border: 1px solid #ced4da;" name="mrp[]" id="mrp_'+product_id+'" onchange="return filterprice_detail(this);">'+
                                    pricehtml+
                                '</select>'+
                                '<input type="text" class="modifiedmrp" id="modifiedmrp_'+product_id+'" value="'+billvalue['mrp']+'" onkeyup="altermrp(this);"/>'+'<input type="hidden" id="oldpricemasterid_'+product_id+'" name="oldpricemasterid[]"  value="'+billvalue['price_master_id']+'" >'+
                                    '<input type="hidden" id="inwardids'+product_id+'" name="inwardids[]"  value="'+billvalue['inwardids']+'" >'+
                                    '<input type="hidden" id="inwardqtys'+product_id+'" name="inwardqtys[]"  value="'+billvalue['inwardqtys']+'" >'+
                              '</td>'+                         
                            '<td id="sellingpricewgst_'+product_id+'" class="billing_calculation_case">'+
                            '<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" value="'+showsellingprice+'" readonly>'+
                            '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]"  value="'+sellingprice+'" >'+
                            '<input type="hidden" id="costprice_'+product_id+'" class="floating-input tarifform-control number" value="'+costprice+'" readonly tabindex="-1">'+
                            '</td>'+                  
                            '<td id="sellingqty_'+product_id+'">'+
                            '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+qty+'" name="qty[]" onkeyup="return calqty(this);">'+
                            '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="0" name="oldqty[]">'+
                            '</td>'+       
                            '<td id="sellingdiscountper_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['discount_percent']+'" name="proddiscper[]" onkeyup="return caldiscountper(this);">'+
                            '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+billvalue['overalldiscount_percent']+'" name="proddiscper[]" style="display:none;">'+'</td>'+
                            '<td id="sellingdiscountamt_'+product_id+'" class="billing_calculation_case">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number mrppproddiscamt" value="'+totalmrpdiscount+'" onchange="return mrpcaldiscountamt(this);">'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" value="'+totaldiscount+'" name="proddiscamt[]" onkeyup="return caldiscountamt(this);" style="display:none;">'+
                            '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="'+proddiscountamt+'" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="'+mrpproddiscountamt+'" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                            '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                            '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                            '<td id="sprodgstper_'+product_id+'" style="text-align:right !important; display:none;" class="sprodgstper">'+billvalue['igst_percent']+'</td>'+
                            '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important; display:none;">'+sgstamount+'</td>'+
                            '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+billvalue['igst_percent']+'</td>'+
                            '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

                            '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                            '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;" class="billing_calculation_case">'+showtotalamount+'</td>'+
                            '<td onclick="removerow(' + product_id + ');"><i class="fa fa-close"></i></td>' +
                            '</tr>';
                                                
                    }
                   

            }
            else
            {
                $('.loaderContainer').hide();
                toastr.error(product_data['Message']);
                return false;
            }

        $("#sproduct_detail_record").prepend(product_html);

         if(Number(sales_type)==3)
           {
                $("#sellingdiscountper_"+product_id).hide();
                $("#sellingdiscountamt_"+product_id).hide();
           }
           else
           {
                ddisplay       =  '';
                $("#sellingdiscountper_"+product_id).addClass('billing_calculation_case');
                $("#sellingdiscountamt_"+product_id).addClass('billing_calculation_case');
                
           }
           
        if(Number(bill_calculation)==1)
         {
            $('.billing_calculation_case').show();
         }
         else
         {
            $('.billing_calculation_case').hide();
         }
        totalcalculation();
      var chargesrecordvalue   =    $('*').hasClass('chargesTable');
      
       if(chargesrecordvalue == true)
       {
        
          calculatetotalcharges();
       }
      
   });
}

function removerow(productid)
{
    $("#product_"+productid).remove();
    totalcalculation();
    var srrno  = 0;
    $('.totqty').each(function(e){
        var ssrno  = 0;
        if($(this).val()!='')
        {
            srrno++;
        }
    });

    if(Number(srrno)==1)
    {
      $('.plural').html('Item');
    }
    else if(Number(srrno)>1)
    {
      $('.plural').html('Items');
    }
    
    $('.titems').html(srrno);
}
function editremoverow(productid)
{
    $("#showsellingwithoutgst_"+productid).val(0);
    $("#sellingwithoutgst_"+productid).val(0);
    $("#qty_"+productid).val(0);
    $("#overalldiscper_"+productid).val(0);
    $("#overalldiscamt_"+productid).val(0);
    calqty($('#qty_'+productid));
}
function filterprice_detail(obj)
{

    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('mrp_')[1];
    var priceid                   =     $("#mrp_"+product_id+" :selected").val();
    var actualmrp                 =     $("#mrp_"+product_id+" :selected").html();
    $("#modifiedmrp_"+product_id).val(actualmrp);

    var url     =   "search_pricedetail";
    var type    =   "POST";
    var dataType    =   "";
    var data    =   {
        "price_id":priceid
    };

    callroute(url,type,dataType,data,function (data)
    {
        var price_data = JSON.parse(data,true);

        if(price_data['Success'] == "True")
        {
            var price_detail  = price_data['Data'][0];
            if(price_data['Data'].length > 0)
            {

                var stock = 0;

                if(price_detail['selling_gst_percent'] != null || price_detail['selling_gst_percent'] != undefined)
                    {
                        gst_per        =   price_detail['selling_gst_percent'];
                    }
                    else
                    {
                        gst_per        =   0;
                    }




                $("#showsellingwithoutgst_"+product_id).val(price_detail['sell_price'].toFixed(2));
                $("#sellingwithoutgst_"+product_id).val(price_detail['sell_price']);
                
                $("#sprodgstper_"+product_id).html(gst_per);
                $("#prodgstper_"+product_id).html(gst_per);

                var sellingprice                =   price_detail['sell_price'];
                var gst_per                     =   price_detail['selling_gst_percent'];



                    var oldprice_master_id    =   $("#oldpricemasterid_"+product_id).val();
                    var oldqty                =   $("#oldqty_"+product_id).val();
                    if(oldprice_master_id!= '')
                    {

                     if(price_detail['price_master_id']!= oldprice_master_id)
                        {
                                stock   =   price_detail['product_qty'] - oldqty;
                                $("#stock_"+product_id).html(stock);
                                var oldqty    =    $("#oldqty_"+product_id).val();
                                $("#qty_"+product_id).val(oldqty);
                                calqty($('#qty_'+product_id));
                        }
                        else
                        {
                               stock  =  price_detail['product_qty'];
                               $("#stock_"+product_id).html(stock);
                               var oldqty    =    $("#oldqty_"+product_id).val();
                               $("#qty_"+product_id).val(oldqty);
                               calqty($('#qty_'+product_id));
                        }

                    }
                    else
                    {
                       
                        $("#stock_"+product_id).html(price_detail['product_qty']);
                        calqty($('#qty_'+product_id));
                    }
                    


                /*var qty                          =    $("#qty_"+product_id).val();

                var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                var gst_amount                   =     (Number(sellingprice) * Number(gst_per) / 100).toFixed(4);
               
                var mrp                          =     Number(sellingprice) + Number(gst_amount);
                var totalgst                     =      Number(gst_amount) * Number(qty);
               
                var sellingwithgst                =      Number(sellingprice) + Number(totalgst);
                var tsellingwithgst               =      Number(mrp) * Number(qty);
                
               
                var total_amount                 =     Number(totalsellingwgst) + Number(totalgst);
                

                 
                 $("#totalsellingwgst_"+product_id).html(totalsellingwgst.toFixed(4));
                 
                 $("#totalsellinggst_"+product_id).html(tsellingwithgst.toFixed(4));
                
                 $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
                 $("#totalamount_"+product_id).html(total_amount.toFixed(4));
                
                 $("#sprodgstamt_"+product_id).html(totalgst.toFixed(2));
                 $("#stotalamount_"+product_id).html(total_amount.toFixed(2));
                  totalcalculation();  */ 
                   
            }
            else {
                     

                   
                }
        }

          
        });
}
function caldiscountper(obj)
{
 if(obj.value != '' && obj.value != undefined)
    {
       obj.value = obj.value.replace(/[^\d.]/g, '');

    }
        var id                        =     $(obj).attr('id');
        var product_id                =     $(obj).attr('id').split('proddiscper_')[1];
        var discount_percent          =     $('#proddiscper_'+product_id).val();
      
        var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
        var costprice                 =     $("#costprice_"+product_id).val();
      
        var sellingdiscount           =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
        var checksellingprice         =      Number(sellingprice) - Number(sellingdiscount);
        console.log(checksellingprice);
        console.log(costprice);
      if(Number(checksellingprice)<Number(costprice))
      {
               
                           
                swal({
                        title: "Selling Price after discount is less than Cost price of the product. Do you want to Give Discount ?",
                        type: "info",
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes!",
                        showCancelButton: true,
                        closeOnConfirm: true,
                        closeOnCancel: false
                    },
                    function (isConfirm) {
                        if (isConfirm) {

                            var discount_percent          =     $('#proddiscper_'+product_id).val();
      
                            var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                           
                            var qty                       =     $("#qty_"+product_id).val();
                            var gst_per                   =     $("#sprodgstper_"+product_id).html();
                            var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                            
                            var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                            var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                            
           
                            var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                            
                            var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

                            var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                            var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                            var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                            
                            var totalgst                     =      Number(gst_amount) * Number(qty);


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
                              var discount_percent        =     $("#discount_percent").val(); 
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
                                  $("#discount_percent").val(discount_percent);
                                   overalldiscountpercent();
                               }    


                        } else {
                            swal("Cancelled", "You can change Discount");
                             $('#proddiscper_'+product_id).val(0);
                             var discount_percent          =     $('#proddiscper_'+product_id).val();
      
                            var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                            
                            var qty                       =     $("#qty_"+product_id).val();
                            var gst_per                   =     $("#sprodgstper_"+product_id).html();
                            var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                            
                            var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                            var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                           
           
                            var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                            
                            var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

                            var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                            var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                            var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                            
                            var totalgst                     =      Number(gst_amount) * Number(qty);


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

                              var discount_percent        =     $("#discount_percent").val(); 
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
                                $("#discount_percent").val(discount_percent);
                                 overalldiscountpercent();
                             }    
                        }
                    });
                          
               
              
      }
      else
      {
                            var discount_percent          =     $('#proddiscper_'+product_id).val();
      
                            var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                            
                            var qty                       =     $("#qty_"+product_id).val();
                            var gst_per                   =     $("#sprodgstper_"+product_id).html();
                            var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                            
                            var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                            var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                            
           
                            var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                            
                            var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

                            var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                            var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                            var mrp                          =     Number(totaldiscount) + Number(gst_amount);
                            
                            var totalgst                     =      Number(gst_amount) * Number(qty);


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

                              var discount_percent        =     $("#discount_percent").val(); 
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
                                $("#discount_percent").val(discount_percent);
                                 overalldiscountpercent();
                             }
      }
    

             

    
}
function mrpcaldiscountamt(obj)
{
    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('mrpproddiscamt_')[1];
    var mrpdiscount_amount        =     $('#mrpproddiscamt_'+product_id).val();
    var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
    var qty                       =     $("#qty_"+product_id).val();
    var mrp                       =     $("#mrp_"+product_id+" :selected").html();

    var discount_percent          =     (Number(mrpdiscount_amount) * 100) / (Number(mrp)* Number(qty));

    if(Number(discount_percent)>100)
      {
              toastr.error("Discount Cannot be greater than Product MRP");
              $('#proddiscper_'+product_id).val(0);
                caldiscountper($('#proddiscper_'+product_id));
       }
       else
       {
           $('#proddiscper_'+product_id).val(Number(discount_percent).toFixed(4));
            caldiscountper($('#proddiscper_'+product_id));
       }
 
     
}
function altermrp(obj)
{
    if(obj.value != '' && obj.value != undefined)
    {
        obj.value = obj.value.replace(/[^\d.]/g, '');

    }
    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('modifiedmrp_')[1];
    var modifiedmrp               =     $('#modifiedmrp_'+product_id).val();
    var gst_per                   =     $("#sprodgstper_"+product_id).html();

    var sellprice                 =     (Number(modifiedmrp) / (100+Number(gst_per))) * 100;
    $("#sellingwithoutgst_"+product_id).val(Number(sellprice).toFixed(4));
    $("#showsellingwithoutgst_"+product_id).val(Number(sellprice).toFixed(2));
    calqty($('#qty_'+product_id));
    


}
function calqty(obj)
{
    if(obj.value != '' && obj.value != undefined)
    {
        obj.value = obj.value.replace(/[^\d.]/g, '');

    }
    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('qty_')[1];
    var qty                       =     $('#qty_'+product_id).val();
    var oldqty                    =     $('#oldqty_'+product_id).val();
    var stock                     =     $('#stock_'+product_id).html();


    var totalstock   =   Number(stock) + Number(oldqty);

    if(Number(qty)>Number(totalstock))
    {
        toastr.error("Entered Qty is greater than Consign Bill Qty");
        $('#qty_'+product_id).val(totalstock);
        var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
        
        var gst_per                   =     $("#sprodgstper_"+product_id).html();
        var discount_percent          =     $("#proddiscper_"+product_id).val();
        var mrp                       =     $("#mrp_"+product_id+" :selected").html();

          
        var totalmrpdiscount             =     (Number(mrp) * Number(totalstock)) * Number(discount_percent) / 100;
        var totalsellingwgst             =     Number(sellingprice) * Number(totalstock);
        var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
        var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

        var totaldiscount                =      Number(sellingdiscount) * Number(totalstock);

        var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

        var mrp                          =     Number(totaldiscount) + Number(gst_amount);
        
        var totalgst                     =      Number(gst_amount) * Number(totalstock);


        var sellingwithgst                =      Number(discountedamt) + Number(totalgst);


        var total_amount                 =     Number(discountedamt) + Number(totalgst);
       
         
         $("#totalsellingwgst_"+product_id).html(discountedamt.toFixed(4));
         
         $("#totalsellinggst_"+product_id).html(sellingwithgst.toFixed(4));
         $("#proddiscamt_"+product_id).val(totaldiscount.toFixed(4));
         $("#mrpproddiscamt_"+product_id).val(totalmrpdiscount.toFixed(4));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#totalamount_"+product_id).html(total_amount.toFixed(4));

         $("#sprodgstamt_"+product_id).html(totalgst.toFixed(2));
         $("#stotalamount_"+product_id).html(total_amount.toFixed(2));

           var discount_percent        =     $("#discount_percent").val(); 
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
                $("#discount_percent").val(discount_percent);
                 overalldiscountpercent();
             }   

    }
    else
    {
        var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
        var qty                       =     $("#qty_"+product_id).val();
        var gst_per                   =     $("#sprodgstper_"+product_id).html();
        var discount_percent          =     $("#proddiscper_"+product_id).val();
        var mrp                       =     $("#mrp_"+product_id+" :selected").html();

          
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
       
        
         $("#totalsellingwgst_"+product_id).html(discountedamt.toFixed(4));
         
         $("#totalsellinggst_"+product_id).html(sellingwithgst.toFixed(4));
         $("#proddiscamt_"+product_id).val(totaldiscount.toFixed(4));
         $("#mrpproddiscamt_"+product_id).val(totalmrpdiscount.toFixed(4));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#totalamount_"+product_id).html(total_amount.toFixed(4));

         $("#sprodgstamt_"+product_id).html(totalgst.toFixed(2));
         $("#stotalamount_"+product_id).html(total_amount.toFixed(2));

          var discount_percent        =     $("#discount_percent").val(); 
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
                $("#discount_percent").val(discount_percent);
                 overalldiscountpercent();
             }  
     }
}



function overalldiscountpercent()
{
    var discount_percent        =   $('#discount_percent').val();
    var rcolumn       = '';

     var sales_total            =           $('#sales_total').val();
      var discount_amount       =           (Number(sales_total) * Number(discount_percent)) / 100;
      $('#discount_amount').val(discount_amount.toFixed(4));
      var error = 0;

      $("#sproduct_detail_record").each(function (index,e)
        {
           
             $(this).find('tr').each(function ()
             {
                if($(this).attr('id') != undefined)
                {
                    rcolumn = $(this).attr('id').split('product_')[1];
                    
                 }    
                  

                  if(($("#barcodesel_"+rcolumn).val())!='')
                  {
                     

                     $("#overalldiscper_"+rcolumn).val(discount_percent);
                      var qty                         =     $("#qty_"+rcolumn).val();
                    
                      var totalsellingwgst             =     $("#totalsellingwgst_"+rcolumn).html();
                      var totalmrpgst                  =     $("#totalsellinggst_"+rcolumn).html();

                      
                      var costprice                     =     $("#costprice_"+rcolumn).val();
                    
                      var sellingdiscount               =     (Number(totalsellingwgst) * Number(discount_percent) / 100).toFixed(4);
                      var checksellingprice             =      Number(totalsellingwgst) - Number(sellingdiscount);
                      var singleprice                   =      Number(checksellingprice) / Number(qty);

                      if(Number(singleprice)<Number(costprice))
                      {
                          error = 1;
                          $('#product_'+rcolumn).css('background','#ffcfbe');
                      }
                      else
                      {
                        error  = 0;
                         $('#product_'+rcolumn).css('background','transparent');
                      }

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
                    if(error == 1)
                      {
                         toastr.error("Discount given is more than Selling Price of the Product for Coloured Rows.!"); 
                      }

                      var sales_total           =           $('#sales_total').val();
                      
                      var discount_amount       =           (Number(sales_total) * Number(discount_percent)) / 100;
                      $('#discount_amount').val(discount_amount.toFixed(4));

}
function overalldiscountamount()
{
    var discount_amount        =   $('#discount_amount').val();
    var rcolumn       = '';
    var error = 0;

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

                if(($("#barcodesel_"+rcolumn).val())!='')
                  {
                      

                     $("#overalldiscper_"+rcolumn).val(discount_percent);
                      var qty                         =     $("#qty_"+rcolumn).val();
                    
                      var totalsellingwgst             =     $("#totalsellingwgst_"+rcolumn).html();
                      var totalmrpgst                  =     $("#totalsellinggst_"+rcolumn).html();

                      var costprice                     =     $("#costprice_"+rcolumn).val();
                    
                      var sellingdiscount               =     (Number(totalsellingwgst) * Number(discount_percent) / 100).toFixed(4);
                      var checksellingprice             =      Number(totalsellingwgst) - Number(sellingdiscount);
                      var singleprice                   =      Number(checksellingprice) / Number(qty);

                      if(Number(singleprice)<Number(costprice))
                      {
                          error = 1;
                          $('#product_'+rcolumn).css('background','#ffcfbe');
                      }
                      else
                      {
                        error  = 0;
                         $('#product_'+rcolumn).css('background','transparent');
                      }

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
            if(error == 1)
              {
                 toastr.error("Discount given is more than Selling Price of the Product for Coloured Rows.!"); 
              }

}