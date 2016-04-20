function updateUserInfo (userInfo) {
  //set image
  var imageID = "image";
  var image_url = "../../signup/" + userInfo.picture_url.substr(3);
  document.getElementById(imageID).style.backgroundImage = "url(" + image_url +  ")";
  document.getElementById(imageID).style.backgroundSize = 'cover';
  document.getElementById(imageID).style.backgroundRepeat = 'no-repeat';

  //set bio
  var bioID= "user-bio";
  document.getElementById(bioID).innerHTML = userInfo.bio;

  //set splash name
  document.getElementById('user-name').innerHTML = userInfo.first_name + ' ' + userInfo.last_name;
}

$(document).ready(function(){
  var user = parseInt(document.getElementById('user-flag').innerHTML);

  $.ajax({
    type: 'post',
    url: "./php/get-user.php",
    data: {user: user},
    success: function (data) {
      if (data) {
        userInfo = JSON.parse(data);
        console.log(userInfo);
        updateUserInfo(userInfo);
      }
    },
    error: function (jXHR, textStatus, errorThrown) {
      console.log("No info for this user. Could not connect to processing script.");
      //make note in some type of log.
    }
  });
});
