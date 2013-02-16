$(document).ready(function(){
    $(".header").load("header.html");
    $(".footer").load("footer.html");
    var role = readCookie("user");
	if (role == "member") {
		$(".navbar").load("navbar_member.html");
	}else if(role == "manager"){
		$(".navbar").load("navbar_manager.html");
	}else{
		window.location.href = "index.html";
	}
});
function createCookie(c_name,value,exdays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
function readCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
    }
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}