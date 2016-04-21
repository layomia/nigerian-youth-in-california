var key;
var school = "";
var lastSuggestion = ".";

function clearDiv(divToClear) {
  var myNode = document.getElementById(divToClear);
  while (myNode.firstChild)
    myNode.removeChild(myNode.firstChild);
}

function constructPersonDiv(user, index){
  var userName = user.first_name + " " + user.last_name;

  var divString = "<div class='background'><div class='main'><p style='display:none;'>" + index;
  divString += "</p><div class='img inactive' id='img" + index + "'><div class='overlay'><p>";
  divString += userName + "</p></div></div>";
  divString += "<div class='name-holder' id='name-holder" + index + "'<h2 id='name" + index + "' style='font-size:18pt;'>" + userName + "</h2></div>";
  divString += "<div class='close' id='close" + index + "'>X</div>";
  divString += "<div class='content' id='content" + index + "'><p class='d1'>" + userName +"</p>";
  divString += "<p class='d2'>" + user.school + "</p><p class='d3'><a href='../person/index.php?person=";
  divString += user.id + "' class='fancybox fancybox.iframe'>View Profile</a></p><div class='buttons' id='buttons";
  divString += index + "'><!--social media stuff--></div>" + "<div class='backer' id='backer" + index;
  divString += "'></div></div></div></div>";

  return divString;
}

function appendPersonDiv(personDiv) {
  var peopleList = document.getElementById('people-profiles');
  peopleList.insertAdjacentHTML('beforeend', personDiv);
}


function populatePeople(school, suggestion) {
  if (suggestion == lastSuggestion)
    return;

  clearDiv('people-profiles');

  var img, content, backer, buttons, helper, close;
  var imgID = "img", contentID = "content", backerID = "backer", buttonsID = "buttons", helperID = "helper", closeID = "close", nameHolderID = "name-holder";

  $.ajax({
    type: 'post',
    url: "./php/get-users.php",
    data: {school: school, suggestion: suggestion},
    success: function (data) {
      if (data) {
        console.log(data);
        var users = JSON.parse(data);
        console.log(users);
        var num = 0;
        $.each(users, function(index, value) {
          var personDiv = constructPersonDiv(value, num);
          appendPersonDiv(personDiv);

          //discard ugly default images?
          var image_url = "../../signup/" + value.picture_url.substr(3);

          document.getElementById(imgID + num).style.background = 'url("' + image_url + '") 55% center';
          document.getElementById(imgID + num).style.backgroundSize = 'cover';
          document.getElementById(imgID + num).style.backgroundRepeat = 'no-repeat';

          num++;

          $(".close").click(function() {

            var profileID = $(this).parent().find("p").andSelf().filter("p:first").first().text();

            img = document.getElementById(imgID + profileID);
            content = document.getElementById(contentID + profileID);
            backer = document.getElementById(backerID + profileID);
            buttons = document.getElementById(buttonsID + profileID);
            helper = document.getElementById(helperID + profileID);
            close = document.getElementById(closeID + profileID);


            img.classList.remove("active");
            img.classList.add("inactive");
            content.classList.remove("active");
            backer.classList.remove("active");
            buttons.classList.remove("active");
            close.classList.remove("active");

            var texts = this.parentElement.querySelectorAll(".content p");

            [].forEach.call(texts, function(text) {
              text.classList.remove("active");
            });

            document.getElementById(nameHolderID + profileID).style.display = "block";

          });

          $(".overlay").click(function(){

            var profileID = $(this).parent().parent().find("p").andSelf().filter("p:first").first().text();

            document.getElementById(nameHolderID + profileID).style.display = "none";

            img = document.getElementById(imgID + profileID);
            content = document.getElementById(contentID + profileID);
            backer = document.getElementById(backerID + profileID);
            buttons = document.getElementById(buttonsID + profileID);
            helper = document.getElementById(helperID + profileID);
            close = document.getElementById(closeID + profileID);

            img.classList.add("active");
            img.classList.remove("inactive");
            content.classList.add("active");
            backer.classList.add("active");
            buttons.classList.add("active");
            close.classList.add("active");

            //this.parentElement.
            var texts = this.parentElement.parentElement.querySelectorAll(".content p");

            [].forEach.call(texts, function(text) {
              text.classList.add("active");
            });

          });

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
  var query = document.getElementById("search-bar").value;
  if (validQuery(query) && validKey(key)) {
    if (query == "") {
      populatePeople(school, "");
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
  populatePeople(school, "");

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
