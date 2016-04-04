<?php
  include("connection.php");

  $query = "SELECT * FROM USERS WHERE email='".mysqli_real_escape_string($link, $_POST['email'])."'";
  $result = mysqli_query($link, $query);
  $results = mysqli_num_rows($result);

  if (!$results)
    echo "good";

?>
