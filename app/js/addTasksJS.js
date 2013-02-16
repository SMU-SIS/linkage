
$(document).ready(function() {
    //$('#emp_table').dataTable();
	$('#prev_btn').click(function(){
		$('#next_btn').show();
		$("#emp_table").show();
		$(".task_wrap").hide();
	});
	$("#emp_table td a#ongoing_proj").each(function(){
		$(this).popover({html: true});
	});
	$("#project").addClass("active");
	
	
});
