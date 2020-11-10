@include('pagetitle')
@extends('master')

@section('main-hk-pg-wrapper')

<br clear="all" />
<br clear="all" />
<div id="content">
  <div id="content-header">
    @include('breadcrumbs')
    
    <h1>Product Features</h1>
  </div>

<script src="{{ asset('public/js/jquery.min.js') }}"></script> 

	<a href="#myModal" data-toggle="modal" class="btn btn-success AddNewEmpBtn" onclick="addnewFeature();" style="margin:0px 0 10px 30PX !important;">Add New Feature</a>

	<!-- Feature Popup -->
<div id="myModal" class="modal hide width90" aria-hidden="true" style="display: none;">
      <div class="modal-header">
        <button data-dismiss="modal" class="close" type="button">×</button>
        <h3>Add New Feature</h3>
      </div>
      <form method="post" id="addEditFeature" enctype="multipart/form-data">
      <div class="modal-body">      	

		                <div class="row">
		                    <div class="span12">

		                    	<div class="row hideThis">
		                            <div class="span3 rightAlign">Type:</div>
		                            <div class="span9 leftAlign form-inputtext">
		                                <input type="radio" name="feature_type" id="feature_type_1" value="1" checked>&nbsp;Product Feature
		                               
		                            </div>
		                        </div>

		                        <div class="row Featurelocation " style="display:none;">
		                            <div class="span3 rightAlign">Location:</div>
		                            <div class="span9 leftAlign form-inputtext">
		                                <input type="radio" name="feature_location" id="feature_location_1" value="1">&nbsp;Top Menu
		                                <input type="radio" name="feature_location" id="feature_location_2" value="2" checked>&nbsp;Main Menu
		                                <input type="radio" name="feature_location" id="feature_location_3" value="3">&nbsp;Footer Menu
		                            </div>
		                        </div>

		                    	<div class="row FeatureSubMenu">
		                            <div class="span3 rightAlign">Select Relation:</div>
		                            <div class="span9">
		                                <select name="parentChild" id="parentChild" class="form-control form-inputtext">
		                                	<option value="">Main Item Root</option>
		                                	@foreach($result AS $resultkey => $value)
		                                	<option value="{{$value->product_features_id}}" style="font-weight:bold;">{{$value->product_features_name}}</option>
		                                		@foreach($value->product_features_data AS $resultkey_1 => $value_1)
		                                		<option value="{{$value->product_features_id}}_{{$value_1->product_features_data_id}}" disabled> --- {{$value_1->product_features_data_value}}</option>
		                                		@endforeach
		                                	@endforeach
		                                </select>
		                            </div>
		                        </div>

		                        <div class="row Featurelevel1">
		                            <div class="span3 rightAlign">HTML Name:</div>
		                            <div class="span9">
		                                <input type="text" name="html_name" id="html_name" class="form-control form-inputtext invalid" placeholder="Html Name" value="dynamic_">
		                            </div>
		                        </div>

		                        <div class="row Featurelevel1">
		                            <div class="span3 rightAlign">HTML ID:</div>
		                            <div class="span9">
		                                <input type="text" name="html_id" id="html_id" class="form-control form-inputtext invalid" value="dynamic_" placeholder="HTML ID">
		                            </div>
		                        </div>

		                        <div class="row">
		                            <div class="span3 rightAlign">Display Name:</div>
		                            <div class="span9">
		                                <input type="text" name="product_features_name" id="product_features_name" class="form-control form-inputtext invalid" placeholder="Display Name">
		                            </div>
		                        </div>

		                        <div class="row">
		                            <div class="span3 rightAlign">Display URL:</div>
		                            <div class="span9">
		                                <input type="text" name="feature_url" id="feature_url" class="form-control form-inputtext invalid" readonly style="border:1px solid #ddd; color:#333333;" placeholder="Display URL">
		                            </div>
		                        </div>

		                        <div class="row Featurelevel21" style="display:none;">
		                            <div class="span3 rightAlign">Image:</div>
		                            <div class="span9">
		                                <input type="file" class="form-control form-inputtext" name="product_features_data_image" id="product_features_data_image">
		                            </div>
		                        </div>

		                        <div class="row Featurelevel21" style="display:none;">
		                            <div class="span3 rightAlign">Banner Image:</div>
		                            <div class="span9">
		                                <input type="file" class="form-control form-inputtext" name="product_features_banner_image" id="product_features_banner_image">
		                            </div>
		                        </div>

		                        <div class="row">
		                            <div class="span3 rightAlign">Content:</div>
		                            <div class="span9">
		                                <textarea class="form-control" name="feature_content" id="feature_content"></textarea>
		                            </div>
		                        </div>

		                        <div class="row FeatureUrls" style="margin-top:10px !important;">
		                            <div class="span3 rightAlign">Show Feature in Pages:</div>
		                            <div class="span9">
		                                <input type="text" name="show_feature_url" id="show_feature_url" class="form-control form-inputtext" placeholder="for multiple in (,) commas">
		                            </div>
		                        </div>

		                    </div>

		                  
		                </div>

		            </div>
		            <div class="modal-footer">

		                <div class="span3" style="">
		                	<input type="hidden" class="alertStatus" value="0" />
		                    <input type="hidden" name="product_features_id" id="product_features_id" />
		                    <input type="hidden" name="product_features_data_id" id="product_features_data_id" />

		                    <button type="submit" name="pageBtn" id="pageBtn" class="btn btn-primary">Submit</button>
		                </div>
		            </div>

	    	</form>
	    
	</div>
	<!-- Feature Popup -->

	<!-- <div class="row pa-0 ma-0"> -->
	    <div class="span">
	        <div class="table-wrap">
	            <div class="table-responsive">
					@include('products::productfeatures/view_features_data')
				</div>
			</div>
		</div>
	<!-- </div> -->
</div>

<!-- <script type="text/javascript" src="{{URL::to('/')}}/vendor/unisharp/laravel-ckeditor/ckeditor.js"></script> -->

<script type="text/javascript">
//     CKEDITOR.replace('feature_content', {
//     height: ['180px']
// });
//     CKEDITOR.config.allowedContent = true;
</script>

<style type="text/css">
.modal-dialog
{
	max-width: 80% !important;
}
</style>

<script src="{{URL::to('/')}}/public/modulejs/product/eCommerce.js"></script>
@endsection