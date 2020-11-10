

$('#productsearch').keypress(function (e) {
    var key = e.which;
    if (key == 13)
    {
        $('#typeqty').focus();
        $('#typeqty').select();
    }
});

$('#typeqty').keypress(function (e) {
    var key = e.which;
    if (key == 13)
    {
        $('#searchproductrecord').focus();
    }
});

function showdeliverypage(sales_type)
{
        if(sales_type == 2)
        {
            var data = {
                'tableno' : '',
                'tablename' : '',
                'sales_type' : 2
            };        
            localStorage.setItem('make_bill_record',JSON.stringify(data));
            window.location.href = 'home_delivery';
        }
        else
        {
            var data = {
                'tableno' : '',
                'tablename' : '',
                'sales_type' : 3
            };        
            localStorage.setItem('make_bill_record',JSON.stringify(data));
            window.location.href = 'take_away';
        }         
}

$('input[name="discount_type"]').click(function(){
    var radiovalue  =  $('input[name="discount_type"]:checked').val();

      if(Number(radiovalue) == 1)
      {
        $('#overalldiscount_percent').show();
        $('#overalldiscount_amount').hide();
      }
      else
      {
        $('#overalldiscount_percent').hide();
        $('#overalldiscount_amount').show();
      }
   

});

$('body').keyup(function(e) {
  var steward_id  = $('#steward_id').val();
  
      if(e.keyCode === 27){
        if(steward_id == '')
        { 
            $('#myModalfirstpop').modal('show');
        }
  }
    
});

function StewardDetail(steward_id)
{
    $('.StewardTab').removeClass('is-active');
    $('#Steward'+steward_id).addClass('is-active');
    $('#steward_id').val(steward_id);
}

function getCover(covers)
{
    $('.coverTab').removeClass('is-active');
    $('#Covers'+covers).addClass('is-active');
    $('#covers').val(covers);
}


$("#steward").typeahead({
   source: function(request, process) {
       var url = "steward_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#steward").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#steward").val()
           objects = [];
           map = {};
           var scanned_data = data;
           if(scanned_data["Success"]=="False")
                {
                    $('#steward_id').val('');
                    $("#myModalfirstpop .dropdown-menu").html('');
                    $("#myModalfirstpop .dropdown-menu").hide();
                    
                }
                else
                {
                     if ($("#steward").val() != '') {
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

     autoselect:true,
     afterSelect: function (item) {

      $('.loaderContainer').show();
        var value = item;


        if(map[item] == undefined)
        {
            $('.loaderContainer').hide();
            toastr.error("Wrong Item Searched Please search the same Steward again !");

        }
        else
        {

             var steward_id = map[item]['steward_id'];
             $('#steward_id').val(steward_id);

        }

    }

});
$('#addcoverbtn').click(function(e){

    var steward_id  =  $('#steward_id').val();
    if(steward_id == '')
    {
      toastr.error("Please search Steward from saved List");
    }
    else
    {
      $('#myModalfirstpop').modal('hide');
    }


});


function totalcalculation()
{
    var gross_total = 0;
    var totalgst=0;
    var grand_total = 0;
    var totaldiscount =0;
    var totalqty = 0
    var discountedprice = 0;


    
    $('.dototalgstprice').each(function (index,e){
      if($(this).val()!="")
      grand_total   +=   parseFloat($(this).val());
     
     
    });
     
    $('.overallpproddiscamt').each(function (index,e){
      if($(this).val()!="")
      totaldiscount   +=   parseFloat($(this).val());
     
     
    });


    $('.dototalprice').each(function (index,e){
      if($(this).val()!="")
      gross_total   +=   parseFloat($(this).val());
     
     
    });
    $('.dototalgstamt').each(function (index,e){
      if($(this).html()!="")
      totalgst   +=   parseFloat($(this).html());
      
    
    });

    $('.totqty').each(function (index,e){
      if($(this).val()!="")
      totalqty   +=   parseFloat($(this).val());
    
    });

    $('.discountedprice').each(function (index,e){
      if($(this).html()!="")
      discountedprice   +=   parseFloat($(this).html());
    
    });
    
   
  

    $('#overallqty').html(totalqty);    
    $('#gross_total').html(Number(gross_total).toFixed(4));
    $('#totaldiscount_amount').html(Number(totaldiscount).toFixed(4));
    $('#total_tax').html(Number(totalgst).toFixed(4));
    $('#grand_total').html(Number(grand_total).toFixed(4));

    $('#showgross_total').html(Number(gross_total).toFixed(2));
    $('#showtotaldiscount_amount').html(Number(totaldiscount).toFixed(2));
    $('#showtotal_tax').html(Number(totalgst).toFixed(2));
    $('#showgrand_total').html(Number(grand_total).toFixed(0));

    $('.poptotalqty').html(Number(totalqty));
    $('.poptotaldiscount').html(Number(totaldiscount).toFixed(2));
    $('.popgrandtotal').html(Number(grand_total).toFixed(0));
    $('.poptotalgst').html(Number(totalgst).toFixed(2));
    $('.poptotalprice').html(Number(discountedprice).toFixed(2));
   


           
    
   
}
function totalpaidamount()
{
            var totalpaidamt                =     0;
            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var wallet                      =     $('#wallet').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var grand_total                 =     $('#receivable_amount').val();

            
            cash_balance    =     Number(grand_total)-Number(wallet)-Number(card)-Number(cash)- Number(outstanding_amount);
          
            $('#totalunpaid').val(Number(cash_balance));
}
$('#card').on("input", function() {


            $('.chequedetails').hide();

            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var wallet                      =     $('#wallet').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var totalunpaid                 =     $('#totalunpaid').val();
            var grand_total                 =     $('#receivable_amount').val();
            var cash_balance                =     0;

            cash_balance    =     Number(grand_total)-Number(cash)-Number(card)-Number(wallet)-Number(outstanding_amount);

         

            if(Number(cash_balance)<0)
            {
              //toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
              
              $('#cash').val(0);
              $('#wallet').val(0);
              $('#outstanding_amount').val(0);
              cash_balance    =     Number(grand_total)-Number(cash)-Number(wallet)-Number(outstanding_amount);
              $('#totalunpaid').val(cash_balance);
              totalpaidamount();
            }
            else
            {
              //console.log(grand_total);
              //console.log(cash_balance);
               $('#totalunpaid').val(cash_balance);
               totalpaidamount();
            }
     

});
$('#wallet').on("input", function() {

            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var wallet                      =     $('#wallet').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var totalunpaid                 =     $('#totalunpaid').val();
            var grand_total                 =     $('#receivable_amount').val();
            var cash_balance                =     0;

            cash_balance    =     Number(grand_total)-Number(cash)-Number(card)-Number(wallet)-Number(outstanding_amount);

         

            if(Number(cash_balance)<0)
            {
              //toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
              
              $('#cash').val(0);
              $('#card').val(0);
              $('#outstanding_amount').val(0);
              cash_balance    =     Number(grand_total)-Number(cash)-Number(card)-Number(outstanding_amount);
              $('#totalunpaid').val(cash_balance);
              totalpaidamount();
            }
            else
            {
              //console.log(grand_total);
              //console.log(cash_balance);
               $('#totalunpaid').val(cash_balance);
               totalpaidamount();
            }
      

     

}); 
$('#outstanding_amount').on("input", function() {


           var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var wallet                      =     $('#wallet').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var totalunpaid                 =     $('#totalunpaid').val();
            var grand_total                 =     $('#receivable_amount').val();
            var cash_balance                =     0;

            cash_balance    =     Number(grand_total)-Number(cash)-Number(card)-Number(wallet)-Number(outstanding_amount);

         

            if(Number(cash_balance)<0)
            {
              //toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
              
              $('#cash').val(0);
              $('#card').val(0);
              $('#wallet').val(0);
              cash_balance    =     Number(grand_total)-Number(cash)-Number(card)-Number(wallet);
              $('#totalunpaid').val(cash_balance);
              totalpaidamount();
            }
            else
            {
              //console.log(grand_total);
              //console.log(cash_balance);
               $('#totalunpaid').val(cash_balance);
               totalpaidamount();
            }

            
      

     

});
$('#cash').on("input", function() {


           var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var wallet                      =     $('#wallet').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var totalunpaid                 =     $('#totalunpaid').val();
            var grand_total                 =     $('#receivable_amount').val();
            var cash_balance                =     0;

            cash_balance    =     Number(grand_total)-Number(cash)-Number(card)-Number(wallet)-Number(outstanding_amount);

         

            if(Number(cash_balance)<0)
            {
              //toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
              
              $('#wallet').val(0);
              $('#card').val(0);
              $('#outstanding_amount').val(0);
              cash_balance    =     Number(grand_total)-Number(card)-Number(wallet)-Number(outstanding_amount);
              $('#totalunpaid').val(cash_balance);
              totalpaidamount();
            }
            else
            {
              //console.log(grand_total);
              //console.log(cash_balance);
               $('#totalunpaid').val(cash_balance);
               totalpaidamount();
            }
    
         

});
function enablewalletdiv(obj)
{
   var payment_method_id         =     $(obj).attr('class').split('wpaymentid_')[1];
    $('.allwallettabs').hide();
    $('.walletTab_'+payment_method_id).show();
}
function walletDetail(wallet_type_id,payment_method_id)
{
 
    $('.allwallettabs').removeClass('is-active');
    $('#wallet_'+wallet_type_id).addClass('is-active');
    $('.walletname_'+payment_method_id).val(wallet_type_id);
}
function fetchpaymentamount(obj)
{
    var id                        =     $(obj).attr('id');
    var payment_method            =     $(obj).attr('id').split('payment_')[1];
    var payment_method_id         =     $(obj).attr('class').split('wpaymentid_')[1];
    var totalunpaid               =     $('#totalunpaid').val();
    var grand_total               =     $('#receivable_amount').val();
    var cash                      =     $('#cash').val();
    var card                      =     $('#card').val();
    var wallet                    =     $('#wallet').val();
    var outstanding_amount        =     $('#outstanding_amount').val();

    //console.log(payment_method_id);

    $('.allwallettabs').hide();
    $('.walletTab_'+payment_method_id).show();


    if(payment_method == 'cash')
    {
        if(Number(totalunpaid) != 0)
        {
          $('#cash').val(Number(totalunpaid));
          $('#totalunpaid').val(0);
        }
        else
        {
            $('#cash').val(Number(grand_total));
            $('#card').val(0);
            $('#wallet').val(0);
            $('#outstanding_amount').val(0);
        }
        
        $('.chequedetails').hide();
        $('.outstandingdetails').hide();
        $('#autoselectpayment').val(1);

        totalpaidamount();

    }
    else if(payment_method == 'card')
    {

        if(Number(totalunpaid) != 0)
        {
          $('#card').val(Number(totalunpaid));
          $('#totalunpaid').val(0);
        }
        else
        {
            $('#card').val(Number(grand_total));
            $('#cash').val(0);
            $('#wallet').val(0);
            $('#outstanding_amount').val(0);
        }
        $('.chequedetails').hide();
        $('#autoselectpayment').val(1);
        totalpaidamount();

    }
   
    else if(payment_method == 'wallet')
    {
        if(Number(totalunpaid) != 0)
        {
          $('#wallet').val(Number(totalunpaid));
          $('#totalunpaid').val(0);
        }
        else
        {
            $('#wallet').val(Number(grand_total));
            $('#cash').val(0);
            $('#card').val(0);
            $('#outstanding_amount').val(0);
        }
        $('.chequedetails').hide();
        $('#autoselectpayment').val(1);
        totalpaidamount();

    }
    
    else if(payment_method == 'outstanding_amount')
    {
        if(($('#duedays').val())=='' || ($('#duedays').val())=='')
        {       
           toastr.error("First Enter Due Days for Outstanding Amount.")
           $('#outstanding_amount').val('');
           $('.chequedetails').hide();
           $('.netbankingdetails').hide();
           $('.outstandingdetails').show();
           $('#autoselectpayment').val(1);
           return false;
        } 
        else
        {
            if(Number(totalunpaid) != 0)
            {
              $('#outstanding_amount').val(Number(totalunpaid));
              $('#totalunpaid').val(0);
            }
            else
            {
                $('#outstanding_amount').val(Number(grand_total));
                $('#cash').val(0);
                $('#card').val(0);
                $('#wallet').val(0);
            }
           $('.outstandingdetails').show();
           $('#autoselectpayment').val(1);

           totalpaidamount();

        }
       
    }

}
$("#cash, #card,  #wallet, #outstanding_amount").keyup(function(e){

  $('#autoselectpayment').val(0);

});


$("#bankname ").focusout(function() {
    var chequeno            =  $('#chequeno').val();
    var bankname            =  $('#bankname').val();
    var autoselectpayment   =  $('#autoselectpayment').val();
    var grand_total         =  $('#sggrand_total').val();

      if(Number(autoselectpayment)==1)
      {
           if(chequeno != '' && bankname != '')
          {
                $('#cheque').val(Number(grand_total));
                $('#card').val('');
                $('#cash').val('');
                $('#wallet').val('');
                $('#credit_note').val('');
                $('#outstanding_amount').val('');
          }
      }
   
});
$("#duedays").focusout(function() {
    var duedays             =  $('#duedays').val();
    var duedate             =  $('#duedate').val();
    var autoselectpayment   =  $('#autoselectpayment').val();
    var grand_total         =  $('#sggrand_total').val();

      if(Number(autoselectpayment)==1)
      {
           if(duedays != '' && duedate != '')
          {
                $('#outstanding_amount').val(Number(grand_total));
                $('#card').val('');
                $('#cash').val('');
                $('#wallet').val('');
                $('#credit_note').val('');
                $('#cheque').val('');
          }
      }
   
});



function paymentmode()
{

            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var credit_note                 =     $('#credit_note').val();
            var grand_total                 =     $('#receivable_amount').val();
            var cash_balance    =      0;

    
          cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(outstanding_amount)-Number(credit_note);
          cash_balance     =    Number(cash_balance).toFixed(decimal_points);
            $('#cash').val(Number(cash_balance).toFixed(decimal_points));

             var cash        =   $('#cash').val();
             var cash_given   =   $('#cash_given').val();     
                if(Number(cash)!='' && Number(cash)!=0 && Number(cash_given)==0 && Number(cash_given)=='')
                {
                    $('.givechangesection').show();
                }
                else if(Number(cash)!='' && Number(cash)!=0 && Number(cash_given)!=0 && Number(cash_given)!='')
                {
                  $('.givechangesection').show();
                             

                  var give_change  =   Number(cash_given) - Number(cash);
                  $('#give_change').val(Number(give_change));
                }
                else
                {
                    $('.givechangesection').hide();
                }
              
      
}

//search customer details
$("#searchcustomer").typeahead({
   source: function(request, process) {
       var url = "newcustomer_search";
       var type = "post";
       var dataType = "json";
       var data = {
           search_val: $("#searchcustomer").val(),
           term: request.term
       };

       callroute(url, type, dataType, data, function (data) {
           $("#searchcustomer").val()
           objects = [];
           map = {};
           var scanned_data = data;
              if(scanned_data["Success"]=="False")
                {
                    console.log(scanned_data['Data']);
                    $('.customerarea .dropdown-menu').html('');
                    $('.customerarea .dropdown-menu').hide();

                    var customerid = '';

                    var typeahead_menu = '<ul class="typeahead dropdown-menu" role="listbox" style="top: 353px; left: 696.281px;display:revert !important;"><li class="active" onclick="return getcustomerdetail(0);"><a class="dropdown-item" role="option"><strong>Add New Customer</strong></a></li></ul>';
                    $('.manual_dropdown').html(typeahead_menu);

                    
                }
                else
                {
                     $('.manual_dropdown').html('');
                     if ($("#searchcustomer").val() != '') {

                         $.each(data, function (i, object) {
                             map[object.label] = object;
                             objects.push(object.label);
                         });

                         process(objects);


                          // if (objects != '') {
                          //     if (objects.length === 1) {
                          //         $(".dropdown-menu .active").trigger("click");
                          //         $("#searchcustomer").val('');
                          //     }
                          // }

                         
                     } else {
                         $(".dropdown-menu").hide();
                     }
                }

       });

    },

  
     autoselect:true,
     afterSelect: function (item) {

        var value = item;


        if(map[item] == undefined)
        {
            $('.loaderContainer').hide();
            toastr.error("Wrong Product Scanned Please Scan the same Product again !");

        }
        else
        {

             var customer_id = map[item]['customer_id'];
                $('#customer_id').val(customer_id);
                getcustomerdetail(customer_id);

                // getcustomerdetail(customer_id);
                // $('.customerdata').show();

        }

    }

});
// $("#searchcustomer").focusout(function() {
//     var customervalue =  $('#searchcustomer').val();
//     var customer_id   =  $('#ccustomer_id').val();
//     if(customervalue != '' && customer_id == '')
//     {
//         toastr.error("Please Save customer details first");
//         $("#addcustomerpopup").modal('show');
//     }
// });

var DateHelper = {
  addDays : function(aDate, numberOfDays) {
        aDate.setDate(aDate.getDate() + numberOfDays); // Add numberOfDays
        return aDate;                                  // Return the date
    },
    format : function format(date) {
        return [
           ("0" + date.getDate()).slice(-2),           // Get day and pad it with zeroes
           ("0" + (date.getMonth()+1)).slice(-2),      // Get month and pad it with zeroes
           date.getFullYear()                          // Get full year
        ].join('-');                                   // Glue the pieces together
    }
}

function getcustomerdetail(customerid)
{
     
     var customerid  =  customerid;
     if(customerid == 0)
     {
           $('.manual_dropdown').html('');
           toastr.error("Please Save customer details first");
           $('#ccustomer_id').val('');
           $("#myModaladdcustomer").modal('show');

           var searchcustomer  =  $('#searchcustomer').val();
           if($.isNumeric(searchcustomer))
           {
              $('#pcustomer_mobile').val(searchcustomer);
           }
           else
           {
             $('#pcustomer_name').val(searchcustomer);
           }
     }
     else
     {
     
             var type = "POST";
             var url = 'customer_detail';
             var dataType = "";
             var data = {
                 "customer_id" : customerid
                 
             }

           callroute(url,type,dataType,data,function(data)
           {
                var customer_alldata = JSON.parse(data,true);

                
                if(customer_alldata['Success'] == "True")
                {
                   
                    var customer_html  =  '';
                    var customer_data  =  customer_alldata['Data'][0];
                    var cus_state    =    '';
                    var company_stateid   = $('#company_stateid').val();

           

                    $('.opencustomerpopup').show();

                     $("#ccustomer_id").val(customer_data['customer_id']);
                     $("#customer_name").val(customer_data['customer_name']);
                     $("#customer_last_name").val(customer_data['customer_last_name']);
                     $("#customer_mobile").val(customer_data['customer_mobile']);
                     $("#customer_email").val(customer_data['customer_email']);
                     if(customer_data['customer_email'] != '' && customer_data['customer_email'] != null){
                         $("#email_customer").prop('checked', true);
                     }
                     $("#same_delivery_address").val(customer_data['same_delivery_address']);
                    if(customer_data['same_delivery_address'] == "0"){
                      $('input[id="same_address_yesno"]').prop('checked',false);
                      $("#customer_deleivery_address").show();              
                    }
                  else{
                      $('input[id="same_address_yesno"]').prop('checked',true);
                      $("#customer_deleivery_address").hide();   
                  }
                 
                   
                  if(customer_data['customer_address_detail']!= null && customer_data['customer_address_detail']!= '' && customer_data['customer_address_detail']['customer_gstin']!= null && customer_data['customer_address_detail']['customer_gstin']!= undefined)
                    {
                          $("#customer_gstin").val(customer_data['customer_address_detail']['customer_gstin']);
                    }
                    if(customer_data['customer_address_detail']!= null && customer_data['customer_address_detail']!= '' && customer_data['customer_address_detail']['customer_address']!= null && customer_data['customer_address_detail']['customer_address']!= undefined)
                    {
                      $("#customer_address").val(customer_data['customer_address_detail']['customer_address']);
                    }
                    if(customer_data['customer_address_detail']!= null && customer_data['customer_address_detail']!= '' && customer_data['customer_address_detail']['state_id']!= null && customer_data['customer_address_detail']['state_id']!= undefined)
                    {
                         cus_state  =  customer_data['customer_address_detail']['state_id'];
                    }
                     if(customer_data['customer_date_of_birth']!= null && customer_data['customer_date_of_birth']!= '' && customer_data['customer_date_of_birth']!= undefined)
                    {
                          $("#pcustomer_date_of_birth").val(customer_data['customer_date_of_birth']);
                          $("#pcustomer_date_of_birth").datepicker("setDate",customer_data['customer_date_of_birth']);

                    }
                     if(customer_data['customer_gender']!= null && customer_data['customer_gender']!= '' && customer_data['customer_gender']!= undefined)
                    {
                        $("input[name=gender][value="+customer_data['customer_gender']+"]").attr('checked','checked');

                    }
                  
                     if(customer_data['customer_children'] != '' && customer_data['customer_children'] != 'undefined')
                    {           
                      $("#repeat_child").html('');
                      $("#cust_child_plus").data('id',0);
                      var j = 0;
                      $.each(customer_data['customer_children'],function (key,value)
                         {
                          $('#cust_child_plus').attr('data-id' ,j);
                          document.getElementById("cust_child_plus").click();
                            j++;
                           $("#child_"+j+" #child_data").attr('data-id',"child_"+j);
                           $("#child_"+j+" #child_name").val(value['customer_child_name']);
                           $("#child_"+j+" #child_date_of_birth").val(value['customer_date_of_birth']);
                           $("#child_"+j+" #child_date_of_birth").datepicker("setDate",value['customer_date_of_birth']);
                           $("#child_"+j+" #customer_child_id").val(value['customer_child_id']);
                         
                         }); 
                    }

                   if(typeof customer_data['customer_multi_address_detail'] != '' && customer_data['customer_multi_address_detail'] != 'undefined' && customer_data['customer_multi_address_detail'] != null)
                    {
                        var address_detail = customer_data['customer_multi_address_detail'];
                        var total_add = address_detail.length;

                      
                        $("#repeat_address").html('');
                          $("#addressplus").data('id',0);

                        var i =0;
                         $.each(address_detail,function (key,value)
                         {
                            $('#addressplus').attr('data-id' ,i);
                            // alert("#new_address_1 #customer_office_address")
                            //  if(key != 0)
                           
                           if(value['customer_address_type'] == "1")
                           {
                            $("#customer_full_address #pcustomer_address_detail_id").val(value['customer_address_detail_id']);
                            $("#customer_full_address #customer_gstin").val(value['customer_gstin']);
                            $("#customer_full_address #pcustomer_address").val(value['customer_address']);
                            $("#customer_full_address #pcustomer_area").val(value['customer_area']);
                            $("#customer_full_address #pcustomer_city").val(value['customer_city']);
                            $("#customer_full_address #pcustomer_pincode").val(value['customer_pincode']);
                            $("#customer_full_address #pcustomer_state_id").val(value['state_id']);
                            $("#customer_full_address #pcustomer_country_id").val(value['country_id']);
                            cus_state    =    value['state_id'];
                           }
                           if(value['customer_address_type'] == "2")
                           {
                            
                            $("#customer_deleivery_address #pcustomer_address_detail_id").val(value['customer_address_detail_id']);
                           // $("#customer_gstin").val(value['customer_gstin']);
                            $("#customer_deleivery_address #pcustomer_address").val(value['customer_address']);
                            $("#customer_deleivery_address #pcustomer_area").val(value['customer_area']);
                            $("#customer_deleivery_address #pcustomer_city").val(value['customer_city']);
                            $("#customer_deleivery_address #pcustomer_pincode").val(value['customer_pincode']);
                            $("#customer_deleivery_address #pcustomer_state_id").val(value['state_id']);
                            $("#customer_deleivery_address #pcustomer_country_id").val(value['country_id']);
                            cus_state    =    value['state_id'];
                           }

                          else if(value['customer_address_type'] == "3" && customer_multi_address == "1")
                           {
            
                             // if (i != 0)
                             //    {

                             document.getElementById("addressplus").click(); //append multiple address
                             // }
                            i++;
                            $("#new_address_"+i+" #customer_office_address_detail_id").val(value['customer_address_detail_id']);
                           // $("#new_aaddress_"+key+" #customer_gstin").val(value['customer_gstin']);  
                            $("#new_address_"+i+" #customer_office_address").val(value['customer_address']);
                            $("#new_address_"+i+" #customer_office_area").val(value['customer_area']);
                            $("#new_address_"+i+" #customer_office_city").val(value['customer_city']);
                            $("#new_address_"+i+" #customer_office_pincode").val(value['customer_pincode']);
                            $("#new_address_"+i+" #customer_office_state_id").val(value['state_id']);
                            $("#new_address_"+i+" #customer_office_country_id").val(value['country_id']);
                            cus_state    =    value['state_id'];

                         }
                   
                        });
                        i = 0;
                      }
                      
                      
                      
                     
                }

                $("#searchcustomer").val('');
                $(".odd").hide();
                
           });
      }

}


$("#customer_gstin").keyup(function ()
{
    var gst_state_code = $("#customer_gstin").val().substr(0,2);

    if(gst_state_code.length != 0)
    {
        //$("#pcustomer_state_id").attr('disabled',true);
        $("#pcustomer_state_id").css('color','black');
        if(gst_state_code.startsWith('0'))
        {
            gst_state_code = gst_state_code.substring(1);
        }
        $("#pcustomer_state_id").val(gst_state_code);
    }
    else
    {
       // $("#pcustomer_state_id").removeAttr('disabled',false);
        $("#pcustomer_state_id").val('0');
    }

});
$("#pcustomer_gstin").keyup(function ()
{
    var gst_state_code = $("#pcustomer_gstin").val().substr(0,2);

    if(gst_state_code.length != 0)
    {
        //$("#pcustomer_state_id").attr('disabled',true);
        $("#pcustomer_state_id").css('color','black');
        if(gst_state_code.startsWith('0'))
        {
            gst_state_code = gst_state_code.substring(1);
        }
        $("#pcustomer_state_id").val(gst_state_code);
    }
    else
    {
        //$("#pcustomer_state_id").removeAttr('disabled',false);
        $("#pcustomer_state_id").val('0');
    }

});





$('#customer_mobile,#customer_email,#customer_address,#customer_gstin').change(function(e){
    toastr.success("Kindly Save your Customer Details!");
    $("#addcustomerpopup").modal('show');   
      var cusname       =     $('#customer_name').val();
      var cusmobile     =     $('#customer_mobile').val();
      var cusemail      =     $('#customer_email').val();
      var cusaddress    =     $('#customer_address').val();
      var cusgstin      =     $('#customer_gstin').val();
      var customerid    =     $('#ccustomer_id').val();
      var gst_state_code =     $("#customer_gstin").val().substr(0,2);

    if(gst_state_code.length != 0)
    {
        $("#pcustomer_state_id").attr('disabled',true);
        $("#pcustomer_state_id").css('color','black');
        if(gst_state_code.startsWith('0'))
        {
            gst_state_code = gst_state_code.substring(1);
        }
        $("#pcustomer_state_id").val(gst_state_code);
    }
    else
    {
        $("#pcustomer_state_id").removeAttr('disabled',false);
        $("#pcustomer_state_id").val('0');
    }

      $('#pcustomer_name').val(cusname);
      $('#pcustomer_mobile').val(cusmobile);
      $('#pcustomer_email').val(cusemail);
      $('#pcustomer_address').val(cusaddress);
      $('#pcustomer_gstin').val(cusgstin);
      $('#pcustomer_id').val(customerid);

      $('#pcustomer_name').focus();   
});

$(".opencustomerpopup").click(function () {
      $("#myModaladdcustomer").modal('show');       
});

$("#addcustomer").click(function () {

      $("#addcustomerpopup").modal('show');
      $("#customerform")[0].reset();
      //$("#customerform")[0].trigger('reset');
      $("#customer_full_address #pcustomer_address_detail_id").val('');
      $("#customer_deleivery_address #pcustomer_address_detail_id").val('');
      var cusname       =     $('#customer_name').val();
      var cusmobile     =     $('#customer_mobile').val();
      var cusemail      =     $('#customer_email').val();
      var cusaddress    =     $('#customer_address').val();
      var cusgstin      =     $('#customer_gstin').val();
      var customerid    =     $('#ccustomer_id').val();
      var gst_state_code =     $("#customer_gstin").val().substr(0,2);

    if(gst_state_code.length != 0)
    {
        $("#pcustomer_state_id").attr('disabled',true);
        $("#pcustomer_state_id").css('color','black');
        if(gst_state_code.startsWith('0'))
        {
            gst_state_code = gst_state_code.substring(1);
        }
        $("#pcustomer_state_id").val(gst_state_code);
    }
    else
    {
        $("#pcustomer_state_id").removeAttr('disabled',false);
        $("#pcustomer_state_id").val('0');
    }

      // $('#pcustomer_name').val(cusname);
      // $('#pcustomer_mobile').val(cusmobile);
      // $('#pcustomer_email').val(cusemail);
      // $('#pcustomer_address').val(cusaddress);
      // $('#pcustomer_gstin').val(cusgstin);
      // $('#pcustomer_id').val(customerid);

      $('#pcustomer_name').focus();
});

//added by hemaxi
$("#pcustomer_mobile").keyup(function ()
{
   
    var customer_mobile = $(this).val();

    $("#referral_id").val(customer_mobile);
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
  var customer_total_address_data = [];
  var customer_children_data = [];
      
      $("#repeat_child .child_data").each(function ()
       {
           var row_id = $(this).attr('id');
           var customer_children = {};
           $(this).find('input,select,hidden').each(function ()
           {
               var id = $(this).attr('id');
               var value_bank = $("#"+row_id+" #"+id).val();
               customer_children[id] = value_bank;
           });
           customer_children_data.push(customer_children);
       });

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


            $(".cus_address .taddress").each(function ()
           {

                var row_id = $(this).attr('id'); 

                var customer_total_address = {};
                $(this).find('input,select,hidden').each(function ()
                {
                      var ids = $(this).attr('id');
                  
                      var id = ids.slice(1);

                     var value_customer = '';
                    
                      if(id == 'pcustomer_country_id')
                     {
                          value_customer = $('#'+row_id+' #customer_country_id :selected').val();
                    
                         customer_total_address['customer_country_id'] = value_customer;
                     }
                     else
                     {
                          value_customer = $("#"+row_id+" #"+ids).val();

                         customer_total_address[id] = value_customer;
                     }
                });

               customer_total_address_data.push(customer_total_address);
               if($('input[id="same_address_yesno"]').prop("checked") == true && $("#pcustomer_address_detail_id").val()==''){
                       $('input[id="same_address_yesno"]').val(1);
                    //customer_total_address_data.push(customer_total_address);
                  return false;
               }
           });


      var main_address_data = JSON.stringify(customer_total_address_data);
      var customer_childrens_data = JSON.stringify(customer_children_data);

    $("#customer_main_address").val(main_address_data);
    $("#customer_child_data").val(customer_childrens_data);

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
                $("#myModaladdcustomer").modal('hide');

                $('#ccustomer_id').val(dta['customer_id']);
                $('#savecustomer').prop('disabled', false);

                var pcustomer_name    = $('#pcustomer_name').val();
                var pcustomer_mobile  = $('#pcustomer_mobile').val();
                var customer_show     =  pcustomer_name+'_'+pcustomer_mobile;
                $('#searchcustomer').val(customer_show);

              
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


$("#print_kot").click(function (e) {

  $(this).prop('disabled', true);

  if(validate_billing('billingform'))
  {
      $("#print_kot").prop('disabled', true);

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

                

                        if(nameforarray == 'productdetail')
                        {
                           
                            arrayItem['product_id'] =$(this).find("#productid_"+wihoutidname[1]).val();
                            arrayItem['product_type'] =$(this).find("#producttype_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'offerpricediv')
                        {
                            
                            arrayItem['sellingprice_before_discount'] =$(this).find("#offerprice_"+wihoutidname[1]).val();
                           
                            
                        }
                        else if(nameforarray == 'qtydiv')
                        {
                            arrayItem['qty'] =$(this).find("#qty_"+wihoutidname[1]).val();
                            // arrayItem['oldqty'] =$(this).find("#oldqty_"+wihoutidname[1]).val();
                            

                        }
                        else if(nameforarray == 'totaldiv')
                        {
                            arrayItem['totalprice'] =$(this).find("#totalprice_"+wihoutidname[1]).val();
                            arrayItem['totalgstprice'] =$(this).find("#totalgstprice_"+wihoutidname[1]).val();

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

                        }
                        else if(nameforarray == 'customercomment')
                        {
                            
                            arrayItem['kot_comment'] =$(this).find("#kotcomment_"+wihoutidname[1]).val();

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

   

      var sales_bill_id = $("#sales_bill_id").val();

      customerdetail['sales_bill_id'] = $("#sales_bill_id").val();
      customerdetail['bill_no'] = $("#bill_no").val();
      customerdetail['kot_no'] = $("#kot_no").val();
      customerdetail['tableno'] = $("#tableno").val();
      customerdetail['covers'] = $("#covers").val(); 
      customerdetail['steward_id'] = $("#steward_id").val();
      customerdetail['customer_id'] = $("#ccustomer_id").val();
      customerdetail['total_qty'] = $('#overallqty').html();
      customerdetail['totalbillamount_before_discount'] = $("#gross_total").html();
      customerdetail['discount_percent'] = $("#overalldiscount_percent").val();
      customerdetail['discount_amount'] = $("#totaldiscount_amount").html();
      customerdetail['discount_comment'] = $("#discount_comment").html();
      customerdetail['total_gst_amount'] = $("#total_tax").html();
      customerdetail['total_bill_amount'] = $("#grand_total").html();
      customerdetail['sales_type'] = $('#sales_type').val();
      

   
      arraydetail.push(customerdetail);

        // console.log(arraydetail);
        // return false;
  
      var data = arraydetail;

      var  url = "kot_create";
      var type = "POST";
      var dataType = "";
      callroute(url,type,dataType,data,function (data)
      {
          $("#print_kot").prop('disabled', true);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {
               if(dta['printurl'] != "")
               {
                 window.open(dta['printurl'],'_blank');               
               }
               toastr.success(dta['Message']);
               localStorage.removeItem('make_bill_record');
               localStorage.removeItem('edit_bill_record');
               window.location = dta['url'];               
              
          }
          else
          {
               $("#print_kot").prop('disabled', false);
               toastr.error(dta['Message']);
               

          }
      })

  }
   else
    {
        $("#print_kot").prop('disabled', false);
        return false;
    }
});

$("#print_bill").click(function (e) {

  $(this).prop('disabled', true);

  if(validate_billing('billingform'))
  {
      $("#print_bill").prop('disabled', true);

      var array = [];

      

      $('#savedkot_detail_record tr').has('td').each(function()
      {
          var arrayItem = {};
          $('td', $(this)).each(function(index, item)
          {
              var inputname = $(item).attr('id');

                if(inputname != undefined && inputname != '')
                {
                    var wihoutidname = inputname.split('_');
                    var nameforarray = wihoutidname[0];

                

                        if(nameforarray == 'productdetail')
                        {
                           
                            arrayItem['product_id'] =$(this).find("#productid_"+wihoutidname[1]).val();
                            arrayItem['product_type'] =$(this).find("#producttype_"+wihoutidname[1]).val();
                            
                        }
                        else if(nameforarray == 'offerpricediv')
                        {
                            
                            arrayItem['sellingprice_before_discount'] =$(this).find("#offerprice_"+wihoutidname[1]).val();
                           
                            
                        }
                        else if(nameforarray == 'qtydiv')
                        {
                            arrayItem['qty'] =$(this).find("#qty_"+wihoutidname[1]).val();
                            // arrayItem['oldqty'] =$(this).find("#oldqty_"+wihoutidname[1]).val();
                            

                        }
                        else if(nameforarray == 'totaldiv')
                        {
                            arrayItem['totalprice'] =$(this).find("#totalprice_"+wihoutidname[1]).val();
                            arrayItem['totalgstprice'] =$(this).find("#totalgstprice_"+wihoutidname[1]).val();

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

   

      var sales_bill_id = $("#sales_bill_id").val();

      customerdetail['sales_bill_id'] = $("#sales_bill_id").val();
      
      customerdetail['discount_percent'] = $("#overalldiscount_percent").val();
      customerdetail['discount_amount'] = $("#totaldiscount_amount").html();
      customerdetail['discount_comment'] = $("#discount_comment").val();
      customerdetail['sales_type'] = $('#sales_type').val();
      

   
      arraydetail.push(customerdetail);

        // console.log(arraydetail);
        // return false;
  
      var data = arraydetail;

      var  url = "kotbill_create";
      var type = "POST";
      var dataType = "";
      callroute(url,type,dataType,data,function (data)
      {
          $("#print_bill").prop('disabled', true);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {
               if(dta['printurl'] != "")
               {
                 window.open(dta['printurl'],'_blank');               
               }

               toastr.success(dta['Message']);
               localStorage.removeItem('make_bill_record');
               localStorage.removeItem('edit_bill_record');
               window.location = dta['url'];   

              
          }
          else
          {
               $("#print_bill").prop('disabled', false);
               toastr.error(dta['Message']);
               

          }
      })

  }
   else
    {
        $("#print_bill").prop('disabled', false);
        return false;
    }
});

$("#finalsettle_bill").click(function (e) {

  $(this).prop('disabled', true);

  var totalunpaid         =  $('#totalunpaid').val();
  var receivable_amount   =  $('#receivable_amount').val();

  if(Number(totalunpaid) != 0)
  {
     toastr.error("Please Receive Full Bill Amount");
     $(this).prop('disabled', false);
     return false;
  }
  else
  {
      $("#finalsettle_bill").prop('disabled', true);

     
     
      var arraydetail = [];


      var customerdetail = {};
      var paymentdetail = {};

      var parr =[];
      $("#paymentmethoddiv").each(function()
      {
          var paymentarr = {};
         $(this).find('.newRow').each(function (index,item)
         {
             var paymentmethod = ($(this).find('input').attr('id'));

            
             if($("#"+paymentmethod).val() != '' && $("#"+paymentmethod).val() != 0)
             {
                var paymentid = $("#"+paymentmethod).data("id");
                // console.log(paymentid);
                 parr.push({
                     id: paymentid,
                     value: $("#"+paymentmethod).val(),
                     wallet_type_id : $("#walletname_"+paymentmethod).val()
                 });
             }
         });

      });

      arraydetail.push(parr);

      var sales_bill_id = $("#sales_bill_id").val();

      customerdetail['sales_bill_id'] = $("#sales_bill_id").val();
      customerdetail['sales_type'] = $('#sales_type').val();
      

   
      arraydetail.push(customerdetail);

        // console.log(arraydetail);
        // return false;
  
      var data = arraydetail;

      var  url = "do_billsettle";
      var type = "POST";
      var dataType = "";
      callroute(url,type,dataType,data,function (data)
      {
          $("#finalsettle_bill").prop('disabled', true);
          var dta = JSON.parse(data);

          if(dta['Success'] == "True")
          {
            
               toastr.success(dta['Message']);
               localStorage.removeItem('make_bill_record');
               localStorage.removeItem('edit_bill_record');
               
               window.location = dta['url'];               
              
          }
          else
          {
               $("#finalsettle_bill").prop('disabled', false);
               toastr.error(dta['Message']);
               

          }
      })

  }
  
});

function validate_billing(frmid)
{
    var error = 0;
    
 
            if($("#overallqty").html() ==0)
            {
                error = 1;
                toastr.error("Enter product Details");
                return false;
            }
            if(($('#sales_type').val() == 2) && ($('#ccustomer_id').val() == ''))
            {
                error = 1;
                toastr.error("Please Enter Customer Details");
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
        
        return true;
    }
}




    
function resetbill()
{
    $("#billingform").trigger('reset');
}

// function testCharacter(event) {
//     if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode === 13 ||event.keyCode === 9) {
//         addroom(this);
//         return true;
//     } else {
//         return false;
//     }

// }

// $("#discount_percent").on("keydown",function search(e) {
//     if(e.keyCode == 13) {
//         alert($(this).val());
//     }
// });
// function overalldiscountpercent(event) {
  
//     if (event.keyCode === 13) {

//               console.log('Enter');
//               var discount_percent        =   $('#discount_percent').val();
//               var rcolumn       = '';

//               var sales_total           =           $('#sales_total').val();
//               var discount_amount       =           (Number(sales_total) * Number(discount_percent)) / 100;
//               $('#discount_amount').val(discount_amount.toFixed(4));

//               $("#sproduct_detail_record").each(function (index,e)
//               {
                 
//                    $(this).find('tr').each(function ()
//                    {
//                       if($(this).attr('id') != undefined)
//                       {
//                           rcolumn = $(this).attr('id').split('product_')[1];
                          
//                        }    
                        

//                         if(($("#productsearch_"+rcolumn).val())!='')
//                         {
                           

//                            $("#overalldiscper_"+rcolumn).val(discount_percent);
//                             var qty                         =     $("#qty_"+rcolumn).val();
                          
//                             var totalsellingwgst             =     $("#totalsellingwgst_"+rcolumn).html();
                            
//                             var gst_percent                  =     $("#prodgstper_"+rcolumn).html();
//                             var proddiscountamt              =     ((Number(totalsellingwgst) * Number(discount_percent)) / 100).toFixed(4);
//                             var totalproddiscountamt         =     Number(proddiscountamt)

//                             var sellingafterdiscount          =     Number(totalsellingwgst) - Number(proddiscountamt);

                             
                              
//                               var gst_amount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(4);
                              
//                               var halfgstamount                =     Number(gst_amount)/2;
//                               var sgstamount                   =     ((Number(sellingafterdiscount) * Number(gst_percent)) / 100).toFixed(2);
//                               var total_amount                 =     Number(sellingafterdiscount) + Number(gst_amount);
                             

//                                $("#overalldiscamt_"+rcolumn).val(totalproddiscountamt.toFixed(4));
//                                $("#tsellingaftergst_"+rcolumn).html(total_amount.toFixed(4));
//                                //$("#prodgstper_"+rcolumn).html(gst_percent);
//                                $("#prodgstamt_"+rcolumn).html(gst_amount);
//                                $("#totalamount_"+rcolumn).html(total_amount.toFixed(4));
//                               //$("#sprodgstper_"+rcolumn).html(Number(gst_percent).toFixed(2));
//                                $("#sprodgstamt_"+rcolumn).html(sgstamount);
//                                $("#stotalamount_"+rcolumn).html(total_amount.toFixed(2));
                             
//                               totalcalculation();
                                    
                        

//                         }
                      


//                    });

                


//               });


//         var sales_total           =           $('#sales_total').val();
        
//         var discount_amount       =           (Number(sales_total) * Number(discount_percent)) / 100;
//         $('#discount_amount').val(discount_amount.toFixed(4));
//        // return true;
//     }
//      else {
//         return false;
//     }

// }

// var input = document.getElementById("discount_percent");
// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//    event.preventDefault();
//    document.getElementById("myBtn").click();
//   }
//});





$('.popover').click( function(e) {

    
    e.stopPropagation(); // when you click the button, it stops the page from seeing it as clicking the body too
    $('.popoverbody').toggle();

});

$('body').click( function() {

    $('.popoverbody').hide();

});

$('input[id="same_address_yesno"]').val(1);
  $('input[name="same_address_yesno"]').click(function(){
      if($(this).prop("checked") == true){
          $("#customer_deleivery_address").hide();
        $(".cus_address #customer_deleivery_address").find('input[type="text"],select,hidden').val('');
          $('input[id="same_address_yesno"]').val(1);

      }
      else if($(this).prop("checked") == false){
          $("#customer_deleivery_address").show();
          $('input[id="same_address_yesno"]').val(0);
      }
});

$('#kotsummarypopup').click(function(e){

    $('#myModalsavedkotpop').modal('hide');
    $('#myModalkotsummarypop').modal('show');
    $('.showeditsection').show();
});
$('.closesavedkotpop').click(function(e){
    
    $('.popup_values').html('');
    $('#myModalsavedkotpop').modal('hide');

});
$('#settle_bill').click(function(e){
    
    $('#myModalsavedkotpop').modal('hide');
    $('#myModalbillsettlepop').modal('show');

});

function opensavedkots()
{

        var sales_bill_id             =    $('#sales_bill_id').val(); 

        var data = {'sales_bill_id':sales_bill_id};

        var url = 'view_groupingkot_popup';
        var type = "POST";
        var dataType =  "";

        callroute(url, type, dataType, data,function (data) 
        {
            
            $('.popup_values').html('');
            $('.popup_values').html(data);
            $("#myModalsavedkotpop").modal('show');
        })
      
       
    
}


///edit Bill Data as per the bill type selected.
$(document).ready(function () {

   

if(localStorage.getItem('make_bill_record'))
{

       var edit_data  = localStorage.getItem('make_bill_record');

       if(edit_data != '' && edit_data != undefined && edit_data != null)
       {
           var show_billdata = JSON.parse(edit_data);

          
           $('#tableno').val(show_billdata['tableno']);
           $('.tableno_Tables').html('('+show_billdata['tablename']+')');
           document.title = 'Table No.: '+show_billdata['tablename']+'';
           $('#myModalfirstpop').modal('show');
           $('.showeditsection').show();
           // localStorage.removeItem('make_bill_record');
           // localStorage.removeItem('edit_bill_record');
       }





 }            

if(localStorage.getItem('edit_bill_record'))
{
       var edit_data  = localStorage.getItem('edit_bill_record');

       if(edit_data != '' && edit_data != undefined && edit_data != null)
       {

          $('.loaderContainer').show();

          $('#sproduct_detail_record').html('');
          

           var show_billdata = JSON.parse(edit_data);
           var edit_billdata = JSON.parse(show_billdata);

           if(edit_billdata['tablemaster'] != null && edit_billdata['tablemaster_id'] != '')
           {
            $('.tableno_Tables').html('('+edit_billdata['tablemaster']['table_name']+')');
            document.title = 'Table No.: '+edit_billdata['tablemaster']['table_name']+'';
           $("#tableno").val(edit_billdata['tablemaster_id']);
           }
           

           $('#sales_type').val(edit_billdata['sales_type']);
           $("#sales_bill_id").val(edit_billdata['sales_bill_id']);
           $('#covers').val(edit_billdata['covers']);
           $("#steward_id").val(edit_billdata['steward_id']);
           $("#ccustomer_id").val(edit_billdata['customer_id']);
           var customer_name = '';
           if(edit_billdata['customer_id'] !='' && edit_billdata['customer_id'] != null)
           {
                $('.viewcustomer').show();
                $("#pcustomer_id").val(edit_billdata['customer_id']);
                if(edit_billdata['customer']['customer_name'] != '' && edit_billdata['customer']['customer_name'] != null)
                {
                  customer_name  = customer_name+''+edit_billdata['customer']['customer_name'];
                  $("#pcustomer_name").val(edit_billdata['customer']['customer_name']);
                }
                if(edit_billdata['customer']['customer_mobile'] != '' && edit_billdata['customer']['customer_mobile'] != null)
                {
                  customer_name  = customer_name+'_'+edit_billdata['customer']['customer_mobile'];
                  $("#pcustomer_mobile").val(edit_billdata['customer']['customer_mobile']);
                }
                if(edit_billdata['customer']['customer_last_name'] != '' && edit_billdata['customer']['customer_last_name'] != null)
                {
                  $("#customer_last_name").val(edit_billdata['customer']['customer_last_name']);
                }
                if(edit_billdata['customer']['customer_email'] != '' && edit_billdata['customer']['customer_email'] != null)
                {
                  $("#customer_email").val(edit_billdata['customer']['customer_email']);
                }

               
                     
                    
                     $("#same_delivery_address").val(edit_billdata['customer']['same_delivery_address']);
                    if(edit_billdata['customer']['same_delivery_address'] == "0"){
                      $('input[id="same_address_yesno"]').prop('checked',false);
                      $("#customer_deleivery_address").show();              
                    }
                  else{
                      $('input[id="same_address_yesno"]').prop('checked',true);
                      $("#customer_deleivery_address").hide();   
                  }
                 
                   
                  if(edit_billdata['customer']['customer_address_detail']!= null && edit_billdata['customer']['customer_address_detail']!= '' && edit_billdata['customer']['customer_address_detail']['customer_gstin']!= null && edit_billdata['customer']['customer_address_detail']['customer_gstin']!= undefined)
                    {
                          $("#pcustomer_gstin").val(edit_billdata['customer']['customer_address_detail']['customer_gstin']);
                    }
                    if(edit_billdata['customer']['customer_address_detail']!= null && edit_billdata['customer']['customer_address_detail']!= '' && edit_billdata['customer']['customer_address_detail']['customer_address']!= null && edit_billdata['customer']['customer_address_detail']['customer_address']!= undefined)
                    {
                      $("#pcustomer_address").val(edit_billdata['customer']['customer_address_detail']['customer_address']);
                    }
                    if(edit_billdata['customer']['customer_address_detail']!= null && edit_billdata['customer']['customer_address_detail']!= '' && edit_billdata['customer']['customer_address_detail']['customer_area']!= null && edit_billdata['customer']['customer_address_detail']['customer_area']!= undefined)
                    {
                      $("#pcustomer_area").val(edit_billdata['customer']['customer_address_detail']['customer_area']);
                    }
                    if(edit_billdata['customer']['customer_address_detail']!= null && edit_billdata['customer']['customer_address_detail']!= '' && edit_billdata['customer']['customer_address_detail']['customer_city']!= null && edit_billdata['customer']['customer_address_detail']['customer_city']!= undefined)
                    {
                      $("#pcustomer_city").val(edit_billdata['customer']['customer_address_detail']['customer_city']);
                    }
                    if(edit_billdata['customer']['customer_address_detail']!= null && edit_billdata['customer']['customer_address_detail']!= '' && edit_billdata['customer']['customer_address_detail']['customer_area']!= null && edit_billdata['customer']['customer_address_detail']['customer_area']!= undefined)
                    {
                      $("#pcustomer_area").val(edit_billdata['customer']['customer_address_detail']['customer_area']);
                    }
                    if(edit_billdata['customer']['customer_address_detail']!= null && edit_billdata['customer']['customer_address_detail']!= '' && edit_billdata['customer']['customer_address_detail']['state_id']!= null && edit_billdata['customer']['customer_address_detail']['state_id']!= undefined)
                    {
                         cus_state  =  edit_billdata['customer']['customer_address_detail']['state_id'];
                    }
                   
                    if(edit_billdata['customer']['customer_gender']!= null && edit_billdata['customer']['customer_gender']!= '' && edit_billdata['customer']['customer_gender']!= undefined)
                    {
                        $("input[name=gender][value="+edit_billdata['customer']['customer_gender']+"]").attr('checked','checked');

                    }


           }
           $('#searchcustomer').val(customer_name);
           $("#bill_no").val(edit_billdata['bill_no']);
           $('#gross_total').html(edit_billdata['totalbillamount_before_discount']);
           $('#showgross_total').html(Number(edit_billdata['totalbillamount_before_discount']).toFixed(2));
           $('#totaldiscount_amount').html(edit_billdata['discount_amount']);
           $('#showtotaldiscount_amount').html(Number(edit_billdata['discount_amount']).toFixed(2));
           $('#total_tax').html(edit_billdata['total_gst_amount']);
           $('#showtotal_tax').html(Number(edit_billdata['total_gst_amount']).toFixed(2));
           $('#grand_total').html(edit_billdata['total_bill_amount']);
           $('#showgrand_total').html(Number(edit_billdata['total_bill_amount']).toFixed(2));
           $('#overallqty').html(edit_billdata['total_qty']);
           $('#receivable_amount').val(Number(edit_billdata['total_bill_amount']));
           $('#totalunpaid').val(Number(edit_billdata['total_bill_amount']));
           if(edit_billdata['discount_comment'] != '' && edit_billdata['discount_comment'] != null)
           {
              $('#discount_comment').val(edit_billdata['discount_comment']);
              $('#hiddendiscount_comment').val(edit_billdata['discount_comment']);
              $('.comment_section').show();
           }
           

           if(edit_billdata['billprint_status'] == 0)
           {
               $('#print_bill').show();
               $('#settle_bill').hide();
           }
           else if(edit_billdata['billprint_status'] == 1)
           {
              if(reprint_bill == 1)
              {
                 $('#print_bill').show();
                 $('#settle_bill').show();
              }
              else if(reprint_bill == 0)
              {
                $('#print_bill').hide();
                $('#settle_bill').show();
              }
           }

          


            
            var kotqtytotal = 0;
            var kotratetotal = 0;
            var kotdisctotal = 0;
            var kotpricetotal = 0;
            var kotgsttotal = 0;
            var kotgrandtotal = 0;
            var kot_html = '';
            var groupkotcount = 1;

            
            var product_html = ''; 
            var groupkotcount = 1;

         if(edit_billdata['sales_kot']!='' && edit_billdata['sales_kot'] != null)
         { 

            var feature_show_val = '';
           
            $.each(edit_billdata['sales_kot'],function (kkey,kvalue)
             {    

                   var kotcount = 1;      
                   kot_html       += '<tr><td colspan="10" class="font16 bold" style="background:#B7B6B5 !important;">Kot No. : '+kvalue['bill_no']+'</td></tr>';

                   if(kvalue['sales_kot_detail'] != null && kvalue['sales_kot_detail'] != '')
                   {

                       $.each(kvalue['sales_kot_detail'],function (billkey,billvalue)
                       {
                        

                             var product_id                  =   billvalue['sales_kot_detail_id'];    

                             var showtotal_amount            =   Number(billvalue['total_amount']).toFixed(2);  
                             
                             var deletekot_html  =  '';
                             var transferkot_html  =  '';
                             if(edit_billdata['billprint_status'] == 0)
                             {
                                deletekot_html   =  '&nbsp;&nbsp;&nbsp;<span class="removeIcon" onclick="return removethiskot('+product_id+')";>-</span>';
                                transferkot_html   =  '&nbsp;&nbsp;&nbsp;<span onclick="return transferthiskot('+product_id+')";><i class="fa fa-exchange"></i></span>';
                             }
                             else
                             {
                               if(delete_kot == 1)
                               {
                                deletekot_html   =  '&nbsp;&nbsp;&nbsp;<span class="removeIcon" onclick="return removethiskot('+product_id+')";>-</span>';
                               }
                               if(transfer_kot == 1)
                               {
                                  transferkot_html   =  '&nbsp;&nbsp;&nbsp;<span onclick="return transferthiskot('+product_id+')";><i class="fa fa-exchange"></i></span>';
                               }
                             }
                             
                             


                              kot_html += '<tr id="kotproductrow_' + product_id + '">'+
                                '<td class="centerAlign bold padding5">'+kotcount+'&nbsp;'+deletekot_html+' '+transferkot_html+'</td>'+
                                '<td class="leftAlign bold">'+billvalue['product']['product_name']+'</td>'+
                                '<td class="rightAlign bold">'+billvalue['qty']+'</td>'+
                                '<td class="rightAlign bold">'+billvalue['sellingprice_before_discount']+'</td>'+
                                '<td class="rightAlign bold">'+billvalue['overalldiscount_percent']+'</td>'+
                                '<td class="rightAlign bold">'+billvalue['overalldiscount_amount']+'</td>'+
                                '<td class="rightAlign bold noMargin">'+billvalue['sellingprice_afteroverall_discount']+'</td>'+
                                '<td class="rightAlign bold noMargin">'+billvalue['gst_percent']+'</td>'+
                                '<td class="rightAlign bold noMargin">'+billvalue['gst_amount']+'</td>'+
                                '<td class="rightAlign bold">'+showtotal_amount+'</td>'+
                              '</tr>';
                                                          
                              kotcount++;

                              

                      });
                      
                  }



        });

       // console.log(edit_billdata['groupsales_kot_detail']);

           $.each(edit_billdata['groupsales_kot_detail'],function (ebillkey,ebillvalue)
            {
              
                   var showtotal_amount            =   Number(ebillvalue['total_amount']).toFixed(2); 
                    

                     product_html += '<tr>'+
                      '<td class="centerAlign" style="padding:8px !important;">'+groupkotcount+'</td>'+
                      '<td class="leftAlign">'+ebillvalue['product']['product_name']+'</td>'+
                      '<td class="rightAlign">'+
                        '<input type="text" class="form-control width100 font12 bold rightAlign noMargin totqty" name="qty[]" value="'+ebillvalue['totalqty']+'" readonly>'+
                      '</td>'+
                      '<td class="rightAlign">'+ebillvalue['sellingprice_before_discount']+'</td>'+
                      '<td class="rightAlign bold font14">'+ebillvalue['totalprice']+'</td>'+
                    '</tr>';

                    groupkotcount++;
                    

            });
            
          $(".odd").hide();
          $('#viewkot_detail_record').append(kot_html);
          $("#temporary_record").append(product_html);  

     }
           //end of fillup product detail row
           //totalcalculation();
           $('.loaderContainer').hide();

      
    }
  }

 
});


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
$(document).on('click', '#cust_child_plus', function()
{
    $("#cust_child_plus").prop('disabled',true);
    var id = $(this).attr('data-id');
    id++;
    $(this).attr('data-id',id);

    var html_bank = '';

    html_bank += '<div class="hk-row child_data" id="child_'+id+'">'+
                                        '<div class="col-md-5">'+
                                                '<label class="form-label">Children Name</label>'+
                                                '<input type="text" maxlength="50" autocomplete="off" name="child_name" id="child_name" value="" class="form-control form-inputtext" placeholder="" autofocus="">'+
                                        '</div>'+
                                        '<div class="col-md-5">'+
                                                '<label class="form-label">Children Birth Date</label>'+
                                                '<input type="text" maxlength="15" name="child_date_of_birth" id="child_date_of_birth" value="" class="form-control form-inputtext child_date_of_birth'+id+'" placeholder="" autocomplete="off">'+
                                        '</div>'+
                                         '<input type="hidden" name="customer_child_id" id="customer_child_id" class="customer_child_id" autocomplete="off" value="">'+
                                        '<div class="col-md-2"><label></label><a id="remove_child_'+id+'" onclick="remove_child_row('+id+');" data-id='+id+'>' +
                                          '<i class="fa fa-remove"></i> </a></div> ' +
                                        '</div>'
                                    '</div>';

       $("#repeat_child").append(html_bank);
    $("#cust_child_plus").prop('disabled',false);
    $(".child_date_of_birth" + id).datepicker({
          format: 'dd-mm-yyyy',
          orientation: "bottom"
          });

    if (id > 1) {
        $(".child_date_of_birth"+id).datepicker({
          format: 'dd-mm-yyyy',
          orientation: "bottom"
          });
    }
  
});


function remove_child_row(removeid)
{
    $("#child_"+removeid).remove();
}
