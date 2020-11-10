@include('pagetitle')

@extends('master')

@section('main-hk-pg-wrapper')
<script src="{{ asset('public/js/jquery.min.js') }}"></script> 

<style type="text/css">
    .table th, .table td{
        padding: 6px !important;
    }
</style>

<br clear="all" />
<br clear="all" />
<div id="content">
  <div id="content-header">
    @include('breadcrumbs')
    
    <h1>Question Master</h1>
  </div>
<div class="container-fluid">
    <div class="row-fluid">
        <div id="modelData" style=""></div>
        <div class="modal fade bs-example-modal-lg" id="ModalCarousel34" tabindex="-1" role="dialog" aria-labelledby="ModalCarousel34" style="padding-right: 17px;">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body pa-0">
                        <div id="demo" class="carousel slide" data-ride="carousel">
                            <ul class="carousel-indicators"></ul>
                            <div class="carousel-inner"></div>
                            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                <span class="carousel-control-prev-icon" style="color: black"></span>
                            </a>
                            <a class="carousel-control-next" href="#demo" data-slide="next">
                                <span class="carousel-control-next-icon" style="color: black"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
   
            <?php
            if($role_permissions['permission_add']==1)
            {
            ?>
                 <span class="btn btn-success"  id="addnewcollapse">
                    <i class="glyphicon glyphicon-plus"></i>&nbsp;Add New Question</span>
            <?php
            }
            ?>

           <!-- <span class="btn btn-danger" id="searchQuestionCollapse"><i class="glyphicon glyphicon-search"></i>&nbsp;Search</span> -->


 


        <form name="questionform" id="questionform" class="" style="margin:10px 0 20px 0;"  enctype="multipart/form-data">
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            <section id="question_block" style="display:none; padding:10px; background:#ffffff;">
                @include('questionmasters::questionmaster/question_form')
                <div class="row ml-0" style="margin:0 0 0 53px;">
                    <div class="col-sm-12">
                        <div class="hk-row">
                            <div class="span12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="span2 offset-md-10">
                                       
                                        <button type="submit" name="addquestion" class="btn btn-success savenewBtn" id="addquestion" data-container="body" data-toggle="popover" data-placement="bottom" data-content="">Save</button>
                                        <button type="button" name="resetquestion" onclick="resetquestiondata();" class="btn btn-inverse resetbtn" id="resetquestion" data-container="body" data-toggle="popover" data-placement="bottom" data-content="">Reset</button>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
            </section>
        </form>

    <section class="hk-sec-wrapper collapse" id="filterarea_block">
        <div id="">
            <form name="psearch" id="psearch">
            <div class="hk-row common-search">
                <div class="span2 pb-10">
                    <div class="form-group">
                        <input type="text" name-attr="question_name" maxlength="50" autocomplete="off" name="question_name_filter" id="question_name_filter" value="" class="form-control form-inputtext" placeholder="question Name">
                    </div>
                </div>
                <div class="span2">
                    <div class="form-group">
                        <input type="text" name-attr="barcode" maxlength="50" autocomplete="off" name="barcode_filter" id="barcode_filter" value="" class="form-control form-inputtext" placeholder="Barcode">
                    </div>
                </div>
                <div class="span2">
                    <div class="form-group">
                        <input type="text" name-attr="question_code" maxlength="50" autocomplete="off" name="pcode_filter" id="pcode_filter" value="" class="form-control form-inputtext" placeholder="question Code">
                    </div>
                </div>
                <div class="span2">
                    <div class="form-group">
                        <input type="text" name-attr="sku_code" maxlength="50" autocomplete="off" name="skucode_filter" id="skucode_filter" value="" class="form-control form-inputtext" placeholder="SKU">
                    </div>
                </div>
         

                <div class="span2">
                    <div class="form-group">
                        <select name-attr="uqc_id" class="form-control form-inputtext" name="uqc_id_filter" id="uqc_id_filter"></select>
                    </div>
                </div>
                <div class="span12 float-right text-right">
                    <button type="button" class="btn btn-info searchBtn search_data"  id="search_question"><i class="fa fa-search"></i>Search</button>
                    <button type="button" name="resetfilter" onclick="resetquestionfilterdata();" class="btn btn-info resetbtn" id="resetfilter" data-container="body" data-toggle="popover" data-placement="bottom" data-content="" data-original-title="" title="">Reset</button>
                </div>
            </div>
            </form>
        </div>
    </section>

    <section class="hk-sec-wrapper" style="margin:0 20px 0 20px;" id="questionmaintable">
        <div class="hk-row">
            <div class="span3">
                <?php
                if($role_permissions['permission_delete']==1)
                {
                ?>
                    <a style="display: none; color:#ff0000;" id="deletequestion" name="deletequestion"><i class="fa fa-trash cursor" style="font-size: 20px;color: red;margin:5px 0 0 0"></i> Delete Multiple questions</a>
                <?php
                }
                ?>
            </div>
           
        </div>


        <div class="table-wrap">
            <div class="table-responsive" id="questionrecord">
                @include('questionmasters::questionmaster/question_data')
            </div>
        </div><!--table-wrap-->

    </section>


        <div id="styleSelector">
    </div>



</div>
</div>
</div>
    <script type="text/javascript" src="{{URL::to('/')}}/public/js/xlsx.full.min.js"></script>
    <script src="{{URL::to('/')}}/public/modulejs/questionmaster/questionmaster.js"></script>
    

        <script>
        
            $('#searchquestionCollapse').click(function(e){
                $('#filterarea_block').slideToggle();
                jQuery.noConflict();

               
            });

          
        </script>

@endsection


