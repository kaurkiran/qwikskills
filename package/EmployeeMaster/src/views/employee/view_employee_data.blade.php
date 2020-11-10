<?php

// echo '<pre>'; print_r($result); 

if(sizeof($result)!=0)
{
    function truncate1($str, $length = 125, $append = '...')
    {
        if (strlen($str) > $length) {
            $delim = "~\n~";
            $str = substr($str, 0, strpos(wordwrap($str, $length, $delim), $delim)) . $append;
        }
        return $str;
    }
?>

@foreach($result AS $resultkey => $value)

<?php


    $is_active        =   $value->is_active;

    if($is_active==1)
    {
        $active     =   'Active';
        $class      =   'GreenBackground';
    }
    elseif($is_active==0)
    {
        $active     =   'Inactive';
        $class      =   'RedBackground';
    }

    if($value->employee_picture!='')
    {
        $employee_picture    =   EMPLOYEE_IMAGE_URL.$value->employee_picture;
    }
    else
    {
        $employee_picture    =   'dist/img/img-thumb.jpg';
    }

    if($value->employee_duties!='')
    {
        $duties     =   '<button type="button" class="pa-0 ma-0 pull-right bold" style="font-size:10px;" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" title="" data-content="'.$value->employee_duties.'"><i class="fa fa-eye cursor"></i></button>';
    }
    else
    {
        $duties     =   '';
    }

    if($value->employee_skills!='')
    {
        $skills     =   '<button type="button" class="pa-0 ma-0 pull-right bold" style="font-size:10px;" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" title="" data-content="'.$value->employee_skills.'"><i class="fa fa-eye cursor"></i></button>';
    }
    else
    {
        $skills     =   '';
    }

    if($value->employee_remarks!='')
    {
        $remarks     =   '<button type="button" class="pa-0 ma-0 pull-right bold" style="font-size:10px;" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" title="" data-content="'.$value->employee_remarks.'"><i class="fa fa-eye cursor"></i></button>';
    }
    else
    {
        $remarks     =   '';
    }
    $employee_address= '';
    if($value['employee_address']!='' && $value['employee_address']!=NULL)
    {
        $employee_address   .=   $value['employee_address'].',';
    }
    if($value['employee_area']!='' && $value['employee_area']!=NULL)
    {
        $employee_address   .=   $value['employee_area'].',';
    }
    if($value['employee_city_town']!='' && $value['employee_city_town']!=NULL)
    {
        $employee_address   .=   $value['employee_city_town'].',';
    }
    if($value['employee_zipcode']!='' && $value['employee_zipcode']!=NULL)
    {
        $employee_address   .=   $value['employee_zipcode'].',';
    }
    $employee_address = substr($employee_address, 0,-1);
?>

<tr id="">
<td>

    <?php

    if($role_permissions['permission_edit']==1)
    {
        ?>
        <button class="btn btn-icon btn-icon-only ma-0 btn-secondary btn-icon-style-4"
        onclick="changePassword(({{$value->user_id}}))" title="Change Password"><i class="fa fa-lock"></i></button>
        <button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="editEmployee(({{$value->user_id}}))"title="edit employee"><i class="fa fa-pencil"></i></button>
        <?php
    }
    ?>

    <?php
    if($role_permissions['permission_delete']==1)
    {
        ?>
        <button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="deleteEmp({{$value->user_id}})" title="delete employee"><i class="fa fa-trash"></i></button>
        <?php
    }

    ?>

    <button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="showResume({{$value->user_id}})" data-toggle="modal" data-target="#showResume" title="view employee profile"><i class="fa fa-eye cursor"></i></button>
</td>

<td class="leftAlign pa-10 cursor" onclick="showResume({{$value->user_id}})">{{$value->employee_firstname}} {{$value->employee_middlename}} {{$value->employee_lastname}}
<br /><small class="bold greencolor">{{$value->employee_designation}}</small></td>
<td class="leftAlign">{{$value->employee_mobileno}}</td>
<td class="leftAlign">{{$value->email}}</td>
<td class="center">{{$employee_address}}</td>
<td class="leftAlign"><span class="badge badge-secondary mt-15 mr-0 cursor"
    onclick="SetRole(({{$value->user_id}}))">{{$value['employee_role_id']!='' && $value['employee_role_id']!=NULL ? $value->employee_role['role_name'] :''}} <i class="fa fa-eye cursor"></i></span></td>
<td class="center">{{date('d-m-Y', strtotime($value->employee_joiningdate))}}</td>
<td class="center {{$class}} bold cursor" id="status{{$value->user_id}}" onclick="changeStatus({{$value->user_id}});">{{$active}}&nbsp;&nbsp;&nbsp;</td>
</tr>

@endforeach

<?php 
} else { ?>
<tr><td colspan="12" class="leftAlign">No result found...</td></tr>
<?php }?>

<?php if(!empty($resultkey)){

    ?>
<script type="text/javascript">
$(document).ready( function(e){

    var search_store_id     =   $('#search_store_id').val();

    if(search_store_id!='')
    {
        $('.searchStoreName').show();
    }
    else
    {
        $('.searchStoreName').hide();
    }

    $('.PagecountResult').html('<?php echo ($resultkey+1)?>');

    var standard_emp_limit  =   '<?php echo @$software['standard_emp_limit'];?>';
    var countEmp            =   '<?php echo ($resultkey+1)?>';
    if(Number(standard_emp_limit)<=Number(countEmp))
    {
        $('.AlertEmpMessage').show();
        // $('.AddNewEmpBtn').hide();
    }
    else
    {
        $('.AlertEmpMessage').hide();
        // $('.AddNewEmpBtn').show();
    }

    $(".PagecountResult").addClass("itemfocus");

});
</script>
<?php }?>