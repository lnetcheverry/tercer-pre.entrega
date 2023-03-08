class Producto {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio; 
        this.img = img;
        this.cantidad = 1;
    }
}

const cabina = new Producto(1, "Cabina", 8600, "img/cabina.jpg");
const cortaCuticula = new Producto(2, "Corta cuticula", 6400, "img/cortacuticula.jpg");
const esmalte1 = new Producto(3, "Esmalte", 2120, "img/esmalte1.jpg");
const esmalte2 = new Producto(4, "Esmalte", 2120, "img/esmalte2.jpg");
const esmalte3 = new Producto(5, "Esmalte", 2120, "img/esmalte3.jpg");
const gel = new Producto(6, "Gel de construccion", 3150, "img/gel.jpg");
const polvoefecto = new Producto(7, "Polvo efecto", 1800, "img/polvoefecto.jpeg");
const topybase = new Producto(8, "Top y Base", 4690, "img/topybase.jpg");

//Array de catalogo

const productos = [cabina, cortaCuticula, esmalte1, esmalte2, esmalte3, gel, polvoefecto, topybase]; 

//array de carrito

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//verifico por consola

console.log(productos);

//DOM mostrando los productos: 

const contenedorProductos = document.getElementById("contenedorProductos");

//Creamos una función para mostrar los productos en stock. 

const mostrarProductos = () => {
    productos.forEach( producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <button class = "btn colorBoton" id = "boton${producto.id}" >Agregar al Carrito</button>
                    </div>
                </div>`

        contenedorProductos.appendChild(card);
        //Agregar productos al carrito: 
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })


    })
}

mostrarProductos();

//Creamos la función agregar al carrito: 

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    }else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    console.log(carrito);
    calcularTotal();
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Mostrar el carrito de compras: 

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                <div class = "card" >
                    <img src = "${producto.img}" class = "card-img-tom imgProductos">    
                    <div class = "card-body" >
                        <h2> ${producto.nombre} </h2>
                        <p> ${producto.precio} </p>
                        <p> ${producto.cantidad} </p>
                        <button class = "btn colorBoton" id="eliminar${producto.id}" > Eliminar</button>
                    </div>
                </div>`

        contenedorCarrito.appendChild(card);

        //Eliminar productos del carrito: 

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice,1);
    mostrarCarrito();

    //LocalStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Vaciamos todo el carrito de compras. 

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //LocalStorage: 
    localStorage.clear();
}


//Mostrar un mensaje con el total de la compra.

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach( producto => {
        totalCompra += producto.precio * producto.cantidad;
        //+= es igual a poner totalCompra = totalCompra + producto.precio * producto.cantidad. 
    })
    total.innerHTML = `Total $${totalCompra}`;
}