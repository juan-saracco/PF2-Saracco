//Acceso al DOM
let carrito = document.querySelectorAll(".añadir-al-carrito");

//array de productos
let productos = [
    {
        nombre: "anteojo formal",
        etiqueta :"modelo1",
        precio: 5999,
        enCarrito: 0
    },
    {
        nombre: "anteojo madera gris",
        etiqueta :"modelo2",
        precio: 8500,
        enCarrito: 0
    },
    {
        nombre: "anteojo carey",
        etiqueta :"modelo3",
        precio: 5300,
        enCarrito: 0
    },
    {
        nombre: "anteojo de titanio",
        etiqueta :"modelo4",
        precio: 10300,
        enCarrito: 0
    },
    {
        nombre: "anteojo negro casual",
        etiqueta :"modelo5",
        precio: 8999,
        enCarrito: 0
    },
    {
        nombre: "anteojo negro moderno",
        etiqueta :"modelo6",
        precio: 6650,
        enCarrito: 0
    }
]

//escucho el evento
for (let  i= 0; i < carrito.length; i++) {
    carrito[i].addEventListener("click", ()=>{
        numeroCarrito(productos[i]);
        costeTotal(productos[i]);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Agregaste el producto al carrito',
            showConfirmButton: false,
            timer: 1000
          })
    })
}
//cuento cuantos productos tengo en el carrito
function numeroCarrito(producto) {

    let numeroProducto = localStorage.getItem("numerosCarrito");
    numeroProducto = parseInt(numeroProducto);

    if (numeroProducto) {
        localStorage.setItem("numerosCarrito", numeroProducto + 1);
    }else{
        localStorage.setItem("numerosCarrito", 1);

    }
    setItems(producto);
}


//los agrego al carrito
function setItems(producto) {

    let productosCarrito = localStorage.getItem("productosEnCarrito");
    productosCarrito = JSON.parse(productosCarrito);

    if (productosCarrito != null) {
        if(productosCarrito[producto.etiqueta] == undefined) {
            productosCarrito = {
                ...productosCarrito,
                [producto.etiqueta] : producto
            }
        }
        productosCarrito[producto.etiqueta].enCarrito += 1;  
    }else{
        producto.enCarrito = 1;
        productosCarrito = {
            [producto.etiqueta] : producto
        }
    }
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosCarrito));
}

//calculo el coste total
function costeTotal(producto) {
    let costoCarrito = localStorage.getItem("costeTotal");

    console.log("el costo de mi carrito es: ", costoCarrito);
    console.log(typeof costoCarrito);


    if (costoCarrito != null) {
        costoCarrito = parseInt(costoCarrito);
        localStorage.setItem("costeTotal", costoCarrito + producto.precio);
    }else {
        localStorage.setItem("costeTotal", producto.precio)
    }

}
//funcion para mostrar las cards en el carrito
function mostarCarrito() {
    let productosCarrito = localStorage.getItem("productosEnCarrito");
    productosCarrito = JSON.parse(productosCarrito)

    let productoContainer = document.querySelector(".productos");
    let costoCarrito = localStorage.getItem("costeTotal");

    console.log(productosCarrito);

    if ( productosCarrito  && productoContainer) {
        productoContainer.innerHTML = "";
        Object.values(productosCarrito).map(producto => {
            productoContainer.innerHTML += ` 
            <div class="producto">
            <img class="producto-img" src="./img/${producto.etiqueta}.jpg">
            <span class="producto-spantitle">${producto.nombre}</span> 
            $<div class="productos-precio">${producto.precio}</div>
            <div class="productos-cantidad">
            <input id="restar" type="button" value="  ◀  ">
            <span class="producto-cantidad-valor">${producto.enCarrito}</span>
            <input id="sumar" type="button" value="  ▶ ">	
            </div>
            <div class="productos-total">
            $${producto.enCarrito * producto.precio}
            </div>
            </div>
            `

        });
        
        productoContainer.innerHTML += `
        <div class="importe">
        <h4 class="importe-titulo">
            Importe final
        </h4>
        <h4 class="importe-final">
        $${costoCarrito}
        </h4>
        </div>
        `
    }
}

//funcion sumarCantidad
function modificarCantidad() {
    let sumar = document.getElementById("#sumar");
    let restar = document.getElementById("#restar");

    restar.addEventListener("click", ()=>{
        productos.enCarrito = localStorage.setItem("productosEnCarrito", productos.enCarrito - 1 );
    })
}


//corro la funcion al cargar la pagina
mostarCarrito()
