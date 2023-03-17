<?php
  try {
    //code...
    $conexion = mysqli_connect ('localhost', 'root', '123456789','seminario');

  } catch (\Exeption $e) {
    throw $e;
  }
?>