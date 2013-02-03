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
    <h4>Hello <b id="username">Lydia</b>, welcome to LinkAge. </h4>
    <div class="row">
         <fieldset class="noti_sidebar span3 hidden-phone">
         	  <legend><small>Notification board:</small> <sub><i class="icon-refresh"></i></sub></legend>
             <table class="table">
               <tr>
                 <td><a href="">Project PWC's dateline is today, 2.30pm</a></td>
                 <td><i class="icon-remove"></i></td>
               </tr>
               <tr>
                 <td><a href="">3 new message for you since you last logged in</a></td>
                 <td><i class="icon-remove"></i></td>
               </tr>
               <tr>
                 <td><a href="">You have been assigned 3 new projects</a></td>
                 <td><i class="icon-remove"></i></td>
               </tr>
               <tr>
                 <td><a href="">Your work schedule has been updated</a></td>
                 <td><i class="icon-remove"></i></td>
               </tr>
  		</table>
           <a href="" class="pull-right"><small>View All...</small></a>
         </fieldset>
         <div class="span8 schedule_summary">
         	<table class="table table-bordered">
         	  <thead>
         	  	<tr>
	         	  	<th class="proj_col" style="width: 29%"></th>
	         	  	<th style="width: 11%">Today</th>
	         	  	<th style="width: 10%">19/01</th>
	         	  	<th style="width: 10%">20/01</th>
	         	  	<th style="width: 10%">21/01</th>
	         	  	<th style="width: 10%">21/01</th>
	         	  	<th style="width: 10%">22/01</th>
	         	  	<th style="width: 10%">23/01</th>
         	  	</tr>
         	  </thead>
              <tr>
                <td class="task_col"><b>Project A</b> - Task 1</td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="task_col"><b>Project A</b> - Task 2</td>
                <td></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="task_col"><b>Project E</b> - Task 3</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
                <td class="marked"><i class="icon-briefcase"></i></td>
              </tr>
            </table>
         </div>
      </div>
  </div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
<script type="text/javascript">
document.getElementById("username").innerHTML = localStorage.getItem("user");
$(document).ready(function(){
	$("#home").addClass("active");
});
</script>
</html>
