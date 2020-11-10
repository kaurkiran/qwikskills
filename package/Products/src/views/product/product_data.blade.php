<?php
/**
 * Created by PhpStorm.
 * User: Hemaxi
 * Date: 9/3/19
 * Time: 2:45 PM
 */
$tax_label = 'GST';
$tax_currency= '(&#8377)';
if($nav_type[0]['tax_type'] == 1)
{
    $tax_label = $nav_type[0]['tax_title'];
    $tax_currency = '('.$nav_type[0]['currency_title'].')';
}
?>

<table id="productrecordtable" class="table tablesaw table-bordered table-hover table-striped mb-0 font14" data-tablesaw-sortable data-tablesaw-sortable-switch data-tablesaw-no-labels>

<thead>
<tr class="blue_Head ">
    <th scope="col" class="tablesaw-swipe-cellpersist"  width="10%">
        <div class="custom-control custom-checkbox checkbox-primary">
            <input type="checkbox" class="custom-control-input" id="checkallproduct" name="checkallproduct" >
            <label class="custom-control-label" for="checkallproduct"></label>
        </div>
    </th>
    <th scope="col" class="tablesaw-swipe-cellpersist center"  data-tablesaw-priority="persist"></th>
    <!-- <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist" >System Barcode<span id="product_system_barcode_icon"></span></th> -->
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Product Name<span id="product_name_icon"></span></th>
    <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="22">Product Code</th>
     @foreach($product_features AS $product_featureskey=>$product_features_value)
      <th scope="col" data-tablesaw-sortable-col >{{$product_features_value['product_features_name']}}</th>
      @endforeach
      <th scope="col" class="with_calculation rightAlign" data-tablesaw-sortable-col data-tablesaw-priority="19">Offer Price <?php echo $nav_type[0]['currency_title']; ?></th>
     <th scope="col" class="with_calculation rightAlign" data-tablesaw-sortable-col data-tablesaw-priority="19">Tax(%)</th>
    
    <th scope="col" class="rightAlign" data-tablesaw-sortable-col data-tablesaw-priority="23">Consumption value</th>
    </tr>
</thead>
<tbody id="productsalldata">

@foreach($product AS $productkey=>$product_value)
<?php if($productkey % 2 == 0)
{
    $tblclass = 'even';
}
else
{
    $tblclass = 'odd';
}

if(isset($product_value->product_image_) && $product_value->product_image_['product_image']!='')
{
    $product_image = default_product_image_url.'img-thumb.jpg';
    if(file_exists(PRODUCT_IMAGE_URL.$product_value->product_image_['product_image']))
    {
        $product_image = PRODUCT_IMAGE_URL.$product_value->product_image_['product_image'];
    }
}
else
{
    $product_image = default_product_image_url.'img-thumb.jpg';
}
//when product not in used this product row showing with different colour.it is easy for client to checkout which product is in used and which is not.
$css_style = '';
 if($product_value['delete_option'] == 1 && $role_permissions['permission_delete'] == 1 && $product_value['company_id'] == $nav_type[0]['company_id']) {
      $css_style = 'style=background:#FFB6C1';
 }

?>
<tr id="{{$product_value->product_id}}"  class="<?php echo $tblclass ?>">
    <td class="center">
         <?php if($product_value['delete_option'] == 1 && $role_permissions['permission_delete'] == 1 && $product_value['company_id'] == $nav_type[0]['company_id']) {?>
        <input type="checkbox" name="delete_product[]" value="{{$product_value->product_id }}" id="delete_product_{{$product_value->product_id }}">
        <?php } else {?>

             <button type="button" class="pa-0 ma-0  bold" style="font-size:10px;"  data-trigger="focus" data-placement="top" data-toggle="popover"  title="" data-content="This product cannot be deleted as this record is associated with other records or transactions." >
             <i class="fa fa-eye cursor"></i></button>
             <?php } ?>
        <?php
        if($role_permissions['permission_edit']==1 && $product_value['company_id'] == $nav_type[0]['company_id'])
        {
        ?>
            <a onclick="return editproduct('{{encrypt($product_value->product_id)}}');"><button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4">
            <i class="fa fa-edit" title="Edit Product"></i></button></a>
        <?php
        }
        ?>

         <?php if($product_value['delete_option'] == 1 && $role_permissions['permission_delete'] == 1 && $product_value['company_id'] == $nav_type[0]['company_id']) {?>
            <a id="delete_separate_product" onclick="return delete_separate_product(this,'{{$product_value->product_id}}',event);"><button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4">
            
                <i class="fa fa-trash" title="Delete Product"></i></button></a>
           <?php } ?>

             <?php if($product_value['delete_option'] == 0) { ?>
        <a title="Dependent Record" class="dependent_record" onclick="return dependent_record(this);"  data-id="{{encrypt($product_value->product_id)}}" data-url="product_dependency">
        <i class="fa fa-link" aria-hidden="true"></i>
           <?php } ?>

    </td>
    <td class="leftAlign"><div class="media-img-wrap d-flex mr-10 cursor" onclick="productImages('{{$product_value->product_id}}')">
    <div class="avatar"><img src="{{$product_image}}" class="img-fluid img-thumbnail" alt="img" style="width:50px !important;"></div>
</div></td>
    <?php
    $item_type = 'Regular';
    $tooltip = "Common Barcode no. for all stock quantity of product. For example: Product ABC with barcode no. 123456 and 100 qty in stock; all stock qty will have SAME barcode no. 123456";
    if($product_value['item_type'] == 2)
        {
            $item_type = 'Service';
            $tooltip = "";
        }
    if($product_value['item_type'] == 3)
    {
        $item_type = 'Unique';
        $tooltip = "Unique Barcode no. for each stock quantity of product. For example: Product XYZ with barcode no. 987654 and 100 qty in stock; each stock qty of this product will have UNIQUE & DIFFERENT barcode no. similar to serial no. such as 987654, 987655, 987656 and so on.";
    }

    ?>
    
    <!-- <td class="leftAlign" >{{$product_value->product_system_barcode}}</td> -->
    <td class="leftAlign">{{$product_value->product_name}}</td>    
    <td class="leftAlign">{{$product_value->product_code}}</td>

    @foreach($product_features AS $product_featureskey=>$product_features_value)
        <?php
        $feature_name_value = '';
        $dynamic_name =$product_features_value['html_id'];

        if(isset($product_value[$dynamic_name]))
            {
                $feature_name_value = $product_value[$dynamic_name];
            }
           ?>
            <td class="leftAlign"><?php echo $feature_name_value ?></td>
      @endforeach

    
    <td class="rightAlign with_calculation">{{number_format($product_value->offer_price,$nav_type[0]['decimalpoints_forview'])}}</td>
    <td class="rightAlign with_calculation"><?php echo $product_value['taxmaster_id']!='' && $product_value['sell_gst_percent']!=NULL ? $product_value['taxmaster']['tax_title'].'('.$product_value['sell_gst_percent'].'%)' : '-'; ?></td>
    <td class="rightAlign">{{$product_value['consumption_value']!='' && $product_value['consumption_value']!=NULL && $product_value['consumption_value']!=0 ? $product_value['consumption_value'] : ''}}</td>

</tr>
@endforeach
<tr>
    <td colspan="28" class="paginateui">
        {!! $product->links() !!}
    </td>
</tr>
</tbody>
    </table>
    <input type="hidden" name="hidden_page" id="hidden_page" value="1" />
    <input type="hidden" name="hidden_column_name" id="hidden_column_name" value="product_id" />
    <input type="hidden" name="hidden_sort_type" id="hidden_sort_type" value="desc" />
    <input type="hidden" name="fetch_data_url" id="fetch_data_url" value="product_fetch_data" />


    <!--<script src="{{URL::to('/')}}/public/dist/js/tablesaw-data.js"></script>-->
<script>
    var system_barcode_final = '<?php echo $system_barcode_final?>';


    <?php
    if($nav_type[0]['product_calculation'] == 3)
        { ?>
        $(".with_calculation").hide();
     <?php } else { ?>
     $(".with_calculation").show();
     <?php } ?>

    $('.PagecountResult').html('{{$product->total()}}');
    $(".PagecountResult").addClass("itemfocus");
    $("#product_system_barcode").val(system_barcode_final);

    if('{{$product->total()}}' != 0)
    {
        $("#deleteproduct").show();
    }

    <?php if(strpos($nav_type[0]['product_item_type'],',') == true) { ?>
        $(".itemtypeshow").show();
    <?php } ?>
</script>
