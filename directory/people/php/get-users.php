<?php
  include("connection.php");

  $suggestion = trim($_POST['suggestion']);
  $query;

  $schools = [];

  if ($_POST['school'] != '') {
    if ($_POST['suggestion'] != '') {
      $query = "SELECT first_name, last_name, id, picture_url, school FROM USERS WHERE
      school='".mysqli_real_escape_string($link, $_POST['school'])."'
      AND CONCAT (first_name, ' ', last_name) LIKE '%{$suggestion}%'
      ORDER BY CONCAT (first_name, ' ', last_name) ASC";
    } else {
      $query = "SELECT first_name, last_name, id, picture_url, school FROM USERS WHERE
      school='".mysqli_real_escape_string($link, $_POST['school'])."'
      ORDER BY CONCAT (first_name, ' ', last_name) ASC";
    }
  } else {
    if ($_POST['suggestion'] != '') {
      $query = "SELECT first_name, last_name, id, picture_url, school FROM USERS WHERE
      CONCAT (first_name, ' ', last_name) LIKE '%{$suggestion}%'
      ORDER BY CONCAT (first_name, ' ', last_name) ASC";
    } else {
      $query = "SELECT first_name, last_name, id, picture_url, school FROM USERS
      ORDER BY CONCAT (first_name, ' ', last_name) ASC";
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
