$('#productkitform').on('submit', function(event)
{

    if(validate_productform('productkitform'))
    {

        var product_name            = $('#product_name').val(); 
        var product_note            = $('#product_note').val();
        var sku_code                = $('#sku_code').val();
        var product_code            = $('#product_code').val();  
        var product_description     = $('#product_description').val();
        var hsn_sac_code            = $('#hsn_sac_code').val();
        var brand_id                = $("#brand_id :selected").html(); 
        var category_id             = $("#category_id :selected").html(); 
        var subcategory_id          = $("#subcategory_id :selected").html(); 
        var colour_id               = $("#colour_id :selected").html(); 
        var size_id                 = $("#size_id :selected").html(); 
        var uqc_id                  = $("#uqc_id :selected").html(); 
        var material_id             = $('#material_id').val();
        var product_system_barcode  = $('#product_system_barcode').val();
        var supplier_barcode        = $('#supplier_barcode').val();
        var alert_product_qty       = $('#alert_product_qty').val();
        var selling_price           = $('#selling_price').val();
        var offer_price             = $('#offer_price').val();

        event.preventDefault();
        $("#addproductkit").prop('disabled', false);
        $("#addproductkit").text('Add Product');
        
        $.ajaxSetup({
            headers : { "X-CSRF-TOKEN" :jQuery(`meta[name="csrf-token"]`). attr("content")}
        });

        $.ajax({
            url: "productkit_create",
            method: "POST",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data)
            {
                console.log(data); //return false;
                if(data['Success'] == "True")
                {
                    toastr.success(data['Message']);
                    $("#product_id").val(data['Data']);
                    $("#pproduct_id").val(data['Data']);
                    $('#product_block').slideToggle();
                    $('.showproduct_name').html(product_name);
                    $('.showproduct_note').html(product_note);
                    $('.showsku_code').html(sku_code);
                    $('.showproduct_code').html(product_code);
                    $('.showproduct_description').html(product_description);
                    $('.showhsn_sac_code').html(hsn_sac_code);
                    // $(".showbrand_id").html(brand_id);
                    // $(".showcategory_id").html(category_id);
                    // $(".showsubcategory_id").html(subcategory_id);
                    // $(".showcolour_id").html(colour_id);
                    // $(".showsize_id").html(size_id);
                    $(".showuqc_id").html(uqc_id);
                    $('.showmaterial_id').html(material_id);
                    $('.showproduct_system_barcode').html(product_system_barcode);
                    $('.showsupplier_barcode').html(supplier_barcode);
                    $('.showalert_product_qty').html(alert_product_qty);
                    $('.showselling_price').html(Number(selling_price).toFixed(2));
                    $('.showmrp').html(Number(offer_price).toFixed(2));
                    $('#product_block').slideUp(400);
                }
                else
                {
                    if(data['status_code'] == 409)
                    {
                        $.each(data['Message'],function (errkey,errval)
                        {
                            var errmessage = errval[0];

                            if(errmessage == "The supplier barcode has already been taken.")
                            {
                                var supplier_barcode = $("#supplier_barcode").val();
                                //toastr.error('Product with this Supplier Barcode : '+supplier_barcode+' already exist.<a style="display: inline-block;">Click here</a> to view the existing product.');
                                toastr.error("<br /><button>View this product</button>",'Product with this Supplier Barcode : '+supplier_barcode+' already exist.',
                                    {
                                        allowHtml: true,
                                        showCloseButton: true,
                                        onclick: function ()
                                        {
                                            view_existing_product(supplier_barcode);
                                            toastr.clear()
                                        }

                                    })

                            }
                            else
                            {
                                toastr.error(errmessage);
                                resettable('product_data','productrecord');

                            }
                        });

                    }
                    else
                    {
                        toastr.error(data['Message']);
                    }
                }
            }
        });

     }
    event.preventDefault();
});


function previewandvalidation(input)
{
    var imageid = $(input).attr('id');
    var counterval = $(input).data('counter');


    var validExtensions = ['png','jpg','jpeg']; //array of valid extensions
    var fileName = input.files[0].name;
    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
    if ($.inArray(fileNameExt, validExtensions) == -1) {
        input.type = '';
        input.type = 'file';
        $('#product_preview_'+counterval).attr('src',"");
        alert("Only these file types are accepted : "+validExtensions.join(', '));
    }
    else
    {
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.onload = function (e)
            {
                $("#preview_"+counterval).show();
                $('#product_preview_'+counterval).attr('src', e.target.result);
            };
            filerdr.readAsDataURL(input.files[0]);
        }
    }
}
$("#productsearch").typeahead({

    source: function(request, process) {
        var  url = "kitproduct_search";
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
   // autoSelect:false,
   // typeahead-select-on-exact="true"
     afterSelect: function (item) {
      $('.loaderContainer').show();
        var value = item;
        var barcode = map[item]['barcode'];
        var product_name = map[item]['product_name'];
         kgetproductdetail(barcode,product_name); 
          $("#productsearch").val('');
          //$(".dropdown-menu").html(''); 
           //$(".dropdown-menu").hide();   
    }
     
});

function kgetproductdetail(barcode,product_name)
{

  
   var columnid   =   columnid;
   var type = "POST";
   var url = 'kitproduct_detail';
   var dataType = "";
   var data = {
       "barcode" : barcode,
       "product_name":product_name
   }
   callroute(url,type,dataType,data,function(data)
   {
        
        var product_data = JSON.parse(data,true);


        if(product_data['Success'] == "True")
        {
            //$('#sproduct_detail_record').html('');
            var product_html = '';
            var product_detail  = product_data['Data'][0];

            var skucode = '';
            var pricehtml = '';
            var pcount    = 0;
            var sellingprice  = 0;
            var stock = 0;
            var gst_per = 0;

          // if(product_data['Stock'] == 0 || product_data['Stock'] == undefined)
          // {
          //       toastr.error("Stock is not available!");
          //       $('#productsearch').val('');
          //        $('.loaderContainer').hide();
          //       return false;

          // }
          // else
          // {
                $('.loaderContainer').hide();
                var product_id = product_detail['product_id'];

                if(product_detail['sku_code'] != null || product_detail['sku_code'] != undefined)
                {
                    skucode = product_detail['sku_code'];
                }


                var qty   =   product_data['Stock'];       

           
            
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

                if (product_html == '') {

                    var gst_amount                   =     (Number(product_detail['selling_price']) * Number(product_detail['sell_gst_percent']) / 100).toFixed(4);
                   
                    var total_amount                 =     Number(product_detail['offer_price']);
                   
                     var stotal_amount     =     Number(total_amount).toFixed(2);
                     var total_amount      =     Number(total_amount).toFixed(4);
                     var showsellprice     =     Number(product_detail['selling_price']).toFixed(2);
                     var showcostprice     =     Number(product_detail['cost_price']).toFixed(2);
                     var showmrp           =     Number(product_detail['offer_price']).toFixed(2);

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
                      $('.titems').html(sr);  

                     

                      if(product_detail['uqc']!=null)
                      {
                        uqc_name   = product_detail['uqc']['uqc_name'];
                      }
                      else
                      {
                        uqc_name   = '';
                      }

                    product_html += '<tr id="product_' + product_id + '">' +
                    '<td class="pt-15 pb-15" id="pproduct_name_'+product_id+'" name="pproduct_name[]"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);"><span class="informative">'+product_detail['product_name']+'</span></a></td>'+ 
                        '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+barcode+'</a></td>'+
                        feature_show_val+
                        '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+
                        '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                        '<input value="" type="hidden" id="combo_products_detail_id_'+product_id+'" name="combo_products_detail_id[]" class="" >'+
                        '<input value="'+product_detail['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+
                        '</td>'+
                        // '<td id="stock_'+product_id+'" name="stock[]">'+qty+'</td>'+ 
                        '<td id="ccostprice_'+product_id+'" class="rightAlign">'+showcostprice+'<input type="hidden" id="costprice_'+product_id+'" class="floating-input form-control number" value="'+product_detail['cost_price']+'" >'+'<input type="hidden" id="tcostprice_'+product_id+'" class="floating-input form-control number tcostprice" value="'+product_detail['cost_price']+'" >'+'</td>'+
                        '<td id="sellingmrp_'+product_id+'" class="rightAlign">'+showmrp+'<input type="hidden" id="mrp_'+product_id+'" class="floating-input form-control number" value="'+product_detail['offer_price']+'" >'+'</td>'+
                        '<td id="sellingpricewgst_'+product_id+'" class="rightAlign">'+showsellprice+'<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number" name="tsellingwithoutgst[]"  value="'+product_detail['selling_price']+'" >'+'</td>'+                  
                        '<td id="sellingqty_'+product_id+'" class="rightAlign">'+
                        '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="1" name="qty[]" onkeyup="return calqty(this);">'+
                        '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="0" name="oldqty[]">'+
                        '</td>'+
                        '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+product_detail['sell_gst_percent']+'</td>'+
                        '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

                        '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                        '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;">'+stotal_amount+'</td>'+
                        '<td onclick="removerow(' + product_detail['product_id'] + ');"><i class="fa fa-close"></i></td>' +
                        '</tr>'; 



                } else {


                   var gst_amount                   =     (Number(product_detail['selling_price']) * Number(product_detail['sell_gst_percent']) / 100).toFixed(4);
                   
                    var total_amount                 =     Number(product_detail['offer_price']);
                   
                     var stotal_amount     =     Number(total_amount).toFixed(2);
                     var total_amount      =     Number(total_amount).toFixed(4);
                     var showsellprice     =     Number(product_detail['selling_price']).toFixed(2);
                     var showcostprice     =     Number(product_detail['cost_price']).toFixed(2);
                     var showmrp           =     Number(product_detail['offer_price']).toFixed(2);


                    product_html += '<tr id="product_' + product_id + '">' +
                    '<td class="pt-15 pb-15" id="pproduct_name_'+product_id+'" name="pproduct_name[]"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);"><span class="informative">'+product_detail['product_name']+'</span></a></td>'+ 
                        '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+barcode+'</a></td>'+
                        '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+colour_name+'</a></td>'+
                        '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+size_name+'</a></td>'+
                        '<td class="leftAlign"><a id="popupid_'+product_detail['product_id']+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+
                        '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                        '<input value="" type="hidden" id="combo_products_detail_id_'+product_id+'" name="combo_products_detail_id[]" class="" >'+
                        '<input value="'+product_detail['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+
                        '</td>'+
                        // '<td id="stock_'+product_id+'" name="stock[]">'+qty+'</td>'+ 
                        '<td id="ccostprice_'+product_id+'" class="rightAlign">'+showcostprice+'<input type="hidden" id="costprice_'+product_id+'" class="floating-input form-control number" value="'+product_detail['cost_price']+'" >'+'<input type="hidden" id="tcostprice_'+product_id+'" class="floating-input form-control number tcostprice" value="'+product_detail['cost_price']+'" >'+'</td>'+
                        '<td id="sellingmrp_'+product_id+'" class="rightAlign">'+showmrp+'<input type="hidden" id="mrp_'+product_id+'" class="floating-input form-control number" value="'+product_detail['offer_price']+'" >'+'</td>'+
                        '<td id="sellingpricewgst_'+product_id+'" class="rightAlign">'+showsellprice+'<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number" name="tsellingwithoutgst[]"  value="'+product_detail['selling_price']+'" >'+'</td>'+                  
                        '<td id="sellingqty_'+product_id+'" class="rightAlign">'+
                        '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="1" name="qty[]" onkeyup="return calqty(this);">'+
                        '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="0" name="oldqty[]">'+
                        '</td>'+
                        '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+product_detail['sell_gst_percent']+'</td>'+
                        '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+gst_amount+'</td>'+

                        '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                        '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;">'+stotal_amount+'</td>'+
                        '<td onclick="removerow(' + product_detail['product_id'] + ');"><i class="fa fa-close"></i></td>' +
                        '</tr>'; 

                }
            }
        }
    //}

        $("#productsearch").val('');
        $(".odd").hide();
        $("#sproduct_detail_record").prepend(product_html);
        totalcalculation();
        
      
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
    
    $('.titems').html(srrno);
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
    // var stock                     =     $('#stock_'+product_id).html();

    
        var sellingprice              =     $("#sellingwithoutgst_"+product_id).val();
        var costprice                 =     $("#costprice_"+product_id).val();
        var mrp                       =     $("#mrp_"+product_id).val();
        var gst_per                   =     $("#prodgstper_"+product_id).html();

        // console.log($("#costprice_"+product_id).val());
          
        var gst_amount                =     ((Number(sellingprice) * Number(gst_per)) / 100).toFixed(4); 

        var totalgst                  =      Number(gst_amount) * Number(qty);
        var totalcostprice            =      Number(costprice) * Number(qty);
                   
        var total_amount              =     Number(mrp)  * Number(qty);
       
         var stotal_amount     =     Number(total_amount).toFixed(2);
         var total_amount      =     Number(total_amount).toFixed(4);
         var showsellprice     =     Number(sellingprice).toFixed(2);
         var showcostprice     =     Number(costprice).toFixed(2);
         var showmrp           =     Number(mrp).toFixed(2);


         $('#tcostprice_'+product_id).val(Number(totalcostprice).toFixed(4));
         $('#stotalamount_'+product_id).html(stotal_amount);
         $('#totalamount_'+product_id).html(total_amount);
         $('#prodgstamt_'+product_id).val(Number(totalgst));
          totalcalculation();

      
}

function totalcalculation()
{
    var totalcostprice = 0;
    var totalqty = 0;
    var totalmrp = 0;


    
    $('.tcostprice').each(function (index,e){
      if($(this).val()!="")
      totalcostprice   +=   parseFloat($(this).val());
     
     
    });
    $('.tsellingaftergst').each(function (index,e){
      if($(this).html()!="")
      totalmrp   +=   parseFloat($(this).html());
     
     
    });
    $('.totqty').each(function (index,e){
      if($(this).val()!="")
      totalqty   +=   parseFloat($(this).val());
      
    
    });
    $('.ttotalqty').html(totalqty);    
    $('.ttotalcostprice').html(totalcostprice.toFixed(2));
    $('.ttotalmrp').html(totalmrp.toFixed(2));
    
}

$("#addbilling").click(function (e) {

     $(this).prop('disabled', true);
     $('#addproductkit').trigger('click');

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
                            arrayItem['product_id'] =$(this).find("#productid_"+wihoutidname[1]).val();
                            arrayItem['combo_products_detail_id'] =$(this).find("#combo_products_detail_id_"+wihoutidname[1]).val();
                        }
                        else if(nameforarray == 'sellingqty')
                        {
                            arrayItem['qty'] =$(this).find("#qty_"+wihoutidname[1]).val();
                        }
                        


                }

          });
          array.push(arrayItem);
      });

      var arraydetail = [];
      arraydetail.push(array);

      var kitdetail = {};
      kitdetail['kitproduct_id'] = $("#pproduct_id").val();

      arraydetail.push(kitdetail);
       console.log(arraydetail);
       //return false;
   
      var data = arraydetail;

      var  url = "kit_create";
      var dataType = "";
      var type = "POST";
      callroute(url,type,dataType,data,function (data)
      {
          $("#addbilling").prop('disabled', true);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {
            
               toastr.success(dta['Message']);
               window.location = dta['url'];
              $("#billingform").trigger('reset');
              $("#productform").trigger('reset');
              $("#sproduct_detail_record").empty('');

              
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

function validate_billing(frmid)
{
    var error = 0;

    
    if($('#product_name').val() == '')
    {
             error = 1;
             $('#product_block').slideToggle();
             $('#product_name').focus();
             toastr.error("Enter Kit Name");
             return false;
        
    }
    if($("#offer_price").val() ==0 || $("#offer_price").val() =='')
    {
        error = 1;
        $('#product_block').slideToggle();
        $('#offer_price').focus();
        toastr.error("Enter Kit Price Details");
        return false;
    }
   
    if($('.ttotalqty').html()==0 || $('.ttotalqty').html()=='')
    {
        error = 1;
        $('#productsearch').focus();
        toastr.error("Add Items for Kit");
        return false;
    }
    if($('#pproduct_id').val()=='')
    {
        error = 1;
        $('#product_block').slideToggle();
        $('#addproductkit').focus();
        toastr.error("Save Kit Product Details");
        return false;
    }

    if(error == 1)
    {
        return false;
    }
    else
    {
        $('#addbilling').prop('disabled', true);
        $("#billing_error").html('');
        return true;
    }
}

function edit_productskit(billid)
{


    var  url = "edit_productskit";
    var type = "POST";
    var dataType = "";
    var data = {
        'product_id' : billid,
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
           localStorage.setItem('edit_productskit_record',JSON.stringify(dta['Data']));

            window.location.href = url;



        }
    });
}
function inward_productskit(productid)
{


    var  url = "inwardproductskit";
    var type = "POST";
    var dataType = "";
    var data = {
        'product_id' : productid,
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
           localStorage.setItem('inward_kit_record',JSON.stringify(dta['Data']));

            window.location.href = url;



        }
    });
}

$(document).ready(function () {

  if(localStorage.getItem('edit_productskit_record'))
  {
    var edit_data  = localStorage.getItem('edit_productskit_record');
     
    //console.log(edit_data);
    if(edit_data != '' && edit_data != undefined && edit_data != null)
    {
      
                //console.log(edit_data);
                var brandval = '';
                var categoryval = '';
                var subcategoryval = '';
                var colourval = '';
                var sizeval = '';
                var uqcval = '';

                var edit_kitdata = JSON.parse(edit_data);

                var feature_rel = edit_kitdata['product_features_relationship'];

                console.log(edit_kitdata);
                $.each(feature_rel,function(kk,vv)
                {
                    if(kk.startsWith("dynamic_") == true && vv != '' && vv != 'NULL' && vv != null)
                    {
                        $("#"+kk).val(vv);
                    }
                });

                $("#pproduct_id").val(edit_kitdata['product_id']);
                $("#product_id").val(edit_kitdata['product_id']);
                $("#product_name").val(edit_kitdata['product_name']);
                $(".showproduct_name").html(edit_kitdata['product_name']);
                $("#product_note").val(edit_kitdata['note']);
                $(".showproduct_note").html(edit_kitdata['note']);
                $("#cost_rate").val(edit_kitdata['cost_rate']);
                $("#cost_gst_percent").val(edit_kitdata['cost_gst_percent']);
                $("#cost_gst_amount").val(edit_kitdata['cost_gst_amount']);
                $("#extra_charge").val(edit_kitdata['extra_charge']);
                $("#cost_price").val(edit_kitdata['cost_price']);
                $("#profit_percent").val(edit_kitdata['profit_percent']);
                $("#profit_amount").val(edit_kitdata['profit_amount']);
                $("#selling_price").val(edit_kitdata['selling_price']);
                $(".showselling_price").html(edit_kitdata['selling_price']);
                $("#sell_gst_percent").val(edit_kitdata['sell_gst_percent']);
                $("#sell_gst_amount").val(edit_kitdata['sell_gst_amount']);
                $("#product_mrp").val(edit_kitdata['product_mrp']);
                $("#offer_price").val(edit_kitdata['offer_price']);
                $(".showmrp").html(edit_kitdata['offer_price']);
                $("#wholesale_price").val(edit_kitdata['wholesale_price']);
                $("#sku_code").val(edit_kitdata['sku_code']);
                $(".showsku_code").html(edit_kitdata['sku_code']);
                $("#product_code").val(edit_kitdata['product_code']);
                $(".showproduct_code").html(edit_kitdata['product_code']);
                $("#product_description").val(edit_kitdata['product_description']);
                $(".showproduct_description").html(edit_kitdata['product_description']);
                $("#hsn_sac_code").val(edit_kitdata['hsn_sac_code']);
                $(".showhsn_sac_code").html(edit_kitdata['hsn_sac_code']);
               


                if (edit_kitdata['uqc_id'] == null) {
                    uqcval = '0';
                } else {
                    uqcval = edit_kitdata['uqc_id'];
                    $('.showuqc_id').html(edit_kitdata['uqc']['uqc_name']);
                }
                getUqc(uqcval);
                //$("#productform #uqc_id").val(uqcval);

                if(edit_kitdata['profit_percent'] == '' || edit_kitdata['profit_percent'] == null || edit_kitdata['profit_percent'] <= 0)
                {
                    $("#profit_percent").css('color','red');
                }

                if(edit_kitdata['profit_amount'] == '' || edit_kitdata['profit_amount'] == null || edit_kitdata['profit_amount'] <= 0)
                {
                    $("#profit_amount").css('color','red');
                }


                $("#product_system_barcode").val(edit_kitdata['product_system_barcode']);
                $(".showproduct_system_barcode").html(edit_kitdata['product_system_barcode']);
                $("#supplier_barcode").val(edit_kitdata['supplier_barcode']);
                $(".showsupplier_barcode").html(edit_kitdata['supplier_barcode']);
                $("#alert_product_qty").val(edit_kitdata['alert_product_qty']);
                $(".showalert_product_qty").html(edit_kitdata['alert_product_qty']);
                $("#days_before_product_expiry").val(edit_kitdata['days_before_product_expiry']);

                $('#EditImagesBlock').html('');
                $('#EditImagesBlock').show();
                $('.previews').html('');

                //console.log(edit_kitdata['product_images'])
                 //console.log(edit_kitdata['public_path']);
                $.each(edit_kitdata['product_images'],function (key,value)
                {
                    $('#EditImagesBlock').prepend('<div class="col-md-3 center" id="picture_'+value['product_image_id']+'"><img src="'+edit_kitdata['public_path']+'/public/uploads/products/'+value['product_image']+'" id="product_preview_1" name="product_preview_1" class="pb-10" width="" height="150px"><br><b>'+value['caption']+'</b><br><a class="displayright pt-10" onclick="removePicture('+value['product_image_id']+')"><i class="fa fa-remove cursor" style="font-size: 20px;"></i></a></div>');
                });

          //console.log(edit_kitdata['combo_products_detail']);
          if(edit_kitdata['combo_products_detail'] != 'undefined' && edit_kitdata['combo_products_detail'] != '')
           {

               var product_html = '';   
                var pcount    = 0;
                var sellingprice  = 0;
               
                      
           $.each(edit_kitdata['combo_products_detail'],function (productkey,productvalue)
           {
                  var stock = 0;

                  $.each(productvalue['price_master'],function (key,value)
                  {
                      
                          stock          +=   value['product_qty'];
                          
                     
                  });
                
                        var pricehtml = '';  
                        var gst_amount           =     (Number(productvalue['product']['selling_price']) * Number(productvalue['product']['sell_gst_percent']) / 100).toFixed(4);

                        var totalgst             =     Number(gst_amount) * Number(productvalue['qty']);
                        var totalcostprice       =     Number(productvalue['product']['cost_price']) * Number(productvalue['qty']);
                       
                        var total_amount         =     Number(productvalue['product']['offer_price']) * Number(productvalue['qty']);
                       
                         var stotal_amount       =     Number(total_amount).toFixed(2);
                         var total_amount        =     Number(total_amount).toFixed(4);
                         var showsellprice       =     Number(productvalue['product']['selling_price']).toFixed(2);
                         var showcostprice       =     Number(productvalue['product']['cost_price']).toFixed(2);
                         var showmrp             =     Number(productvalue['product']['offer_price']).toFixed(2);



                       if(productvalue['product']['supplier_barcode']!='' && productvalue['product']['supplier_barcode']!=null)
                        {
                          var barcode     =     productvalue['product']['supplier_barcode'];
                        }
                        else
                        {
                          var barcode     =     productvalue['product']['product_system_barcode'];
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
                          $('.titems').html(sr);  

                         

                          if(productvalue['product']['uqc']!=null)
                          {
                            uqc_name   = productvalue['product']['uqc']['uqc_name'];
                          }
                          else
                          {
                            uqc_name   = '';
                          }

                      
                          var feature_show_val = "";
                        if(bill_show_dynamic_feature != '')
                        {
                            var feature = bill_show_dynamic_feature.split(',');

                            $.each(feature,function(fea_key,fea_val)
                            {
                                var feature_name = '';                               
                                
                                if(typeof(productvalue['product'][fea_val]) != "undefined" && productvalue['product'][fea_val] !== null) {

                                    feature_name = productvalue['product'][fea_val];
                                    //console.log(feature_name);
                                }

                                feature_show_val += '<td>' + feature_name + '</td>';
                            })
                        }
                        //console.log(feature_show_val);
                        var product_id = productvalue['product_id'];

                        product_html += '<tr id="product_' + product_id + '">' +
                        '<td class="pt-15 pb-15" id="pproduct_name_'+product_id+'" name="pproduct_name[]"><a id="popupid_'+productvalue['product_id']+'" onclick="return productdetailpopup(this);"><span class="informative">'+productvalue['product']['product_name']+'</span></a></td>'+ 
                            '<td class="leftAlign"><a id="popupid_'+productvalue['product_id']+'" onclick="return productdetailpopup(this);">'+barcode+'</a></td>'+
                            feature_show_val
                            +'<td class="leftAlign"><a id="popupid_'+productvalue['product_id']+'" onclick="return productdetailpopup(this);">'+uqc_name+'</a></td>'+
                            '<td id="roomnoval_'+product_id+'" style="display:none;">'+
                            '<input value="'+productvalue['combo_products_detail_id']+'" type="hidden" id="combo_products_detail_id_'+product_id+'" name="combo_products_detail_id[]" class="" >'+
                            '<input value="'+productvalue['product_id']+'" type="hidden" id="productid_'+product_id+'" name="productid[]" class="allbarcode" >'+
                            '</td>'+
                            // '<td id="stock_'+product_id+'" name="stock[]">'+stock+'</td>'+ 
                            '<td id="ccostprice_'+product_id+'" class="rightAlign">'+showcostprice+'<input type="hidden" id="costprice_'+product_id+'" class="floating-input form-control number" value="'+productvalue['product']['cost_price']+'" >'+'<input type="hidden" id="tcostprice_'+product_id+'" class="floating-input form-control number tcostprice" value="'+totalcostprice+'" >'+'</td>'+
                            '<td id="sellingmrp_'+product_id+'" class="rightAlign">'+showmrp+'<input type="hidden" id="mrp_'+product_id+'" class="floating-input form-control number" value="'+productvalue['product']['offer_price']+'" >'+'</td>'+
                            '<td id="sellingpricewgst_'+product_id+'" class="rightAlign">'+showsellprice+'<input type="hidden" id="sellingwithoutgst_'+product_id+'" class="floating-input form-control number" name="tsellingwithoutgst[]"  value="'+productvalue['product']['selling_price']+'" >'+'</td>'+                  
                            '<td id="sellingqty_'+product_id+'" class="rightAlign">'+
                            '<input type="text" id="qty_'+product_id+'" class="floating-input tarifform-control number totqty" value="'+productvalue['qty']+'" name="qty[]" onkeyup="return calqty(this);">'+
                            '<input type="hidden" id="oldqty_'+product_id+'" class="floating-input tarifform-control number" value="0" name="oldqty[]">'+
                            '</td>'+
                            '<td id="prodgstper_'+product_id+'" style="display:none;" name="prodgstper[]">'+productvalue['product']['sell_gst_percent']+'</td>'+
                            '<td id="prodgstamt_'+product_id+'" style="display:none;" class="totalgstamt" name="prodgstamt[]">'+totalgst+'</td>'+

                            '<td id="totalamount_'+product_id+'" style="font-weight:bold;display:none;" class="tsellingaftergst" name="totalamount[]">'+total_amount+'</td>'+
                            '<td id="stotalamount_'+product_id+'" style="font-weight:bold;text-align:right !important;">'+stotal_amount+'</td>'+
                            '<td onclick="removerow(' + productvalue['product_id'] + ');"><i class="fa fa-close"></i></td>' +
                            '</tr>'; 
                                                
                  
            });
                
        

       }
       $("#sproduct_detail_record").append(product_html);
       totalcalculation();


    }
  }


  
});
function removePicture(product_image_id)
{
    var fetch_data_url  =   'ProductremovePicture';
    $('.loaderContainer').show();
    $.ajax({
        url:fetch_data_url,
        data: {
            product_image_id:product_image_id,
        },
        success:function(data)
        {
            var searchdata = JSON.parse(data, true);
            $('.loaderContainer').hide();
            // console.log(searchdata);

            $('#picture_'+product_image_id).remove();

            toastr.success(searchdata['Message']);
        }
    })
}

function viewProductkit(obj){



    var id                        =     $(obj).attr('id');
    var product_id                =     $(obj).attr('id').split('viewkit_')[1]; 
    $('.productskitdetail').html('')
   
     $('.loaderContainer').show();
        var url                       =     'view_kitdetail_popup';
        $.ajax({
            url:url,

            data: {
               
                product_id:product_id,
                
            },
            success:function(data)
            {
                $('.popup_values').html('');
                $('.popup_values').html(data);
                $('.loaderContainer').hide();


            }
        })
    
}
