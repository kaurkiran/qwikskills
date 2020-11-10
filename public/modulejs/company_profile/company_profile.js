// for store profile
var count = 1;
$("#addmoreimg").click(function()
{
//
    $(this).prop('disabled', true);
    count++;

    $('#addmoreimg').before('<div class="row" id="imageblock_'+count+'"><div class="col-md-4 block_'+count+'" class="previews"><label class="form-label">Caption</label><input type="text" name="imageCaption[]" id="imageCaption_'+count+'" placeholder=""  class="form-control form-inputtext" /><button type="button" class="btn btn-danger mt-10" onclick="removefun('+count+')" style="height:25px;padding:0 !important;"><i class="fa fa-minus"></i></button></div><div class="col-md-7 block_'+count+'">'+
        '<div class="form-group">' +
        '<label class="form-label">Image</label>'+
        '<input onchange="previewandvalidation(this);" accept=".png, .jpg, .jpeg" type="file" name="company_image[]" id="company_image_'+count+'" data-counter="'+count+'" class="form-control form-inputtext companyimage">' +
        '<div style="display: none" id="preview_'+count+'" class="previews">' +
        '<a  onclick="removeimgsrc('+count+');" class="displayright"><i class="fa fa-remove" style="font-size: 20px;"></i></a>' +
        '<img src="" id="image_preview_'+count+'" width="" height="150px">'+
        '<input type="hidden" name="image_json_'+count+'" id="image_json_'+count+'">'+
         '<input type="hidden" name="image_name_'+count+'" id="image_name_'+count+'">'+
        '</div></div></div></div>');

    $(this).prop('disabled', false);

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
        $('#image_preview_'+counterval).attr('src',"");
        alert("Only these file types are accepted : "+validExtensions.join(', '));
    }
    else
    {
        if (input.files && input.files[0]) {
            var filerdr = new FileReader();
            filerdr.onload = function (e)
            {
                $("#preview_"+counterval).show();
                $('#image_preview_'+counterval).attr('src', e.target.result);
                $("#image_json_"+counterval).val(e.target.result);
                $("#image_name_"+counterval).val(fileName);
            };
            filerdr.readAsDataURL(input.files[0]);
        }
    }
}
function removefun(cnt)
{
    $(".block_"+cnt).remove();
}
function removeimgsrc(cntid)
{
    $('#company_preview_'+cntid).attr('src', '');
    $('#company_image_'+cntid).val('');
    $("#company_"+cntid).hide();
    $("#image_preview_"+cntid).attr('src', '');
    $(".block_img_"+cntid).remove();
    $("#edit_imageblock_"+cntid).remove();
}


$(document).ready(function()
{
   var edit_data  = localStorage.getItem('company_profile');

   if(edit_data != '' && edit_data != undefined && edit_data != null)
   {
      var edit_store_data = JSON.parse(edit_data);

      var company_mobile = document.querySelector("#company_mobile");
       var company_dial_code = edit_store_data['company_mobile_dial_code'];


       var company_mobile_dial_code_edit = "in";
       if (company_dial_code != '') {
           var company_mobile_dial_code_edit = company_dial_code.split(',')[1];
       }
       window.intlTelInput(company_mobile,
           {
               initialCountry: company_mobile_dial_code_edit,
               separateDialCode: true,
               autoHideDialCode: false,
               utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
           });

       var personal_mobile_no = document.querySelector("#personal_mobile_no");

       var personal_dial_code = edit_store_data['personal_mobile_dial_code'];
       var personal_mobile_dial_code_edit = "in";
       if (personal_dial_code != '') {
           var personal_mobile_dial_code_edit = personal_dial_code.split(',')[1];
       }

       window.intlTelInput(personal_mobile_no, {
           initialCountry: personal_mobile_dial_code_edit,
           separateDialCode: true,
           autoHideDialCode: false,
           utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
       });

       var whatsapp_mobile_number = document.querySelector("#whatsapp_mobile_number");
       var whatsapp_dial_code = edit_store_data['whatsapp_mobile_dial_code'];
       var whatsapp_dial_code_edit = "in";
       if(whatsapp_dial_code != '')
       {
           var whatsapp_dial_code_edit = whatsapp_dial_code.split(',')[1];
       }
       window.intlTelInput(whatsapp_mobile_number, {
           initialCountry: whatsapp_dial_code_edit,
           separateDialCode: true,
           autoHideDialCode: false,
           utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
       });

      $("#store_id").val(edit_store_data['store_id']);
      $("#company_id").val(edit_store_data['company_id']);
      $("#company_profile_id").val(edit_store_data['company_profile_id']);

      $("#full_name").val(edit_store_data['full_name']);
      $("#personal_mobile_no").val(edit_store_data['personal_mobile_no']);
      $("#personal_email").val(edit_store_data['personal_email']);
      $("#company_name").val(edit_store_data['company_name']);
      $("#company_mobile").val(edit_store_data['company_mobile']);
      $("#company_email").val(edit_store_data['company_email']);
      $("#website").val(edit_store_data['website']);
      $("#gstin").val(edit_store_data['gstin']);
      $("#state_id").val(edit_store_data['state_id']);

      $("#whatsapp_mobile_number").val(edit_store_data['whatsapp_mobile_number']);
      $("#facebook").val(edit_store_data['facebook']);
      $("#instagram").val(edit_store_data['instagram']);
      $("#pinterest").val(edit_store_data['pinterest']);

      $("#company_address").val(edit_store_data['company_address']);
      $("#company_area").val(edit_store_data['company_area']);
      $("#company_city").val(edit_store_data['company_city']);
      $("#company_pincode").val(edit_store_data['company_pincode']);
      $("#country_id").val(edit_store_data['country_id']);

      $("#returndays").val(edit_store_data['return_days']);

      if(edit_store_data['authorized_signatory_for'] == '')
      {
         $('input[name=authorized_signatory]').attr('checked', false);
         $("#authority_for").hide();
      }
      else
      {
         $('input[name=authorized_signatory]').attr('checked', true);
         $("#authorized_signatory_for").val(edit_store_data['authorized_signatory_for']);
         $("#authority_for").show();
      }

      $("#terms_and_condition").val(edit_store_data['terms_and_condition']);
      $("#additional_message").val(edit_store_data['additional_message']);

      $("#account_holder_name").val(edit_store_data['account_holder_name']);
      $("#bank_name").val(edit_store_data['bank_name']);
      $("#account_number").val(edit_store_data['account_number']);
      $("#ifsc_code").val(edit_store_data['ifsc_code']);
      $("#branch").val(edit_store_data['branch']);

      $("#po_terms_and_condition").val(edit_store_data['po_terms_and_condition']);

      $("#bill_number_prefix").val(edit_store_data['bill_number_prefix']);
      $("#credit_receipt_prefix").val(edit_store_data['credit_receipt_prefix']);
      $("#debit_receipt_prefix").val(edit_store_data['debit_receipt_prefix']);
      $("#po_number_prefix").val(edit_store_data['po_number_prefix']);
      $("#edit_company_image_block").remove();
      if(edit_store_data['additional_image'] !=null && edit_store_data['additional_image'] != '')
      {
          var image = edit_store_data['additional_image'].split(',');
          var image_caption = edit_store_data['additional_image_caption'].split(',');
          $("#edit_store_image_block").show();
          $("#edit_company_image_block").remove();
          var count = 1;
         $.each(image,function (key,value)
         {
          var src = '';
          src = company_profile_url+value;
          $('#edit_store_image_block').prepend('<div class="row" id="edit_imageblock_'+count+'">'+ 
                                            '<div class="col-md-7 block_img_'+count+'">'+
                                                '<div class="form-group">'+
                                                    '<div id="preview_1" class="previews">'+
                                                        '<a onclick="removeimgsrc('+count+');" class="displayright"><i class="fa fa-remove" style="font-size: 20px;"></i></a>'+
                                                        '<img src="'+src+'" id="image_preview_'+count+'" name="image_preview_'+count+'" width="" height="120px">'+
                                                        '<caption id="caption_'+count+'">'+image_caption[key]+'</caption>'+
                                                        '<input type="hidden" name="all_image_'+count+'" id="all_image_'+count+'" value="'+image[key]+'">'+
                                                        '<input type="hidden" name="all_image_caption" id="all_image_caption_'+count+'" value="'+image_caption[key]+'">'+
                                                    '</div>'+
                                                '</div>'+
                                           '</div>'+
                                        '</div>');
           count++;
         });
        
      }
      //
      //$("#edit_company_image_block").();

   }
})


$('#country_id').change(function(e){

       var country_id   =  $('#country_id').val();
       var url = "get_mobilecode";
       var type = "POST";
        var dataType = '';
       var data = {
           "country_id": country_id
       }
       callroute(url, type,dataType, data, function (data)
       {
         var dta = JSON.parse(data);

            $('#pi .flag-container').html('');

             var pinput = document.querySelector("#personal_mobile_no");
             window.intlTelInput(pinput, {
             initialCountry: dta['Data'],
             separateDialCode: true,
             autoHideDialCode: false,
             utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
             });

             $('#ci .flag-container').html('');

             var pinput = document.querySelector("#company_mobile");
             window.intlTelInput(pinput, {
             initialCountry: dta['Data'],
             separateDialCode: true,
             autoHideDialCode: false,
             utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
             });

             $('#sm .flag-container').html('');

             var pinput = document.querySelector("#whatsapp_mobile_number");
             window.intlTelInput(pinput, {
             initialCountry: dta['Data'],
             separateDialCode: true,
             autoHideDialCode: false,
             utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
             });
       });
    if(country_id != '102')
    {
       $("#gstin").removeAttr("maxlength");
    }
    else {
        $("#gstin").attr("maxlength","15");
    }
});


$("#addcompanyprofile").click(function (event)
{

    event.preventDefault();
    $("#addcompanyprofile").attr("disabled","disabled");

   if(validate_company_profile('company_profile_form'))
   {
      
      $("#state_id").removeAttr('disabled',true);
      var state_id = $('#state_id :selected').val();

      $("#state_id").val(state_id);

     

      // var comapny_address = CKEDITOR.instances.company_address.getData();
      // $("#company_address").val(comapny_address);

      // var terms_and_condition = CKEDITOR.instances.terms_and_condition.getData();
      // $("#terms_and_condition").val(terms_and_condition);

      // var additional_message = CKEDITOR.instances.additional_message.getData();
      // $("#additional_message").val(additional_message);

    


      var data = {
         "formdata": $("#company_profile_form").serialize(),
      };
      
     

      var  url = "company_profile_create";
      var type = "POST";
      var datatype = "";
      callroute(url,type,datatype,data,function (data)
      {
         var dta = JSON.parse(data);

         if(dta['Success'] == "True")
         {
            toastr.success(dta['Message']);

            $("#company_profile_id").val(dta['company_profile_id']);
            if(dta['url']!='')
            {
               window.location = dta['url'];
            }
            else
            {
                location.reload();
            }
         }
         else
         {

             $("#addcompanyprofile").removeAttr("disabled", "disabled");
            if(dta['status_code'] == 409)
            {
                $.each(dta['Message'],function (errkey,errval)
               {
                  var errmessage = errval;
                  toastr.error(errmessage);
               });
               return false;
            }
            else
            {
               toastr.error(dta['Message']);
            }
         }
      })
   }
   else {
       $("#addcompanyprofile").removeAttr("disabled", "disabled");
      return false;
   }
});


//function for validate company profile form
function validate_company_profile(frmid)
{
   var error = 0;

   if($("#full_name").val() == '')
   {
      error = 1;
      toastr.error("Enter Full Name!");
      return false;
   }

   if($("#personal_mobile_no").val() == '')
   {
       error = 1;
      toastr.error("Enter Personal Mobile Number!");
      return false;
   }

   if($("#personal_email").val() == '')
   {
       error = 1;
      toastr.error("Enter Personal Email!");
      return false;
   }
   else
   {
      var email = $("#personal_email").val().split(',');
      $.each(email,function (emailkey,emailvalue) {
         // if(!validateEmail(emailvalue))
         // {
         //    error = 1;
         //    toastr.error("Enter Proper Personal EmailId!");
         //    return false;
         // }
      });
   }

   if($("#company_email").val() != '')
   {
      var cemail = $("#company_email").val().split(',');
      $.each(cemail,function (cemailkey,cemailvalue) {
         // if(!validateEmail(cemailvalue))
         // {
         //    error = 1;
         //    toastr.error("Enter Proper Company EmailId!");
         //    return false;
         // }
      });
   }

   if($("#company_name").val() == '')
   {
      error = 1;
      toastr.error("Enter Company Name!");
      return false;
   }

   if($("#state_id").val() == 0 || $("#state_id").val() == '')
   {
      error  =1;
      toastr.error("Please Select State!");
      return false;

   }

    //var address = CKEDITOR.instances.company_address.getData();
   // if(address == '')
   // {
   //    error = 1;
   //    toastr.error("Enter Company Address!");
   //    return false;
   // }

   if($("#company_area").val() == '')
   {
      error = 1;
      toastr.error("Enter Company Area!");
      return false;
   }

   if($("#company_city").val() == '')
   {
      error = 1;
      toastr.error("Enter Company City!");
      return false;
   }
   /*if($("#company_pincode").val() == '')
   {
         error = 1;
         toastr.error("Enter Company Pincode!");
         return false;
   }*/

   if(error == 1)
   {
      return false;
   }
   else
   {
      return true;
   }
}
//end of function for validate company profile form








//authorized signatory for => hide show
$("#authorized_signatory").change(function(){

   if($(this).prop('checked'))
   {
      $("#authority_for").css('display','block');
      $("#authorized_signatory_for").val($("#company_name").val());
   }
   else
   {
      $("#authority_for").css('display','none');
      $("#authorized_signatory_for").val('');
   }

});
//end of authority signatory for =>hide/show

//if authority signatory is checked then its value = company name
$("#company_name").keyup(function ()
{
   if($("#authorized_signatory").prop('checked'))
   {
      $("#authorized_signatory_for").val($(this).val());

   }
});
//end of companyname = authority signatory for

//based on gst select state
$("#gstin").keyup(function ()
{
   var gst_state_code = $("#gstin").val().substr(0,2);

   if(gst_state_code.length != 0)
   {
      $('#state_id').attr("style", "pointer-events: none;");
      $("#state_id").css('color','black');
      if(gst_state_code.startsWith('0'))
      {
          gst_state_code = gst_state_code.substring(1);
      }
      $("#state_id").val(gst_state_code);
      $('#state_id option[value="'+gst_state_code+'"]').attr("selected", "selected");

   }
   else
   {
      $('#state_id').attr("style", "pointer-events: all;");
      $("#state_id").css('color','');
      $("#state_id").val('');
   }
});

//end of select state based on gst

//function for reset company profile
function resetcompany_profiledata()
{

$("#pi").each(function () {
   $(this).find("input[type=text],input[type=tel], textarea").val('');
});

   $("#ci").each(function () {
      $(this).find("input[type=text],input[type=tel], textarea,select").val('');
   });
   $("#sm").each(function () {
      $(this).find("input[type=text],input[type=tel], textarea,select").val('');
   });

   $("#ad").each(function () {
      $(this).find("input[type=text],input[type=tel], textarea,select").val('');
   });

   $("#ad").each(function () {
      $(this).find("input[type=text],input[type=tel], textarea,select").val('');
   });

   $("#bf").each(function () {
      $(this).find("input[type=text],input[type=tel], textarea,select").val('');
   });

   $("#bd").each(function () {
      $(this).find("input[type=text]").val('');
   });
   $("#smtp_setup").each(function () {
      $(this).find("input[type=text],input[type=password], textarea,select").val('');
   });
   $("#authorized_signatory").prop('checked',false);
   $("#authority_for").css('display','none');


  CKEDITOR.instances.company_address.setData('');
  CKEDITOR.instances.terms_and_condition.setData('');
  CKEDITOR.instances.additional_message.setData('');
}
//end of function for company profile




// //for check software configuration is set or not
// $("document").ready(function () {

//    if(typeof tax_type == 'undefined' )
//    {
//      // toastr.error("Please Contact Software Technical Person First!");
//       toastr.options = {
//          debug: false,
//          positionClass: "toast-top-full-width",
//          timeOut: 0,
//          tapToDismiss :false,
//          onclick: null,
//          extendedTimeOut: 0
//       }
//       // toastr.error("Please enter");
//       $("#company_profile_form :input").prop("disabled", true);

//    }

// });

// //end of checking configuration set up


$("input[name=copytermconditions]").click(function() { 

       
    if ($("input[name=copytermconditions]").is(":checked")) 
    { 
        
         var type = "POST";
         var url = 'copytermconditions';
         var dataType = "";
         var data  = "";
         callroute(url,type,dataType,data,function(data)
         {

              var product_data = JSON.parse(data,true);

              

              if(product_data['Success'] == "True")
              {
                  var product_detail  = product_data['Data'];
                  if(product_detail['po_terms_and_condition']=='' || product_detail['po_terms_and_condition']==null)
                  {
                        toastr.error("No date related to terms and conditions saved In warehouse!");
                        $("#copytermconditions"). prop("checked", false);
                  }
                  else
                  {
                    
                        CKEDITOR.instances.po_terms_and_condition.setData(product_detail['po_terms_and_condition']);
                  }
              }
              
          });
        
        
    }
    else
    { 
          $('#po_terms_and_condition').val('');
          CKEDITOR.instances.po_terms_and_condition.setData('');
    } 
}); 

$("input[name=copysocialhandles]").click(function() { 

       
    if ($("input[name=copysocialhandles]").is(":checked")) 
    { 
        
         var type = "POST";
         var url = 'copysocialhandles';
         var dataType = "";
         var data  = "";
         callroute(url,type,dataType,data,function(data)
         {

              var product_data = JSON.parse(data,true);

              

              if(product_data['Success'] == "True")
              {
                  var product_detail  = product_data['Data'];
                  if((product_detail['whatsapp_mobile_number']=='' || product_detail['whatsapp_mobile_number']==null)
                    && (product_detail['facebook']=='' || product_detail['facebook']) && 
                    (product_detail['instagram']=='' || product_detail['instagram']) &&
                    (product_detail['pinterest']=='' || product_detail['pinterest'])) 

                  {
                        toastr.error("No date related to Social Media Handles saved In warehouse!");
                        $("#copysocialhandles"). prop("checked", false);
                  }
                  else
                  {
                           var whatsapp_dial_code = product_detail['whatsapp_mobile_dial_code'];
                           var whatsapp_dial_code_edit = "in";
                           if(whatsapp_dial_code != '')
                           {
                               var whatsapp_dial_code_edit = whatsapp_dial_code.split(',')[1];
                           }
                           window.intlTelInput(whatsapp_mobile_number, {
                               initialCountry: whatsapp_dial_code_edit,
                               separateDialCode: true,
                               autoHideDialCode: false,
                               utilsScript: "{{URL::to('/')}}/public/build/js/utils.js",
                           });  

                          $("#whatsapp_mobile_number").val(product_detail['whatsapp_mobile_number']);
                          $("#facebook").val(product_detail['facebook']);
                          $("#instagram").val(product_detail['instagram']);
                          $("#pinterest").val(product_detail['pinterest']);


                            
                  }
              }
              
          });
        
        
    }
    else
    { 
                          $("#whatsapp_mobile_number").val('');
                          $("#facebook").val('');
                          $("#instagram").val('');
                          $("#pinterest").val('');
    } 
}); 
$("input[name=copybillfooter]").click(function() { 

       
    if ($("input[name=copybillfooter]").is(":checked")) 
    { 
        
         var type = "POST";
         var url = 'copybillfooter';
         var dataType = "";
         var data  = "";
         callroute(url,type,dataType,data,function(data)
         {

              var product_data = JSON.parse(data,true);

              

              if(product_data['Success'] == "True")
              {
                  var product_detail  = product_data['Data'];

                  //console.log(product_detail);
                  if((product_detail['authorized_signatory_for']=='' || product_detail['authorized_signatory_for']==null) &&
                  (product_detail['terms_and_condition']=='' || product_detail['terms_and_condition']==null) && 
                  (product_detail['additional_message']=='' || product_detail['additional_message']==null) )
                  {
                        toastr.error("No date related to Bill Footer Section saved In warehouse!");
                        $("#copybillfooter"). prop("checked", false);
                  }
                  else
                  {
                    
                        CKEDITOR.instances.terms_and_condition.setData(product_detail['terms_and_condition']);
                        CKEDITOR.instances.additional_message.setData(product_detail['additional_message']);
                        $('#authorized_signatory_for').val(product_detail['authorized_signatory_for']);
                        if(product_detail['authorized_signatory_for']!='' || product_detail['authorized_signatory_for']!=null)
                        {
                          $("#authorized_signatory"). prop("checked", true);
                          $("#authority_for").show();
                        }
                  }
              }
              
          });
        
        
    }
    else
    { 
          CKEDITOR.instances.terms_and_condition.setData('');
          CKEDITOR.instances.additional_message.setData('');
          $('#authorized_signatory_for').val('');
          $("#authorized_signatory"). prop("checked", false);
          $("#authority_for").hide();
    } 
}); 
