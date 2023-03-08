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

