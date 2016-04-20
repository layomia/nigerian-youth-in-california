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
    }
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
    }
  }
});
