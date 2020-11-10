<title class="summary_title"></title>
@extends('master')

@section('main-hk-pg-wrapper')


    <link rel="stylesheet" href="{{URL::to('/')}}/public/bower_components/bootstrap-datepicker/css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="{{URL::to('/')}}/public/build/css/intlTelInput.css">
    <link rel="stylesheet" href="{{URL::to('/')}}/public/bower_components/sweetalert/css/sweetalert.css">

    <div class="container">

        <span class="commonbreadcrumbtn badge exportBtn badge-pill mr-0"  id="product_summary_export"><i class="ion ion-md-download"></i>&nbsp;Download Product Summary</span>
    <span class="commonbreadcrumbtn badge badge-danger badge-pill"  id="searchCollapse">
    <i class="glyphicon glyphicon-search"></i>&nbsp;Search</span>


    <div class="col-xl-12 collapse" id="searchbox">
        <div class="hk-row">
            <div class="col-sm-12">
                <div class="card">
                    <div class="card-body">
                        <!-- <h4 class="hk-sec-title">View Product Wise Inward</h4> -->
                        <div class="col-xl-12">
                            <div class="row common-search">
                                <div class="col-md-3">
                                    <label class="form-label">From To Date</label>
                                    <input type="text" name-attr="from_to_date" maxlength="50" autocomplete="off" name="filer_from_to" id="filer_from_to" value="" class="daterange form-control form-inputtext" placeholder="">
                                    <input type="hidden" name-attr="product_id"   name="product_id" id="product_id" value="<?php echo encrypt('param') ?>"  >
                                </div>
                                <input type="hidden" name-attr="batch_no" name="batch_no" id="batch_no" value="">

                                <div class="col-md-3">
                                    <label class="form-label">Product Name</label>
                                    <input type="text" name-attr="product_name" name="summary_product_name_filter" id="summary_product_name_filter" class="form-control form-inputtext" placeholder="">
                                </div>

                                <div class="col-md-3">
                                    <label class="form-label">Batch No.</label>
                                    <input type="text"  name="summary_batch_no_filter" id="summary_batch_no_filter" class="form-control form-inputtext" placeholder="">
                                </div>

                                <div class="col-md-3 float-right text-right">
                                    <label class="form-label"></label>
                                    <button type="button" name="searchproductsummary" class="btn addbutton searchBtn search_data" id="searchproductsummary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="" title=""><i class="fa fa-search"></i>Search</button>
                                    <button type="button" name="resetproductsummary" onclick="resetproductsummary();" class="btn resetbtn" id="resetproductsummary" data-container="body" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="" title="">Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


        <div class="col-xl-12">
            <div class="hk-row">
                <div class="card">
                    <div class="card-body">
                        <div class="row ma-0">
                            <div class="col-md-12">
                                <div class="row ma-0">
                                <div class="col-md-12 text-center font-weight-600 mb-15">
                                <span id="product_name_summary"></span>
                                    </div>
                                <div class="show_stock">
                                    <small class="badge badge-soft-danger" style="float: right"><b>In Stock:</b>
                                        <span class="instock">0</span>
                                    </small>
                                </div>
                                </div>

                            </div>

                        </div>

                        <div class="table-wrap" >
                            <div class="table-responsive" id="summary_record">
                                @include('products::product/product_summary_data')
                            </div>
                        </div><!--table-wrap-->
                    </div>
                </div>
            </div>
        </div>


        <script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/jquery-ui/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/popper.js/js/popper.min.js"></script>
        <script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/bootstrap/js/bootstrap.min.js"></script>


        <script src="{{URL::to('/')}}/public/dist/js/bootstrap-typeahead.js"></script>

        <script src="{{URL::to('/')}}/public/modulejs/product/product_summary.js"></script>




        <script type="text/javascript">
            $('#searchCollapse').click(function(e){
                $('#searchbox').slideToggle();
            });


        </script>
@endsection







