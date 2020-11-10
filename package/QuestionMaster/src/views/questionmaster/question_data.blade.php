<table id="questionrecordtable" class="table tablesaw table-bordered table-hover table-striped mb-0 font14" data-tablesaw-sortable data-tablesaw-sortable-switch data-tablesaw-no-labels>

<thead>
<tr class="blue_Head ">
    
    <th scope="col" class="tablesaw-swipe-cellpersist center"  data-tablesaw-priority="persist"></th>
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Question Title</th>
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Option A</th>   
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Option B</th>   
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Option C</th>   
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Option D</th> 
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Correct Answer</th> 
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Tag</th> 
    <th scope="col" class="leftAlign" data-tablesaw-sortable-col data-tablesaw-priority="persist">Added On</th>    
</tr>
</thead>
<tbody id="productsalldata">
<?php
if(sizeof($questionsdata)!=0)
{
?>
    @foreach($questionsdata AS $questionkey => $questionvalue)
    <tr id="">
        <td><button class="btn btn-icon btn-icon-only btn-secondary btn-icon-style-4" onclick="deletequestion('{{$questionvalue['questionmaster_id']}}')" title="delete employee"><i class="fa fa-trash"></i></button></td>
        <td>{{$questionvalue['question_title']}}</td>
        <td>{{$questionvalue['question_answer_a']}}</td>
        <td>{{$questionvalue['question_answer_b']}}</td>
        <td>{{$questionvalue['question_answer_c']}}</td>
        <td>{{$questionvalue['question_answer_d']}}</td>
        <td>{{$questionvalue['question_correct_answer']}}</td>
        <td>{{$questionvalue['question_tag']}}</td>
        <td>{{date('d M Y',strtotime($questionvalue['created_at']))}}</td>
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

<tr>
    <td colspan="28" class="paginateui">
        {!! $questionsdata->links() !!}
    </td>
</tr>
</tbody>
    </table>
    <input type="hidden" name="hidden_page" id="hidden_page" value="1" />
    <input type="hidden" name="hidden_column_name" id="hidden_column_name" value="product_id" />
    <input type="hidden" name="hidden_sort_type" id="hidden_sort_type" value="desc" />
    <input type="hidden" name="fetch_data_url" id="fetch_data_url" value="product_fetch_data" />


<script>
   
</script>
