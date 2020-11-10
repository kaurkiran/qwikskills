// $('.addnewRole').on('click', function(e){
//     getRolePages();
// });

// $('#role_name').on('change', function(e){
//    // getRolePages();
//    console.log("innnnn");
// });

/* Change by hani for show permission page by pressing tab key and enter key */
$("#role_name").on('keydown', function(e) { 
  var keyCode = e.keyCode || e.which; 

  if (keyCode == 9 || keyCode == 13) { 
    
    e.preventDefault(); 
    var editEnable      =   $('#editEnable').val();

    if(editEnable=='')
    {
        getRolePages();
    }
  } 

});

function getRolePages()
{
    $('.roleForm').html('');
    var url = "getRole_Pages";
    var type = "GET";
    var dataType = "";
    var data = {};
    var form = '';

    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        // console.log(searchdata);
         if(searchdata['Success'] == "True")
         {
            // console.log(searchdata['data']);

            form    +=   '<table border="0" width="90%" class="font13" cellpadding="6" cellspacing="2">' +
                            '<tr>' +
                            '<td width="20%"></td>' +
                            '<td width="10%" bgcolor="#f3f3f3" class="center bold">View</td>' +
                            '<td width="10%" bgcolor="#f3f3f3" class="center bold">Add</td>' +
                            '<td width="10%" bgcolor="#f3f3f3" class="center bold">Edit</td>' +
                            '<td width="10%" bgcolor="#f3f3f3" class="center bold">Delete</td>' +
                            '<td width="10%" bgcolor="#f3f3f3" class="center bold">Download</td>' +
                            '<td width="10%" bgcolor="#f3f3f3" class="center bold">Print</td>' +
                            '<td width="10%" bgcolor="#f3f3f3" class="center bold">Upload</td>' +
                            '</tr>'+
                            '<tbody id="sproduct_detail_record">';

            $.each(searchdata['data'], function (key, value)
            {
                var moduleName  =   value['nav_display_name'];
                form +=     '<tr class="trborderbottom" id="module_'+value['home_navigation_id']+'">' +
                '<td bgcolor="#f3f3f3" class="rightAlign" class="pa-10" style="text-transform:uppercase;"><b class="redcolor">'+moduleName+'</b>&nbsp;&nbsp;<input type="checkbox" onclick="pagesCheck('+value['home_navigation_id']+')" name="ModuleName_'+value['home_navigation_id']+'" id="ModuleName_'+value['home_navigation_id']+'" value="'+value['home_navigation_id']+'">&nbsp;&nbsp;<input type="hidden" name="employee_role_permission_id" id="employee_role_permission_id'+value['home_navigation_id']+'" value="" /></td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">View</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Add</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Edit</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Delete</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Download</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Print</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Upload</td>' +
                '</tr>';

                $.each(value['home_navigations_data'], function (key, val)
                {
                    var PageName        =   val['nav_display_name'];
                    var option_view     =   val['option_view'];
                    var option_add      =   val['option_add'];
                    var option_edit     =   val['option_edit'];
                    var option_delete   =   val['option_delete'];
                    var option_export   =   val['option_export'];
                    var option_print    =   val['option_print'];
                    var option_upload   =   val['option_upload'];
                    
                    var style = '';
                    var pclass = '';
                    if(val['parent'] != 0)
                    {
                        style  = "style='color:#f00 !important;font-weight:bold !important;'";
                        pclass = 'id="parent_'+val['parent']+'"';
                    }
                    
                    if(Number(option_view)==1)
                    {
                        view    =   '<input type="checkbox" class="per_view_'+value['home_navigation_id']+'" name="view_'+val['home_navigation_data_id']+'" '+pclass+' onclick="indvCheck('+val['home_navigation_data_id']+','+value['home_navigation_id']+','+val['child']+')">';
                    }
                    else
                    {
                        view    =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_add)==1)
                    {
                        add     =   '<input type="checkbox" class="per_add_'+value['home_navigation_id']+'" name="add_'+val['home_navigation_data_id']+'">';
                    }
                    else
                    {
                        add     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_edit)==1)
                    {
                        edit     =   '<input type="checkbox" class="per_edit_'+value['home_navigation_id']+'" name="edit_'+val['home_navigation_data_id']+'">';
                    }
                    else
                    {
                        edit     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_delete)==1)
                    {
                        del     =   '<input type="checkbox" class="per_delete_'+value['home_navigation_id']+'" name="delete_'+val['home_navigation_data_id']+'">';
                    }
                    else
                    {
                        del     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_export)==1)
                    {
                        exprt     =   '<input type="checkbox" class="per_export_'+value['home_navigation_id']+'" name="export_'+val['home_navigation_data_id']+'">';
                    }
                    else
                    {
                        exprt     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_print)==1)
                    {
                        print     =   '<input type="checkbox" class="per_print_'+value['home_navigation_id']+'" name="print_'+val['home_navigation_data_id']+'">';
                    }
                    else
                    {
                        print     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_upload)==1)
                    {
                        upload     =   '<input type="checkbox" class="per_upload_'+value['home_navigation_id']+'" name="upload_'+val['home_navigation_data_id']+'">';
                    }
                    else
                    {
                        upload     =   '<input type="checkbox" class="" disabled name="">';
                    }
                    

                    form +=     '<tr class="trborderbottom" id="RoleValues_'+value['home_navigation_id']+'">' +
                    '<td bgcolor="#f3f3f3" class="rightAlign" '+style+' class="pa-10" id="submoduleid_'+val['home_navigation_data_id']+'">'+PageName+'&nbsp;&nbsp;<input type="hidden" class="home_navigation_data_id_'+value['home_navigation_id']+'" name="home_navigation_data_id_'+val['home_navigation_data_id']+'" id="home_navigation_data_id_'+val['home_navigation_data_id']+'" value="'+val['home_navigation_data_id']+'" /><input type="hidden" name="employee_role_permission_id" id="employee_role_permission_id'+val['home_navigation_data_id']+'" value="" /></td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="view_'+val['home_navigation_data_id']+'">'+view+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="add_'+val['home_navigation_data_id']+'">'+add+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="edit_'+val['home_navigation_data_id']+'">'+edit+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="del_'+val['home_navigation_data_id']+'">'+del+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="exprt_'+val['home_navigation_data_id']+'">'+exprt+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="print_'+val['home_navigation_data_id']+'">'+print+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="upload_'+val['home_navigation_data_id']+'">'+upload+'</td>' +
                    '</tr>';
                });       
            });

            form    +=  '</tbody></table>';

            $('.roleForm').html(form);
            $('.enableRole').show();    // enable save role button
         }
    });
}

function checkboxOver(id)
{
    $('.mouseover'+id).css('text-indent','0px');
}
function checkboxleave(id)
{
    $('.mouseover'+id).css('text-indent','-9999px');
}

function indvCheck(data_id,id,parent)
{
    if($('input[name="view_'+data_id+'"]').prop("checked")==true)
    {
        $('input[name="home_navigation_data_id_'+data_id+'"]').prop('disabled',false); 
        $('input[name="ModuleName_'+id+'"]').prop('checked',true); 
      
        if($('#parent_'+parent).length != 0) 
        {
           $('#parent_'+parent).prop('checked',true);
            
        }
    }
    else
    {
        $('input[name="home_navigation_data_id_'+data_id+'"]').prop('disabled',true); 
        // $('input[name="ModuleName_'+id+'"]').prop('checked',false); 
    }
}

function pagesCheck(value)
{
    if($('input[name="ModuleName_'+value+'"]').prop("checked")==true){
        $('.per_view_'+value).prop('checked', true);
        $('.per_add_'+value).prop('checked', true);
        $('.per_edit_'+value).prop('checked', true);
        $('.per_delete_'+value).prop('checked', true);
        $('.per_export_'+value).prop('checked', true);
        $('.per_print_'+value).prop('checked', true);
        $('.per_upload_'+value).prop('checked', true);
        // $('.home_navigation_data_id_'+value).prop('disabled',false);
    }
    else
    {
        $('.per_view_'+value).prop('checked', false);
        $('.per_add_'+value).prop('checked', false);
        $('.per_edit_'+value).prop('checked', false);
        $('.per_delete_'+value).prop('checked', false);
        $('.per_export_'+value).prop('checked', false);
        $('.per_print_'+value).prop('checked', false);
        $('.per_upload_'+value).prop('checked', false);
        // $('.home_navigation_data_id_'+value).prop('disabled',true);
    }
}

$('#saveEmployeeRole').on('click', function(event)
{
    $('#saveEmployeeRole').attr('disabled', true);
    var all_array   =   [];
    var roledata    =   [];
    var rolearray   =   {};
    rolearray['employee_role_id']       =   $('#employee_role_id').val();;
    rolearray['role_name']              =   $('#role_name').val();
    roledata.push(rolearray);

     $('#sproduct_detail_record').has('tr').each(function()
      {
          var arrayModule = {};
          var arrayPages = {};
          $('tr', $(this)).each(function(index, item)
          {
              var inputname = $(item).attr('id');
               if(inputname != undefined && inputname != '')
                {
                    var wihoutidname = inputname.split('_');
                    var nameforarray = wihoutidname[0];
                        
                    arrayModule  =   {};
                        
                    if(nameforarray == 'module')
                    {
                        employee_role_permission_id     =  $(this).find("#employee_role_permission_id"+wihoutidname[1]).val(); 
                        chkd_module     =   $(this).find($('input[name="ModuleName_'+wihoutidname[1]+'"]:checked')).val();  
                        if(chkd_module!=undefined)
                        {
                            arrayModule['employee_role_permission_id']  =   employee_role_permission_id==undefined?'':employee_role_permission_id;
                            arrayModule['module_id'] = chkd_module;
                            arrayModule['submodule_id']   = '';
                            arrayModule['view_']          = 'on';   
                            arrayModule['add_']           = '';   
                            arrayModule['edit_']          = '';   
                            arrayModule['delete_']        = '';   
                            arrayModule['export_']        = '';   
                            arrayModule['print_']         = '';   
                            arrayModule['upload_']        = '';   
                            
                            all_array.push(arrayModule);
                        }
                    }

                    arrayPages  =   {};

                    if(nameforarray == 'RoleValues')
                    {
                        employee_role_permission_id     =  $(this).find("#employee_role_permission_id"+wihoutidname[1]).val(); 
                        cchkd_module     =  $(this).find(".home_navigation_data_id_"+wihoutidname[1]).val();
                        view_            =  $(this).find($('input[class="per_view_'+wihoutidname[1]+'"]:checked')).val();
                        add_             =  $(this).find($('input[class="per_add_'+wihoutidname[1]+'"]:checked')).val();
                        edit_            =  $(this).find($('input[class="per_edit_'+wihoutidname[1]+'"]:checked')).val();
                        delete_          =  $(this).find($('input[class="per_delete_'+wihoutidname[1]+'"]:checked')).val();
                        export_          =  $(this).find($('input[class="per_export_'+wihoutidname[1]+'"]:checked')).val();
                        print_           =  $(this).find($('input[class="per_print_'+wihoutidname[1]+'"]:checked')).val();
                        upload_          =  $(this).find($('input[class="per_upload_'+wihoutidname[1]+'"]:checked')).val();
                        
                        //$('.home_navigation_data_id_'+wihoutidname[1]).is(':disabled')==false && 
                        if(view_!=undefined)
                        {
                            arrayPages['employee_role_permission_id']   =   employee_role_permission_id==undefined?'':employee_role_permission_id;
                            arrayPages['module_id']      = chkd_module;
                            arrayPages['submodule_id']   = cchkd_module;
                            arrayPages['view_']          = view_;   
                            arrayPages['add_']           = add_==undefined?'':add_;   
                            arrayPages['edit_']          = edit_==undefined?'':edit_;   
                            arrayPages['delete_']        = delete_==undefined?'':delete_;   
                            arrayPages['export_']        = export_==undefined?'':export_;   
                            arrayPages['print_']         = print_==undefined?'':print_;   
                            arrayPages['upload_']        = upload_==undefined?'':upload_;   
                            

                            all_array.push(arrayPages);
                        }  
                    }
                }

          });
        roledata.push(all_array);
        console.log(roledata);

        // return false;

        var data = roledata;
        var  url = "employee_role_create";
        var dataType = "";
        var type = "POST";
        callroute(url,type,dataType,data,function (data)
        {
            var dta = JSON.parse(data);


            if(dta['Success'] == "True")
            {
                toastr.success(dta['Message']);
                window.location = dta['url'];
            }
            else
            {
                toastr.error(dta['Message']);
            }
        })
      });
});


function SetRole(user_id)
{
    $("#myModalsetRole").modal('show');
    $('#employee_id').val(user_id);

    var url = "findRole";
    var type = "POST";
    var dataType = "";
    var data = {
        "user_id": user_id,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        console.log(searchdata);
        var role_id     =   searchdata['Data'][0]['employee_role_id'];
        

        if(searchdata['Data'][0]['employee_role_id']!=null)
        {
            var rolename    =   searchdata['Data'][0]['employee_role']['role_name'];

            var firstname   =   searchdata['Data'][0]['employee_firstname'];
            var middlename  =   searchdata['Data'][0]['employee_middlename'];
            var lastname    =   searchdata['Data'][0]['employee_lastname'];

            $('#RoleNamebadge').html(firstname +' '+ middlename +' '+ lastname);
            $('#Rolebadge').html(rolename);
        }
        else
        {
            var firstname   =   searchdata['Data'][0]['employee_firstname'];
            var middlename  =   searchdata['Data'][0]['employee_middlename'];
            var lastname    =   searchdata['Data'][0]['employee_lastname'];

            $('#RoleNamebadge').html(firstname +' '+ middlename +' '+ lastname);
            $('#Rolebadge').hide();
        }

        showPermissions(role_id);

    });
}

function showPermissions(role_id)
{
    var permission_edit         =   $('#permission_edit').val();

    $('.roleBadge').removeClass('roleBadgeActive');
    $('#roleBadge'+role_id).addClass('roleBadgeActive');

    $('#role_id').val(role_id);

    $('.loaderContainer').show();

    var form = '';
    var url = "showPermissions";
    var type = "POST";
    var dataType = "";
    var data = {
        "role_id": role_id,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        console.log(searchdata);

        if(searchdata['data']!='')
        {
            if(searchdata['Success'] == "True")
        {
            form    +=  '<table border="0" width="100%" cellpadding="6" class="pb-20" cellspacing="2">' +
                        '<tr>' +
                        '<td width="20%"></td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">View</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Add</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Edit</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Delete</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Download</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold bold">Print</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Upload</td>' +
                        '</tr>'+
                        '<tbody id="sproduct_detail_record">'; 
                $.each(searchdata['data'], function (key, value)
                {
                    if(value['home_navigation_data_id']==null)
                    {
                        if(Number(value['permission_view'])==1)
                        {
                            var view_checked    =   'checked';
                        }
                        else
                        {
                            var view_checked    =   '';
                        }

                        var moduleName  =   value['home_navigations']['nav_display_name'];
                        form +=     '<tr class="trborderbottom" id="module_'+value['home_navigation_id']+'">' +
                        '<td bgcolor="#f3f3f3" class="rightAlign" class="pa-10" style="text-transform:uppercase;"><b class="redcolor">'+moduleName+'</b>&nbsp;&nbsp;<input type="checkbox" onclick="pagesCheck('+value['home_navigation_id']+')" name="ModuleName_'+value['home_navigation_id']+'" id="ModuleName_'+value['home_navigation_id']+'" value="'+value['home_navigation_id']+'" '+view_checked+' disabled>&nbsp;&nbsp;<input type="hidden" name="employee_role_permission_id" id="employee_role_permission_id'+value['home_navigation_id']+'" value="" /></td>' +
                        '<td bgcolor="#f3f3f3" class="center titleover  mouseover'+value['home_navigation_id']+'">View</td>' +
                        '<td bgcolor="#f3f3f3" class="center titleover  mouseover'+value['home_navigation_id']+'">Add</td>' +
                        '<td bgcolor="#f3f3f3" class="center titleover  mouseover'+value['home_navigation_id']+'">Edit</td>' +
                        '<td bgcolor="#f3f3f3" class="center titleover  mouseover'+value['home_navigation_id']+'">Delete</td>' +
                        '<td bgcolor="#f3f3f3" class="center titleover  mouseover'+value['home_navigation_id']+'">Download</td>' +
                        '<td bgcolor="#f3f3f3" class="center titleover  mouseover'+value['home_navigation_id']+'">Print</td>' +
                        '<td bgcolor="#f3f3f3" class="center titleover  mouseover'+value['home_navigation_id']+'">Upload</td>' +
                        '</tr>';
                    }

                    if(value['home_navigation_data_id']!=null)
                    {
                        var PageName        =   value['home_navigations_data']['nav_display_name'];
                        var option_view     =   value['home_navigations_data']['option_view'];
                        var option_add      =   value['home_navigations_data']['option_add'];
                        var option_edit     =   value['home_navigations_data']['option_edit'];
                        var option_delete   =   value['home_navigations_data']['option_delete'];
                        var option_export   =   value['home_navigations_data']['option_export'];
                        var option_print    =   value['home_navigations_data']['option_print'];
                        var option_upload   =   value['home_navigations_data']['option_upload'];

                        if(Number(option_view)==1)
                        {
                            if(Number(value['permission_view'])==1)
                            {
                                var view_checked    =   'checked';
                            }
                            else
                            {
                                var view_checked    =   '';
                            }
                            view    =   '<input type="checkbox" class="per_view_'+value['home_navigation_id']+'" name="view_'+value['home_navigation_data_id']+'" '+view_checked+' onclick="indvCheck('+value['home_navigation_data_id']+','+value['home_navigation_id']+')" disabled>';
                        }
                        else
                        {
                            view    =   '<input type="checkbox" class="" disabled name="">';
                        }

                        if(Number(option_add)==1)
                        {
                            if(Number(value['permission_add'])==1)
                            {
                                var add_checked    =   'checked';
                            }
                            else
                            {
                                var add_checked    =   '';
                            }
                            add     =   '<input type="checkbox" class="per_add_'+value['home_navigation_id']+'" name="add_'+value['home_navigation_data_id']+'" '+add_checked+' disabled>';
                        }
                        else
                        {
                            add     =   '<input type="checkbox" class="" disabled name="">';
                        }

                        if(Number(option_edit)==1)
                        {
                            if(Number(value['permission_edit'])==1)
                            {
                                var edit_checked    =   'checked';
                            }
                            else
                            {
                                var edit_checked    =   '';
                            }
                            edit     =   '<input type="checkbox" class="per_edit_'+value['home_navigation_id']+'" name="edit_'+value['home_navigation_data_id']+'" '+edit_checked+' disabled>';
                        }
                        else
                        {
                            edit     =   '<input type="checkbox" class="" disabled name="">';
                        }

                        if(Number(option_delete)==1)
                        {
                            if(Number(value['permission_delete'])==1)
                            {
                                var delete_checked    =   'checked';
                            }
                            else
                            {
                                var delete_checked    =   '';
                            }
                            del     =   '<input type="checkbox" class="per_delete_'+value['home_navigation_id']+'" name="delete_'+value['home_navigation_data_id']+'" '+delete_checked+' disabled>';
                        }
                        else
                        {
                            del     =   '<input type="checkbox" class="" disabled name="">';
                        }

                        if(Number(option_export)==1)
                        {
                            if(Number(value['permission_export'])==1)
                            {
                                var export_checked    =   'checked';
                            }
                            else
                            {
                                var export_checked    =   '';
                            }
                            exprt     =   '<input type="checkbox" class="per_export_'+value['home_navigation_id']+'" name="export_'+value['home_navigation_data_id']+'" '+export_checked+' disabled>';
                        }
                        else
                        {
                            exprt     =   '<input type="checkbox" class="" disabled name="">';
                        }

                        if(Number(option_print)==1)
                        {
                            if(Number(value['permission_print'])==1)
                            {
                                var print_checked    =   'checked';
                            }
                            else
                            {
                                var print_checked    =   '';
                            }
                            print     =   '<input type="checkbox" class="per_print_'+value['home_navigation_id']+'" name="print_'+value['home_navigation_data_id']+'" '+print_checked+' disabled>';
                        }
                        else
                        {
                            print     =   '<input type="checkbox" class="" disabled name="">';
                        }

                        if(Number(option_upload)==1)
                        {
                            if(Number(value['permission_upload'])==1)
                            {
                                var upload_checked    =   'checked';
                            }
                            else
                            {
                                var upload_checked    =   '';
                            }
                            upload     =   '<input type="checkbox" class="per_upload_'+value['home_navigation_id']+'" name="upload_'+value['home_navigation_data_id']+'" '+upload_checked+' disabled>';
                        }
                        else
                        {
                            upload     =   '<input type="checkbox" class="" disabled name="">';
                        }

                        form +=     '<tr class="trborderbottom" id="RoleValues_'+value['home_navigation_id']+'">' +
                        '<td bgcolor="#f3f3f3" class="rightAlign" class="pa-10" id="submoduleid_'+value['home_navigation_data_id']+'">'+PageName+'&nbsp;&nbsp;<input type="hidden" class="home_navigation_data_id_'+value['home_navigation_id']+'" name="home_navigation_data_id_'+value['home_navigation_data_id']+'" id="home_navigation_data_id_'+value['home_navigation_data_id']+'" value="'+value['home_navigation_data_id']+'" /><input type="hidden" name="employee_role_permission_id" id="employee_role_permission_id'+value['home_navigation_data_id']+'" value="" /></td>' +
                        '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="view_'+value['home_navigation_data_id']+'">'+view+'</td>' +
                        '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="add_'+value['home_navigation_data_id']+'">'+add+'</td>' +
                        '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="edit_'+value['home_navigation_data_id']+'">'+edit+'</td>' +
                        '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="del_'+value['home_navigation_data_id']+'">'+del+'</td>' +
                        '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="exprt_'+value['home_navigation_data_id']+'">'+exprt+'</td>' +
                        '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="print_'+value['home_navigation_data_id']+'">'+print+'</td>' +
                        '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="upload_'+value['home_navigation_data_id']+'">'+upload+'</td>' +
                        '</tr>';
                    }
                });

            form    +=  '</tbody></table>';
            $('.rolePermissions').html(form);
            $('.loaderContainer').hide();
            if(Number(permission_edit)==1)
            {
                $('.employeeRoleButton').show();    // enable save role button 
            }
            
        }
        }
        else
        {
            $('.rolePermissions').html('');
            $('.loaderContainer').hide();
            $('.employeeRoleButton').hide(); 
        }
    });
}

$('.ApplyRoletoEmployee').on('click', function(event){

    var role_id         =   $('#role_id').val();
    var employee_id     =   $('#employee_id').val();

    var url = "SaveRoletoEmployee";
    var type = "POST";
    var dataType = "";
    var data = {
        "role_id": role_id,
        "employee_id": employee_id,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        // console.log(searchdata);
        if(searchdata['Success'] == "True")
        {
            toastr.success(searchdata['Message']);
            window.location = searchdata['url'];
        }
    });  

});

function editPermission(role_id)
{
    $('.roleBadge_').removeClass('roleBadgeActive');
    $('#roleBadge_'+role_id).addClass('roleBadgeActive');

    $('.loaderContainer').show();

    $('#employee_role_id').val(role_id);
    $('#editEnable').val(role_id);

    var form = '';
    var url = "editPermissions";
    var type = "POST";
    var dataType = "";
    var data = {
        "role_id": role_id,
    }
    callroute(url,type,dataType,data,function (data)
    {
        var searchdata = JSON.parse(data, true);
        console.log(searchdata);
        $('#role_name').val(searchdata[1][0]['role_name']); // Role Name

         if(searchdata['Success'] == "True")
         {


            form    +=  '<table border="0" width="90%" class="font13" cellpadding="6" cellspacing="2">' +
                        '<tr>' +
                        '<td width="20%"></td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">View</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold bold">Add</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Edit</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Delete</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Download</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Print</td>' +
                        '<td width="10%" bgcolor="#f3f3f3" class="center bold">Upload</td>' +
                        '</tr>'+
                        '<tbody id="sproduct_detail_record">';

            $.each(searchdata['data'], function (key, value)
            {
                if(value['employee_role_permission']!=null)
                {
                    if(Number(value['home_navigation_id'])==Number(value['employee_role_permission']['home_navigation_id']))
                    {
                        if(Number(value['employee_role_permission']['permission_view'])==1)
                        {
                            master_chk  =   'checked';
                        }
                        else
                        {
                            master_chk  =   '';
                        }
                    }
                    employee_role_permission_id     =   value['employee_role_permission']['employee_role_permission_id'];
                }
                else
                {
                    master_chk  =   '';
                    employee_role_permission_id     =   '';
                }

                var moduleName  =   value['nav_display_name'];
                form +=     '<tr class="trborderbottom" id="module_'+value['home_navigation_id']+'">' +
                '<td bgcolor="#f3f3f3" class="rightAlign" class="pa-10" style="text-transform:uppercase;"><b class="redcolor">'+moduleName+'</b>&nbsp;&nbsp;<input type="checkbox" onclick="pagesCheck('+value['home_navigation_id']+')" name="ModuleName_'+value['home_navigation_id']+'" id="ModuleName_'+value['home_navigation_id']+'" value="'+value['home_navigation_id']+'" '+master_chk+'>&nbsp;&nbsp;<input type="hidden" name="employee_role_permission_id" id="employee_role_permission_id'+value['home_navigation_id']+'" value="'+employee_role_permission_id+'" /></td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">View</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Add</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Edit</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Delete</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Download</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Print</td>' +
                '<td bgcolor="#f3f3f3" class="center titleover mouseover'+value['home_navigation_id']+'">Upload</td>' +
                '</tr>';

                $.each(value['home_navigations_data'], function (key, val)
                {
                    var PageName        =   val['nav_display_name'];
                    var option_view     =   val['option_view'];
                    var option_add      =   val['option_add'];
                    var option_edit     =   val['option_edit'];
                    var option_delete   =   val['option_delete'];
                    var option_export   =   val['option_export'];
                    var option_print    =   val['option_print'];
                    var option_upload   =   val['option_upload'];
                    
                    var style = '';
                    var pclass = '';
                    
                    if(val['parent'] != 0)
                    {
                        style  = "style='color:#f00 !important;font-weight:bold !important;'";
                        pclass = 'id="parent_'+val['parent']+'"';
                    }

                    if(Number(option_view)==1)
                    {

                        if(val['employee_role_permission']!=null)
                        {
                            if(Number(val['home_navigation_data_id'])==Number(val['employee_role_permission']['home_navigation_data_id']))
                            {
                                if(Number(val['employee_role_permission']['permission_view'])==1)
                                {
                                    view_chk  =   'checked';
                                }
                                else
                                {
                                    view_chk  =   '';
                                }
                            }
                        }
                        else
                        {
                            view_chk  =   '';
                        }
                        view    =   '<input type="checkbox" class="per_view_'+value['home_navigation_id']+'" name="view_'+val['home_navigation_data_id']+'" '+pclass+' onclick="indvCheck('+val['home_navigation_data_id']+','+value['home_navigation_id']+','+val['child']+')" '+view_chk+'>';
                    }
                    else
                    {
                        view    =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_add)==1)
                    {
                        if(val['employee_role_permission']!=null)
                        {
                            if(Number(val['home_navigation_data_id'])==Number(val['employee_role_permission']['home_navigation_data_id']))
                            {
                                if(Number(val['employee_role_permission']['permission_add'])==1)
                                {
                                    add_chk  =   'checked';
                                }
                                else
                                {
                                    add_chk  =   '';
                                }
                            }
                        }
                        else
                        {
                            add_chk  =   '';
                        }
                        add     =   '<input type="checkbox" class="per_add_'+value['home_navigation_id']+'" name="add_'+val['home_navigation_data_id']+'" '+add_chk+'>';
                    }
                    else
                    {
                        add     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_edit)==1)
                    {
                        if(val['employee_role_permission']!=null)
                        {
                            if(Number(val['home_navigation_data_id'])==Number(val['employee_role_permission']['home_navigation_data_id']))
                            {
                                if(Number(val['employee_role_permission']['permission_edit'])==1)
                                {
                                    edit_chk  =   'checked';
                                }
                                else
                                {
                                    edit_chk  =   '';
                                }
                            }
                        }
                        else
                        {
                            edit_chk  =   '';
                        }

                        edit     =   '<input type="checkbox" class="per_edit_'+value['home_navigation_id']+'" name="edit_'+val['home_navigation_data_id']+'" '+edit_chk+'>';
                    }
                    else
                    {
                        edit     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_delete)==1)
                    {
                        if(val['employee_role_permission']!=null)
                        {
                            if(Number(val['home_navigation_data_id'])==Number(val['employee_role_permission']['home_navigation_data_id']))
                            {
                                if(Number(val['employee_role_permission']['permission_delete'])==1)
                                {
                                    delete_chk  =   'checked';
                                }
                                else
                                {
                                    delete_chk  =   '';
                                }
                            }
                        }
                        else
                        {
                            delete_chk  =   '';
                        }

                        del     =   '<input type="checkbox" class="per_delete_'+value['home_navigation_id']+'" name="delete_'+val['home_navigation_data_id']+'" '+delete_chk+'>';
                    }
                    else
                    {
                        del     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_export)==1)
                    {
                        if(val['employee_role_permission']!=null)
                        {
                            if(Number(val['home_navigation_data_id'])==Number(val['employee_role_permission']['home_navigation_data_id']))
                            {
                                if(Number(val['employee_role_permission']['permission_export'])==1)
                                {
                                    export_chk  =   'checked';
                                }
                                else
                                {
                                    export_chk  =   '';
                                }
                            }
                        }
                        else
                        {
                            export_chk  =   '';
                        }

                        exprt     =   '<input type="checkbox" class="per_export_'+value['home_navigation_id']+'" name="export_'+val['home_navigation_data_id']+'" '+export_chk+'>';
                    }
                    else
                    {
                        exprt     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_print)==1)
                    {
                        if(val['employee_role_permission']!=null)
                        {
                            if(Number(val['home_navigation_data_id'])==Number(val['employee_role_permission']['home_navigation_data_id']))
                            {
                                if(Number(val['employee_role_permission']['permission_print'])==1)
                                {
                                    print_chk  =   'checked';
                                }
                                else
                                {
                                    print_chk  =   '';
                                }
                            }
                        }
                        else
                        {
                            print_chk  =   '';
                        }

                        print     =   '<input type="checkbox" class="per_print_'+value['home_navigation_id']+'" name="print_'+val['home_navigation_data_id']+'" '+print_chk+'>';
                    }
                    else
                    {
                        print     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(Number(option_upload)==1)
                    {
                        if(val['employee_role_permission']!=null)
                        {
                            if(Number(val['home_navigation_data_id'])==Number(val['employee_role_permission']['home_navigation_data_id']))
                            {
                                if(Number(val['employee_role_permission']['permission_upload'])==1)
                                {
                                    upload_chk  =   'checked';
                                }
                                else
                                {
                                    upload_chk  =   '';
                                }
                            }
                        }
                        else
                        {
                            upload_chk  =   '';
                        }

                        upload     =   '<input type="checkbox" class="per_upload_'+value['home_navigation_id']+'" name="upload_'+val['home_navigation_data_id']+'" '+upload_chk+'>';
                    }
                    else
                    {
                        upload     =   '<input type="checkbox" class="" disabled name="">';
                    }

                    if(val['employee_role_permission']!=null)
                    {
                        employee_role_permission_id     =   val['employee_role_permission']['employee_role_permission_id'];
                    }
                    else
                    {
                        employee_role_permission_id     =   '';
                    }

                    form +=     '<tr class="trborderbottom" id="RoleValues_'+value['home_navigation_id']+'">' +
                    '<td bgcolor="#f3f3f3" class="rightAlign" '+style+' class="pa-10" id="submoduleid_'+val['home_navigation_data_id']+'">'+PageName+'&nbsp;&nbsp;<input type="hidden" class="home_navigation_data_id_'+value['home_navigation_id']+'" name="home_navigation_data_id_'+val['home_navigation_data_id']+'" id="home_navigation_data_id_'+val['home_navigation_data_id']+'" value="'+val['home_navigation_data_id']+'" /><input type="hidden" name="employee_role_permission_id" id="employee_role_permission_id'+val['home_navigation_id']+'" value="'+employee_role_permission_id+'" /></td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="view_'+val['home_navigation_data_id']+'">'+view+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="add_'+val['home_navigation_data_id']+'">'+add+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="edit_'+val['home_navigation_data_id']+'">'+edit+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="del_'+val['home_navigation_data_id']+'">'+del+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="exprt_'+val['home_navigation_data_id']+'">'+exprt+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="print_'+val['home_navigation_data_id']+'">'+print+'</td>' +
                    '<td class="center" onmouseover="checkboxOver('+value['home_navigation_id']+')" onmouseleave="checkboxleave('+value['home_navigation_id']+')" id="upload_'+val['home_navigation_data_id']+'">'+upload+'</td>' +
                    '</tr>';
                });       
            });

            form    +=  '</tbody></table>';

            $('.roleForm').html(form);
            $('.loaderContainer').hide();
            $('.enableRole').show();    // enable save role button
        }
    });
}        
