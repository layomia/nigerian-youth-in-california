<!DOCTYPE html>
<html >
  <head>

    <title>Nigerian Youth in California</title>

    <link rel="stylesheet" href="../../css/search-style.css">

    <link rel="stylesheet" href="../../../css/style.css">
    <link rel="stylesheet" href="../../../general.css">
    <link rel="stylesheet" href="../../../Fancybox/jquery.fancybox.css?v=2.1.5" type="text/css" media="screen" />


    <meta charset="utf-8" />
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initital-scale=1" />

		<!--<script type="text/javascript" src="//code.jquery.com/jquery-latest.min.js"></script>-->
    <script type="text/javascript" src="../../../jquery.js"></script>
    <script type="text/javascript" src="../../../Fancybox/jquery.fancybox.js?v=2.1.5"></script>
    <script type="text/javascript" src="../../../js/fancyscript.js"></script>
    <script type="text/javascript" src="./js/school-page.js"></script>

  </head>

  <body>
    <p id="school-name" style="display: none;"><?php echo $_GET['school']; ?></p>

    <!--might replace with menu icon and functionality-->
    <div id="nav">
      <ul>
        <a href="..">Back to Schools</a>
      </ul>
    </div>

    <div id="directory">

      <div id="splash">
        <h1>+People</h1>
      </div>

      <div id="search-div">
        <input id="search-bar" type="text" placeholder="Search for people in <?php echo $_GET['school'];?>">
      </div>


    <div class="contain">
      <div class="wrapper" id="school-profiles">
      </div>
    </div>

    </div>

  </body>

</html>
