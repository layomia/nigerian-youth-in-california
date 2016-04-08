function clearDiv(divToClear) {
  var myNode = document.getElementById(divToClear);
  while (myNode.firstChild)
    myNode.removeChild(myNode.firstChild);
}


function constructSchoolDiv(school, maleCount, femaleCount, end){

  var divClass = "col_third" + ( (end) ? " end" : "" );
  var divString = '<div class="' + divClass +'">'
  divString += '<div class="hover pane"><div class="front"><div class="box1"><p>'
  divString += school + '</p></div></div>'
  divString += '<div class="back"><div class="box2"><p>Male:   ';
  divString += maleCount + '</p><p>Female: ';
  divString += femaleCount + '</p></div></div></div></div>';

  //console.log(divString);

  return divString;
}

function appendSchoolDiv(schoolDiv) {
  var schoolList = document.getElementById('school-profiles');
  schoolList.insertAdjacentHTML('beforeend', schoolDiv);
  //$('#school-profiles').append(schoolDiv);//.trigger('pagecreate');
}

function populateSchools() {

  clearDiv('school-profiles');

  $.getJSON("./assets/jsondata/schools.json", function(data){
    var vals = [];
    vals = data.california.split(",");
    var i = 1;

    $.each(vals, function(index, value) {
      $.ajax({
        type: 'post',
        url: "./directory/php/school-info.php",
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

function loadInformation(index) {
  console.log("i was called for slide " + index);
  //typeof(index) is a number on first call. Why?
  switch (index) {
    case 0:
      populateSchools();
      break;
    case "0":
      populateSchools();
      break;
    default:
      ;
  }
}

$(document).ready(function(){
  //populate school list on load
  loadInformation(0);

  //causes the hover to be triggered when the element is tapped on a touch device
  $('.hover').hover(function(){
    $(this).addClass('flip');
  },function(){
    $(this).removeClass('flip');
  });
});
