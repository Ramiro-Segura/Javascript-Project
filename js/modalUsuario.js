///Modal Usuario
const contenedorModalUsuario = document.getElementsByClassName('modal-contenedor-usuario')[0]
const abrirModal = document.getElementById('boton-usuario')
const cerrarModal = document.getElementById('cerrar-modal')
const modalUsuario = document.getElementsByClassName('modal-usuario')[0]

///Abrir modal
abrirModal.addEventListener('click', ()=>{
    contenedorModalUsuario.classList.toggle('modal-active-user')
})

///Cerrar modal
cerrarModal.addEventListener('click', ()=>{
    contenedorModalUsuario.classList.toggle('modal-active-user')
})
contenedorModalUsuario.addEventListener('click', ()=>{
    cerrarModal.click()
})
modalUsuario.addEventListener('click', (e)=>{
    e.stopPropagation()
})

///Almacenando los datos del usuario
$(document).ready(function(){    
  $('#btnGuardar').click(function(){        
    ///Tomando los datos escritos en los inputs
    const nombreUsuario = document.getElementById("nombreInput").value
    const domicilioUsuario = document.getElementById("domicilioInput").value
    const numeroUsuario = document.getElementById("celularInput").value

    ///Guardando los datos en local storage
    localStorage.setItem("Nombre", nombreUsuario)
    localStorage.setItem("Domicilio", domicilioUsuario)
    localStorage.setItem("Numero de Celular", numeroUsuario)

    ///Vaciar los inputs
    document.getElementById("nombreInput").value = ""
    document.getElementById("domicilioInput").value = ""
    document.getElementById("celularInput").value = ""

    ///Alerta que los datos han sido guardados
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'datos guardados',
      showConfirmButton: false,
      timer: 2000
    })
  })   
})
///Cargar los datos que fueron guardados
$(document).ready(function(){    
  $('#btnCargar').click(function(){  

    ///Obteniendo los datos almacenados
    const nombre = localStorage.getItem("Nombre")
    const domicilio = localStorage.getItem("Domicilio")
    const numero = localStorage.getItem("Numero de Celular")

    ///Mostrando los datos almacendados
    document.getElementById("nombre").innerHTML = nombre
    document.getElementById("domicilio").innerHTML = domicilio
    document.getElementById("nCelular").innerHTML = numero
  })
})