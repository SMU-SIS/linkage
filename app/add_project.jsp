<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PWC</title>
<link href="css/main.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
</head>

<body>

<div class="container">
    <jsp:include page="header.jsp" />
  <div class="content">
  	<jsp:include page="navbar.jsp" />
    <form name="form1" method="post" action="add_tasks.jsp">
      <fieldset>
        <legend>Create Project</legend>
        <div class="span4">
            <label>Project Type</label>
            <input type="text">
            <label>Project Type</label>
            <input type="text">
            <label>Client</label>
            <input type="text">
        </div>
        <div class="span4">
            <label>Start Date</label>
            <input type="date">
            <label>End Date</label>
            <input type="date">
            <br /> <br />
            <button type="submit" class="btn btn-success">Next</button>
        </div>
      </fieldset>
    </form>
  </div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
</html>
