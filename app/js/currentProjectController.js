angular.module('myApp', ['ngResource']);
      function MainCtrl($scope,$resource){

        $scope.duration = function GetDateDiff(startDate, endDate)
          {
            var st1 = startDate.split("/");
            var dt1 = new Date(st1[2], st1[1] - 1, st1[0]);

            var st2 = endDate.split("/");
            var dt2 = new Date(st2[2], st2[1] - 1, st2[0]);

            return dt2.getDate() - dt1.getDate();
          }

      
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
                            "limitation": "",
                            "risk":"",
                            "recommendation":""
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
          }else{
            $(".help-block").show();
            $scope.waiting = "Loading";
            item.$update(function(response) { 
                    $scope.item = response;
                    $scope.list();
                    $scope.waiting = "Ready";
                    $(".close_btn").click();
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
          $scope.role = readCookie("user")
          var data = {'remote_url':$scope.remote_url,
                  'model_type':$scope.model,
                  'apikey':$scope.apikey
                 }   
              $scope.Model.get(data,
                function(response) { 
                      $scope.projects = response;
              var data2 = {'remote_url':$scope.remote_url,
                      'model_type':'projecttask',
                      'apikey':$scope.apikey
                     }   
              $scope.Model.get(data2,
                function(response) { 
                      $scope.projecttasks = response;
                      $scope.items = {"count": 1, "entities": [], "model": "project", "apikey": "pwc", "method": "get_entities"};
                      for(var i = 0; i < $scope.projects.entities.length; i++){
                        var aProj = $scope.projects.entities[i].data;
                        var resp = [];
                        for(var j = 0; j < $scope.projecttasks.entities.length; j++){
                          if(aProj.project == $scope.projecttasks.entities[j].data.project){
                            var aResp = $scope.projecttasks.entities[j].data.resp;
                            for(var k = 0; k < aResp.length; k++){
                              if(resp.indexOf(aResp[k]) < 0){
                                resp.push(aResp[k]);
                              }
                            }
                          }
                        }
                        $scope.items.entities.push({"model": "project", "apikey": "pwc", 
                          "data": {"project": aProj.project, "manager": aProj.manager, 
                          "partner": aProj.partner, "industry": aProj.industry, "sDate": aProj.sDate, 
                          "eDate": aProj.eDate, "status": aProj.status, "summary": aProj.summary, 
                          "scope": aProj.scope, "limitation": aProj.limitation, "risk": aProj.risk,
                          "recommendation": aProj.recommendation, "resp": resp}, "id": $scope.projects.entities[i].id});
                        $(".modal-backdrop").hide();
                      }
                    }); 
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
        $scope.linkReport = function(projectName){
          localStorage.setItem("project",projectName);
          window.location.href="report.html";
        }
        $scope.showNext = function(id){
          $(".projDetail#"+id).toggle();
        }
      }
      
    $(document).ready(function(){
      $("#project").addClass("active");
    
      $("tr.proj").bind("click",function(){
        $(this).next("tr").toggle();
      });

    })

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