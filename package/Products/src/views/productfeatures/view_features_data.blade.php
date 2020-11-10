<?php
if(sizeof($result)!=0)
{
	// echo '<pre>'; print_r($result);
	?>
		<table class="table tablesaw table-bordered table-hover table-striped mb-0 font13" style="width: 98%;"  data-tablesaw-sortable data-tablesaw-minimap data-tablesaw-mode-switch>
        <thead class="">
            <tr class="blue_Head">
                <th width="20%">HTML Name &amp; ID</th>
                <th width="15%">Display Name</th>
                <th width="15%">Child Name</th>
                <th width="15%">Url</th>
                <th width="10%">Type</th>
                <th width="5%">Location</th>
                <th width="10%" class="centerAlign">Status</th>
                <th width="15%">Action</th>
            </tr>
        </thead>
		@foreach($result AS $resultkey => $value)

		<?php
			if($value['is_active']==1)
			{
				$status 	=	'<span onclick="FeatureActive('.$value->product_features_id.',0)" class="greencolor cursor">Active</span>';
				$class 		=	'';
			}
			else
			{
				$status 	=	'<span onclick="FeatureActive('.$value->product_features_id.',1)" class="redcolor cursor">In-active</span>';
				$class 		=	'trInactive';
			}

			if($value['feature_type']==1)
			{
				$type 	=	'Product Feature';
			}
			elseif($value['feature_type']==2)
			{
				$type 	=	'Pages';
			}
			elseif($value['feature_type']==3)
			{
				$type 	=	'Blog';
			}

			if($value['feature_location']==0)
			{
				$location 	=	'--';
			}
			elseif($value['feature_location']==1)
			{
				$location 	=	'at Top Menu';
			}
			elseif($value['feature_location']==2)
			{
				$location 	=	'at Main Menu';
			}
			elseif($value['feature_location']==3)
			{
				$location 	=	'at Footer Menu';
			}
		?>

		<tr class="{{$class}}">
			<td class="leftAlign">{{$value->html_name}} <small>({{$value->html_id}})</small></td>
			<td class="leftAlign">{{$value->product_features_name}}</td>
			<td class="leftAlign"><input type="text" id="mainVal_{{$value->product_features_id}}" onkeyup="UpdateOrdering('{{$value->product_features_id}}')" class="form-control text font11" style="width:40px;" value="{{$value->ordering}}" /></td>
			<td class="leftAlign">{{$value->feature_url}}</td>
			<td class="leftAlign">{{$type}}</td>
			<td class="leftAlign">{{$location}}</td>
			<td class="centerAlign"><?php echo $status; ?></td>
			<td class="leftAlign">
				<button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="editFeature(({{$value->product_features_id}}))"title="edit Page"><i class="fa fa-pencil"></i></button>

				<button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="deleteFeature({{$value->product_features_id}})" title="delete Page"><i class="fa fa-trash"></i></button>
			</td>
		</tr>

			@foreach($value->product_features_data_1 AS $resultkey_1 => $value_1)

			<?php

			if($value_1['is_active']==1)
			{
				$status 	=	'<span onclick="FeatureSubActive('.$value_1->product_features_data_id.',0)" class="greencolor cursor">Active</span>';
				$class1 	=	'';
			}
			else
			{
				$status 	=	'<span onclick="FeatureSubActive('.$value_1->product_features_data_id.',1)" class="redcolor cursor">In-active</span>';
				$class1 	=	'trInactive';
			}

			?>

			<tr class="{{$class1}}">
				<td>&nbsp;</td>
				<td>&nbsp;</td>
				<td class="leftAlign" style="color:#ff0000;"><i class="fa fa-level-down"></i>{{$value_1->product_features_data_value}}
					<input type="text" id="subVal_{{$value_1->product_features_data_id}}" onkeyup="UpdateOrderingSub('{{$value_1->product_features_data_id}}')" class="form-control text font11" style="width:40px; float:right;" value="{{$value_1->ordering}}" /></td>
				<td class="leftAlign">{{$value_1->product_features_data_url}}</td>
				<td class="leftAlign">--</td>
				<td class="leftAlign">--</td>
				<td class="centerAlign"><?php echo $status; ?></td>
				<td>
					<button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="editSubFeature('{{$value->product_features_id}}','{{$value_1->product_features_data_id}}')"title="edit Page"><i class="fa fa-pencil"></i></button>

					<button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="deleteSubFeature('{{$value->product_features_id}}','{{$value_1->product_features_data_id}}')" title="delete Page"><i class="fa fa-trash"></i></button>
				</td>
			</tr>
			@endforeach


		@endforeach
		</table>

		<script type="text/javascript">
		$(document).ready(function(e){
			$('.PagecountResult').html('&nbsp;(<?php echo ($resultkey+1)?>)');
		})
		</script>
	<?php
}
?>