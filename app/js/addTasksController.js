angular.module('myApp', ['ngResource']);
	  function BackendController($scope,$resource){
		
		$scope.assigned_members =[];
		
		$scope.member_list = {};
			$scope.member_list.data = {
				"name":"",
				"tasks":"",
				"dead_line":"",
				"skills":["",""]
			};
		
  		$scope.selectMember = function(member){
          $("#next_btn").prev(".alert").hide();
        var count = 0;
  			$scope.assigned_members.push(member);
  			angular.forEach($scope.avail_members, function(avail_member) {
  				if(member.data.fullname == avail_member.data.fullname){
  					$scope.avail_members.splice(count,1);
  				}
  				count++;
  			});
  		}

      $('#next_btn').click(function(){
        if($scope.assigned_members.length && $scope.assigned_members.length > 0){
          $scope.next_error = "";
          $(this).hide();
          $("#emp_table").hide();
          $(".task_wrap").show("fast",function(){
            $("#emp_list ul li").draggable({
              appendTo: "body",
              start: function(event, ui) { $(this).css("z-index", 10000); },
              helper: "clone"
            });
          });
        }else{
          $(this).prev(".alert").show();
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
        $scope.remote_url = "linkagepwc.appspot.com";
        $scope.model = "projecttask";
        $scope.waiting = "Ready";

        
        //resource calls are defined here

        $scope.Model = $resource('http://:remote_url/:apikey/:model_type/:id',
                                {},{'get': {method: 'JSONP', isArray: false, params:{callback: 'JSON_CALLBACK'}}
                                   }
                            );
        
        $scope.list = function(){
          var data = {'remote_url':$scope.remote_url,
                  'model_type':"user",
                  'apikey':$scope.apikey
                 }      
          $scope.Model.get(data,
                function(response) { 
                  $scope.items = response;
                  $scope.avail_members = [];
                  for(var i = 0; i < $scope.items.entities.length; i++){
                    var thisMemeber = $scope.items.entities[i].data;
  				          $scope.avail_members.push({"model": "user", "apikey": "pwc", 
                      "data": {"username": thisMemeber.username, "skills": thisMemeber.skills, "fullname": thisMemeber.fullname, 
                      "tasks": [], "deadline": "NA"}, 
                      "id": $scope.items.entities[i].id});
                  }
                  var data2 = {'remote_url':$scope.remote_url,
                          'model_type':$scope.model,
                          'apikey':$scope.apikey
                         }    
                  $scope.Model.get(data2,
                        function(response2) { 
                          $scope.projects = response2;
                          for(var i = 0; i < $scope.avail_members.length; i++){
                            var thisMemeber = $scope.avail_members[i].data.username;
                            for(var j = 0; j < $scope.projects.count; j++){
                              var thisProj = $scope.projects.entities[j].data;
                                for(var l = 0; l < thisProj.resp.length; l++){
                                  if(thisMemeber == thisProj.resp[l]){
                                    $scope.avail_members[i].data.tasks.push({"proj":thisProj.project,"task":thisProj.name,"end":thisProj.end});
                                    if($scope.avail_members[i].data.deadline == "NA"){
                                      $scope.avail_members[i].data.deadline = thisProj.end;
                                    }else{
                                      var st1 = $scope.avail_members[i].data.deadline.split("/");
                                      var st2 = thisProj.end.split("/");
                                      if(parseInt(st1[2]) < parseInt(st2[2])){
                                        $scope.avail_members[i].data.deadline = thisProj.end;
                                      }else if(parseInt(st1[2]) == parseInt(st2[2])){
                                        if(parseInt(st1[1]) < parseInt(st2[1])){
                                          $scope.avail_members[i].data.deadline = thisProj.end;
                                        }else if(parseInt(st1[1]) < parseInt(st2[1]) &&parseInt(st1[0]) < parseInt(st2[0])){
                                          $scope.avail_members[i].data.deadline = thisProj.end;
                                        }
                                      }
                                    }
                                  }
                                }
                            }
                          }
                  });
                });
          var data = {'remote_url':$scope.remote_url,
                  'model_type':"project",
                  'apikey':$scope.apikey
                 }      
          $scope.Model.get(data,
                function(response) { 
                  var allProj = response.entities;
                  for(a in allProj){
                    if(allProj[a].data.project == localStorage.getItem("project")){
                      $scope.minDate = allProj[a].data.sDate;
                      $scope.maxDate = allProj[a].data.eDate;
                    }
                  }
                });
        };
		$("body").on("hover","#popover",function(){
      try{
        var content = "";
        var projectTasks = JSON.parse($(this).attr('data-content'));
        if(!projectTasks.length || projectTasks.length == 0){
          content += "No tasks."
        }else{
          content += "<ul>";
          for(var i = 0; i < projectTasks.length; i++){
            content += "<li>"+projectTasks[i].proj+": "+projectTasks[i].task+" (Due: "+projectTasks[i].end+")</li>";
          }
          content += "</ul>";
        }
        $(this).attr('data-content',content);
        $(this).popover({trigger: "hover", html: true});
        $(this).popover('show');
      }catch(error){
        //$(this).popover('show');
      }
    });

    var taskCount = 1;

		$scope.add = function(){
		  var valid = true;
		  for(var i = 0; i < $scope.project.length; i++){
  			var thisTask = $scope.project[i];
  			if(thisTask.name == "" || thisTask.start == "" || thisTask.end == "" || thisTask.resp.length == 0){
  			  valid = false;
  			  var node = $(".accordion-body#task"+thisTask.id).prev().children();
  			  node.addClass("text-warning");
  			  $(".accordion-body#task"+thisTask.id+" .help-bolck").show();
  			}
		  }
		  if(valid){
					$scope.SaveResource = $resource('http://:remote_url/:apikey/:model', 
							{"remote_url":$scope.remote_url,"apikey":$scope.apikey,"model":"projecttask"}, 
							{'save': { method: 'POST',    params: {} }});
		   
				$scope.waiting = "Loading";
				//var item = new $scope.SaveResource($scope.project);
				//$scope.item = item.$save(function(response) { 
				//window.location.href = "current_projects.html";
				//});
				//replaced with following
			angular.forEach($scope.project, function(entry){
				var item = new $scope.SaveResource(entry);
				$scope.item = item.$save(function(response) {
					window.location.href = "current_projects.html";
				});
			});
		  }
		};
		
		//=================function project task============================
		
		$scope.projectname = localStorage.getItem("project"); //added - M110213
		$scope.status = "In Progress";
		$scope.project = [];//altered - M110213
		
		var id;
		
		$scope.savetask = function(){
			//replaced - M110213
			//$scope.project.tasks.push({"id":taskCount,"name":"","start":"","end":"","hours":"8","resp":[]});
			//taskCount shifted to declaration above,
      $scope.task = {"project":$scope.projectname,"id":taskCount,"name":"","start":"","end":"","hours":"8","resp":[], "status": $scope.status, 
    "taskReport": "", "assessment":""};//altered - M 110213
			$scope.project.push($scope.task);
			checkDOMChange(taskCount);
      
			taskCount++;
		}
		
		function checkDOMChange(taskCount)
		{ 
			if(taskCount != null){
			id = taskCount;
			}
			var startpk = $( "#dp"+id+"1" );
			var myVar;
        if(startpk.length && $scope.minDate){
          $( "#dp"+id+"1" ).datepicker({
                         inline: true,
                         dateFormat: 'dd/mm/yy',
                         minDate: $scope.minDate,
                         maxDate: $scope.maxDate,
                         onSelect: function(dateText) {
                             var modelPath = $(this).attr('ng-model');
                             var id = parseInt($(this).attr('id').substring(2,$(this).attr('id').length-1));
                             //putObject(modelPath, $scope, dateText);
                             $scope.project[id-1].start = dateText;
                             $scope.$apply();
                             $( "#dp"+id+"2" ).datepicker("option","minDate", dateText);
                         }
                     });
            $( "#dp"+id+"2" ).datepicker({
                         inline: true,
                         dateFormat: 'dd/mm/yy',
                         minDate: $scope.minDate,
                         maxDate: $scope.maxDate,
                         onSelect: function(dateText) {
                             var modelPath = $(this).attr('ng-model');
                             var id = parseInt($(this).attr('id').substring(2,$(this).attr('id').length-1));
                             //putObject(modelPath, $scope, dateText);
                             $scope.project[id-1].end = dateText;
                             $scope.$apply();
                             $( "#dp"+id+"1" ).datepicker("option","maxDate", dateText);
                         }
                     });

            $(".drop_member#members"+id).droppable({
              activeClass: "ui-state-default",
              hoverClass: "ui-state-hover",
              accept: ":not(.ui-sortable-helper)",
              drop: function( event, ui ) {
                $( this ).find( ".placeholder" ).remove();
                var task_id = parseInt($(this).children("#m_task_id").text());
                $scope.addMember(task_id,ui.draggable.attr("id"));
              }
            });
            clearTimeout(myVar);
        }else{
          myVar = setTimeout( checkDOMChange, 200 );
        }
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
	  
		$scope.addMember = function(id,m){
			$scope.$apply(function(){
				$scope.project[id-1].resp.push(m);
			});
		}

		$scope.removeMember = function(id,m){
			var a = $scope.project[id-1].resp.indexOf(m);
			$scope.project[id-1].resp.splice(a,1);
		}

		$scope.removeTask = function(id){
			$scope.project.splice(id-1,1);
			for(var i = 0; i < $scope.project.length; i++){
				$scope.project[i].id = i+1;
			}
			taskCount--
		}
		
		//added method clear
		$scope.clear = function(){
			$scope.task = {"project":$scope.projectname,"id":taskCount,"name":"","start":"","end":"","hours":"8","resp":[], "status": $scope.status};//altered - M 110213
		}
		//=================close function project task======================

    $scope.list();   
    $scope.savetask();
  }



