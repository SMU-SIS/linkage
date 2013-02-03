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
            <form class="form-search">
              <div class="input-append">
                <input type="text" class="span2 search-query" placeholder="Enter a name...">
                <button type="submit" class="btn">Search</button>
              </div>
            </form>
            <ul class="thumbnails">
              <li class="span4">
                <div class="thumbnail">
                  <div class="caption">
                    <h3><a href="#">Li Lu</a></h3>
                    <p>Skillset: </p>
                    <div class="editable">Perform Windows Configuration <br/> Window Server Testing</div><br/>
                    <p><a href="grading.jsp" class="btn btn-primary">Grading</a> <a class="btn edit_btn">Edit</a><a class="btn save_btn" style="display:none;">Save</a></p>
                  </div>
                </div>
              </li>
              <li class="span4">
                <div class="thumbnail">
                  <div class="caption">
                    <h3><a href="#">Lydia</a></h3>
                    <p>Skillset: </p>
                    <div class="editable">Perform Windows Configuration <br/> Window Server Testing</div><br/>
                    <p><a href="grading.jsp" class="btn btn-primary">Grading</a> <a class="btn edit_btn">Edit</a><a class="btn save_btn" style="display:none;">Save</a></p>
                  </div>
                </div>
              </li>
              <li class="span4">
                <div class="thumbnail">
                  <div class="caption">
                    <h3><a href="#">Yahui</a></h3>
                    <p>Skillset: </p>
                    <div class="editable">Perform Windows Configuration <br/> Window Server Testing</div><br/>
                    <p><a href="grading.jsp" class="btn btn-primary">Grading</a> <a class="btn edit_btn">Edit</a><a class="btn save_btn" style="display:none;">Save</a></p>
                  </div>
                </div>
              </li>
              <li class="span4">
                <div class="thumbnail">
                  <div class="caption">
                    <h3><a href="#">Yinglin</a></h3>
                    <p>Skillset: </p>
                    <div class="editable">Perform Windows Configuration <br/> Window Server Testing</div><br/>
                    <p><a href="grading.jsp" class="btn btn-primary">Grading</a> <a class="btn edit_btn">Edit</a><a class="btn save_btn" style="display:none;">Save</a></p>
                  </div>
                </div>
              </li>
              <li class="span4">
                <div class="thumbnail">
                  <div class="caption">
                    <h3><a href="#">Jerome</a></h3>
                    <p>Skillset: </p>
                    <div class="editable">Perform Windows Configuration <br/> Window Server Testing</div><br/>
                    <p><a href="grading.jsp" class="btn btn-primary">Grading</a> <a class="btn edit_btn">Edit</a><a class="btn save_btn" style="display:none;">Save</a></p>
                  </div>
                </div>
              </li>
              <li class="span4">
                <div class="thumbnail">
                  <div class="caption">
                    <h3><a href="#">Zhenyu</a></h3>
                    <p>Skillset: </p>
                    <div class="editable">Perform Windows Configuration <br/> Window Server Testing</div><br/>
                    <p><a href="grading.jsp" class="btn btn-primary">Grading</a> <a class="btn edit_btn">Edit</a><a class="btn save_btn" style="display:none;">Save</a></p>
                  </div>
                </div>
              </li>
            </ul>
    <!-- end .content --></div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
<script>
$(document).ready(function(e) {
    $(".edit_btn").click(function(e){
		$(this).parent().prev().prev().attr("contenteditable","true").focus();
		$(this).hide();
		$(this).next().show();
	});
	$(".save_btn").click(function(e){
		$(this).parent().prev().prev().attr("contenteditable","false");
		$(this).hide();
		$(this).prev().show();
	});
});
</script>
</html>
