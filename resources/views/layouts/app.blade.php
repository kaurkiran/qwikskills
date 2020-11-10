<!doctype html>

    
    <!-- Theme Files by JAS -->
        
    @guest
    <link rel="stylesheet" href="{{ asset('public/css/bootstrap.min.css') }}" />
        <link rel="stylesheet" href="{{ asset('public/css/bootstrap-responsive.min.css') }}" />
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


@endguest

@yield('content')

<!-- 
<div class="row-fluid">
  <div id="footer" class="span12"> 
    <span class="span6"><?php echo date('Y')?> &copy; Webcolorz POS.</span>
    <span class="span6">Powered by <a href="https://webcolorzpos.com">Webcolorz POS</a></span>
</div> -->


