$(document).ready(function(){
  var img, content, backer, buttons, helper, close;
  var imgID = "img", contentID = "content", backerID = "backer", buttonsID = "buttons", helperID = "helper", closeID = "close", nameHolderID = "name-holder";

  $(".close").click(function(){
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
