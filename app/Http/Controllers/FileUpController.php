<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUpController extends Controller
{
    //upload controller
    function onUpload(Request $req){
        $file = $req->file('file')->store('All-files');

        if($file == true){
            return "Upload Success";
        }else{
            return "Upload Faild";
        }
    }
}
