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
var num = 2;
var curr_issue_id = 1;
var edit = false;
$(document).ready(function(e) {
  $(".report_tabs .issue1").addClass("active");
  $(".tab-content #issue1").addClass("active");
	for (var i = 1; i < num; i++) {
    for (var j = 1; j <= 4; j++) {
      myEditor = new YAHOO.widget.Editor('msgpost'+i+j, {
          height: '200px',
          width: '600px',
          css: 'table td { border: 1px dashed #CCC } td { height: 15px; }',
          dompath: true, //Turns on the bar at the bottom
          animate: true //Animates the opening, closing and moving of Editor windows
      });
      myEditor.initTableEditor();
      myEditor.on('toolbarLoaded', function() {
        var tb = this.toolbar;
        var config = {
            group: 'table',
            label: 'Table',
            buttons: [
                { type: 'push', label: 'Insert Table', value: 'inserttable' }
            ]
        };
        this.toolbar.addSeparator();
        this.toolbar.addButtonGroup(config);
      }, myEditor, true);
      myEditor.render(); 
    };
  };
  $(".report_tabs li").click(function(){
    curr_issue_id = parseInt($(this).attr('class').replace("issue",""));
  });
  /*
  $("#add_issue").click(function(e){
      var issue = $("#issue_input").val();
      var subissue = $("#subissue_input").val();
      if(issue == ""){
        e.stopPropagation();
        $("#addIssueModal .alert").show();
      }else{
        var issue_title;
        if(subissue == ""){
          issue_title = issue;
        }else{
          issue_title = issue + ' '+ subissue;
        }
        if(edit){

        }else{
          //addIssue(issue_title);
        }
      }
    $("#issue_input").val("");
    $("#subissue_input").val("");
  });
*/
  $(".delete_issue").click(function(e){
      
  });
});
/*
function addIssue(issue){
  $(".report_tabs").append('<li class="issue'+num+'"><a href="#issue'+num+'" data-toggle="tab"> '+ issue + ' </a></li>');
  $('<div class="tab-pane" id="issue'+num+'"></div').appendTo(".tab-content");
  
  $("#issue"+num).append('<h2> '+ issue + '</h2> <br /><h5>Description</h5><textarea name="msgpost'+num+'1" id="msgpost'+num+'1"></textarea><br />'
    +'<button class="btn save_btn">Save</button>'
    +'<h5>Implications</h5><textarea name="msgpost'+num+'2" id="msgpost'+num+'2"></textarea><br /><button class="btn save_btn">Save</button>'
    +'<h5>Recommendations</h5><textarea name="msgpost'+num+'3" id="msgpost'+num+'3"></textarea><br /><button class="btn save_btn">Save</button>'
    +'<h5>Management Comments</h5><textarea name="msgpost'+num+'4" id="msgpost'+num+'4"></textarea><br /><button class="btn save_btn">Save</button>');
  
}
*/
function IssueCtrl($scope) {
  $scope.curr_issue = {"title":"","subissue":""};
  $scope.issueJson = {"count":2,"issues":[{"id":1,"title":"DR-1","subissue":"SubIssue1","desc":"We noted the following discrepancies with the exit form:",
  "impli":"User access exit procedure could be improperly administered when the process does not strictly ensure that the  required documents have been completed.",
  "recom":"We recommend that MMM adhere strictly to the exit procedures for School infrastructure team. The user exit procedures documentation should also be endorsed by relevant authorized personnel, etc.",
  "comment":"We recommend that MMM adhere strictly to the exit procedures for School infrastructure team. The user exit procedures documentation should also be endorsed by relevant authorized personnel, etc."},
  {"id":2,"title":"DR-2","subissue":"SubIssue1","desc":"We noted the following discrepancies with the exit form:",
  "impli":"User access exit procedure could be improperly administered when the process does not strictly ensure that the  required documents have been completed.",
  "recom":"We recommend that MMM adhere strictly to the exit procedures for School infrastructure team. The user exit procedures documentation should also be endorsed by relevant authorized personnel, etc.",
  "comment":"We recommend that MMM adhere strictly to the exit procedures for School infrastructure team. The user exit procedures documentation should also be endorsed by relevant authorized personnel, etc."}]};
  $scope.issues = $scope.issueJson.issues;
  num = $scope.issueJson.count + 1;
  $(".add_issue").click(function(e){
    $(".btn#add_issue").text("Add Issue");
    $scope.curr_issue.title = "";
    $scope.curr_issue.subissue = "";
    $("#issue_input").val("");
    $("#subissue_input").val("");
    $(".btn#add_issue").show();
    $(".btn#update_issue").hide();
  });
  $scope.add = function(){
    var issue = $("#issue_input").val();
    var subissue = $("#subissue_input").val();
    if(issue == ""){
      $("#addIssueModal .alert").show();
    }else{
      $scope.issues.push({"id":num,"title":$scope.curr_issue.title,"subissue":$scope.curr_issue.subissue,"desc":"We noted the following discrepancies with the exit form:","impli":" ","recom":" ","comment":" "});
      for (var j = 1; j <= 4; j++) {
        myEditor = new YAHOO.widget.Editor('msgpost'+num+j, {
            height: '200px',
            width: '600px',
            css: 'table td { border: 1px dashed #CCC } td { height: 15px; }',
            dompath: true, //Turns on the bar at the bottom
            animate: true //Animates the opening, closing and moving of Editor windows
        });
        myEditor.initTableEditor();
        myEditor.on('toolbarLoaded', function() {
          var tb = this.toolbar;
          var config = {
              group: 'table',
              label: 'Table',
              buttons: [
                  { type: 'push', label: 'Insert Table', value: 'inserttable' }
              ]
          };
          this.toolbar.addSeparator();
          this.toolbar.addButtonGroup(config);
        }, myEditor, true);
        myEditor.render(); 
      };
      num++;
      $scope.issueJson.count++;
      $scope.curr_issue = {"title":"","subissue":""};
      $(".btn#add_issue").text("Add One More Issue");
    }
  };
  $(".edit_issue").click(function(e){
    $scope.curr_issue.title = $scope.issues[curr_issue_id-1].title;
    $scope.curr_issue.subissue = $scope.issues[curr_issue_id-1].subissue;
    $("#issue_input").val($scope.issues[curr_issue_id-1].title);
    $("#subissue_input").val($scope.issues[curr_issue_id-1].subissue);
    $(".btn#add_issue").hide();
    $(".btn#update_issue").show();
  });
  $scope.update = function(){
    $scope.issues[curr_issue_id-1].title = $scope.curr_issue.title;
    $scope.issues[curr_issue_id-1].subissue = $scope.curr_issue.subissue;
  }
  $scope.delete = function(){
    $scope.issues.splice(curr_issue_id-1,1);
    $scope.issueJson.count--;
    num--;
    for(i = 1; i <= $scope.issueJson.count; i++){
      $scope.issues[i - 1].id = i;
    }
  }
}
