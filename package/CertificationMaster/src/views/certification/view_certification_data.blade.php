<?php
    // echo '<pre>'; print_r($certifications); exit;
?>

<?php
if(sizeof($certifications)!=0)
{
?>
    @foreach($certifications AS $certificationskey => $value)
    <tr id="">
        <td><button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="deleteCertification('{{$value->certification_master_id}}')" title="delete employee"><i class="fa fa-trash"></i></button></td>
        <td>{{$value->certification_title}}</td>
        <td>{{$value['wp_post']['post_title']}}</td>
        <td>{{$value['wp_term']['name']}} &raquo; {{$value['wp_term_child']['name']}}</td>
        <td>{{$value->no_of_questions}}</td>
        <td>{{date('d M Y',strtotime($value['created_at']))}}</td>
    </tr>
    @endforeach
<?php
}
else
{
    ?>
    <tr>
        <td colspan="6">no result found...</td>
    </tr>
    <?php
}
?>