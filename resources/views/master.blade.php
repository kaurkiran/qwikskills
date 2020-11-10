    <!DOCTYPE html>
<!--
Template Name: Mintos - Responsive Bootstrap 4 Admin Dashboard Template
Author: Hencework
Contact: https://hencework.ticksy.com/

License: You must have a valid license purchased only from templatemonster to legally use the template for your project.
-->
<html lang="en">


<!-- Mirrored from hencework.com/theme/mintos/dashboard1.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 05 Mar 2019 07:02:35 GMT -->
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Qwik Skills</title>
    <meta name="description" content="" />
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <!-- Favicon -->
    <link rel="shortcut icon" href="favicon.png">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="icon" type="image/png" href="favicon.png" />
    <link href='https://fonts.googleapis.com/css?family=Roboto Condensed' rel='stylesheet'>
    <link rel="stylesheet" href="{{ asset('public/css/bootstrap.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/css/bootstrap-responsive.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/css/fullcalendar.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/css/maruti-style.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/css/maruti-media.css') }}" class="skin-color" />

    <link rel="stylesheet" href="{{ asset('public/css/colorpicker.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/css/datepicker.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/css/uniform.css') }}" />
    <link rel="stylesheet" href="{{ asset('public/css/select2.css') }}" />
    <link href="{{URL::to('/')}}/public/template/jquery-toast-plugin/dist/jquery.toast.min.css" rel="stylesheet" type="text/css">
    <link href="{{URL::to('/')}}/public/template/jquery-toast-plugin/dist/jquery.toast.min.css" rel="stylesheet" type="text/css">
    <link href="{{URL::to('/')}}/public/template/toastr/toastr.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{{URL::to('/')}}/public/template/sweetalert/css/sweetalert.css">
    <link rel="stylesheet" href="{{URL::to('/')}}/public/css/jquery.typeahead.css">

<meta name="viewport" content="width=device-width, initial-scale=1">


    <title>{{ config('app.name', 'Laravel') }}</title>

    

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <script src="{{URL::to('/')}}/public/js/app.js" defer></script>

   <!-- Theme Files by JAS -->
        
    @guest
        <link rel="stylesheet" href="{{ asset('public/css/maruti-login.css') }}" />
    @else
       
    @endguest
    <!-- Theme Files by JAS -->

    <!-- Styles -->
    <!-- <link href="{{ asset('public/css/app.css') }}" rel="stylesheet"> -->
</head>
<body>

<!--top-Header-menu-->
@guest
@else
<!--Header-part-->
<div id="header">
  <h1><a href="{{ route('home') }}">&nbsp;</a></h1>
</div>


<body style="font-family: 'Roboto Condensed';">
	
  @include('home_navigation')

  

<script src="{{ asset('public/js/excanvas.min.js') }}"></script> 
<script src="{{ asset('public/js/jquery.min.js') }}"></script> 
<script src="{{ asset('public/js/jquery.ui.custom.js') }}"></script> 
<script src="{{ asset('public/js/bootstrap.min.js') }}"></script> 
<script src="{{ asset('public/js/jquery.flot.min.js') }}"></script> 
<script src="{{ asset('public/js/jquery.flot.resize.min.js') }}"></script> 
<script src="{{ asset('public/js/jquery.peity.min.js') }}"></script> 
<script src="{{ asset('public/js/fullcalendar.min.js') }}"></script> 
<!-- <script src="{{ asset('public/js/maruti.js') }}"></script>  -->
<!-- <script src="{{ asset('public/js/maruti.dashboard.js') }}"></script>  -->
<script src="{{ asset('public/js/maruti.chat.js') }}"></script> 

 
<script src="{{ asset('public/js/bootstrap-colorpicker.js') }}"></script> 
<script src="{{ asset('public/js/bootstrap-datepicker.js') }}"></script> 
<script src="{{ asset('public/js/jquery.uniform.js') }}"></script> 
<script src="{{ asset('public/js/select2.min.js') }}"></script> 
<!-- <script src="{{ asset('public/js/maruti.form_common.js') }}"></script> -->

<script src="{{URL::to('/')}}/public/template/toastr/toastr.js"></script>
<script src="{{URL::to('/')}}/public/template/jquery-toast-plugin/dist/jquery.toast.min.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/public/js/bootstrap.min.js"></script>
<!-- <script src="{{URL::to('/')}}/public/js/bootstrap-typeahead.js"></script> -->
<script src="{{URL::to('/')}}/public/modulejs/common.js"></script>
<script src="{{URL::to('/')}}/public/template/sweetalert/js/sweetalert.min.js"></script>

<!-- CkEditor -->
<!-- <script src="https://cdn.ckeditor.com/ckeditor5/16.0.0/classic/ckeditor.js"></script> -->
<!-- <script>
    ClassicEditor
    .create(document.querySelector('#editor'))
    .catch(error=>{
        console.error(error);
    });                                             
</script> -->
 

<script type="text/javascript">
  // This function is called from the pop-up menus to transfer to
  // a different page. Ignore if the value returned is a null string:
  function goPage (newURL) {

      // if url is empty, skip the menu dividers and reset the menu selection to default
      if (newURL != "") {
      
          // if url is "-", it is this page -- reset the menu:
          if (newURL == "-" ) {
              resetMenu();            
          } 
          // else, send page to designated URL            
          else {  
            document.location.href = newURL;
          }
      }
  }

// resets the menu selection upon entry to this page:
function resetMenu() {
   document.gomenu.selector.selectedIndex = 2;
}
</script>



</body>


<!-- Mirrored from hencework.com/theme/mintos/dashboard1.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 05 Mar 2019 07:03:17 GMT -->
</html>
<script>

        <?php if(sizeof($nav_type)!=0){?>
            

        var product_image_url   = '<?php echo PRODUCT_IMAGE_URL?>';
        var employee_image_url  = '<?php echo EMPLOYEE_IMAGE_URL?>';
        
        
           
        <?php } ?>
</script>
<script>
    $(".nav-item").click(function () {
        localStorage.removeItem('edit_bill_record');
        localStorage.removeItem('make_bill_record');
    });
</script>



   
@endguest

