 <?php

// namespace Webcolorzpos\Products\Models\product;

// use Illuminate\Database\Eloquent\Model;
// use Maatwebsite\Excel\Concerns\Exportable;
// use Maatwebsite\Excel\Concerns\FromCollection;
// use Maatwebsite\Excel\Concerns\FromQuery;
// use Auth;
// use Webcolorzpos\Company_Profile\Models\company_profile\company_profile;
// use Webcolorzpos\Inward_Stock\Models\inward\inward_stock;
// use Webcolorzpos\Inward_Stock\Models\inward\inward_product_detail;

// use Maatwebsite\Excel\Concerns\WithHeadings;
// use Maatwebsite\Excel\Concerns\WithMapping;
// use DB;

// class product_update_export implements FromQuery, WithHeadings, WithMapping
// {

//     use Exportable;

//     public $query = '';
//     public $dynamic_query = '';


//     public function __construct($query, $dynamic_query)
//     {

//         $this->query = $query;
//         $this->dynamic_query = $dynamic_query;


//         $inward_type_from_comp = company_profile::where('company_id', Auth::user()->company_id)->select('inward_type', 'tax_type', 'tax_title', 'currency_title', 'product_calculation','product_item_type')->first();

//         $this->inward_type = 1;
//         if (isset($inward_type_from_comp) && !empty($inward_type_from_comp) && $inward_type_from_comp['inward_type'] != '') {
//             $this->inward_type = $inward_type_from_comp['inward_type'];
//         }
//         $this->tax_type = $inward_type_from_comp['tax_type'];
//         $this->tax_title = $inward_type_from_comp['tax_title'];
//         $this->currency_title = $inward_type_from_comp['currency_title'];
//         $this->product_calculation = $inward_type_from_comp['product_calculation'];
//         $this->product_item_type = $inward_type_from_comp['product_item_type'];
//         $this->product_features = ProductFeatures::getproduct_feature('');
//     }


//     public function headings(): array
//     {
//         $inward_type = $this->inward_type;
//         $product_header = [];
//         $tax_label = 'GST';
//         $tax_currency = '₹';

//         if ($this->tax_type == 1) {
//             $tax_label = $this->tax_title;
//             $tax_currency = '(' . $this->currency_title . ')';
//         }

//         if ($inward_type == 1)
//         {
//             if(strpos($this->product_item_type,',') == true) {
//                 $product_header[] = 'Item Type';
//             }
//             $product_header[] = 'System Barcode';
//             $product_header[] = 'Product Name';
//             $product_header[] = 'Product Description';
//             $product_header[] = 'Supplier Barcode';
//             if (isset($this->product_features) && !empty($this->product_features)) {
//                 foreach ($this->product_features AS $key => $value) {
//                     $product_header[] = $value['product_features_name'];
//                 }
//             }
//             $product_header[] = 'UQC';
//             $product_header[] = 'SKU';
//             $product_header[] = 'Product Code';
//             $product_header[] = 'HSN';
//             $product_header[] = 'Alert Before Product Expiry(Days)';
//             $product_header[] = 'Low Stock Alert';
//             $product_header[] = 'MOQ';
//             $product_header[] = 'Note';
//             $product_header[] = 'Product Image';

//         } else {
//             if(strpos($this->product_item_type,',') == true) {
//                 $product_header[] = 'Item Type';
//             }
//             $product_header[] = 'System Barcode';
//             $product_header[] = 'Product Name';
//             $product_header[] = 'Product Description';
//             $product_header[] = 'Supplier Barcode';
//             if (isset($this->product_features) && !empty($this->product_features)) {
//                 foreach ($this->product_features AS $key => $value) {
//                     $product_header[] = $value['product_features_name'];
//                 }
//             }
//             $product_header[] = 'UQC';
//             $product_header[] = 'SKU';
//             $product_header[] = 'Product Code';
//             $product_header[] = 'HSN';
//             $product_header[] = 'Low Stock Alert';
//             $product_header[] = 'MOQ';
//             $product_header[] = 'Note';
//             $product_header[] = 'Product Image';
//         }
//         return $product_header;
//     }

//     public function map($product_excel): array
//     {
//         $inward_type = $this->inward_type;
//         $rows = [];

//         if ($product_excel['uqc_id'] != NULL) {
//             $uqc_shortname = $product_excel->uqc->uqc_shortname;
//         } else {
//             $uqc_shortname = '';
//         }

//         if (isset($product_excel['product_features_relationship']) && $product_excel['product_features_relationship'] != '') {
//             foreach ($this->product_features AS $kk => $vv) {
//                 $html_id = $vv['html_id'];

//                 if ($product_excel['product_features_relationship'][$html_id] != '' && $product_excel['product_features_relationship'][$html_id] != NULL) {
//                     $nm = product::feature_value($vv['product_features_id'], $product_excel['product_features_relationship'][$html_id]);
//                     $product_excel[$html_id] = $nm;
//                 }
//             }
//         }
//         if(strpos($this->product_item_type,',') == true)
//         {
//             $item_type = 'Regular';
//             if ($product_excel['item_type'] == 2)
//             {
//                 $item_type = 'Service';
//             }
//             if ($product_excel['item_type'] == 3)
//             {
//                 $item_type = 'Unique';
//             }

//             $rows[] = $item_type;
//         }
//         $rows[] = $product_excel->product_system_barcode;
//         $rows[] = $product_excel->product_name;
//         $rows[] = $product_excel->product_description;
//         $rows[] = $product_excel->supplier_barcode;

//         foreach ($this->product_features AS $product_featureskey => $product_features_value) {

//             $feature_name_value = '';

//             $dynamic_name = $product_features_value['html_id'];

//             if (isset($product_excel[$dynamic_name])) {
//                 $feature_name_value = $product_excel[$dynamic_name];
//             }
//             $rows[] = $feature_name_value;
//         }

//         $rows[] = $uqc_shortname;

//         $rows[] = $product_excel->sku_code != '' ? $product_excel->sku_code : '';
//         $rows[] = $product_excel->product_code != '' ? $product_excel->product_code : '';
//         $rows[] = $product_excel->hsn_sac_code != '' ? $product_excel->hsn_sac_code : '';
//         if ($inward_type == 1) {
//             $rows[] = $product_excel->days_before_product_expiry;
//         }
//         $rows[] = $product_excel->alert_product_qty != '' ? $product_excel->alert_product_qty : '0';
//         $rows[] = $product_excel->default_qty != '' ? $product_excel->default_qty : '0';
//         $rows[] = $product_excel->note;
//         $rows[] = $product_excel->product_images->pluck('product_image')->implode(', ');

//         return $rows;
//     }

//     public function query()
//     {

//         $product_excel = product::query()
//             ->where('deleted_at', '=', NULL)
//             ->whereIn('item_type', array(1, 3))
//             ->with('product_images')
//             ->with('product_price_master')
//             ->whereHas('product_price_master', function ($q) {
//                 $q->where('company_id', Auth::user()->company_id);
//             })
//             ->orderBy('product_id', 'DESC');


//         if (isset($this->query) && $this->query != '' && $this->query['product_name'] != '') {
//             $product_excel->where('product_name', 'like', '%' . $this->query['product_name'] . '%');
//         }

//         if (isset($this->query) && $this->query != '' && $this->query['barcode'] != '') {
//             $product_excel->where('product_system_barcode', 'like', '%' . $this->query['barcode'] . '%');
//             $product_excel->orWhere('supplier_barcode', 'like', '%' . $this->query['barcode'] . '%');
//         }

//         if (isset($this->query) && $this->query != '' && $this->query['uqc_id'] != '' && $this->query['uqc_id'] != 0) {
//             $product_excel->where('uqc_id', '=', $this->query['uqc_id']);
//         }

//         if (isset($this->dynamic_query) && $this->dynamic_query != '')
//         {
//             $dynamic_query = $this->dynamic_query;
//             $product_excel->with('product_features_relationship')
//                 ->whereHas('product_features_relationship', function ($q) use ($dynamic_query) {
//                     foreach ($dynamic_query AS $k => $v) {
//                         if ($v != '') {
//                             $q->where(DB::raw($k), $v);
//                         }
//                     }
//                 });
//         }
//         return $product_excel;
//     }
// }
