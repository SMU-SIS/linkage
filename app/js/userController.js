/* Controllers */
//var myApp = angular.module('app', ['ngResource']);

myApp.controller('MainCtrl', function($scope, $resource) {
    $scope.users = $resource('/user').get();
	//$scope.users = {"count":2,"entities":[{"username": "Peter", "password": "1234"},{"username": "Mary", "password": "1234"}]};

    $scope.hasUser = false;
    $scope.auth = "";
	$scope.newuser = {"fullname": "", "username": "", "password": "", "role": ""};
    $scope.checkPassword = function(){
            $(".msg_box").removeClass("alert");
            $(".signin_btn").addClass("disabled");
    	for(x=0; x < $scope.users.count;x++){
	    	aUser = $scope.users.entities[x];
	    	if( $scope.user.username == aUser.username){
	    		$scope.hasUser = true;
	    		$scope.auth = aUser.password;
	    		$scope.user.role = aUser.role;
	    		$scope.user.fullname = aUser.fullname;
	    		break;
	    	}
	    }
    	if($scope.hasUser){
        	if($scope.user.password != $scope.auth){
        		$scope.alertMessage = "Invaid password.";
			    $("div.msg_box").addClass("alert");
			    $(".signin_btn").removeClass("disabled");
        	}else{
        		if($("#rmb_user").attr("checked")=="checked"){
        			createCookie("user", $scope.user.role, 30);
        		}else{
        			createCookie("user", $scope.user.role);
        		}
        		localStorage.setItem("username", $scope.user.username);
        		localStorage.setItem("fullname", $scope.user.fullname);
        		window.location.href = 'profile.html';
        	}
        }else{
    		$scope.alertMessage = "Invaid Username.";
            $("div.msg_box").addClass("alert");
            $(".signin_btn").removeClass("disabled");
    	}
    }

    $scope.signup = function(){
    	for(x=0; x < $scope.users.count;x++){
	    	aUser = $scope.users.entities[x];
	    	if( $scope.newuser.username == aUser.username){
	    		$scope.hasUser = true;
	    		break;
	    	}
	    }
	    if($scope.hasUser){
	    	$scope.signup_error_username = "The username has been taken.";
	    }else if($scope.newuser.password && $scope.newuser.password.length < 8){
	    	$scope.signup_error_password = "At least 8 letters long.";
	    }else if($scope.newuser.c_password != $scope.newuser.password){
    		$scope.signup_error_c_password = "These passwords don't match.";
    	}else{
			$scope.signup_error_username = "";
			$scope.signup_error_password = "";
	        $(".msg_box").removeClass("alert");
	        $(".signin_btn").addClass("disabled");
	        $scope.addUser();
    	}
    }

    $scope.signup = function(){

    }
});
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

