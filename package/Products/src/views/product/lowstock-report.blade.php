@include('pagetitle')

@extends('master')

@section('main-hk-pg-wrapper')
<style type="text/css">
.display-4{
    font-size:1.5rem !important;
}
.table thead tr.header th {

    font-size: 0.95rem !important;
}
.table tbody tr td {

    font-size: 0.92rem !important;
}
</style>
<script src="{{URL::to('/')}}/public/template/jquery/dist/jquery.min.js"></script>

    <div class="container">

        <span class="commonbreadcrumbtn badge exportBtn badge-pill mr-10" id="exportLowStockdata"><i class="ion ion-md-download"></i>&nbsp;Download Low Stock Excel </span>
        <span class="commonbreadcrumbtn badge badge-danger badge-pill" id="searchCollapse"><i class="glyphicon glyphicon-search"></i>&nbsp;Search</span>


    <section class="hk-sec-wrapper collapse" id="filterarea_block">
        <div id="">
            <div class="hk-row common-search">
                <div class="col-md-2 pb-10">
                    <div class="form-group">
                        <input type="text" name-attr="product_name" maxlength="50" autocomplete="off" name="product_name_filter" id="product_name_filter" value="" class="form-control form-inputtext" placeholder="Product Name">
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <input type="text" name-attr="barcode" maxlength="50" autocomplete="off" name="barcode_filter" id="barcode_filter" value="" class="form-control form-inputtext" placeholder="Barcode">
                    </div>
                </div>
                {{--<div class="col-md-2">
                    <div class="form-group">
                        <select name-attr="brand_id" class="form-control form-inputtext" name="brand_id_filter" id="brand_id_filter"></select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select name-attr="category_id" class="form-control form-inputtext" onchange="getsubcategory_filter()" name="category_id_filter" id="category_id_filter"></select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select name-attr="subcategory_id" class="form-control form-inputtext" name="subcategory_id_filter" id="subcategory_id_filter"></select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select name-attr="colour_id" class="form-control form-inputtext" name="colour_id_filter" id="colour_id_filter"></select>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-group">
                        <select name-attr="size_id" class="form-control form-inputtext" name="size_id_filter" id="size_id_filter"></select>
                    </div>
                </div>--}}
                @foreach($product_features AS  $product_features_key=>$product_features_value)
                    <div class="col-md-2">

                        <select class="form-control form-inputtext" name-attr="{{$product_features_value->html_id}}" id="{{$product_features_value->html_id}}" name="{{$product_features_value->html_name}}" value="" >
                            <option value="">Select {{$product_features_value->product_features_name}} </option>
                            @foreach($product_features_value->product_features_data->sortBy('product_features_data_value') AS  $kk=>$vv)
                                <option value="{{$vv->product_features_data_id}}">{{$vv->product_features_data_value}}</option>

                            @endforeach
                        </select>

                    </div>
                @endforeach
                <div class="col-md-2">
                    <div class="form-group">
                        <select name-attr="uqc_id" class="form-control form-inputtext" name="uqc_id_filter" id="uqc_id_filter"></select>
                    </div>
                </div>
                <?php
                         if(sizeof($get_store)!=0)
                         {
                         ?>     <div class="col-md-2">
                                <select class="form-control form-inputtext" name-attr="store_name" style="" name="store_id" id="store_id">
                                <option value="">Select Store</option>
                                @foreach($get_store->sortBy('full_name') AS $storekey=>$storevalue)
                                    <option value="{{$storevalue->store_id}}">{{$storevalue->company_profile->full_name}}</option>
                                @endforeach
                                </select>
                                </div>
                         <?php
                         }
                ?>
                <div class="col-sm-2 offset-md-10">
                    <button type="button" class="btn btn-info searchBtn search_data"  id="search_lowstock"><i class="fa fa-search"></i>Search</button>
                    <button type="button" name="resetfilter" onclick="resetLowStock();" class="btn btn-info resetbtn" id="resetfilter" data-container="body" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="" title="">Reset</button>
                </div>
            </div>
        </div>

    </section>


    <div class="card mt-20">
            <div class="card-body pr-0 pl-0">
                <div class="row ma-0">
                    <div class="col-sm-12 pa-10">
                        <div class="table-wrap pa-10">
                            <div class="table-responsive" id="view_lowstock_record">


                                    @include('products::product/view_lowstock_data')

                            </div>
                        </div><!--table-wrap-->
                    </div>
                </div>
            </div><!--card-body-->
        </div>



    <script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/jquery/js/jquery.min.js"></script>
    <script src="{{URL::to('/')}}/public/dist/js/moment.min.js"></script>
    <script src="{{URL::to('/')}}/public/dist/js/daterangepicker.js"></script>
    <script type="text/javascript">
      $('.daterange').daterangepicker({


                autoUpdateInput: false,

                },function(start_date, end_date) {


        $('.daterange').val(start_date.format('DD-MM-YYYY')+' - '+end_date.format('DD-MM-YYYY'));

                     var inoutdate         =     $("#fromtodate").val();


                    var totalnights       =     inoutdate.split(' - ');
                    $("#from_date").val(totalnights[0]);
                    $("#to_date").val(totalnights[1]);
        });
    </script>
    <script type="text/javascript">
    $(document).ready(function(e){

            $(document).on('click', '#exportstockdata', function(){

                var query = {
                    from_date: $('#from_date').val(),
                    to_date : $('#to_date').val(),
                    productsearch: $('#productsearch').val(),
                    categoryname : $('#categoryname').val(),
                    brandname:$('#brandname').val()
                }


                var url = "{{URL::to('export_stockreport_details')}}?" + $.param(query)
                window.open(url,'_blank');


            });
    });

    </script>
        <script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/jquery-ui/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/popper.js/js/popper.min.js"></script>
        <script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/bootstrap/js/bootstrap.min.js"></script>

       <script src="{{URL::to('/')}}/public/modulejs/product/product.js"></script>

@endsection
