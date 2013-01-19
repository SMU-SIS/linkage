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
            <table class="table">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project</th>
                <th scope="col">Client</th>
                <th scope="col">Person In Charge</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Progress</th>
              </tr>
              <tr class="proj">
                <td>1</td>
                <td>FYP</td>
                <td>SMU</td>
                <td>YL</td>
                <td>12/12/12</td>
                <td>23/2/13</td>
                <td><div class="progress progress-info"><div class="bar" style="width: 20%"></div></div></td>
              </tr>
              <tr style="display:none">
              	<td></td>
              	<td colspan="6">
                <p>
                <strong>Project: FYP </strong>
				<br/>
                <strong>Project Manager:</strong> 
                Andy 
				<br/>
                <strong>Project Members: </strong>
                Jane, Mary, Peter, Tom 
				<br/>
                <strong>Duration: </strong>
                2011-03-05 to 2012-12-07, 3.30pm <br/>
                <a href="#" class="btn btn-info">Go to Report >></a>
                </p>
                </td>
              </tr>
              <tr class="proj">
                <td>2</td>
                <td>PWC</td>
                <td>PWC</td>
                <td>Doris</td>
                <td>21/11/12</td>
                <td>10/1/13</td>
                <td><div class="progress progress-danger"><div class="bar" style="width: 80%"></div></div></td>
              </tr>
              <tr style="display:none">
              	<td></td>
              	<td colspan="6">
                <p>
                <strong>Project: PWC </strong>
				<br/>
                <strong>Project Manager:</strong> 
                Andy 
				<br/>
                <strong>Project Members: </strong>
                Jane, Mary, Peter, Tom 
				<br/>
                <strong>Duration: </strong>
                2011-03-05 to 2012-12-07, 3.30pm <br/>
                <a href="#" class="btn btn-info">Go to Report >></a>
                </p>
                </td>
              </tr>
            </table>
    <!-- end .content --></div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
<script>
$(document).ready(function(e) {
    $(".proj").bind("click",function(){
		$(this).next("tr").toggle();
	});
});
</script>
</html>
