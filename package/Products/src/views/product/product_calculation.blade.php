<?php
/**
 * Created by PhpStorm.
 * User: Hemaxi
 * Date: 9/3/19
 * Time: 2:45 PM
 */

 $tax_label = 'GST';

    if($nav_type[0]['tax_type'] == 1)
    {
        $tax_label = $nav_type[0]['tax_title'];
    }

?>

<div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-md-3 ">
                    <label class="form-label">Cost Rate</label>
                    <input class="form-control form-inputtext number" value="0" maxlength="10" autocomplete="off" name="cost_rate" id="cost_rate" type="text" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Cost <?php echo $tax_label?> %</label>
                    <input class="form-control form-inputtext number" value="0" maxlength="2" autocomplete="off" type="text" name="cost_gst_percent" id="cost_gst_percent" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Cost <?php echo $tax_label?> &#8377;</label>
                    <input class="form-control form-inputtext number notallowinput" tabindex="-1" style="color: black;font-size: 2rem;" value="0" maxlength="10"  autocomplete="off" type="text" name="cost_gst_amount" id="cost_gst_amount" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Cost Price</label>
                    <input class="form-control form-inputtext number notallowinput" tabindex="-1" style="color: black;font-size: 2rem;" value="0" maxlength="10" autocomplete="off" type="text" name="cost_price" id="cost_price" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Extra Charge</label>
                    <input class="form-control form-inputtext number"   value="0" maxlength="10" autocomplete="off" type="text" name="extra_charge" id="extra_charge" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Profit %</label>
                    <input class="form-control form-inputtext number" value="0" maxlength="10" autocomplete="off" type="text" name="profit_percent" id="profit_percent" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Profit &#8377;</label>
                    <input class="form-control form-inputtext number notallowinput" tabindex="-1" style="color: black;font-size: 2rem;" value="0" maxlength="10"  autocomplete="off" type="text" name="profit_amount" id="profit_amount" placeholder=" ">
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label class="form-label">Selling Rate</label>
                    <input  class="form-control form-inputtext number notallowinput" tabindex="-1" style="color: black;font-size: 2rem;" value="0" maxlength="10" autocomplete="off" type="text" name="selling_price" id="selling_price" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Sell <?php echo $tax_label?> %</label>
                    <input class="form-control form-inputtext number" value="0" maxlength="2" autocomplete="off" type="text" name="sell_gst_percent" id="sell_gst_percent" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Sell <?php echo $tax_label?> &#8377;</label>
                    <input class="form-control form-inputtext number notallowinput" tabindex="-1" style="color: black;font-size: 2rem;" value="0" maxlength="10"  autocomplete="off" type="text" name="sell_gst_amount" id="sell_gst_amount" placeholder=" ">
                </div>
            </div>
            <div class="row">
                <div class="col-md-3">
                    <label class="form-label">Offer Price</label>
                    <input class="form-control form-inputtext number" value="0" maxlength="10" autocomplete="off" type="text" name="offer_price" id="offer_price" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label" style="width: auto;">Product MRP</label><a href="#" data-toggle="tooltip" class="pa-0 ma-0  bold" style="font-size:20px;"   data-placement="top"   title="Profit is calculated on Offer Price, and not on MRP.  If you do not have Offer Price then you can keep Offer Price same as MRP." data-content="" class="" ><i class="fa fa-eye cursor"></i></a>
                    <input class="form-control form-inputtext number"   maxlength="10" autocomplete="off" type="text" name="product_mrp" id="product_mrp" placeholder=" ">
                </div>
                <div class="col-md-3">
                    <label class="form-label">Wholesale Price</label>
                    <input class="form-control form-inputtext number" value="0" maxlength="10" autocomplete="off" type="text" name="wholesale_price" id="wholesale_price" placeholder=" ">
                </div>
            </div>
            <div style="display: none" class="block_update_price edit-checkbox ">
                <input type="checkbox" class="mb-10" style="vertical-align: top" name="want_to_update" id="want_to_update" value="" ><span>Want To Update?</span>

                <div id="store_div"  class="edit-checkbox"></div>

                <select class="form-control form-inputtext mt-15 mr-15" style="width:25%;display: none" id="price_master_price" name="price_master_price">

                </select>
                <button type="button" name="update_pricein_all"  class="btn btn-info saveBtn mt-15" style="display: none" id="update_pricein_all" data-container="body" data-toggle="popover" data-placement="bottom" data-content="">Update Price in all data</button>
            </div>


        </div>
    </div>
<script type="text/javascript" src="{{URL::to('/')}}/public/bower_components/jquery/js/jquery.min.js"></script>
{{--<script src="{{URL::to('/')}}/public/modulejs/product/product_calculation.js"></script>--}}


<?php

if(isset($nav_type[0]['product_calculation']) && $nav_type[0]['product_calculation'] == 1)
{ ?>
<script src="{{URL::to('/')}}/public/modulejs/product/product_calculation.js"></script>
<?php }
if(isset($nav_type[0]['product_calculation']) && $nav_type[0]['product_calculation'] == 2)
{ ?>
<script src="{{URL::to('/')}}/public/modulejs/product/product_roundoff_calculation.js"></script>
<?php }
if(isset($nav_type[0]['product_calculation']) && $nav_type[0]['product_calculation'] == 4)
{ ?>
<script src="{{URL::to('/')}}/public/modulejs/product/product_reverce_calculation.js"></script>
<?php } ?>


