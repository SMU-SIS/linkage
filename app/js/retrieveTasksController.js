/* Controllers */
angular.module('myApp', ['ngResource']);
	  
	  function BackendController($scope,$resource){
		
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
        $scope.remote_url = "linkagepwc.appspot.com";
        $scope.model = "projecttask";
        $scope.waiting = "Ready";
		$scope.projectname = localStorage.getItem("project");

        
        //resource calls are defined here

        $scope.Model = $resource('http://:remote_url/:apikey/:model_type/:id',
                                {},{'get': {method: 'JSONP', isArray: false, params:{callback: 'JSON_CALLBACK'}}
                                   }
                            );
        
        /*$scope.list = function(){
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
		*/
		
		
		$scope.list = function(){
    $scope.role = readCookie("user")
		var data = {'remote_url':$scope.remote_url,
				'model_type':$scope.model,
				'apikey':$scope.apikey
			   }     
		$scope.Model.get(data,
			  function(response) { 
				$scope.items = response;
				$scope.avail_task = [];
				var thisID = 0;
				for(x=0; x < $scope.items.count;x++){
					var thisTask = $scope.items.entities[x].data;
					var thisID = x + 1;
					if( $scope.projectname == thisTask.project){
						thisID ++;
						$scope.avail_task.push({"model": "projecttask", "apikey": "pwc", 
						"data": {"status": thisTask.status, "hours": thisTask.hours, "end": thisTask.end, "name": thisTask.name, "resp": thisTask.resp,
						"project": thisTask.project, "start": thisTask.start, "id": thisID}, "id":$scope.items.entities[x].id});
						//var aTask = $scope.avail_task.entities.data;
						//$scope.view = aTask;
					
					}
				}
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
  
 
		$scope.add = function(){
			$scope.model = "projecttask";
			$scope.SaveResource = $resource('http://:remote_url/:apikey/:model', 
                        {"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":$scope.model}, 
                        {'save': { method: 'POST',    params: {} }});
       
          $scope.waiting = "Loading";
          var item = new $scope.SaveResource($scope.project);
          $scope.item = item.$save(function(response) { 
                }); 
        };
		
		$scope.addTask = function(projectName){
          localStorage.setItem("projectname",projectName);
          window.location.href="add_tasks.html";
        }
		
		
	/*	$scope.list = function(){
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
		
		*/
		
		 $scope.update = function(id){
		  var name = $scope.item.name;
		  var sDate = $scope.item.start;
			if($scope.item.data.name == ""){
			$scope.change_taskname_error = "*Please enter a task name";
			}
			else if($scope.item.data.start == ""){
			$scope.change_sDate_error = "*Please enter a start date";
			}
			else if($scope.item.data.end == ""){
			$scope.change_eDate_error = "*Please enter a end date";
			}
			else if($scope.item.data.hours == ""){
			$scope.change_hours_error = "*Please enter a valid value";
			}
			else if(isNaN(parseInt($scope.item.data.hours))){
			$scope.change_hours_error = "*Illegal characters detected";
			}
			else if($scope.item.data.hours <= "1"){
			$scope.change_hours_error = "*Hours cannot be less than 1 hour";
			}
			else{
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
			 $(".close_btn").click();
        }
	}
	

	
	 $scope.log_event = function(projecttask){
          data = {'remote_url':$scope.remote_url,
                  'model_type':"log",
                  'apikey':$scope.apikey, 
                  'obj': JSON.stringify({"project":projecttask})
                }
          $scope.Model.get(data, 
              function(response){
                  $scope.last_log = response;
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
		
		//=================function project task============================
		
		$scope.project = {"name":"placeholder","tasks":[]};
		$scope.task = {};
		
		$scope.savetask = function(){
			$scope.project.tasks.push($scope.task);
		}
		//=================close function project task======================
       
		//====================index counter=================================
		/*$scope.tem = 0;
		$scope.error = $scope.items;
        $scope.count = function(input){
          var counter = 0;
          angular.forEach($scope.items,function(item){
            counter++;
            if(item.id == input.id){ 
              $scope.tem = counter;
            }
          });
          
        }
		
		//====================close index counter===========================
	   //====================edit table====================================
		/*$scope.targetobject = "task";
		
		$scope.settarget = function(input){
			$scope.targetobject = input;
		}*/
		//====================edit table====================================
		
		
        $scope.list();         
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


