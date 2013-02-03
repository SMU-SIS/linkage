<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PWC</title>
<link href="css/main.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/flick/jquery-ui.css" type="text/css" media="all" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</head>

<body>

<div class="container">
    <jsp:include page="header.jsp" />
  <div class="content">
  	<jsp:include page="navbar.jsp" />
            <h3>Li Lu</h3>
            <h4><em>Period:</em></h4>
              <label>From</label>
              <input type="text" id="datepicker1">
              <label>To</label>
              <input type="text" id="datepicker2">
            <div class="row">
                <div class="span4">
                    <table class="table table-bordered">
                      <tr>
                        <td>Total Number of Projects</td>
                        <td>5</td>
                      </tr>
                      <tr>
                        <td>Number of Assigned Tasks</td>
                        <td>28</td>
                      </tr>
                      <tr>
                        <td>Number of Completed Tasks</td>
                        <td>20</td>
                      </tr>
                      <tr>
                        <td>Number of On-time Tasks</td>
                        <td>15</td>
                      </tr>
                      <tr>
                        <td>Number of Delayed Tasks</td>
                        <td>8</td>
                      </tr>
                      <tr>
                        <td>Number of In-process Tasks</td>
                        <td>8</td>
                      </tr>
                    </table>
                </div>
                <div class="span5">
                	<table class="table table-bordered">
                      <tr>
                        <td>In-Process Tasks</td>
                        <td><div class="progress">
                          <div class="bar" style="width: 35%;"></div>
                        </div></td>
                      </tr>
                      <tr>
                        <td>Delayed Tasks</td>
                        <td><div class="progress">
                          <div class="bar bar-danger" style="width: 10%;"></div>
                        </div></td>
                      </tr>
                      <tr>
                        <td>On-time Tasks</td>
                        <td><div class="progress">
                          <div class="bar bar-success" style="width: 35%;"></div>
                        </div></td>
                      </tr>
                      <tr>
                        <td>Completed Tasks</td>
                        <td><div class="progress">
                          <div class="bar bar-warning" style="width: 20%;"></div>
                        </div></td>
                      </tr>
                    </table>
                </div>
            </div>
    <!-- end .content --></div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
<script>
$(function() {
    $( "#datepicker1" ).datepicker();
	$( "#datepicker2" ).datepicker();
  });
</script>
</html>
