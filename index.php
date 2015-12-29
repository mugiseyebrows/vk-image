<?php

$config = array(
  'pass' => 'qwerty',
  'dest' => 'images/',
  'debug' => true
);

function is_post_set($names) {
  foreach ($names as $name) {
    if (!isset($_POST[$name])) {
      return false;
    }
  }
  return true;
}

function unset_post_name($names) {
  foreach ($names as $name) {
    if (!isset($_POST[$name])) {
      return $name;
    }
  }
}

$required = array('src','pass');

if (is_post_set($required)) {
  $src = $_POST['src'];
  $pass = $_POST['pass'];
  if ($pass != $config['pass']) {
    echo 'wrong pass';
    return;
  }
  $filename = $config['dest'] . basename($src);
  $data = file_get_contents($src);
  file_put_contents($filename,$data);
  echo 'saved as ' . $filename;
} else {
  if ($config['debug']) {
    $name = unset_post_name($required);
    echo 'isset($_POST["' . $name . '"]) === false';
  } else {
    echo 'error';
  }
}

?>

