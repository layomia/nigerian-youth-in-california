var i = 0;

function goToByScroll(id){
    if($(id).is(':visible')) {
        $('html,body').stop();
        $('html,body').animate({scrollTop: $(id).offset().top}, 400);
        i = 0;
    }
}

$(document).ready(function(){

  $(window).bind('scrollstop', function(){
    console.log("wassap?");
    var windowHeight = $(window).height();
    i++;
    var div = '';
    var scrollTop = parseInt($(this).scrollTop());
    var windowHeight_1 = (windowHeight * 1) - (windowHeight/2);
    var windowHeight_2 = (windowHeight * 2) - (windowHeight/2);

    if(0 < scrollTop &&  scrollTop < windowHeight_1) {
      div = '#intro';
    } else if(windowHeight_1 < scrollTop && scrollTop < windowHeight_2) {
      div = '#about';
    }
    if(i%2 == 0) {
      goToByScroll(div);
    }
  });

  $(".home-link").click(function(){
      $("#about").hide();
  });

  $(".about-link").click(function(){
    $("#about").fadeIn();
  });

});
