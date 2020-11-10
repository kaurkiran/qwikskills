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
            toastr.error("Wrong Product Scanned Please Scan the same Product again !");

        }
        else
        {

             var product_id = map[item]['product_id'];
             var field      =  1;
             
             sgetproductdetail(product_id,field);
             $(".productsearcharea .dropdown-menu").html('');

        }

    }

});

$("#fastproductsearch").typeahead({

   source: function(request, process) {
       var url = "fastproduct_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#fastproductsearch").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#fastproductsearch").val()
           objects = [];
           map = {};

           var scanned_data = data;
           if(scanned_data["Success"]=="False")
                {
                    toastr.error(scanned_data['Message']);
                    $(".productsearcharea .dropdown-menu").html('');
                    $('#fastproductsearch').val('');
                    
                }
                else
                {
                     if ($("#fastproductsearch").val() != '') {
                         $.each(data, function (i, object) {
                             map[object.label] = object;
                             objects.push(object.label);
                         });

                         process(objects);

                         if (objects != '') {
                             if (objects.length === 1) {
                                 $(".dropdown-menu .active").trigger("click");
                                  $(".productsearcharea .dropdown-menu").html('');
                                  $("#fastproductsearch").val('');
                             }
                         }

                         
                     } else {
                         $(".dropdown-menu").hide();
                     }
                }
       });

    },

    //minLength: 1,
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
            toastr.error("Wrong Product Scanned Please Scan the same Product again !");

        }
        else
        {
             var product_id = map[item]['product_id'];
             var field      =  2;

             sgetproductdetail(product_id,field);
             $(".productsearcharea .dropdown-menu").html('');

        }

    }

});

function sgetproductdetail(product_id,field)
{

    
   
   var type = "POST";
   var field      =   field;
   var url = 'sproduct_detail';
   var data = {
       "product_id" : product_id
   }
    var dataType = "";
   callroute(url,type,dataType,data,function(data)
   {
        
        var product_data = JSON.parse(data,true);


        if(product_data['Success'] == "True")
        {
            
            var product_html = '';
            var product_detail  = product_data['Data'][0];

            var skucode = '';
            var pricehtml = '';
            var pcount    = 0;
            var sellingprice  = 0;
            var stock = 0;
            var gst_per = 0;
            var costprice = 0;
            var modifiedofferprice = 0;
            var beforerangegst_per  = 0;
            //console.log(product_detail);

            var referral_loyalty_module   =     $('#referral_loyalty_module').val();

          if(product_data['Stock'] == 0 || product_data['Stock'] == undefined)
          {
                toastr.error("Stock not available!");
                $('#productsearch').val('');
                 $('.loaderContainer').hide();
                return false;

          }
          else
          {
             var sales_type              =   $('#sales_type').val();
             var noaddcount              =   0;
             if(Number(sales_type) == 4)
             {
                   $.each(product_detail['price_master'],function (key,value)
                  {
                      if(value['wholesaler_price']==0 || value['wholesaler_price']== null)
                      { 
                          toastr.error("Item cannnot be added. As it does not have wholesale price.Please update price at inward Stock.");
                          $('.loaderContainer').hide();
                          noaddcount++;
                          return false;
                          

                      }
                            
                  });

             }
             
             if(Number(sales_type) == 4 && Number(noaddcount) == 1)
             {
             
                $('#productsearch').val('');
                $('#fastproductsearch').val('');
                $('.loaderContainer').hide();
                return false;

             }

             $('.loaderContainer').hide();
            var product_id = product_detail['product_id'];
            

            if(product_detail['sku_code'] != null || product_detail['sku_code'] != undefined)
            {
                skucode = product_detail['sku_code'];
            }
           
             

            $.each(product_detail['price_master'],function (key,value)
            {
                if(pcount == 0)
                {
                    if(value['selling_gst_percent'] != null || value['selling_gst_percent'] != undefined)
                      {
                          gst_per        =   value['selling_gst_percent'];
                      }
                      else
                      {
                          gst_per        =   0;
                      }
                      if(Number(sales_type)==4)
                      {
                        sellingprice           =   (value['wholesaler_price'] / (value['selling_gst_percent'] + 100)) * 100;
                        modifiedofferprice     =   value['wholesaler_price'];
                      }
                      else
                      {
                        sellingprice           =   value['sell_price'];
                        modifiedofferprice     =   value['offer_price'];
                      }
                   

                    stock          =   value['product_qty'];
                    costprice      =   value['costprice'];
                    //modifiedofferprice     =   value['offer_price'];
                    beforerangegst_per     =   value['selling_gst_percent'];
                    
                }

                var showofferprice   =  Number(value['offer_price']).toFixed(0);
                pricehtml += '<option value='+value['price_master_id']+'>'+showofferprice+'</option>';
                pcount++;
            });


            var feature_show_val = "";
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

                      feature_show_val += '<td>' + feature_name + '</td>';
                  })
              }
            
           
            
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
                    $("#productsearch").val('');
                   return false;
               }
            });

            var discountreadonly  ='';
            var discountclass   =  '';
            var dtabindex = '';
            if(Number(discount_on_billing)==0)
            {
                discountreadonly   =  'readonly';
                discountclass      =  'noinput';
                dtabindex  = 'tabindex="-1"';
            }

            if(samerow == 0)
            {


                // if (product_html == '') 
                // {

                         var type                   =      "POST";
                         var url                   =      'gstrange_detail';
                         var gst_per = 0;
                                              
                               var data = {
                                   "sellingprice" : sellingprice,
                                   "hsn_sac_code" : product_detail['hsn_sac_code'],
                               }
                          var dataType = "";
                               callroute(url,type,dataType,data,function(data)
                               {
                                    var gst_data = JSON.parse(data,true);

                                    
                                    if(gst_data['Success'] == "True")
                                    {
                                       
                                        var gst_detail  = gst_data['Data'][0];
                                        $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                        $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                       
                                             gst_per     =        gst_detail['percentage'];  
                                     }
                                     else
                                     {
                                             gst_per      =        beforerangegst_per;
                                     }

                                        var discount_percent = 0;
                                         if(product_detail['discount_master']!=null)
                                         {
                                            discount_percent   =  product_detail['discount_master']['discount_percent'];
                                         }
                                        var showsellingwithoutgst        =    Number(sellingprice).toFixed(2);
                                        var qty =  1;
                                     
                                        var sgst_amount                  =     (Number(sellingprice) * Number(gst_per) / 100).toFixed(4);
                                        var mrp                          =     Number(sellingprice) + Number(sgst_amount);                  
                                      
                                        var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                                        var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                       
                                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                        
                                        var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

                                        var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                                        var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                                        var mrp                          =      Number(totaldiscount) + Number(gst_amount);
                                        
                                        var totalgst                     =      Number(gst_amount) * Number(qty);

                                        var sellingwithgst               =      Number(discountedamt) + Number(totalgst);

                                        var total_amount                 =      Number(discountedamt) + Number(totalgst);
                                       
                                         totaldiscount      =   Number(totaldiscount).toFixed(4);  
                                         totalmrpdiscount   =   Number(totalmrpdiscount).toFixed(4);  
                                         discountedamt      =   Number(discountedamt).toFixed(4);
                                         var stotalgst      =   Number(totalgst).toFixed(2);
                                         var stotal_amount  =   Number(total_amount).toFixed(2);

                                         if(product_detail['supplier_barcode']!='' && product_detail['supplier_barcode']!=null)
                                          {
                                            var barcode     =     product_detail['supplier_barcode'];
                                          }
                                          else
                                          {
                                            var barcode     =     product_detail['product_system_barcode'];
                                          }

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
                     
                      var uqc_name    = '';
                     
                      if(product_detail['uqc']!=null)
                      {
                        uqc_name   = product_detail['uqc']['uqc_name'];
                      }
                       var modifymrp  =  '';
                        var tabindex  =  '';
                      
                       if(Number(mrp_modification_type)==0)
                       {
                          modifymrp   = 'readonly';
                          tabindex  = 'tabindex="-1"';
                       }

                       
                       

                        product_html += '<tr id="product_' + product_id + '">' +
                        '<td class="pt-15 pb-15" id="product_name_'+product_id+'" name="product_name[]"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);"><span class="informative">'+product_detail['product_name']+'</span></a></td>'+ 
                        '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+barcode+'</a></td>';
                          product_html += feature_show_val;
                          product_html += '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+
                        '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                        '<input value="'+product_detail['product_system_barcode']+'" type="hidden" id="barcodesel_'+product_id+'" name="barcode_sel[]">'+
                        '<input value="" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                        '<input value="" type="hidden" id="stock_transfer_detail_id_'+product_id+'" name="stock_transfer_detail_id[]" class="" >'+
                        '<input value="" type="hidden" id="purchase_order_detail_id_'+product_id+'" name="purchase_order_detail_id[]" class="" >'+
                        '<input value="" type="hidden" id="consign_products_id_'+product_id+'" name="consign_products_id[]" class="" >'+
                        '<input value="'+product_detail['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+
                        '<input value="'+product_detail['hsn_sac_code']+'" type="hidden" id="hsncode_'+product_id+'" name="hsncode[]">'+
                        '</td>'+
                        '<td id="stock_'+product_id+'" name="stock[]" class="center">'+stock+'</td>'+ 
                        '<td id="sellingmrp_'+product_id+'">'+
                            '<select style="width:100%;border: 1px solid #ced4da;" name="mrp[]" id="mrp_'+product_id+'" onchange="return filterprice_detail(this);" tabindex="-1">'+
                                pricehtml+
                            '</select>'+
                            '<input type="text" class="modifiedmrp" id="modifiedmrp_'+product_id+'" value="'+modifiedofferprice+'" onkeyup="altermrp(this);" '+modifymrp+' '+tabindex+'/>'+'<input type="hidden" id="oldpricemasterid_'+product_id+'" name="oldpricemasterid[]"  value="" >'+
                            '<input type="hidden" id="inwardids'+product_id+'" name="inwardids[]"  value="" >'+
                            '<input type="hidden" id="inwardqtys'+product_id+'" name="inwardqtys[]"  value="" >'+
                          '</td>'+                       
                        '<td id="sellingpricewgst_'+product_id+'" class="rightAlign">'+
                        '<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control number" value="'+showsellingwithoutgst+'" readonly tabindex="-1">'+
                        '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]"  value="'+sellingprice+'" >'+
                        '<input type="hidden" id="costprice_'+product_id+'" class="floating-input tarifform-control number" value="'+costprice+'" readonly tabindex="-1">'+
                        '</td>'+                  
                        '<td id="sellingqty_'+product_id+'" class="center">'+
                        '<input type="text" id="qty_'+product_id+'" maxlength="3" class="floating-input tarifform-control number totqty" value="1" name="qty[]" onkeyup="return calqty(this);" style="width:90%">'+
                        '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="0" name="oldqty[]">'+
                        '<input type="hidden" id="issueqty_'+product_id+'" class="floating-input tarifform-control number" value="0" name="issueqty[]">'+
                        '</td>'+       
                        '<td id="sellingdiscountper_'+product_id+'" class="rightAlign">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number '+discountclass+'" value="'+discount_percent+'" name="proddiscper[]" onkeyup="return caldiscountper(this);" style="width:90%" '+discountreadonly+' '+dtabindex+'>'+
                        '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="0" name="proddiscper[]" style="display:none;">'+'</td>'+
                        '<td id="sellingdiscountamt_'+product_id+'" class="rightAlign">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control mrppproddiscamt number '+discountclass+'" value="'+totalmrpdiscount+'" onchange="return mrpcaldiscountamt(this);" '+discountreadonly+' '+dtabindex+'>'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" value="'+totaldiscount+'" name="proddiscamt[]" readonly tabindex="-1" style="display:none;">'+
                        '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="0" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="0" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                        '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                        '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                        '<td id="sprodgstper_'+product_id+'" style="text-align:right !important; display:none;" class="sprodgstper">'+gst_per+'</td>'+
                        '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important; display:none;">'+stotalgst+'</td>'+
                        '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+gst_per+'</td>'+
                        '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+totalgst+'</td>'+

                        '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                        '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;">'+stotal_amount+'</td>'+
                        '<td onclick="removerow(' + product_detail['product_id'] + ');"><i class="fa fa-close"></i></td>' +
                        '</tr>';

                        $('.whitespace').append('<br clear="all" />'); 


                        $("#sproduct_detail_record").prepend(product_html);
                         if(Number(sales_type)==3)
                         {
                              $("#sellingdiscountper_"+product_id).hide();
                              $("#sellingdiscountamt_"+product_id).hide();
                         }
                         
                         $("#productsearch").val('');
                          $(".odd").hide();
                          if(Number(field)==1)
                          {
                             $("#productsearch").val('');
                              $("#productsearch").focus();

                          }
                          else
                          {
                              $("#fastproductsearch").val('');
                              $("#fastproductsearch").focus();
                          }
                           var discount_percent            =   Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
                           var customer_points_percent     =   $('.customer_points_percent').html();
                           totalcalculation();
                           if((Number(discount_percent) + Number(customer_points_percent))>0)
                           {
                             //overalldiscountpercent();
                               if(Number(referral_loyalty_module) == 2)
                              {
                                  overalldiscountamount();
                              }
                              else
                              {
                                overalldiscountpercent();
                              }     
                           }
                            var chargesrecordvalue   =    $('*').hasClass('chargesTable');
      
                             if(chargesrecordvalue == true)
                             {
                              
                                calculatetotalcharges();
                             }


                    });
                         


                // } 
                // else {

                //          var type                  =      "POST";
                //          var url                   =      'gstrange_detail';
                //          var gst_per = 0;
                                              
                //                var data = {
                //                    "sellingprice" : sellingprice,
                //                }
                //     var dataType = "";
                //                callroute(url,type,dataType,data,function(data)
                //                {
                //                     var gst_data = JSON.parse(data,true);

                                    
                //                     if(gst_data['Success'] == "True")
                //                     {
                                       
                //                         var gst_detail  = gst_data['Data'][0];
                //                         $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                //                         $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                //                             gst_per     =        gst_detail['percentage'];
                //                      }


                //                        var discount_percent = 0;
                //                          if(product_detail['discount_master']!=null)
                //                          {
                //                             discount_percent   =  product_detail['discount_master']['discount_percent'];
                //                          }
                //                         var showsellingwithoutgst        =    sellingprice.toFixed(2);
                //                         var qty =  1;
                                     
                //                         var sgst_amount                  =     (Number(sellingprice) * Number(gst_per) / 100).toFixed(4);
                //                         var mrp                          =     Number(sellingprice) + Number(sgst_amount);                  
                                      
                //                         var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                //                         var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
                       
                //                         var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                        
                //                         var gst_amount                   =     (Number(sellingprice-sellingdiscount) * Number(gst_per) / 100).toFixed(4);

                //                         var totaldiscount                =      Number(sellingdiscount) * Number(qty);

                //                         var discountedamt                =      Number(totalsellingwgst) - Number(totaldiscount);

                //                         var mrp                          =      Number(totaldiscount) + Number(gst_amount);
                                        
                //                         var totalgst                     =      Number(gst_amount) * Number(qty);

                //                         var sellingwithgst               =      Number(discountedamt) + Number(totalgst);

                //                         var total_amount                 =      Number(discountedamt) + Number(totalgst);
                                       
                //                          totaldiscount      =   Number(totaldiscount).toFixed(4);  
                //                          totalmrpdiscount   =   Number(totalmrpdiscount).toFixed(4);    
                //                          discountedamt      =   Number(discountedamt).toFixed(4);
                //                          var stotalgst      =   Number(totalgst).toFixed(2);
                //                          var stotal_amount  =   Number(total_amount).toFixed(2);

                 
                //     product_html += product_html + '<tr id="product_' + product_id + '">' +
                //         '<td class="pt-15 pb-15" id="product_name_'+product_id+'" name="product_name[]"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);"><span class="informative">'+product_detail['product_name']+'</span></a></td>'+ 
                //         '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+barcode+'</a></td>'+
                //         '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+colour_name+'</a></td>'+
                //         '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+size_name+'</a></td>'+
                //         '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+
                //         '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                //         '<input value="'+product_detail['product_system_barcode']+'" type="hidden" id="barcodesel_'+product_id+'" name="barcode_sel[]">'+
                //         '<input value="" type="hidden" id="sales_product_id_'+product_id+'" name="sales_product_id[]" class="" >'+
                //         '<input value="" type="hidden" id="stock_transfer_detail_id_'+product_id+'" name="stock_transfer_detail_id[]" class="" >'+
                //         '<input value="" type="hidden" id="consign_products_id_'+product_id+'" name="consign_products_id[]" class="" >'+
                //         '<input value="'+product_detail['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+

                //         '</td>'+
                //         '<td id="stock_'+product_id+'" name="stock[]" class="center">'+stock+'</td>'+ 
                //         '<td id="sellingmrp_'+product_id+'">'+
                //             '<select style="width:100%;border: 1px solid #ced4da;" name="mrp[]" id="mrp_'+product_id+'" onchange="return filterprice_detail(this);" tabindex="-1">'+
                //                 pricehtml+
                //             '</select>'+
                //             '<input type="text" class="modifiedmrp" id="modifiedmrp_'+product_id+'" value="'+modifiedofferprice+'" onkeyup="altermrp(this);" '+modifymrp+' '+tabindex+'/>'+'<input type="hidden" id="oldpricemasterid_'+product_id+'" name="oldpricemasterid[]"  value="" >'+
                //             '<input type="hidden" id="inwardids'+product_id+'" name="inwardids[]"  value="" >'+
                //             '<input type="hidden" id="inwardqtys'+product_id+'" name="inwardqtys[]"  value="" >'+
                //           '</td>'+                       
                //         '<td id="sellingpricewgst_'+product_id+'" class="rightAlign">'+
                //         '<input type="text" id="showsellingwithoutgst_'+product_id+'" class="floating-input tarifform-control noinput" value="'+showsellingwithoutgst+'" readonly tabindex="-1">'+
                //         '<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number tsellingwithoutgst" name="tsellingwithoutgst[]"  value="'+sellingprice+'" >'+
                //         '<input type="hidden" id="costprice_'+product_id+'" class="floating-input tarifform-control number" value="'+costprice+'" readonly tabindex="-1">'+
                //         '</td>'+                  
                //         '<td id="sellingqty_'+product_id+'" class="center">'+
                //         '<input type="text" id="qty_'+product_id+'" maxlength="3" class="floating-input tarifform-control number totqty" value="1" name="qty[]" onkeyup="return calqty(this);" style="width:90%">'+
                //         '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="0" name="oldqty[]">'+
                //         '</td>'+       
                //         '<td id="sellingdiscountper_'+product_id+'" class="rightAlign">'+'<input type="text" id="proddiscper_'+product_id+'" class="floating-input tarifform-control number" value="'+discount_percent+'" name="proddiscper[]" onkeyup="return caldiscountper(this);" style="width:90%">'+
                //         '<input type="text" id="overalldiscper_'+product_id+'" class="floating-input tarifform-control number" value="0" name="proddiscper[]" style="display:none;">'+'</td>'+
                //         '<td id="sellingdiscountamt_'+product_id+'" class="rightAlign">'+'<input type="text" id="mrpproddiscamt_'+product_id+'" class="floating-input tarifform-control number mrppproddiscamt" value="'+totalmrpdiscount+'" onchange="return mrpcaldiscountamt(this);">'+'<input type="text" id="proddiscamt_'+product_id+'" class="floating-input tarifform-control number pproddiscamt" value="'+totaldiscount+'" name="proddiscamt[]" readonly tabindex="-1" style="display:none;">'+
                //         '<input type="text" id="overalldiscamt_'+product_id+'" class="floating-input tarifform-control number overallpproddiscamt" value="0" name="proddiscamt[]" style="display:none;">'+'<input type="text" id="overallmrpdiscamt_'+product_id+'" class="floating-input tarifform-control number" value="0" name="overallmrpdiscamt[]" style="display:none;">'+'</td>'+

                //         '<td style="display:none;" id="totalsellingwgst_'+product_id+'" class="totalsellingwgst" name="totalsellingwgst[]">'+discountedamt+'</td>'+
                //         '<td style="display:none;" id="totalsellinggst_'+product_id+'" class="totalsellinggst">'+sellingwithgst+'</td>'+
                //         '<td id="sprodgstper_'+product_id+'" style="text-align:right !important; display:none;" class="sprodgstper">'+gst_per+'</td>'+
                //         '<td id="sprodgstamt_'+product_id+'" style="text-align:right !important; display:none;">'+stotalgst+'</td>'+
                //         '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+gst_per+'</td>'+
                //         '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+totalgst+'</td>'+

                //         '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                //         '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;">'+stotal_amount+'</td>'+
                //         '<td onclick="removerow(' + product_detail['product_id'] + ');"><i class="fa fa-close"></i></td>' +
                //         '</tr>';

                //         $("#sproduct_detail_record").prepend(product_html);
                //         if(Number(sales_type)==3)
                //          {
                //               $("#sellingdiscountper_"+product_id).hide();
                //               $("#sellingdiscountamt_"+product_id).hide();
                //          }
                //          $("#productsearch").val('');
                //           $(".odd").hide();
                //           totalcalculation();
                //             var chargesrecordvalue   =    $('*').hasClass('chargesTable');
      
                //                if(chargesrecordvalue == true)
                //                {
                                
                //                   calculatetotalcharges();
                //                }

                //       });

                // }
               

            }

        }
    }

   if(product_data["Success"]=="False")
    {
        toastr.error(product_data['Message']);
        $('.loaderContainer').hide();
        $('#productsearch').val('');
    }  


      
   });
}
function removerow(productid)
{
   $("#product_"+productid).remove();
    var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
            //overalldiscountpercent();
             if(Number(referral_loyalty_module) == 2)
            {
                overalldiscountamount();
            }
            else
            {
              overalldiscountpercent();
            }   
     }    
    //totalcalculation();
     var srrno  = 0;
    $('.totqty').each(function(e){
        var ssrno  = 0;
        if($(this).val()!='')
        {
            srrno++;
        }
    });

    if(Number(ssrno)==1)
      {
        $('.plural').html('Item');
      }
      else if(Number(ssrno)>1)
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
    var hsn_sac_code              =     $("#hsncode_"+product_id).val();
    var beforerangegst_per        =     $('#prodgstper_'+product_id).html();
    
    $("#modifiedmrp_"+product_id).val(actualmrp);

    var url     =   "search_pricedetail";
    var type    =   "POST";
    var data    =   {
        "price_id":priceid
    };
    var dataType = "";
    callroute(url,type,dataType,data,function (data)
    {
        var price_data = JSON.parse(data,true);
        
        if(price_data['Success'] == "True")
        {
            var price_detail  = price_data['Data'][0];
            if(price_data['Data'].length > 0)
            {



                $("#showsellingwithoutgst_"+product_id).val(price_detail['sell_price'].toFixed(2));
                $("#sellingwithoutgst_"+product_id).val(price_detail['sell_price']);
                
                
                var gst_per = 0;

                var sellingprice                =   price_detail['sell_price'];
                var stock = 0;

                         var type                  =      "POST";
                         var url                   =      'gstrange_detail';
                         var gst_per = 0;
                                              
                               var data = {
                                   "sellingprice" : sellingprice,
                                   "hsn_sac_code" : hsn_sac_code,
                               }
                var dataType = "";
                               callroute(url,type,dataType,data,function(data)
                               {
                                    var gst_data = JSON.parse(data,true);

                                    
                                    if(gst_data['Success'] == "True")
                                    {
                                       
                                        var gst_detail  = gst_data['Data'][0];
                                        $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                        $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                            gst_per     =        gst_detail['percentage'];

                
                                     }
                                     else
                                     {
                                          gst_per        =  beforerangegst_per;
                                     }

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
                    

                                });
                   
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
    var referral_loyalty_module   =     $('#referral_loyalty_module').val();

    

    var sellingdiscount           =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);
    var checksellingprice         =      Number(sellingprice) - Number(sellingdiscount);



    if(Number(discount_on_billing)==1 && Number(is_master)==0)
    {
        if(Number(discount_percent) > Number(discount_val_on_billing))
        {
            toastr.error("Discount cannot be greater than "+discount_val_on_billing+" as mentioned for this user");
            $('#proddiscper_'+product_id).val(0);

                                      var type                         =      "POST";
                                      var url                          =      'gstrange_detail';
                                      var discount_percent          =     $('#proddiscper_'+product_id).val();
                                      var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                                      var hsn_sac_code              =     $("#hsncode_"+product_id).val();
                                      var qty                       =     $("#qty_"+product_id).val();
                                      var gst_per                   =     $("#sprodgstper_"+product_id).html();
                                      var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                                      var beforerangegst_per        =     $('#prodgstper_'+product_id).html();
                                      var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                        
                   
                                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                        var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);

                                        var sellingafterdiscount         =      Number(sellingprice)-Number(sellingdiscount);
                                        console.log(sellingafterdiscount);
                                        var gst_per = 0;
                                                          
                                           var data = {
                                               "sellingprice" : sellingafterdiscount,
                                               "hsn_sac_code" : hsn_sac_code,
                                           }
                                    var dataType = "";
                                           callroute(url,type,dataType,data,function(data)
                                           {
                                                var gst_data = JSON.parse(data,true);

                                                
                                                if(gst_data['Success'] == "True")
                                                {
                                                   
                                                    var gst_detail  = gst_data['Data'][0];
                                                    $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                                    $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                                        gst_per     =        gst_detail['percentage'];
                                                 }
                                                 else
                                                 {
                                                      gst_per     =  beforerangegst_per;
                                                 }
                                                  
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

                                                  var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                                                    //overalldiscountpercent();
                                                     if(Number(referral_loyalty_module) == 2)
                                                    {
                                                        overalldiscountamount();
                                                    }
                                                    else
                                                    {
                                                      overalldiscountpercent();
                                                    }
                                                 }

                                            });
            
        }
        else
        {

          
        
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
                                      var type                         =      "POST";
                                      var url                          =      'gstrange_detail';
                                      var discount_percent          =     $('#proddiscper_'+product_id).val();
                                      var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                                      var hsn_sac_code              =     $("#hsncode_"+product_id).val();
                                      var qty                       =     $("#qty_"+product_id).val();
                                      var gst_per                   =     $("#sprodgstper_"+product_id).html();
                                      var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                                      var beforerangegst_per        =     $('#prodgstper_'+product_id).html();
                                      var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                        
                   
                                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                        var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);

                                        var sellingafterdiscount         =      Number(sellingprice)-Number(sellingdiscount);
                                        console.log(sellingafterdiscount);
                                        var gst_per = 0;
                                                          
                                           var data = {
                                               "sellingprice" : sellingafterdiscount,
                                               "hsn_sac_code" : hsn_sac_code,
                                           }
                                    var dataType = "";
                                           callroute(url,type,dataType,data,function(data)
                                           {
                                                var gst_data = JSON.parse(data,true);

                                                
                                                if(gst_data['Success'] == "True")
                                                {
                                                   
                                                    var gst_detail  = gst_data['Data'][0];
                                                    $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                                    $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                                        gst_per     =        gst_detail['percentage'];
                                                 }
                                                 else
                                                 {
                                                      gst_per     =  beforerangegst_per;
                                                 }
                                                  
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

                                                  var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                                                    //overalldiscountpercent();
                                                     if(Number(referral_loyalty_module) == 2)
                                                    {
                                                        overalldiscountamount();
                                                    }
                                                    else
                                                    {
                                                      overalldiscountpercent();
                                                    } 
                                                 }

                                            });
                                     }
                        else {
                                  swal("Cancelled", "You can change Discount");
                                   $('#proddiscper_'+product_id).val(0);

                                      var discount_percent          =     $('#proddiscper_'+product_id).val();
                                      var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                                      var hsn_sac_code              =     $("#hsncode_"+product_id).val();
                                      var qty                       =     $("#qty_"+product_id).val();
                                      var gst_per                   =     $("#sprodgstper_"+product_id).html();
                                      var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                                      var beforerangegst_per        =     $('#prodgstper_'+product_id).html();


                                      var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;
                                      var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                      var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);

                                      var sellingafterdiscount         =      Number(sellingprice)-Number(sellingdiscount);
                                      console.log(sellingafterdiscount);
                                       var type                         =      "POST";
                                      var url                          =      'gstrange_detail';
                                      var gst_per = 0;
                                                          
                                           var data = {
                                               "sellingprice" : sellingafterdiscount,
                                               "hsn_sac_code" : hsn_sac_code,
                                           }
                                    var dataType = "";
                                           callroute(url,type,dataType,data,function(data)
                                           {
                                                var gst_data = JSON.parse(data,true);

                                                
                                                if(gst_data['Success'] == "True")
                                                {
                                                   
                                                    var gst_detail  = gst_data['Data'][0];
                                                    $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                                    $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                                        gst_per     =        gst_detail['percentage'];
                                                 }
                                                 else
                                                 {
                                                       gst_per       =   beforerangegst_per;
                                                 }

                                                 
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

                                                  var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                                                   //overalldiscountpercent();
                                                     if(Number(referral_loyalty_module) == 2)
                                                    {
                                                        overalldiscountamount();
                                                    }
                                                    else
                                                    {
                                                      overalldiscountpercent();
                                                    }
                                                 }

                                            });
                      }
                     });
                   }
                   else
                   {
                                      var discount_percent          =     $('#proddiscper_'+product_id).val();
                                      var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                                      var hsn_sac_code              =     $("#hsncode_"+product_id).val();
                                      var qty                       =     $("#qty_"+product_id).val();
                                      var gst_per                   =     $("#sprodgstper_"+product_id).html();
                                      var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                                      var beforerangegst_per        =     $('#prodgstper_'+product_id).html();
                                      var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;
                                      var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                      var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);

                                      var sellingafterdiscount         =      Number(sellingprice)-Number(sellingdiscount);
                                      console.log(sellingafterdiscount);
                                      var gst_per = 0;
                                       var type                         =      "POST";
                                      var url                          =      'gstrange_detail';
                                                          
                                           var data = {
                                               "sellingprice" : sellingafterdiscount,
                                               "hsn_sac_code" : hsn_sac_code,
                                           }
                       var dataType = "";
                                           callroute(url,type,dataType,data,function(data)
                                           {
                                                var gst_data = JSON.parse(data,true);

                                                
                                                if(gst_data['Success'] == "True")
                                                {
                                                   
                                                    var gst_detail  = gst_data['Data'][0];
                                                    $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                                    $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                                        gst_per     =        gst_detail['percentage'];
                                                 }
                                                 else
                                                 {
                                                      gst_per      =  beforerangegst_per;
                                                 }

                                                 
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

                                                   var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                                                    //overalldiscountpercent();
                                                     if(Number(referral_loyalty_module) == 2)
                                                    {
                                                        overalldiscountamount();
                                                    }
                                                    else
                                                    {
                                                      overalldiscountpercent();
                                                    }
                                                 }

                                            });
                   }
           }
      }
      else
      {
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
                                      var type                         =      "POST";
                                      var url                          =      'gstrange_detail';
                                      var discount_percent          =     $('#proddiscper_'+product_id).val();
                                      var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                                      var hsn_sac_code              =     $("#hsncode_"+product_id).val();
                                      var qty                       =     $("#qty_"+product_id).val();
                                      var gst_per                   =     $("#sprodgstper_"+product_id).html();
                                      var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                                      var beforerangegst_per        =     $('#prodgstper_'+product_id).html();
                                      var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;

                        
                   
                                        var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                        var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);

                                        var sellingafterdiscount         =      Number(sellingprice)-Number(sellingdiscount);
                                        console.log(sellingafterdiscount);
                                        var gst_per = 0;
                                                          
                                           var data = {
                                               "sellingprice" : sellingafterdiscount,
                                               "hsn_sac_code" : hsn_sac_code,
                                           }
                                    var dataType = "";
                                           callroute(url,type,dataType,data,function(data)
                                           {
                                                var gst_data = JSON.parse(data,true);

                                                
                                                if(gst_data['Success'] == "True")
                                                {
                                                   
                                                    var gst_detail  = gst_data['Data'][0];
                                                    $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                                    $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                                        gst_per     =        gst_detail['percentage'];
                                                 }
                                                 else
                                                 {
                                                      gst_per     =  beforerangegst_per;
                                                 }
                                                  
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

                                                  var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                                                    //overalldiscountpercent();
                                                     if(Number(referral_loyalty_module) == 2)
                                                    {
                                                        overalldiscountamount();
                                                    }
                                                    else
                                                    {
                                                      overalldiscountpercent();
                                                    }
                                                 }

                                            });
                                     }
                        else {
                                  swal("Cancelled", "You can change Discount");
                                   $('#proddiscper_'+product_id).val(0);

                                      var discount_percent          =     $('#proddiscper_'+product_id).val();
                                      var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                                      var hsn_sac_code              =     $("#hsncode_"+product_id).val();
                                      var qty                       =     $("#qty_"+product_id).val();
                                      var gst_per                   =     $("#sprodgstper_"+product_id).html();
                                      var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                                      var beforerangegst_per        =     $('#prodgstper_'+product_id).html();


                                      var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;
                                      var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                      var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);

                                      var sellingafterdiscount         =      Number(sellingprice)-Number(sellingdiscount);
                                      console.log(sellingafterdiscount);
                                       var type                         =      "POST";
                                      var url                          =      'gstrange_detail';
                                      var gst_per = 0;
                                                          
                                           var data = {
                                               "sellingprice" : sellingafterdiscount,
                                               "hsn_sac_code" : hsn_sac_code,
                                           }
                                    var dataType = "";
                                           callroute(url,type,dataType,data,function(data)
                                           {
                                                var gst_data = JSON.parse(data,true);

                                                
                                                if(gst_data['Success'] == "True")
                                                {
                                                   
                                                    var gst_detail  = gst_data['Data'][0];
                                                    $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                                    $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                                        gst_per     =        gst_detail['percentage'];
                                                 }
                                                 else
                                                 {
                                                       gst_per       =   beforerangegst_per;
                                                 }

                                                 
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

                                                  var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                                                   //overalldiscountpercent();
                                                     if(Number(referral_loyalty_module) == 2)
                                                    {
                                                        overalldiscountamount();
                                                    }
                                                    else
                                                    {
                                                      overalldiscountpercent();
                                                    }
                                                 }

                                            });
                      }
                     });
                   }
                   else
                   {
                                      var discount_percent          =     $('#proddiscper_'+product_id).val();
                                      var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
                                      var hsn_sac_code              =     $("#hsncode_"+product_id).val();
                                      var qty                       =     $("#qty_"+product_id).val();
                                      var gst_per                   =     $("#sprodgstper_"+product_id).html();
                                      var mrp                       =     $("#mrp_"+product_id+" :selected").html();
                                      var beforerangegst_per        =     $('#prodgstper_'+product_id).html();
                                      var totalmrpdiscount             =     (Number(mrp) * Number(qty)) * Number(discount_percent) / 100;
                                      var totalsellingwgst             =     Number(sellingprice) * Number(qty);
                                      var sellingdiscount              =     (Number(sellingprice) * Number(discount_percent) / 100).toFixed(4);

                                      var sellingafterdiscount         =      Number(sellingprice)-Number(sellingdiscount);
                                      console.log(sellingafterdiscount);
                                      var gst_per = 0;
                                       var type                         =      "POST";
                                      var url                          =      'gstrange_detail';
                                                          
                                           var data = {
                                               "sellingprice" : sellingafterdiscount,
                                               "hsn_sac_code" : hsn_sac_code,
                                           }
                       var dataType = "";
                                           callroute(url,type,dataType,data,function(data)
                                           {
                                                var gst_data = JSON.parse(data,true);

                                                
                                                if(gst_data['Success'] == "True")
                                                {
                                                   
                                                    var gst_detail  = gst_data['Data'][0];
                                                    $("#sprodgstper_"+product_id).html(gst_detail['percentage']);
                                                    $("#prodgstper_"+product_id).html(gst_detail['percentage']);
                                                        gst_per     =        gst_detail['percentage'];
                                                 }
                                                 else
                                                 {
                                                      gst_per      =  beforerangegst_per;
                                                 }

                                                 
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

                                                   var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                                                    //overalldiscountpercent();
                                                     if(Number(referral_loyalty_module) == 2)
                                                    {
                                                        overalldiscountamount();
                                                    }
                                                    else
                                                    {
                                                      overalldiscountpercent();
                                                    }
                                                 }

                                            });
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
    var stock                     =     $('#stock_'+product_id).html
    var hsn_sac_code              =     $("#hsncode_"+product_id).val();
    var referral_loyalty_module   =     $('#referral_loyalty_module').val();
    var totalstock   =   Number(stock) + Number(oldqty);

    if(Number(qty)>Number(totalstock))
    {
        toastr.error("Entered Qty is greater than Stock");
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

           var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html());  
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
               // $("#discount_percent").val(discount_percent);
                 //overalldiscountpercent();
                 if(Number(referral_loyalty_module) == 2)
                {
                    overalldiscountamount();
                }
                else
                {
                  overalldiscountpercent();
                }
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
         $("#mrpproddiscamt_"+product_id).val(totalmrpdiscount.toFixed(4));
         $("#proddiscamt_"+product_id).val(totaldiscount.toFixed(4));
         $("#prodgstamt_"+product_id).html(totalgst.toFixed(4));
         $("#totalamount_"+product_id).html(total_amount.toFixed(4));

         $("#sprodgstamt_"+product_id).html(totalgst.toFixed(2));
         $("#stotalamount_"+product_id).html(total_amount.toFixed(2));

           var discount_percent        =     Number($("#discount_percent").val()) + Number($(".customer_points_percent").html()); 
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
                //overalldiscountpercent();
                 if(Number(referral_loyalty_module) == 2)
                {
                    overalldiscountamount();
                }
                else
                {
                  overalldiscountpercent();
                }
             }  
     }
}


function overalldiscountpercent()
{
      
     $('.loaderContainer').show();
      var ddiscount_percent                 =   $('#discount_percent').val();
      var rcolumn                           =   '';

      var sales_total                       =   $('#sales_total').val();
      var actualcustomer_points_percent     =   $('.actualcustomer_points_percent').html();
      var referral_points_percent           =   $('#referral_points_percent').val();
      var customerbalused_points            =   $('#customerbalused_points').val();


      if(Number(discount_on_billing)==1 && Number(is_master)==0)
     {
        if(Number(ddiscount_percent) > Number(discount_val_on_billing))
        {
            toastr.error("Discount cannot be greater than "+discount_val_on_billing+" as mentioned for this user");
            $('#discount_percent').val(0);
            var ddiscount_percent                 =   $('#discount_percent').val();


                            if($('#customerbalused_points').val()>0)
                            {
                                  var beforebalcustomerdiscount            =   Number(sales_total) * Number(actualcustomer_points_percent) /100;

                                  var customerdiscount            =   Number(beforebalcustomerdiscount)  + Number(customerbalused_points);
                                  $('#customer_points').val(Number(customerdiscount).toFixed(4));
                                  var customer_points_percent     =   (Number(customerdiscount) / Number(sales_total)) * 100;
                                  $('.customer_points_percent').html(Number(customer_points_percent).toFixed(4));
                            }
                            else
                            {

                              var customerdiscount            =   Number(sales_total) * Number(actualcustomer_points_percent) /100;
                              $('#customer_points').val(Number(customerdiscount).toFixed(4));
                              $('.customer_points_percent').html(Number(actualcustomer_points_percent).toFixed(4));
                            }

                            //console.log(customerdiscount);

                            var discount_amount             =   ((Number(sales_total) - Number(customerdiscount)) * Number(ddiscount_percent)) / 100;
                            $('#discount_amount').val(discount_amount.toFixed(4));

                           
                          
                           
                            var totaldiscountamount        =   Number(customerdiscount)  + Number(discount_amount);

                            var actualdiscountpercentage   =   (Number(totaldiscountamount) / Number(sales_total)) * 100;
                            actualdiscountpercentage       =   Number(actualdiscountpercentage).toFixed(4);
                            $('#totaldiscount_percent').val(Number(actualdiscountpercentage));
                            var discount_percent           =  Number(actualdiscountpercentage)

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
                                            var hsn_sac_code                 =     $("#hsncode_"+rcolumn).val();
                                            var beforerangegst_per           =     $('#prodgstper_'+rcolumn).html();

                                            var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                                            var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                                            var totalproddiscountamt         =     Number(proddiscountamt)

                                            var sellingafterdiscount         =     Number(totalsellingwgst) - Number(proddiscountamt);

                                            var singleselling                =     Number(sellingafterdiscount)/Number(qty);

                                            // if(Number(singleselling) <= 999)
                                            // {

                                                  var type                  =      "POST";
                                                  var url                   =      'gstrange_detail';

                                                  var gst_per = 0;
                                                  var rcolumn  = rcolumn;

                                                  var data = {
                                                    "sellingprice" : singleselling,
                                                    "hsn_sac_code" : hsn_sac_code,
                                                  }
                                                  var dataType = "";
                                                  callroute(url,type,dataType,data,function(data)
                                                  {
                                                      var gst_data = JSON.parse(data,true);


                                                      if(gst_data['Success'] == "True")
                                                      {

                                                        var gst_detail  = gst_data['Data'][0];
                                                        $("#sprodgstper_"+rcolumn).html(gst_detail['percentage']);
                                                        $("#prodgstper_"+rcolumn).html(gst_detail['percentage']);
                                                        gst_percent     =        gst_detail['percentage'];

                                                      }
                                                      else
                                                      {
                                                          gst_percent    =   beforerangegst_per;
                                                      }
                                                        
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
                                                  });

                                        }
                                      


                                   });

                                


                              });


              }
       else
       {
                          if($('#customerbalused_points').val()>0)
                            {
                                  var beforebalcustomerdiscount            =   Number(sales_total) * Number(actualcustomer_points_percent) /100;

                                  var customerdiscount            =   Number(beforebalcustomerdiscount)  + Number(customerbalused_points);
                                  $('#customer_points').val(Number(customerdiscount).toFixed(4));
                                  var customer_points_percent     =   (Number(customerdiscount) / Number(sales_total)) * 100;
                                  $('.customer_points_percent').html(Number(customer_points_percent).toFixed(4));
                            }
                            else
                            {

                              var customerdiscount            =   Number(sales_total) * Number(actualcustomer_points_percent) /100;
                              $('#customer_points').val(Number(customerdiscount).toFixed(4));
                              $('.customer_points_percent').html(Number(actualcustomer_points_percent).toFixed(4));
                            }

                            //console.log(customerdiscount);

                            var discount_amount             =   ((Number(sales_total) - Number(customerdiscount)) * Number(ddiscount_percent)) / 100;
                            $('#discount_amount').val(discount_amount.toFixed(4));

                           
                          
                           
                            var totaldiscountamount        =   Number(customerdiscount)  + Number(discount_amount);

                            var actualdiscountpercentage   =   (Number(totaldiscountamount) / Number(sales_total)) * 100;
                            actualdiscountpercentage       =   Number(actualdiscountpercentage).toFixed(4);
                            $('#totaldiscount_percent').val(Number(actualdiscountpercentage));
                            var discount_percent           =  Number(actualdiscountpercentage)

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
                                            var hsn_sac_code                 =     $("#hsncode_"+rcolumn).val();
                                            var beforerangegst_per           =     $('#prodgstper_'+rcolumn).html();

                                            var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                                            var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                                            var totalproddiscountamt         =     Number(proddiscountamt)

                                            var sellingafterdiscount         =     Number(totalsellingwgst) - Number(proddiscountamt);

                                            var singleselling                =     Number(sellingafterdiscount)/Number(qty);

                                            // if(Number(singleselling) <= 999)
                                            // {

                                                  var type                  =      "POST";
                                                  var url                   =      'gstrange_detail';

                                                  var gst_per = 0;
                                                  var rcolumn  = rcolumn;

                                                  var data = {
                                                    "sellingprice" : singleselling,
                                                    "hsn_sac_code" : hsn_sac_code,
                                                  }
                                                  var dataType = "";
                                                  callroute(url,type,dataType,data,function(data)
                                                  {
                                                      var gst_data = JSON.parse(data,true);


                                                      if(gst_data['Success'] == "True")
                                                      {

                                                        var gst_detail  = gst_data['Data'][0];
                                                        $("#sprodgstper_"+rcolumn).html(gst_detail['percentage']);
                                                        $("#prodgstper_"+rcolumn).html(gst_detail['percentage']);
                                                        gst_percent     =        gst_detail['percentage'];

                                                      }
                                                      else
                                                      {
                                                          gst_percent    =   beforerangegst_per;
                                                      }
                                                        
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
                                                  });

                                        }
                                      


                                   });

                                


                              });
       }
     }
     else
     {
                          if($('#customerbalused_points').val()>0)
                            {
                                  var beforebalcustomerdiscount            =   Number(sales_total) * Number(actualcustomer_points_percent) /100;

                                  var customerdiscount            =   Number(beforebalcustomerdiscount)  + Number(customerbalused_points);
                                  $('#customer_points').val(Number(customerdiscount).toFixed(4));
                                  var customer_points_percent     =   (Number(customerdiscount) / Number(sales_total)) * 100;
                                  $('.customer_points_percent').html(Number(customer_points_percent).toFixed(4));
                            }
                            else
                            {

                              var customerdiscount            =   Number(sales_total) * Number(actualcustomer_points_percent) /100;
                              $('#customer_points').val(Number(customerdiscount).toFixed(4));
                              $('.customer_points_percent').html(Number(actualcustomer_points_percent).toFixed(4));
                            }

                            //console.log(customerdiscount);

                            var discount_amount             =   ((Number(sales_total) - Number(customerdiscount)) * Number(ddiscount_percent)) / 100;
                            $('#discount_amount').val(discount_amount.toFixed(4));

                           
                          
                           
                            var totaldiscountamount        =   Number(customerdiscount)  + Number(discount_amount);

                            var actualdiscountpercentage   =   (Number(totaldiscountamount) / Number(sales_total)) * 100;
                            actualdiscountpercentage       =   Number(actualdiscountpercentage).toFixed(4);
                            $('#totaldiscount_percent').val(Number(actualdiscountpercentage));
                            var discount_percent           =  Number(actualdiscountpercentage)

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
                                            var hsn_sac_code                 =     $("#hsncode_"+rcolumn).val();
                                            var beforerangegst_per           =     $('#prodgstper_'+rcolumn).html();

                                            var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                                            var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                                            var totalproddiscountamt         =     Number(proddiscountamt)

                                            var sellingafterdiscount         =     Number(totalsellingwgst) - Number(proddiscountamt);

                                            var singleselling                =     Number(sellingafterdiscount)/Number(qty);

                                            // if(Number(singleselling) <= 999)
                                            // {

                                                  var type                  =      "POST";
                                                  var url                   =      'gstrange_detail';

                                                  var gst_per = 0;
                                                  var rcolumn  = rcolumn;

                                                  var data = {
                                                    "sellingprice" : singleselling,
                                                    "hsn_sac_code" : hsn_sac_code,
                                                  }
                                                  var dataType = "";
                                                  callroute(url,type,dataType,data,function(data)
                                                  {
                                                      var gst_data = JSON.parse(data,true);


                                                      if(gst_data['Success'] == "True")
                                                      {

                                                        var gst_detail  = gst_data['Data'][0];
                                                        $("#sprodgstper_"+rcolumn).html(gst_detail['percentage']);
                                                        $("#prodgstper_"+rcolumn).html(gst_detail['percentage']);
                                                        gst_percent     =        gst_detail['percentage'];

                                                      }
                                                      else
                                                      {
                                                          gst_percent    =   beforerangegst_per;
                                                      }
                                                        
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
                                                  });

                                        }
                                      


                                   });

                                


                              });
     }
              


                      $('.loaderContainer').hide();

}
function overalldiscountamount()
{
    var billdiscount_amount        =   $('#discount_amount').val();
    var discount_amount            =   Number(billdiscount_amount);

    var ssales_total                =   $('#sales_total').val();
    

    var customer_points             =    $('#customer_points').val();

    var customer_points_percent     =    $('.customer_points_percent').html();             
    var referral_points_percent     =    $('#referral_points_percent').val();




    customer_points_percent       =   (Number(customer_points) / Number(ssales_total)) * 100;
    $('.customer_points_percent').html(Number(customer_points_percent).toFixed(4));

    var sales_total               =     Number(ssales_total)  -  Number(customer_points);

    var ddiscount_percent          =    ((Number(discount_amount) / Number(sales_total)) * 100);
    $('#discount_percent').val(ddiscount_percent.toFixed(4));

    
  
    var totaldiscountamount        =   Number(customer_points)  + Number(discount_amount);

    var actualdiscountpercentage   =   (Number(totaldiscountamount) / Number(sales_total)) * 100;
    actualdiscountpercentage       =   Number(actualdiscountpercentage).toFixed(4);
    $('#totaldiscount_percent').val(Number(actualdiscountpercentage));
    var discount_percent           =  Number(actualdiscountpercentage);

    if(Number(discount_on_billing)==1 && Number(is_master)==0)
     {
        if(Number(discount_percent) > Number(discount_val_on_billing))
        {
            toastr.error("Discount cannot be greater than "+discount_val_on_billing+" as mentioned for this user");
            $('#discount_amount').val(0);
            $('#discount_percent').val(0);

            var billdiscount_amount        =   $('#discount_amount').val();
            var discount_amount            =   Number(billdiscount_amount);

            customer_points_percent       =   (Number(customer_points) / Number(ssales_total)) * 100;
            $('.customer_points_percent').html(Number(customer_points_percent).toFixed(4));

            var sales_total               =     Number(ssales_total)  -  Number(customer_points);

            var ddiscount_percent          =    ((Number(discount_amount) / Number(sales_total)) * 100);
            $('#discount_percent').val(ddiscount_percent.toFixed(4));

            
          
            var totaldiscountamount        =   Number(customer_points)  + Number(discount_amount);

            var actualdiscountpercentage   =   (Number(totaldiscountamount) / Number(sales_total)) * 100;
            actualdiscountpercentage       =   Number(actualdiscountpercentage).toFixed(4);
            $('#totaldiscount_percent').val(Number(actualdiscountpercentage));
            var discount_percent           =  Number(actualdiscountpercentage);
            var rcolumn       = '';

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
                                var hsn_sac_code                 =     $("#hsncode_"+rcolumn).val();
                                var beforerangegst_per           =     $('#prodgstper_'+rcolumn).html();

                                var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                                var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                                var totalproddiscountamt         =     Number(proddiscountamt)

                                var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);
                                var singleselling                =     Number(sellingafterdiscount)/Number(qty);

                                var type                  =      "POST";
                                var url                   =      'gstrange_detail';
                                var gst_per = 0;
                                var rcolumn   = rcolumn;
                                var data = {
                                  "sellingprice" : singleselling,
                                  "hsn_sac_code" : hsn_sac_code,
                                }
                                var dataType = "";
                                callroute(url,type,dataType,data,function(data)
                                {
                                    var gst_data = JSON.parse(data,true);


                                    if(gst_data['Success'] == "True")
                                    {

                                      var gst_detail  = gst_data['Data'][0];
                                      $("#sprodgstper_"+rcolumn).html(gst_detail['percentage']);
                                      $("#prodgstper_"+rcolumn).html(gst_detail['percentage']);
                                      gst_percent     =        gst_detail['percentage'];

                                    }
                                    else
                                    {
                                        gst_percent    =    beforerangegst_per;
                                    }
                                 
                                  
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
                                });
                                        
                            

                            }

                       });

                    


                  });
        }
        else
        { 
            var rcolumn       = '';

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
                              var hsn_sac_code                 =     $("#hsncode_"+rcolumn).val();
                              var beforerangegst_per           =     $('#prodgstper_'+rcolumn).html();

                              var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                              var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                              var totalproddiscountamt         =     Number(proddiscountamt)

                              var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);
                              var singleselling                =     Number(sellingafterdiscount)/Number(qty);

                              var type                  =      "POST";
                              var url                   =      'gstrange_detail';
                              var gst_per = 0;
                              var rcolumn   = rcolumn;
                              var data = {
                                "sellingprice" : singleselling,
                                "hsn_sac_code" : hsn_sac_code,
                              }
                              var dataType = "";
                              callroute(url,type,dataType,data,function(data)
                              {
                                  var gst_data = JSON.parse(data,true);


                                  if(gst_data['Success'] == "True")
                                  {

                                    var gst_detail  = gst_data['Data'][0];
                                    $("#sprodgstper_"+rcolumn).html(gst_detail['percentage']);
                                    $("#prodgstper_"+rcolumn).html(gst_detail['percentage']);
                                    gst_percent     =        gst_detail['percentage'];

                                  }
                                  else
                                  {
                                      gst_percent    =    beforerangegst_per;
                                  }
                               
                                
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
                              });
                                      
                          

                          }

                     });

                  


                });

        }
      }
      else
      {

                  var rcolumn       = '';

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
                                    var hsn_sac_code                 =     $("#hsncode_"+rcolumn).val();
                                    var beforerangegst_per           =     $('#prodgstper_'+rcolumn).html();

                                    var prodmrpdiscountamt           =     ((Number(totalmrpgst) * Number(discount_percent)) / 100).toFixed(4);
                                    var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
                                    var totalproddiscountamt         =     Number(proddiscountamt)

                                    var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);
                                    var singleselling                =     Number(sellingafterdiscount)/Number(qty);

                                    var type                  =      "POST";
                                    var url                   =      'gstrange_detail';
                                    var gst_per = 0;
                                    var rcolumn   = rcolumn;
                                    var data = {
                                      "sellingprice" : singleselling,
                                      "hsn_sac_code" : hsn_sac_code,
                                    }
                                    var dataType = "";
                                    callroute(url,type,dataType,data,function(data)
                                    {
                                        var gst_data = JSON.parse(data,true);


                                        if(gst_data['Success'] == "True")
                                        {

                                          var gst_detail  = gst_data['Data'][0];
                                          $("#sprodgstper_"+rcolumn).html(gst_detail['percentage']);
                                          $("#prodgstper_"+rcolumn).html(gst_detail['percentage']);
                                          gst_percent     =        gst_detail['percentage'];

                                        }
                                        else
                                        {
                                            gst_percent    =    beforerangegst_per;
                                        }
                                     
                                      
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
                                    });
                                            
                                

                                }

                           });

                        


                      });
          }

}


