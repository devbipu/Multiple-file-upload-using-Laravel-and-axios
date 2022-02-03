const { default: axios } = require("axios");
const { find, upperCase, isEmpty } = require("lodash");

$('.addRowBtn').on('click', function(){
    
    let tblRow = 
        "<tr>" + 
            "<td><input type='file' class='uploadFile form-control'></td>" +
            "<td class='fileSize'>File size</td>" +
            "<td><button class='btn btn-sm btn-danger cancleUp'>Cancel</button></td>" +
            "<td> <button class='btn btn-sm btn-success upBtn'>Upload</button></td>" +
            "<td class='uploadMb'>Uploaded(MB)</td>" +
            "<td class='uploadpersent'>Uploaded(%)</td>" + 
            "<td class='status'>Status</td>" +
        "</tr>"

    $('#tableBody').append(tblRow);

    $(".cancleUp").on('click',function(){
        $(this).parents('tr').remove();
    });

    $('.uploadFile').on('change', function(){
        var file = $(this).prop('files');
        let fileSize = ((file[0].size) / (1024 * 1024)).toFixed(2);
        $(this).closest('tr').find('.fileSize').html(fileSize + "MB");
        var formData = new FormData();
        formData.append('file', file)
        
    });


    //on upload btn click
    $('.upBtn').on('click', function(event){
        var files = $(this).closest('tr').find('.uploadFile').prop('files');
        var upMb = $(this).closest('tr').find('.uploadMb');
        var upPersent = $(this).closest('tr').find('.uploadpersent');
        var status = $(this).closest('tr').find('.status');
        let upbtn = $(this);
        if(files.length == 0){
            alert("Input file");
        }else{
            let formDAta = new FormData();
            formDAta.append('file', files[0]);
            onUpload(formDAta, upMb, upPersent, status, upbtn)
        }
        event.preventDefault();
        event.stopImmediatePropagation();
    });

    

})

// on upload
function onUpload(formDAta, upMb, upPersent, status, upbtn){
    let url = "/uploadfiles";
    let config = {
        headers: {'content-type': "mulitpart/form-data"},
        onUploadProgress: function(progressEvent){
            let totalUpMb = ((progressEvent.loaded)/(1024 * 1024)).toFixed(2);
            let totalUpPersent = ((progressEvent.loaded * 100 ) / progressEvent.total).toFixed(2);
            upMb.html(totalUpMb + "MB");
            upPersent.html(totalUpPersent + "%");
        }
    }

    upbtn.prop('disabled', true);
    status.html("Uploading...")
        axios.post(url, formDAta, config)
        .then(function(response){
            status.html("Success");
            upbtn.prop('disabled', false);
            setTimeout(() => {
                $(this).closest('tr').find('.uploadFile').val("");
                $(this).closest('tr').find('.uploadMb').html("");
                $('.fileSize').html("size");
                upMb.html("Uploaded Size (MB)");
                upPersent.html("Uploaded Size (%)");
                status.html("Status");
            }, 5000);
            console.log(response);
        })
        .catch(function(error){
            upbtn.prop('disabled', false);
            console.log(error);
        })
   
}