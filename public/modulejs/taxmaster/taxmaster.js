var data = {
            countries: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
                "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
                "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
                "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma",
                "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad",
                "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the",
                "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
                "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
                "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
                "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea",
                "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
                "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
                "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos",
                "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
                "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
                "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco",
                "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
                "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru",
                "Philippines", "Poland", "Portugal", "Romania", "Russia", "Rwanda", "Samoa", "San Marino",
                "Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone",
                "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain",
                "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan",
                "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
                "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
                "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"],
            capitals: ["Abu Dhabi", "Abuja", "Accra", "Adamstown", "Addis Ababa", "Algiers", "Alofi", "Amman", "Amsterdam",
                "Andorra la Vella", "Ankara", "Antananarivo", "Apia", "Ashgabat", "Asmara", "Astana", "Asunción", "Athens",
                "Avarua", "Baghdad", "Baku", "Bamako", "Bandar Seri Begawan", "Bangkok", "Bangui", "Banjul", "Basseterre",
                "Beijing", "Beirut", "Belgrade", "Belmopan", "Berlin", "Bern", "Bishkek", "Bissau", "Bogotá", "Brasília",
                "Bratislava", "Brazzaville", "Bridgetown", "Brussels", "Bucharest", "Budapest", "Buenos Aires", "Bujumbura",
                "Cairo", "Canberra", "Caracas", "Castries", "Cayenne", "Charlotte Amalie", "Chisinau", "Cockburn Town",
                "Conakry", "Copenhagen", "Dakar", "Damascus", "Dhaka", "Dili", "Djibouti", "Dodoma", "Doha", "Douglas",
                "Dublin", "Dushanbe", "Edinburgh of the Seven Seas", "El Aaiún", "Episkopi Cantonment", "Flying Fish Cove",
                "Freetown", "Funafuti", "Gaborone", "George Town", "Georgetown", "Georgetown", "Gibraltar", "King Edward Point",
                "Guatemala City", "Gustavia", "Hagåtña", "Hamilton", "Hanga Roa", "Hanoi", "Harare", "Hargeisa", "Havana",
                "Helsinki", "Honiara", "Islamabad", "Jakarta", "Jamestown", "Jerusalem", "Juba", "Kabul", "Kampala",
                "Kathmandu", "Khartoum", "Kiev", "Kigali", "Kingston", "Kingston", "Kingstown", "Kinshasa", "Kuala Lumpur",
                "Kuwait City", "Libreville", "Lilongwe", "Lima", "Lisbon", "Ljubljana", "Lomé", "London", "Luanda", "Lusaka",
                "Luxembourg", "Madrid", "Majuro", "Malabo", "Malé", "Managua", "Manama", "Manila", "Maputo", "Marigot",
                "Maseru", "Mata-Utu", "Mbabane Lobamba", "Melekeok Ngerulmud", "Mexico City", "Minsk", "Mogadishu", "Monaco",
                "Monrovia", "Montevideo", "Moroni", "Moscow", "Muscat", "Nairobi", "Nassau", "Naypyidaw", "N'Djamena",
                "New Delhi", "Niamey", "Nicosia", "Nicosia", "Nouakchott", "Nouméa", "Nukuʻalofa", "Nuuk", "Oranjestad",
                "Oslo", "Ottawa", "Ouagadougou", "Pago Pago", "Palikir", "Panama City", "Papeete", "Paramaribo", "Paris",
                "Philipsburg", "Phnom Penh", "Plymouth Brades Estate", "Podgorica Cetinje", "Port Louis", "Port Moresby",
                "Port Vila", "Port-au-Prince", "Port of Spain", "Porto-Novo Cotonou", "Prague", "Praia", "Cape Town",
                "Pristina", "Pyongyang", "Quito", "Rabat", "Reykjavík", "Riga", "Riyadh", "Road Town", "Rome", "Roseau",
                "Saipan", "San José", "San Juan", "San Marino", "San Salvador", "Sana'a", "Santiago", "Santo Domingo",
                "São Tomé", "Sarajevo", "Seoul", "Singapore", "Skopje", "Sofia", "Sri Jayawardenepura Kotte", "St. George's",
                "St. Helier", "St. John's", "St. Peter Port", "St. Pierre", "Stanley", "Stepanakert", "Stockholm", "Sucre",
                "Sukhumi", "Suva", "Taipei", "Tallinn", "Tarawa Atoll", "Tashkent", "Tbilisi", "Tegucigalpa", "Tehran",
                "Thimphu", "Tirana", "Tiraspol", "Tokyo", "Tórshavn", "Tripoli", "Tskhinvali", "Tunis", "Ulan Bator", "Vaduz",
                "Valletta", "The Valley", "Vatican City", "Victoria", "Vienna", "Vientiane", "Vilnius", "Warsaw",
                "Washington, D.C.", "Wellington", "West Island", "Willemstad", "Windhoek", "Yamoussoukro", "Yaoundé", "Yaren",
                "Yerevan", "Zagreb"]
        };
        $('#js-typeahead').typeahead({
        //typeof $.typeahead === 'function' && $.typeahead({
           // input: ".js-typeahead",
            minLength: 1,
            order: "asc",
            group: true,
            maxItemPerGroup: 10,
            // groupOrder: function (node, query, result, resultCount, resultCountPerGroup) {

            //     var scope = this,
            //         sortGroup = [];

            //     for (var i in result) {
            //         sortGroup.push({
            //             group: i,
            //             length: result[i].length
            //         });
            //     }

            //     sortGroup.sort(
            //         scope.helper.sort(
            //             ["length"],
            //             false, // false = desc, the most results on top
            //             function (a) {
            //                 return a.toString().toUpperCase()
            //             }
            //         )
            //     );

            //     return $.map(sortGroup, function (val, i) {
            //         return val.group
            //     });
            // },
            // hint: true,
            // dropdownFilter: "All",
            // href: "https://en.wikipedia.org/?title={{display}}",
            // template: "{{display}}, <small><em>{{group}}</em></small>",
            // emptyTemplate: "no result for {{query}}",
            source: {
                country: {
                    data: data.countries
                },
                capital: {
                    data: data.capitals
                }
            },
            callback: {
                onClickAfter: function (node, a, item, event) {
                    event.preventDefault();

                    var r = confirm("You will be redirected to:\n" + item.href + "\n\nContinue?");
                    if (r == true) {
                        window.open(item.href);
                    }

                    $('.js-result-container').text('');

                },
                onResult: function (node, query, obj, objCount) {

                    console.log(objCount)

                    var text = "";
                    if (query !== "") {
                        text = objCount + ' elements matching "' + query + '"';
                    }
                    $('.js-result-container').text(text);

                }
            },
            debug: true
        });


$("#addtaxmaster").click(function (e) {
    if (validate_taxmaster('taxmasterform')) {
        $("#addtaxmaster").prop('disabled', true);

        var data = {
            "formdata": $("#taxmasterform").serialize(),
        };
        var url = "taxmaster_create";
        var dataType = "";
        var type = "POST";
        callroute(url, type, dataType, data, function (data) {
            var dta = JSON.parse(data);

            if (dta['Success'] == "True") {
                toastr.success(dta['Message']);
                $("#taxmasterform").trigger('reset');
                $("#taxmaster_id").val('');
                resettable('taxmaster_data', 'tabletaxrecord');
            } else {
                toastr.error(dta['Message']);
            }
            $("#addtaxmaster").prop('disabled', false);
        })

    }
    //$(this).prop('disabled', false);
    e.preventDefault();
});

function validate_taxmaster(frmid) {
    var error = 0;

    if ($("#tax_title").val() == '') {
        error = 1;
        toastr.error("Enter Tax Title!");
        return false;
    }
    if ($("#tax_value").val() == '') {
        error = 1;
        toastr.error("Enter Tax Value!");
        return false;
    }
     if ($("#tax_type").val() == '') {
        error = 1;
        toastr.error("Select Tax Type!");
        return false;
    }
    

    
    if (error == 1) {
        return false;
    } else {
        return true;
    }
}


//edit product

function edittaxmaster(taxmasterid) {
    $(this).prop('disable', true);
    var url = "taxmaster_edit";
    var type = "POST";
    var dataType = "";
    var data = {
        "taxmaster_id": taxmasterid
    }
    callroute(url, type, dataType, data, function (data) {
        $(this).prop('disable', false);
        var taxmaster_response = JSON.parse(data);

        if (taxmaster_response['Success'] == "True") {

            var taxmaster_data = taxmaster_response['Data'];

            $("#taxmaster_id").val(taxmaster_data['taxmaster_id']);
            $("#tax_type").val(taxmaster_data['tax_type']);
            $("#tax_title").val(taxmaster_data['tax_title']);
            $("#tax_value").val(taxmaster_data['tax_value']);
            $('input[name=tax_value_type][value='+taxmaster_data['tax_value_type']+']').prop('checked',true);
        }
    });
}


$("#deletetaxmaster").click(function () {
    // if (confirm("Are You Sure want to delete this GST slabs?")) {

        var ids = [];

        $('input[name="delete_taxmaster[]"]:checked').each(function () {
            ids.push($(this).val());
        });


        if (ids.length > 0) {

            var errmsg = "Are You Sure want to delete this Tax Master Entry?";
        swal({
                title: errmsg,
                type: "warning",
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Yes!",
                showCancelButton: true,
                closeOnConfirm: true,
                closeOnCancel: true
            },


        function (isConfirm) {
                if (isConfirm) {


            var data = {
                "deleted_id": ids
            };
            var url = "taxmaster_delete";
            var dataType = "";
            var type = "POST";
            callroute(url, type, dataType, data, function (data) {
                var dta = JSON.parse(data);

                if (dta['Success'] == "True") {
                    toastr.success(dta['Message']);
                    $("#taxmasterform").trigger('reset');
                    $("#taxmaster_id").val('');
                    resettable('taxmaster_data', 'tabletaxrecord');
                } else {
                    toastr.error(dta['Message']);
                }
            })
        } else {
            return false;
        }
    // }
    })
        }
    else {
        return false;
    }
});
function delete_separate_taxmaster(obj,taxmaster_id,event)
{
    $(obj).closest('td').find('[type=checkbox]').prop('checked',true);
    event.preventDefault();
    if($(obj).closest('td').find('[type=checkbox]').prop('checked') == true)
    {
        setTimeout(
            function()
            {
                 $('#deletetaxmaster')[0].click();
            }, 300);
    }

}

$("#canceltaxmaster").click(function () {
    $("#selling_price_from").val('');
    $("#selling_price_to").val('');
    $("#percentage").val('');
    $("#taxmaster_id").val('');
});


$('#checkall').change(function () {
    if ($(this).is(":checked")) {
        $("#taxmasterrecord tr").each(function () {
            var id = $(this).attr('id');

            $(this).find('td').each(function () {
                $("#delete_taxmaster" + id).prop('checked', true);
            });

        })
    } else {
        $("#taxmasterrecord tr").each(function () {
            var id = $(this).attr('id');
            $(this).find('td').each(function () {
                $("#delete_taxmaster" + id).prop('checked', false);
            });

        })
    }
});






