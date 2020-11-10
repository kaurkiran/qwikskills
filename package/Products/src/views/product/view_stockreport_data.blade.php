<?php
/**
 * Created by PhpStorm.
 * User: Hemaxi
 * Date: 26/3/19
 * Time: 10:18 AM
 */

?>
@foreach($product AS $productkey=>$product_value)
<?php 
if ($productkey % 2 == 0) {
    $tblclass = 'even';
} else {
    $tblclass = 'odd';
}
    $sr   = $productkey + 1;

    if(isset($product_value->category_id) && $product_value->category_id!=null || $product_value->category_id!='') 
    {
        $category_name   =   $product_value->category->category_name;   
    }
    else
    {
        $category_name  = '- - - -';
    }
    if(isset($product_value->brand_id) && $product_value->brand_id!=null || $product_value->brand_id!='') 
    {
        $brand_name   =   $product_value->brand->brand_type;   
    }
    else
    {
        $brand_name  = '- - - -';
    }

    if(isset($product_value->sku_code) && $product_value->sku_code!=null || $product_value->sku_code!='') 
    {
        $sku_code   =   $product_value->sku_code;   
    }
    else
    {
        $sku_code  = '- - - -';
    }
    $opening   =   $product_value->totalinwardqty - $product_value->totalsoldqty;
    $stock     =   $opening +$product_value->currentinward -$product_value->currentsold;
    $todayinward  = $product_value->currentinward != '' ?$product_value->currentinward : 0;
    $todaysold    = $product_value->currentsold != '' ?$product_value->currentsold : 0;

    if($product_value->averagemrp !='')
    {
        $averagemrp   = $product_value->averagemrp;
    }
    else
    {
        $averagemrp    =  $product_value->offer_price != '' ?$product_value->offer_price : 0;
    }
    
    $totalmrpvalue  =  $averagemrp * $stock;
 ?>
 <tr id="{{$product_value->product_id}}" class="<?php echo $tblclass ?>">
    <td style="text-align:center !important;">{{$sr}}</td>
    <td style="text-align:left !important;">{{$product_value->product_system_barcode}}</td>
    <td style="text-align:left !important;">{{$product_value->product_name}}</td>
    <td style="text-align:left !important;">{{$sku_code}}</td>
    <td style="text-align:left !important;">{{$category_name}}</td>
    <td style="text-align:left !important;">{{$brand_name}}</td>
    <td style="text-align:right !important;">{{round($averagemrp,2)}}</td>
    <td style="text-align:right !important;" class="bold">{{$opening}}</td>
    <td style="text-align:right !important;">{{$todayinward}}</td>
    <td style="text-align:right !important;">{{$todaysold}}</td>
    <td style="text-align:right !important;">0</td>
    <td style="text-align:right !important;">0</td>
    <td style="text-align:right !important;">0</td>
    <td style="text-align:right !important;" class="bold">{{$stock}}</td>
    <td style="text-align:right !important;" class="bold">{{round($totalmrpvalue,2)}}</td>
<tr>
@endforeach
 <td colspan="16" align="center">
       {!! $product->links() !!}
    </td>
</tr>
<script type="text/javascript">
$(document).ready(function(e){
 
    $('.totalproducts').html({{$count}});
    $('.opening').html({{$totopening}});
    $('.totalinwardqty').html({{$currinward}});
    $('.totalsoldqty').html({{$currsold}});
    $('.totalinstock').html({{$totstock}});
   
});
</script>
