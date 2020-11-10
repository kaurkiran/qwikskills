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
    <section class="hk-sec-wrapper" style="padding: 0.8rem 1.5rem 0 1.5rem !important;">
        <!-- <center><h4 class="hk-sec-title"><b>Stock Report</b></h4></center> -->
        <!-- <h5 class="hk-sec-title">Stock Filter</h5> -->
       <form>
            <div class="row ma-0">
                <div class="col-xl-12">
                    <div class="row">
                        <div class="col-sm-3 ">                           
                             <div class="form-group">
                              <input type="text" name="fromtodate" id="fromtodate" class="daterange form-control form-inputtext" placeholder="Select Date"/>
                              <input type="hidden" name="from_date" id="from_date" value="{{date("d-m-Y")}}"> 
                              <input type="hidden" name="to_date" id="to_date" value="{{date("d-m-Y")}}">                               
                                      
                            </div>
                        </div>
                        <div class="col-sm-2 ">                            
                             <div class="form-group">
                              <input type="text" name="productsearch" id="productsearch" class="form-control form-inputtext" placeholder="By Barcode / Product Name" autocomplete="off">
                              
                            </div>
                        </div>
                        
                        <div class="col-sm-2 ">
                            <div class="form-group">
                              <input type="text" name="categoryname" id="categoryname" class="form-control form-inputtext" placeholder="By Category"/>
                            </div>
                        </div>
                        <div class="col-sm-2 ">
                            <div class="form-group">
                              <input type="text" name="brandname" id="brandname" class="form-control form-inputtext" placeholder="By Brand"/>
                            </div>
                        </div>
                        <div class="col-sm-3 ">
                            <button type="button" class="btn btn-info" id="searchstockdata">Search</button>
                        
                         <button type="button" class="btn btn-success" id="exportstockdata" style="float:right;">Export To Excel</button>
                         
                    </div>
                    </div>
                </div>
               
            </div>
       
  <div class="row">
                       
                        <div class="col-md-12">
                            <div class="card-group hk-dash-type-3 ">
                                 <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-5">
                                            <div>
                                                <span class="d-block font-15 text-dark font-weight-500 greencolor">Total Products</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="d-block display-4 text-dark mb-5"><span class="totalproducts">{{$count}}</span></span>
                                        </div>
                                    </div>
                                </div>
                                       <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-5">
                                            <div>
                                                <span class="d-block font-15 text-dark font-weight-500 greencolor">Opening</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="d-block display-4 text-dark mb-5"><span class="opening">{{$totopening}}</span></span>
                                        </div>
                                    </div>
                                </div>
                                 
                                       <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-5">
                                            <div>
                                                <span class="d-block font-15 text-dark font-weight-500 greencolor">Total Inward Qty</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="d-block display-4 text-dark mb-5"><span class="totalinwardqty">{{$currinward}}</span></span>
                                        </div>
                                    </div>
                                </div>
                                 <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-5">
                                            <div>
                                                <span class="d-block font-15 text-dark font-weight-500 greencolor">Total Sold Qty</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="d-block display-4 text-dark mb-5"><span class="totalsoldqty">{{$currsold}}</span></span>
                                        </div>
                                    </div>
                                </div>
                                 <div class="card card-sm">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between mb-5">
                                            <div>
                                                <span class="d-block font-15 text-dark font-weight-500 greencolor">In Stock</span>
                                            </div>
                                        </div>
                                        <div>
                                            <span class="d-block display-4 text-dark mb-5"><span class="totalinstock">{{$totstock}}</span></span>
                                        </div>
                                    </div>
                                </div>
                                
                           

                            </div>
                        </div>

                    </div>
                </form>
    </section>


    <div class="card">
            <div class="card-body pr-0 pl-0">
                <div class="row ma-0">
                    <div class="col-sm-12 pa-0">
                        <div class="table-wrap">
                            <div class="table-responsive">
                                   <table class="table tablesaw table-hover display pb-30 dataTable dtr-inline tablesaw-swipe" data-tablesaw-mode="swipe"  data-tablesaw-sortable-switch data-tablesaw-minimap data-tablesaw-mode-switch role="grid" aria-describedby="datable_1_info" style="min-width:100% !important;" border="0">
                                            

                                            <thead>
                                            <tr class="header">
                                          
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:3%;cursor: pointer" >Sr.<span id="sales_bill_id_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:11%;cursor: pointer;text-align:left !important;">Barcode<span id="created_at_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:11%;cursor: pointer;text-align:left !important;">Product Name<span id="customer_name_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:7%;cursor: pointer;text-align:left !important;">SKU Code<span id="customer_name_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:7%;cursor: pointer;text-align:left !important;">Category<span id="customer_name_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:7%;cursor: pointer;text-align:left !important;">Brand<span id="total_igst_amount_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:6%;cursor: pointer;text-align:right !important;">MRP<span id="total_igst_amount_icon"></span></th>
                                                 <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:7%;cursor: pointer;text-align:right !important;">Opening<span id="total_igst_amount_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:5%;cursor: pointer;text-align:right !important;">Inward<span id="total_igst_amount_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:5%;cursor: pointer;text-align:right !important;">Sold<span id="total_bill_amount_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:5%;cursor: pointer;text-align:right !important;">Return<span id="total_bill_amount_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:5%;cursor: pointer;text-align:right !important;">Restock<span id="discount_percent_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:5%;cursor: pointer;text-align:right !important;">Damage<span id="total_igst_amount_icon"></span></th>
                                                <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:7%;cursor: pointer;text-align:right !important;">InStock<span id="total_bill_amount_icon"></span></th>
                                                 <th scope="col" class="billsorting" data-sorting_type="asc" data-column_name="product_id" style="width:9%;cursor: pointer;text-align:right !important;">Total MRP<span id="total_bill_amount_icon"></span></th>
                                                

                                            </tr>
                                            </thead>
                                            <tbody id="view_bill_record">
                                         @include('product.view_stockreport_data')
                                            </tbody>
                                        </table>
                                        <input type="hidden" name="hidden_page" id="hidden_page" value="1" />
                                        <input type="hidden" name="hidden_column_name" id="hidden_column_name" value="product_id" />
                                        <input type="hidden" name="hidden_sort_type" id="hidden_sort_type" value="DESC" />
                                        <input type="hidden" name="fetch_data_url" id="fetch_data_url" value="datewise_stock_detail" />
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
       
       <script src="{{URL::to('/')}}/public/modulejs/common.js"></script>
       <script src="{{URL::to('/')}}/public/modulejs/stock/viewstock.js"></script>

@endsection
