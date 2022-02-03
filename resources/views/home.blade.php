@extends('layout.app')

@section('site-title', "Home Page")

@section('content')
    <div class="container py-3">
        <div class="upload_header">
            <h2>Multipal File upload with axios</h2>
        </div>
        
    </div>


    <div class="container">
        <div class="tableHead">
            <button class="btn btn-info addRowBtn">Add new</button>
        </div>
        <table class="table table-striped">
            <thead>
              <tr>
                <th class="w-25">File</th>
                <th>File Size</th>
                <th>Cancel</th>
                <th>Upload</th>
                <th>Uploaded(MB)</th>
                <th>Uploaded(%)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="tableBody">
            
            </tbody>
        </table>
    </div>
@endsection