
$('#product_features_name').keyup(function(e)
{
    var url         =   $('#product_features_name').val();                   
    var fnl         =   url.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    $('#feature_url').val(fnl.toLowerCase());
})

$('#html_name').keyup(function(e)
{
    var url         =   $('#html_name').val();                   
    var fnl         =   url.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    $('#html_id').val(url.toLowerCase());
})

function editPage(id)
{
    var url = "EditPagePopup";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_id: id
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            $('#pageBtn').html('Update Page');
            $("#PagePopup").modal('show');
            $('#product_features_id').val(id);

            // console.log(searchdata['Data']);
            var value   =   searchdata['Data'];

            var product_features_name       =   value['product_features_name'];
            var feature_url                 =   value['feature_url'];
            var feature_content             =   value['feature_content'];
            var html_name                   =   value['html_name'];
            var html_id                     =   value['html_id'];

            $('#product_features_name').val(product_features_name);
            $('#feature_url').val(feature_url);
            CKEDITOR.instances.feature_content.setData(feature_content);
            $('#html_name').val(html_name);
            $('#html_id').val(html_id);

        }

    });
}

$('#addEditPage').on('submit', function(event)
{
    event.preventDefault();

    var feature_content = CKEDITOR.instances.feature_content.getData();
    $("#feature_content").val(feature_content);

    var data = {
      "formdata": $("#addEditPage").serialize(),
    };
    var  url = 'addEditPage';
    var type = "POST";
    var dataType    =   '';

    callroute(url, type,dataType, data, function (data)
    {
        var sdata = JSON.parse(data, true);
        // console.log(sdata);
        var message     =   sdata['Message'];
        var url         =   sdata['url']
        if(sdata['Success']=='True')
        {
            toastr.success(message);
            window.location     =   url;
        }
        else
        {
            toastr.error(message);
        }
    });    

});

// function addnewFeature()
// {
//     $("#myModal").modal('show');
//     $('.modal-title').html('Add New Feature');
// }

$("input[name='feature_type']").click(function(e)
{
    var feature_type        =   $("input[name='feature_type']:checked").val();
    
    if(Number(feature_type)==2)
    {
        $('.Featurelocation').show();
        $('#html_name').val('');
        $('#html_id').val('');
        $('.FeatureSubMenu').hide();
        $('.FeatureUrls').hide();
    } 
    else if(Number(feature_type)==1)
    {
        $('.Featurelocation').hide();
        $('#html_name').val('dynamic_');
        $('#html_id').val('dynamic_');
        $('.FeatureSubMenu').show();
        $('.FeatureUrls').show();
    }

})

$('#parentChild').change(function(e)
{
    var parentChild         =   $('#parentChild').val();
    if(parentChild!='')
    {
        $('.Featurelevel1').hide();
        $('.Featurelevel2').show();
    }
    else if(parentChild=='')
    {
        $('.Featurelevel1').show();
        $('.Featurelevel2').hide();
    }
})

$('#addEditFeature').on('submit', function(event)
{
    event.preventDefault();

    var html_name   =   $('#html_name').val();
    var html_id     =   $('#html_id').val();
    var product_features_name   =   $('#product_features_name').val();
    var error       =   '';

    // if(html_name=='' || html_name=='dynamic_')
    // {
    //     error   =   1;
    //     toastr.error("HTML Name is required");
    //     $('#html_name').focus();
    //     return false;
    // }

    // if(html_id=='' || html_id=='dynamic_')
    // {
    //     error   =   1;
    //     toastr.error("HTML ID is required");
    //     $('#html_id').focus();
    //     return false;
    // }

    if(product_features_name=='')
    {
        error   =   1;
        toastr.error("Display Name is required");
        $('#product_features_name').focus();
        return false;
    }

    if(error == 1)
    {
        return false;
    }
    else
    {
       

        $.ajaxSetup({
            headers : { "X-CSRF-TOKEN" :jQuery(`meta[name="csrf-token"]`). attr("content")}
        });

        $.ajax({
            url: "addEditFeature",
            method: "POST",
            data: new FormData(this),
            dataType: 'JSON',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data)
            {
                if(data['Success'] == "True")
                {
                    toastr.success(data['Message']);
                    window.location     =   data['url'];
                }
                else if(data['Success']=="False")
                {
                    toastr.error("Something went wrong...");
                }
            }
        });
    }

});

function editFeature(id)
{
    var url = "EditFeaturePopup";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_id: id
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            $('#pageBtn').html('Update Feature');

            $("#myModal").modal('show');
            $('.modal-title').html('Edit Feature');
            $('#product_features_id').val(id);

            // console.log(searchdata['Data']);

            var feature_type            =   searchdata['Data']['feature_type'];
            var feature_location        =   searchdata['Data']['feature_location'];
            var feature_url             =   searchdata['Data']['feature_url'];
            var html_id                 =   searchdata['Data']['html_id'];
            var html_name               =   searchdata['Data']['html_name'];
            var product_features_name   =   searchdata['Data']['product_features_name'];
            var show_feature_url        =   searchdata['Data']['show_feature_url'];
            var feature_content         =   searchdata['Data']['feature_content'];

            if(Number(feature_type)==1)
            {
                $("input[id='feature_type_1']").prop('checked',true);
                $("input[id='feature_type_2']").prop('checked',false);
                $('.FeatureSubMenu').show();
                $('.Featurelocation').hide();
                $('.FeatureUrls').show();

                $("input[id='feature_location_1']").prop('checked',false);
                $("input[id='feature_location_2']").prop('checked',false);
                $("input[id='feature_location_3']").prop('checked',false);

            }
            else if(Number(feature_type)==2)
            {
                $("input[id='feature_type_2']").prop('checked',true);
                $("input[id='feature_type_1']").prop('checked',false);
                $('.FeatureSubMenu').hide();
                $('.Featurelocation').show();
                $('.FeatureUrls').hide();

                if(Number(feature_location)==1)
                {
                    $("input[id='feature_location_1']").prop('checked',true);
                    $("input[id='feature_location_2']").prop('checked',false);
                    $("input[id='feature_location_3']").prop('checked',false);
                }
                else if(Number(feature_location)==2)
                {
                    $("input[id='feature_location_1']").prop('checked',false);
                    $("input[id='feature_location_2']").prop('checked',true);
                    $("input[id='feature_location_3']").prop('checked',false);
                }
                else if(Number(feature_location)==3)
                {
                    $("input[id='feature_location_1']").prop('checked',false);
                    $("input[id='feature_location_2']").prop('checked',false);
                    $("input[id='feature_location_3']").prop('checked',true);
                }

            }

            $('#html_name').val(html_name);
            $('#html_id').val(html_id);
            $('#product_features_name').val(product_features_name);
            $('#feature_url').val(feature_url);
            //CKEDITOR.instances.feature_content.setData(feature_content);
            $('#feature_content').val(feature_content);
            $('#show_feature_url').val(show_feature_url);

        }

    });
}

function editSubFeature(id,subid)
{
    var url = "EditSubFeaturePopup";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_id: id,
        product_features_data_id: subid
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            $('#pageBtn').html('Update Feature');

            $("#myModal").modal('show');
            $('.modal-title').html('Edit Feature');
            $('#product_features_id').val(id);
            $('#product_features_data_id').val(subid);

            // console.log(searchdata['Data']);

            var feature_type            =   searchdata['Data']['product_features']['feature_type'];
            var product_features_name   =   searchdata['Data']['product_features']['product_features_name'];
            var product_features_id     =   searchdata['Data']['product_features_id'];

            var display_name            =   searchdata['Data']['product_features_data_value'];
            var display_url             =   searchdata['Data']['product_features_data_url'];
            var feature_content         =   searchdata['Data']['feature_content'];

            $('.FeatureUrls').hide();
            $('.Featurelevel1').hide();
            $('.Featurelevel2').show();

            $('#product_features_name').val(display_name);
            $('#feature_url').val(display_url);
            //CKEDITOR.instances.feature_content.setData(feature_content);
            $('#feature_content').val(feature_content);
            $('#parentChild option[value="'+id+'"]').attr("selected", "selected");

        }

    });
}

function deleteFeature(id)
{
    var url = "deleteFeature";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_id: id
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            toastr.success(searchdata['Message']);
            window.location     =   searchdata['URL'];
        }
    });
}

function deleteSubFeature(id,subid)
{
    var url = "deleteSubFeature";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_id: id,
        product_features_data_id: subid
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            toastr.success(searchdata['Message']);
            window.location     =   searchdata['URL'];
        }
    });
}

function FeatureActive(id,status)
{
    var url = "FeatureActive";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_id: id,
        status: status
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            toastr.success(searchdata['Message']);
            window.location     =   searchdata['URL'];
        }
    });
}

function FeatureSubActive(id,status)
{
    var url = "FeatureSubActive";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_data_id: id,
        status: status
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            toastr.success(searchdata['Message']);
            window.location     =   searchdata['URL'];
        }
    });
}

function UpdateOrdering(id)
{
    enteredVal  =   $('#mainVal_'+id).val();

    var url = "UpdateOrdering";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_id: id,
        enteredVal: enteredVal
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            toastr.success(searchdata['Message']);
        }
    });

}

function UpdateOrderingSub(id)
{
    enteredVal  =   $('#subVal_'+id).val();

    var url = "UpdateOrderingSub";
    var type = "POST";
    var dataType = '';
    var data = {
        product_features_data_id: id,
        enteredVal: enteredVal
    };
    callroute(url, type,dataType, data, function (data)
    {
        var searchdata = JSON.parse(data, true);
        
        if(searchdata['Success']=='True')
        {
            toastr.success(searchdata['Message']);
        }
    });
}