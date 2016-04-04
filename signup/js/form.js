function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateDate(testdate) {
  if (!!window.chrome && !!window.chrome.webstore && testdate != '')
    return true;

  var re = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
  return re.test(testdate);
}

function validateName(name){
  var re = /^[a-z ,.'-]+$/i;
  return re.test(name);
}

$(function() {
	//remove error indication when input is selected
	$('input, select, textarea').change(function(){
		$(this).css('background-color','#EBEBEB');
    $('#form-error').fadeOut();
	});
});

function textCounter( field, countfield, maxlimit ) {
  if ( field.value.length > maxlimit ) {
    field.value = field.value.substring( 0, maxlimit );
    field.blur();
    field.focus();
    return false;
  } else {
    var remaining =  maxlimit - field.value.length;
    var left = remaining == 1 ? ' character left' : ' characters left';
    countfield.value = remaining + left;
  }
}
$(function() {

  document.getElementById("short-bio").value = "";

  /*
	number of fieldsets
	*/
	var fieldsetCount = $('#formElem').children().length;

	/*
	current position of fieldset / navigation link
	*/
	var current = 1;

	/*
	sum and save the widths of each one of the fieldsets
	set the final sum as the total width of the steps element
	*/
	var stepsWidth	= 0;
    var widths 		= new Array();
	$('#steps .step').each(function(i){
        var $step 		= $(this);
		widths[i]  		= stepsWidth;
        stepsWidth	 	+= $step.width();
    });
	$('#steps').width(stepsWidth);

	/*
	to avoid problems in IE, focus the first input of the form
	*/
	$('#formElem').children(':first').find(':input:first').focus();

	/*
	show the navigation bar
	*/
	$('#navigation').show();

	/*
	when clicking on a navigation link
	the form slides to the corresponding fieldset
	*/
    $('#navigation a').bind('click',function(e){
		var $this	= $(this);
		var prev	= current;
		$this.closest('ul').find('li').removeClass('selected');
        $this.parent().addClass('selected');
		/*
		we store the position of the link
		in the current variable
		*/
		current = $this.parent().index() + 1;
		/*
		animate / slide to the next or to the corresponding
		fieldset. The order of the links in the navigation
		is the order of the fieldsets.
		Also, after sliding, we trigger the focus on the first
		input element of the new fieldset
		If we clicked on the last link (confirmation), then we validate
		all the fieldsets, otherwise we validate the previous one
		before the form slided
		*/
        $('#steps').stop().animate({
            marginLeft: '-' + widths[current-1] + 'px'
        },500,function(){
			if(current == fieldsetCount)
				validateSteps();
			else
				validateStep(prev);
			$('#formElem').children(':nth-child('+ parseInt(current) +')').find(':input:first').focus();
		});
        e.preventDefault();
    });

	/*
	clicking on the tab (on the last input of each fieldset), makes the form
	slide to the next step
	*/
	$('#formElem > fieldset').each(function(){
		var $fieldset = $(this);
		$fieldset.children(':last').find(':input').keydown(function(e){
			if (e.which == 9){
				$('#navigation li:nth-child(' + (parseInt(current)+1) + ') a').click();
				/* force the blur for validation */
				$(this).blur();
				e.preventDefault();
			}
		});
	});

	/*
	validates errors on all the fieldsets
	records if the Form has errors in $('#formElem').data()
	*/
	function validateSteps(){
		var FormErrors = false;
		for(var i = 1; i < fieldsetCount; ++i){
			var error = validateStep(i);
			if(error == -1)
				FormErrors = true;
		}
		$('#formElem').data('errors',FormErrors);
	}

	/*
	validates one fieldset
	and returns -1 if errors found, or 1 if not
	*/
	function validateStep(step){

		var fieldCount = $("#formElem").children(':nth-child('+ parseInt(step) +')').children().length;

		if(step == fieldsetCount) return;

		var error = 1;
		var hasError = false;

		var count = 0;

		$('#formElem').children(':nth-child('+ parseInt(step) +')').find(':input:not(button)').each(function(){
			var $this = $(this);
			var thisValue = jQuery.trim($this.val());
			var valueLength = thisValue.length;

			if (count == 0) {
				valueLength = '1';
			} else if (fieldCount == 6){
          if (count == 3) {
  				  valueLength = validateEmail(thisValue) ? '1' : '';

            if (valueLength == '1') {
              //check that email has not already been registered
              $.ajax({
                type: 'post',
                url: "./php/check-email.php",
                data: {email: thisValue},
                success: function (data) {
                  console.log(data)
                  if (data != "good") {
                    valueLength = '';
                    //might have to manually change background-color
                    document.getElementById("email").value = "";
                    document.getElementById("email").placeholder = "Email already registered";
                  }
                },
                error: function (jXHR, textStatus, errorThrown) {
                  valueLength = '';
                  //might have to manually change background-color
                  document.getElementById("email").value = "";
                  document.getElementById("email").placeholder = "Unable to verify email: try again please";
                }
              });

            }

          }
          else if (count == 4) {
            if (validateDate(thisValue))
              valueLength = '1';
            else {
              $(this).attr("placeholder", "Use mm/dd/yyyy format");
              document.getElementById("date-of-birth").value = "";
              valueLength = '';
            }
          } else if (count == 1 || count == 2) {
            valueLength = validateName(thisValue) ? '1' : '';
          }
			}

			if(valueLength == ''){
				hasError = true;
				$this.css('background-color','#FFEDEF');
			}
			count++;
		});

		var $link = $('#navigation li:nth-child(' + parseInt(step) + ') a');
		$link.parent().find('.error,.checked').remove();

		var valclass = 'checked';
		if(hasError){
			error = -1;
			valclass = 'error';
		}
		$('<span class="'+valclass+'"></span>').insertAfter($link);

		return error;
	}

	/*
	if there are errors don't allow the user to submit
	*/
  $('#registerButton').bind('click',function(){
    if($('#formElem').data('errors')){
			$("#form-error").fadeIn();
			return false;
		}
	});

  $('form').on('submit', function (e) {

    e.preventDefault();

    var formData = new FormData($(this)[0]);

    $.ajax({
      type: 'post',
      url: "./php/signup.php",
      data: formData,
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        if (data == "") {
          console.log("Everything is nice");
          //display thank you gif
          $('#signup-form').hide(); //something more fancy obvs
          document.getElementById('infographics').style.width = "100vw";
          //rearrange screen to show infographics
          /*will throw non-fatal uncaught exception if page
    			is not oppened from homepage as fancybox*/
          /*parent.$.fancybox.close();*/
        } else {
          //To Do: Go into more detail about problem. Highlight error spots.
          alert("Unable to sign you up. Please try again.");
        }
      },
      error: function (jXHR, textStatus, errorThrown) {
        alert("Unable to sign you up. Please try again.");
      }
    });
  });

});
