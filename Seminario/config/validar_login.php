<?php

include 'conexion.php';

$numero_empleado = $_POST['numero_empleado'];
$password = md5($_POST['password']);
try {
  //code...

  $sentencia = "SELECT * FROM usuarios where  exists ( select * from usuarios where numero_empleado = '$numero_empleado') ";
  $resultado = mysqli_query($conexion, $sentencia);
  if ($resultado ) {
    $filas = mysqli_num_rows($resultado);
    if($filas){
      $usuario = [];
                    while ($data = mysqli_fetch_array($resultado)) {
                      $usuario['password'] = $data['password'];
                      $usuario['numero_empleado'] = $data['numero_empleado'];
                    }

          if($numero_empleado === $usuario['numero_empleado'] && $password === $usuario['password']){
            $respuesta = array('mensaje' => 'datos correctos','autenticacion' => '1' );
            echo json_encode($respuesta);
          }

          if($password != $usuario['password']){
            $respuesta = array('mensaje' => 'contraseña incorrecta', 'autenticacion' => '0' );
            echo json_encode($respuesta);
          }
    }else {
    # code...
      $respuesta = array('error' => true,'mensaje'=> 'numero de empleado incorrecto' );
      echo json_encode($respuesta);
    }
              
  }
} catch (\Throwable $th) {
  //throw $th;
  $mensaje = "Ha ocurrido un error:". mysqli_error($conexion);
  $respuesta = array('error' => true,'mensaje'=> $mensaje );
  echo json_encode($respuesta);
}

?>