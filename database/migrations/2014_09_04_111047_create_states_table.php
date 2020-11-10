<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('states', function (Blueprint $table) {
            $table->BigIncrements('state_id');
            $table->string('state_name',200);
            $table->string('state_code',2);
            $table->string('state_short_code',11)->nullable();
        });
		
		//$seeder = new YourTableSeeder();
        //$seeder->run();
		
		DB::table('states')->insert(array(
		
            'state_name' => 'Jammu & Kashmir',
            'state_code' => '01',
            'state_short_code' => 'JK'
			
        ));

		DB::table('states')->insert(array(
		
			'state_name' => 'Himachal Pradesh',
			'state_code' => '02',
			'state_short_code' => 'HP'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Punjab',
			'state_code' => '03',
			'state_short_code' => 'PB'
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Chandigarh',
			'state_code' => '04',
			'state_short_code' => 'CH'
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Uttarakhand',
			'state_code' => '05',
			'state_short_code' => 'UK'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Haryana',
			'state_code' => '06',
			'state_short_code' => 'HR'
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Delhi',
			'state_code' => '07',
			'state_short_code' => 'DL'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Rajasthan',
			'state_code' => '08',
			'state_short_code' => 'RJ'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Uttar Pradesh',
			'state_code' => '09',
			'state_short_code' => 'UP'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Bihar',
			'state_code' => '10',
			'state_short_code' => 'BR'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Sikkim',
			'state_code' => '11',
			'state_short_code' => 'SK'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Arunachal Pradesh',
			'state_code' => '12',
			'state_short_code' => 'AR'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Nagaland',
			'state_code' => '13',
			'state_short_code' => 'NL'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Manipur',
			'state_code' => '14',
			'state_short_code' => 'MN'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Mizoram',
			'state_code' => '15',
			'state_short_code' => 'MZ'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Tripura',
			'state_code' => '16',
			'state_short_code' => 'TR'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Meghalaya',
			'state_code' => '17',
			'state_short_code' => 'ML'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Assam',
			'state_code' => '18',
			'state_short_code' => 'AS'
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'West Bengal',
			'state_code' => '19',
			'state_short_code' => 'WB'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Jharkhand',
			'state_code' => '20',
			'state_short_code' => 'JH'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Orissa',
			'state_code' => '21',
			'state_short_code' => 'OD'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Chhattisgarh',
			'state_code' => '22',
			'state_short_code' => 'CG'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Madhya Pradesh',
			'state_code' => '23',
			'state_short_code' => 'MP'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Gujarat',
			'state_code' => '24',
			'state_short_code' => 'GJ'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Daman & Diu',
			'state_code' => '25',
			'state_short_code' => 'DD'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Dadra & Nagar Haveli',
			'state_code' => '26',
			'state_short_code' => 'DN'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Maharashtra',
			'state_code' => '27',
			'state_short_code' => 'MH'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Andhra Pradesh',
			'state_code' => '28',
			'state_short_code' => 'AD'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Karnataka',
			'state_code' => '29',
			'state_short_code' => 'KA'
		
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Goa',
			'state_code' => '30',
			'state_short_code' => 'GA'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Lakshadweep',
			'state_code' => '31',
			'state_short_code' => 'LD'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Kerala',
			'state_code' => '32',
			'state_short_code' => 'KL'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Tamil Nadu',
			'state_code' => '33',
			'state_short_code' => 'TN'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Pondicherry',
			'state_code' => '34',
			'state_short_code' => 'PY'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Andaman & Nicobar Islands',
			'state_code' => '35',
			'state_short_code' => 'AN'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Telengana',
			'state_code' => '36',
			'state_short_code' => 'TS'
			
		));
		
		DB::table('states')->insert(array(
		
			'state_name' => 'Andrapradesh(New)',
			'state_code' => '37',
			'state_short_code' => 'APN'
			
		));
        DB::table('states')->insert(array(

            'state_name' => 'Kingdom Of Bahrain',
            'state_code' => '97',
            'state_short_code' => 'BH'

        ));
		
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('states');
		
		//DB::table('states')->where('state_code','=','3')->delete();
		
    }
}
