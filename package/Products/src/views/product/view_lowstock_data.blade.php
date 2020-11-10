<?php
$show_dynamic_feature = '';
$footer_cnt =  0;
?>

<table class="table tablesaw table-bordered table-hover table-striped mb-0 tablesaw-stack tablesaw-sortable">
    <thead>
        <tr class="blue_Head">
            <?php
             if(sizeof($get_store)!=0)
             {
             ?>  
            <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="persist">Location</th>
            <?php
            }
            ?>
        <th class="pa-10">Barcode</th>
        <th>Product Name</th>
        <th>Pcode</th>

            <?php
            if (isset($product_features) && $product_features != '' && !empty($product_features))
            {
            foreach ($product_features AS $feature_key => $feature_value)
            {
            if ($feature_value['show_feature_url'] != '' && $feature_value['show_feature_url'] != 'NULL' && $feature_value['show_feature_url'] != null)
            {
            $search =$urlData['breadcrumb'][0]['nav_url'];

            if (strstr($feature_value['show_feature_url'],$search))
            {
            if($show_dynamic_feature == '')
            {
                $show_dynamic_feature =$feature_value['html_id'];
            }
            else
            {
                $show_dynamic_feature = $show_dynamic_feature.','.$feature_value['html_id'];
                $footer_cnt++;
            }
            ?>

            <th><?php echo $feature_value['product_features_name']?></th>
            <?php } ?>
            <?php

            }
            }
            }
            ?>

        <th>UQC</th>
        <th>In Stock</th>
        <th>Stock Alert</th>
        </tr>
    </thead>
    <tbody id="searchResult">

<?php
if(sizeof($lowStock) != 0)
{

?>

    @foreach($lowStock AS $key=>$value)
    <?php

    $barcode    =   $value->supplier_barcode==''?$value->product_system_barcode:$value->supplier_barcode;

    $feature_show_val = "";
    if($show_dynamic_feature != '')
    {
        $feature = explode(',',$show_dynamic_feature);

        foreach($feature AS $fea_key=>$fea_val)
        {
            $feature_show_val .= '<td>'.$value[$fea_val].'</td>';
        }
    }

    ?>
    <tr>
        <?php
         if(sizeof($get_store)!=0)
         {
         ?> 
         <td>{{$companyname}}</td>
         <?php
         }
         ?>

        <td class="leftAlign pa-5">{{$barcode}}</td>
        <td class="leftAlign pa-5">{{$value->product_name}}</td>
        <td class="leftAlign pa-5">{{$value->product_code}}</td>
        <?php

        echo $feature_show_val;

        ?>
        <td class="leftAlign pa-5">{{$value['uqc']==''?'':$value['uqc']->uqc_name}}</td>
        <td class=" pa-5">{{$value->totalstock==''?0:$value->totalstock}}</td>
        <td class=" pa-5">{{$value->alert_product_qty}}</td>
    </tr>

    @endforeach
    <tr>
 <td colspan="<?php echo $footer_cnt + 7?>" align="center">
       {!! $lowStock->links() !!}
    </td>
</tr>

<?php
}
else
{
    ?>
    <tr>
        <td colspan="<?php echo $footer_cnt + 7?>">no result found...</td>
    </tr>
    <?php
}
?>
   </tbody>
</table>

<input type="hidden" name="hidden_page" id="hidden_page" value="1" />
<input type="hidden" name="hidden_column_name" id="hidden_column_name" value="product_id" />
<input type="hidden" name="hidden_sort_type" id="hidden_sort_type" value="DESC" />
<input type="hidden" name="fetch_data_url" id="fetch_data_url" value="search_lowstock" />
<script type="text/javascript">
    $(".PagecountResult").html('{{$lowStock->total()}}');
    $(".PagecountResult").addClass("itemfocus");

</script>