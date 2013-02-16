angular.module('myApp', ['ngResource']);
      function SecondCtrl($scope,$resource){

       $scope.haha="haha";
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
        $scope.model = "project";
        $scope.waiting = "Ready";
        
        $scope.item = {};
        $scope.item.data = {"project": "",
                            "manager": "",
                            "partner": "",
                            "industry": "",
                            "sDate": "",
                            "eDate": "",
                            "status": "",
                            "summary": "",
                            "scope": "",
                            "limitation": ""
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

          if ($scope.item.data.project == ""||$scope.item.data.patner == ""||$scope.item.data.manager == ""||
            $scope.item.data.sDate == ""||$scope.item.data.eDate == ""){
            alert("Please enter all fields.");
            
            //$(".help-block").show();
          }else{
            //$(".help-block").hide();
            $(".help-block").show();
            $scope.waiting = "Loading";
            item.$update(function(response) { 
                    $scope.item = response;
                    $scope.list();
                    $scope.waiting = "Ready";
           });
          }
        }
        
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
          data = {'remote_url':$scope.remote_url,
                  'model_type':$scope.model,
                  'apikey':$scope.apikey
                 }
          $scope.waiting = "Updating";       
          $scope.Model.get(data,
            function(response) { 
                  $scope.views = response;
                  $scope.waiting = "Ready";
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
      
    $(document).ready(function(){
      $("#project").addClass("active");
    
      $("tr.proj").bind("click",function(){
        $(this).next("tr").toggle();
      });
    })

