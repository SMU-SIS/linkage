<div class="header row">
  	<div class="logo span3"> </div> 
  	<ul class="noti_icon span2"><li>
	  	<a class="noti"><i class="icon-globe"></i><sup class="noti_num">1</sup></a>
	  	<a href="message.jsp"><i class="icon-envelope"></i><sup class="msg_num">2</sup></a>
  	</li></ul><!-- end .header --></div>
  	
  	
<script type="text/javascript">
	$(document).ready(function(){
		if(readCookie("user") == null || readCookie("user") == ""){
			window.location = "index.jsp"
		}
	});
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
</script>