/* Controllers */
angular.module('myApp', ['ngResource']);
function BackendController($scope,$resource){
    //$scope.users = $resource('/user').get();
    //$scope.users = {"count":2,"entities":[{"username": "Peter", "password": "1234"},{"username": "Mary", "password": "1234"}]};
    $scope.gaEvent = function(xpos, ypos){
      $scope.clicked = {"x":xpos,"y":ypos,"count":1};
      //Call your own backend to log an event.
      $scope.log_event($scope.clicked);
    };
    
    $scope.showdetails = false;
    $scope.apikey = "pwc";
    
    //Replace this url with your final URL from the SingPath API path. 
    //$scope.remote_url = "localhost:8080";
    $scope.remote_url = "linkagepwc.appspot.com";
    $scope.model = "user";
    
    $scope.item = {};
    $scope.item.data = {"fullname": "Peter Lim",
                        "username": "peter",
                        "password": "1234",
                        "role": "manager",
                        "skills": []
                       };
    
    //resource calls are defined here

    $scope.Model = $resource('http://:remote_url/:apikey/:model_type/:id',
                            {},{'get': {method: 'JSONP', isArray: false, params:{callback: 'JSON_CALLBACK'}}
                               }
                        );

    $scope.update = function(id){
      $scope.UpdateResource = $resource('http://:remote_url/:apikey/:model/:id', 
                    {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model, "id":id }, 
                    {'update': { method: 'PUT',    params: {} }});
      
      var item = new $scope.UpdateResource($scope.item.data);
      item.$update(function(response) { 
              $scope.item = response;
              $scope.list();
            });
    };
    
    $scope.add = function(){
      $scope.SaveResource = $resource('http://:remote_url/:apikey/:model', 
                    {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model}, 
                    {'save': { method: 'POST',    params: {} }});
      var item = new $scope.SaveResource($scope.item.data);
      $scope.item = item.$save(function(response) { 
              $scope.item = response;
              $scope.list();
              localStorage.setItem("username", $scope.newuser.username);
              localStorage.setItem("fullname", $scope.newuser.fullname);
              localStorage.setItem("viewname", $scope.newuser.username);
              if($scope.newuser.role == ""){
                createCookie("user", "member");
              }else{
                createCookie("user", $scope.newuser.role);
              }
              
              window.location.href = 'profile.html';
            }); 
    };
    
    $scope.list = function(){
      var data = {'remote_url':$scope.remote_url,
              'model_type':$scope.model,
              'apikey':$scope.apikey
             }     
      $scope.Model.get(data,
            function(response) { 
              $scope.items = response;
            }); 
      var data2 = {'remote_url':$scope.remote_url,
              'model_type':"log",
              'apikey':$scope.apikey
             }     
      $scope.Model.get(data2,
            function(response2) { 
              $scope.last_log = response2;
            });  
    };
            
    $scope.load = function(id){
      var data = {'remote_url':$scope.remote_url,
              'model_type':$scope.model,
              'apikey':$scope.apikey, 
              'id': id
            }
      $scope.Model.get(data, 
          function(response){   
              $scope.item = response;
              $scope.item_data = $scope.item.data;
          });        
    };
    
    $scope.delete = function(id){
      var data = {'remote_url':$scope.remote_url,
              'model_type':$scope.model,
              'apikey':$scope.apikey, 
              'id': id
            }    
      $scope.Model.remove(data, 
          function(response){
              $scope.list();
          });
    };
    //To add key/value pairs when creating new objects
    $scope.add_key_to_item = function(){
      $scope.item.data[$scope.newItemKey] = $scope.newItemValue;
      $scope.newItemKey = "";
      $scope.newItemValue = "";
    };
    
    $scope.get_metadata = function(){
      var data = {'remote_url':$scope.remote_url,
              'model_type':"metadata",
              'apikey':$scope.apikey
             }    
      $scope.Model.get(data,
            function(response) { 
              $scope.metadata = response;
            });  
    };
    
    $scope.log_event = function(message){
      var data = {'remote_url':$scope.remote_url,
              'model_type':"log",
              'apikey':$scope.apikey, 
              'obj': JSON.stringify({"message":message})
            }
      $scope.Model.get(data, 
          function(response){
              $scope.last_log = response;
          });
    
    };
        
        $scope.list();
    $scope.hasUser = false;
    $scope.auth = "";
    $scope.newuser = {"fullname": "", "username": "", "password": "", "role": ""};
    $scope.checkPassword = function(){
        $(".msg_box").removeClass("alert");
        $(".signin_btn").addClass("disabled");
        if($scope.items.count > 0){
          for(x=0; x < $scope.items.count;x++){
              aUser = $scope.items.entities[x].data;
              if( $scope.user.username == aUser.username){
                  $scope.hasUser = true;
                  $scope.auth = aUser.password;
                  $scope.user.role = aUser.role;
                  $scope.user.fullname = aUser.fullname;
                  break;
              }
          }
        }
        if($scope.hasUser){
            if($scope.user.password != $scope.auth){
                $scope.alertMessage = "Invaid username/password.";
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
                localStorage.setItem("viewname", $scope.user.username);
                window.location.href = 'profile.html';
            }
        }else{
            $scope.alertMessage = "Invaid username/password.";
            $("div.msg_box").addClass("alert");
            $(".signin_btn").removeClass("disabled");
        }
    }

    $scope.signup = function(){
        $scope.hasUser = false;
        if($scope.items.count > 0){
          for(x=0; x < $scope.items.count;x++){
              var aUser = $scope.items.entities[x].data;
              if( $scope.newuser.username == aUser.username){
                  $scope.hasUser = true;
                  break;
              }
          }
        }
        if($scope.hasUser){
            $scope.signup_error_username = "The username has been taken.";
            $(".signin_btn").removeClass("disabled");
        }else if($scope.newuser.password && $scope.newuser.password.length < 8){
            $scope.signup_error_password = "At least 8 letters long.";
            $(".signin_btn").removeClass("disabled");
        }else if($scope.newuser.c_password != $scope.newuser.password){
            $scope.signup_error_c_password = "These passwords don't match.";
            $(".signin_btn").removeClass("disabled");
        }else{
            $scope.signup_error_username = "";
            $scope.signup_error_password = "";
            $(".msg_box").removeClass("alert");
            $(".signin_btn").addClass("disabled");
            $scope.item.data = {"fullname": $scope.newuser.fullname,
                        "username": $scope.newuser.username,
                        "password": $scope.newuser.password,
                        "role": $scope.newuser.role,
                        "skills": []
                       };
            if($scope.item.data.role == ""){
                $scope.item.data.role = "member";
            }
            $scope.add();
        }
    }
    var xpos = 0;
    var ypos = 0;
    $(document).click(function(e){
      xpos = e.pageX;
      ypos = e.pageY;
      $scope.gaEvent(xpos,ypos);
    });
    /*
    window.onload = function(){
        var canvas = document.getElementsByTagName('canvas')[0];
        var heatmap = createWebGLHeatmap({canvas: canvas});
        //var heatmap = createWebGLHeatmap({width: 500, height: 500}); // statically sized heatmap

        // just feeding some mouse coords
        document.body.appendChild(heatmap.canvas);
        //canvas.onclick = function(event){
        for (var i = 0; i < $scope.last_log.count; i++) {
            var points = $scope.last_log.entities[i].data.message;
            var x = points.x;
            var y = points.y;
                
            heatmap.addPoint(x, y, 100, 40/255);
            
            var count = 0;
            while(count < 200){
                var xoff = Math.random()*2-1;
                var yoff = Math.random()*2-1;
                var l = xoff*xoff + yoff*yoff;
                if(l > 1){
                    continue;
                }
                var ls = Math.sqrt(l);
                xoff/=ls; yoff/=ls;
                xoff*=1-l; yoff*=1-l;
                count += 1;
                heatmap.addPoint(x+xoff*50, y+yoff*50, 20, 10/300);
            }
        };

        var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame;

        var update = function(){
            heatmap.adjustSize(); // can be commented out for statically sized heatmaps, resize clears the map
            heatmap.update(); // adds the buffered points
            heatmap.display(); // adds the buffered points
            //heatmap.multiply(0.9995);
            //heatmap.blur();
            //heatmap.clamp(0.0, 1.0); // depending on usecase you might want to clamp it
            raf(update);
        }
        raf(update);
    }
    */
}
$(document).ready(function(){
  $(document).keypress(function(e) {
    if(e.which == 13) {
        $(".signin_btn").click();
    }
  });
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

