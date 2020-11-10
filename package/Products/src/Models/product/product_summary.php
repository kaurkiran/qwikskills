<?php

// namespace Webcolorzpos\Products\Models\product;

// use Illuminate\Database\Eloquent\Model;


// use Maatwebsite\Excel\Concerns\Exportable;
// use Maatwebsite\Excel\Concerns\FromCollection;
// use Maatwebsite\Excel\Concerns\FromQuery;
// use Maatwebsite\Excel\Concerns\FromArray;

// use Auth;
// use Maatwebsite\Excel\Concerns\WithHeadings;
// use Maatwebsite\Excel\Concerns\WithMapping;
// use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
// use App\country;
// use Webcolorzpos\Customer\Models\customer\customer_address_detail;
// use Webcolorzpos\Customer_Source\Models\customer_source\customer_source;
// use Webcolorzpos\DamageProducts\Models\damageproducts\damage_product_detail;
// use Webcolorzpos\Debit_Note\Models\debit_note\debit_product_detail;
// use Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail;
// use Webcolorzpos\PO\Models\purchase_order\purchase_order_detail;
// use Webcolorzpos\Sales\Models\sales_product_detail;
// use Webcolorzpos\SalesReturn\Models\return_product_detail;
// use Webcolorzpos\Stock_Transfer\Models\stock_transfer\stock_transfer_detail;
// use Webcolorzpos\Store_Profile\Models\store_profile\company_relationship_tree;


// class product_summary implements FromArray, WithHeadings

// {
//     use Exportable;


//     private $summary_arr;


//     public function __construct($summary_arr) {

//         $this->summary_arr = $summary_arr;

//     }

//     public function headings(): array
//     {
//         $product_summary_header = [];
//         $product_summary_header[] = 'Date / Module Name';
//         $product_summary_header[] = 'Bill/Invoice No.';
//         $product_summary_header[] = 'Details';
//         $product_summary_header[] = 'In / Pending Receive';
//         $product_summary_header[] = 'Out /Pending Out Receive';
//         $product_summary_header[] = 'In Stock';

//         return $product_summary_header;
//     }

//     public function array(): array
//     {
//         $rows = [];
//         foreach($this->summary_arr AS $productkey=>$product_value)
//         {
//             $rows_data = [];
//             $value_detail = '';
//             $invoice_no  = '';
//             foreach ($product_value as $key => $value) {
//                 if (strpos($key, 'inv_') === 0)
//                 {
//                     $key = str_replace('inv_','',$key);
//                     $key = str_replace('_',' ',$key);
//                     $key = ucwords($key);

//                     if($invoice_no == '')
//                     {
//                         $invoice_no = $key .'::'.$value;
//                     }
//                     else{
//                         $invoice_no = $invoice_no .$key .'::'.$value;
//                     }
//                 }
//                 else{
//                     if($key != 'module_name' && $key != 'date')
//                     {
//                         $key = str_replace('_',' ',$key);
//                         $value_detail .=  ucwords($key) .'::'.$value;
//                     }
//                 }
//             }

//             $rows_data[] = $product_value['date'].'/'.$product_value['module_name'];
//             $rows_data[] = $invoice_no;
//             $rows_data[] = $value_detail;
//             $rows_data[] = (isset($product_value['in_qty'])? $product_value['in_qty'] : '') . (isset($product_value['pending_receive_qty']) ? '/'.$product_value['pending_receive_qty'] :'');
//             $rows_data[] = (isset($product_value['out_qty']) ? $product_value['out_qty'] : '') .(isset($product_value['pending_out_qty']) ? '/'.$product_value['pending_out_qty'] : '') ;
//             $rows_data[] = (isset($product_value['opening']) ? $product_value['opening'] : 0);
//             $rows[]  = $rows_data;
//         }

//         return $rows;
//     }



// }
