<?php

?>
<div class="row ml-0" style="margin:10px 0 0 20px !important;">
    <input type="hidden" name="product_id" id="product_id" value="">
    <input type="hidden" name="type" id="type" value="">
    <input type="hidden" name="excel_file_type" id="excel_file_type" value="">
    <input type="hidden" name="encoded_product_id" id="encoded_product_id" value="">

    <div class="span12">
        
            <div class="span12 product_name_card">
               
                        <div class="row">
                            <div class="span3">
                                <label class="form-label">Product Name</label>
                                <input class="form-control form-inputtext invalid" value="" name="product_name"
                                       id="product_name" type="text" placeholder=" ">
                            </div>
                            <div class="span3" >
                                <label class="form-label">Product Code</label>
                                <input class="form-control form-inputtext" value="" maxlength="" autocomplete="off" type="text" name="product_code" id="product_code" placeholder=" ">
                            </div>
                            <div class="span3">
                                <label class="form-label">Description</label>
                                <input class="form-control form-inputtext" value="" maxlength="" autocomplete="off" type="text" name="product_description" id="product_description" placeholder=" ">
                                <!-- <textarea name="product_description" id="product_description" class="form-control"></textarea> -->
                            </div>
                        </div>
                   
            </div>


</div>



    
        <div class="span12" style="margin:0 0 0 -30px;">
           
                  

                    <div class="appendfeature">
                        <div class="row" id="featurerow_1" style="margin:0">
                            <input type="hidden" name="product_features_relationship_id_1" id="product_features_relationship_id_1" value="">
                            <!-- $product_features[1]['parent'] -->
                         @foreach($product_features AS  $product_features_key=>$product_features_value)
                            <div class="span2">
                                    <label class="form-label">{{$product_features_value->product_features_name}}</label>
                                <select class="form-control form-inputtext <?php echo $product_features_value['html_id'].'_p_'.$product_features_value['product_features_id']?>" id="{{$product_features_value->html_id}}_p_1" name="{{$product_features_value->html_name}}[]" value="" onchange="changeover('{{$product_features_value['product_features_id']}}','{{$product_features_value->html_id}}_p_1','1')" placeholder="">
                                    <option value="">Select {{$product_features_value->product_features_name}}</option>
                                    @foreach($product_features_value->product_features_data->sortBy('product_features_data_value') AS  $kk=>$vv)
                                        <option value="{{$vv->product_features_data_id}}">{{$vv->product_features_data_value}}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="span1 mt-25">
                                 <a id="addproductfeatures" style="" onclick="opendynamicpopup(
                                    '<?php
                                 echo $product_features_value['product_features_id']
                                 ?>','<?php echo  $product_features_value['product_features_name']?>','1')" class=" addmoreoption"><i class="fa fa-plus plusaddmore btn-success" style="padding:3px 5px; margin:0 0 0 -17px;"></i></a>
                                 <input type="hidden" name="test_dynamic_name_<?php
                                 echo $product_features_value['product_features_id']
                                 ?>" id="test_dynamic_name_<?php
                                 echo $product_features_value['product_features_id']
                                 ?>" value="<?php echo $product_features_value['html_id']?>">
                            </div>
                         @endforeach
                            <div class="span2 supp_barcode_col" style="display:none;">
                                <label class="form-label"><span class="kitbarcodelabel">Supplier</span> Barcode</label>
                                <input class="form-control form-inputtext" value=" " autocomplete="off"
                                       type="text" name="supplier_barcode[]" id="supplier_barcode"
                                       placeholder=" ">
                            </div>

                        </div>
                        </div>

                    <?php

                    // echo '<pre>';
                    // print_r($product_features);
                    // echo '</pre>';

                    if(isset($product_features) && !empty($product_features) && count($product_features) > 0) { ?>
                    <!-- <div class="span1 multifeacls" style="float: right;cursor: pointer">
                        <label class="form-label"><b></b></label>
                        <span title="Click to add more product variation" id="add_multi_feature"><b style="color: red">VARIANT</b><i class="fa fa-plus"></i></span>
                    </div> -->
                    <?php } ?>
                    <div class="row pr_barcode_row" style="margin:5px 0 0 32px;">                       
                      
                            
                        <div class="span3" style="display:none;">
                            <label class="form-label">Product System Barcode</label>
                            <input class="form-control form-inputtext notallowinput"
                                   value="{{$system_barcode_final}}" maxlength="10" autocomplete="off"
                                   type="text" name="product_system_barcode" id="product_system_barcode"
                                   placeholder=" ">
                        </div>
                        <div class="span3">
                            <label class="form-label">Product Price</label>
                            <input class="form-control form-inputtext number" value="0" maxlength="10" autocomplete="off" type="text" name="offer_price" id="offer_price" placeholder=" ">
                        </div>
                        <div class="span3">
                            <label class="form-label"><input type="checkbox" id="checkconsumption" name="checkconsumption" value="1">&nbsp;has Consumption?</label>
                            <div class="consumption_section" style="display:none;">                            
                            <input type="text" id="consumption_value" name="consumption_value" value="" class="form-control form-inputtext">
                        </div>
                        </div>
                      
                        <div class="span3">
                            <label class="form-label"><input type="checkbox" id="checktax" name="checktax" value="1">&nbsp;Tax Applicable?</label>
                            <div class="tax_section" style="display:none;">
                            <?php
                            if(sizeof($tax_master) != 0)
                            {
                               foreach($tax_master as $tax_key=>$tax_value)
                                {
                                    ?><input type="radio" id="select_tax_id_{{$tax_value['taxmaster_id']}}" name="select_tax_id" value="{{$tax_value['taxmaster_id']}}|{{$tax_value['tax_value']}}">&nbsp;{{$tax_value['tax_title']}}&nbsp;({{$tax_value['tax_value']}}%)<br><?php
                                } 
                            }
                            
                            ?>
                            <input type="hidden" id="taxmaster_id" name="taxmaster_id" value="">
                            <input type="hidden" id="sell_gst_percent" name="sell_gst_percent" value="0">
                        </div>
                        </div>
                      
                        <div class="span3" style="display:none;">
                            <label class="form-label">Low Stock Alert</label>
                            <input type="text" maxlength="10" class="form-control form-inputtext number" name="alert_product_qty" id="alert_product_qty" value="">
                        </div>

                        <div class="span3" style="display:none;">
                            <label class="form-label">MOQ (Minimum Order Quantity)</label>
                            <input type="text" maxlength="10" class="form-control form-inputtext number" name="default_qty" id="default_qty" value="">
                        </div>

                        <div class="span3 mb-20 eanBox" style="display:none;">
                            <label class="form-label font-16"><b>Use Ean Barcode?</b>
                            <input type="checkbox" name="eanYesNo" id="eanYesNo" value="1"></label>
                        </div>
                       <!-- Save stock qty fom inward 29-5-2020 by Vrunda -->
                        <div class="span3 mb-20 stock_qty stock_qty_box" style="display: none">
                            <label class="form-label font-16"><b>Stock Qty</b>
                            <input type="text" maxlength="10" class="form-control form-inputtext number" name="product_stock_qty" id="product_stock_qty" value="">
                        </div>
                        <!-- End save stock qty fom inward 29-5-2020 by Vrunda -->

                        <div class="span12" style="margin:5px 0 0 25px ;">
                            <div class="row" id="imageblock">
                                <div class="span2 block_1" style="background:none; border:0;" class="previews">
                                    <label class="form-label">Product Image Caption</label>
                                    <input type="text" name="imageCaption[]" class="form-control form-inputtext" id="imageCaption_1" placeholder="" /></div>
                                        <div class="span2 block_1" style="background:none; border:0;">
                                            <div class="form-group">
                                                <label class="form-label">Product Image</label>
                                                <input type="file" onchange="previewandvalidation(this);" data-counter="1" accept=".png, .jpg, .jpeg" name="product_image[]" id="product_image_1" class="form-control form-inputtext productimage" value="">
                                                <div id="preview_1" class="previews" style="display: none">
                                                    <a onclick="removeimgsrc('1');" class="displayright"><i class="fa fa-remove" style="font-size: 20px;"></i></a>
                                                    <img src="" id="product_preview_1" name="product_preview_1" width="" height="150px">
                                                </div>
                                            </div>
                                        </div>
                                <a id="addmoreimg" class=" addmoreoption"><i class="fa fa-plus plusaddmore"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="row pa-0" id="EditImagesBlock" style="display:none;"></div>
              
      
    
</div>
</label></div>


<script type="text/javascript">

$(document).ready(function(e){
    $('#eanYesNo').click(function(e){
        if($('input[name="eanYesNo"]').is(':checked'))
        {
          // checked
          $('#supplier_barcode').prop('readonly',true);
        }
        else
        {
          $('#supplier_barcode').prop('readonly',false);
         // unchecked
        }
    });





})


</script>
