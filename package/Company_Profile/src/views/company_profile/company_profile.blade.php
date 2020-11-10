@include('pagetitle')
@extends('master')

@section('main-hk-pg-wrapper')

<?php
    echo  $company_profile_id = (isset($company_profile) && $company_profile['company_profile_id'] != '' ?$company_profile['company_profile_id'] : '');
    $fullname = (isset($company_profile) && $company_profile['full_name'] != '' ?$company_profile['full_name'] : '');
    $personal_mobile_dial_code = (isset($company_profile) && $company_profile['personal_mobile_dial_code'] != '' ?$company_profile['personal_mobile_dial_code'] : '');
    $personal_mobile_no = (isset($company_profile) && $company_profile['personal_mobile_no'] != '' ?$company_profile['personal_mobile_no'] : '');
    $personal_email = (isset($company_profile) && $company_profile['personal_email'] != '' ?$company_profile['personal_email'] : '');
    $company_name = (isset($company_profile) && $company_profile['company_name'] != '' ?$company_profile['company_name'] : '');
    $company_email = (isset($company_profile) && $company_profile['company_email'] != '' ?$company_profile['company_email'] : '');
    $gstin = (isset($company_profile) && $company_profile['gstin'] != '' ?$company_profile['gstin'] : '');

    $company_mobile = (isset($company_profile) && $company_profile['company_mobile'] != '' ?$company_profile['company_mobile'] : '');
    $website = (isset($company_profile) && $company_profile['website'] != '' ?$company_profile['website'] : '');
    $state_id = (isset($company_profile) && $company_profile['state_id'] != '' ?$company_profile['state_id'] : '');

    $whatsapp_mobile_number = (isset($company_profile) && $company_profile['whatsapp_mobile_number'] != '' ?$company_profile['whatsapp_mobile_number'] : '');

    $company_address = (isset($company_profile) && $company_profile['company_address'] != '' ?$company_profile['company_address'] : '');
    $company_area = (isset($company_profile) && $company_profile['company_area'] != '' ?$company_profile['company_area'] : '');
    $company_city = (isset($company_profile) && $company_profile['company_city'] != '' ?$company_profile['company_city'] : '');
    $company_pincode = (isset($company_profile) && $company_profile['company_pincode'] != '' ?$company_profile['company_pincode'] : '');
    $country_id = (isset($company_profile) && $company_profile['country_id'] != '' ?$company_profile['country_id'] : '102');

?>

<br clear="all" />
<br clear="all" />
<div id="content">
  <div id="content-header">
    @include('breadcrumbs')
    
    <h1>Profile</h1>
  </div>


<form name="company_profile_form" id="company_profile_form" type="post" method="post" enctype="multipart/form-data">
            <meta name="csrf-token" content="{{ csrf_token() }}" />
            

            <input type="hidden" name="company_profile_id" id="company_profile_id" value="<?php echo $company_profile_id ?>">
           

            <input type="hidden" name="is_store" id="is_store" value="0">

            <input type="hidden" name="company_id" id="company_id" value="">
            <input type="hidden" name="store_id" id="store_id" value="">


  <div class="container-fluid">
    <div class="row-fluid">
     
      <div class="span12">
        <div class="widget-box">
          <div class="widget-title"> <span class="icon"> <i class="icon-align-justify"></i> </span>
            <h5>Edit Profile</h5>
          </div>
          <div class="widget-content nopadding form-horizontal">
           

                <div class="span6">
                    <div class="control-label">
                        <h4>Personal Information</h4>
                    </div>
                    <br clear="all" />

                    <div class="control-group">
                        <label class="control-label">Full Name</label>
                        <div class="controls">
                            <input type="text" maxlength="255" autocomplete="off" name="full_name"
                                               id="full_name" value="<?php echo $fullname ?>"
                                               class="form-control form-inputtext invalid span9" placeholder="" autofocus>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">Mobile No.</label>
                        <div class="controls">
                            <input type="tel" autocomplete="off" name="personal_mobile_no"
                                               id="personal_mobile_no" value="<?php echo $personal_mobile_no ?>"
                                                maxlength="15"
                                               class="form-control form-inputtext mobileregax invalid span9" placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">eMail Address</label>
                        <div class="controls">
                            <input type="text" autocomplete="off" maxlength="50" name="personal_email"
                                               id="personal_email" value="<?php echo $personal_email ?>"
                                               class="form-control form-inputtext invalid span9" placeholder="">
                        </div>
                    </div>

                    <!-- <div class="form-actions">
                        <button type="submit" class="btn btn-success">Save</button>
                    </div> -->

                </div>
                
                <div class="span6">
                    <div class="control-label">
                        <h4>Company Information</h4>
                    </div>

                    <br clear="all" />

                    <div class="control-group">
                        <label class="control-label">Company Name</label>
                        <div class="controls">
                            <input type="text" maxlength="200" autocomplete="off" name="company_name"
                                               id="company_name" value="<?php echo $company_name ?>"
                                               class="form-control form-inputtext invalid span9" placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">Mobile No.</label>
                        <div class="controls">
                            <input type="tel" autocomplete="off" name="company_mobile"
                                               id="company_mobile" value="<?php echo $company_mobile ?>" maxlength="15"
                                               class="form-control form-inputtext mobileregax span9" placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">eMail Address</label>
                        <div class="controls">
                            <input type="text" autocomplete="off" maxlength="50" name="company_email"
                                               id="company_email" value="<?php echo $company_email ?>"
                                               class="form-control form-inputtext span9" placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">Website</label>
                        <div class="controls">
                            <input type="text" maxlength="255" name="website" id="website"
                                               value="<?php echo $website ?>" class="form-control form-inputtext span9"
                                               placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">GSTIN</label>
                        <div class="controls">
                            <input type="text" maxlength="15" name="gstin" id="gstin"
                                               value="<?php echo $gstin ?>" class="form-control form-inputtext span9"
                                               placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">State</label>
                        <div class="controls">
                            <select class="form-control form-inputtext invalid span9"
                                                <?php if ($gstin != '' && $gstin != null) echo "true"; else echo "false";?>
                                                style="<?php if ($gstin != '') echo "color: black" ?>" name="state_id"
                                                id="state_id">
                                            <option value="">Select State</option>
                                            @foreach($state->sortBy('state_name') AS $state_key=>$state_value)
                                                <option value="{{$state_value->state_id}}" <?php if ($state_id != '' && $state_value['state_id'] == $state_id) echo "selected"  ?> >{{$state_value->state_name}}</option>
                                            @endforeach
                                        </select>
                        </div>
                    </div>
                </div>


              
          </div>
        </div>

<br clear="all" />
        <div class="widget-box">
          
          <div class="widget-content nopadding form-horizontal">
               <div class="span6">
                    <div class="control-label">
                        <h4>Address Detail</h4>
                    </div>
                    <br clear="all" />

                    <div class="control-group">
                                        
                        <label class="control-label">Shop no.,Building,Street etc.</label>
                        <div class="controls">
                            <textarea name="company_address" id="company_address" class="form-control form-inputtext invalid span9" placeholder=""><?php echo $company_address ?></textarea>
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">Area</label>
                        <div class="controls">
                            <input type="text" maxlength="255" name="company_area" id="company_area" value="<?php echo $company_area ?>" class="form-control form-inputtext invalid span9" placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">City / Town</label>
                        <div class="controls">
                            <input type="text" maxlength="100" name="company_city" id="company_city" value="<?php echo $company_city ?>" class="form-control form-inputtext invalid span9" placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">Pin / Zip Code</label>
                        <div class="controls">
                            <input type="text" maxlength="15" name="company_pincode"
                                                       id="company_pincode" value="<?php echo $company_pincode ?>"
                                                       class="form-control form-inputtext onlyinteger span9"
                                                       placeholder="">
                        </div>
                    </div>

                    <div class="control-group">
                        <label class="control-label">Country</label>
                        <div class="controls">
                            <select class="form-control form-inputtext span9" name="country_id" id="country_id">

                                                    @foreach($country->sortBy('country_name') AS $country_key=>$country_value)
                                                        <option
                                                            <?php if ($country_value['country_id'] == $country_id) echo "selected"  ?> value="{{$country_value->country_id}}">{{$country_value->country_name}}</option>
                                                    @endforeach
                                                </select>
                        </div>
                    </div>

                    <br clear="all" />
                    <div class="control-group">
                        <button type="button" name="resetcompany_profile"
                                onclick="resetcompany_profiledata();" class="btn btn-light addbutton"
                                id="resetcompany_profile" data-container="body" data-toggle="popover"
                                data-placement="bottom" data-content="">Reset Company Profile
                        </button>

                        <button type="button" name="addcompanyprofile" class="btn btn-info addbutton"
                                id="addcompanyprofile" data-container="body" data-toggle="popover"
                                data-placement="bottom" data-content="">Update Information
                        </button>
                    </div>

                </div>
 


              
            
          </div>
        </div>
      </div>


    </div>

  </div></form>
</div>

    
 

    <script src="{{ asset('public/js/jquery.min.js') }}"></script> 
    <script src="{{URL::to('/')}}/public/modulejs/company_profile/company_profile.js"></script>


    <script type="text/javascript">
        $(document).ready(function () {
        

        });


    
        


        CKEDITOR.replace('company_address',{

        });

        CKEDITOR.replace('terms_and_condition', {
            height: ['100px']
        });
        CKEDITOR.replace('additional_message', {
            height: ['100px']
        });

        CKEDITOR.replace('po_terms_and_condition', {
            height: ['100px']
        });

    </script>

@endsection
