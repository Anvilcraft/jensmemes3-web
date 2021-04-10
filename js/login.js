let _jmtoken = document.getElementById("_jmtoken");
if(!getCookie("jmtoken")){
}else{
    _jmtoken.innerHTML="";
    $.ajax({
        url: 'http://api.tilera.xyz/jensmemes/v1/users',
        type: 'get',
        contentType: false,
        processData: false,
        success: function(response){
            if(response != 0){
                $.each(response["users"], function () {
                  if (this["tokenhash"]==md5(getCookie("jmtoken"))){
                    _jmtoken.innerHTML="<i id='logged-in'>"+this["name"]+"</i>";
                    document.getElementById("logout-btn").src = "https://cdn.a-hoefler.eu/apps/ebstgymidx/logout.png";
                  }
              });
            }
            else{
                console.log("API fetch for users failed");
            }
        },
    });
}

//Login Modal
var loginModal = document.getElementById("loginmodal");

// Get the button that opens the modal
var openLogin = document.getElementById("btn-logout");

// Get the <span> element that closes the modal
var closeLogin = document.getElementsByClassName("loginclose")[0];

// When the user clicks on <span> (x), close the modal
closeLogin.onclick = function() {
  loginModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
}

function logout(){
  if(!getCookie("jmtoken")){
    loginModal.style.display = "block";
  } else{
    //User is logged in
    document.cookie = "jmtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
  }
}



function login(){
  setCookie("jmtoken",document.getElementById("jmlogintoken").value,30);
  location.reload();
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