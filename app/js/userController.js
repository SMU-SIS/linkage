/* Controllers */
//var myApp = angular.module('app', ['ngResource']);

myApp.controller('MainCtrl', function($scope, $resource) {
    $scope.users = $resource('/user').get();
	//$scope.users = {"count":2,"model":[{"username": "Peter", "password": "1234"},{"username": "Mary", "password": "1234"}]};

    $scope.hasUser = false;
    $scope.auth = "";
    $scope.checkPassword = function(){
    	for(x=0; x < $scope.users.count;x++){
	    	aUser = $scope.users.model[x];
	    	if( $scope.user.username == aUser.username){
	    		$scope.hasUser = true;
	    		$scope.auth = aUser.password;
	    		break;
	    	}
	    }
    	if($scope.hasUser){
        	if($scope.user.password != $scope.auth){
        		$scope.alertMessage = "Invaid password.";
        	}else{
        		if($("#rmb_user").attr("checked")=="checked"){
        			createCookie("user", $scope.user.username, 1);
        		}else{
        			createCookie("user", $scope.user.username, 30);
        		}
        		localStorage.setItem("user", $scope.user.username);
        		window.location.href = 'home.jsp';
        	}
        }else{
    		$scope.alertMessage = "Invaid Username.";
    	}
    }
});
$(document).keypress(function(e) {
    if(e.which == 13) {
        $(".signin_btn").click();
    }
});
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}