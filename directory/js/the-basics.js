var xhReq = new XMLHttpRequest();
xhReq.open("GET", './directory/json/users.json', false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

//To-do: Condense the following two functions:
function getUsers() {
  var temp = [];

  for (var i = 0; i < jsonObject.length; i++) {
    //temp.push(jsonObject[i].firstName + " " + jsonObject[i].lastName);
    var userName = jsonObject[i].firstName + " " + jsonObject[i].lastName;
    temp.push({
      name: userName,
      link: "./directory/person/index.php?person=" + jsonObject[i].id, //this should be the id.
      //restructure JSON to include ID. Start from add-user.php
      school: jsonObject[i].schoolChoice
    });
  }

  return temp;
};

function getSchools() {
  var temp = [];
  var tempSch = [];

  for (var i = 0; i < jsonObject.length; i++) {
    var school = jsonObject[i].schoolChoice;

    if (!(tempSch.indexOf(school) > -1)){
      tempSch.push(school);
      var value = {
        school: school,
        link: "./directory/people/index.php?school=" + school
      };
      temp.push(value);
    }
  }

  return temp;
};

var tempUsers = getUsers();
var tempSchools = getSchools();

var users = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: tempUsers
});

var schools = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.obj.whitespace('school'),
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: tempSchools
});

$('#multiple-datasets .typeahead').typeahead({
  highlight: true
},
{
  name: 'users',
  source: users,
  display: 'name',
  templates: {
    header: '<h3 class="league-name">People</h3>',
    suggestion: function (data) {
        return '<p><a href="' + data.link + '" class="fancybox fancybox.iframe"><strong>' + data.name + '</strong>, ' +  data.school  + '</a></p>';
    },
    empty: '<h3 class="league-name" style="text-align:left; margin-left: 20px;">No user matches</h3>'
  }
},
{
  name: 'schools',
  source: schools,
  display:'school',
  templates: {
    header: '<h3 class="league-name">Schools</h3>',
    suggestion: function (data) {
        return '<p><a href="' + data.link + '"><strong>' + data.school + '</strong></a></p>';
    },
    empty: '<h3 class="league-name" style="text-align:left; margin-left: 20px;">No school matches</h3>'
  }
});

$(document).ready(function() {
  $("a.overlay-flash").fancybox({
    'padding': 0,
    'zoomOpacity': true,
    'zoomSpeedIn': 500,
    'zoomSpeedOut': 500,
    'overlayOpacity': 0.75,
    'frameWidth': 530,
    'frameHeight': 400,
    'hideOnContentClick': false
  });
});

function callFancyBox(my_href) {
  var j1 = document.getElementById("hiddenclicker");
  j1.href = my_href;
  $('#hiddenclicker').trigger('click');
}

$(document).ready(function() {
  $('#multiple-datasets .typeahead').on('typeahead:selected', function (e, datum) {
    if (datum.hasOwnProperty("name"))
      callFancyBox(datum.link);
    else
      window.location.href = datum.link;
  });
});
