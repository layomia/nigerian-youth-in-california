<?php
  $json = file_get_contents("../../directory/json/users.json");
  $data = json_decode($json);
  $data[] = $_POST['jsonData'];
  if (file_put_contents("../../directory/json/users.json", json_encode($data)))
    $status = "good";
  else
    $status = "bad";
  echo $status;
?>
