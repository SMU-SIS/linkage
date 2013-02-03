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
            <h3>Inbox:</h3>
            <div class="row">
            	<div class="span4">
                  <label>Search:</label>
                  <input type="text">
                  <table class="table table-hover">
                  	<tr><td>Lydia</td></tr>
                    <tr><td>Jerome</td></tr>
                    <tr><td>Yahui</td></tr>
                    <tr><td>Yinglin</td></tr>
                    <tr><td>Zhenyu</td></tr>
                  </table>
                </div>
                <div class="span7">
                	<button class="btn">+ New Message</button>
                    <hr/>
                    <div class="hero-unit">
                    	<p class="muted">No Conversation Selected</p>
                    </div>
                </div>
            </div>
    <!-- end .content --></div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
<script>
</script>
</html>
