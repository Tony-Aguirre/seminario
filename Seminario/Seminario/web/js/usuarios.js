//se declara la constante que guardara la url para hacer las peticiones al servidor
const URL = 'http://localhost:80/SEMINARIO/config/config_usuarios.php'

//Se mandan a llamar los datos de los usuarios
const usuarios = fetch(`${URL}`,{
  method: 'GET'
})
.then(x => x.json())
.then(res =>{

  res.forEach(usuarios => {
 
    body_table_usuarios.innerHTML += `
                    <tr>

                      <td>

                        ${usuarios.nombre}

                      </td>
                      <td>

                        ${usuarios.numero_empleado}

                      </td>
                      <td>

                        ${usuarios.tipo}

                      </td>
                      <td>
                        

                        <button type="button" value="${usuarios.numero_empleado}" onClick="editar(${usuarios.numero_empleado})" class="btn btn_green" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

                          Editar

                        </button>
                        

                        <button type="button" value="${usuarios.numero_empleado}" onClick="eliminar(${usuarios.numero_empleado})" class="btn btn-danger">

                          Elimiar

                        </button>

                      </td>

                    </tr>
    `

  });
  return res
})

//se crea un evento para registrar usuario
const $form_registro = document.getElementById('form_registro')
$form_registro.addEventListener('submit', (e)=>{
  e.preventDefault()

  const $datos = new FormData($form_registro)

  fetch(`${URL}`,{
    method: 'POST',
    body: $datos
  })
  .then(x => x.json())
  .then(res =>{
    if(res.error){
      alert(res.mensaje)
      location.reload()
    }
    if(!res.error){
      alert(res.mensaje)
      location.reload()
    }
  })
})

//Se crea el evento para Editar Usuario
let id_editar//variable para guardar el id del elemento que se va a editar
const $form_editar = document.getElementById('form_editar')
$form_editar.addEventListener('submit',(e)=>{
  e.preventDefault();
  
  let nombre = document.getElementById("editar_nombre")
  let numEmpleado = document.getElementById("editar_numEmpleado")
  let permiso = document.getElementById("editar_permiso")

  let usuario_nuevo = {id:id_editar, nombre: nombre.value, numEmpleado:numEmpleado.value, permiso: permiso.value}
  let usuario_nuevoJSON = JSON.stringify(usuario_nuevo);

  fetch(`${URL}`,{

    method: "PUT",
    body: usuario_nuevoJSON

  })
  .then(x => x.json())
  .then(res =>{
    alert(res.mensaje)
    //  location.reload()
  })

})
//Funcion para mostrar los datos en el formulario para editar
function editar(value) {
      id_editar = value
      usuarios.then(res =>{
      //se selecciona el valor de cada uno de los campos.
      let nombre = document.getElementById("editar_nombre")
      let numEmpleado = document.getElementById("editar_numEmpleado")
      
 

      res.forEach((usuarios)=>{

        if(value == usuarios.numero_empleado){

          nombre.value = usuarios.nombre ;
          numEmpleado.value = usuarios.numero_empleado;
        }

      } )

    } )
}
//se crea un evento para eliminar usuario
function eliminar(numero_empleado) {
  fetch(`${URL}/${numero_empleado}`,{
    method: 'DELETE'
  })
  .then(x => x.json())
  .then(res =>{
    alert(res.mensaje)
    location.reload()
  })
}