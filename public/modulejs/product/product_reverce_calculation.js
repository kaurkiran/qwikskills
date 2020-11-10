
//client enter only profit percent and offerprice/product mrp
$("#offer_price").keyup(function ()
{
    var offerprice = $("#offer_price").val();
    var sellgstper = $("#sell_gst_percent").val();

    var eq1 = (Number(offerprice) * Number(sellgstper));
    var eq2 = (Number(100) + Number(sellgstper));
    var sellgstval = (Number(eq1) / Number(eq2)).toFixed(4);

    $("#product_mrp").val(offerprice);
    $("#sell_gst_amount").val(sellgstval);
    $("#product_mrp").val(offerprice);

    var sellingrate = ((Number(offerprice) - Number(sellgstval))).toFixed(4);
    $("#selling_price").val(sellingrate);

    var extra_charge = $("#extra_charge").val();


    var profitper = $("#profit_percent").val();

    var profitamt = 0;
    if(profitper != '' && profitper != 0)
    {
         profitamt = ((Number(sellingrate)) * (Number(profitper)) / (Number(100))).toFixed(4);
    }

    if(profitamt <= 0)
    {
        $("#profit_amount").css('color','red');
    }
    else
    {
        $("#profit_amount").css('color','black');
    }
    $("#profit_amount").val(profitamt);

    var cost_rate = ((Number(sellingrate)) - ((Number(profitamt))+Number(extra_charge))).toFixed(4);

    $("#cost_rate").val(cost_rate);

    var cost_gst_per = $("#cost_gst_percent").val();

    var cost_gst_amt = ((Number(cost_rate) * Number(cost_gst_per)) / Number(100)).toFixed(4);

    $("#cost_gst_amount").val(cost_gst_amt);

    var cost_price = (Number(cost_rate) + Number(cost_gst_amt)).toFixed(4);

    $("#cost_price").val(cost_price);
});

$("#sell_gst_percent").keyup(function()
{
    var sellingprice = $("#selling_price").val();
    var selgstper = $("#sell_gst_percent").val();

    var sellinggstamt = (((Number(sellingprice)) * (Number(selgstper)) / ((Number(100)) )).toFixed(4));

    $("#sell_gst_amount").val(sellinggstamt);

    var productmrp = (Number(sellingprice) + Number(sellinggstamt)).toFixed(4);

    $("#sell_gst_amount").val(sellinggstamt);
    $("#product_mrp").val(productmrp);
    $("#offer_price").val(productmrp);

});

$("#extra_charge").keyup(function ()
{
    var cost_rate = $("#cost_rate").val();
    var extra_charge = $("#extra_charge").val();
    var cost_rate_with_extra = ((Number(cost_rate)) + (Number(extra_charge))).toFixed(4);

    var profit_percent = $("#profit_percent").val();

    var profit_amount = ((Number(profit_percent)) * (Number(cost_rate_with_extra)) / (Number(100))).toFixed(4);

    $("#profit_amount").val(profit_amount);

    var selling_price = ((Number(cost_rate_with_extra)) + (Number(profit_amount))).toFixed(4);

    $("#selling_price").val(selling_price);

    var selgstper = $("#sell_gst_percent").val();

    var sellinggstamt = (((Number(selling_price)) * (Number(selgstper)) / ((Number(100)) )).toFixed(4));

    $("#sell_gst_amount").val(sellinggstamt);

    var productmrp = (Number(selling_price) + Number(sellinggstamt)).toFixed(4);

    $("#sell_gst_amount").val(sellinggstamt);
    $("#product_mrp").val(productmrp);
    $("#offer_price").val(productmrp);
});

$("#profit_percent").keyup(function()
{
    var costrate   = $('#cost_rate').val();
    var profitper = $("#profit_percent").val();
    var extra_charge = $("#extra_charge").val();
    var cost_rate_with_extracharge = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);
    var profitval = ((Number(cost_rate_with_extracharge) * Number(profitper)) / Number(100)).toFixed(4);

    if(profitval <= 0)
    {
        $("#profit_amount").css('color','red');
    }
    else
    {
        $("#profit_amount").css('color','black');
    }

    if(profitper <= 0)
    {
        $("#profit_percent").css('color','red');
    }
    else
    {
        $("#profit_percent").removeAttr('color');
    }

    $("#profit_amount").val(profitval);

    var selling_mrp_price = (Number(cost_rate_with_extracharge) + Number(profitval)).toFixed(4);

    $("#selling_price").val(selling_mrp_price);
    var sellgstper = $("#sell_gst_percent").val();
    var sellingstrs = ((Number(selling_mrp_price) * Number(sellgstper)) / Number(100)).toFixed(4);
    $("#sell_gst_amount").val(sellingstrs);
    var productmrp = (Number(selling_mrp_price) + Number(sellingstrs)).toFixed(4);

    $("#product_mrp").val(productmrp);
    $("#offer_price").val(productmrp);

});

$("#cost_gst_percent").keyup(function ()
{
    var costgstper = '';
    var costrate = Number($("#cost_rate").val());
    costgstper = Number($(this).val());

    $("#sell_gst_percent").val(costgstper);


    //count percentage value in rupee
    var costgstval = ((Number(costrate) * Number(costgstper)) / Number(100)).toFixed(4);
    $("#cost_gst_amount").val(costgstval);
    $("#sell_gst_amount").val(costgstval);

    //Add cost rate and cost rate gst in rupee
    var costprice = (Number(costrate) + Number(costgstval)).toFixed(4);
    $("#cost_price").val(costprice);

    var extra_charge = $("#extra_charge").val();
    var profiteval = $("#profit_percent").val();
    var cost_rate_with_extracharge = ((Number(costrate)) + (Number(extra_charge))).toFixed(4);
    var profitrs = ((Number(cost_rate_with_extracharge) * Number(profiteval)) / Number(100)).toFixed(4);

    var sellingprice = (Number(cost_rate_with_extracharge) + Number(profitrs)).toFixed(4);

    //selling price
    $("#selling_price").val(sellingprice);

    var sellgstper = $("#sell_gst_percent").val();
    var sellingstrs = ((Number(sellingprice) * Number(sellgstper)) / Number(100)).toFixed(4);
    var productmrp = (Number(sellingprice) + Number(sellingstrs)).toFixed(4);

    $("#sell_gst_amount").val(sellingstrs);

    $("#product_mrp").val(productmrp);
    $("#offer_price").val(productmrp);

});

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


    $("#selling_price").val(sellingprice);

    //selling gst rs
    var sellingper = $("#sell_gst_percent").val();
    var sellingstrs = ((Number(sellingprice) * Number(sellingper)) / Number(100)).toFixed(4);
    var productmrp = (Number(sellingprice) + Number(sellingstrs)).toFixed(4);
    $("#sell_gst_amount").val(sellingstrs);
    $("#product_mrp").val(productmrp);
    $("#offer_price").val(productmrp);

});
