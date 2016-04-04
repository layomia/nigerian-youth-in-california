Zepto(function($){
  scaleCarousel();
  mvCarousel(0);

  $(".arrow").on("mousedown",function(){
      var dir;
      if($(this).attr("id") == "arrL"){ dir = -1; }
      if($(this).attr("id") == "arrR"){ dir = 1; }

      var current = parseInt($("nav").attr("data-activepanel"));
      mvCarousel(current+dir);

   });

  $("nav > span").on("mousedown",function(){
      var index = $(this).attr("data-panel");
      mvCarousel(index);
      loadInformation(index);
  });
})

function scaleCarousel(){
  // Sets panel.width to page.width
  var cWidth = document.body.clientWidth;
  var paddOffset = parseInt($(".contain").css("padding-left"));
  $("#carousel .panel").css("width",cWidth-paddOffset*2);

  //positions carousel so panel stays on screen
	var order = $("article[data-panel=\'"+$("nav").attr("data-activepanel")+"\']").attr("data-panel");
	$("#carousel").css("left",(cWidth-paddOffset*2)*order*-1);
}

function mvCarousel(index){
	if(index == -1){ index = $("#carousel article").length-1 }
	if(index == $("#carousel article").length){ index = 0 }

	var cWidth = document.body.clientWidth;
	var paddOffset = parseInt($(".contain").css("padding-left"));

	$("#carousel").css("left",(cWidth-paddOffset*2)*index*-1);

	$("nav").attr("data-activepanel",index);
}

// zepto.debouncedresize.js
// custom handler fires when you stop resizing browser
(function($,dr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // Add Zepto method debounceResize
  Zepto.fn[dr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(dr); };

})(Zepto,'debounceResize');

/*$(window).debounceResize(function(){
	$("#carousel").addClass("animate");
});*/

$(window).resize(function(){
	scaleCarousel();
	$("#carousel").removeClass("animate");
});
