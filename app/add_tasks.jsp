<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PWC</title>
<link href="css/main.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap.css" rel="stylesheet" type="text/css">
<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css">
<style type="text/css" title="currentStyle">
			@import "css/demo_table.css";
		</style>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
	<script type="text/javascript" charset="utf-8">
        $(document).ready(function() {
            $('#emp_table').dataTable();
			$('#next_btn').click(function(){
				$(this).hide();
				$(".dataTables_wrapper").hide();
				$(".task_wrap").show();
			});
			$('#prev_btn').click(function(){
				$('#next_btn').show();
				$(".dataTables_wrapper").show();
				$(".task_wrap").hide();
			});
        } );
    </script>
<script src="js/bootstrap.min.js"></script>
</head>

<body>

<div class="container">
    <jsp:include page="header.jsp" />
  <div class="content">
  	<jsp:include page="navbar.jsp" />
    <table class="table" id="emp_table">
    <thead>
      <tr>
        <th scope="col">Add</th>
        <th scope="col">Member</th>
        <th scope="col">Ongoing projects</th>
        <th scope="col">Earliest Dateline</th>
        <th scope="col">Skills</th>
      </tr>
      </thead>
      <tr>
      	<td><i class="icon-plus"></i></td>
        <td>Jane</td>
        <td>0</td>
        <td>NA</td>
        <td>Windows System Test <br/> Linux System Test <br/> Windows Server Configuration </td>
      </tr>
      <tr>
      	<td><i class="icon-plus"></i></td>
        <td>Tom</td>
        <td>1</td>
        <td>23 Mar 2013</td>
        <td>Windows System Test <br/> Linux System Test</td>
      </tr>
      <tr>
      	<td><i class="icon-plus"></i></td>
        <td>Mary</td>
        <td>2</td>
        <td>2 Apr 2013</td>
        <td>Linux System Test <br/> Windows Server Configuration</td>
      </tr>
      <tfoot>
      <tr>
        <th scope="col">Add</th>
        <th scope="col">Member</th>
        <th scope="col">Ongoing projects</th>
        <th scope="col">Earliest Dateline</th>
        <th scope="col">Skills</th>
      </tr>
      </tfoot>
    </table><br/><br/>
    <a class="btn btn-success" id="next_btn">Next</a>
    <div class="task_wrap" style="display:none;">
        <form name="form1" method="post" action="#">
          <fieldset>
            <legend>Tasks Allocation</legend>
            <div class="row control-group">
            	<div class="span9">
                <table class="table" id="task_table">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Task</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Predecessor</th>
                    <th scope="col">Employee</th>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td><input type="text" id="task_input" class="input-small"/></td>
                    <td><input type="date" id="start_date" class="input-small"/></td>
                    <td><input type="date" id="end_date" class="input-small"/></td>
                    <td><input type="number" id="predecessor" class="input-mini"/></td>
                    <td><input type="text" id="employee" class="input-small"/></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td><input type="text" id="task_input" class="input-small"/></td>
                    <td><input type="date" id="start_date" class="input-small"/></td>
                    <td><input type="date" id="end_date" class="input-small"/></td>
                    <td><input type="number" id="predecessor" class="input-mini"/></td>
                    <td><input type="text" id="employee" class="input-small"/></td>
                  </tr>
                </table>
                </div>
                <div class="span2" id="emp_list">
                	<i>Employee List:</i>
                	<ul>
                    <li>Lydia</li>
                    <li>Yinglin</li>
                    </ul>
                </div>
            </div>
            <div class="row control-group">
            <div class="span5">
            <a class="btn" id="prev_btn">Prev</a>
            <button type="submit" class="btn btn-success">Create Project</button>
            </div>
            </div>
          </fieldset>
        </form>
    </div>
  </div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
</html>
