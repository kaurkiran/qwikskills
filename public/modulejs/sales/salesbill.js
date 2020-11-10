$("#productsearch").typeahead({
   source: function(request, process) {
       var url = "sproduct_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#productsearch").val(),
           term: request.term
       };

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
                     if ($("#productsearch").val() != '') {
                         $.each(data, function (i, object) {
                             map[object.label] = object;
                             objects.push(object.label);
                         });

                         process(objects);

                          // if (objects != '') {
                          //     if (objects.length === 1) {
                          //         $(".dropdown-menu .active").trigger("click");
                          //         $("#productsearch").val('');
                          //          $(".productsearcharea .dropdown-menu").html('');
                          //     }
                          // }

                         
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

      $('.loaderContainer').show();
        var value = item;


        if(map[item] == undefined)
        {
            $('.loaderContainer').hide();
            toastr.error("Wrong Item Searched Please search the same Product again !");

        }
        else
        {

             var product_id = map[item]['product_id'];
             var field      =  1;
             $('#search_product_id').val(product_id);
             //sgetproductdetail(product_id,field);
             $(".productsearcharea .dropdown-menu").html('');

        }

    }

});


$('#searchproductrecord').click(function(e){

   var product_id =  $('#search_product_id').val();
   var qty        =  $('#typeqty').val();
   var type = "POST";
   var url = 'sproduct_detail';
   var dataType = "";
   var data = {
       "product_id" : product_id  
       }
   callroute(url,type,dataType,data,function(data)
   {

        var product_data = JSON.parse(data,true);

        
        if(product_data['Success'] == "True")
        {

            var product_html = '';
            var product_detail  = product_data['Data'][0];
            var product_code    = '';

              
             var sales_type              =   $('#sales_type').val();
       

              $('.loaderContainer').hide();
              var product_id              =   product_detail['product_id'];
              
       

              if(product_detail['product_code'] != null || product_detail['product_code'] != undefined)
              {
                  product_code = product_detail['product_code'];
              }



              

              var samerow = 0;
              $("#sproduct_detail_record tr").each(function()
              {
                 var row_product_id = $(this).attr('id').split('_')[1];
                 if(row_product_id == product_id)
                 {
                     var qty = $("#qty_"+product_id).val();
                     var product_qty = ((Number(qty)) + (Number(1)));
                     //$("#qty_"+product_id).val(product_qty);
                      samerow = 1;
                      calqty($('#qty_'+product_id));
                     return false;
                 }
              });
              setTimeout(function(){
                $(".alertStatus").val(0);
                },320)
              if(samerow == 0)
              {


                        var sr     = 1;
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



                       var feature_show_val = "";
                       var producttype_id  = "";
                        if(bill_show_dynamic_feature != '')
                        {
                            var feature = bill_show_dynamic_feature.split(',');
                            console.log(feature);

                            $.each(feature,function(fea_key,fea_val)
                            {
                              
                                var feature_name = '';                               

                                if(typeof(product_detail[fea_val]) != "undefined" && product_detail[fea_val] !== null) {

                                    feature_name = product_detail[fea_val];
                                }

                                producttype_id   =  product_detail['product_features_relationship'][fea_val];
                               
                                feature_show_val += '<input type="hidden" id="producttype_'+product_id+'" class="dynamic_producttype producttype_'+product_detail['product_features_relationship'][fea_val]+' " value="'+product_detail['product_features_relationship'][fea_val] +'">';

                            })
                        }

                        

                        var gst_per                      =    Number(product_detail['sell_gst_percent']);
                        var showsellingwithoutgst        =    Number(product_detail['offer_price']).toFixed(2);
                        var sellingprice                 =    Number(product_detail['offer_price']);
                        var total_amount                 =    Number(sellingprice) * Number(qty);
                        
                     
                                       
                      
                        //var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                        //var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                        var sellingdiscount              =      0;
       
                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                        
                        var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

                        var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                        //var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);
                        
                        var totalgst                     =      Number(gst_amount) * Number(qty);  
                        var totalgstprice                =      Number(total_amount) + Number(totalgst);                      
                         
                         
                         var stotal_amount  =   Number(total_amount).toFixed(2);


                   product_html += '<tr id="product_' + product_id + '" class="scannedkot_'+product_id+'">'+
                      '<td class="centerAlign"><span class="removeIcon" id="removeIcon_'+product_id+'" onclick="return removerow(' + product_id + ');">-</span></td>'+
                      '<td class="leftAlign" id="productdetail_'+product_id+'">'+product_detail['product_name']+'<input type="hidden" id="productid_'+product_id+'" value="'+product_id+'">'+feature_show_val+'</td>'+
                       '<td class="rightAlign" id="qtydiv_'+product_id+'">'+
                        '<button type="button" class="bold btn-success plusminusBtn" id="plusqqty_'+product_id+'" onclick="return plusqty(this);">+</button>'+
                        '<input type="text" class="width30 font12 bold centerAlign noMargin totqty" name="qty[]" id="qty_'+product_id+'" value="'+qty+'">'+
                        '<button type="button" class="bold btn-danger plusminusBtn" id="minusqqty_'+product_id+'" onclick="return minusqty(this);">-</button>'+
                      '</td>'+
                      '<td class="rightAlign" id="offerpricediv_'+product_id+'"><input type="text" class="width100 font12 bold rightAlign" name="offerprice[]" id="offerprice_'+product_id+'" value="'+showsellingwithoutgst+'"></td>'+

                      '<td id="sellingdiscountper_'+product_id+'" class="rightAlign" style="display:none;">'+'<input type="text" id="proddiscper_'+product_id+'" class="width20 number" value="0" name="proddiscper[]">'+
                      '<input type="text" id="overalldiscper_'+product_id+'" class="width20 number" value="0" name="overalldiscper[]" style="display:;">'+'</td>'+
                     '<td id="sellingdiscountamt_'+product_id+'" class="rightAlign" style="display:none;">'+'<input type="text" id="proddiscamt_'+product_id+'" class="width20 number pproddiscamt" value="0" name="proddiscamt[]"  style="display:;">'+
                     '<input type="text" id="overalldiscamt_'+product_id+'" class="width20 number overallpproddiscamt  producttypediscount_'+producttype_id+'" value="0" name="overalldiscamt[]" style="display:;">'+'</td>'+

                      '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+gst_per+'</td>'+
                      '<td id="prodgstamt_'+product_id+'" style="display:none;"  class="producttypegst_'+producttype_id+' dototalgstamt" name="prodgstamt[]">'+totalgst+'</td>'+
                      '<td class="rightAlign" id="showtotaldiv_'+product_id+'">'+stotal_amount+'</td>'+
                      '<td class="rightAlign" id="totaldiv_'+product_id+'" style="display:none;"><input type="text" class="width100 font12 bold rightAlign dototalprice producttypetotal_'+producttype_id+'" name="totalprice[]" id="totalprice_'+product_id+'" value="'+total_amount+'">'+
                       '<input type="hidden" class="width100 font12 bold rightAlign noMargin dototalgstprice" name="totalgstprice[]" id="totalgstprice_'+product_id+'" value="'+totalgstprice+'"></td>'+
                       '<td class="centerAlign" id="customercomment_'+product_id+'"><i class="fa fa-ellipsis-h" aria-hidden="true" id="cuscomment_'+product_id+'" onclick="return addkotcomment(this);"></i>'+
                             '<input type="hidden" class="width100 font12 bold rightAlign noMargin" name="kotcomment[]" id="kotcomment_'+product_id+'" value=""></td>'+

                    '</tr>';


                 
        }
    }

        

        
        
        $(".odd").hide();
       
           $("#productsearch").val('');
           $("#search_product_id").val('');
           $('#typeqty').val(1);
           $("#productsearch").focus();
           $("#temporary_record").empty();
           $("#sproduct_detail_record").prepend(product_html);
           $('#print_kot').show();
           totalcalculation();
       


    if(product_data["Success"]=="False")
    {
        toastr.error(product_data['Message']);
        $('.loaderContainer').hide();
    }


   });
});

function addproductrow(obj)
{
    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('productsectionid_')[1];
    var qty                       =     1;
    var type = "POST";
    var url = 'sproduct_detail';
    var dataType = "";
    var data = {
       "product_id" : product_id  
       }
   callroute(url,type,dataType,data,function(data)
   {

        var product_data = JSON.parse(data,true);

        
        if(product_data['Success'] == "True")
        {

            var product_html = '';
            var product_detail  = product_data['Data'][0];
            var product_code    = '';

              
             var sales_type              =   $('#sales_type').val();
       

              $('.loaderContainer').hide();
              var product_id              =   product_detail['product_id'];
              
       

              if(product_detail['product_code'] != null || product_detail['product_code'] != undefined)
              {
                  product_code = product_detail['product_code'];
              }



              

              var samerow = 0;
              $("#sproduct_detail_record tr").each(function()
              {
                 var row_product_id = $(this).attr('id').split('_')[1];
                 if(row_product_id == product_id)
                 {
                     var qty = $("#qty_"+product_id).val();
                     var product_qty = ((Number(qty)) + (Number(1)));
                    // $("#qty_"+product_id).val(product_qty);
                     samerow = 1;
                      calqty($('#qty_'+product_id));
                     return false;
                 }
              });
              setTimeout(function(){
                $(".alertStatus").val(0);
                },320)
              if(samerow == 0)
              {


                        var sr     = 1;
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



                       var feature_show_val = "";
                       var producttype_id = '';
                        if(bill_show_dynamic_feature != '')
                        {
                            var feature = bill_show_dynamic_feature.split(',');

                            $.each(feature,function(fea_key,fea_val)
                            {
                                var feature_name = '';                               

                                if(typeof(product_detail[fea_val]) != "undefined" && product_detail[fea_val] !== null) {

                                    feature_name = product_detail[fea_val];
                                    //console.log(feature_name);
                                }

                                producttype_id   =  product_detail['product_features_relationship'][fea_val];

                                feature_show_val += '<input type="hidden" id="producttype_'+product_id+'" class="dynamic_producttype producttype_'+product_detail['product_features_relationship'][fea_val]+'" value="'+product_detail['product_features_relationship'][fea_val] +'">';
                            })
                        }

                        //console.log(showsellingwithoutgst);

                        var gst_per                      =    Number(product_detail['sell_gst_percent']);
                        var showsellingwithoutgst        =    Number(product_detail['offer_price']).toFixed(2);
                        var sellingprice                 =    Number(product_detail['offer_price']);
                        var total_amount                 =    Number(sellingprice) * Number(qty);
                        
                     
                                       
                      
                        //var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                        //var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                        var sellingdiscount              =      0;
       
                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                        
                        var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

                        var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                        //var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);
                        
                        var totalgst                     =      Number(gst_amount) * Number(qty);   
                        var totalgstprice                =      Number(total_amount) + Number(totalgst);                    
                         
                         
                         var stotal_amount  =   Number(total_amount).toFixed(2);


                         product_html += '<tr id="product_' + product_id + '" class="scannedkot_'+product_id+'">'+
                            '<td class="centerAlign"><span class="removeIcon" id="removeIcon_'+product_id+'" onclick="return removerow(' + product_id + ');">-</span></td>'+
                            '<td class="leftAlign" id="productdetail_'+product_id+'">'+product_detail['product_name']+'<input type="hidden" id="productid_'+product_id+'" value="'+product_id+'">'+feature_show_val+'</td>'+
                            '<td class="rightAlign" id="qtydiv_'+product_id+'">'+
                              '<button type="button" class="bold btn-success plusminusBtn" id="plusqqty_'+product_id+'" onclick="return plusqty(this);">+</button>'+
                              '<input type="text" class="width30 font12 bold noMargin centerAlign totqty" name="qty[]" id="qty_'+product_id+'" value="'+qty+'">'+
                              '<button type="button" class="bold btn-danger plusminusBtn" id="minusqqty_'+product_id+'" onclick="return minusqty(this);">-</button>'+
                            '</td>'+
                            '<td class="rightAlign" id="offerpricediv_'+product_id+'"><input type="text" class="width100 font12 bold rightAlign" name="offerprice[]" id="offerprice_'+product_id+'" value="'+showsellingwithoutgst+'"></td>'+
                            '<td id="sellingdiscountper_'+product_id+'" class="rightAlign" style="display:none;">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" value="0" name="proddiscper[]">'+
                            '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="0" name="overalldiscper[]" style="display:;">'+'</td>'+
                            '<td id="sellingdiscountamt_'+product_id+'" class="rightAlign" style="display:none;">'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" value="0" name="proddiscamt[]"  style="display:;">'+
                            '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt  producttypediscount_'+producttype_id+'" value="0" name="overalldiscamt[]" style="display:;">'+'</td>'+
                            '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+gst_per+'</td>'+
                            '<td id="prodgstamt_'+product_id+'" style="display:none;" class="producttypegst_'+producttype_id+' dototalgstamt" name="prodgstamt[]">'+totalgst+'</td>'+
                            '<td class="rightAlign" id="showtotaldiv_'+product_id+'">'+stotal_amount+'</td>'+
                            '<td class="rightAlign" id="totaldiv_'+product_id+'" style="display:none;"><input type="text" class="width100 font12 bold rightAlign dototalprice producttypetotal_'+producttype_id+'" name="totalprice[]" id="totalprice_'+product_id+'" value="'+total_amount+'">'+
                             '<input type="hidden" class="width100 font12 bold rightAlign noMargin dototalgstprice" name="totalgstprice[]" id="totalgstprice_'+product_id+'" value="'+totalgstprice+'"></td>'+
                             '<td class="centerAlign" id="customercomment_'+product_id+'"><i class="fa fa-ellipsis-h" aria-hidden="true" id="cuscomment_'+product_id+'" onclick="return addkotcomment(this);"></i>'+
                             '<input type="hidden" class="width100 font12 bold rightAlign noMargin" name="kotcomment[]" id="kotcomment_'+product_id+'" value=""></td>'+
                          '</tr>';


                 
        }
    }

        

        
        
        $(".odd").hide();
       
           $("#productsearch").val('');
           $("#search_product_id").val('');
           $('#typeqty').val(1);
           $("#productsearch").focus();
           
           $("#temporary_record").empty();
           $("#sproduct_detail_record").prepend(product_html);
           $('#print_kot').show();
           totalcalculation();
        
       


    if(product_data["Success"]=="False")
    {
        toastr.error(product_data['Message']);
        $('.loaderContainer').hide();
    }


   });
}
function removerow(productid)
{
    
    $(".scannedkot_"+productid).remove();
     totalcalculation();
     

}
function addkotcomment(obj)
{   
        var id                        =     $(obj).attr('id');
        var row_id                    =     $(obj).attr('id').split('cuscomment_')[1];
        var customer_comment          =     $('#kotcomment_'+row_id).val();
        $('#myModalkotcomment').modal('show');
        $('#kotrow_id').val(row_id);
        $('#kot_customer_comment').val(customer_comment);

}

$('#addcommentButton').click(function(e){

      var kotrow_id = $('#kotrow_id').val();
      var kot_customer_comment    = $('#kot_customer_comment').val();
      $('#kotcomment_'+kotrow_id).val(kot_customer_comment);
      $('#kot_customer_comment').val('');
      $('#kotrow_id').val('');      
      $('#myModalkotcomment').modal('hide');

});

function removethiskot(kot_product_detail_id)
{
     var kot_product_detail_id = kot_product_detail_id;
     $('#myModaldeletekot').modal('show');
     $('#kotdelete_id').val(kot_product_detail_id);

}


$('#deletekotButton').click(function(e){

      var kot_product_detail_id = $('#kotdelete_id').val();
      var kot_delete_comment    = $('#kot_delete_comment').val();
      var sales_bill_id         = $('#sales_bill_id').val();
     

      if(kot_delete_comment == '')
      {
          toastr.error("Please Comment why you are deleting this Kot !");
          $('#kot_delete_comment').focus();
      }
      else
      {
                  
      $('#myModaldeletekot').modal('hide');

        var errmsg = "Are You Sure want to delete this KOT Once deleted cannot be recovered?";
        swal({
                title: errmsg,
                type: "warning",
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes!",
                showCancelButton: true,
                closeOnConfirm: true,
                closeOnCancel: true
            },


          function (isConfirm) 
            {

                if (isConfirm) 
                {
                          var  url = "kot_product_delete";
                          var type = "POST";
                          var dataType = "";
                          var data = {
                             "kot_product_detail_id" : kot_product_detail_id,
                             "kot_delete_comment" : kot_delete_comment,
                             "sales_bill_id" : sales_bill_id
                         
                         }
                          callroute(url,type,dataType,data,function (data)
                          {
                             
                              var dta = JSON.parse(data);

                              if(dta['Success'] == "True")
                              {
                                  $('#myModaldeletekot').modal('hide');
                                  $('#kotproductrow_'+kot_product_detail_id).remove();
                                 
                                  totalcalculation();

                                  // url = dta['url'];
                                  // localStorage.removeItem('edit_bill_record');
                                  // localStorage.setItem('edit_bill_record',JSON.stringify(dta['Data']));
                                  // window.location.href = url;
                                
                                  
                              }
                              else
                              {
                                
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

});

function transferthiskot(kot_product_detail_id)
{
     var kot_product_detail_id = kot_product_detail_id;
     $('#kottransfer_id').val(kot_product_detail_id);
     openActiveTable();
     $('#TransferTable').modal('show');

}
function openActiveTable()
{
        // alert(selectedTableNo);

        var sales_bill_id   = $('#sales_bill_id').val();

        var url = "getActiveTables_list";
        var type = "POST";
        var dataType = '';
        var data = { 
            "sales_bill_id"   : sales_bill_id 
        };
        callroute(url,type,dataType,data,function (data)
        {
            var dta = JSON.parse(data);

            if(dta['Success'] == "True")
            {
                // console.log();
                var tablesData  =   '';
                var onclick_    =   '';
                var table_name  =   '';

                $.each(dta['Data'],function (key,val){
                    onclick_        =   "'";
                    tablemaster_id    =   val['tablemaster_id'];

                    tablesData  +=   '<div class="span1 centerAlign padding15 coverTab" style="margin-bottom:10px; margin-left:0; border:1px solid #ccc;" onclick="selectkotTransferTable('+onclick_+val['sales_bill']['sales_bill_id']+onclick_+','+onclick_+tablemaster_id+onclick_+')" id="transferTable'+val['tablemaster_id']+'">'+val['table_name']+'</div>';
                });

                tablesData  +=   '<div class="span1 centerAlign transferTableButton" style="margin-bottom:10px; margin-left:0; margin-top:0; display:none;" onclick="TransferkotTrigger()"><button class="btn-danger bigButton" style="margin:0; padding:13px 40px;"><i class="fa fa-arrow-right">&nbsp;</i></button><input type="hidden" id="totransferBillId"><input type="hidden" id="transferTableNo"></div>';

                $('#TransferTable').show();
                $('#TransferTable .tablesAjaxData').html(tablesData);
            }
            else
            {
                toastr.error(dta['Message']);
                return false;
            }
        });

        
}

function selectkotTransferTable(sales_bill_id,transferTableNo)
{
    if(sales_bill_id!='' && transferTableNo!='')
    {
        $('.coverTab').removeClass('is-active');
        $('#transferTable'+transferTableNo).addClass('is-active');
        $('.transferTableButton').show();
        $('#totransferBillId').val(sales_bill_id);
        $('#transferTableNo').val(transferTableNo);
    }  
}
function TransferkotTrigger()
{
    $('.transferTableButton button').html('<i class="fa fa-refresh fa-spin"></i>');
    var totransferBillId    =   $('#totransferBillId').val();
    var transferTableNo     =   $('#transferTableNo').val();
    var kottransfer_id      =   $('#kottransfer_id').val();
    var fromsales_bill_id   =   $('#sales_bill_id').val();

    var errmsg = "Are You Sure want to Transfer this KOT Please Confirm?";
        swal({
                title: errmsg,
                type: "warning",
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes!",
                showCancelButton: true,
                closeOnConfirm: true,
                closeOnCancel: true
            },


          function (isConfirm) 
            {

                if (isConfirm) 
                {
                          var url = "transferKot";
                          var type = "POST";
                          var dataType = '';
                          var data = {
                              "totransferBillId"  : totransferBillId,   
                              "transferTableNo"   : transferTableNo,
                              "kottransfer_id"    : kottransfer_id,
                              "fromsales_bill_id" : fromsales_bill_id
                          };
                          callroute(url,type,dataType,data,function (data)
                          {
                              var dta = JSON.parse(data);

                              if(dta['Success'] == "True")
                              {
                                  $('#kotproductrow_'+kottransfer_id).remove();
                                  toastr.success(dta['Message']);
                                  $('#TransferTable').modal('hide');
                                  $('#myModalkotsummarypop').modal('hide');
                                  $('#myModalsavedkotpop').modal('hide');
                                  
                              }
                          })
                }
          else
          {
              return false;
          }
       })
    
    


    
}

function plusqty(obj)
{
    if(obj.value != '' && obj.value != undefined)
    {
        obj.value = obj.value.replace(/[^\d.]/g, '');

    }
        var id                        =     $(obj).attr('id');
        var product_id                =     $(obj).attr('id').split('plusqqty_')[1];
        var qty                       =     $('#qty_'+product_id).val();
        qty                           =     Number(qty) + 1;
  
     
        var sellingprice              =     $("#offerprice_"+product_id).val();
        
        var gst_per                   =     $("#prodgstper_"+product_id).html();
     
        var total_amount              =    Number(sellingprice) * Number(qty);


        var sellingdiscount           =      0;

        var totalsellingwgst          =     Number(sellingprice) * Number(qty);

        var gst_amount                =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

        var totaldiscount             =      Number(sellingdiscount) * Number(qty);

        //var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

        var totalgst                  =      Number(gst_amount) * Number(qty);                       


        var stotal_amount             =      Number(total_amount).toFixed(2);
        var total_amount              =      Number(total_amount).toFixed(4);
        var totalgstprice             =      Number(total_amount) + Number(totalgst);  
      
         $('#qty_'+product_id).val(Number(qty));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#showtotaldiv_"+product_id).html(stotal_amount);
         $('#totalprice_'+product_id).val(total_amount);
         $('#totalgstprice_'+product_id).val(Number(totalgstprice).toFixed(4));
         totalcalculation();

           // var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
           //   if(Number(discount_percent)==0 || discount_percent == '')
           //   {
           //        totalcalculation();
           //   }
           //   else
           //   {

           //      var saleswithgst = 0;
           //        $('.totalsellinggst').each(function (index,e){
           //            if($(this).html()!="")
           //            saleswithgst   +=   parseFloat($(this).html());                                                 
                     
           //          });
           //      $("#sales_total").val(saleswithgst);
           //     // $("#discount_percent").val(discount_percent);
           //       //overalldiscountpercent();
           //       if(Number(referral_loyalty_module) == 2)
           //      {
           //          overalldiscountamount();
           //      }
           //      else
           //      {
           //        overalldiscountpercent();
           //      }
           //   }   

    
    
}
function minusqty(obj)
{
    if(obj.value != '' && obj.value != undefined)
    {
        obj.value = obj.value.replace(/[^\d.]/g, '');

    }
        var id                        =     $(obj).attr('id');
        var product_id                =     $(obj).attr('id').split('minusqqty_')[1];
        var qty                       =     $('#qty_'+product_id).val();
        qty                           =     Number(qty) - 1;
  
     
        var sellingprice              =     $("#offerprice_"+product_id).val();
        
        var gst_per                   =     $("#prodgstper_"+product_id).html();
     
        var total_amount              =    Number(sellingprice) * Number(qty);


        var sellingdiscount           =      0;

        var totalsellingwgst          =     Number(sellingprice) * Number(qty);

        var gst_amount                =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

        var totaldiscount             =      Number(sellingdiscount) * Number(qty);

        //var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

        var totalgst                  =      Number(gst_amount) * Number(qty);                       


        var stotal_amount             =      Number(total_amount).toFixed(2);
        var total_amount              =      Number(total_amount).toFixed(4);
        var totalgstprice             =      Number(total_amount) + Number(totalgst);  
      
         $('#qty_'+product_id).val(Number(qty));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#showtotaldiv_"+product_id).html(stotal_amount);
         $('#totalprice_'+product_id).val(total_amount);
         $('#totalgstprice_'+product_id).val(Number(totalgstprice).toFixed(4));
         totalcalculation();

           // var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
           //   if(Number(discount_percent)==0 || discount_percent == '')
           //   {
           //        totalcalculation();
           //   }
           //   else
           //   {

           //      var saleswithgst = 0;
           //        $('.totalsellinggst').each(function (index,e){
           //            if($(this).html()!="")
           //            saleswithgst   +=   parseFloat($(this).html());                                                 
                     
           //          });
           //      $("#sales_total").val(saleswithgst);
           //     // $("#discount_percent").val(discount_percent);
           //       //overalldiscountpercent();
           //       if(Number(referral_loyalty_module) == 2)
           //      {
           //          overalldiscountamount();
           //      }
           //      else
           //      {
           //        overalldiscountpercent();
           //      }
           //   }   

    
    
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
        qty                           =     Number(qty) + 1;
  
     
        var sellingprice              =     $("#offerprice_"+product_id).val();
        
        var gst_per                   =     $("#prodgstper_"+product_id).html();
     
        var total_amount              =    Number(sellingprice) * Number(qty);


        var sellingdiscount           =      0;

        var totalsellingwgst          =     Number(sellingprice) * Number(qty);

        var gst_amount                =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

        var totaldiscount             =      Number(sellingdiscount) * Number(qty);

        //var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

        var totalgst                  =      Number(gst_amount) * Number(qty);                       


        var stotal_amount             =      Number(total_amount).toFixed(2);
        var total_amount              =      Number(total_amount).toFixed(4);
        var totalgstprice             =      Number(total_amount) + Number(totalgst);  
      
         $('#qty_'+product_id).val(Number(qty));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#showtotaldiv_"+product_id).html(stotal_amount);
         $('#totalprice_'+product_id).val(total_amount);
         $('#totalgstprice_'+product_id).val(Number(totalgstprice).toFixed(4));

         totalcalculation();

           // var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
           //   if(Number(discount_percent)==0 || discount_percent == '')
           //   {
           //        totalcalculation();
           //   }
           //   else
           //   {

           //      var saleswithgst = 0;
           //        $('.totalsellinggst').each(function (index,e){
           //            if($(this).html()!="")
           //            saleswithgst   +=   parseFloat($(this).html());                                                 
                     
           //          });
           //      $("#sales_total").val(saleswithgst);
           //     // $("#discount_percent").val(discount_percent);
           //       //overalldiscountpercent();
           //       if(Number(referral_loyalty_module) == 2)
           //      {
           //          overalldiscountamount();
           //      }
           //      else
           //      {
           //        overalldiscountpercent();
           //      }
           //   }   

    
    
}

function getchild(obj)
{

     var id                   =     $(obj).attr('id');
     var feature_id           =     $(obj).attr('id').split('parent_')[1];
     var type                 =     "POST";
     var url                  =     'getchild_details';
     var dataType = "";
     var data = {
         "feature_id" : feature_id  
         }
   callroute(url,type,dataType,data,function(data)
   {

        var feature_data = JSON.parse(data,true);

        
        if(feature_data['Success'] == "True")
        {

            var feature_html = '';
            var feature_detail  = feature_data['Data'];
            console.log(feature_data);


            $.each(feature_detail,function(fea_key,fea_val)
            {
                feature_html += '<li id="child_'+fea_val['product_features_data_id']+'" class="'+fea_val['product_features']['html_id']+'" onclick="return getproducts(this);">'+fea_val['product_features_data_value']+'</li>';

            })
            $('.child_section').html(feature_html);

          }
          else
          {
              var feature_nodata   =  '<li>'+feature_data['Message']+'</li>';
              $('.child_section').html(feature_nodata);
          }


  })


}
function getproducts(obj)
{

     var id                   =     $(obj).attr('id');
     var feature_id           =     $(obj).attr('id').split('child_')[1];
     var feature_name         =     $(obj).attr('class');
    // console.log(feature_name);
     var type                 =     "POST";
     var url                  =     'getproduct_details';
     var dataType = "";
     var data = {
         "feature_id" : feature_id,
         "feature_name" : feature_name  
         }
   callroute(url,type,dataType,data,function(data)
   {

        var product_data = JSON.parse(data,true);

        
        if(product_data['Success'] == "True")
        {

            var product_html = '';
            var product_detail  = product_data['Data'];
            console.log(product_data);


            $.each(product_detail,function(product_key,product_val)
            {
                product_html += '<li id="productsectionid_'+product_val['product']['product_id']+'"  onclick="return addproductrow(this);">'+product_val['product']['product_name']+'</li>';

            })
            $('.product_section').html(product_html);

          }
          else
          {
              var product_nodata   =  '<li>'+product_data['Message']+'</li>';
              $('.product_section').html(product_nodata);
          }


  })


}


// function removerow(productid)
// {
//     var referral_loyalty_module   =     $('#referral_loyalty_module').val();
//     $("#product_"+productid).remove();
//     var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
//      if(Number(discount_percent)==0 || discount_percent == '')
//      {
//           totalcalculation();
//      }
//      else
//      {

//         var saleswithgst = 0;
//           $('.totalsellinggst').each(function (index,e){
//               if($(this).html()!="")
//               saleswithgst   +=   parseFloat($(this).html());                                                 
             
//             });
//         $("#sales_total").val(saleswithgst);
//          // $("#discount_percent").val(discount_percent);
//          //overalldiscountpercent();
//           if(Number(referral_loyalty_module) == 2)
//           {
//               overalldiscountamount();
//           }
//           else
//           {
//             overalldiscountpercent();
//           }
//      }    
//     //totalcalculation();
//      var srrno  = 0;
//     $('.totqty').each(function(e){
//         var ssrno  = 0;
//         if($(this).val()!='')
//         {
//             srrno++;
//         }
//     });

//     if(Number(srrno)==1)
//     {
//       $('.plural').html('Item');
//     }
//     else if(Number(srrno)>1)
//     {
//       $('.plural').html('Items');
//     }

//     $('.titems').html(srrno);
// }
// function editremoverow(productid)
// {
//     $("#showsellingwithoutgst_"+productid).val(0);
//     $("#sellingwithoutgst_"+productid).val(0);
//     $("#qty_"+productid).val(0);
//     $("#overalldiscper_"+productid).val(0);
//     $("#overalldiscamt_"+productid).val(0);
//     calqty($('#qty_'+productid));
// }
function caldiscountper(obj)
{
 
        var id                        =     $(obj).attr('id');
        var rcolumn                   =     $(obj).attr('id').split('overalldiscper_')[1];
        var discount_percent          =     $('#overalldiscper_'+rcolumn).val();
        var qty                       =     $("#qty_"+rcolumn).val();

        var sellingprice              =     $("#offerprice_"+rcolumn).val();

        var gst_per                   =     $("#prodgstper_"+rcolumn).html();
        $('.comment_section').show();
      
       
    if(Number(discount_on_billing)==1 && Number(is_master)==0)
    {
        if(Number(discount_percent) > Number(discount_val_on_billing))
        {
            toastr.error("Discount cannot be greater than "+discount_val_on_billing+" as mentioned for this user");
            $('#overalldiscper_'+rcolumn).val(0);


            var discount_percent          =     $('#overalldiscper_'+rcolumn).val();
            var total_amount              =     Number(sellingprice) * Number(qty);


            var sellingdiscount           =      0;

            var totalsellingwgst          =     Number(sellingprice) * Number(qty);

            var totaldiscount             =     (Number(totalsellingwgst) * Number(discount_percent)) / 100;

            var discountedtotal_amount    =      Number(totalsellingwgst)  - Number(totaldiscount);

            var totalgst                  =     (Number(discountedtotal_amount) * Number(gst_per)) / 100;

            var stotal_amount             =      Number(total_amount).toFixed(2);
            var total_amount              =      Number(total_amount).toFixed(4);
            var totalgstprice             =      Number(discountedtotal_amount) + Number(totalgst);  

             $("#overalldiscamt_"+rcolumn).val(totaldiscount.toFixed(4));
             $("#prodgstamt_"+rcolumn).html(totalgst.toFixed(4));
             $("#showtotaldiv_"+rcolumn).html(Number(totalgstprice).toFixed(2));
             $('#totalprice_'+rcolumn).val(Number(discountedtotal_amount).toFixed(4));
             $('#discountedprice_'+rcolumn).html(Number(discountedtotal_amount).toFixed(2));
             $('#prodgstamt_'+rcolumn).html(Number(totalgst).toFixed(2));
             $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
             $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
             $('#overalldiscamt_'+rcolumn).val(Number(totaldiscount).toFixed(4));
             
              totalcalculation();
        }
        else
        {
                      
                   
                      var total_amount              =     Number(sellingprice) * Number(qty);


                      var sellingdiscount           =      0;

                      var totalsellingwgst          =     Number(sellingprice) * Number(qty);

                      var totaldiscount             =     (Number(totalsellingwgst) * Number(discount_percent)) / 100;

                      var discountedtotal_amount    =      Number(totalsellingwgst)  - Number(totaldiscount);

                      var totalgst                  =     (Number(discountedtotal_amount) * Number(gst_per)) / 100;

                      var stotal_amount             =      Number(total_amount).toFixed(2);
                      var total_amount              =      Number(total_amount).toFixed(4);
                      var totalgstprice             =      Number(discountedtotal_amount) + Number(totalgst);  

                       $("#overalldiscamt_"+rcolumn).val(totaldiscount.toFixed(4));
                       $("#prodgstamt_"+rcolumn).html(totalgst.toFixed(4));
                       $("#showtotaldiv_"+rcolumn).html(Number(totalgstprice).toFixed(2));
                       $('#totalprice_'+rcolumn).val(Number(discountedtotal_amount).toFixed(4));
                       $('#discountedprice_'+rcolumn).html(Number(discountedtotal_amount).toFixed(2));
                       $('#prodgstamt_'+rcolumn).html(Number(totalgst).toFixed(2));
                       $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                       $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                       $('#overalldiscamt_'+rcolumn).val(Number(totaldiscount).toFixed(4));
                       
                        totalcalculation();
          }
    
        
    }
    else
    {
       
                    var qty                       =     $("#qty_"+rcolumn).val();

                    var sellingprice              =     $("#offerprice_"+rcolumn).val();

                    var gst_per                   =     $("#prodgstper_"+rcolumn).html();
                 
                    var total_amount              =     Number(sellingprice) * Number(qty);


                    var sellingdiscount           =      0;

                    var totalsellingwgst          =     Number(sellingprice) * Number(qty);

                    var totaldiscount             =     (Number(totalsellingwgst) * Number(discount_percent)) / 100;

                    var discountedtotal_amount    =      Number(totalsellingwgst)  - Number(totaldiscount);

                    var totalgst                  =     (Number(discountedtotal_amount) * Number(gst_per)) / 100;

                    var stotal_amount             =      Number(total_amount).toFixed(2);
                    var total_amount              =      Number(total_amount).toFixed(4);
                    var totalgstprice             =      Number(discountedtotal_amount) + Number(totalgst);  

                    console.log(totaldiscount);

                     $("#overalldiscamt_"+rcolumn).val(totaldiscount.toFixed(4));
                     $("#prodgstamt_"+rcolumn).html(totalgst.toFixed(4));
                     $("#showtotaldiv_"+rcolumn).html(Number(totalgstprice).toFixed(2));
                     $('#totalprice_'+rcolumn).val(Number(discountedtotal_amount).toFixed(4));
                     $('#discountedprice_'+rcolumn).html(Number(discountedtotal_amount).toFixed(2));
                     $('#prodgstamt_'+rcolumn).html(Number(totalgst).toFixed(2));
                     $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                     $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                     $('#overalldiscamt_'+rcolumn).val(Number(totaldiscount).toFixed(4));
                     
                      totalcalculation();
      
        }
    

             

    
}
function caldiscountamt(obj)
{
 
        var id                        =     $(obj).attr('id');
        var rcolumn                   =     $(obj).attr('id').split('overalldiscamt_')[1];
        var totaldiscount             =     $('#overalldiscamt_'+rcolumn).val();
      
       
    if(Number(discount_on_billing)==1 && Number(is_master)==0)
    {
        if(Number(discount_percent) > Number(discount_val_on_billing))
        {
            toastr.error("Discount cannot be greater than "+discount_val_on_billing+" as mentioned for this user");
            $('#proddiscper_'+product_id).val(0);
            calqty($('#qty_'+product_id));
        }
        else
        {
                    var qty                       =     $("#qty_"+rcolumn).val();

                    var sellingprice              =     $("#offerprice_"+rcolumn).val();

                    var gst_per                   =     $("#prodgstper_"+rcolumn).html();
                 
                    var total_amount              =     Number(sellingprice) * Number(qty);


                    var sellingdiscount           =      0;

                    var totalsellingwgst          =     Number(sellingprice) * Number(qty);

                    var discount_percent          =     (Number(totaldiscount) / Number(totalsellingwgst)) * 100;

                    var discountedtotal_amount    =      Number(totalsellingwgst)  - Number(totaldiscount);

                    var totalgst                  =     (Number(discountedtotal_amount) * Number(gst_per)) / 100;

                    var stotal_amount             =      Number(total_amount).toFixed(2);
                    var total_amount              =      Number(total_amount).toFixed(4);
                    var totalgstprice             =      Number(discountedtotal_amount) + Number(totalgst);  

                    console.log(totaldiscount);

                     $("#overalldiscper_"+rcolumn).val(discount_percent.toFixed(4));
                     $("#prodgstamt_"+rcolumn).html(totalgst.toFixed(4));
                     $("#showtotaldiv_"+rcolumn).html(Number(totalgstprice).toFixed(2));
                     $('#totalprice_'+rcolumn).val(Number(discountedtotal_amount).toFixed(4));
                     $('#discountedprice_'+rcolumn).html(Number(discountedtotal_amount).toFixed(2));
                     $('#prodgstamt_'+rcolumn).html(Number(totalgst).toFixed(2));
                     $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                     $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                     $('#overalldiscamt_'+rcolumn).val(Number(totaldiscount).toFixed(4));
                       
                        totalcalculation();
          }
    
        
    }
    else
    {
       
                    var qty                       =     $("#qty_"+rcolumn).val();

                    var sellingprice              =     $("#offerprice_"+rcolumn).val();

                    var gst_per                   =     $("#prodgstper_"+rcolumn).html();
                 
                    var total_amount              =     Number(sellingprice) * Number(qty);


                    var sellingdiscount           =      0;

                    var totalsellingwgst          =     Number(sellingprice) * Number(qty);

                    var discount_percent          =     (Number(totaldiscount) / Number(totalsellingwgst)) * 100;

                    var discountedtotal_amount    =      Number(totalsellingwgst)  - Number(totaldiscount);

                    var totalgst                  =     (Number(discountedtotal_amount) * Number(gst_per)) / 100;

                    var stotal_amount             =      Number(total_amount).toFixed(2);
                    var total_amount              =      Number(total_amount).toFixed(4);
                    var totalgstprice             =      Number(discountedtotal_amount) + Number(totalgst);  

                    console.log(totaldiscount);

                     $("#overalldiscper_"+rcolumn).val(discount_percent.toFixed(4));
                     $("#prodgstamt_"+rcolumn).html(totalgst.toFixed(4));
                     $("#showtotaldiv_"+rcolumn).html(Number(totalgstprice).toFixed(2));
                     $('#totalprice_'+rcolumn).val(Number(discountedtotal_amount).toFixed(4));
                     $('#discountedprice_'+rcolumn).html(Number(discountedtotal_amount).toFixed(2));
                     $('#prodgstamt_'+rcolumn).html(Number(totalgst).toFixed(2));
                     $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                     $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                     $('#overalldiscamt_'+rcolumn).val(Number(totaldiscount).toFixed(4));
                     
                      totalcalculation();
      
        }
    

             

    
}

$('#hiddendiscount_comment').keyup(function(e){

      var discount_comment  = $('#hiddendiscount_comment').val();
      $('#discount_comment').val(discount_comment);
});

$('#applydiscount').click(function(e)
{
      var gross_total   =  $('#gross_total').html();
      var radiovalue  =  $('input[name="discount_type"]:checked').val();

      if(Number(radiovalue) == 1)
      {
          var discount_percent   =   $('#overalldiscount_percent').val();
      }
      else
      {
          var discount_amount   =   $('#overalldiscount_amount').val();
          discount_percent      =   (Number(discount_amount) / Number(gross_total)) * 100;
          discount_percent      =    Number(discount_percent).toFixed(4);
          
      }

                var discount_comment  = $('#hiddendiscount_comment').val();
                $('#discount_comment').val(discount_comment);
                $('.comment_section').show();
                var rcolumn                     =   '';
                var discount_amount             =   (Number(gross_total) * Number(discount_percent)) / 100;
                $('#totaldiscount_amount').html(discount_amount.toFixed(4));
                $('#showtotaldiscount_amount').html(discount_amount.toFixed(2));
                 
                opensavedkots();
                var kotqtytotal    =    0;
                var kotratetotal   =    0;
                var kotdisctotal   =    0;
                var kotpricetotal  =    0;
                var kotgsttotal    =    0;
                var kotgrandtotal  =    0;
                 
    
                var error = 0;
                var rowcount  = 0;

                $("#savedkot_detail_record").each(function (index,e)
                  {
                     
                       $(this).find('tr').each(function ()
                       {
                          if($(this).attr('id') != undefined)   
                          {
                              rcolumn = $(this).attr('id').split('product_')[1];
                              console.log(rcolumn);
                           }    
                            

                            if(($("#productid_"+rcolumn).val())!='')
                            {
                              
                                rowcount++;
                               $("#overalldiscper_"+rcolumn).val(discount_percent);

                                var qty                       =     $("#qty_"+rcolumn).val();

                                var sellingprice              =     $("#offerprice_"+rcolumn).val();
        
                                var gst_per                   =     $("#prodgstper_"+rcolumn).html();
                             
                                var total_amount              =     Number(sellingprice) * Number(qty);


                                var sellingdiscount           =      0;

                                var totalsellingwgst          =     Number(sellingprice) * Number(qty);

                                var totaldiscount             =     (Number(totalsellingwgst) * Number(discount_percent)) / 100;

                                var discountedtotal_amount    =      Number(totalsellingwgst)  - Number(totaldiscount);

                                var totalgst                  =     (Number(discountedtotal_amount) * Number(gst_per)) / 100;

                                var stotal_amount             =      Number(total_amount).toFixed(2);
                                var total_amount              =      Number(total_amount).toFixed(4);
                                var totalgstprice             =      Number(discountedtotal_amount) + Number(totalgst);  

                                 $("#prodgstamt_"+rcolumn).html(totalgst.toFixed(4));
                                 $("#showtotaldiv_"+rcolumn).html(Number(totalgstprice).toFixed(2));
                                 $('#totalprice_'+rcolumn).val(Number(discountedtotal_amount).toFixed(4));
                                 $('#discountedprice_'+rcolumn).html(Number(discountedtotal_amount).toFixed(2));
                                 $('#prodgstamt_'+rcolumn).html(Number(totalgst).toFixed(2));
                                 $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                                 $('#totalgstprice_'+rcolumn).val(Number(totalgstprice).toFixed(4));
                                 $('#overalldiscamt_'+rcolumn).val(Number(totaldiscount).toFixed(4));
                                 
                                  totalcalculation();
                                        
                            

                            }



                       });
                        if(Number(rowcount)==0)
                        {
                            totalcalculation();
                        }

                    


                  });
      
    
      $('#myModaladddiscount').modal('hide');

                 
});
