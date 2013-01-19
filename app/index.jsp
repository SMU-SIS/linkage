<!doctype html>
<html ng-app="myApp">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PWC</title>
<link href="css/main.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular-resource.min.js"></script>
<script src="js/angular-mocks.js"></script>
<script src="js/userDM.js"></script>
<script src="js/userController.js"></script>
</head>

<body ng-controller="MainCtrl">
<noscript>
Please enable javascript to use this application.
</noscript>
<div class="center" id="login_center">
  <div class="logo" id="login_logo"></div>
	 <form name="form1" method="post" class="form-horizontal">
    	<div class="control-group">
        	<label class="control-label" for="inputUsername">Username</label>
            <div class="controls">
              <input type="text" id="inputUsername" placeholder="Username" ng-model="user.username" required>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="inputPassword">Password</label>
            <div class="controls">
              <input type="password" id="inputPassword" placeholder="Password" ng-model="user.password" required>
            </div>
        </div>
        <span class="help-block"></span>
        <div class="control-group">
        	<div class="controls">
                <label class="checkbox">
                    <input type="checkbox" id="rmb_user"> Remember me
                </label>
                <br />
                <span class="help-block">{{alertMessage}}</span>
                <br />
                <a class="btn signin_btn" ng-click="checkPassword()">Sign in</a>
            </div>
         </div>
         
    <code>[{"username": "Peter", "password": "1234"},{"username": "Mary", "password": "1234"}]</code>
    </form>
</div>
</body>
</html>
