function uploadFile(){
            var fd = new FormData();

            var ins = document.getElementById('fileToUpload').files.length;
            for (var x = 0; x < ins; x++) {
                fd.append("file[]", document.getElementById('fileToUpload').files[x]);
            }

            fd.append('category', document.getElementById("jmcat").value)
            
            if(!getCookie("jmtoken")){
              fd.append('token', document.getElementById("jmtoken").value)
            } else{
              //User is logged in
              fd.append('token',getCookie("jmtoken"))
            }

            $.ajax({
                url: 'http://api.tilera.xyz/jensmemes/v1/upload',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
                    if(response != 0){
                       console.log("Upload Successfull")
                       console.log(response);
                       let output = document.getElementById("output");
                       output.innerHTML="Upload Erfolgreich. Meme <a href='"+response.files[0]+"' style='text-decoration: underline;'>hier</a>"
                       output.style.display="unset";

                       setCookie("jmtoken",response.token,30);
                    }
                    else{
                        console.log("Upload Failed")
                    }
                },
            });

}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }