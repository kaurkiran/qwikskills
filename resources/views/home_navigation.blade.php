<?php
    $current_urlx    =   url()->current();
    $strArrayx       =   explode('/',$current_urlx);
    $pageUrlx        =   end($strArrayx);

    // echo '<pre>'; print_r(); exit;
    $ismaster 		 =	$urlData['UsersData'][0]['is_master'];

?>

<div id="user-nav" class="navbar navbar-inverse">
	

  	<ul class="nav">
	<?php
	 if($navLinks['chk_master']==1)
	  {
	  ?>
			    @foreach($navLinks['navLinks'] AS $k=>$v)
			    <?php

			    if($v['nav_label']=='' and $v['parent']==0){
			        ?>

			        <?php
			        if(sizeof($v['home_navigations_data']) != 0)
				    {
				    	$dropdown 	=	' dropdown';
				    	$menu 		=	'id="menu-messages-'.$k.'"';
				    	$toggle 	=	'data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"';
				    }
				    else
				    {
				    	$dropdown 	=	'';
				    	$menu 		=	'';
				    	$toggle 	=	'';
				    }
			        ?>
			        <li class="nav-item<?php echo $pageUrlx==$v['nav_url']?' active':''; echo $dropdown;?>" <?php echo $menu?>>
			        <a class="" href="{{URL::to($v->nav_url)}}" <?php echo $toggle;?>>
			            <i class="{{URL::to($v->nav_icon_class)}}"></i>
			            <span class="text">{{$v->nav_display_name}} <span class="tableno_{{$v->nav_display_name}}"></span></span></a>
			        
			        <?php

			        
				    	?>
				    	
				    		<ul class="dropdown-menu">
				    	<?php
					    foreach($v['home_navigations_data'] as $key=>$val)
					    {
					        ?>
					        
					        <li class="nav-item<?php echo $pageUrlx==$val['nav_url']?' active':''?>">
					        <a class="" href="{{URL::to($val->nav_url)}}">{{$val->nav_display_name}}</a>
					        </li>
					    	
					        <?php
					    }
					    ?>
					    </ul>
					   
					    <?php
					
					echo '</li>';
			    }



			    

			    ?>
			 @endforeach
<?php
      }
      else
      {


  	?>
    @foreach($navLinks['navLinks'] AS $k=>$v)
    <?php

    if($v['home_navigations']['nav_label']=='' and $v['home_navigations']['parent']==0){
        ?>

        <?php
        if(sizeof($v['sub']) != 0)
	    {
	    	$dropdown 	=	' dropdown';
	    	$menu 		=	'id="menu-messages-'.$k.'"';
	    	$toggle 	=	'data-toggle="dropdown" data-target="#menu-messages" class="dropdown-toggle"';
	    }
	    else
	    {
	    	$dropdown 	=	'';
	    	$menu 		=	'';
	    	$toggle 	=	'';
	    }

	   
        ?>
        <li class="nav-item<?php echo $pageUrlx==$v['home_navigations']['nav_url']?' active':''; echo $dropdown;?>" <?php echo $menu?>>
        <a class="" href="{{URL::to($v['home_navigations']['nav_url'])}}" <?php echo $toggle;?>>
            <i class="{{URL::to($v['home_navigations']['nav_icon_class'])}}"></i>
            <span class="text">{{$v['home_navigations']['nav_display_name']}} <span class="tableno_{{$v['home_navigations']['nav_display_name']}}"></span></span></a>
        
        <?php

        
	    	?>
	    	
	    		<ul class="dropdown-menu">
	    			<?php
					    foreach($v['sub'] as $key=>$val)
					    {
					    	//print_r($val['home_navigations_data_s']['nav_display_name']);
					        ?>
					        
					        <li class="nav-item<?php echo $pageUrlx==$val['home_navigations_data_s']['nav_url']?' active':''?>">
					        <a class="" href="{{URL::to($val['home_navigations_data_s']['nav_url'])}}">{{$val['home_navigations_data_s']['nav_display_name']}}</a>
					        </li>
					    	
					        <?php
					    }
					    ?>
	    		</ul>
		   
		    <?php
		
		echo '</li>';
    }



    

    ?>
 @endforeach
 <?php
  }
 ?>
    <li class="li_redBG">
<a href="{{ route('logout') }}"
   onclick="event.preventDefault();
                 document.getElementById('logout-form').submit();">
    <!-- <i class="icon icon-share-alt"></i> --> <span class="text">Logout</span>
</a>

<form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none" style="margin:0;">
    @csrf
</form>

    </li>
    

  </ul>


</div>



@yield('main-hk-pg-wrapper')