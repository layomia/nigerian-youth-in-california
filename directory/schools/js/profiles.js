var key;
var lastSuggestion = ".";

function clearDiv(divToClear) {
  var myNode = document.getElementById(divToClear);
  while (myNode.firstChild)
    myNode.removeChild(myNode.firstChild);
}

//to-do remove maleCount and femaleCount info, add id to each div to make clickable
function constructSchoolDiv(school, maleCount, femaleCount, end){
  var divClass = "col_third" + ( (end) ? " end" : "" );
  var divString = '<div class="' + divClass +'">'
  divString += '<div class="hover pane"><div class="front"><div class="box1"><p>'
  divString += school + '</p></div></div>'
  divString += '<div class="back"><a href="../people/index.php?school=' + school + '">';
  divString += '<div class="box2"><p>Male:   ';
  divString += maleCount + '</p><p>Female: ';
  divString += femaleCount + '</p></div></a></div></div></div>';
  return divString;
}

function appendSchoolDiv(schoolDiv) {
  var schoolList = document.getElementById('school-profiles');
  schoolList.insertAdjacentHTML('beforeend', schoolDiv);
}

function showAllSchools() {

  //get this list from user JSON file
  $.getJSON("../../assets/jsondata/schools.json", function(data){
    var vals = [];
    vals = data.california.split(",");
    var i = 1;

    $.each(vals, function(index, value) {
      $.ajax({
        type: 'post',
        url: "./php/school-info.php",
        data: {school: value},
        success: function (data) {
          if (data){
            var end = (i % 3 == 0);
            var maleCount = parseInt(data.substring(0, data.indexOf(",")));
            var femaleCount = parseInt(data.substring(data.indexOf(",") + 1));
            var schoolDiv = constructSchoolDiv(value, maleCount, femaleCount, end);
            appendSchoolDiv(schoolDiv);

            //causes the hover to be triggered when the element is tapped on a touch device
            $('.hover').hover(function(){
              $(this).addClass('flip');
            },function(){
              $(this).removeClass('flip');
            });
            i++;
          }
        },
        error: function (jXHR, textStatus, errorThrown) {
          console.log("No action for this school. Could not connect to processing script.");
          //make note in some type of log.
        }
      });

    });
  });
}

function filterSchools(suggestion) {
  $.ajax({
    type: 'post',
    url: "./php/school-matches.php",
    data: {query: suggestion},
    success: function (data) {
      if (data) {
        console.log("got results");
        var vals = data.split(",");
        console.log(vals);
        var i = 1;
        $.each(vals, function(index, value) {
          var end = (i % 3 == 0);

          var schoolDiv = constructSchoolDiv(value, 0, 0, end);
          appendSchoolDiv(schoolDiv);

          //causes the hover to be triggered when the element is tapped on a touch device
          $('.hover').hover(function(){
            $(this).addClass('flip');
          },function(){
            $(this).removeClass('flip');
          });
          i++;
        });
      }
    },
    error: function (jXHR, textStatus, errorThrown) {
      console.log("No action for this query. Could not connect to processing script.");
      //make note in some type of log.
    }
  });
}

function populateSchools(suggestion="") {
  if (suggestion == lastSuggestion)
    return;

  clearDiv('school-profiles');

  //to-do: resolve discrepancies between JSON user data and SQL database.
  if (suggestion == "")
    showAllSchools();
  else {
    filterSchools(suggestion);
  }

  lastSuggestion = suggestion;
}

function validQuery(query) {
  var re = /^[a-zA-Z ]+$/;
  return re.test(query) || query == "";
}

function validKey(key) {
  return ((key >= 65 && key <= 90) || (key == 8)) || (key == 16) || (key == 32);
}

//user is "finished typing," do something
function doneTyping () {
  var query = document.getElementById("search-bar").value;
  if (validQuery(query) && validKey(key)) {
    if (query == "") {
      populateSchools();
    } else {
      populateSchools(query);
    }
  } else {
    console.log("rubbish mate");
  }
}

$(document).ready(function(){
  //populate school list on load
  populateSchools();

  //causes the hover to be triggered when the element is tapped on a touch device
  $('.hover').hover(function(){
    $(this).addClass('flip');
  },function(){
    $(this).removeClass('flip');
  });


  //setup before functions
  var typingTimer;                //timer identifier
  var doneTypingInterval = 1000;  //time in ms

  //on keyup, start the countdown
  $('#search-bar').keyup(function(e){
    clearTimeout(typingTimer);
    if ($('#search-bar').val) {
      key = e.keyCode;
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
  });

});
