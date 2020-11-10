$("#inward_date").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom",
    autoclose: true

});
$("#expiry_date").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom",
    autoclose: true

});
$("#mfg_date").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom",
    autoclose: true

});
$(document).ready(function(e){

  if(localStorage.getItem('inward_kit_record'))
  {
      var edit_data  = localStorage.getItem('inward_kit_record');
      
      
      if(edit_data != '' && edit_data != undefined && edit_data != null)
      {

           var edit_kitdata = JSON.parse(edit_data);
           //console.log(edit_kitdata)
           var barcode = edit_kitdata['product_system_barcode'];
           var product_name = edit_kitdata['product_name'];
           var showproductbarcode  =  barcode+'_'+product_name;
           $('#productkitsearch').val(showproductbarcode);
           $('#productkitsearch').prop('readonly',true);
          
           getproductkitdetail(barcode,product_name);  


      }
  }
  if(localStorage.getItem('edit_kitinward_record'))
  {
      var edit_data  = localStorage.getItem('edit_kitinward_record');
      
      
      if(edit_data != '' && edit_data != undefined && edit_data != null)
      {

           var edit_kitdata = JSON.parse(edit_data);
           console.log(edit_kitdata[0]); 
           $('#product_id').val(edit_kitdata[0]['kitinward_product_detail']['product_id']);
           $("#inward_stock_id").val(edit_kitdata[0]['inward_stock_id']);
           $("#inward_product_detail_id").val(edit_kitdata[0]['kitinward_product_detail']['inward_product_detail_id']);

           var showproductbarcode  =  edit_kitdata[0]['kitinward_product_detail']['product']['product_system_barcode']+'_'+edit_kitdata[0]['kitinward_product_detail']['product']['product_name'];
           $('#productkitsearch').val(showproductbarcode);
           $('#productkitsearch').prop('readonly',true);
           $('#inward_qty').val(edit_kitdata[0]['total_qty']);
           $('#oldinward_qty').val(edit_kitdata[0]['total_qty']);
           $('#inward_date').val(edit_kitdata[0]['inward_date']);
           var batch_no = '';
           if(edit_kitdata[0]['kitinward_product_detail']['batch_no']!='' || edit_kitdata[0]['kitinward_product_detail']['batch_no']!=null)
           {
              batch_no = edit_kitdata[0]['kitinward_product_detail']['batch_no'];
           }
           //console.log(edit_kitdata[0]['kitinward_product_detail'])
           $('#batch_no').val(batch_no);
           $('#selling_price').val(edit_kitdata[0]['kitinward_product_detail']['sell_price']);
           $('#sell_gst_percent').val(edit_kitdata[0]['kitinward_product_detail']['selling_gst_percent']);
           $('#sell_gst_amount').val(edit_kitdata[0]['kitinward_product_detail']['selling_gst_amount']);
           $('#offer_price').val(edit_kitdata[0]['kitinward_product_detail']['offer_price']);
           $('#product_mrp').val(edit_kitdata[0]['kitinward_product_detail']['product_mrp']);
           $('#pending_qty').val(edit_kitdata[0]['kitinward_product_detail']['product_qty']);

           var max_qty   =    edit_kitdata[0]['kitinward_product_detail']['product_qty'] - edit_kitdata[0]['kitinward_product_detail']['pending_return_qty'];
           $('#max_allowqty').val(Number(max_qty));



           var product_html = '';

        $.each(edit_kitdata[0]['inward_kit_detail'],function (kitkey,kitvalue)
       {

              var kitproductid  =  kitvalue['kitproduct_id'];
              var product_id    =  kitvalue['product_id'];

              var pricehtml = '';
              var showbatch = '';

         
               
                     var stock = 0;
                
                          stock          =   kitvalue['editprice_master']['product_qty'];
                       
                     
                      if(bill_type==3)
                      {
                              if(kitvalue['editprice_master']['batch_no'] !='' || kitvalue['editprice_master']['batch_no']!=null)
                              {
                                  showbatch      =   kitvalue['editprice_master']['batch_no'];
                              }
                              else
                              {
                                  showbatch      =   kitvalue['editprice_master']['offer_price'];
                              }
                              
                      }
                      else
                      {
                          showbatch      =   kitvalue['editprice_master']['offer_price'];
                      }
                      pricehtml += '<option value='+kitvalue['editprice_master']['price_master_id']+'>'+showbatch+'</option>';
                 

                    $.each(kitvalue['price_master'],function (key,value)
                    {
                      
                            stock         +=   value['product_qty'];                     
                  
                      
                    });

                     if(kitvalue['itemproduct']['supplier_barcode']!='' && kitvalue['itemproduct']['supplier_barcode']!=null)
                      {
                        var barcode     =     kitvalue['itemproduct']['supplier_barcode'];
                      }
                      else
                      {
                        var barcode     =     kitvalue['itemproduct']['product_system_barcode'];
                      }

                        

                        var colour_name = '';
                        var size_name   = '';
                        var uqc_name    = '';

                        var feature_show_val = "";
                        if(bill_show_dynamic_feature != '')
                        {
                            var feature = bill_show_dynamic_feature.split(',');

                            $.each(feature,function(fea_key,fea_val)
                            {
                                var feature_name = '';                               
                                
                                if(typeof(kitvalue['itemproduct'][fea_val]) != "undefined" && kitvalue['itemproduct'][fea_val] !== null) {

                                    feature_name = kitvalue['itemproduct'][fea_val];
                                    //console.log(feature_name);
                                }

                                feature_show_val += '<td>' + feature_name + '</td>';
                            })
                        }

                        if(kitvalue['itemproduct']['uqc']!=null)
                        {
                          uqc_name   = kitvalue['itemproduct']['uqc']['uqc_name'];
                        }
                        
                        var comboqty   = Number(kitvalue['qty']) / edit_kitdata[0]['total_qty'];

                      product_html += '<tr id="product_' + product_id + '">' +
                      '<td class="pt-15 pb-15 leftAlign" id="product_name_'+product_id+'" name="product_name[]"><a id="popupid_'+product_id+'" onclick="return productdetailpopup(this);"><span class="informative">'+kitvalue['itemproduct']['product_name']+'</span></a></td>'+ 
                          '<td class="leftAlign"><a id="popupid_'+product_id+'" onclick="return productdetailpopup(this);">'+barcode+'</a></td>'+  
                             feature_show_val+                    
                          '<td class="leftAlign"><a id="popupid_'+product_id+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+
                          '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                          '<input value="'+barcode+'" type="hidden" id="barcodesel_'+product_id+'" name="barcode_sel[]">'+
                          '<input type="hidden" id="inward_kit_detail_id_'+product_id+'" name="inward_kit_detail_id[]" class="" value="'+kitvalue['inward_kit_detail_id']+'">'+
                          '<input type="hidden" id="inwardids_'+product_id+'" name="inwardids[]" class=""  value="'+kitvalue['inwardids']+'">'+
                          '<input type="hidden" id="inwardqtys_'+product_id+'" name="inwardqtys[]" class=""  value="'+kitvalue['inwardqtys']+'">'+
                          '<input value="'+kitvalue['product_id']+'" type="hidden" id="itemproductid_'+product_id+'" name="itemproductid[]">'+
                          '<input value="'+kitvalue['kitproduct_id']+'" type="hidden" id="kitproductid_'+product_id+'" name="kitproductid[]">'+
                          '</td>'+
                          '<td id="sellingmrp_'+product_id+'">'+'<select name="mrp[]" id="mrp_'+product_id+'" style="border-radius:0.2rem;border-color:#ced4da;width:100%;height:30px;" onchange="return filterprice_detail(this);" tabindex="-1">'+pricehtml+'</select>'+
                           '<input type="hidden" id="oldpricemasterid_'+product_id+'" name="oldpricemasterid[]"  value="'+kitvalue['price_master_id']+'" >'+
                          '</td>'+
                          '<td id="showstock_'+product_id+'" class="rightAlign">'+stock+'<input value="'+stock+'" type="hidden" id="stock_'+product_id+'" name="stock[]">'+'</td>'+  
                          '<td id="showkitqty_'+product_id+'" class="rightAlign">'+comboqty+'<input value="'+comboqty+'" type="hidden" id="kitqty_'+product_id+'" name="kitqty[]">'+'</td>'+                          
                          '<td id="showtotalqty_'+product_id+'" style="font-weight:bold;text-align:right !important;"><input value="'+kitvalue['qty']+'" type="text" id="totalqty_'+product_id+'" name="totalqty[]" class="form-control totqty" style="width:100px !important;text-align:right;" readonly><input value="'+kitvalue['qty']+'" type="hidden" id="oldkitqty_'+product_id+'" name="oldkitqty[]"></td>'+
                          '</tr>'; 

 


        });
        $("#kitSearchResult").prepend(product_html);
        totalcalculation();

        $('.loaderContainer').hide();
              
          var srrno  = 0;
          $('.totqty').each(function(e){
              var ssrno  = 0;
              if($(this).val()!='')
              {
                  srrno++;
              }
          });
        srrno;


      $('.titems').html(srrno);  
      }
  }


});

$("#productkitsearch").typeahead({

    source: function(request, process) {
        var  url = "inwardkit_search";
        var type = "post";
        var dataType = "json";
        var data = {
            search_val: $("#productkitsearch").val(),
            term: request.term
        };
        callroute(url,type,dataType,data,function (data)
        {
            $("#productkitsearch").val()
                   
                 objects = [];
                 map = {};

                if($("#productkitsearch").val()!='')
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
   // autoSelect:false,
   // typeahead-select-on-exact="true"
     afterSelect: function (item) {
      $('.loaderContainer').show();
        var value = item;
        var barcode = map[item]['barcode'];
        var product_name = map[item]['product_name'];
        var systembarcode = map[item]['systembarcode'];
         getproductkitdetail(barcode,product_name);   
    }
     
});

function getproductkitdetail(barcode,product_name)
{

    
   var columnid   =   columnid;
   var type = "POST";
   var url = 'productkit_detail';
   var dataType = "";
   var data = {
       "barcode" : barcode,
       "product_name":product_name
   }
   callroute(url,type,dataType,data,function(data)
   {
        
        var product_data = JSON.parse(data,true);
        $('#kitSearchResult').html('');

        if(product_data['Success'] == "True")
        {
            var kitproductid = '';
            var product_html = '';
            var product_detail  = product_data['Data'][0];

            var skucode = '';
            var pricehtml = '';
            var pcount    = 0;
            var sellingprice  = 0;
            //var stock = 0;
            var gst_per = 0;

            
              $('#inward_type').val(product_detail['product_type']);
              $('#cost_rate').val(product_detail['cost_rate']);
              $('#cost_gst_percent').val(product_detail['cost_gst_percent']);
              $('#cost_gst_amount').val(product_detail['cost_gst_amount']);
              $('#cost_price').val(product_detail['cost_price']);
              $('#profit_percent').val(product_detail['profit_percent']);
              $('#profit_amount').val(product_detail['profit_amount']);
              $('#selling_price').val(product_detail['selling_price']);
              $('#sell_gst_percent').val(product_detail['sell_gst_percent']);
              $('#sell_gst_amount').val(product_detail['sell_gst_amount']);
              $('#offer_price').val(product_detail['offer_price']);
              $('#product_mrp').val(product_detail['product_mrp']);

            $.each(product_detail['combo_products_detail'],function (combokey,combovalue)
            {

               kitproductid  =  combovalue['kitproduct_id'];
              var product_id    =  combovalue['product_id'];

             
               
                     var stock = 0;
                     var showbatch = '';
                     var pricehtml = '';
                      var pcount    = 0;
                   $.each(combovalue['price_master'],function (key,value)
                  {
                      if(pcount == 0)
                      {
                         
                          stock          =   value['product_qty'];
                       
                      }
                      if(bill_type==3)
                          {
                              if(value['batch_no'] !='' || value['batch_no']!=null)
                              {
                                  showbatch      =   value['batch_no'];
                              }
                              else
                              {
                                  showbatch      =   value['offer_price'];
                              }
                              
                      }
                      else
                      {
                          showbatch      =   value['offer_price'];
                      }
                      pricehtml += '<option value='+value['price_master_id']+'>'+showbatch+'</option>';
                      pcount++;
                  });
                
                    // $.each(combovalue['price_master'],function (key,value)
                    // {
                      
                    //         stock         +=   value['product_qty'];                     
                  
                      
                    // });

                     if(combovalue['product']['supplier_barcode']!='' && combovalue['product']['supplier_barcode']!=null)
                      {
                        var barcode     =     combovalue['product']['supplier_barcode'];
                      }
                      else
                      {
                        var barcode     =     combovalue['product']['product_system_barcode'];
                      }

                        

                        var uqc_name    = '';

                     var feature_show_val = "";
                        if(bill_show_dynamic_feature != '')
                        {
                            var feature = bill_show_dynamic_feature.split(',');

                            $.each(feature,function(fea_key,fea_val)
                            {
                                var feature_name = '';                               
                                
                                if(typeof(combovalue['product'][fea_val]) != "undefined" && combovalue['product'][fea_val] !== null) {

                                    feature_name = combovalue['product'][fea_val];
                                    //console.log(feature_name);
                                }

                                feature_show_val += '<td>' + feature_name + '</td>';
                            })
                        }
                        if(combovalue['product']['uqc']!=null)
                        {
                          uqc_name   = combovalue['product']['uqc']['uqc_name'];
                        }
                       
                      product_html += '<tr id="product_' + product_id + '">' +
                      '<td class="pt-15 pb-15 leftAlign" id="product_name_'+product_id+'" name="product_name[]"><a id="popupid_'+product_id+'" onclick="return productdetailpopup(this);"><span class="informative">'+combovalue['product']['product_name']+'</span></a></td>'+ 
                          '<td class="leftAlign"><a id="popupid_'+product_id+'" onclick="return productdetailpopup(this);">'+barcode+'</a></td>'+
                          feature_show_val+
                          '<td class="leftAlign"><a id="popupid_'+product_id+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+
                          '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                          '<input value="'+barcode+'" type="hidden" id="barcodesel_'+product_id+'" name="barcode_sel[]">'+
                          '<input value="" type="hidden" id="inward_kit_detail_id_'+product_id+'" name="inward_kit_detail_id[]" class="" value="">'+
                          '<input value="" type="hidden" id="inwardids_'+product_id+'" name="inwardids[]" class=""  value="">'+
                          '<input value="" type="hidden" id="inwardqtys_'+product_id+'" name="inwardqtys[]" class=""  value="">'+
                          '<input value="'+combovalue['product_id']+'" type="hidden" id="itemproductid_'+product_id+'" name="itemproductid[]">'+
                          '<input value="'+combovalue['kitproduct_id']+'" type="hidden" id="kitproductid_'+product_id+'" name="kitproductid[]">'+
                          '</td>'+ 
                          '<td id="sellingmrp_'+product_id+'">'+'<select name="mrp[]" id="mrp_'+product_id+'" style="border-radius:0.2rem;border-color:#ced4da;width:100%;height:30px;" onchange="return filterprice_detail(this);" tabindex="-1">'+pricehtml+'</select>'+
                           '<input type="hidden" id="oldpricemasterid_'+product_id+'" name="oldpricemasterid[]"  value="" >'+
                          '</td>'+
                          '<td id="showstock_'+product_id+'" class="rightAlign">'+stock+'<input value="'+stock+'" type="hidden" id="stock_'+product_id+'" name="stock[]">'+'</td>'+                          
                          '<td id="showkitqty_'+product_id+'" class="rightAlign">'+combovalue['qty']+'<input value="'+combovalue['qty']+'" type="hidden" id="kitqty_'+product_id+'" name="kitqty[]">'+'</td>'+                          
                          '<td id="showtotalqty_'+product_id+'" style="font-weight:bold;" class="rightAlign"><input value="0" type="text" id="totalqty_'+product_id+'" name="totalqty[]" class="form-control totqty" style="width:120px !important;text-align:right;" readonly><input value="" type="hidden" id="oldkitqty_'+product_id+'" name="oldkitqty[]"></td>'+
                          
                          '</tr>'; 



                   });    

                 $('#product_id').val(kitproductid);    

        }

   

        $("#productsearch").val('');
       
        $(".odd").hide();
        $("#kitSearchResult").prepend(product_html);
        totalcalculation();
        $('.loaderContainer').hide();
              
          var srrno  = 0;
          $('.totqty').each(function(e){
              var ssrno  = 0;
              if($(this).val()!='')
              {
                  srrno++;
              }
          });
        srrno;


      $('.titems').html(srrno);  
      if(product_data["Success"]=="False")
      {
          toastr.error(product_data['Message']);
          $('.loaderContainer').hide();
      }
      
   });
}
function filterprice_detail(obj)
{

    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('mrp_')[1];
    var priceid                   =     $("#mrp_"+product_id+" :selected").val();

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

                $("#stock_"+product_id).val(price_detail['product_qty']);
                $("#showstock_"+product_id).html(price_detail['product_qty']);
               
            }
            else {
                     

                   
                }
          }

          
        });
}
function calculateqty()
{

        var inward_qty   = $('#inward_qty').val();
        var pending_qty  = $('#pending_qty').val();
        var max_allow    = $('#max_allowqty').val();

    

        if (max_allow != '' && max_allow != 'undefined' && !isNaN(max_allow) || max_allow == 0) {
                    var total_qty = Number(inward_qty);
                    if (total_qty < max_allow) {
                        
                        toastr.error(max_allow + " Qty was sell.you cannot Lower qty more than or equal to " + max_allow);
                        $('#inward_qty').val(Number(max_allow));
                        calculateqty();
                        return false;
                    } else {
                        var edit_pending_qty = (Number(total_qty) - Number(max_allow));
                        $("#pending_qty").val(edit_pending_qty);
                    }
                } else {
                    $("#pending_qty").val(inward_qty);
                }

       

        var marray     =   [];
        var countminusqty = 0;
    $("#kitSearchResult").each(function (index,e)
    {
         
           
             $(this).find('tr').each(function ()
             {
                 if($(this).attr('id') != undefined)
                  {
                      rcolumn = $(this).attr('id').split('product_')[1];
                      
                  }
                  if(($("#itemproductid_"+rcolumn).val())!='')
                  {
                  
                     var stock       =   $('#stock_'+rcolumn).val();
                     var kitqty      =   $('#kitqty_'+rcolumn).val();
                     var oldkitqty   =   $('#oldkitqty_'+rcolumn).val();
                     var barcode     =   $('#barcodesel_'+rcolumn).val();
                     var totalstock  =   Number(stock) + Number(oldkitqty);
                     
                      var totalqty   =   Number(kitqty) * Number(inward_qty);
                      
                     
                      if(Number(totalqty)>Number(totalstock))
                      {
                        
                          var diffkitqty   =  Number(totalstock) / Number(kitqty);
                          var exactstock   =  Math.floor(diffkitqty) * Number(kitqty);

                          $('#totalqty_'+rcolumn).val(exactstock);
                          marray.push({id:rcolumn,value:exactstock});
                          countminusqty++;
                          
                      }
                      else
                      {
                           $('#totalqty_'+rcolumn).val(totalqty);
                           marray.push({id:rcolumn,value:totalqty});                          
                      }

                  }
                  

             });

    });


    if(Number(countminusqty)>0)
    {
       marray.sort(function(a, b){
        return a.value-b.value
       })
       
       toastr.error("Stock for Some of the Products is less than Required qty So Qty of lowest Stock updated for all");
       var minusid          =   marray[0]['id'];
       var minusqty         =   marray[0]['value'];
       var minuskitqty      =   $('#kitqty_'+minusid).val();
       var exactqty         =   Number(minusqty) / Number(minuskitqty);
      // console.log(minusqty);     
      // console.log(minuskitqty);
       $('#inward_qty').val(Number(exactqty));
      //   console.log(exactqty);
        // console.log('aaaa');
       calculateqty();
   }

   totalcalculation();
        
  
}

function totalcalculation()
{
    var totqty  = 0;
  

          $('.totqty').each(function (index,e){
            if($(this).val()!="")
            totqty   +=   parseFloat($(this).val());
           
           
          });

          $('#totqtyData').html(Number(totqty));
          
}

$("#saveInwardProducts").click(function (e) {

     $(this).prop('disabled', true);

  if(validate_billing('inward_productskit'))
  {
      $("#saveInwardProducts").prop('disabled', true);



      var array = [];



      $('#kitSearchResult tr').has('td').each(function()
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
                            arrayItem['inward_kit_detail_id'] =$(this).find("#inward_kit_detail_id_"+wihoutidname[1]).val();
                            arrayItem['itemproductid'] =$(this).find("#itemproductid_"+wihoutidname[1]).val();
                            arrayItem['kitproductid'] =$(this).find("#kitproductid_"+wihoutidname[1]).val();
                            arrayItem['inwardids'] =$(this).find("#inwardids_"+wihoutidname[1]).val();
                            arrayItem['inwardqtys'] =$(this).find("#inwardqtys_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'sellingmrp')
                        {
                            
                            arrayItem['price_master_id'] =$(this).find("#mrp_"+wihoutidname[1]+" :selected").val();
                            arrayItem['oldprice_master_id'] =$(this).find("#oldpricemasterid_"+wihoutidname[1]).val();
                           
                        }
                        else if(nameforarray == 'showtotalqty')
                        {
                            arrayItem['totalqty'] =$(this).find("#totalqty_"+wihoutidname[1]).val();
                            arrayItem['oldqty'] =$(this).find("#oldkitqty_"+wihoutidname[1]).val();
                            
                        }
                        


                }

          });
          array.push(arrayItem);
      });

      var arraydetail = [];
      arraydetail.push(array);


      var customerdetail = {};
      var paymentdetail = {};

      customerdetail['product_id'] = $("#product_id").val();
      customerdetail['inward_date'] = $("#inward_date").val();
      customerdetail['inward_qty'] = $("#inward_qty").val();
      customerdetail['pending_qty'] = $("#pending_qty").val();
      customerdetail['oldinward_qty'] = $("#max_allowqty").val();      
      customerdetail['inward_stock_id'] = $("#inward_stock_id").val();
      customerdetail['inward_product_detail_id'] = $("#inward_product_detail_id").val();
      customerdetail['inward_type'] = $("#inward_type").val();
      customerdetail['selling_price'] = $("#selling_price").val();
      customerdetail['sell_gst_percent'] = $("#sell_gst_percent").val();
      customerdetail['sell_gst_amount'] = $("#sell_gst_amount").val();
      customerdetail['offer_price'] = $("#offer_price").val();
      customerdetail['product_mrp'] = $("#product_mrp").val();
      customerdetail['batch_no']=$('#batch_no').val();
      customerdetail['update_offer_price']= $("#update_offer_price").val();
      customerdetail['mfg_date']= $("#mfg_date").val();
      customerdetail['expiry_date']= $("#expiry_date").val();

      

      arraydetail.push(customerdetail);

 

       console.log(arraydetail);
        //return false;
   
      var data = arraydetail;
      var dataType = "";
      var  url = "createcombo_inward";
      var type = "POST";
      callroute(url,type,dataType,data,function (data)
      {
          $("#saveInwardProducts").prop('disabled', false);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {
            
               toastr.success(dta['Message']);
               window.location = dta['url'];
              $("#inward_productskit").trigger('reset');
              $("#kitSearchResult").empty('');

              
          }
          else if (dta['status_code'] == 410) {
                    var errmsg = dta['Message'];
                    swal({
                            title: errmsg,
                            type: "warning",
                            confirmButtonClass: "btn-danger",
                            confirmButtonText: "Yes!",
                            showCancelButton: true,
                            closeOnConfirm: false,
                            closeOnCancel: false
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                swal({
                                        title: "This Product Offer Price Will Be Updated for all qty with this new offer price.are you sure want to continue!",
                                        type: "info",
                                        confirmButtonClass: "btn-danger",
                                        confirmButtonText: "Yes!",
                                        showCancelButton: true,
                                        closeOnConfirm: true,
                                        closeOnCancel: false
                                    },
                                    function (isConfirm) {
                                        if (isConfirm) {
                                            $("#update_offer_price").val(1);
                                            $("#saveInwardProducts").click();
                                        } else {
                                            swal("Cancelled", "You can change offer price or batch no.", "info");
                                        }
                                    });
                            } else {
                                swal("Cancelled", "You can change offer price or batch no.", "info");
                            }

                        });

                } 
          else
          {
            $("#saveInwardProducts").prop('disabled', true);
               toastr.error(dta['Message']);
               

          }
      })

  }
   else
    {
        $("#saveInwardProducts").prop('disabled', false);
        return false;
    }
});

function validate_billing(frmid)
{
    var error = 0;    
    
    if($("#totqtyData").html() ==0)
    {
        error = 1;
        toastr.error("Please Take Inward first");
        return false;
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

function edit_kitinward(inward_stock_id)
{


    var  url = "edit_kitinward";
    var type = "POST";
    var dataType = '';
    var data = {
        'inward_stock_id' : inward_stock_id,
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
           localStorage.setItem('edit_kitinward_record',JSON.stringify(dta['Data']));

            window.location.href = url;

        }
    });
}
