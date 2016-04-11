<?php
  $json = file_get_contents("../../directory/json/users.json");
  $json = rtrim($json);

  if ($json == "") {
    $json .= "[";
  } else {
    $json = strstr($json, "]", true);
  }

  if ($json != "[") {
    $json .= ", ";
  }

  $json .= $_POST['jsonData'] . "]";

  file_put_contents("../../directory/json/users.json", $json);

  echo "good";
?>
