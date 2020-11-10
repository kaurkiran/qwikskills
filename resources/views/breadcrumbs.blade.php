<?php 
// echo '<pre>';
// print_r($urlData['breadcrumb']); exit;
?>
<div id="breadcrumb">
	<a href="{{URL::to('home')}}" title="" class="tip-bottom" data-original-title="Go to Home">
		<i class="icon-home"></i> Home
	</a>
	<?php
	if(sizeof($urlData['breadcrumb'])!='')
	{
	?>
	<a href="#" class="tip-bottom" data-original-title="" style="background-image: none;" title="">{{$urlData['breadcrumb'][0]['nav_tab_display_name']}}</a>
	<?php
	}
	?>
</div>
