'use strict';

/* Controllers */


function FirstController($scope) {
   $scope.name = "Lydia";
}

function SecondController($scope,$resource){
        $scope.user = $resource('/user').get();        
}

