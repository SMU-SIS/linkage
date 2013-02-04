/* Controllers */

$(document).keypress(function(e) {
    if(e.which == 13) {
        $(".signin_btn").click();
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
function register(){
	$('.feather#f5').animate({
	    height: '+=130'
  	});
  	$('.base_logo.feathersOut').animate({
	    "margin-top": '+=130'
  	});
	$("form[name=form1]").hide();
	$("form[name=form2]").show();
	$("#check_member").attr("checked","checked");
}
function signin(){
	$('.feather#f5').animate({
	    height: '-=130'
  	});
  	$('.base_logo.feathersOut').animate({
	    "margin-top": '-=130'
  	});
	$("form[name=form1]").show();
	$("form[name=form2]").hide();
}

