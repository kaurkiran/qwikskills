<?php

namespace Webcolorzpos\QuestionMaster\Models\questionmaster;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Auth;
use DB;

class questionmaster extends Model
{
     protected $primaryKey = 'questionmaster_id'; //Default: id
     protected $guarded=['questionmaster_id'];
}
