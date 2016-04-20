<?php
  include("connection.php");

  $user = $_POST['user'];
  $query = "SELECT * FROM USERS WHERE id=$user LIMIT 1";

  $schools = [];

  $result = mysqli_query($link, $query);
  $results = mysqli_num_rows($result);

  if ($results) {
    //echo "got results";
    $schools = $result->fetch_assoc();
  }

  echo (json_encode($schools));
?>
