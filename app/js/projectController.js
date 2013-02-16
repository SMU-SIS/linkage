angular.module('myApp', ['ngResource']);
      function MainCtrl($scope,$resource){
      $( "#datepicker1" ).datepicker({
                   inline: true,
                   dateFormat: 'dd/mm/yy',
                   onSelect: function(dateText) {
                       $("#datepicker2").datepicker("option","minDate", dateText)
                       var modelPath = $(this).attr('ng-model');
                       putObject(modelPath, $scope, dateText);
                       $scope.$apply();
                    }
                });
     
      $( "#datepicker2" ).datepicker({
                   inline: true,
                   dateFormat: 'dd/mm/yy',
                   
                   onSelect: function(dateText) {
                       $("#datepicker1").datepicker("option","maxDate", dateText)
                       var modelPath = $(this).attr('ng-model');
                       putObject(modelPath, $scope, dateText);
                       $scope.$apply();
                   }
               });
     
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
        //$scope.remote_url = "code-comparison.appspot.com";
        $scope.remote_url = "linkagepwc.appspot.com";
        $scope.model = "project";
        $scope.waiting = "Ready";
        
        $scope.item = {};
        $scope.item.data = {"project": "",
                            "manager": localStorage.getItem("username"),
                            "partner": "",
                            "industry": "",
                            "sDate": "",
                            "eDate": "",
                            "status": "In progress",
                            "summary": "abc",
                            "scope": "def",
                            "limitation": "lmn",
                            "risk":"opq",
                            "recommendation":"xyz"
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
          $scope.waiting = "Loading";
          item.$update(function(response) { 
                  $scope.item = response;
                  $scope.list();
                  $scope.waiting = "Ready";
                });
        };
        
        $scope.add = function(){
          $scope.SaveResource = $resource('http://:remote_url/:apikey/:model', 
                        {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model}, 
                        {'save': { method: 'POST',    params: {} }});
          
          //var sDate = datepicker1( "option", "buttonText" );
         
        var item = new $scope.SaveResource($scope.item.data);
          $scope.item = item.$save(function(response) { 
                  $scope.item = response;
                  $scope.list();
                  localStorage.setItem("project",$scope.item.data.project);
                  window.location.href = "add_tasks.html";
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
                  $scope.items = response;
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
        
        $scope.list();         
      }

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

    $(document).ready(function(){
      $("#project").addClass("active");
    });