<!DOCTYPE html>
<html >
  <head>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initital-scale=1" />

    <title>Nigerian Youth in California</title>
    <link rel="stylesheet" href="../general.css">
    <link rel="stylesheet" href="./css/signup.css">
    <link rel="stylesheet" href="./css/form.css">
    <link rel="stylesheet" href="./css/image-upload.css">

		<!--<script type="text/javascript" src="//code.jquery.com/jquery-latest.min.js"></script>-->
    <script type="text/javascript" src="../jquery.js"></script>
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="./js/signup.js"></script>
    <script type="text/javascript" src="./js/form.js"></script>
    <script src="./js/prefixfree.min.js"></script>

  </head>

  <body>

      <!--<div id="infographics">
      </div>-->

      <div id="signup-form">

        <div id="wrapper">
        	<div id="steps">
        		<form id="formElem" name="formElem" method="post" enctype="multipart/form-data">
        			<fieldset class="step">
                <div class="container">
                  <div class="image-uploader" data-base-height="180" data-base-width="180">
                    <div class="image">
                      <label style="margin-left:1.5em; margin-top:4.7em;">Click or drag a file to upload an image</label>
                      <img/>
                    </div>
                    <input id="uploader" name="uploader" type="file" />
                    <div class="zoom" style="display:none;">
                      <div class="plus"></div>
                      <div class="minus"></div>
                      <div class="close"></div>
                    </div>
                  </div>

                </div>
                <p>
        					<label for="first-name">First Name *</label>
        					<input id="first-name" name="first-name"/>
        				</p>
                <p>
        					<label for="last-name">Last Name *</label>
        					<input id="last-name" name="last-name" />
        				</p>
        				<p>
        					<label for="email">Email *</label>
        					<input id="email" name="email" type="email" />
        				</p>
        				<p>
        					<label for="date-of-birth">Date of Birth *</label>
        					<input id="date-of-birth" name="date-of-birth" type="date" placeholder="mm/dd/yyyy"/>
        				</p>
                <p>
        					<label for="gender">Gender *</label>
                  <select name="gender" id="gender" style="border: none;">
                    <option value="" disabled selected>Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </p>
        			</fieldset>

        			<fieldset class="step">
                <p>
        					<label for="short-bio">Bio</label>
                  <textarea maxlength="150" name="short-bio" id="short-bio" placeholder="Enter a short description..." onblur="textCounter(this,this.form.counter,150);" onkeyup="textCounter(this,this.form.counter,150);">
                  </textarea>
                </p>

                <p id="counter" style="margin-top:0; padding-top:0">
                  <label for="counter">.</label>
                  <input onblur="textCounter(this.form.recipients,this,150);" disabled onfocus="this.blur();" tabindex="999" maxlength="3" size="3" value="150 characters left" name="counter" style="border: none; font-size: 8pt">
                </p>

                <p>
                  <label for="school-choice">School *</label>
                  <select name="school-choice" id="school-choice">
                    <option value="" disabled selected>Select</option>
                  </select>
                </p>
                <p>
                  <label for="major-choice">Major *</label>
                  <select name="major-choice" id="major-choice">
                    <option value="" disabled selected>Select</option>
                  </select>
                </p>
                <p>
                  <label for="current-year">Current Year *</label>
                  <select name="current-year" id="current-year">
                    <option value="" disabled selected>Select</option>
                    <option value="first">First</option>
                    <option value="second">Second</option>
                    <option value="third">Third</option>
                    <option value="fourth">Fourth</option>
                    <option value="fifth or higher">Fifth or higher</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                </p>
                <p>
                  <label for="tribe-choice">Tribe *</label>
                  <select name="tribe-choice" id="tribe-choice">
                    <option value="" disabled selected>Select</option>
                  </select>
                </p>
                <p>
                  <label for="state-residence-choice">State of Residence *</label>
                  <select name="state-residence-choice" id="state-residence-choice">
                    <option value="" disabled selected>Select</option>
                  </select>
                </p>
                <p>
                  <label for="state-origin-choice">State of Origin *</label>
                  <select name="state-origin-choice" id="state-origin-choice">                      '
                    <option value="" disabled selected>Select</option>
                  </select>
                </p>

        			</fieldset>

              <fieldset class="step" id="confirmation-slide">

  							<p style="margin-top: 12em; width: 90vw; padding: 20px 10px; margin-left: 20px">
                  By completing this form and hitting submit, you are expressing
                  consent to have your information shared with others in our community.
                </p>

                <p style="display:none;">
                  <input type="checkbox" name="share-permission" id="share-permission" style="width: 1em; height = 1em;"/>
                  I allow the Nigerian Youth in
                  California to share my information with other members.
                </p>

                <p id="form-error" style="width: 90vw; padding: 20px 10px; margin-left: 20px">
                  Your form is not complete. Please review errors.
                </p>

                <p class="submit">
                  <button id="registerButton" name="submit" type="submit">Submit</button>
                </p>

              </fieldset>

        		</form>

          </div>

          <div id="navigation" style="display:none;">
        		<ul>
        			<li class="selected">
        				<a href="#">
                  <img src="./images/personal-details.png" style="width:35px;height:35px;"/>
                </a>
        			</li>
        			<li>
        				<a href="#">
                  <img src="./images/school.png" />
                </a>
        			</li>
              <li>
                <a href="#">
                  <img src="./images/confirm.png" />
                </a>
              </li>
        		</ul>
        	</div>

        </div>

      </div>

      <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
      <script src='http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'></script>
      <script type="text/javascript" src="./js/image-upload.js"></script>

  </body>

</html>
