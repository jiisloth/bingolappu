let username
$(document).ready(function(){
    $("#username").on("input", function(){
        username = $(this).val()
        if (username){
            $("#go").removeClass("disabled")
        } else {
            $("#go").addClass("disabled")
        }
    });
    $("#go").on( "click", function() {
        if (username){
            localStorage.setItem('username', username);
            window.location.href = "play.html";
        }
    });
});