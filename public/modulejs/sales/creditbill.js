var sel ='';
var balance=0;

 $(document).ready(function(){
     var ln = $("#view_bill_record tr").length;
     if(ln == 1)
     {
         $(".chkbox12").trigger('click');
     }
 });
$('#checkallrows').change(function()
{
    var overall = 0;
    var overdetail = '';
    if($(this).is(":checked"))
    {
       
        $(".view_credit_record tr").each(function()
        {
            var id = $(this).attr('id').split('creditvalue_')[1];

                $("#check_"+id).prop('checked',true);
                 overall += parseFloat($(".overallbal_"+id).val());
                 
          
            sel = $('input[class=chkbox12]:checked').map(function (_, el) {
                return $(el).val();

            }).get();

        })
         $('.mCamera').val(sel);
         $('#grandoverall').html(Number(overall).toFixed(2));
         $('#total_amount').val(Number(overall).toFixed(2));
         $('#hiddentotal_amount').val(Number(overall).toFixed(2));
        // $('#cash').val(overall.toFixed(2));
         $('#outstanding_amount').val(Number(overall).toFixed(2));
    }
    else
    {

        var grandoverall     =   $('#grandoverall').html();
        $(".view_credit_record tr").each(function()
        {
            var id = $(this).attr('id').split('creditvalue_')[1];
           
                $("#check_"+id).prop('checked',false);
                if($("#check_"+id).prop('checked',false))
                {
                    overall += 0;
                }
                else
                {
                  overall += parseFloat($(".overallbal_"+id).val());
                }
           
             sel = $('input[class=chkbox12]:checked').map(function (_, el) {
                return $(el).val();

            }).get();
        })
         $('.mCamera').val(sel);
         $('#grandoverall').html((Number(overall)).toFixed(2));
         $('#total_amount').val((Number(overall)).toFixed(2));
         $('#hiddentotal_amount').val((Number(overall)).toFixed(2));
        // $('#cash').val(overall.toFixed(2));
         $('#outstanding_amount').val((Number(overall)).toFixed(2));
    }
});
$('.chkbox12').click(function(e) {
    if($(this).is(':checked')) {

        var overall = 0;
        var overdetail = '';
        sel = $('input[class=chkbox12]:checked').map(function (_, el) {
            return $(el).val();

        }).get();

        $('.mCamera').val(sel);
        var arr = $('.mCamera').val().split(',');

        $.each(arr, function (i) {
            overall += parseFloat($('.overallbal_' + arr[i] + '').val());

        });

        $('#grandoverall').html(Number(overall).toFixed(2));
        $('#total_amount').val(Number(overall).toFixed(2));
        $('#hiddentotal_amount').val(Number(overall).toFixed(2));
        // $('#cash').val(overall.toFixed(2));
        $('#outstanding_amount').val(Number(overall).toFixed(2));
    }
    else {
        var overall = 0;
        var overdetail = '';
        sel = $('input[class=chkbox12]:checked').map(function (_, el) {
           return $(el).val();

        }).get();
       
        $('.mCamera').val(sel);
        var arr = $('.mCamera').val().split(',');
        

        $.each(arr, function (i) {
            overall += parseFloat($('.overallbal_' + arr[i] + '').val());

        });
        if(Number(overall)>0)
        {
            overall = overall
        }
        else
        {
          overall  = 0;
        }
        
        $('#grandoverall').html(Number(overall).toFixed(2));
        $('#total_amount').val(Number(overall).toFixed(2));
        $('#hiddentotal_amount').val(Number(overall).toFixed(2));
        // $('#cash').val(overall.toFixed(2));
        $('#outstanding_amount').val(Number(overall).toFixed(2));
        
    }


});
$('#total_amount').keyup(function(e){

    var total_amount  = $('#total_amount').val();
    var grandoverall  = $('#grandoverall').html();

    if(Number(total_amount)>Number(grandoverall))
    {
       toastr.error("Amount cannot be greater than the selected invoices");
       $('#total_amount').val(grandoverall);
       return false;
    }

});

function resetcreditnotefilterdata(){
    $("#fromtodate").val('');
    $("#searchcustomerdata").val('');
    $("#cbillno").val('');
    var data = {};
    var page = 1;
    var sort_type = $("#hidden_sort_type").val();
    var sort_by = $("#hidden_column_name").val();
    fetch_data('datewise_cuscreditnotedetail',page,sort_type,sort_by,data,'view_creditnote_record');
}
function resetcreditbalfilterdata(){
    $("#fromtodate").val('');
    $("#searchcustomerdata").val('');
    $("#cbillno").val('');
    var data = {};
    var page = 1;
    var sort_type = $("#hidden_sort_type").val();
    var sort_by = $("#hidden_column_name").val();
    fetch_data('datewise_cuscreditdetail',page,sort_type,sort_by,data,'view_creditreceipt_record');
}
$('#makepayment').click(function(e) {
    var grandoverall        =       $('#grandoverall').html();

    if(Number(grandoverall)==0)
    {
        toastr.error("Select Invoices for payment");
    }
    else
    {
            $("#addcuspaymentpopup").modal('show');

    }
});

$("#invoice_date").datepicker({
    format: 'dd-mm-yyyy',
    orientation: "bottom"

});

$('#cheque').keyup(function(e){
    
    if(($('#cheque').val())>0)
    {
        if(($('#remarks').val())=='')
        {       
           toastr.error("First enter Cheque no and Bank details")
           $('#cheque').val('');
           $('#remarks').focus();
           return false;
        } 
        else
        {
            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var credit_note                 =     $('#credit_note').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var grand_total                 =     $('#hiddentotal_amount').val();
            var cash_balance                =      0;
            var totalpaidamt                =      0;

        
              cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(cash)-Number(credit_note);
             
              if(Number(cash_balance)<0)
              {
                toastr.error("Amount cannot be greater than Total Sales_amount "+grand_total);
                
                $('#cheque').val(0);
                cash_balance    =     Number(grand_total)-Number(net_banking)-Number(wallet)-Number(card)-Number(cash)-Number(credit_note);               
                $('#outstanding_amount').val(cash_balance.toFixed(0));
                totalpaidamount();
              }
              else
              {
               
                 $('#outstanding_amount').val(cash_balance);
                 totalpaidamount();
              }
        }
    }
    
});
$('#net_banking').keyup(function(e){
    
    if(($('#net_banking').val())>0)
    {
        if(($('#remarks').val())=='')
        {       
            toastr.error("First enter Bank details");
            $('#remarks').focus();
            $('#net_banking').val('');
            
           return false;
        } 
        else
        {
            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var credit_note                 =     $('#credit_note').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var grand_total                 =     $('#hiddentotal_amount').val();
            var cash_balance    =      0;
            var totalpaidamt                =      0;
            
        
              cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(cash)-Number(credit_note);
             
              if(Number(cash_balance)<0)
              {

                toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
                
                $('#net_banking').val(0);
                cash_balance    =     Number(grand_total)-Number(cheque)-Number(wallet)-Number(card)-Number(cash)-Number(credit_note);               
                $('#outstanding_amount').val(cash_balance);
                totalpaidamount();
              }
              else
              {
                
                 $('#outstanding_amount').val(cash_balance);
                  totalpaidamount();
              }
        }
      
    }

});
$('#card').keyup(function(e){

            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var credit_note                 =     $('#credit_note').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var grand_total                 =     $('#hiddentotal_amount').val();
            var cash_balance    =      0;

          cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(cash)-Number(credit_note);

          

          if(Number(cash_balance)<0)
          {
            toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
           
            $('#card').val(0);
             cash_balance    =     Number(grand_total)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(cash)-Number(credit_note);
             $('#outstanding_amount').val(cash_balance);
             totalpaidamount();
            
          }
          else
          {
            
             $('#outstanding_amount').val(cash_balance);
             totalpaidamount();
          }
      

     

});
$('#wallet').keyup(function(e){

            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var credit_note                 =     $('#credit_note').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var grand_total                 =     $('#hiddentotal_amount').val();
            var cash_balance    =      0;

    
          cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(cash)-Number(credit_note);
          
          

          if(Number(cash_balance)<0)
          {
            toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
           
            $('#wallet').val(0);
            cash_balance    =     Number(grand_total)-Number(cheque)-Number(net_banking)-Number(card)-Number(cash)-Number(credit_note);
            $('#outstanding_amount').val(cash_balance);
            totalpaidamount();
          }
          else
          {
            
             $('#outstanding_amount').val(cash_balance);
             totalpaidamount();
          }
      

     

});

$('#cash').keyup(function(e){

            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var credit_note    =     $('#credit_note').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var grand_total                 =     $('#hiddentotal_amount').val();
            var cash_balance    =      0;

    
          cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(cash)-Number(credit_note);

         

          if(Number(cash_balance)<0)
          {
            toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
            
            $('#cash').val(0);
            cash_balance    =     Number(grand_total)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(card)-Number(cash)-Number(credit_note);
            $('#outstanding_amount').val(cash_balance);
            totalpaidamount();
          }
          else
          {
            //console.log(grand_total);
            //console.log(cash_balance);
             $('#outstanding_amount').val(cash_balance);
             totalpaidamount();
          }
      

     

});
function fetchpaymentamount(obj)
{
    var id                        =     $(obj).attr('id');
    var payment_method            =     $(obj).attr('id').split('payment_')[1];
    var grand_total               =     $('#hiddentotal_amount').val();


    if(payment_method == 'cash')
    {
        $('#card').val('');
        $('#cash').val(Number(grand_total));
        $('#cheque').val('');
        $('#wallet').val('');
        $('#net_banking').val('');        
        $('#remarks').val('');
        $('#autoselectpayment').val(1);
        $('#outstanding_amount').val(0);
        $('#creditnote_amount').val(''); 
        $('#issue_amount').val('');  
        $('#creditnoteno').val(''); 
        $('#creditnote_id').val('');        
        $('#credit_note').val('');


    }
    else if(payment_method == 'card')
    {
        $('#card').val(Number(grand_total));
        $('#cash').val('');
        $('#cheque').val('');
        $('#wallet').val('');
        $('#net_banking').val('');        
        $('#remarks').val('');
        $('#autoselectpayment').val(1);
        $('#outstanding_amount').val(0);
        $('#creditnote_amount').val(''); 
        $('#issue_amount').val('');  
        $('#creditnoteno').val(''); 
        $('#creditnote_id').val('');        
        $('#credit_note').val('');


    }
    else if(payment_method == 'cheque')
    {
        if(($('#remarks').val())=='')
        {       
           toastr.error("First enter Cheque no and Bank details")
           $('#remarks').val('');
           $('#autoselectpayment').val(1);
           return false;
        } 
        else
        {
           $('#card').val('');
           $('#cash').val('');
           $('#cheque').val(Number(grand_total));
           $('#wallet').val('');
           $('#net_banking').val('');        
           //$('#remarks').val('');
           $('#autoselectpayment').val(1);
           $('#outstanding_amount').val(0);
           $('#creditnote_amount').val(''); 
          $('#issue_amount').val('');  
          $('#creditnoteno').val(''); 
          $('#creditnote_id').val('');        
          $('#credit_note').val('');


        }
        

    }
    else if(payment_method == 'wallet')
    {
        $('#card').val('');
        $('#cash').val('');
        $('#cheque').val('');
        $('#wallet').val(Number(grand_total));
        $('#net_banking').val('');        
        $('#remarks').val('');
        $('#autoselectpayment').val(1);
        $('#outstanding_amount').val(0);
        $('#creditnote_amount').val(''); 
        $('#issue_amount').val('');  
        $('#creditnoteno').val(''); 
        $('#creditnote_id').val('');        
        $('#credit_note').val('');


    }
    
    else if(payment_method == 'net_banking')
    {
        $('#card').val('');
        $('#cash').val('');
        $('#cheque').val('');
        $('#wallet').val('');
        $('#net_banking').val(Number(grand_total));        
        $('#remarks').val('');
        $('#autoselectpayment').val(1);
        $('#outstanding_amount').val(0);
        $('#creditnote_amount').val(''); 
        $('#issue_amount').val('');  
        $('#creditnoteno').val(''); 
        $('#creditnote_id').val('');        
        $('#credit_note').val('');

    }
    else if(payment_method == 'credit_note')
    {
            var creditnoteno   =  $('#creditnoteno').val();

 
            if(creditnoteno!='')
            {
              $("#addcreditpopup").modal('show'); 
              toastr.error("Kindly empty Credit Note No field! If you do not want to use Credit Note on this bill !");
              $('#creditnoteclose').click(function(e){
                  if(creditnoteno!='')
                  {
                      $('#savecredit').trigger('click');
                  }
              });
             
              return false;
            }
            else
            {
                    if(creditnoteno != '')
                    { 

                        var cash                        =     $('#cash').val();
                        var card                        =     $('#card').val();
                        var cheque                      =     $('#cheque').val();
                        var net_banking                 =     $('#net_banking').val();
                        var wallet                      =     $('#wallet').val();
                        var outstanding_amount          =     $('#outstanding_amount').val();
                        var credit_note                 =     $('#credit_note').val();
                        var grand_total                 =     $('#hiddentotal_amount').val();
                        var cash_balance    =      0;

                
                       cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(credit_note);
                       cash_balance     =    Number(cash_balance).toFixed(decimal_points);

                       $('#outstanding_amount').val(Number(cash_balance).toFixed(decimal_points));
                  

                    } 
                    
           
            }
     
    
            if(($('#credit_note').val())>0)
            {
             
                  $('#credit_note').val('');
                  $('.netbankingdetails').hide();
                  $('.chequedetails').hide();
                  $('.outstandingdetails').hide();
                  $("#addcreditpopup").modal('show'); 

               
            }
            else
            {
                  $('#creditnote_amount').val(''); 
                  $('#issue_amount').val('');  
                  $('#creditnoteno').val(''); 
                  $('#creditnote_id').val('');
                  totalpaidamount();
            }

                

              $('#credit_note').val('');
              $('.netbankingdetails').hide();
              $('.chequedetails').hide();
              $('.outstandingdetails').hide();
              $("#addcreditpopup").modal('show'); 
              $('#autoselectpayment').val(1);
              $('.alertStatus').val('0'); 



    }

}
$("#cash, #card, #cheque, #wallet, #net_banking").keyup(function(e){

  $('#autoselectpayment').val(0);

});
function totalpaidamount()
{
            var totalpaidamt                =     0;
            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var credit_note                 =     $('#credit_note').val();
            var grand_total                 =     $('#hiddentotal_amount').val();

            totalpaidamt    =     Number(cash) + Number(card)+Number(cheque)+Number(net_banking)+Number(wallet) + Number(credit_note);
            cash_balance    =     Number(grand_total)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(card)-Number(cash)- Number(credit_note);

            $('#total_amount').val(Number(totalpaidamt));
            $('#outstanding_amount').val(Number(cash_balance));
            console.log('aaaa'+cash_balance);
}
$('#total_amount').keyup(function(e){

       
            var grand_total                 =     $('#total_amount').val();
            $('#card').val('');
            $('#cheque').val('');
            $('#net_banking').val('');
            $('#wallet').val('');
            $('#cash').val('');
            $('#credit_note').val('');
           
            $('#outstanding_amount').val(grand_total);
           

});
$("#addpayment").click(function (e) {

         var card           =     $('#card').val();
         var cheque         =     $('#cheque').val();
         var net_banking    =     $('#net_banking').val();
         var wallet         =     $('#wallet').val();
         var cash           =     $('#cash').val();
         var credit_note    =     $('#credit_note').val();

         var total_amount   =     $('#total_amount').val();
         var payment_method_amount   =   Number(cash)  + Number(card)  + Number(cheque)  + Number(net_banking)  + Number(wallet) + Number(credit_note);
         if(Number(total_amount)!= Number(payment_method_amount))
         {
                toastr.error("Please Receive amount in Cash , Card or any relevant payment method.");
                return false;
         }
         else
         {
           
                $('#addpayment').prop('disabled', true);
              
                 event.preventDefault();

                  var array = [];
               $('#view_bill_record tr').has('td').each(function()
                  {
                      var arrayItem = {};
                      $('td', $(this)).each(function(index, item)
                      {
                          var inputname = $(item).attr('id');

                            if(inputname != undefined && inputname != '')
                            {
                                var wihoutidname = inputname.split('_');
                                var nameforarray = wihoutidname[0];

                                
                                  if(nameforarray == 'creditaccountid')
                                  {
                                          var creditid   =  $('input[id="check_'+wihoutidname[1]+'"]:checked').val();
                                          if(creditid != undefined)
                                          {
                                          arrayItem['customer_creditaccount_id'] =$(this).find('input[id="check_'+wihoutidname[1]+'"]:checked').val();
                                          arrayItem['credit_amount'] =$(this).find("#balanceamount_"+wihoutidname[1]).val();
                                          arrayItem['customer_creditreceipt_detail_id'] =$(this).find("#customercreditreceiptdetailid_"+wihoutidname[1]).val();
                                          array.push(arrayItem);
                                          arrayItem['customer_id'] =$(this).find("#customerid_"+wihoutidname[1]).val();
                                          arrayItem['reference_id'] =$(this).find("#referenceid_"+wihoutidname[1]).val();
                                          }
                                          

                                      
                                  }
                                  

                            }

                      });
                  
                      
                  });
                  


                  var arraydetail = [];
                  arraydetail.push(array);

                 

                  var customerdetail = {};
                  var paymentdetail = {};

                  customerdetail['mCamera'] = $("#mCamera").val();
                  customerdetail['amounttocheck'] = $("#grandoverall").html();
                  customerdetail['invoice_no'] = $("#receipt_no").val();
                  customerdetail['invoice_date'] = $("#invoice_date").val();
                  customerdetail['total_amount'] = $("#total_amount").val();
                  customerdetail['remarks'] = $("#remarks").val();
                  customerdetail['cus_id']  = $("#customer_id").val();
                  customerdetail['ref_id']  = $("#reference_id").val();
                  customerdetail['credittype']  = $("#credittype").val();
                  customerdetail['customer_creditreceipt_id'] = $("#customer_creditreceipt_id").val();
                  customerdetail['creditnoteid'] = $("#creditnote_id").val();
                  customerdetail['creditnoteamount'] = $("#creditnote_amount").val();
                  customerdetail['issueamount'] = $("#issue_amount").val();
                  customerdetail['editcreditnoteid'] = $("#editcreditnoteid").val();

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
                     $(this).find('.newRow').each(function (index,item)
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

                 console.log(arraydetail);
                 //return false;

                  var data = arraydetail;

                  var  url = "save_customer_creditdetails";
                  var type = "POST";
                  var dataType = "";
                  callroute(url,type,dataType,data,function (data)
                  {

                      $("#addpayment").prop('disabled', true);
                      var dta = JSON.parse(data);

                      if(dta['Success'] == "True")
                      {
                        
                           toastr.success(dta['Message']);
                           window.location.href = dta['url'];
                           
                        
                          //$("#sproduct_detail_record").empty('');

                      }
                      else
                      {
                        $("#addpayment").prop('disabled', true);
                           toastr.error(dta['Message']);
                      }
                  })
                   event.preventDefault();

                 }

  
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

$("#cbillno").typeahead({

    source: function(request, process) {
       
        var  url = "cbillno_search";
        var type = "post";
        var dataType = "json";
        var data = {
            search_val: $("#cbillno").val(),
            term: request.term
        };
        callroute(url,type,dataType,data,function (data)
        {
            $("#cbillno").val()
                    process(data);

              
        });
    },
    
    minLength: 1,
    autoselect:false,
 
     
});

function deletereceipt(obj)
{
    // if(confirm("Are You Sure want to delete this Credit Receipt?")) {

         var id                        =     $(obj).attr('id');
         var billid                    =     $(obj).attr('id').split('deletereceipt_')[1];
        

        if(billid.length > 0)
        {

          var errmsg = "Are You Sure want to delete this Credit Receipt?";
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
        var url = "receipt_delete";
        var type = "POST";
            var dataType = "";
        callroute(url, type,dataType, data, function (data) {

            var dta = JSON.parse(data);

            if (dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
                $("#viewbillform").trigger('reset');
                resettable('viewreceipt_data','view_creditreceipt_record');

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
function nodeletereceipt(obj)
{
    
    toastr.error("This receipt is automatically generated through return bill so Cannot be deleted");
    return false;

        
}

$("body").on("click", "#uploadcreditnotes", function ()
{
    $("#uploadsales").attr('disabled',true);
   

    $(".loaderContainer").show();

    //Reference the FileUpload element.
    var fileUpload = $("#creditnotefileUpload")[0];

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
                    
                       ProcessExcel(e.target.result);

                    
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
                   
                       ProcessExcel(data);
                    
                    
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            $("#uploadcreditnotes").attr('disabled',false);
            $(".loaderContainer").hide();
            alert("This browser does not support HTML5.");
        }
    } else {
        $("#uploadcreditnotes").attr('disabled',false);
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
        if(validate_cvalue['Bill No'] == '')
        {
            error = 1;
            toastr.error("Bill No field cannot be Empty");

        }
        if(validate_cvalue['Date'] == '')
        {
            error = 1;
            toastr.error("Date field Cannot be Empty");

        }
        if(validate_cvalue['Month'] != '' && !$.isNumeric(validate_cvalue['Month']))
        {
            error = 1;
            toastr.error("Please Use Month value in Numeric form");

        }
        if(validate_cvalue['Year'] != '' && count_digits(validate_cvalue['Year']) !=4)
        {
            error = 1;
            toastr.error("Enter full Year value for Ex:2020");

        }
        if(validate_cvalue['Customer Name'] == '')
        {
            error = 1;
            toastr.error("Customer Name field cannot be Empty");

        }
        if(validate_cvalue['Customer Mobile'] == '')
        {
            error = 1;
            toastr.error("Customer Mobile field cannot be Empty");

        }
        if(validate_cvalue['Credit Note No'] == '')
        {
            error = 1;
            toastr.error("Credit Note No field cannot be Empty");

        }
        if(validate_cvalue['Balance Amount'] == '')
        {
            error = 1;
            toastr.error("Balance Amount field cannot be Empty");

        }
        if(error == 1)
        {
            $("#uploadcreditnotes").attr('disabled',false);
            return false;
        }



    });

    if(error == 0)
    {
        checkcreditnotes(final_salesarr);
    }
    else
    {
        $(".loaderContainer").hide();
    }
}

function checkcreditnotes(salesarr)
{
    var  url = "creditnote_check";
    var type = "POST";
    var dataType = "";

    callroute(url,type,dataType,salesarr,function (data)
    {
        var responce = JSON.parse(data);
        if(responce['Success'] == "True")
        {
            $(".loaderContainer").hide();
            toastr.success(responce[['Message']]);
            $("#uploadcreditnotes").attr('disabled',false);
            $("#creditnotefileUpload").val('');
            // resettable('bill_fetch_data','viewbillrecord');
            
             var page = $('#hidden_page').val();
             $('#hidden_page').val(page);
              var column_name = $('#hidden_column_name').val();
              var sort_type = $('#hidden_sort_type').val();

              var query = {};

              var fetch_data_url = $('#fetch_data_url').val();
              var tbodyid = $('html').find('.table-responsive').attr('id');
              fetch_data(fetch_data_url,page, sort_type, column_name, query,tbodyid);
         

           

        }
        else
        {
            toastr.error(responce[['Message']]).delay(30000).fadeOut(5000);;
            $(".loaderContainer").hide();
            $("#uploadcreditnotes").attr('disabled',false);

            
            
        }
    })
}
$("#creditnoteno").typeahead({

    source: function(request, process) {
       $.ajax({
           url: "creditnote_numbersearch",
           dataType: "json",
           data: {
                search_val: $("#creditnoteno").val(),
                term: request.term
            },
           success: function (data) {$("#creditnoteno").val()
                    process(data);

                
           }
     });
    },
    
    minLength: 1,
    autoselect:false,

    afterSelect: function (item) {
        var value = item;
        
         getcreditnote_detail(item);   
    }
 
     
});
$('#creditnoteclose').click(function(e){
      if(creditnoteno!='')
      {
          $('#savecredit').trigger('click');
      }
});
$('#credit_note').on("input", function() {

  // var editcreditnotepaymentid   =  $('#editcreditnotepaymentid').val();
  var creditnoteno   =  $('#creditnoteno').val();

  // if(Number(editcreditnotepaymentid)!='')
  //   {
            if(creditnoteno!='')
            {
              $("#addcreditpopup").modal('show'); 
              toastr.error("Kindly empty Credit Note No field! If you do not want to use Credit Note on this bill !");
              $('#creditnoteclose').click(function(e){
                  if(creditnoteno!='')
                  {
                      $('#savecredit').trigger('click');
                  }
              });
             
              return false;
            }
            else
            {
                    if(creditnoteno != '')
                    { 

                        var cash                        =     $('#cash').val();
                        var card                        =     $('#card').val();
                        var cheque                      =     $('#cheque').val();
                        var net_banking                 =     $('#net_banking').val();
                        var wallet                      =     $('#wallet').val();
                        var outstanding_amount          =     $('#outstanding_amount').val();
                        var credit_note                 =     $('#credit_note').val();
                        var grand_total                 =     $('#hiddentotal_amount').val();
                        var cash_balance    =      0;

                
                       cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(credit_note);
                       cash_balance     =    Number(cash_balance).toFixed(decimal_points);

                       $('#outstanding_amount').val(Number(cash_balance).toFixed(decimal_points));
                  

                    } 
                    
           
            }
      // }
    
    if(($('#credit_note').val())>0)
    {
     
          $('#credit_note').val('');
          $('.netbankingdetails').hide();
          $('.chequedetails').hide();
          $('.outstandingdetails').hide();
          $("#addcreditpopup").modal('show'); 

       
    }
    else
    {
          $('#creditnote_amount').val(''); 
          $('#issue_amount').val('');  
          $('#creditnoteno').val(''); 
          $('#creditnote_id').val('');
          totalpaidamount();
    }

});
function getcreditnote_detail(creditnote_no)
{

     var creditnoteno   =   $('#creditnoteno').val();
     var customer_id    =   $('#customer_id').val();
     var type = "POST";
     var dataType = "";
     var url = 'creditnote_details';
     var data = {
         "creditnoteno" : creditnoteno,
     }
   callroute(url,type,dataType,data,function(data)
   {

        var creditnote_data = JSON.parse(data,true);


        if(creditnote_data['Success'] == "True")
        {
            
            var product_html = '';
            var creditnote_details  = creditnote_data['Data'][0];

            console.log(creditnote_details);

           if(creditnote_data['Data']=='')
           {
                 toastr.error("You entered wrong Credit Note Details");
                 $('#creditnoteno').val('');
                 $('#creditnote_amount').val('');
                 $('#creditnote_id').val('');
                 $('#issue_amount').val('');
                 totalpaidamount();
                 return false;
           }
           else
           {
                  var cashamount          =   $('#outstanding_amount').val();
                  var issue_amount       =   creditnote_details['balance_amount'];

                  $('#creditnote_amount').val(creditnote_details['balance_amount']);
                  $('#creditnote_id').val(creditnote_details['customer_creditnote_id']);

                if(Number(issue_amount) >  Number(cashamount))
                {
                   //toastr.error("Entered Amount is Greater than Bill Amount.");
                   $('#issue_amount').val(cashamount);

                }
                else
                {
                   $('#issue_amount').val(creditnote_details['balance_amount']);
                }
           }

            

            
        }
    });

}
$('#issue_amount').keyup(function(e){

      var cashamount        =   $('#outstanding_amount').val();
      var credit_amount     =   $('#creditnote_amount').val(); 
      var issue_amount      =   $('#issue_amount').val();  

      if(($('#creditnote_no').val())!='')
      {
          if(Number(issue_amount) >  Number(cash))
          {
             var issueamt  =  0;
             if(Number(credit_amount) > Number(issue_amount))
             {
                issueamt     =   cashamount;
             }
             else
             {
               issueamt     =   issue_amount;
             }
             $('#issue_amount').val(issueamt);  
             toastr.error("Entered Amount is Greater than Bill Amount.");
             return false;

          }
          else if(Number(issue_amount) >  Number(credit_amount))
          {
             var issueamt  =  0;

             if(Number(credit_amount) > Number(cashamount))
             {
                issueamt     =   cashamount;
             }
             else
             {
               issueamt     =   credit_amount;
             }
             
             $('#issue_amount').val(issueamt);  
             toastr.error("Entered Amount is Greater than Credit Note Amount.");
             return false;

          }
          else
          {
              $('#issue_amount').val(issue_amount);
          }
      } 
      else
      {
          toastr.error("Please Enter Credit Note No.");
      }

});
$('#savecredit').click(function(e){

            var issue_amount      =   $('#issue_amount').val();

            var cash                        =     $('#cash').val();
            var card                        =     $('#card').val();
            var cheque                      =     $('#cheque').val();
            var net_banking                 =     $('#net_banking').val();
            var wallet                      =     $('#wallet').val();
            var outstanding_amount          =     $('#outstanding_amount').val();
            var grand_total                 =     $('#hiddentotal_amount').val();
            var cash_balance    =      0;

    
          cash_balance    =     Number(grand_total)-Number(card)-Number(cheque)-Number(net_banking)-Number(wallet)-Number(issue_amount);
          cash_balance     =    Number(cash_balance).toFixed(decimal_points);

          if(Number(cash_balance)<0)
          {
            toastr.error("Amout cannot be greater than Total Sales_amount "+grand_total);
           
            cash_balance    =     Number(grand_total)-Number(cheque)-Number(net_banking)-Number(card)-Number(wallet)-Number(cash);
               $('#outstanding_amount').val(cash_balance);
               
              $('#creditnote_amount').val(''); 
              $('#issue_amount').val('');  
              $('#creditnoteno').val(''); 
              $('#creditnote_id').val('');
              totalpaidamount();

          }
          else
          {
              $('#outstanding_amount').val(cash_balance);
               
              $('#credit_note').val(issue_amount);
              totalpaidamount();
          }

     
     $("#addcreditpopup").modal('hide'); 


});



