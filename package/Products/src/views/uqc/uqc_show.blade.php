<?php
/**
 * Created by PhpStorm.
 * User: Hemaxi
 * Date: 18/2/19
 * Time: 10:45 AM
 */
?>
@include('pagetitle')
@extends('master')

@section('container-fluid')

  <html>
  <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <title>Size</title>
      <style>
          #pagination {
              width: 100%;
              text-align: center;
          }

          #pagination ul li {
              display: inline;
              margin-left: 10px;
          }


      </style>
  </head>
  <body>
  <div id="page-content-wrapper">
      <!-- Keep all page content within the page-content inset div! -->
      <div class="page-content inset">
          <div class="row">
    <form id="uqcform">
        <input type="hidden" name="uqc_id" value="" id="uqc_id">

        <div class="col-md-12">
            <input type="hidden" id="csrf_token" value="{{csrf_token()}}">
            <div class="col-md-12 topformbutton" style="margin-left: 30px">
                <button type="submit" class="btn-primary" name="adduqc" id="adduqc" >Add UQC</button>
                <span id="uqcformerr" style="color: red"></span>
            </div>

            <div class="form-group col-md-12">
                <label for="uqc_name"><b>UQC Name</b></label>
                <input class="form-control" placeholder="UQC Name" type="text" name="uqc_name" id="uqc_name" value="" maxlength="100">
            </div>

            <div class="form-group col-md-12">
                <label for="uqc_type"><b>UQC Type</b></label>
                <input class="form-control" placeholder="UQC Type" type="text" name="uqc_type" id="uqc_type" value="" maxlength="100">
            </div>

            <div class="form-group col-md-12">
                <label for="uqc_shortname"><b>UQC Short Name</b></label>
                <input class="form-control" placeholder="UQC Short Name" type="text" name="uqc_shortname" id="uqc_shortname" value="" maxlength="100">
            </div>

            <div class="form-group col-md-12">
                <label class="radio-inline"><input type="radio" name="uqc_status" id="active" value="1" checked>Active</label>
                <label class="radio-inline"><input type="radio" name="uqc_status" id="inactive" value="0">Inactive</label>
            </div>
        </div>
    </form>
          </div>
      </div>
  </div>

  <div id="ajaxSection">
      <div class="col-md-12">
          <div class="box box-primary">
              <table id="tablerecord" class="record table">
                  <thead>
                  <tr>
                      <th>UQC Name</th>
                      <th>UQC Type</th>
                      <th>UQC Shortname</th>
                      <th>status</th>
                      <th>Edit</th>
                      <th>Delete</th>
                  </tr>
                  </thead>
                  <tbody id="companyamc" class="cmpamc">
                  @foreach($uqc as $key=>$uqc)
                      <tr>
                          <td>{{$uqc->uqc_name}}</td>
                          <td>{{$uqc->uqc_type}}</td>
                          <td>{{$uqc->uqc_shortname}}</td>
                          <td>
                              @if($uqc->is_active == 1)
                                  <a href="javascript:void(0)"><i class="fa fa-check" style="color:green"></i></a>
                                  @else
                                  <a href="javascript:void(0)"><i class="fa fa-close" style="color:red"></i></a>
                                  @endif
                          </td>
                          <td><a class="uqc_edit" data-uqc_id="{{encrypt($uqc->uqc_id)}}"><i class="fa fa-edit"></i></a></td>
                          <td><a class="uqc_delete" data-uqc_id="{{encrypt($uqc->uqc_id)}}"><i class="fa fa-trash"></i></a></td>
                      </tr>
                  @endforeach
                  <!--<tr>
                       <td>Column 1: Row 1</td>
                       <td>Column 2: Row 1</td>
                       <td>Column 3: Row 1</td>
                       <td>Column 4: Row 1</td>
                   </tr>-->

                  </tbody>
              </table>
              <div id="pagination"></div>
              <ul class="uk-pagination"></ul>

          </div>
      </div>

  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/paginationjs/2.1.4/pagination.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/2.27.2/js/components/pagination.js"></script>
  <script type="text/javascript">
      var  rows = [];
      $('#tablerecord > tbody  > tr').each(function(i,row)
      {
          return rows.push(row);
      });


      jQuery.noConflict();
      if(rows.length > 10) {
          jQuery('#pagination').pagination({
              dataSource: rows,
              pageSize: 10,
              callback: function (data, pagination) {
                  jQuery('tbody').html(data);
              }
          })
      }

      jQuery(document).on('submit','#uqcform',function(e){

          e.preventDefault();
          /*if(validate_brandform('brandform'))
          {*/
          var uqc_name = $("#uqc_name").val();
          var uqc_type = $("#uqc_type").val();
          var uqc_shortname = $("#uqc_shortname").val();
          var is_active = $('input[name=uqc_status]:checked').val();
          var csrf_token = $('#csrf_token').val();
          var uqc_id = $('#uqc_id').val();
          $.post("{{ route('uqc_create') }}",
              {_token:csrf_token,uqc_id:uqc_id,uqc_name:uqc_name,uqc_type:uqc_type,uqc_shortname:uqc_shortname,is_active:is_active},function(data)
              {
                  if (data['error'] == true) {
                      alert(data['message']);
                  } else {
                      $('#uqcform').trigger('reset');
                      alert(data);
                  }
              });
/*

*/

      });


      jQuery(document).on('click','.uqc_edit',function(e){

          e.preventDefault();

          var uqc_id = $(this).data('uqc_id');

          $.get("{{ route('uqc_edit')}}",{ uqc_id:uqc_id },function(data)
          {
              $('#uqc_id').val(data.uqc_id);
              $('#uqc_name').val(data.uqc_name);
              $('#uqc_type').val(data.uqc_type);
              $('#uqc_shortname').val(data.uqc_shortname);
          });
      });

      jQuery(document).on('click','.uqc_delete',function(e){
          e.preventDefault();
          var uqc_id = $(this).data('uqc_id');
          if(confirm('Are you sure you want delete this uqc?')) {
              $.get("{{ route('uqc_delete') }}",{ uqc_id:uqc_id}, function(data){
                  alert(data);
                  $('#msg').empty().append(data);


              });}else{
              return false;
          }
      });


  </script>

    @endsection

