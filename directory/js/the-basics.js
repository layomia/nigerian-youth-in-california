var xhReq = new XMLHttpRequest();
xhReq.open("GET", './directory/json/users.json', false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

//To-do: Condense the following two functions:
function getUsers() {
  var temp = [];

  for (var i = 0; i < jsonObject.length; i++) {
    //temp.push(jsonObject[i].firstName + " " + jsonObject[i].lastName);
    temp.push({
      name: jsonObject[i].firstName + " " + jsonObject[i].lastName,
      link: "http://www.google.com",
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
console.log(tempSchools);

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
  templates: {
    header: '<h3 class="league-name">People</h3>',
    suggestion: function (data) {
        return '<a href="' + data.link + '"><p><strong>' + data.name + '</strong>, ' +  data.school  + '</p></a>';
    }
  }
},
{
  name: 'schools',
  source: schools,
  templates: {
    header: '<h3 class="league-name">Schools</h3>',
    suggestion: function (data) {
        return '<a href="' + data.link + '"><p><strong>' + data.school + '</strong></p></a>';
    }
  }
});

$(document).ready(function(){
  window.onunload=pageleave;

  function pageleave() {
    $('#multiple-datasets').val = "";
  }
});
