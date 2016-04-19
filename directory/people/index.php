<?php
  $currentSchool = "";
  if ($_GET['school'])
    $currentSchool = " in " . $_GET['school'];
?>

<!DOCTYPE html>
<html >
  <head>

    <title>Nigerian Youth in California</title>

    <link rel="stylesheet" href="./css/profile.css">

    <link rel="stylesheet" href="../css/search-style.css">

    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../general.css">
    <link rel="stylesheet" href="../../Fancybox/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />


    <meta charset="utf-8" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initital-scale=1" />

		<!--<script type="text/javascript" src="//code.jquery.com/jquery-latest.min.js"></script>-->
    <script type="text/javascript" src="../../jquery.js"></script>
    <script type="text/javascript" src="../../Fancybox/jquery.fancybox.js?v=2.1.5"></script>
    <script type="text/javascript" src="../../js/fancyscript.js"></script>
    <script type="text/javascript" src="./js/school-page.js"></script>
    <script type="text/javascript" src="./js/people.js"></script>

  </head>

  <body>

    <!--might replace with menu icon and functionality-->
    <div id="nav">
      <ul>
        <a href="../schools/">Search by schools</a>
      </ul>
    </div>

    <div id="directory">

      <div id="splash">
        <h1>+ People</h1>
      </div>

      <div id="search-div">
        <input id="search-bar" type="text" placeholder="Search for people<?php echo $currentSchool;?>">
      </div>


    <div class="contain">
      <div class="wrapper" id="people-profiles">

        <div class='background'>
          <div class='main'>
            <p style="display:none;">0</p>
            <div class='img inactive' id='img0'>
              <div class='overlay'><p>Oluwalayomi Akinrinade</p></div>
            </div>
            <div class='close' id='close0'>
              X
            </div>
            <div class='content' id='content0'>
              <p class='d1'>Scott Hutcheson</p>
              <p class='d2'>Product Designer</p>
              <p class='d3'><a href="#">View Profile</a></p>
              <div class='buttons' id='buttons0'>
                <!--<a href='https://github.com/smhutch' target='_blank'>
                  <img src='https://packagecontrol.io/readmes/img/a59a44b1a383ad42e195fa34f0ad2756f46c77a2.png'>
                </a>
                <a href='https://twitter.com/SMHutcheson' target='_blank'>
                  <img src='http://www.coinfestuk.org/img/twit.png'>
                </a>-->
              </div>
              <div class='backer' id='backer0'></div>
            </div>
          </div>
        </div>

      </div>
    </div>

    </div>

    <p id="school-name" style="display: none;"><?php echo $_GET['school']; ?></p>

  </body>

</html>
