<?php

?>
<div class="row ml-0" style="margin:10px 0 0 20px !important;">
    <input type="hidden" name="questionmaster_id" id="questionmaster_id" value="">
    <div class="span12">
        
            <div class="span12 questionmaster_name_card">
               
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
                </div>
        </div>



    
             <div class="span12">

                        <div class="span3 noMargin">
                            <label class="form-label">Question Title</label>
                               <textarea class="form-control form-inputtext invalid" name="question_title" id="question_title" placeholder=" "></textarea>    
                        </div>
                        <div class="span9 noMargin">
                            <label class="form-label">Tag</label>
                               <textarea class="form-control form-inputtext invalid" name="question_tag" id="question_tag" placeholder=""></textarea>    
                        </div>
                        <div class="span3 noMargin">
                            <label class="form-label">Option A</label>
                               <input type="text" class="form-control form-inputtext invalid" name="question_answer_a" id="question_answer_a" type="text" placeholder="Option A">    
                        </div>
                       <div class="span3 noMargin">
                            <label class="form-label">Option B</label>
                               <input type="text" class="form-control form-inputtext invalid" name="question_answer_b" id="question_answer_b" type="text" placeholder="Option B">    
                        </div>
                        <div class="span3 noMargin">
                            <label class="form-label">Option C</label>
                               <input type="text" class="form-control form-inputtext invalid" name="question_answer_c" id="question_answer_c" type="text" placeholder="Option C">    
                        </div>
                        <div class="span3 noMargin">
                            <label class="form-label">Option D</label>
                               <input type="text" class="form-control form-inputtext invalid" name="question_answer_d" id="question_answer_d" type="text" placeholder="Option D">    
                        </div>
                         <div class="span3 noMargin">
                            <label class="form-label">Corect Answer</label>
                               <input type="radio" name="question_correct_answer" id="a" value="A">&nbsp;<span style="position: relative;top:3px;color:#ff0000;">A</span>&nbsp;   
                               <input type="radio" name="question_correct_answer" id="b" value="B">&nbsp;<span style="position: relative;top:3px;color:#ff0000;">B</span>&nbsp;
                               <input type="radio" name="question_correct_answer" id="c" value="C">&nbsp;<span style="position: relative;top:3px;color:#ff0000;">C</span>&nbsp;
                               <input type="radio" name="question_correct_answer" id="d" value="D">&nbsp;<span style="position: relative;top:3px;color:#ff0000;">D</span>&nbsp;
                        </div>
                        <div class="span9 noMargin">
                            <label class="form-label">Question Summary</label>
                               <textarea class="form-control form-inputtext invalid" style="width:85% !important;" name="question_summary" id="question_summary" placeholder=""></textarea>   
                        </div>
                  
             </div>
</div>


