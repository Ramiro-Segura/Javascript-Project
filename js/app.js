
///Modo Nocturno
const btnSwitch = document.getElementById ("switch")

///Activar/desactivar switch 
btnSwitch.addEventListener("click", () =>{
    document.body.classList.toggle("dark");
    btnSwitch.classList.toggle("active");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("dark-mode", true);
    } else {
        localStorage.setItem("dark-mode", false);
    }
});

///Guardando modo nocturno en local storage
if(localStorage.getItem("dark-mode") === true){
    document.body.classList.add("dark");
    btnSwitch.classList.add("active");
} else{
    document.body.classList.remove("dark");
    btnSwitch.classList.remove("active");
}

///JSON productos
let productos = []  
///Cargando los productos del archivo json  
const cargarProductos = async () => {
    const respuesta = await fetch('js/productos.json')
    const data = await respuesta.json()

    productos = data
    mostrarProductos(productos)
}
cargarProductos()

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const carrito = []

///Agregando lista de los productos al html
function mostrarProductos(array) {

    contenedorProductos.innerHTML = ''

    array.forEach( (producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
                    <h3>${producto.nombre}</h3>
                    <p>${producto.ingredientes}</p>
                    <p class="precioProducto">Precio: $ ${producto.precio}</p>
                    <button onclick=agregarAlCarrito(${producto.id}) class="boton-agregar">Agregar</button>
        `
        contenedorProductos.appendChild(div)
    } )
}

///Carrito
///Agregar producto al carrito
function agregarAlCarrito(itemId) {

    let itemEnCarrito = carrito.find(el => el.id == itemId)

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1
    } else {
        let {id, nombre, precio} = productos.find( el => el.id == itemId )
        carrito.push({id: id, nombre: nombre, precio: precio, cantidad: 1})
    }


    localStorage.setItem('carrito', JSON.stringify(carrito))

    console.log(carrito)

    resultadosCarrito()

    ///Alerta producto ha sido agregado al carrito
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 1000
      })
}

///Agregar cantidad de producto
function agregarProducto (id){
    let productoASumar = carrito.find( el => el.id == id )

    productoASumar.cantidad++

    if (productoASumar.cantidad == 0) {
        let indice = carrito.indexOf(productoASumar)
        carrito.splice(indice, 1)
    }

    console.log(carrito)
    resultadosCarrito()
}

///Eliminar cantidad de producto
function restarProducto (id){
    let productoARestar = carrito.find( el => el.id == id )

    productoARestar.cantidad--

    if (productoARestar.cantidad == 0) {
        let indiceRestar = carrito.indexOf(productoARestar)
        carrito.splice(indiceRestar, 1)
    }

    console.log(carrito)
    resultadosCarrito()
    
}

///Mostrando los productos en el carrito
function resultadosCarrito() {
    contenedorCarrito.innerHTML=''
    
    carrito.forEach( (taco) => {

        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
                        <p>${taco.nombre}</p>
                        <p>Precio: $${taco.precio*taco.cantidad}</p>
                        <p>Cantidad: ${taco.cantidad}</p>
                        <button onclick=agregarProducto(${taco.id}) class= "boton-sumar"><i class="fas fa-plus"></i></button>
                        <button onclick=restarProducto(${taco.id}) class= "boton-restar"><i class="fas fa-minus"></i></i></button>
                    `
        
        contenedorCarrito.appendChild(div)
    })
    contadorCarrito.innerText = carrito.length
  precioTotal.innerText = carrito.reduce( (acc, {cantidad,precio}) => acc + cantidad*precio , 0 )
  
}

///MercadoPago Api
const finalizarPedido = async () => {
    ///Cargando los items del carrito a la api
    const itemsMP = carrito.map ( (prod) =>{
        return {
            title: prod.nombre,
            category_id: prod.id,
            quantity: prod.cantidad,
            currency_id: "ARS",
            unit_price: prod.precio
        }
    })

    const response= await fetch ('https://api.mercadopago.com/checkout/preferences', {
        
        method: 'POST',
        headers: {
            Authorization: "Bearer TEST-3386353816787845-110403-bdc32def7bd67677c9c90927cd5ea5a6-336517798"
        },
        body: JSON.stringify({
            items: itemsMP,
            back_urls: {
                success: window.location.href,
                failure: window.location.href
            }
        })
    })
    const data = await response.json()
    console.log(data)
    window.location.replace (data.init_point)
      
}


