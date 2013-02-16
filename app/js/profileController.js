/* Controllers */
angular.module('myApp', ['ngResource']);
function BackendController($scope,$resource){
  $scope.username = localStorage.getItem("username");
  $scope.viewname = localStorage.getItem("viewname");
  $scope.role = readCookie("user");
  if($scope.username != $scope.viewname){
    $(".greeting").hide();
    $(".change_pwd").hide();
    if($scope.role == "member"){
      $(".edit_info").hide();
    }
  }
  //$scope.users = $resource('/user').get();
  //$scope.users = {"count":2,"entities":[{"username": "Peter", "password": "1234"},{"username": "Mary", "password": "1234"}]};
  $scope.gaEvent = function($event){
    $scope.clicked = $event.target.name;
          //Call your own backend to log an event.
          $scope.log_event($scope.clicked);
  };
  $scope.backend_locations = [
    {url : 'code-comparison.appspot.com', urlName : 'remote backend' },       
    {url : 'linkagepwc.appspot.com', urlName : 'pwc' },       
    {url : 'localhost:8080', urlName : 'localhost' } ];

  $scope.showdetails = false;
  $scope.apikey = "pwc";
  
  //Replace this url with your final URL from the SingPath API path. 
  //$scope.remote_url = "localhost:8080";
  $scope.remote_url = "linkagepwc.appspot.com";
  $scope.model = "user";
  $scope.waiting = "Ready";
  
  $scope.item = {};
  $scope.item.data = {"fullname": "Peter Lim",
                      "username": "peter",
                      "password": "1234",
                      "role": "manager",
                      "skills": {}
                     };
  
  //resource calls are defined here

  $scope.Model = $resource('http://:remote_url/:apikey/:model_type/:id',
                          {},{'get': {method: 'JSONP', isArray: false, params:{callback: 'JSON_CALLBACK'}}
                             }
                      );

  $scope.updatePwd = function(id){
    $scope.UpdateResource = $resource('http://:remote_url/:apikey/:model/:id', 
                  {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model, "id":id }, 
                  {'update': { method: 'PUT',    params: {} }});
    
    var item = new $scope.UpdateResource($scope.item.data);
    $scope.waiting = "Loading";
    item.$update(function(response) { 
            $scope.item = response;
            $scope.list();
            $("#logout_logo").click();
          });
  };

  $scope.update = function(id){
    $scope.UpdateResource = $resource('http://:remote_url/:apikey/:model/:id', 
                  {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model, "id":id }, 
                  {'update': { method: 'PUT',    params: {} }});
    
    var item = new $scope.UpdateResource($scope.item.data);
    $scope.waiting = "Loading";
    item.$update(function(response) { 
            $scope.item = response;
            $scope.list();
          });
  };
  
  $scope.add = function(){
    $scope.SaveResource = $resource('http://:remote_url/:apikey/:model', 
                  {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model}, 
                  {'save': { method: 'POST',    params: {} }});
 
    $scope.waiting = "Loading";
    var item = new $scope.SaveResource($scope.item.data);
    $scope.item = item.$save(function(response) { 
            $scope.item = response;
            $scope.list();
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
            for(x=0; x < $scope.items.count;x++){
                var aUser = $scope.items.entities[x];
                if( $scope.viewname == aUser.data.username){
                    $scope.view = aUser;
                    break;
                }
            }
          }); 
    var data = {'remote_url':$scope.remote_url,
            'model_type':"projecttask",
            'apikey':$scope.apikey
           }     
    $scope.Model.get(data,
          function(response) { 
            $scope.items = response;
            $scope.tasks = [];
            var myTasks = [];
            for(var x = 0; x < $scope.items.count;x++){
                var aTask = $scope.items.entities[x];
                if( aTask.data.resp.indexOf($scope.viewname) >= 0 ){
                    myTasks.push(aTask);
                }
            }
            var today = new Date();
            var weekend = new Date();
            weekend.setDate(today.getDate() + 5);
            for(var i = 0; i < myTasks.length; i++){
              var s1 = myTasks[i].data.start.split("/");
              var start = new Date(s1[2],s1[1]-1,s1[0]);
              var s2 = myTasks[i].data.end.split("/");
              var end = new Date(s2[2],s2[1]-1,s2[0]);
              var workday = [];
              if(today.getDate() <= end.getDate() && weekend.getDate() >= start.getDate()){
                if(today.getDate() >= start.getDate()){
                  aStart = 1;
                }else{
                  aStart = start.getDate() - today.getDate() + 1;
                }
                if(end.getDate() >= weekend.getDate()){
                  aEnd = 7;
                }else{
                  aEnd = end.getDate() - today.getDate() + 1;
                }
                for(var j = aStart; j <= aEnd; j++){
                  workday.push(j);
                }
                $scope.tasks.push({"project":myTasks[i].data.project, "name":myTasks[i].data.name, "workday": workday});
              }
            }
           $(".modal-backdrop").hide();
          });  
  };
          
  $scope.load = function(id){
    var data = {'remote_url':$scope.remote_url,
            'model_type':$scope.model,
            'apikey':$scope.apikey, 
            'id': id
          }
    $scope.waiting = "Loading";
    $scope.Model.get(data, 
        function(response){   
            $scope.item = response;
            $scope.item_data = $scope.item.data;
            $scope.waiting = "Ready";  
        });        
  };
  
  $scope.delete = function(id){
    var data = {'remote_url':$scope.remote_url,
            'model_type':$scope.model,
            'apikey':$scope.apikey, 
            'id': id
          }
    $scope.waiting = "Deleting";      
    $scope.Model.remove(data, 
        function(response){
            $scope.waiting = "Ready";
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
    $scope.waiting = "Updating";       
    $scope.Model.get(data,
          function(response) { 
            $scope.metadata = response;
            $scope.waiting = "Ready";
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

  $scope.details_change = function(){
    var id = $scope.view.id;
    if($scope.view.data.fullname == ""){
      $scope.change_fullname_error = "What is your full name again?";
    }else{
      $scope.item.data = {"fullname": $scope.view.data.fullname,
                          "username": $scope.view.data.username,
                          "password": $scope.view.data.password,
                          "role": $scope.view.data.role,
                          "skills": $scope.view.data.skills
                         };
      $scope.update(id);
      $(".close_btn").click();
      $scope.change_fullname_error = "";
    }
  }

  $scope.add_skill = function(){
    var has_skill = false;
    for(var i = 0; i < $scope.view.data.skills.length; i++){
      if($scope.view.data.skills[i] == $scope.view.newskillset){
        has_skill = true;
        break;
      }
    }
    if($scope.view.newskillset == null || $scope.view.newskillset == ""){
      $scope.add_skill_error = "Please enter a skill.";
    }else if(has_skill){
      $scope.add_skill_error = "This skill has already been added.";
    }else{
      $scope.add_skill_error = "";
      $scope.view.data.skills.push($scope.view.newskillset);
    }
  }
  $scope.delete_skill = function(skill){
    var a = $scope.view.data.skills.indexOf(skill);
    $scope.view.data.skills.splice(a,1);
  }

  $scope.pwd_change = function(){
    var id = $scope.view.id;
    var valid = true;
    if($scope.view.old_pwd != $scope.view.data.password){
      $scope.old_pwd_error = "Wrong password!";
      valid = false;
    }else{
      $scope.old_pwd_error = "";
    }
    if($scope.view.new_pwd && $scope.view.new_pwd.length < 8){
      $scope.new_pwd_error = "At least 8 letters long.";
      valid = false;
    }else if($scope.view.data.password == $scope.view.new_pwd){
      $scope.new_pwd_error = "The new password is the same as the old one.";
      valid = false;
    }else{
      $scope.new_pwd_error = "";
    }
    if($scope.view.new_pwd != $scope.view.con_pwd){
      $scope.con_pwd_error = "These passwords don't match.";
      valid = false;
    }else{
      $scope.con_pwd_error = "";
    }
    if(valid){
      $scope.item.data = {"fullname": $scope.view.data.fullname,
                          "username": $scope.view.data.username,
                          "password": $scope.view.new_pwd,
                          "role": $scope.view.data.role,
                          "skills": $scope.view.data.skills
                         };
      $scope.updatePwd(id);
      
    }
  }
  
  $(".close_btn").click(function(){
    $scope.list();
  });

  $scope.linkTask = function(projectName){
          localStorage.setItem("project",projectName);
          window.location.href="tasks.html";
        }

}
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
