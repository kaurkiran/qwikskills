<?php

// echo '<pre>'; print_r($get_store); exit;

if(sizeof($get_store)!=0)
{
    function truncate($str, $length = 125, $append = '...')
    {
        if (strlen($str) > $length) {
            $delim = "~\n~";
            $str = substr($str, 0, strpos(wordwrap($str, $length, $delim), $delim)) . $append;
        }
        return $str;
    }
    
    ?>
    @foreach($get_store AS $storeKey => $storevalue)

        <h4 class="mb-10 mt-10"><i class="fas fa-store"></i>&nbsp;<?php echo ucwords($storevalue['company_profile']['full_name'])?> <small><span class="StorecountResult<?php echo $storevalue['company_profile']['company_profile_id']?>"></span></small></h4>

        <table class="table tablesaw table-bordered table-hover table-striped mb-40"   data-tablesaw-sortable data-tablesaw-minimap data-tablesaw-mode-switch>
            <thead >
                <tr class="blue_Head">
                    <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="1" class="">&nbsp;&nbsp;Action</th>
                    <th >&nbsp;</th>
                    <th class="pa-10 leftAlign" scope="col" data-tablesaw-sortable-col data-tablesaw-priority="2">Name<br><small>Designation</small></th>
                    <th class="leftAlign" scope="col" data-tablesaw-sortable-col data-tablesaw-priority="3">Mobile No.</th>
                    <th>Email</th>
                    <th class="leftAlign" scope="col" data-tablesaw-sortable-col data-tablesaw-priority="4">Permission&nbsp;&nbsp;</th>
                    <th class="leftAlign" scope="col" data-tablesaw-sortable-col data-tablesaw-priority="5">Duties</th>
                    <th class="leftAlign" scope="col" data-tablesaw-sortable-col data-tablesaw-priority="6">Skills</th>
                    <th scope="col" data-tablesaw-sortable-col data-tablesaw-priority="7" class="leftAlign">Remarks</th>
                    <th class="center" scope="col" data-tablesaw-sortable-col data-tablesaw-priority="8">Joining Date</th>
                    <th class="center" scope="col" data-tablesaw-sortable-col data-tablesaw-priority="9">Status</th>

                </tr>
            </thead>
            <tbody>

        <?php
            if(sizeof($storevalue['storeUsers'])!=0) 
            {
        ?>     

        @foreach($storevalue['storeUsers'] AS $storeUserKey => $storeUserValue)

            <?php
               
            
                $is_active        =   $storeUserValue->is_active;

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

                if($storeUserValue->employee_picture!='')
                {
                    $employee_picture    =   EMPLOYEE_IMAGE_URL.$storeUserValue->employee_picture;
                }
                else
                {
                    $employee_picture    =   'dist/img/img-thumb.jpg';
                }

                if($storeUserValue->employee_duties!='')
                {
                    $duties     =   '<button type="button" class="pa-0 ma-0 pull-right bold" style="font-size:10px;" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" title="" data-content="'.$storeUserValue->employee_duties.'"><i class="fa fa-eye cursor"></i></button>';
                }
                else
                {
                    $duties     =   '';
                }

                if($storeUserValue->employee_skills!='')
                {
                    $skills     =   '<button type="button" class="pa-0 ma-0 pull-right bold" style="font-size:10px;" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" title="" data-content="'.$storeUserValue->employee_skills.'"><i class="fa fa-eye cursor"></i></button>';
                }
                else
                {
                    $skills     =   '';
                }

                if($storeUserValue->employee_remarks!='')
                {
                    $remarks     =   '<button type="button" class="pa-0 ma-0 pull-right bold" style="font-size:10px;" data-container="body" data-trigger="focus" data-toggle="popover" data-placement="top" title="" data-content="'.$storeUserValue->employee_remarks.'"><i class="fa fa-eye cursor"></i></button>';
                }
                else
                {
                    $remarks     =   '';
                }

            ?>

                <tr>
                <td>

                    <?php

                    if($role_permissions['permission_edit']==1)
                    {
                        ?>
                        <button class="btn btn-icon btn-icon-only ma-0 btn-secondary btn-icon-style-4"
                        onclick="changePassword(({{$storeUserValue->user_id}}))" title="Change Password"><i class="fa fa-lock"></i></button>
                        <button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="editEmployee(({{$storeUserValue->user_id}}))"title="edit employee"><i class="fa fa-pencil"></i></button>
                        <?php
                    }
                    ?>

                    <?php
                    if($role_permissions['permission_delete']==1)
                    {
                        ?>
                        <button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="deleteEmp({{$storeUserValue->user_id}})" title="delete employee"><i class="fa fa-trash"></i></button>
                        <?php
                    }

                    ?>

                    <button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="showResume({{$storeUserValue->user_id}})" data-toggle="modal" data-target="#showResume" title="view employee profile"><i class="fa fa-eye cursor"></i></button>
                </td>
                <td><div class="media-img-wrap d-flex mr-10 cursor" onclick="showResume({{$storeUserValue->user_id}})">
                    <div class="avatar"><img src="{{$employee_picture}}" class="img-fluid img-thumbnail" alt="img"></div>
                </div></td>
                <td class="leftAlign pa-10 cursor" onclick="showResume({{$storeUserValue->user_id}})">{{$storeUserValue->employee_firstname}} {{$storeUserValue->employee_middlename}} {{$storeUserValue->employee_lastname}}
                <br /><small class="bold greencolor">{{$storeUserValue->employee_designation}}</small></td>
                <td class="leftAlign">{{$storeUserValue->employee_mobileno}}</td>
                <td class="leftAlign">{{$storeUserValue->email}}</td>
                <td class="leftAlign"><span class="badge badge-secondary mt-15 mr-0 cursor"
                    onclick="SetRole(({{$storeUserValue->user_id}}))">{{$storeUserValue->employee_role['role_name']}} <i class="fa fa-eye cursor"></i></span></td>
                <td class="leftAlign"><?php echo truncate($storeUserValue->employee_duties, 40);?> <?php echo $duties; ?>&nbsp;&nbsp;&nbsp;</td>
                <td class="leftAlign"><?php echo truncate($storeUserValue->employee_skills, 40);?> <?php echo $skills; ?>&nbsp;&nbsp;&nbsp;</td>
                <td class="leftAlign"><?php echo truncate($storeUserValue->employee_remarks, 40);?> <?php echo $remarks; ?></td>
                <td class="center">{{date('d-m-Y', strtotime($storeUserValue->employee_joiningdate))}}</td>
                <td class="center {{$class}} bold cursor" id="status{{$storeUserValue->user_id}}" onclick="changeStatus({{$storeUserValue->user_id}});">{{$active}}&nbsp;&nbsp;&nbsp;</td>
                </tr>

            <script type="text/javascript">
            $(document).ready( function(e){
                $('.StorecountResult<?php echo $storevalue['company_profile']['company_profile_id']?>').html('<?php echo ($storeUserKey+1)?>');
                $('.StorecountResult<?php echo $storevalue['company_profile']['company_profile_id']?>').addClass("itemfocus");

            });
            </script>
            
        @endforeach

            <?php
            }
            else
            {
                ?>
                <tr><td colspan="11" class="leftAlign">no users...</td></tr>
                <?php
            }
            ?>

            </tbody>
        </table>


    

    @endforeach
    <?php
}
?>