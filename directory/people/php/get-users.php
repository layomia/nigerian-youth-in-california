<?php
  include("connection.php");

  $suggestion = trim($_POST['suggestion']);
  $query;

  $schools = [];

  //add everything needed by profiles in query
  if ($_POST['school'] != '') {
    if ($_POST['suggestion'] != '') {
      $query = "SELECT id, first_name, last_name, email, school FROM USERS WHERE
      school='".mysqli_real_escape_string($link, $_POST['school'])."'
      AND CONCAT (first_name, ' ', last_name) LIKE '%{$suggestion}%'";
    } else {
      $query = "SELECT id, first_name, last_name, email, school FROM USERS WHERE
      school='".mysqli_real_escape_string($link, $_POST['school'])."'";
    }
  } else {
    if ($_POST['suggestion'] != '') {
      $query = "SELECT id, first_name, last_name, email, school FROM USERS WHERE
      CONCAT (first_name, ' ', last_name) LIKE '%{$suggestion}%'";
    } else {
      $query = "SELECT id, first_name, last_name, email, school FROM USERS";
    }
  }

  $result = mysqli_query($link, $query);
  $results = mysqli_num_rows($result);

  if ($results) {
    while($row = $result->fetch_assoc()) {
      $schools[$row['id']] = $row;
    }
  }

  echo (json_encode($schools));
?>
