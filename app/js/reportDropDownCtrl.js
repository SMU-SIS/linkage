angular.module('myApp', ['ngResource']);

function reportDDController($scope,$resource){

	    $scope.backend_locations = [
			{url : 'code-comparison.appspot.com', urlName : 'remote backend' },       
			{url : 'linkagepwc.appspot.com', urlName : 'pwc' },       
			{url : 'localhost:8080', urlName : 'localhost' } 
		];

        $scope.showdetails = false;
        $scope.apikey = "pwc";
        
        //Replace this url with your final URL from the SingPath API path. 
        //$scope.remote_url = "localhost:8080";
        $scope.remote_url = "linkagepwc.appspot.com";
        $scope.model = "project";
        
        //resource calls are defined here
        $scope.Model = $resource('http://:remote_url/:apikey/:model_type/:id',
                                {},{'get': {method: 'JSONP', isArray: false, params:{callback: 'JSON_CALLBACK'}}
                                   }
                            );

		$scope.list = function(){
			data = {'remote_url':$scope.remote_url,
                'model_type':$scope.model,
                'apikey':$scope.apikey
            }
			$scope.waiting = "Updating";       
			$scope.Model.get(data,
                function(response) { 
                $scope.reports = response;
                $scope.waiting = "Ready";
            });  
        };
		
		//set the name of the selected project into local storage===========================================
		$scope.set = function(input){
			localStorage.setItem("reportTarget", input);
		}
		//close set the name of the selected project into local storage=====================================
		
		$scope.list();
}