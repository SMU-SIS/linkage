angular.module('myApp', ['ngResource']);
      function MainCtrl($scope,$resource){
            
     
        $scope.backend_locations = [
          {url : 'code-comparison.appspot.com', urlName : 'remote backend' },      
          {url : 'linkagepwc.appspot.com', urlName : 'pwc' }, 
          {url : 'localhost:8080', urlName : 'localhost' } ];
 
        $scope.showdetails = false;
        $scope.apikey = "pwc";
       
        //Replace this url with your final URL from the SingPath API path.
        //$scope.remote_url = "localhost:8080";
        //$scope.remote_url = "code-comparison.appspot.com";
        $scope.remote_url = "linkagepwc.appspot.com";
        $scope.model = "user";
        $scope.waiting = "Ready";
        
      
        
        //resource calls are defined here
 
        $scope.Model = $resource('http://:remote_url/:apikey/:model_type/:id',
                                {},{'get': {method: 'JSONP', isArray: false, params:{callback: 'JSON_CALLBACK'}}
                                  }
                            );
 
      
        
        $scope.add = function(){
          $scope.SaveResource = $resource('http://:remote_url/:apikey/:model',
                        {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model},
                        {'save': { method: 'POST',    params: {} }});
          $scope.waiting = "Loading";
         
                  
        var item = new $scope.SaveResource($scope.item.data);
          $scope.item = item.$save(function(response) {
                  $scope.item = response;
                  $scope.list();
                  $scope.waiting = "Ready";
                });
        };
       
        $scope.list = function(){
          var data = {'remote_url':$scope.remote_url,
                  'model_type':$scope.model,
                  'apikey':$scope.apikey
                 }  
              $scope.Model.get(data,
                function(response) {
                      $scope.users = response;
                      $scope.items = {"count": 1, "entities": [], "model": "user", "apikey": "pwc", "method": "get_entities"};
                      for(var i = 0; i < $scope.users.entities.length; i++){
                          var aUser = $scope.users.entities[i].data;
                          $scope.items.entities.push({"model": "user", "apikey": "pwc",
                          "data": {"username": aUser.username, "skills": aUser.skills,
                          "fullname": aUser.fullname, "password": aUser.password, "role": aUser.role
                          }, "id": $scope.users.entities[i].id});
                     }
                })
                     var data2 = {'remote_url':$scope.remote_url,
                      'model_type':'projecttask',
                      'apikey':$scope.apikey
                     }
                     $scope.Model.get(data2,
                   function(response) {
                      $scope.projecttasks = response;
                      $scope.items = {"count": 1, "entities": [], "model": "user", "apikey": "pwc", "method": "get_entities"};
                   
                      for(var i = 0; i < $scope.users.entities.length; i++){
                        var aUser = $scope.users.entities[i].data;
                        var aFullname = aUser.username;
                        var nonRepeat =[];
 
                        var projects= [];
                        for(var j = 0; j < $scope.projecttasks.entities.length; j++){
                          var aResp = $scope.projecttasks.entities[j].data.resp;
                                        
                            
                            for(var k = 0; k < aResp.length; k++){
                              if(aResp[k]==aFullname){
                                projects.push($scope.projecttasks.entities[j].data.project);
                                break;
                              }
                            }
                          }
                          if(projects.length != 1) {
                           projects.sort();
                           for(var m = 0; m <(projects.length-1);m++) {
                           
                            if(projects[m] != projects[m+1]) {
                              nonRepeat.push(projects[m]);
                             }
                         
                          }
                        }
                        else {
                          nonRepeat=projects;
                        }
                       
                        $scope.items.entities.push({"model": "user", "apikey": "pwc",
                          "data": {"username": aUser.username, "skills": aUser.skills,
                          "fullname": aUser.fullname, "projects": nonRepeat}, "id": $scope.users.entities[i].id});
                      }
                    });
        
              
           };
               
        $scope.load = function(id){
          data = {'remote_url':$scope.remote_url,
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
       
       //To add key/value pairs when creating new objects
        $scope.add_key_to_item = function(){
          $scope.item.data[$scope.newItemKey] = $scope.newItemValue;
          $scope.newItemKey = "";
          $scope.newItemValue = "";
        };
       
        $scope.get_metadata = function(){
          data = {'remote_url':$scope.remote_url,
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
       
        $scope.log_event = function(project){
          data = {'remote_url':$scope.remote_url,
                  'model_type':"log",
                  'apikey':$scope.apikey,
                  'obj': JSON.stringify({"project":project})
                }
          $scope.Model.get(data,
              function(response){
                  $scope.last_log = response;
              });
       
        };
 
        $scope.delete = function(id){
          data = {'remote_url':$scope.remote_url,
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
       
        $scope.list();
 
        function putObject(path, object, value) {
        var modelPath = path.split(".");
 
        function fill(object, elements, depth, value) {
            var hasNext = ((depth + 1) < elements.length);
            if(depth < elements.length && hasNext) {
                if(!object.hasOwnProperty(modelPath[depth])) {
                    object[modelPath[depth]] = {};
                }
                fill(object[modelPath[depth]], elements, ++depth, value);
            } else {
                object[modelPath[depth]] = value;
            }
        }
        fill(object, modelPath, 0, value);
    }
 
        $scope.set = function(id){
          data = {'remote_url':$scope.remote_url,
                  'model_type':$scope.model,
                  'apikey':$scope.apikey,
                  'id': id
                }
          $scope.Model.get(projectName,
            function(response){
              $scope.item = response;
              $scope.item_data_projectName = $scope.item.data.project;
            });
        };
 
        $scope.linkTask = function(projectName){
          localStorage.setItem("project",projectName);
          window.location.href="tasks.html";
        }
      }
 
     
    $(document).ready(function(){
      $("#project").addClass("active");
   
      $("tr.proj").bind("click",function(){
        $(this).next("tr").toggle();
      });
 
    })