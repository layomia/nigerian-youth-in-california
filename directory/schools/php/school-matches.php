<?php
include("connection.php");

$schools = "";

$suggestion = trim($_POST['query']);

$query = "SELECT DISTINCT school FROM USERS WHERE school LIKE '%{$suggestion}%'";
$result = mysqli_query($link, $query);
$results = mysqli_num_rows($result);

if ($results) {
  while($row = $result->fetch_assoc()) {
    $schools .= $row['school'] . ', ';
  }

  $schools = rtrim($schools);
  $schools = rtrim($schools, ",");

  echo $schools . ".";
}
?>
