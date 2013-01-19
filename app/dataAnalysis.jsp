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
            <h3>In-house Data Analysis</h3>
            <h4><em>Period:</em></h4>
            <div class="row">
            <div class="span4">
              <label>From</label>
              <input type="text" id="datepicker1">
              <label>To</label>
              <input type="text" id="datepicker2">
              </div>
                <div class="span5">
                    <table class="table table-bordered">
                      <thead>
                        <th>#</th>
                        <th>Issue Name</th>
                      </thead>
                      <tr>
                        <td>1</td>
                        <td>Issue 1</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Issue 2</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Issue 3</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Issue 4</td>
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
