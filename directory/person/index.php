<!doctype html>
<html>
  <head>

    <link rel="stylesheet" href="./css/person.css">
    <link rel="stylesheet" href="../../general.css">

    <script type="text/javascript" src="//code.jquery.com/jquery-latest.min.js"></script>
    <script type="text/javascript" src="./js/person.js"></script>

  </head>
  <body>
    
    <div id="image">
    </div>

    <div id="bio">
      <p id="user-flag" style="display:none;"><?php echo $_GET['person']?></p>


      <div id="name-box">
        <h1 id="user-name"></h1>
      </div>

      <div id="bio-box">
        <p id="user-bio"></p>
      </div>

    </div>

  </body>
</html>
