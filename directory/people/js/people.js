$(document).ready(function(){
  var img = document.getElementById("img");
  var content = document.getElementById("content");
  var backer = document.getElementById("backer");
  var buttons = document.getElementById("buttons");
  var helper = document.getElementById("helper");
  var close = document.getElementById("close");


  img.addEventListener("mouseover", function() {
        helper.classList.add("active");
  })

  close.addEventListener("click", function() {
    img.classList.remove("active");
    img.classList.add("inactive");
    content.classList.remove("active");
    backer.classList.remove("active");
    buttons.classList.remove("active");
    close.classList.remove("active");

    var texts = document.querySelectorAll(".content p");

    [].forEach.call(texts, function(text) {
      text.classList.remove("active");
    });

  })

  img.addEventListener("click", function(){
    img.classList.add("active");
    img.classList.remove("inactive");
    content.classList.add("active");
    backer.classList.add("active");
    buttons.classList.add("active");
    close.classList.add("active");

    var texts = document.querySelectorAll(".content p");

    [].forEach.call(texts, function(text) {
      text.classList.add("active");
    });

  })
});
