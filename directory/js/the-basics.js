var xhReq = new XMLHttpRequest();
xhReq.open("GET", './directory/json/users.json', false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);

//To-do: Condense the following two functions:
function getUsers() {
  var temp = [];

  for (var i = 0; i < jsonObject.length; i++)
    temp.push(jsonObject[i].firstName + " " + jsonObject[i].lastName);

  return temp;
};

function getSchools() {
  var temp = [];

  for (var i = 0; i < jsonObject.length; i++) {
    var value = jsonObject[i].schoolChoice;
    if (!(temp.indexOf(value) > -1))
      temp.push(value);
  }

  return temp;
};

var tempUsers = getUsers();
var tempSchools = getSchools();

console.log(tempSchools);

var users = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
  queryTokenizer: Bloodhound.tokenizers.whitespace,
  local: tempUsers
});

var schools = new Bloodhound({
  datumTokenizer: Bloodhound.tokenizers.whitespace,
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
    header: '<h3 class="league-name">People</h3>'
  }
},
{
  name: 'schools',
  source: schools,
  templates: {
    header: '<h3 class="league-name">Schools</h3>'
  }
});
