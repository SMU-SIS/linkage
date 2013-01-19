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
<script type="text/javascript" src="http://js.nicedit.com/nicEdit-latest.js"></script> 
<script type="text/javascript">
bkLib.onDomLoaded(function() { 
	//new nicEditor({fullPanel : true}).panelInstance('myArea'); 
	nicEditors.allTextAreas();
	$(".tab-pane").children("div").css("width","97%");
    $(".tab-pane").children("div").next().css("width","97%");
    $(".tab-pane").children("div").next().children("div").css("width","97%");
}); 
$(document).ready(function(e) {
	var area2;
    $(".btn-delete").click(function() {
		var tab_id = $(this).parent().attr("id");
		$(this).parent().prev().addClass("active");
		$(this).parent().remove();
		$(".report_tabs li."+tab_id).prev().addClass("active");
		$(".report_tabs li."+tab_id).remove();
	});
	$("#add_issue").click(function(){
		$(".modal").modal("show");
	});
	$(".modal-footer .btn-close, .close").click(function(e) {
        $(".modal").modal("hide");
    });
	$(".modal-footer .btn-primary, .close").click(function(e) {
        $(".modal").modal("hide");
		window.location.reload();
    });
	$("#issue_selector li a").click(function(e) {
        var issue_name = $(this).text();
		$(".input_issue").val(issue_name);
    });
	$("#subissue_selector li a").click(function(e) {
        var subissue_name = $(this).text();
		$(".input_subissue").val(subissue_name);
    });
});

</script>
</head>

<body>

<div class="container">
    <jsp:include page="header.jsp" />
  <div class="content">
  	<jsp:include page="navbar.jsp" />
            <h1> Project FYP </h1>
            <hr/>
            <div class="modal hide fade">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3>New Issue</h3>
              </div>
              <div class="modal-body">
                <form>
                	<label>Issue: </label>
                    <div class="input-append">
                        <input type="text" class="span2 input_issue" id="appendedDropdownButton">
                        <div class="btn-group">
                            <button class="btn dropdown-toggle" data-toggle="dropdown">
                                Options
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" id="issue_selector">
                                <li><a>Issue A</a></li>
                                <li><a>Issue B</a></li>
                                <li><a>Issue C</a></li>
                            </ul>
                        </div>
					</div>
                    <label>Sub-issue:</label>
                    <div class="input-append">
    					<input type="text" class="span2 input_subissue" id="appendedDropdownButton">
                    	<div class="btn-group">
                            <button class="btn dropdown-toggle" data-toggle="dropdown">
                                Options
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" id="subissue_selector">
                                <li><a>Issue A</a></li>
                                <li><a>Issue B</a></li>
                                <li><a>Issue C</a></li>
                            </ul>
                        </div>
                     </div>
                </form>
              </div>
              <div class="modal-footer">
                <a class="btn btn-close">Cancel</a>
                <a class="btn btn-primary">Add</a>
              </div>
            </div>
            <div class="tabbable tabs-left">
                <ul class="nav nav-tabs report_tabs">
                  <li class="active executiveSummary"><a href="#executiveSummary" data-toggle="tab"> Executive Summary</a></li>
                  <li class="scopeOfWork"><a href="#scopeOfWork" data-toggle="tab"></i> Scope of Work</a></li>
                  <li class="limitations"><a href="#limitations" data-toggle="tab"> Limitations and Restrictions</a></li>
                  <li class="riskRatings"><a href="#riskRatings" data-toggle="tab"> Description of Risk Ratings</a></li>
                  <li class="findings"><a href="#findings" data-toggle="tab"> Findings and Recommendations</a></li>
                  <li class="issue1"><a href="#issue1" data-toggle="tab">Issue#1: DR-1</a></li>
                  <li class="issue2"><a href="#issue2" data-toggle="tab">Issue#2: OASC-1</a></li>
                  <a class="btn btn-link" id="add_issue">+ Add Issue</a>
                </ul>
                
              <div class="tab-content">
              	<div class="tab-pane active" id="executiveSummary">
                    <h2>1. Executive Summary</h2>
                    <textarea id="myArea">
                        We have completed the IT Security Review on ePortal System for Authority of Singapore (“AOS” or “Client”). Our services were performed from 25 May 2012 to 30 October 2012 in accordance with our proposal dated 27 April 2012.
                        <br /><br />
                        Scope of Work <br />
                        During the course of our work, we performed the following: <br />
                        1.	Security Review <br />
                        2.	Review of Security Policy, Standard and Guidelines <br />
                        3.	Security Testing <br />
                    </textarea><br />
                    <button class="btn save_btn">Save</button>
                </div>
                
              	<div class="tab-pane" id="scopeOfWork">
                    <h2>2. Scope of Work</h2>
                    <textarea id="myArea">
                       Review of Application & Network Infrastructure Design <br/>                    
                        We have conducted a review of the ePortal application design and network infrastructure design. We have assessed the following controls during the network infrastructure design review: <br/>
                        <ul>
                        <li>Protection and segregation of network assets;</li>
                        <li>Network traffic filtering technology;</li>
                        <li>Network layout and secure communication protocols;</li>
                        <li>Deployment of network security assets;</li>
                        <li>Network resilience and redundancy mechanisms; and</li>
                        <li>Remote Administration of network assets.</li>
                    </textarea><br />
                    <button class="btn save_btn">Save</button>
                </div>
                
                <div class="tab-pane" id="limitations">
                    <h2>3. Limitations and Restrictions</h2>
                    <textarea id="myArea">
                       <h5>Limitations of Controls</h5>
            			<p>Given the inherent limitations in any system of control, projection of any evaluation of the controls to future periods is subject to the risk that the control procedures may become inadequate because of changes in systems, conditions or the degree of compliance with those procedures. Therefore, constant monitoring is needed to ensure that system controls that exist remain effective over time.</p>
                        <h5>Limitations of Penetration Tests</h5>
                        <p>The penetration test was conducted over a limited period and the related test procedures were performed on the system at a single point of time.  As such, the scope was limited to the known vulnerabilities and system configuration during the work period. The penetration tests and vulnerability assessments may not yield any vulnerability. However that does not indicate that the system has no vulnerability exposure. New vulnerabilities may be discovered over time and therefore continuous and timely measures should be taken to aDCress them.</p>
                    </textarea><br />
                    <button class="btn save_btn">Save</button>
                </div>
                
                <div class="tab-pane" id="riskRatings">
                	<h2>4. Description of Risk Ratings</h2>
                    <p>A description of the risk ratings, which we used for categorizing our issues, is as follows:</p>
                    <textarea id="myArea">
                    <table class="table">
                      <tr>
                        <th scope="col">Risk Rating </th>
                        <th scope="col">Description</th>
                      </tr>
                      <tr>
                        <td>High</td>
                        <td>The item mentioned is a requirement to be followed as it has significant impact on controls or operations. We advise that these items be aDCressed immediately. </td>
                      </tr>
                      <tr>
                        <td>Medium </td>
                        <td>The item mentioned may be a requirement based on regulatory requirements and/ or industry good practices, and has a moderate impact on controls, finance or operations. Compensating controls should be put in place if they are not implemented. </td>
                      </tr>
                      <tr>
                        <td>Low</td>
                        <td>The item mentioned has a low impact on controls, finance or operations if left uncorrected, but should be followed-up and evaluated as an opportunity for improvement. </td>
                      </tr>
                    </table>
                    </textarea><br />
                    <button class="btn save_btn">Save</button>
                </div>
                
                <div class="tab-pane" id="findings">
                    <h2>5. Findings and Recommandations</h2>
                    <textarea id="myArea">
                       Review of Application & Network Infrastructure Design <br/>                    
                        We have conducted a review of the ePortal application design and network infrastructure design. We have assessed the following controls during the network infrastructure design review: <br/>
                        <ul>
                        <li>Protection and segregation of network assets;</li>
                        <li>Network traffic filtering technology;</li>
                        <li>Network layout and secure communication protocols;</li>
                        <li>Deployment of network security assets;</li>
                        <li>Network resilience and redundancy mechanisms; and</li>
                        <li>Remote Administration of network assets.</li>
                    </textarea><br />
                    <button class="btn save_btn">Save</button>
                </div>
                
                <div class="tab-pane" id="issue1">
                    <h2>Issue#1 DR-1</h2>
                   <h5>Description</h5>
                    <textarea id="myArea">
                       
                    <br/>
                    <p>From our review, we noted that the design documents did not explicitly state the requirements for user data input valAOStion performed in both ePortalapplications. 
                    </p>
                    <p>
                    Input valAOStion controls are designed to maintain accuracy and integrity of the data entered into the system. ValAOStion controls also helps prevent security vulnerabilities such as cross site scripting, SQL injection and vulnerabilities relating in information disclosure or unauthorised access. 
                    </p>
                    <br/>
                    </textarea><br />
                    <button class="btn save_btn">Save</button>
                    <h5>Implications</h5>
                    <textarea id="myArea">
                    <br/>
                    <p>Without proper mechanisms in place to ensure data input valAOStion, there is a risk that erroneous data could be input either intentionally or inadvertently, resulting in inaccurate and invalid output figures or results. 
                    </p><p>
                    A malicious user may also enter strings of code to exploit the system’s vulnerabilities, resulting in unauthorised access, information leakage which could potentially affect the organisation’s reputation, or result in financial losses through regulatory penalties or litigation. 
					</p>
                    </textarea><br />
                    <button class="btn save_btn">Save</button><br /><br />
                    <button class="btn btn-danger btn-delete">Delete Issue</button>
                </div>
                
                <div class="tab-pane" id="issue2">
                    <h2>Issue#2 OASC-1</h2>
                    <h5>Description</h5>
                    <textarea id="myArea">
                       
                    <br/>
                    <p>From our review, we noted that the design documents did not explicitly state the requirements for user data input valAOStion performed in both ePortalapplications. 
                    </p>
                    <p>
                    Input valAOStion controls are designed to maintain accuracy and integrity of the data entered into the system. ValAOStion controls also helps prevent security vulnerabilities such as cross site scripting, SQL injection and vulnerabilities relating in information disclosure or unauthorised access. 
                    </p>
                    <br/>
                    </textarea><br />
                    <button class="btn save_btn">Save</button>
                    <h5>Implications</h5>
                    <textarea id="myArea">
                    <br/>
                    <p>Without proper mechanisms in place to ensure data input valAOStion, there is a risk that erroneous data could be input either intentionally or inadvertently, resulting in inaccurate and invalid output figures or results. 
                    </p><p>
                    A malicious user may also enter strings of code to exploit the system’s vulnerabilities, resulting in unauthorised access, information leakage which could potentially affect the organisation’s reputation, or result in financial losses through regulatory penalties or litigation. 
					</p>
                    </textarea><br />
                    <button class="btn save_btn">Save</button><br /><br />
                    <button class="btn btn-danger btn-delete">Delete Issue</button>
                </div>
                
              </div>
            </div>
    <!-- end .content --></div>
  <div class="footer">
    <p>© 2010-2013 PricewaterhouseCoopers. All rights reserved. </p>
    <!-- end .footer --></div>
  <!-- end .container --></div>
</body>
</html>
