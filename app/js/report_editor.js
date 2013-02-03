var Dom = YAHOO.util.Dom, 
Event = YAHOO.util.Event, 
editing = null; 
YAHOO.util.Event.on('gen_btn', 'click', function() {
    //Put the HTML back into the text area
    myEditor.saveHTML();
 
    //The var html will now have the contents of the textarea
    var html = myEditor.get('element').value;

    gen_report();
});
function gen_report(){
    var title = $(".proj_title").text();
    var first = $("#executiveSummary").text();
    var second = $("#scopeOfWork").text();
    var font = "Arial";
    var params = new Array();
    params['title'] = title;
    params['first'] = first;
    params['second'] = second;
    params['font'] = font;
    
    post_to_url("report_gen.jsp",params,"POST");
}

function post_to_url(path, params, method) {
    method = method || "post"; 
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}

$(document).ready(function(){
    $("#report").addClass("active");
    var myEditor;
    for (var i = 1; i <= 5; i++) {
        myEditor = new YAHOO.widget.Editor('msgpost'+i, {
            height: '300px',
            width: '600px',
            dompath: true, //Turns on the bar at the bottom
            animate: true //Animates the opening, closing and moving of Editor windows
        });
        myEditor.render(); 
    };
});