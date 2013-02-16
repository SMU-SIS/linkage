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
    $scope.model = "project";
    
    $scope.item = {};
    $scope.item.data = {};
    
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
    
    $scope.list = function(){
        /*
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
        */
        $scope.items = {"count": 1, "entities": [{"model": "project", "apikey": "pwc", "data": {"project": "asdf",
                            "manager": "asdf", "partner": "asdf", "industry": "asdf",
                            "sDate": "asdf", "eDate": "asdf", "status": "asdf",
                            "summary": "asdf", "scope": "asdf", "limitation": "asdf", "risk":"asdf", "recom":"asdf"
                           }, "id": 1}], "model": "project", "apikey": "pwc", "method": "get_entities"};
        var id = 1;
        for(var i = 0; i < $scope.items.count; i++){
            if($scope.items.entities[i].id == id){
                $scope.project = $scope.items.entities[i].data;
            }
        }
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
}

var Dom = YAHOO.util.Dom, 
Event = YAHOO.util.Event, 
editing = null; 
YAHOO.util.Event.on('gen_btn', 'click', function() {
    //Put the HTML back into the text area
    myEditor.saveHTML();
 
    //The var html will now have the contents of the textarea
    var html = myEditor.get('element').value;

    gen_report();
});
function gen_report(){
    var title = $(".proj_title").text();
    var first = $("#executiveSummary").text();
    var second = $("#scopeOfWork").text();
    var font = "Arial";
    var params = new Array();
    params['title'] = title;
    params['first'] = first;
    params['second'] = second;
    params['font'] = font;
    
    post_to_url("report_gen.jsp",params,"POST");
}

function post_to_url(path, params, method) {
    method = method || "post"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

$(document).ready(function(){
    $("#report").addClass("active");
    var myEditor;
    for (var i = 1; i <= 5; i++) {
        myEditor = new YAHOO.widget.Editor('msgpost'+i, {
            height: '300px',
            width: '600px',
            css: 'table td { border: 1px dashed #CCC } td { height: 15px; }',
            dompath: true, //Turns on the bar at the bottom
            animate: true //Animates the opening, closing and moving of Editor windows
        });
        myEditor.initTableEditor();
        myEditor.on('toolbarLoaded', function() {
          var tb = this.toolbar;
          var config = {
              group: 'table',
              label: 'Table',
              buttons: [
                  { type: 'push', label: 'Insert Table', value: 'inserttable' }
              ]
          };
          this.toolbar.addSeparator();
          this.toolbar.addButtonGroup(config);
        }, myEditor, true);
        myEditor.render(); 
    };
});