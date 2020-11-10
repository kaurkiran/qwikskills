<?php

namespace Webcolorzpos\Products\Models\product;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Auth;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;

class product_template implements WithHeadings
{
    use Exportable;

    public function headings(): array
    {
        $product_header = [];

      
    

        $product_features =  ProductFeatures::getproduct_feature('');
        $product_header[] = 'Product Name';
        $product_header[] = 'Product Code';
        $product_header[] = 'Product Description';
        if(isset($product_features) && !empty($product_features))
        {
            foreach($product_features AS $key=>$value)
            {
                $product_header[] = $value['product_features_name'];
            }
        }       
        
        $product_header[] = 'Product Price';
        $product_header[] = 'Consumption';
        $product_header[] = 'Tax';

       
        $product_header[] = 'Product Image';
        return $product_header;
    }
}
