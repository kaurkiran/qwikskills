@include('pagetitle')

@extends('master')

@section('main-hk-pg-wrapper')
<script src="{{ asset('public/js/jquery.min.js') }}"></script> 

<style type="text/css">
    .table th, .table td{
        padding: 6px !important;
    }
</style>

<br clear="all" />
<br clear="all" />
<div id="content">
  <div id="content-header">
    @include('breadcrumbs')
    
    <h1>Product Profile</h1>
  </div>

    <div class="row-fluid">
        <div id="modelData" style=""></div>
        <div class="modal fade bs-example-modal-lg" id="ModalCarousel34" tabindex="-1" role="dialog" aria-labelledby="ModalCarousel34" style="padding-right: 17px;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body pa-0">
                        <div id="demo" class="carousel slide" data-ride="carousel">
                            <ul class="carousel-indicators"></ul>
                            <div class="carousel-inner"></div>
                            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                <span class="carousel-control-prev-icon" style="color: black"></span>
                            </a>
                            <a class="carousel-control-next" href="#demo" data-slide="next">
                                <span class="carousel-control-next-icon" style="color: black"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <!--<?php
        if($role_permissions['permission_export']==1)
        {
        ?> -->
        <!-- <span class="commonbreadcrumbtn badge badge-pill downloadBtn mr-0"  id="download_product_template"><i class="ion ion-md-download"></i>&nbsp;Download Products Template</span></a> -->
       <!--  <?php
        }
        ?> -->
              <!--<?php
            // if($role_permissions['permission_export']==1)
            {
            ?> -->
               <!--  <span class="commonbreadcrumbtn badge exportBtn badge-pill mr-0"  id="product_export"><i class="ion ion-md-download"></i>&nbsp;Download Products Data</span>
                <span class="commonbreadcrumbtn badge exportBtn badge-pill mr-0"  id="product_update_export"><i class="ion ion-md-download"></i>&nbsp;Download Products For Update</span> -->
              <!--<?php
            }
            ?> -->
        <?php
        if($role_permissions['permission_export']==1)
        {
        ?>
        <span class="btn btn-info downloadBtn mr-0" style="margin:0 0 0 20px;" id="product_export">&nbsp
            <i class="fa fa-download"></i> Download products data</span>
        <?php } ?>
            <?php
            if($role_permissions['permission_add']==1)
            {
            ?>
                 <span class="btn btn-success"  id="addnewcollapse">
                    <i class="glyphicon glyphicon-plus"></i>&nbsp;Add New Product</span>
            <?php
            }
            ?>
            
                <span class="btn btn-success"  id="download_product_template">
                    <i class="fa fa-download"></i><span>&nbsp;Download Products Template</span></span>


            <?php
                if($role_permissions['permission_upload']==1) { ?>
                <span class="btn btn-success"  id="upload_product_tempate">&nbsp<i class="fa fa-upload"></i><span>&nbsp;Upload Products</span></span>
            <?php } ?>
                  


           <span class="btn btn-danger"  id="searchProductCollapse"><i class="glyphicon glyphicon-search"></i>&nbsp;Search</span>





        <form name="productform" id="productform" class="" style="margin:10px 0 20px 0;"  enctype="multipart/form-data">
            <meta name="csrf-token" content="{{ csrf_token() }}" />
             <!-- class="collapse"> -->
            <section id="product_block" style="display:none; padding:10px; background:#ffffff;">
                @include('products::product/product_form')
                <div class="row ml-0" style="margin:0 0 0 53px;">
                    <div class="col-sm-12">
                        <div class="hk-row">
                            <div class="span12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="span2 offset-md-10">
                                       {{-- <input type="hidden" name="type" id="type" value="1" />--}}
                                                <input type="hidden" name="product_feature_arr" id="product_feature_arr" value="">
                                        <button type="submit" name="addproduct" class="btn btn-success savenewBtn" id="addproduct" data-container="body" data-toggle="popover" data-placement="bottom" data-content="">Save</button>
                                        <button type="button" name="resetproduct" onclick="resetproductdata();" class="btn btn-inverse resetbtn" id="resetproduct" data-container="body" data-toggle="popover" data-placement="bottom" data-content="">Reset</button>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </section>
        </form>

    <section class="hk-sec-wrapper collapse" id="filterarea_block">
        <div id="">
            <form name="psearch" id="psearch">
            <div class="hk-row common-search">
                <div class="span2 pb-10">
                    <div class="form-group">
                        <input type="text" name-attr="product_name" maxlength="50" autocomplete="off" name="product_name_filter" id="product_name_filter" value="" class="form-control form-inputtext" placeholder="Product Name">
                    </div>
                </div>
                <div class="span2">
                    <div class="form-group">
                        <input type="text" name-attr="barcode" maxlength="50" autocomplete="off" name="barcode_filter" id="barcode_filter" value="" class="form-control form-inputtext" placeholder="Barcode">
                    </div>
                </div>
                <div class="span2">
                    <div class="form-group">
                        <input type="text" name-attr="product_code" maxlength="50" autocomplete="off" name="pcode_filter" id="pcode_filter" value="" class="form-control form-inputtext" placeholder="Product Code">
                    </div>
                </div>
                <div class="span2">
                    <div class="form-group">
                        <input type="text" name-attr="sku_code" maxlength="50" autocomplete="off" name="skucode_filter" id="skucode_filter" value="" class="form-control form-inputtext" placeholder="SKU">
                    </div>
                </div>
                <?php
                $apnd_jquery = '';
                ?>
                 @foreach($product_features AS $product_features_key=>$product_features_value)
                    <?php
                    $multi_select = '';
                  
                    ?>
                    <div class="span2">
                            <!-- <label class="form-label">{{$product_features_value->product_features_name}}</label> -->
                            <select <?php echo $multi_select ?> class="form-control form-inputtext <?php echo $product_features_value['html_id'].'_s_'.$product_features_value['product_features_id']?>" name-attr="{{$product_features_value->html_id}}" id="{{$product_features_value->html_id.$product_features_key}}" name="{{$product_features_value->html_name}}" value="" >
                                <option value="">Select {{$product_features_value->product_features_name}} </option>
                                @foreach($product_features_value->product_features_data->sortBy('product_features_data_value')  AS  $kk=>$vv)
                                <option value="{{$vv->product_features_data_id}}">{{$vv->product_features_data_value}}</option>
                                @endforeach
                            </select>
                    </div>
                         @endforeach

                <div class="span2">
                    <div class="form-group">
                        <select name-attr="uqc_id" class="form-control form-inputtext" name="uqc_id_filter" id="uqc_id_filter"></select>
                    </div>
                </div>
                <div class="span12 float-right text-right">
                    <button type="button" class="btn btn-info searchBtn search_data"  id="search_product"><i class="fa fa-search"></i>Search</button>
                    <button type="button" name="resetfilter" onclick="resetproductfilterdata();" class="btn btn-info resetbtn" id="resetfilter" data-container="body" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="" title="">Reset</button>
                </div>
            </div>
            </form>
        </div>
    </section>

    <section class="hk-sec-wrapper" style="margin:0 20px 0 20px;" id="productmaintable">
        <div class="hk-row">
            <div class="span3">
                <?php
                if($role_permissions['permission_delete']==1)
                {
                ?>
                    <a style="display: none; color:#ff0000;" id="deleteproduct" name="deleteproduct"><i class="fa fa-trash cursor" style="font-size: 20px;color: red;margin:5px 0 0 0"></i> Delete Multiple Products</a>
                <?php
                }
                ?>
            </div>
           
        </div>


        <div class="table-wrap">
            <div class="table-responsive" id="productrecord">
                @include('products::product/product_data')
            </div>
        </div><!--table-wrap-->

    </section>


        <div id="styleSelector">
    </div>


<!-- DYNAMIC POPUP FOR ADD PRODUCT FEATURES -->

    {{--popup for get pwd when want to update mrp and offer price--}}
     <div id="get_pwd" class="modal hide width90" aria-hidden="true" style="display: none;">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Verification Process</h3>
              </div>
       
                <div class="modal-body">
                  
                    <div class="container"></div>
                    <form id="brandform">
                        <div class="modal-body">
                            <label class="form-label">Enter Your Current Login Password</label>
                            <input class="form-control form-inputtext" autocomplete="off" name="current_pwd" id="current_pwd" maxlength="100" type="password" placeholder=" ">
                        </div>

                        <div class="modal-footer">
                            <a href="#" data-dismiss="modal" class="btn">Close</a>
                            <button type="button" id="check_pwd" class="btn btn-info">Continue</button>
                        </div>
                    </form>
                </div>
            
        </div>

    <div id="addproducts_features" class="modal hide width90" aria-hidden="true" style="display: none;">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3 class="modal-title dnamic_feature_title"></h3>
              </div>
     
                <div class="container"></div>
                <form id="productfeaturesform">

                    <input type="hidden" name="product_features_id" value="" id="product_features_id">
                    <input type="hidden" name="rowid" value="" id="rowid">

                    <input type="hidden" name="dynamic_product_features" value="" id="dynamic_product_features">

                    <div class="modal-body">
                        <div class="span6 parentshow" style="display:none">
                            <label class="form-label">Parent</label>
                            <select class="form-control form-inputtext" name="parent" id="parent"></select>
                        </div>
                        <div class="input-group input-group-default floating-label">
                            <label class="form-label dnamic_feature_name"> </label>
                            <input class="form-control form-inputtext invalid" autocomplete="off" name="product_features_data_value" id="product_features_data_value" maxlength="100" type="text" placeholder=" ">
                        </div>

                       {{-- <div class="input-group input-group-default floating-label">
                            <label class="form-label product_features_data_url">Product Features Data Url</label>
                            <input class="form-control form-inputtext" autocomplete="off" name="product_features_data_url"
                                   id="product_features_data_url" maxlength="100" type="text" placeholder=" ">
                        </div>

                        <div class="input-group input-group-default floating-label">
                            <label class="form-label product_features_data_url">Feature Content</label>
                            <input class="form-control form-inputtext" autocomplete="off" name="feature_content"
                                   id="feature_content" maxlength="100" type="text" placeholder=" ">
                        </div>

                        <div class="input-group input-group-default floating-label">
                            <label class="form-label product_features_data_url">Product Features Data Image</label>
                        <input type="file" name="product_features_data_image" id="product_features_data_image" onchange="productfeature_image_validation(this);">
                            <div class="imgblock" id="image_block" style="display: none">
                          <img src="" id="productfeature_image_preview" class="src_feature"  width="100%" height="200px">

                          <input type="hidden" class="json_val" name="image_json" id="image_json">
                            <input type="hidden" class="img_name" name="image_name" id="image_name">
                            </div>
                        </div>


                        <div class="input-group input-group-default floating-label">
                            <label class="form-label product_features_data_url">Product Features Banner Image</label>
                            <input type="file" name="product_features_banner_image" id="product_features_banner_image" onchange="productfeature_image_validation(this);">
                            <div class="imgblock" id="image_block" style="display: none">
                                <img src="" id="productfeature_image_preview" class="src_feature"  width="100%" height="200px">

                                <input type="hidden" class="json_val" name="banner_image_json" id="banner_image_json">
                                <input type="hidden" class="img_name" name="banner_image_name" id="banner_image_name">
                            </div>
                        </div>--}}

                        <span id="sizeerr" style="color: red;font-size: 15px"></span>
                    </div>

                    <div class="modal-footer"><a href="#" data-dismiss="modal" class="btn">Close</a>
                        <button type="button" id="productfeaturessave"  class="btn btn-primary">Save</button>
                    </div>
                </form>           
    </div>
<!-- END -->

    <div id="upload_products_popup" class="modal hide width50" aria-hidden="true" style="display: none;">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Upload Products(Excel File)</h3>
              </div>
        
                <div class="modal-body">                    
                  
                        <div class="span">
                                <div class="card">
                                    <div class="card-body">
                                        <input type="file" class="" id="productsfileUpload"  accept=".xlsx, .xls" />
                                        <button type="button" class="btn btn-info btn-block mt-10 uploadBtn width30" name="uploadproducts" id="uploadproducts">
                                        <i class="ion ion-md-cloud-upload"></i>&nbsp;Upload</button>
                                    </div>
                                </div>
                            
                        </div>
                </div>            
        </div>

 <div id="product_type_popup" class="modal hide width90" aria-hidden="true" style="display: none;">
              <div class="modal-header">
                <button data-dismiss="modal" class="close" type="button">×</button>
                <h3>Choose Product Type</h3>
              </div>
       
                <div class="modal-body">
                    
                    <div class="container"></div>
                    <form style="margin-bottom: 0">
                    <div class="span12" style="text-align: center;margin: 15px 0 20px 0;">
                        <input type="radio" name="product_type"  id="regular_product" value="1">
                        <span style="font-size: 16px;color: black" class="informative" data-content="Common Barcode no. for all stock quantity of product. For example: Product ABC with barcode no. 123456 and 100 qty in stock; all stock qty will have SAME barcode no. 123456" data-toggle="popover" data-placement="bottom">Regular Product</span>
                        <input type="radio" name="product_type" id="unique_product" value="3" style="margin-left: 15px">
                        <span style="font-size: 16px;color: black" class="informative" data-content="Unique Barcode no. for each stock quantity of product. For example: Product XYZ with barcode no. 987654 and 100 qty in stock; each stock qty of this product will have UNIQUE & DIFFERENT barcode no. similar to serial no. such as 987654, 987655, 987656 and so on." data-toggle="popover" data-placement="bottom">Unique Product</span>
                    </div>
                    </form>
                </div>
          
    </div>

</div>
</div>
    <script type="text/javascript" src="{{URL::to('/')}}/public/js/xlsx.full.min.js"></script>
    <script src="{{URL::to('/')}}/public/modulejs/product/product.js"></script>
    <script src="{{URL::to('/')}}/public/modulejs/product/productproperties.js"></script>
    

        <script>
        
            $('#searchProductCollapse').click(function(e){
                $('#filterarea_block').slideToggle();
                jQuery.noConflict();

                <?php echo $apnd_jquery?>
            });

            var product_feature_arr = <?php  echo (json_encode($product_features)); ?>;
        </script>

@endsection


