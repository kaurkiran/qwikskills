@include('pagetitle')
@extends('master')

@section('main-hk-pg-wrapper')

<?php
    // if(sizeof($roles)==0)
    // {
    //     $onclick    =   'AlertnewEmployee()';
    //     ?>
         <script type="text/javascript">
    //     function AlertnewEmployee()
    //     {
    //         toastr.error("please create employee permission first");
    //     }
    //     </script>
         <?php
    // }
    // else
    // {
    //     $onclick    =   'addnewEmployee()';
    // }

         $onclick    =   'addnewEmployee()';
?>

<style type="text/css">
    .table th, .table td {
    padding: 6px 8px !important;
}

.modal-body {
    max-height: auto !important;
}
    
</style>

<link rel="stylesheet" href="{{URL::to('/')}}/public/template/bootstrap-datepicker/css/bootstrap-datepicker.css">

<br clear="all" />
<br clear="all" />
<div id="content">
  <div id="content-header">
    @include('breadcrumbs')
    
    <h1>Certification Master</h1>
  </div>

<div class="container-fluid">
    <div class="row-fluid">


<!-- <span class="commonbreadcrumbtn badge exportBtn badge-pill label-success" id="exportEmployeedata"><i class="ion ion-md-download"></i>&nbsp;Download Employee Data</span> -->

<a href="javascript:void()" class="btn btn-info ShowCertificationForm">New Certification</a>

<!-- <span class="commonbreadcrumbtn badge badge-primary badge-pill AddNewEmpBtn" onclick="{{$onclick}}"><i class="glyphicon glyphicon-plus"></i>&nbsp;Add New Employee</span> -->

<!-- <span class="commonbreadcrumbtn badge badge-danger badge-pill" id="searchCollapse"><i class="glyphicon glyphicon-search"></i>&nbsp;Search</span> -->

<br clear="all" /><br clear="all" />

<form name="certificationForm" id="certificationForm" enctype="multipart/form-data">
    <div class="addNewCertification" style="display: none; background: #ffffff; padding:20px;">
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        <div class="span3 noMargin">
            <label>Select Category</label>
            <select name="category_id" id="category_id" class="width90">
                <option value="">Select</option>
                <?php
                foreach($category as $i=> $categoryData)
                {
                    echo '<option value="'.$categoryData['term_taxonomy_id'].'">'.$categoryData['wp_term']['name'].'</option>';
                }
                ?>
            </select>
        </div>

        <div class="span3 noMargin certSubcategory" style="display: none;"></div>
        <div class="span6 noMargin certProducts" style="display: none;"></div>

        <br clear="all" />

        <div class="span6 noMargin">
            <label>Certification Title</label>
            <input type="text" name="certification_title" id="certification_title" class="form-control form-inputtext width90">
        </div>

        <div class="span3 noMargin">
            <label>No. of Questions</label>
            <input type="text" name="no_of_questions" id="no_of_questions" class="form-control form-inputtext width90">
        </div>

        <div class="span12 noMargin">
            <button name="saveCertification" id="saveCertification" type="submit" class="btn btn-success">Save Certification</button>
        </div>

        <br clear="all" />
        <br clear="all" />
    </div>
</form>

<!-- Table View -->
<div class="span12 noMargin">
    <table class="table tablesaw table-bordered table-hover table-striped mb-0 font14"   data-tablesaw-sortable data-tablesaw-minimap data-tablesaw-mode-switch>
        <thead>
            <th></th>
            <th>Title</th>
            <th>Product</th>
            <th>Category & Subcategory</th>
            <th>No. of Questions</th>
            <th>Added on</th>
        </thead>
        <tbody id="certificationResult">
            @include('certification::certification/view_certification_data')
        </tbody>
    </table>
</div>

</div>
</div>
</div>
<!-- Add New Role -->
<script src="{{ asset('public/js/jquery-1.11.1.min.js') }}"></script> 

<script type="text/javascript" src="{{URL::to('/')}}/public/js/datepicker.js"></script>
<script src="{{URL::to('/')}}/public/modulejs/certification/certification.js"></script>
<!-- <script type="text/javascript" src="{{URL::to('/')}}/public/template/jquery-ui/js/jquery-ui.min.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/public/template/popper.js/js/popper.min.js"></script>
<script type="text/javascript" src="{{URL::to('/')}}/public/template/bootstrap/js/bootstrap.min.js"></script> -->
@endsection

