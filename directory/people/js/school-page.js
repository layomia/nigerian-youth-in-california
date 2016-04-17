var key;
var school = "";
var lastSuggestion = ".";

function clearDiv(divToClear) {
  var myNode = document.getElementById(divToClear);
  while (myNode.firstChild)
    myNode.removeChild(myNode.firstChild);
}

//to-do remove maleCount and femaleCount info, add id to each div to make clickable
function constructPersonDiv(name){
  //make sure that you send the users ID not name to the profile pop up.
  var divString = '<p><a href="../person/index.php?person=' +  name + '" class="fancybox fancybox.iframe">' + name +'</a></p>';
  return divString;
}

function appendPersonDiv(personDiv) {
  var peopleList = document.getElementById('people-profiles');
  peopleList.insertAdjacentHTML('beforeend', personDiv);
}


function populatePeople(school="", suggestion="") {
  if (suggestion == lastSuggestion)
    return;

  clearDiv('people-profiles');

  $.ajax({
    type: 'post',
    url: "./php/get-users.php",
    data: {school: school, suggestion: suggestion},
    success: function (data) {
      if (data) {
        var users = JSON.parse(data);

        $.each(users, function(index, value) {

          var user = value.first_name + ' ' + value.last_name;
          var personDiv = constructPersonDiv(user);
          appendPersonDiv(personDiv);


        });
      }
    },
    error: function (jXHR, textStatus, errorThrown) {
      console.log("No action for this query. Could not connect to processing script.");
      //make note in some type of log.
    }
  });

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
  console.log("done typing, school is " + school);
  var query = document.getElementById("search-bar").value;
  if (validQuery(query) && validKey(key)) {
    if (query == "") {
      populatePeople(school);
    } else {
      populatePeople(school, query);
    }
  } else {
    console.log("rubbish mate");
  }
}


$(document).ready(function(){
  school = document.getElementById('school-name').innerHTML;

  //populate school list on load
  populatePeople(school);

  //setup before functions
  var typingTimer;                //timer identifier
  var doneTypingInterval = 500;  //time in ms

  //on keyup, start the countdown
  $('#search-bar').keyup(function(e){
    clearTimeout(typingTimer);
    if ($('#search-bar').val) {
      key = e.keyCode;
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
  });

});
