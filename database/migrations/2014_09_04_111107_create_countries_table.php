<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->BigIncrements('country_id');
            $table->string('country_name',200);
            $table->string('country_code',100)->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))->nullable();
        });
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Afghanistan',
            'country_code' => 'AF'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Aland',
            'country_code' => 'AX'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Albania',
            'country_code' => 'AL'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Algeria',
            'country_code' => 'DZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'American Samoa',
            'country_code' => 'AS'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Andorra',
            'country_code' => 'AD'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Angola',
            'country_code' => 'AO'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Anguilla',
            'country_code' => 'AI'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Antarctica',
            'country_code' => 'AQ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Antigua and Barbuda',
            'country_code' => 'AG'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Argentina',
            'country_code' => 'AR'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Armenia',
            'country_code' => 'AM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Aruba',
            'country_code' => 'AW'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Australia',
            'country_code' => 'AU'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Austria',
            'country_code' => 'AT'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Azerbaijan',
            'country_code' => 'AZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bahamas',
            'country_code' => 'BS'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bahrain',
            'country_code' => 'BH'
			
        ));

		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bangladesh',
            'country_code' => 'BD'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Barbados',
            'country_code' => 'BB'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Belarus',
            'country_code' => 'BY'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Belgium',
            'country_code' => 'BE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Belize',
            'country_code' => 'BZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Benin',
            'country_code' => 'BJ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bermuda',
            'country_code' => 'BM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bhutan',
            'country_code' => 'BT'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bolivia',
            'country_code' => 'BO'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bonaire',
            'country_code' => 'BQ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bosnia and Herzegovina',
            'country_code' => 'BA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Botswana',
            'country_code' => 'BW'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Bouvet Island',
            'country_code' => 'BV'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Brazil',
            'country_code' => 'BR'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'British Indian Ocean Territory',
            'country_code' => 'IO'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'British Virgin Islands',
            'country_code' => 'VG'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Brunei',
            'country_code' => 'BN'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Bulgaria',
            'country_code' => 'BG'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Burkina Faso',
            'country_code' => 'BF'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Burundi',
            'country_code' => 'BI'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cambodia',
            'country_code' => 'KH'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cameroon',
            'country_code' => 'CM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Canada',
            'country_code' => 'CA'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cape Verde',
            'country_code' => 'CV'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cayman Islands',
            'country_code' => 'KY'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Central African Republic',
            'country_code' => 'CF'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Chad',
            'country_code' => 'TD'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Chile',
            'country_code' => 'CL'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'China',
            'country_code' => 'CN'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Christmas Island',
            'country_code' => 'CX'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cocos [Keeling] Islands',
            'country_code' => 'CC'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Colombia',
            'country_code' => 'CO'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Comoros',
            'country_code' => 'KM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cook Islands',
            'country_code' => 'CK'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Costa Rica',
            'country_code' => 'CR'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Croatia',
            'country_code' => 'HR'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cuba',
            'country_code' => 'CU'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Curacao',
            'country_code' => 'CW'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Cyprus',
            'country_code' => 'CY'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Czech Republic',
            'country_code' => 'CZ'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Democratic Republic of the Congo',
            'country_code' => 'CD'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Denmark',
            'country_code' => 'DK'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Djibouti',
            'country_code' => 'DJ'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Dominica',
            'country_code' => 'DM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Dominican Republic',
            'country_code' => 'DO'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'East Timor',
            'country_code' => 'TL'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Ecuador',
            'country_code' => 'EC'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Egypt',
            'country_code' => 'EG'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'El Salvador',
            'country_code' => 'SV'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Equatorial Guinea',
            'country_code' => 'GQ'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Eritrea',
            'country_code' => 'ER'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Estonia',
            'country_code' => 'EE'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Ethiopia',
            'country_code' => 'ET'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Falkland Islands',
            'country_code' => 'FK'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Faroe Islands',
            'country_code' => 'FO'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Fiji',
            'country_code' => 'FJ'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Finland',
            'country_code' => 'FI'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'France',
            'country_code' => 'FR'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'French Guiana',
            'country_code' => 'GF'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'French Polynesia',
            'country_code' => 'PF'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'French Southern Territories',
            'country_code' => 'TF'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Gabon',
            'country_code' => 'GA'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Gambia',
            'country_code' => 'GM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Georgia',
            'country_code' => 'GE'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Germany',
            'country_code' => 'DE'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Ghana',
            'country_code' => 'GH'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Gibraltar',
            'country_code' => 'GI'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Greece',
            'country_code' => 'GR'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Greenland',
            'country_code' => 'GL'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Grenada',
            'country_code' => 'GD'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Guadeloupe',
            'country_code' => 'GP'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Guam',
            'country_code' => 'GU'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Guatemala',
            'country_code' => 'GT'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Guernsey',
            'country_code' => 'GG'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Guinea',
            'country_code' => 'GN'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Guinea-Bissau',
            'country_code' => 'GW'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Guyana',
            'country_code' => 'GY'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Haiti',
            'country_code' => 'HT'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Heard Island and McDonald Islands',
            'country_code' => 'HM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Honduras',
            'country_code' => 'HN'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Hong Kong',
            'country_code' => 'HK'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Hungary',
            'country_code' => 'HU'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Iceland',
            'country_code' => 'IS'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'India',
            'country_code' => 'IN'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Indonesia',
            'country_code' => 'ID'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Iran',
            'country_code' => 'IR'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Iraq',
            'country_code' => 'IQ'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Ireland',
            'country_code' => 'IE'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Isle of Man',
            'country_code' => 'IM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Israel',
            'country_code' => 'IL'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Italy',
            'country_code' => 'IT'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Ivory Coast',
            'country_code' => 'CI'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Jamaica',
            'country_code' => 'JM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Japan',
            'country_code' => 'JP'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Jersey',
            'country_code' => 'JE'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Jordan',
            'country_code' => 'JO'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Kazakhstan',
            'country_code' => 'KZ'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Kenya',
            'country_code' => 'KE'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Kiribati',
            'country_code' => 'KI'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Kosovo',
            'country_code' => 'XK'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Kuwait',
            'country_code' => 'KW'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Kyrgyzstan',
            'country_code' => 'KG'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Laos',
            'country_code' => 'LA'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Latvia',
            'country_code' => 'LV'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Lebanon',
            'country_code' => 'LB'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Lesotho',
            'country_code' => 'LS'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Liberia',
            'country_code' => 'LR'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Libya',
            'country_code' => 'LY'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Liechtenstein',
            'country_code' => 'LI'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Lithuania',
            'country_code' => 'LT'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Luxembourg',
            'country_code' => 'LU'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Macao',
            'country_code' => 'MO'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Macedonia',
            'country_code' => 'MK'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Madagascar',
            'country_code' => 'MG'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Malawi',
            'country_code' => 'MW'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Malaysia',
            'country_code' => 'MY'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Maldives',
            'country_code' => 'MV'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Mali',
            'country_code' => 'ML'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Malta',
            'country_code' => 'MT'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Marshall Islands',
            'country_code' => 'MH'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Martinique',
            'country_code' => 'MQ'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Mauritania',
            'country_code' => 'MR'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Mauritius',
            'country_code' => 'MU'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Mayotte',
            'country_code' => 'YT'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Mexico',
            'country_code' => 'MX'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Micronesia',
            'country_code' => 'FM'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Moldova',
            'country_code' => 'MD'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Monaco',
            'country_code' => 'MC'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Mongolia',
            'country_code' => 'MN'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Montenegro',
            'country_code' => 'ME'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Montserrat',
            'country_code' => 'MS'
			
        ));

        DB::table('countries')->insert(array(
		
            'country_name' => 'Morocco',
            'country_code' => 'MA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Mozambique',
            'country_code' => 'MZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Myanmar [Burma]',
            'country_code' => 'MM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Namibia',
            'country_code' => 'NA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Nauru',
            'country_code' => 'NR'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Nepal',
            'country_code' => 'NP'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Netherlands',
            'country_code' => 'NL'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'New Caledonia',
            'country_code' => 'NC'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'New Zealand',
            'country_code' => 'NZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Nicaragua',
            'country_code' => 'NI'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Niger',
            'country_code' => 'NE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Nigeria',
            'country_code' => 'NG'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Niue',
            'country_code' => 'NU'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Norfolk Island',
            'country_code' => 'NF'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'North Korea',
            'country_code' => 'KP'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Northern Mariana Islands',
            'country_code' => 'MP'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Norway',
            'country_code' => 'NO'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Oman',
            'country_code' => 'OM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Pakistan',
            'country_code' => 'PK'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Palau',
            'country_code' => 'PW'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Palestine',
            'country_code' => 'PS'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Panama',
            'country_code' => 'PA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Papua New Guinea',
            'country_code' => 'PG'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Paraguay',
            'country_code' => 'PY'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Peru',
            'country_code' => 'PE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Philippines',
            'country_code' => 'PH'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Pitcairn Islands',
            'country_code' => 'PN'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Poland',
            'country_code' => 'PL'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Portugal',
            'country_code' => 'PT'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Puerto Rico',
            'country_code' => 'PR'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Qatar',
            'country_code' => 'QA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Republic of the Congo',
            'country_code' => 'CG'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Reunion',
            'country_code' => 'RE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Romania',
            'country_code' => 'RO'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Russia',
            'country_code' => 'RU'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Rwanda',
            'country_code' => 'RW'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saint Barthelemy',
            'country_code' => 'BL'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saint Helena',
            'country_code' => 'SH'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saint Kitts and Nevis',
            'country_code' => 'KN'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saint Lucia',
            'country_code' => 'LC'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saint Martin',
            'country_code' => 'MF'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saint Pierre and Miquelon',
            'country_code' => 'PM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saint Vincent and the Grenadines',
            'country_code' => 'VC'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Samoa',
            'country_code' => 'WS'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'San Marino',
            'country_code' => 'SM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Sao Tome and Principe',
            'country_code' => 'ST'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Saudi Arabia',
            'country_code' => 'SA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Senegal',
            'country_code' => 'SN'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Serbia',
            'country_code' => 'RS'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Seychelles',
            'country_code' => 'SC'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Sierra Leone',
            'country_code' => 'SL'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Singapore',
            'country_code' => 'SG'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Sint Maarten',
            'country_code' => 'SX'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Slovakia',
            'country_code' => 'SK'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Slovenia',
            'country_code' => 'SI'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Solomon Islands',
            'country_code' => 'SB'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Somalia',
            'country_code' => 'SO'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'South Africa',
            'country_code' => 'ZA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'South Georgia and the South Sandwich Islands',
            'country_code' => 'GS'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'South Korea',
            'country_code' => 'KR'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'South Sudan',
            'country_code' => 'SS'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Spain',
            'country_code' => 'ES'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Sri Lanka',
            'country_code' => 'LK'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Sudan',
            'country_code' => 'SD'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Suriname',
            'country_code' => 'SR'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Svalbard and Jan Mayen',
            'country_code' => 'SJ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Swaziland',
            'country_code' => 'SZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Sweden',
            'country_code' => 'SE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Switzerland',
            'country_code' => 'CH'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Syria',
            'country_code' => 'SY'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Taiwan',
            'country_code' => 'TW'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Tajikistan',
            'country_code' => 'TJ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Tanzania',
            'country_code' => 'TZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Thailand',
            'country_code' => 'TH'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Togo',
            'country_code' => 'TG'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Tokelau',
            'country_code' => 'TK'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Tonga',
            'country_code' => 'TO'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Trinidad and Tobago',
            'country_code' => 'TT'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Tunisia',
            'country_code' => 'TN'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Turkey',
            'country_code' => 'TR'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Turkmenistan',
            'country_code' => 'TM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Turks and Caicos Islands',
            'country_code' => 'TC'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Tuvalu',
            'country_code' => 'TV'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'U.S. Minor Outlying Islands',
            'country_code' => 'UM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'U.S. Virgin Islands',
            'country_code' => 'VI'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Uganda',
            'country_code' => 'UG'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Ukraine',
            'country_code' => 'UA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'United Arab Emirates',
            'country_code' => 'AE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'United Kingdom',
            'country_code' => 'GB'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'United States',
            'country_code' => 'US'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Uruguay',
            'country_code' => 'UY'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Uzbekistan',
            'country_code' => 'UZ'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Vanuatu',
            'country_code' => 'VU'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Vatican City',
            'country_code' => 'VA'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Venezuela',
            'country_code' => 'VE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Vietnam',
            'country_code' => 'VN'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Wallis and Futuna',
            'country_code' => 'WF'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Western Sahara',
            'country_code' => 'EH'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Yemen',
            'country_code' => 'YE'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Zambia',
            'country_code' => 'ZM'
			
        ));
		
		DB::table('countries')->insert(array(
		
            'country_name' => 'Zimbabwe',
            'country_code' => 'ZW'
			
        ));

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
