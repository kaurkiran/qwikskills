
$('#cost_rate').keyup(function(e)
{
    var costrate   = $('#cost_rate').val();
    var costgstper = $("#cost_gst_percent").val();

    var extra_charge = $("#extra_charge").val();
    var costgstamt = ((Number(costrate) * Number(costgstper)) / Number(100)).toFixed(4);

    $("#cost_gst_amount").val(costgstamt);
    var	costprice  = (Number(costrate) +  Number(costgstamt)).toFixed(4);
    $("#cost_price").val(costprice);

    var productper = $("#profit_percent").val();

    var cost_rate_with_extracha = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);
    var productrs = ((Number(cost_rate_with_extracha) * Number(productper)) / Number(100)).toFixed(4);
    if(productrs <= 0) {
        $("#profit_amount").css('color','red');
    }
    else
    {
        $("#profit_amount").removeAttr('color');
    }

    if(productper <= 0) {
        $("#profit_percent").css('color','red');
    }
    else
    {
        $("#profit_percent").removeAttr('color');
    }
    $("#profit_amount").val(productrs);
    //selling price
    var sellingprice = (Number(cost_rate_with_extracha) + Number(productrs)).toFixed(4);


    $("#productform #selling_price").val(sellingprice);

    //selling gst rs
    var sellingper = $("#productform #sell_gst_percent").val();
    var sellingstrs = ((Number(sellingprice) * Number(sellingper)) / Number(100)).toFixed(4);
    var productmrp = (Number(sellingprice) + Number(sellingstrs)).toFixed(4);
    $("#productform #sell_gst_amount").val(sellingstrs);


        $("#productform #product_mrp").val(productmrp);
        $("#offer_price").val(productmrp);


});

$("#cost_gst_percent").keyup(function ()
{
    var costgstper = '';
    var costrate = Number($("#cost_rate").val());
    costgstper = Number($(this).val());

    $("#productform #sell_gst_percent").val(costgstper);


    //count percentage value in rupee
    var costgstval = ((Number(costrate) * Number(costgstper)) / Number(100)).toFixed(4);
    $("#cost_gst_amount").val(costgstval);
    $("#productform #sell_gst_amount").val(costgstval);

    //Add cost rate and cost rate gst in rupee
    var costprice = (Number(costrate) + Number(costgstval)).toFixed(4);
    $("#cost_price").val(costprice);

    var extra_charge = $("#extra_charge").val();
    var profiteval = $("#profit_percent").val();
    var cost_rate_with_extracharge = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);
    var profitrs = ((Number(cost_rate_with_extracharge) * Number(profiteval)) / Number(100)).toFixed(4);

    var sellingprice = (Number(cost_rate_with_extracharge) + Number(profitrs)).toFixed(4);


    //selling price
    $("#productform #selling_price").val(sellingprice);

    var sellgstper = $("#productform #sell_gst_percent").val();
    var sellingstrs = ((Number(sellingprice) * Number(sellgstper)) / Number(100)).toFixed(4);
    var productmrp = (Number(sellingprice) + Number(sellingstrs)).toFixed(4);

    $("#productform #sell_gst_amount").val(sellingstrs);




        $("#productform #product_mrp").val(productmrp);
        $("#offer_price").val(productmrp);




});

$("#profit_percent").keyup(function()
{
    var costrate   = $('#cost_rate').val();
    var profitper = $("#profit_percent").val();
    var extra_charge = $("#extra_charge").val();
    var cost_rate_with_extracharge = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);
    var profitval = ((Number(cost_rate_with_extracharge) * Number(profitper)) / Number(100)).toFixed(4);

    if(profitval <= 0) {
        $("#profit_amount").css('color','red');

    }
    else
    {
        $("#profit_amount").css('color','black');
    }

    if(profitper <= 0) {
        $("#profit_percent").css('color','red');
    }
    else
    {
        $("#profit_percent").removeAttr('color');
    }
    $("#profit_amount").val(profitval);

    //selling and mrp price
    var selling_mrp_price = (Number(cost_rate_with_extracharge) + Number(profitval)).toFixed(4);

    //selling price
    $("#productform #selling_price").val(selling_mrp_price);
    //product mrp
    var sellgstper = $("#productform #sell_gst_percent").val();
    var sellingstrs = ((Number(selling_mrp_price) * Number(sellgstper)) / Number(100)).toFixed(4);
    var productmrp = (Number(selling_mrp_price) + Number(sellingstrs)).toFixed(4);

    $("#productform #product_mrp").val(productmrp);
        //offer mrp
    $("#offer_price").val(productmrp);
});

/*
$("#profit_amount").keyup(function ()
{
    var profitamt = $("#profit_amount").val();

    var costrate   = $('#cost_rate').val();
    var extra_charge = $("#extra_charge").val();
    var cost_rate_with_extracharge = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);
    var profitper = ((Number(profitamt) * Number(100)) / Number(cost_rate_with_extracharge)).toFixed(4);

    $("#profit_percent").val(profitper);

    var selling_mrp_price = (Number(cost_rate_with_extracharge) + Number(profitamt)).toFixed(4);
    //selling price
    $("#productform #selling_price").val(selling_mrp_price);
    //product mrp
    var sellgstper = $("#productform #sell_gst_percent").val();
    var sellingstrs = ((Number(selling_mrp_price) * Number(sellgstper)) / Number(100)).toFixed(4);
    var productmrp = (Number(selling_mrp_price) + Number(sellingstrs)).toFixed(4);

    $("#productform #product_mrp").val(productmrp);
    //offer mrp
    $("#offer_price").val(productmrp);
});
*/

$("#extra_charge").keyup(function ()
{
    var cost_rate = $("#cost_rate").val();
    var extra_charge = $("#extra_charge").val();
    var cost_rate_with_extra = ((Number(cost_rate)) + (Number(extra_charge))).toFixed(4);

    var profit_percent = $("#profit_percent").val();

    var profit_amount = ((Number(profit_percent)) * (Number(cost_rate_with_extra)) / (Number(100))).toFixed(4);

    $("#profit_amount").val(profit_amount);

    var selling_price = ((Number(cost_rate_with_extra)) + (Number(profit_amount))).toFixed(4);

    $("#productform #selling_price").val(selling_price);


    var selgstper = $("#productform #sell_gst_percent").val();


    var sellinggstamt = (((Number(selling_price)) * (Number(selgstper)) / ((Number(100)) )).toFixed(4));

    $("#productform #sell_gst_amount").val(sellinggstamt);

    var productmrp = (Number(selling_price) + Number(sellinggstamt)).toFixed(4);

    $("#productform #sell_gst_amount").val(sellinggstamt);


    $("#productform #product_mrp").val(productmrp);
    $("#offer_price").val(productmrp);


});


/*$("#selling_price").keyup(function(){

    var sellingprice = $("#selling_price").val();

    var costprice = $("#cost_rate").val();

    var profitamt = ((Number(sellingprice)) - (Number(costprice))).toFixed(4);

    $("#profit_amount").val(profitamt);

    var profitpercent = ((Number(100)) * (Number(profitamt)) / (Number(sellingprice))).toFixed(4);
    $("#profit_percent").val(profitpercent);

    var sellingpercent = $("#sell_gst_percent").val();

    var sellinggstamt = ((Number(sellingprice)) * (Number(sellingpercent))/ (Number(100))).toFixed(4);
    $("#sell_gst_amount").val(sellinggstamt);

    var offerprice = (Number(sellingprice) + (Number(sellinggstamt))).toFixed(4);

    $("#offer_price").val(offerprice);
    $("#product_mrp").val(offerprice);


});*/

$("#productform #sell_gst_percent").keyup(function()
{
    var sellingprice = $("#productform #selling_price").val();
    var selgstper = $("#productform #sell_gst_percent").val();
    var costrate = $("#cost_rate").val();

    var extra_charge = $("#extra_charge").val();
    var cost_rate_with_extra = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);


    var selligdiff = ((Number(sellingprice)) - (Number(cost_rate_with_extra))).toFixed(4);

    //var sellinggstpercent = ((Number(100)) * (Number(sellinggstamt)) / (Number(sellingprice))).toFixed(4);

    var sellinggstamt = (((Number(sellingprice)) * (Number(selgstper)) / ((Number(100)) )).toFixed(4));

    $("#productform #sell_gst_amount").val(sellinggstamt);

    var productmrp = (Number(sellingprice) + Number(sellinggstamt)).toFixed(4);

    $("#productform #sell_gst_amount").val(sellinggstamt);


    $("#productform #product_mrp").val(productmrp);
    $("#offer_price").val(productmrp);


});


$("#productform #offer_price").keyup(function ()
{
    offer_price_calculation();
});


function offer_price_calculation()
{
    var offerprice = $("#offer_price").val();
    var sellgstper = $("#productform #sell_gst_percent").val();

    var eq1 = (Number(offerprice) * Number(sellgstper)).toFixed(4);
    var eq2 = (Number(100) + Number(sellgstper)).toFixed(4);
    var sellgstval = (Number(eq1) / Number(eq2)).toFixed(4);

    $("#productform #product_mrp").val(offerprice);
    $("#productform #sell_gst_amount").val(sellgstval);
    $("#productform #product_mrp").val(offerprice);

    var costrate = $("#cost_rate").val();

    var sellingrate = ((Number(offerprice) - Number(sellgstval))).toFixed(4);
    $("#productform #selling_price").val(sellingrate);

    var extra_charge = $("#extra_charge").val();
    var cost_rate_with_extracharge = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);

    var profitamt = ((Number(sellingrate)) - (Number(cost_rate_with_extracharge))).toFixed(4);

    if(profitamt <= 0) {
        $("#profit_amount").css('color','red');
    }
    else
    {
        $("#profit_amount").css('color','black');
    }
    $("#profit_amount").val(profitamt);
    var profitper = $("#profit_percent").val();
    var ex1 = (Number(profitamt) * Number(100)).toFixed(4);
    //var ex2 =  (Number(profitamt) + Number(100)).toFixed(4);

    if(costrate == 0)
    {
        costrate = 1;
    }
    var profitpernew = ((Number(ex1)) / (Number(cost_rate_with_extracharge))).toFixed(4);
    if(profitpernew <= 0)
    {
        $("#profit_percent").css('color','red');
    }
    else
    {
        $("#profit_percent").css('color','black');
    }
    $("#profit_percent").val(profitpernew);
}



$('#cost_rate,#cost_gst_percent,#profit_percent,#extra_charge,#sell_gst_percent,#offer_price').focusout(function(){

    var productmrp = $("#offer_price").val();
    var selling_mrp_price = $("#productform #selling_price").val();
    var roundval = Math.round(productmrp);
    var check_point_val = ((Number(roundval)) - Number(selling_mrp_price));
    if(check_point_val >0 || check_point_val < 0)
    {
        $("#productform #product_mrp").val(roundval);
        //offer mrp
        $("#productform #offer_price").val(roundval);

        offer_price_calculation();
    }

});

