<?php

  session_start();

  //hidden for security
  $link = mysqli_connect(, , ,);

  $imageError = "";
  $share = $_POST["share-permission"] ? true : false;
  $target_file = "";

  //upload and process image
  if ($_FILES["uploader"]["error"] == 0) {
    $target_dir = "../userImages/";

    $type = pathinfo($_FILES["uploader"]["name"],PATHINFO_EXTENSION);
    $tempEmail = $_POST["email"];
    $strippedEmail = str_replace("@","", $tempEmail);
    $strippedEmail = str_replace(".","", $strippedEmail);

    $target_file = $target_dir . $strippedEmail . "." . $type;

    $uploadOk = 1;
    $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

    // Check if file already exists
    if (file_exists($target_file)) {
      $imageError .= "Sorry, file already exists.";
      $uploadOk = 0;
    }
    // Check file size
    if ($_FILES["uploader"]["size"] > 500000) {
      $imageError .= "Sorry, your file is too large.";
      $uploadOk = 0;
    }
    //Allow certain file formats
    if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
    && $imageFileType != "gif" ) {
      $imageError .= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
      $uploadOk = 0;
    }
    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
      $imageError .= "Sorry, your file was not uploaded.";
    // if everything is ok, try to upload file
    } else {
      if (!(move_uploaded_file($_FILES["uploader"]["tmp_name"], $target_file))) {
        $imageError .= "Sorry, there was an error uploading your file.";
      }
    }
  } else if ($_FILES["uploader"]["error"] == 4) {
    if ($_POST["gender"] == "Male")
      $target_file = "../userImages/default_male.png";
    else if ($_POST["gender"] == "Female")
      $target_file = "../userImages/default_female.png";
  } else {
    $imageError .= "Error with file upload";
  }

  //insert user to database
  if ($imageError != "")
    $error = "There were error(s) in your sign up details.";
  else {
    $query = "SELECT * FROM USERS WHERE email='".mysqli_real_escape_string($link, $_POST['email'])."'";
    $result = mysqli_query($link, $query);
    $results = mysqli_num_rows($result);

    if ($results)
      $error = "That email is already registered.";
    else {
      $query = "INSERT INTO `USERS` (`first_name`,`last_name`,`picture_url`,`email`,
               `date_of_birth`,`gender`,`bio`,`school`,`major`,`current_year`,`tribe`,
               `state_of_residence`,`state_of_origin`,`info_permission`)
               VALUES('".mysqli_real_escape_string($link, $_POST['first-name'])."',
               '".mysqli_real_escape_string($link, $_POST['last-name'])."',
               '".mysqli_real_escape_string($link, $target_file)."',
               '".mysqli_real_escape_string($link, $_POST['email'])."',
               '".mysqli_real_escape_string($link, $_POST['date-of-birth'])."',
               '".mysqli_real_escape_string($link, $_POST['gender'])."',
               '".mysqli_real_escape_string($link, $_POST['short-bio'])."',
               '".mysqli_real_escape_string($link, $_POST['school-choice'])."',
               '".mysqli_real_escape_string($link, $_POST['major-choice'])."',
               '".mysqli_real_escape_string($link, $_POST['current-year'])."',
               '".mysqli_real_escape_string($link, $_POST['tribe-choice'])."',
               '".mysqli_real_escape_string($link, $_POST['state-residence-choice'])."',
               '".mysqli_real_escape_string($link, $_POST['state-origin-choice'])."',
               '".mysqli_real_escape_string($link, $share)."')";

      mysqli_query($link, $query);

      //$_SESSION['id'] = mysqli_insert_id($link);

      //print_r($_SESSION);
    }
  }
  echo $error . " " .$imageError;
?>
