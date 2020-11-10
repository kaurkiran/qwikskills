<?php
/**
 * Created by PhpStorm.
 * User: retailcore
 * Date: 18/3/19
 * Time: 5:39 PM
 */
?>
@foreach($service AS $servicekey=>$service_value)
    <?php if($servicekey % 2 == 0)
    {
        $tblclass = 'even';
    }
    else
    {
        $tblclass = 'odd';
    }
    ?>
    <tr id="{{$service_value->product_id}}" class="<?php echo $tblclass ?>">
        <td><input type="checkbox" name="delete_room[]" value="{{$service_value->product_id }}" id="delete_room_{{$service_value->product_id }}"></td>
        <td ondblclick="editservice('{{encrypt($service_value->product_id)}}');" >{{$service_value->supplier_barcode}}</td>
        <td>{{$service_value->product_description}}</td>
        <td style="text-align: right;padding-right: 100px;">{{$service_value->selling_price}}</td>
        <td style="text-align: right;padding-right: 100px;">{{$service_value->sell_gst_percent}}</td>
        <td style="text-align: right;padding-right: 100px;">{{$service_value->sell_gst_amount}}</td>
        <td style="text-align: right;padding-right: 100px;" >{{$service_value->product_mrp}}</td>
        <td>{{$service_value->hsn_sac_code}}</td>
    </tr>
@endforeach
<tr>
    <td colspan="8" class="paginateui">
        {!! $service->links() !!}
    </td>
</tr>