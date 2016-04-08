<?php
  include("connection.php");

  $query = "SELECT * FROM USERS WHERE school='".mysqli_real_escape_string($link, $_POST['school'])."'";
  $result = mysqli_query($link, $query);
  $results = mysqli_num_rows($result);

  if ($results) {
    $maleCount = 0;
    $femaleCount = 0;
    while($row = $result->fetch_assoc()) {
      if ($row["gender"] == "Male")
        $maleCount++;
      else
        $femaleCount++;
    }
    echo $maleCount . "," . $femaleCount;
  }
?>
